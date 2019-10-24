# simple-rev

[![npm version](https://badge.fury.io/js/simple-rev.svg)](https://badge.fury.io/js/simple-rev)

Static asset revisioning.

## Installation

Only NPM scripts:

```
$ npm i simple-rev
```

Or globally:

```
$ npm i -g simple-rev
```

## Usage

```
$ simple-rev <input_dir> <output_dir>
```

It does the following:

- Create manifest
- Rename files with content hash
- Copy file from input directory to output directory
- Replace URLs with hashed version in files

## LICENSE

MIT
