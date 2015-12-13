var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    sass            = require('gulp-sass'),
    mainBowerFiles  = require('main-bower-files');
    sync            = require('browser-sync'),
    reload          = sync.reload,
    uglify          = require('gulp-uglify');

gulp.task('sass', function () {
    gulp.src(['app/styles/*.scss', 'app/styles/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('styles', function () {
    gulp.src("app/styles/**/*.css")
        .pipe(gulp.dest("dist/styles"))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
    gulp.src("app/scripts/**/*.js")
        .pipe(gulp.dest("dist/scripts"))
        .pipe(reload({stream: true}));
});

gulp.task('angular', function () {
    gulp.src("app/scripts/app/**/*.js")
        .pipe(gulp.dest("dist/scripts/app"))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    gulp.src("app/views/**/*.html")
        .pipe(gulp.dest("dist/views"))
        .pipe(reload({stream: true}));
});

gulp.task('index', function () {
    gulp.src("app/index.html")
        .pipe(gulp.dest("dist"))
        .pipe(reload({stream: true}));
});

gulp.task('images', function () {
    gulp.src("app/images/*.*")
        .pipe(gulp.dest("dist/images"))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function () {
    gulp.src("app/fonts/*.*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(reload({stream: true}));
});

gulp.task('bower_components', function() {
    gulp.src(mainBowerFiles({ paths: 'app' }))
        .pipe(gulp.dest("dist/bower_components"))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function () {
    sync({
        port: 3000,
        ui: {
            port: 8080
        },
        server: {
            baseDir: "./dist"
        }
    })
});

gulp.task('watch', function () {
    gulp.watch(['app/styles/*.scss', 'app/styles/**/*.scss'], ['sass']);
    gulp.watch("app/styles/**/*.css", ['styles']);
    gulp.watch("app/scripts/**/*.js", ['scripts']);
    gulp.watch("app/scripts/app/**/*.js", ['angular']);
    gulp.watch("app/views/**/*.html", ['html']);
    gulp.watch("app/index.html", ['index']);
    gulp.watch("app/bower_components", ['bower_components']);
    gulp.watch("app/images", ['images']);
    gulp.watch("app/fonts", ['fonts']);
});

gulp.task('default', ['sass', 'styles', 'scripts', 'angular', 'html', 'index', 'bower_components', 'images', 'fonts', 'browser-sync', 'watch']);
