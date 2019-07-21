module Node.Simple.Rev
  ( rev
  ) where

import Prelude

import Control.Parallel (parTraverse, parTraverse_)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldr, notElem)
import Data.Function.Uncurried (Fn4, runFn4)
import Data.String (Pattern(..), Replacement(..), joinWith, replaceAll, split)
import Data.String.Regex (replace, test)
import Data.String.Regex.Flags (global, noFlags)
import Data.String.Regex.Unsafe (unsafeRegex)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (Aff, Error, makeAff, message, nonCanceler, runAff_)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Node.Buffer (toString)
import Node.Crypto.Hash (Algorithm(..), createHash, digest, update)
import Node.Encoding (Encoding(..))
import Node.FS.Aff (readFile, readTextFile, readdir, stat, writeFile, writeTextFile)
import Node.FS.Stats (isDirectory, isFile)
import Node.Path (FilePath, dirname, extname)
import Node.Path as Path
import Node.Process (argv)

type Options =
  { inputDir :: FilePath
  , outputDir :: FilePath
  }

type Manifest = Array (Tuple FilePath FilePath)

rev :: Effect Unit
rev = do
  xs <- argv
  case xs of
    [ _, _, inputDir, outputDir ] ->
      let opts = { inputDir, outputDir }
       in runAff_ cb (createManifest opts >>= build opts)
    _ -> log help
  where
    cb (Left err) = log $ message err
    cb _ = log "Done."

build :: Options -> Manifest -> Aff Unit
build opts manifest =
  parTraverse_ (buildFile opts manifest) manifest

buildFile
  :: Options
  -> Manifest
  -> Tuple FilePath FilePath
  -> Aff Unit
buildFile opts manifest (Tuple from to) = do
  mkdirp $ dirname to'
  if notElem (extname to') replaceURLTargets
    then readFile from' >>= writeFile to'
    else do
      txt <- readTextFile UTF8 from'
      writeTextFile UTF8 to' $ foldr replaceURL txt manifest
  where
    from' = Path.concat [ opts.inputDir, from ]
    to' = Path.concat [ opts.outputDir, to ]
    replaceURL (Tuple f t) = replaceAll (Pattern f) (Replacement t)

createManifest :: Options -> Aff Manifest
createManifest opts =
  handleDir opts.inputDir <#> Array.sortBy compareDepth
  where
    compareDepth (Tuple a _) (Tuple b _) =
      compare
        (Array.length $ split (Pattern "/") a)
        (Array.length $ split (Pattern "/") b)
    handleDir dir =
      readdir dir >>= (parTraverse $ walk dir) <#> Array.concat
    walk dir file = do
      let file' = Path.concat [ dir, file ]
      stats <- stat file'
      if isFile stats
        then hashedFilePath file'
        else if isDirectory stats then handleDir file' else pure []

hashedFilePath :: FilePath -> Aff Manifest
hashedFilePath file = do
  hash <- contentHash file
  let file' = joinWith "/" $ Array.drop 1 $ split (Pattern "/") file
  case extname file' of
    "" ->
      pure [ Tuple file' $ file' <> "-" <> hash ]
    ".html" ->
      pure [ Tuple file' file' ]
    ext ->
      let reg = unsafeRegex ((escapeRegExp ext) <> "$") noFlags
       in pure [ Tuple file' $ replace reg ("-" <> hash <> ext) file' ]

contentHash :: FilePath -> Aff String
contentHash file = do
  buf <- readFile file
  liftEffect
    $ createHash MD5
    >>= flip update buf
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

escapeRegExp :: String -> String
escapeRegExp str =
  if test reg str
    then replace reg "\\$&" str
    else str
  where
    reg = unsafeRegex "[\\\\^$.*+?()[\\]{}|]" global

mkdirp :: FilePath -> Aff Unit
mkdirp file =
  makeAff \x ->
    runFn4 mkdirpImpl Left Right file x $> nonCanceler

foreign import mkdirpImpl
  :: Fn4 (Error -> Either Error Unit) (Unit -> Either Error Unit) FilePath (Either Error Unit -> Effect Unit) (Effect Unit)
