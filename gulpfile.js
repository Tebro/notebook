var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less-sourcemap');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var riot = require('gulp-riot');

gulp.task('default', ['less', 'scripts'])

gulp.task('less', function() {
    return gulp.src('./src/less/main.less')
            .pipe(less({sourceMap: {}}))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./public/'))
});

gulp.task('riot', () => {
    return gulp.src('./src/riot/*.tag')
            .pipe(sourcemaps.init())
            .pipe(riot())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build/'))
});

gulp.task('scripts', ['riot'], function() {
    return gulp.src(['./src/js/*.js', './build/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/'));
});
