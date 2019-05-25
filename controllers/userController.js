// CONTROLLER: USER //

// importing modules
// let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("./../config/config");

// Requiring User Model
// let User = mongoose.model("User");
let User = require('../models/User')

// exporting controller functions
module.exports = {
	// extract token value and set it in headers for authenticateJWT middleware
	extractJWT: function(req, res, next){
		let token = req.query["t"];
		console.log(token);
		let decoded = jwt.verify(token, config.SECRET);
		if(decoded._id){
			req.decoded = decoded;
			req.decoded.verified = true;
			next();
		}
		else res.status(401).json(decoded);
	},

	// associating the creator with the quiz created
	associateQuiz: function(quizID, creatorID, next){
		User.findByIdAndUpdate(creatorID, {$push: {quizzesCreated: quizID}}, {new: true}, (err, creator) => {
			if(err) return next(err);
			console.log("userController.js: Creator updated => ", creator.quizzesCreated);
		});
	},

	// authenticating jwt
	authenticateJWT: function(req, res, next){
		let token = req.header("x-auth");
		let decoded = jwt.verify(token, config.SECRET);
		if(decoded._id){
			req.decoded = decoded;
			req.decoded.verified = true;
			next();
		}
		else{
			res.status(401).json(decoded);
		}
	},

	// creating a new user
	createUser: function (req, res, next) {
		User.create(req.body, (err, newUser) => {
			if (err) return next(err);
			res.status(201).redirect("/?message=Account%20Made!%20Login%20to%20get%20started!&status=success");
		});
	},

	// logging in user's account
	login: function (req, res, next) {
		User.findByCredentialsAndValidate(req.body.identity, req.body.password)
			.then(user => {
				let token = user.generateWebToken();
				res.header("x-auth", token);
				return res.status(200).redirect(`/?t=${token}&u=${user.username}&id=${user._id}`);
			})
			.catch(e => {
				return res.status(400).json(e);
			});
	},

	// displaying user profile
	userProfile: function(req, res, next){
		if(req.decoded._id === req.params.id){
			User.findById(req.params.id).populate("participations").populate("quizzesCreated").exec((err, user) => {
				if(err) return next(err);
				// rendering the user profile file and passing the user object
				console.log(user);
				res.status(200).render("userProfile", {
					links: {
						home: "/",
						about: "/about",
					},
					user: user,
				});
			});
		}
		else res.status(401).redirect("/?message=Unauthorised%20profile%20access!");
	},
};
