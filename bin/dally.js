#!/usr/bin/env node
var logic = require('../logic');
var path = require('path');

var argv = require('yargs')
  .command('------------ dally help -----------')
  .command('dally [html]')
  .command('EXAMPLE:')
  .command('#  dally              //default to run index.html')
  .command('#  dally   example    //run example.html')

  .options({
    //options
    'run': {
      boolean: false,
      describe: 'handle all css and javascript files. (Default value, if you miss or input a wrong option, it equal to execute FM --run)'
    }
  })
  .help()
  .argv

var destinationPath = path.resolve('.');
var exe = logic(argv,destinationPath);
console.log('exe-->',exe);

