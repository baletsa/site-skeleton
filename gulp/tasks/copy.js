'use strict';

var gulp = require('gulp'),
  config = require('../config'),
  changed = require('gulp-changed');

gulp.task('copy', ['copy:scripts', 'copy:fonts']);

gulp.task('copy:scripts', function() {
  return gulp.src(config.scripts.libsSrc)
    .pipe(changed(config.scripts.libsDest))
    .pipe(gulp.dest(config.scripts.libsDest));
});

gulp.task('copy:fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest));
});
