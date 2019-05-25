// ROUTE HANDLER: INDEX.JS //

// importing modules
let express = require('express');
let router = express.Router();

/*
  HANDLED ROUTES:
    => GET / Rendering home page
    => GET /login Rendering login page
    => GET /signup Rendering signup page
*/

// rendering home page
router.get('/', function(req, res, next) {
  res.render('index', {
    links: {
      home: "/",
      about: "/about",
      login: "/login",
      signup: "/signup",
      searchURL: "http://localhost:3000/api/v1/quiz/search",
    },
  });
});

// rendering login page
router.get("/login", function(req, res, next){
  res.render("login", {
    links: {
      home: "/",
      about: "/about",
      login: "/login",
      signup: "/signup",
      loginURL: "http://localhost:3000/users/login",
    },
  });
});

// rendering signup page
router.get("/signup", function(req, res, next){
  res.render("signup", {
    links: {
      home: "/",
      about: "/about",
      login: "/login",
      signup: "/signup",
      signUpURL: "http://localhost:3000/users/new",
    },
  });
});

// exporting router
module.exports = router;
