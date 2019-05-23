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
    // login via both username and email allowed
    let loginInfo = req.body;
    if(validator.isEmail(loginInfo.identity)){
      User.find({email: email}, (err, user) => {
        if(err) return next(err);
        // if(!user) return next();
        return res.json(user);
      });
    }
    else if(!validator.isEmail(loginInfo.identity) && loginInfo.identity){
      User.find({username: loginInfo.identity}, (err, user) => {
        if(err) return next(err);
        return res.json(user);
      });
    }
    else return res.send("Invalid Input");
  },

};
