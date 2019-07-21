'use strict';

const fs = require('fs');

exports.mkdirpImpl = function(left, right, path, cb) {
  return function() {
    const opts = { recursive: true };
    fs.mkdir(path, opts, function(err) {
      if (err) {
        cb(left(err))();
      } else {
        cb(right({}))();
      }
    });
    return {};
  }
}
