const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to addJC Corplicenses in the production mode for the minified js
  gulp
    .src("dist/js/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Grips Perfect - v1.1.0 based on Tailwind Starter Kit by JC Corp
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-notus
* Copyright 2021JC Corp(https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by JC Corp

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to addJC Corplicenses in the production mode for the minified html
  gulp
    .src("dist/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Grips Perfect - v1.1.0 based on Tailwind Starter Kit by JC Corp
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-notus
* Copyright 2021JC Corp(https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by JC Corp

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to addJC Corplicenses in the production mode for the minified css
  gulp
    .src("dist/css/*.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Grips Perfect - v1.1.0 based on Tailwind Starter Kit by JC Corp
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-notus
* Copyright 2021JC Corp(https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by JC Corp

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
