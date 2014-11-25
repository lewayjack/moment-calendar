/*
#################################################################
# EchoProject Build                                             #
#################################################################
*/

/*
+---------------------------------------------------------------+
| Requires                                                      |
+---------------------------------------------------------------+
*/
var fs = require("fs");
var path = require('path');
var del = require("del");
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var wrapper = require("gulp-wrapper");
var rename = require("gulp-rename");
var bump = require("gulp-bump");


/*
+---------------------------------------------------------------+
| Variables                                                     |
+---------------------------------------------------------------+
*/
var PATHS = {
    src: "./src",
    dist: "./dist"
};

var versionFiles = ["./package.json","./bower.json"];

var ModuleWrapper = [
    '(function(window,undefined){\n\n',
    '\n\n})(window);'
];


/*
+---------------------------------------------------------------+
| Build & Compress                                              |
+---------------------------------------------------------------+
*/
gulp.task("build", ["clean"], function(){
    return gulp.src(PATHS.src+"/*.js")
        .pipe(concat('moment-calendar.js'))
        .pipe(wrapper({
            header: ModuleWrapper[0],
            footer: ModuleWrapper[1]
        }))
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task("compile", ["build"], function(){
    return gulp.src(PATHS.dist+"/*.js")
        .pipe(uglify())
        .pipe(rename({extname:'.min.js'}))
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task("default", ["compile"]);


/*
+---------------------------------------------------------------+
| Clean (remove) directories                                    |
+---------------------------------------------------------------+
*/
gulp.task("clean", function(){
  return del([PATHS.dist]);
});


/*
+---------------------------------------------------------------+
| Versioning (semver)                                           |
+---------------------------------------------------------------+
*/
gulp.task("bump", ['bump:patch']);
gulp.task("bump:patch", function(){
    return gulp.src(versionFiles)
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});
gulp.task("bump:minor", function(){
    return gulp.src(versionFiles)
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});
gulp.task("bump:major", function(){
    return gulp.src(versionFiles)
        .pipe(bump({type:'major'}))
        .pipe(gulp.dest('./'));
});
gulp.task("bump:pre", function(){
    return gulp.src(versionFiles)
        .pipe(bump({type:'prerelease'}))
        .pipe(gulp.dest('./'));
});

///////////////////////////////////////////////////////////////////
