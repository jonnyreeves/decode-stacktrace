#!/usr/bin/env node

var fs = require('fs');
var sourceMap = require('source-map');
var prompt = require('prompt');

var main = require('../index.js');

var smp = process.argv[2];
if (!smp) {
	console.log("Usage:");
	console.log("\tdecode-stacktrace source_map")
	process.exit(1);
}

try {
	var sm = fs.readFileSync(smp, "utf8");
} catch (err) {
	return die("failed to read input sourcemap", err);
}

try {
	var smc = new sourceMap.SourceMapConsumer(sm);
} catch (err) {
	return die("failed to parse input sourcemap", err);
}

prompt.start();
prompt.get(['stacktrace'], function (err, result) {
	if (err) {
		return die("failed to parse user input", err);
	}
	var decoded = main.decodeStackTrace(result.stacktrace, smc);
	console.log();
	console.log(decoded.join("\n"));
});

function die(msg, err) {
	if (err) {
		msg += ": " + err.message
	}
	console.error(msg);
	process.exit(1);
}