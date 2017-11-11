var express = require('express');
var app = express();
var http = require('http').Server(app);
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

var port = process.env.PORT || 3000;

app.use('/', require('./graphics/index'));
app.use('/resources', express.static(path.join(__dirname, '/resources')));

app.set('port', port);

http.listen(port, () => {
  console.log('Listening on *:' + port + ' <3');
});
