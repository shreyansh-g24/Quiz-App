// QUIZ SCHEMA //

// importing modules
let mongoose = require("mongoose");

/* 
  Defining quiz schema 
    title of the string
    description of the quiz
    tags to tag the quiz for searching purposes
    id of the creator
    ids of the participants
    
    content:
      Text of the question
      options to choose from
        text of the option
        boolean value to handle multiple correct options

    ??: (metadata)
      attempts: number of attempts made for the quiz,
      avg: avg score earned by participants in the quiz
      rating: avg rating given to the quiz by participants
*/
let quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  //
  content: [{
    questionText: {
      type: String,
      required: true,
    },
    questionOptions: [{
      option: {
        type: String,
        required: true,
        trim: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    }],
  }],
}, {timestamps: true});

// requiring model
let Quiz = mongoose.model("Quiz", quizSchema);

// exporting model
module.exports = Quiz;
