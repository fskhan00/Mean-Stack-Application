var express = require('express');
var app     = express();
var path    = require('path');

app.set('port',3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/json',(req, res)=> {
  res
    .status(200)
    .json({'Admitted': true});

});

app.get('/file',(req, res)=> {
  res
    .status(200)
    .sendFile(path.join(__dirname, 'app.js'));

});
var server = app.listen(app.get('port'), () => {
  var port = server.address().port;
  console.log('Express is listening at ' + port);
});
