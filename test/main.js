/*global describe, it*/
"use strict";

var fs = require("fs"),
	es = require("event-stream"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
	gitStaged = require("../");

describe("gulp-git-staged", function () {

	it("should return a stream", function (done) {
		var stream = gitStaged();
		should.exist(stream.on);
		should.exist(stream.write);
		done();
	});

});
