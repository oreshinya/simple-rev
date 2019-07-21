# simple-rev

[![npm version](https://badge.fury.io/js/simple-rev.svg)](https://badge.fury.io/js/simple-rev)

Add hash to static file names and replace urls with hashed version.

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

It does do the following:

- Creates manifest from files of input directory
- Copy files named with hash to output directory
- Replace URLs with hashed version

## LICENSE

MIT
