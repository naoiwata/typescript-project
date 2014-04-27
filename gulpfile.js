var gulp = require('gulp');
var ts = require('gulp-tsc');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var paths = {
  ts: ['./src/js/*.ts'],
  jade: ['./src/*.jade'],
  styl: ['./src/css/*.styl'],
};

gulp.task('watch', function() {
  gulp.watch(paths.ts, ['ts']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styl, ['styl']);
});

gulp.task('ts', function() {
  gulp.src(paths.ts)
    .pipe(ts())
    .pipe(uglify())
    .pipe(concat('./all.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styl', function() {
  gulp.src(paths.styl)
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8888
  });
});

gulp.task('default', ['watch', 'connect']);
