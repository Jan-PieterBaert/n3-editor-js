var { exec } = require('child_process')
var prefix = require('../prefix_map.js')
var { config } = require('../../config.js')

const jen3Exec = config.reasoners.jen3.exec;
const jen3Folder = config.reasoners.jen3.folder;
const jen3Codegen = config.reasoners.jen3.codegen;

exports.exec = function(options, file, queryFile, callback) {
	if (queryFile) {
		callback({ error: "query option not supported by cwm" })
	}
	let cmdOptions, jarFile;
	switch (options.task) {
		case 'derivations':
			cmdOptions = "-inferences";
			jarFile = jen3Exec;
			break;

		case 'deductive_closure':
			cmdOptions = "-conclusion";
			jarFile = jen3Exec;
			break;

		case 'explain':
			// (for 'explain', file parameter is the proof)
			cmdOptions = `-explain -folder ${jen3Folder}`;
			jarFile = jen3Exec;
			break;

		case 'imperate':
			cmdOptions = `-language ${options.language}`;
			jarFile = jen3Codegen;
			break;
	}

	var cmd = `java -jar ${jarFile} -n3 ${file} ${cmdOptions}`;
	
	console.log(cmd);
	exec(cmd, (err, stdout, stderr) => {
		if (stderr != "") {
			callback({ error: stderr })

		} else {
			var output = prefix.collapse(stdout, file)
			callback({ success: output })
		}
	})
}
