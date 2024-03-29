module Node.Simple.Rev
  ( main
  ) where

import Prelude

import Control.Parallel (parSequence_, parTraverse, parTraverse_)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldr, notElem)
import Data.String (Pattern(..), Replacement(..))
import Data.String as String
import Data.String.Regex (replace, source, test)
import Data.String.Regex.Flags (global, noFlags)
import Data.String.Regex.Unsafe (unsafeRegex)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (Aff, message, runAff_)
import Effect.Class (liftEffect)
import Effect.Console (error, log)
import Foreign.Object (fromFoldable)
import Node.Buffer (toString)
import Node.Crypto.Hash (createHash, digest, update)
import Node.Encoding (Encoding(..))
import Node.FS.Aff (mkdir', readFile, readTextFile, readdir, stat, writeFile, writeTextFile)
import Node.FS.Perms (all, mkPerms)
import Node.FS.Stats (isDirectory, isFile)
import Node.Path (FilePath)
import Node.Path as Path
import Node.Process (argv, exit)
import Simple.JSON (writeJSON)

type Options =
  { inputDir :: FilePath
  , outputDir :: FilePath
  }

type Manifest = Array (Tuple FilePath FilePath)

main :: Effect Unit
main = do
  xs <- argv
  case xs of
    [ _, _, inputDir, outputDir ] ->
      runAff_ cb $ createOpts inputDir outputDir >>= rev
    _ ->
      log help
  where
    cb (Left err) = do
      error $ message err
      exit 1
    cb _ = log "Done."

createOpts :: FilePath -> FilePath -> Aff Options
createOpts input output =
  liftEffect
    $ { inputDir: _, outputDir: _ }
    <$> Path.resolve [] input
    <*> Path.resolve [] output

rev :: Options -> Aff Unit
rev opts = do
  manifest <- createManifest opts
  parSequence_
    [ outputManifest opts manifest
    , build opts manifest
    ]

outputManifest :: Options -> Manifest -> Aff Unit
outputManifest opts manifest = do
  mkdirp opts.outputDir
  writeTextFile UTF8 path json
  where
    path = Path.concat [ opts.outputDir, "manifest.json" ]
    json = writeJSON $ fromFoldable manifest

build :: Options -> Manifest -> Aff Unit
build opts manifest =
  parTraverse_ (buildFile opts manifest) manifest

buildFile
  :: Options
  -> Manifest
  -> Tuple FilePath FilePath
  -> Aff Unit
buildFile opts manifest (Tuple from to) = do
  mkdirp $ Path.dirname to'
  if notElem (Path.extname to') replaceURLTargets
    then readFile from' >>= writeFile to'
    else do
      txt <- readTextFile UTF8 from'
      writeTextFile UTF8 to' $ foldr replaceURL txt manifest
  where
    from' = Path.concat [ opts.inputDir, from ]
    to' = Path.concat [ opts.outputDir, to ]
    replaceURL (Tuple f t) = String.replaceAll (Pattern f) (Replacement t)

createManifest :: Options -> Aff Manifest
createManifest opts =
  walk opts.inputDir <#> Array.sortBy compareManifestKey
  where
    compareManifestKey (Tuple a _) (Tuple b _) =
      case compareDepth a b of
        EQ -> compareLength a b
        ord -> ord
    compareDepth a b =
      compare
        (Array.length $ String.split (Pattern "/") a)
        (Array.length $ String.split (Pattern "/") b)
    compareLength a b =
      compare (String.length a) (String.length b)
    walk dir =
      readdir dir >>= (parTraverse $ handleFile dir) <#> Array.concat
    handleFile dir file = do
      let file' = Path.concat [ dir, file ]
      stats <- stat file'
      if isFile stats
        then fileManifest opts file'
        else if isDirectory stats then walk file' else pure []

fileManifest :: Options -> FilePath -> Aff Manifest
fileManifest opts file =
  case Path.extname file' of
    ".html" ->
      pure [ Tuple file' file' ]
    "" -> do
      hash <- contentHash file
      pure [ Tuple file' $ file' <> "-" <> hash ]
    ext -> do
      hash <- contentHash file
      let reg = unsafeRegex ((escapeRegex ext) <> "$") noFlags
      pure [ Tuple file' $ replace reg ("-" <> hash <> ext) file' ]
  where
    file' = String.drop (1 + String.length opts.inputDir) file

contentHash :: FilePath -> Aff String
contentHash file = do
  buf <- readFile file
  liftEffect
    $ createHash "md5"
    >>= update buf
    >>= digest
    >>= toString Hex

help :: String
help =
  """
Usage:
  $ simple-rev <input_dir> <output_dir>
  """

replaceURLTargets :: Array String
replaceURLTargets =
  [ ".html"
  , ".js"
  , ".css"
  ]

escapeRegex :: String -> String
escapeRegex str =
  if test hasReg str
    then replace reg "\\$&" str
    else str
  where
    reg = unsafeRegex "[\\\\^$.*+?()[\\]{}|]" global
    hasReg = unsafeRegex (source reg) noFlags

mkdirp :: FilePath -> Aff Unit
mkdirp path =
  mkdir' path
    { mode: mkPerms all all all
    , recursive: true
    }
