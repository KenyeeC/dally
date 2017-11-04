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
    'port':{
      alias: 'p',
      describe: 'server port',
    }
  })
  .help()
  .argv

var destinationPath = path.resolve('.')
logic(argv,destinationPath)

