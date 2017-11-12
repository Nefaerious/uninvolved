var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

var port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.set('port', port);

http.listen(port, () => {
  console.log('Listening on *:' + port + ' <3');
});
