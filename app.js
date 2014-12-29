var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

app.set('views', './views');
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('layout', 'main-layout');

var routes = require("./routes.js")(app);

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
