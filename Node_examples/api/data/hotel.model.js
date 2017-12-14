var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    'default': 0,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }

});

var roomSchema = new mongoose.Schema({
  rooms: String,
  number: Number,
  description: String,
  photos: [String],
  price: Number
});

var hotelSchema  = new mongoose.Schema({
  name: String,
  stars: {
    type: Number,
    min: 0,
    max: 5
  },
  photos: [String],
  currency: String,
  description: String,
  services: [String],
  rooms: [roomSchema],
  reviews: [reviewSchema],
  location: {
    address: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

mongoose.model('Hotel',hotelSchema);
