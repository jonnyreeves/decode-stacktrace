function decodeStackTrace(st, smc) {
	var regexp = /:([\d]+):([\d]+)\)?$/;
	var stackParts = st.split("\\n");

	var formatted = stackParts
		.map(function (line) {
			var matches = regexp.exec(line);
			if (matches && matches.length === 3) {
				return { 
					line: parseInt(matches[1]), 
					column: parseInt(matches[2]) 
				};
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

	//return [ stackParts[0].split(",")[1].substr(1) ].concat(formatted);
	return formatted;
}

module.exports = {
	decodeStackTrace: decodeStackTrace
}
