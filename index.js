var fs = require('fs');
var sourceMap = require('source-map');
var prompt = require('prompt')


var smp = process.argv[2];
var sm = fs.readFileSync(smp, "utf8");
var smc = new sourceMap.SourceMapConsumer(sm);

prompt.start();
prompt.get(['stacktrace'], function (err, result) {
	if (err) {
		console.log();
		return process.exit(0);
	}

	var regexp = /:([\d]+):([\d]+)\)?$/;
	var stackParts = result.stacktrace.split("\\n");


	var formatted = stackParts
		.map(function (line) {
			var matches = regexp.exec(line);
			if (matches && matches.length === 3) {
				return { line: parseInt(matches[1]), column: parseInt(matches[2]) }
			}
		})
		.filter(function (line) {
			return !!line;
		})
		.map(function (entry) { 
			return smc.originalPositionFor(entry);
		})
		.map(function (result) {
			var formatted = "  at " + result.source + " [" + result.line + ":" + result.column + "]";
			if (result.name) {
				formatted += " ~ " + result.name + "()";
			}
			return formatted;
		});

		console.log();
		console.log(stackParts[0].split(",")[1].substr(1));
		console.log(formatted.join("\n"));
});


// console.log(smc.originalPositionFor({line: 1, column: 3284}));
