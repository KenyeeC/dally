var express = require('express')
var path = require('path')
var app = express()

module.exports = function(argv, destinationPath){

  // default to render index.html
  var htmlName = argv._[0] || 'index'

  app.use(express.static(destinationPath))
  
  app.set("views", destinationPath)
  app.set("view engine", "html")
  
  app.get('/', function (req, res) {
    res.sendFile( path.join(destinationPath,htmlName+'.html'))
  })
  
  app.use(function(err, req, res, next) {
    console.error('err:',err.stack);
    res.status(500).send('Something broke!');
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
      console.log('#  listen on port: \x1B[33m%s\x1b[0m', port)
      console.log('#  render: \x1B[33m%s\x1b[0m', htmlName+'.html')
      console.log('#  static path: \x1B[33m%s\x1b[0m', destinationPath)
      console.log('#  Need help ? Entry: \x1B[33m%s\x1b[0m', 'dally --help')
    })
  }

}

