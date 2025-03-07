var fs = require('fs')

exports.save = function(contents, callback, file) {
	if (!contents) {
		callback(null)
		return
	}
	if (file === undefined)
		file = "tmp/tmp_" + new Date().valueOf() + ".n3"

	if (!fs.existsSync("tmp"))
		fs.mkdirSync("tmp")

	// console.log("file?", file)
	fs.exists(file, (exists) => {
		if (exists) {
			file = "tmp/tmp_" + new Date().valueOf() + "_2.n3"
			exports.save(contents, callback, file)

		} else {
			fs.writeFile(file, contents, (err) => {
				if (err) throw err
				// console.log("saved " + file)
				callback(file)
			})
		}
	})
}

exports.del = function(file) {
	fs.unlink(file, (err) => {
		if (err) throw err
		// console.log("deleted " + file)
	})
}
