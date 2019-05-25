// CONTROLLER: QUIZ //

// importing modules
let mongoose = require("mongoose");
// let stringSimilarity = require("string-similarity");

// getting quiz model
let Quiz = mongoose.model("Quiz");

// requiring the user controller
let {associateQuiz} = require("./userController");

// exporting quiz controller functions
module.exports = {
  // rendering form for a new quiz
  renderNewQuizForm: function(req, res, next){
    res.render("/newQuizForm");
  },

  // creating a new quiz
  createNew: function(req, res, next){

    // associating the quiz with the creator
    req.body.creator_id = req.decoded._id;

    Quiz.create(req.body, (err, newQuiz) => {
      if(err) return next(err);

      // associating the creator with the quiz
      associateQuiz(newQuiz._id, newQuiz.creator_id, next);

      return res.status(201).send("Quiz created successfully!");
    });
  },
  
  // deleting the requested quiz and returning it
  deleteQuiz: function(req, res, next){
    Quiz.findById(req.params.id, (err, quiz) => {
      if(err) return next(err);

      // checking authorisation before deletion
      if(req.decoded._id.toString() !== quiz.creator_id.toString()) return res.status(403).send("You're not authorized to delete this quiz!");

      // if authorisation passed, updating the quiz to be marked as deleted
      Quiz.findByIdAndUpdate(req.params.id, {isDeleted: true}, {new: true}, (err, updatedQuiz) => {
        if(err) return next(err);
        res.status(200).redirect(`/users/${updatedQuiz.creator_id}`);
      }); 
    });
  },

  // restoring the quiz
  restoreQuiz: function(req, res, next){
    Quiz.findById(req.params.id, (err, quiz) => {
      if(err) return next(err);

      // checking authorisation before deletion
      if(req.decoded._id.toString() !== quiz.creator_id.toString()) return res.status(403).send("You're not authorized to restore this quiz!");

      // if authorisation passed, updating the quiz to be marked as not deleted
      Quiz.findByIdAndUpdate(req.params.id, {isDeleted: false}, {new: true}, (err, updatedQuiz) => {
        if(err) return next(err);
        res.status(200).redirect(`/users/${updatedQuiz.creator_id}`);
      });
    });
  },
};
