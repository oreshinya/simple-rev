{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name =
    "simple-rev"
, dependencies =
    [ "console", "crypto", "node-fs-aff", "node-process", "simple-json" ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs" ]
}
