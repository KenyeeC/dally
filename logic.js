var express = require('express')
var app = express()

module.exports = function(argv, destinationPath){
  
  var arguments = process.argv.splice(2)
  console.log('arguments:', arguments)

  // default to render index.html
  var htmlName = argv._[0] || 'index'

  app.use(express.static(destinationPath))
  
  app.set("views", destinationPath)
  app.set("view engine", "html")
  // app.engine('html', require('ejs').renderFile)
  
  app.get('/', function (req, res) {
    res.render( htmlName+'.html');
  })
  
  // default to port 3000
  var port = argv.port || 3000
  port = isNaN(Number(port)) ? 3000 : Number(port)

  var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('#  \x1B[33m%s\x1b[0m','dally server start')
    console.log('#  listening on port: \x1B[33m%s\x1b[0m', port)
    console.log('#  render: \x1B[33m%s\x1b[0m', htmlName+'.html')
    console.log('#  static path: \x1B[33m%s\x1b[0m', destinationPath)
  });

}

