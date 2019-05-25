// ROUTE HANDLER: USERS.JS //

// importing modules
let express = require('express');
let router = express.Router();

// requiring controller
let userController = require("./../controllers/userController");

/*
  Handled Routes:
    => POST /new :- Creating a new user
    => POST /login :- logging in user's account
    => GET /:id :- accessing the token for redirection to user profile
*/

router.post('/new', userController.createUser);
router.post("/login", userController.login);
router.get("/:id", userController.extractJWT, userController.userProfile);

// exporting router
module.exports = router;
