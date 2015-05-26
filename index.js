var through = require("through2");
var async = require('neo-async');
var gutil = require("gulp-util");
var _ = require("lodash");
var git = require('gulp-git');

module.exports = function(options) {
	"use strict";

	options = options || {};
	var status = options.status || 'AMRC';

	var regExpString = '^(' + status.split('').join('|') + ')';
	var regExp = new RegExp(regExpString);

	// see "Writing a plugin"
	// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
	function gitStaged(file, enc, callback) {
		/*jshint validthis:true*/

		var self = this;

		// Do nothing if no contents
		if (file.isNull()) {
			self.push(file);
			return callback();
		}

		if (file.isStream()) {

			// http://nodejs.org/api/stream.html
			// http://nodejs.org/api/child_process.html
			// https://github.com/dominictarr/event-stream

			// accepting streams is optional
			self.emit("error",
				new gutil.PluginError("gulp-git-staged", "Stream content is not supported"));
			return callback();
		}

		async.waterfall([
			// output git status
			function(next) {
				git.status({
					args: '--porcelain',
					quiet: true
				}, next);
			},
			// collect filename by status stdout
			function(stdout, next) {
				var lines = stdout.split("\n");
				var filenames = _.transform(lines, function(result, line) {
					var status = line.slice(0, 2);
					if (regExp.test(status)) {
						result.push(_.last(line.split(' ')));
					}
				});

				next(null, filenames);
			},
			// filter file from stream
			function(filenames) {
				var isIn = _.some(filenames, function(line) {
					return file.path.indexOf(line) !== -1;
				});
				if (isIn) {
					self.push(file);
				}
				callback();
			}
		]);
	}

	return through.obj(gitStaged);
};
