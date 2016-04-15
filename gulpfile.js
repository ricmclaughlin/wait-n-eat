'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var clean = require('gulp-clean');

var bases = {
  app: 'src/',
  dist: 'dist/',
};

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('clean', function () {
  return gulp.src(bases.dist)
    .pipe(clean());
});

gulp.task('build', function () {
  gulp.src(bases.app + '**/*')
    .pipe(gulp.dest(bases.dist));
});

gulp.task('deploy', function () {
  return gulp.src(bases.dist + '**/*')
    .pipe(ghPages());
});
