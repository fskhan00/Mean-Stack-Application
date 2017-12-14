var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', () => {
  console.log('mongoose connected to '+ dburl);
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose disconnected');
});
mongoose.connection.on('error', (err) => {
  console.log('mongoose connection error '+ err);
});

process.on('SIGINT', function() {
  mongoose.connection.close(() => {
    console.log('mongoose connection terminated through app (SIGINT)');
    process.exit(0);
  });
});

process.on('SIGTERM', function()  {
  mongoose.connection.close(() => {
    console.log('mongoose connection terminated through app (SIGTERM)');
    process.exit(0);
  });
});

process.once('SIGUSR2', function() {
  mongoose.connection.close(function() {
    console.log('mongoose connection terminated through app (SIGUSR2)');
    process.kill(process.pid,'SIGUSR2');
  });
});

require('./hotel.model.js');
