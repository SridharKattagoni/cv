/*!
 * Project:     cv
 * File:        ./gulp-tasks/sync/src2build.js
 * Copyright(c) 2016-nowdays Baltrushaitis Tomas <tbaltrushaitis@gmail.com>
 * License:     MIT
 */

'use strict';

//  ------------------------------------------------------------------------  //
//  -----------------------------  DEPENDENCIES  ---------------------------  //
//  ------------------------------------------------------------------------  //

const path = require('path');
const utin = require('util').inspect;

const dirSync    = require('gulp-directory-sync');
const merge      = require('merge-stream');
const readConfig = require('read-config');

//  ------------------------------------------------------------------------  //
//  ----------------------------  CONFIGURATION  ---------------------------  //
//  ------------------------------------------------------------------------  //

let ME = Object.assign({}, global.ME || {});
utin.defaultOptions = Object.assign({}, ME.pkg.options.iopts || {});

const modName = path.basename(module.filename, '.js');
const modPath = path.relative(ME.WD, path.dirname(module.filename));
const confPath = path.join(ME.WD, 'config', path.sep);
const modConfigFile = `${path.join(confPath, modPath, modName)}.json`;
const modConfig = readConfig(modConfigFile, ME.pkg.options.readconf);

ME.Config = Object.assign({}, ME.Config || {}, modConfig || {});
let C = ME.Config.colors;

//  ------------------------------------------------------------------------  //
//  -----------------------------  FUNCTIONS  ------------------------------  //
//  ------------------------------------------------------------------------  //

const src2build = function (gulp) {
  console.log(`${ME.L}[${new Date().toISOString()}][${C.Yellow}${modPath}/${modName}${C.NC}] with [${modConfigFile}]`);

  let IMG = path.join('assets/img');
  let wImg = gulp.src('')
            .pipe(dirSync(
                path.join(ME.SRC, IMG)
              , path.join(ME.BUILD, IMG)
              , ME.pkg.options.sync
            ));

  return merge(wImg)
          .on('error', console.error.bind(console));
};


/**
 * EXPOSE
 * @public
 */

module.exports = exports = src2build;
