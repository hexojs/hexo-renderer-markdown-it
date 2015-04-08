var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('coverage', function(){
  return gulp.src('lib/*.js')
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire());
});

gulp.task('coverage:clean', function(callback){
  del(['coverage', 'string'], callback);
});

gulp.task('mocha', ['coverage'], function(){
  return gulp.src('test/index.js')
    .pipe($.mocha({
      reporter: 'spec',
      bail: true
    }))
    .pipe($.istanbul.writeReports());
});

gulp.task('jshint', function(){
  return gulp.src('lib/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('watch', function(){
  gulp.watch('lib/*.js', ['mocha', 'jshint']);
  gulp.watch(['test/index.js'], ['mocha']);
});

gulp.task('test', ['mocha', 'jshint']);
