'use strict';

var  gulp = require('gulp');
var  sass = require('gulp-sass');
var  config = require('../config').sass;
var  autoprefixer = require('autoprefixer');
var  postcss = require('gulp-postcss');
var  browserSync = require('browser-sync');
//var  cssshrink = require('gulp-cssshrink');
var  plumber = require('gulp-plumber');
var  sourcemaps = require('gulp-sourcemaps');

var processors = [
  autoprefixer({
    browsers: '> 1%, last 4 versions',
    map: true
  })
];

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
