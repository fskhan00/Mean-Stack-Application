var hotelData               = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function (req, res){
  console.log('Controller activated-jason Data');
  res
  .status(200)
  .json(hotelData);
};
