#!/usr/bin/env node
var logic = require('../logic');
var path = require('path');

var argv = require('yargs')
  .command('[html] [port]')
  .command('example // render example.html')

  .options({
    //options
    'port':{
      alias: 'p',
      default: 3000,
      describe: 'server port',
    }
  })
  .help()
  .argv

var destinationPath = path.resolve('.')
logic(argv, destinationPath)

