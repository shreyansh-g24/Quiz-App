// USER SCHEMA //

// importing modules
let mongoose = require("mongoose");
let bcryptjs = require("bcryptjs");
let validator = require("validator");
let jwt = require("jsonwebtoken");
let config = require("./../config/config");

/*
  Defining User schema:
    username: unique username of the user, can only be alphanumeric
    password: Encrypted password in string,
    email: validated unique email
    avgScore: average score from all previous quiz attempts
    participations: 
      quizAttempt: _id of the quiz attempted
      score: score
      date: Date and time of when the quiz was completed and stored in the DB
    contributions: Array of _id of quizzes created by the user
*/

let userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	photoURL: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: "{VALUE} is not a valid email!",
		},
	},
	avgScore: {
		type: Number,
		default: 0,
	},
	participations: [{
		quizAttempt: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Quiz",
		},
		score: {
			type: Number,
		},
		date: {
			type: Date,
		},
	}],
	quizzesCreated: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Quiz",
	}],
}, { timestamps: true });

// adding middlewares //

// picking out user document fields to be returned upon query
userSchema.methods.toJSON = function(){
	let user = this;
	// extracting fields to be returned
	let {email, username, avgScore, quizzesCreated, participations, photoURL} = user;
	let userObject = {email, username, photoURL, avgScore, quizzesCreated, participations};
	return userObject;
}

// finding user from the database with matching email/username
userSchema.statics.findByCredentialsAndValidate = function (identity, password) {
	let User = this;
	// returning a promise
	return new Promise((resolve, reject) => {
		// if email is valid
		if (validator.isEmail(identity)) {
			User.findOne({ email: identity }).populate("quizzesCreated").exec((err, user) => {
				if (err) reject({ err: err });
				// if user with matching email not found
				if (!user) reject({ err: "Email match not found!" });
				// if user found, validating password
				if (user) {
					let validationResult = user.validatePassword(password, user.password);
					if (validationResult) resolve(user);
					else if (!validationResult) reject({ err: "Invalid Password!" });
				}
			});
		}
		// if invalid email but valid username
		else if (!validator.isEmail(identity) && validator.isAlphanumeric(identity)) {
			User.findOne({ username: identity }).populate("quizzesCreated").exec((err, user) => {
				if (err) reject({ err: err });
				// if user with matching username not found
				if (!user) reject({ err: "Username match not found!" });
				// if user found, validating password
				if (user) {
					let validationResult = user.validatePassword(password, user.password);
					if (validationResult) resolve(user);
					else if (!validationResult) reject({ err: "Invalid Password" });
				}
			});
		}
		else if (!validator.isEmail(identity) && !validator.isAlphanumeric(identity)) {
			reject({ err: "Invalid Credentials" });
		}
	});
}

// validating password for login
userSchema.methods.validatePassword = function (passwordInput, passwordHash) {
	if (passwordInput.length < 8) return false;
	return bcryptjs.compareSync(passwordInput, passwordHash);
}

// creating a json web token
userSchema.methods.generateWebToken = function(){
	let user = this;
	let token = jwt.sign({_id: user._id, access: "auth"}, config.SECRET, {expiresIn: "100h"});
	return token;
}

// pre-save hook: hashing password before saving the document
userSchema.pre("save", function (next) {
	let user = this;
	// checking if the password was modified
	if (user.isModified("password")) {
		bcryptjs.genSalt(10, function (err, salt) {
			if (err) return next(err);
			bcryptjs.hash(user.password, salt, function (err, hash) {
				user.password = hash;
				return next();
			});
		});
	}
	else return next();
});

// requiring model
let User = mongoose.model("User", userSchema);

// exporting the User model
module.exports = User;
