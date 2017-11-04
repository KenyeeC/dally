var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()

module.exports = function(argv, destinationPath){

  // default to render exist html or index.html
  var files = fs.readdirSync(destinationPath)
  var existFile = ''
  // try to find html file automatically
  for(var i in files){
    if(!existFile && files[i].indexOf('.html') > -1){
      existFile = files[i]
    }
    if(files[i] === 'index.html'){
      existFile = files[i]
      break
    }
    if(files[i] === 'home.html'){
      existFile = files[i]
      break
    }
  }
  var htmlName = argv._[0] || existFile
  // no any html file error
  if(!htmlName){
    console.log('#  \x1B[31m%s\x1B[39m', 'DALLY SERVER ERROR:')
    console.log('#  \x1B[31m%s\x1B[39m', 'can not find any html file in this path', destinationPath)
    return
  }

  htmlName = htmlName.replace('.html', '')

  app.use(express.static(destinationPath))
  
  app.set("views", destinationPath)
  app.set("view engine", "html")
  
  app.get('/', function (req, res) {
    res.sendFile( path.join(destinationPath,htmlName+'.html'))
  })
  
  app.use(function(err, req, res, next) {
    var code = err.code
    switch (code) {
      case 'ENOENT':
        console.log('#  \x1B[31mCan not find html file called '+htmlName+'.html\x1B[39m')
        console.log('#  \x1B[31m%s\x1B[39m', 'Please specify html file by following command:')
        console.log('#  dally htmlname')
        break
      default:
        break
    }
    res.status(500).send('Can not find html file called ' +htmlName+'.html in this path: ' + destinationPath)
  })

  // default to port 3000
  var port = argv.port || 3000
  port = isNaN(Number(port)) ? 3000 : Number(port)

  var server = listen(app, port)

  server.on('error', errHandler)

  // auto to use new port
  function errHandler (err) {
    var code = err.code
    switch (code) {
      case 'EADDRINUSE':
        var newPort = err.port + 1
        console.log('#  \x1B[31mPort', err.port, 'is already in used !\x1B[39m')
        console.log('#  \x1B[32mChange to use port:', newPort, '\x1B[39m')
        var newServer = listen(app, newPort)
        newServer.on('error', errHandler)
        break
      default:
        break
    }
  }

  // start server
  function listen (app, port) {
    return app.listen(port, function () {
      console.log('#  \x1B[36m%s\x1B[0m','DALLY SERVER START:')
      // specify html file automatically
      var autoSpecify = !argv._[0] && existFile ? '\x1B[32m ( Specify by dally automatically) \x1B[39m' : ''
      console.log('#  Listen on port: \x1B[33m%s\x1b[0m', port)
      console.log('#  Render: \x1B[33m%s\x1b[0m', htmlName+'.html', autoSpecify)
      console.log('#  Static path: \x1B[33m%s\x1b[0m', destinationPath)
      console.log('#  Need help ? Entry: \x1B[33m%s\x1b[0m', 'dally --help')
    })
  }

}

