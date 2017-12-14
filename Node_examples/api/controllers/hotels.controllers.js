var mongoose = require('mongoose');
var Hotel    = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  var point = {
    type: 'Point',
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: 2000,
    num: 5
  };
  Hotel
  .geoNear(point, geoOptions,function (err,results,stats) {
    console.log('Georesults' , results);
    console.log('Geostats' , stats);
    res
    .json(results);
  });


};
module.exports.hotelsGetAll = function(req, res) {
  var offset = 0;
  var count = 5;

  if (req.query && req.query.lng && req.query.lat) {
    runGeoQuery(req,res);
    return;
  }



  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
    .status(400)
    .json({
      message: 'This is a error message due to non numeric count or offset value'
    });
    return;
  }

  Hotel
  .find()
  .skip(offset)
  .limit(count)
  .exec((err,hotels) => {
    if (err){
      console.log('Error finding the hotel');
      res
      .status(500)
      .json(err);
    } else {
      console.log('Found hotels', hotels.length);
      res
      .json(hotels);
    }

  });
};

module.exports.hotelsGetOne = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log('GET hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      res
        .status(200)
        .json(doc);
    });

};

module.exports.hotelsAddOne = function(req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};
