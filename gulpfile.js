var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    copy = require('gulp-copy'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Uglyfies js on to /tour/js/minjs
gulp.task('scripts', function () {
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("tour/js/minjs"));
});

// Copy fonts to /tour/fonts to become part of the distribution
gulp.task('copy', function () {
    gulp.src('bower_components/patternfly/dist/fonts/*')
        .pipe(copy('tour/fonts', {prefix: 4}));
    gulp.src('bower_components/patternfly/components/bootstrap/dist/fonts/*')
        .pipe(copy('tour/fonts', {prefix: 6}));
    gulp.src('bower_components/patternfly/components/font-awesome/fonts/*')
        .pipe(copy('tour/fonts', {prefix: 5}));
    gulp.src('bower_components/patternfly/components/jquery/dist/jquery.min.js')
        .pipe(copy('tour/js', {prefix: 5}));
    gulp.src('bower_components/i18next/i18next.min.js')
        .pipe(copy('tour/js', {prefix: 5}));
});

// Compiles less on to /tour/css
gulp.task('less', function () {
    gulp.src('less/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('tour/css'))
        .pipe(reload({stream: true}));
});

// reload server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// watch for changes on files
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch("index.html", ['bs-reload']);
    gulp.watch("tour/**/*.html", ['bs-reload']);
});

gulp.task('package', ['scripts', 'copy', 'less']);
gulp.task('default', ['scripts', 'copy', 'less', 'browser-sync', 'watch']);
