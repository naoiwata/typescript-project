"use strict";

import gulp from "gulp";
import typescript from "gulp-typescript";
import pug from "gulp-pug";
import stylus from "gulp-stylus";
import gutil from "gulp-util";
import runSequence from "run-sequence";
import connect from "connect";
import serveStatic from "serve-static";

var paths = {
    ts: ["./src/js/*.ts"],
    pug: ["./src/*.pug"],
    styl: ["./src/css/*.styl"],
};

gulp.task("ts", () => {
    let options = typescript.createProject({
        target: "ES6",
        out: "main.js",
        removeComments: true,
        sortOutput: true,
        noImplicitAny: true
    });
    gulp.src([
        "./src/ts/**/*.ts",
        "!./node_modules/**"
    ])
    .pipe(typescript(options))
    .pipe(gulp.dest("./dist/js"));
 });

gulp.task("pug", () => {
    gulp.src(["./src/**/*.pug"])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("styl", () => {
    gulp.src(["./src/styl/**/*.styl"])
        .pipe(stylus())
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("server", () => {
    connect()
        .use(serveStatic("./dist"))
        .listen(4010);
    gutil.log(gutil.colors.yellow("http://localhost:4010"));
    return;
});

gulp.task("watch", () => {
    gulp.watch(["./src/**/*.pug"], ["pug"]);
    gulp.watch(["./src/**/*.styl"], ["styl"]);
    gulp.watch(["./src/**/*.ts"], ["ts"]);
    return;
});

gulp.task("default", () => {
    return runSequence(["pug", "styl", "ts"], "watch", "server");
});
