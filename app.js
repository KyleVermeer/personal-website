var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

var routes = require("./routes.js")(app);

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
