var express = require('express')
var app = express()

module.exports = function(argv, destinationPath){
  
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
  var port = isNaN(Number(port)) ? 3000 : Number(port)

  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('dally listening at http://%s:%s', host, port);
  });

}

