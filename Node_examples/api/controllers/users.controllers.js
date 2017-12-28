var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register= function (req,res){
  console.log('Registering the User');
  var name     = req.body.name || null;
  var username = req.body.username;
  var password = req.body.password;

  User.create({
    username: username,
    name: name,
    password: bcrypt.hashSync(password,bcrypt.genSaltSync(10))
  },function(err, user) {
    if(err) {
      console.log('Registering failed');
      res
      .status(400).json(err);
    } else {
      console.log('User registered');
      res.status(201).json(user);
    }
  });

};

module.exports.login = function (req,res){
  console.log('logging in the user');
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username
  }).exec(function(err, user) {
    if(err) {
      console.log('login  failed');
      res
      .status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('User logged in');
        var token = jwt.sign({username: user.username}, 's3cr3t', {expiresIn: 3600});
        res.status(201).json({success: true, token: token});
      } else {
        res.status(401).json('Unauthorised');
      }

    }
  });
};

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,'s3cr3t',function(error,decoded) {
      if(error) {
        console.log('Unauthorized');
        res
        .status(400).json(error);

      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};
