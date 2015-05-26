
# gulp-git-staged

> git-staged plugin for [gulp](https://github.com/wearefractal/gulp)

## TODO

WIP: This gulp plugin is a work in progress. 

- Add more test for this plugin.

## Usage

You can get an object stream of git staged files on git.

First, install `gulp-git-staged` as a development dependency:

```shell
npm install --save-dev gulp-git-staged
```

Then, add it to your `gulpfile.js`:

```javascript
var git-staged = require("gulp-git-staged");

gulp.src("./src/*.ext")
	.pipe(git-staged())
	.on('data', function (file) {
    console.log("Staged file:", file);
  });
```

## API

### git-staged(options)

#### options.status
Type: `String`  
Default: `AMRC`

What status mode to look for.

```bash
A = added
M = modified
R = renamed
C = copied
```

## EXAMPLE

We use this plugin for pre-commit task.

```javascript
gulp.task('pre-commit', function(done) {
	gulp.src('./**/*')
			.pipe(gitStaged())
			.pipe(jshint())
			.pipe(jsbeautifier({
					config: '.jsbeautifyrc',
					mode: 'VERIFY_AND_WRITE'
			}))
			.pipe(gulp.dest('dest'))
			.pipe(git.add());
});			
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

