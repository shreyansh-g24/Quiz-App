// ROUTE HANDLER: AUTH.JS //

// importing modules
let express = require("express");
let router = express.Router();
let config = require("./../config/config");
let passport = require("passport");
let GitHubStrategy = require("passport-github");

// requiring model
let User = require("./../models/User");

// adding middleware to use github stategy
passport.use(new GitHubStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    
    // extracting user profile from the returned data
    let jsonProfile = profile._json;
    
    // checking if the email is already registered
    User.findOne({ email: jsonProfile.email }, function (err, foundUser) {
      if(err) return cb(err, null);
      // if user match found
      if (foundUser) {
        return cb(null, foundUser);
      }

      // creating a new user if match not found
      let newUser = new User({
        username: jsonProfile.username,
        email: jsonProfile.email,
        photoURL: jsonProfile.avatar_url,
      });

      newUser.save(function (err, savedUser) {
        if(err) return cb(err, null);
        return cb(null, savedUser);
      });
    })
  }
));

/*
  Handled Routes:
    => GET /github :- passport authentication
    => GET /github/callback :- callback function
*/

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', function(req, res, next) {
  passport.authenticate('github', function(err, user) {

    if(err) return res.send({message: 'Github Authentication error'});

    // redirecting to login page
    res.redirect("/");
  })(req, res, next);
});

// exporting router
module.exports = router;
