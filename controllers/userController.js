// CONTROLLER: USER //

// importing modules
let mongoose = require("mongoose");
let validator = require("validator");

// Requiring User Model
let User = mongoose.model("User");

// exporting controller functions
module.exports = {
  // creating a new user
  createUser: function(req, res, next){
    User.create(req.body, (err, newUser) => {
      if(err) return next(err);
      res.json(newUser);
    });
  },
  
  // logging in user's account
  login: function(req, res, next){
    User.findByCredentialsAndValidate(req.body.identity, req.body.password)
      .then(user => {
        return res.json(user);
      })
      .catch(e => {
        return res.json(e);
      });
  },
};
