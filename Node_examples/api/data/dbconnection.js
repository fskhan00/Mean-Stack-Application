var MongoClient = require('mongodb').MongoClient;
var dburl       = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

var open = function () {
  MongoClient.connect(dburl, function(err,db){
    if(err){
      console.log('Database failed to load');
    }
    _connection = db;
    console.log('db',db);
  });
};

var get = function () {
  return _connection;
};

module.exports = {
  open: open,
  get: get
};
