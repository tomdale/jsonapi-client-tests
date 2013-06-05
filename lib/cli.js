#!/usr/bin/env node

"use strict";

var path = require("path"),
    runner = require("./runner");

var argv = require('optimist')
    .usage('Run the JSONAPI.org compliance test.\nUsage: $0 test-adapter.js')
    .demand('a')
    .alias('a', 'adapter')
    .describe('a', "the test adapter to use")
    .argv;

module.exports = {
  run: function() {
    var adapterPath = argv.adapter;
    adapterPath = path.join(process.cwd(), adapterPath);
  }
};

function adapterForPath(path) {
  try {
    return require(path);
  } catch (e) {
    var error = new Error("Error loading test adapter " + path + "\n\n" + e);
    error.cause = e;

    throw error;
  }
}
