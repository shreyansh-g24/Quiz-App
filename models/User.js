// USER SCHEMA //

// importing modules
let mongoose = require("mongoose");
let bcryptjs = require("bcryptjs");
let validator = require("validator");

/*
  Defining User schema:
    username: unique username of the user
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
    minlength: 6,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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
  //
  participations: [{
    quizAttempt: {
      type: mongoose.Schema.Types.ObjectId,
    },
    score: {
      type: Number,
    },
    date: {
      type: Date,
    },
  }],
  // 
  contributions: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
}, {timestamps: true});

// adding middlewares //
// pre-save hook: hashing password before saving the document
userSchema.pre("save", function(next){
  let user = this;
  // checking if the password was modified
  if(user.isModified("password")){
    bcryptjs.genSalt(10, function(err, salt){
      if(err) return next(err);
      bcryptjs.hash(user.password, salt, function(err, hash){
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
