// API CONTROLLER: QUIZ //

// importing modules
let mongoose = require("mongoose");
let Fuse = require("fuse.js");

// getting quiz model
let Quiz = mongoose.model("Quiz");

// exporting quiz controller functions
module.exports = {
  // returning all quizzes
  returnAll: function(req, res, next){
    Quiz.find({}).populate("creator_id").exec((err, quizArr) => {
      if(err) return next(err);
      res.status(200).json(quizArr);
    });
  },

  // searching db for matching quizzes
  searchQuizzes: function(req, res, next){
    // extracting the query string
    let queryString = req.body.query;

    // defining fuse options
    let fuseOptions = {
      shouldSort: true,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "description",
        "tags"
      ],
    };
    Quiz.find({}).populate("creator_id").exec(function(err, quizArr){
      if(err) return next(err);
      let fuse = new Fuse(quizArr, fuseOptions);
      let result = fuse.search(queryString);
      res.status(200).json(result);
    });
  },

  // returning the requested quiz
  returnQuiz: function(req, res, next){
    Quiz.findById(req.params.id).populate("creator_id").exec((err, quiz) => {
      if(err) return next(err);
      res.status(200).render("quizPreview", {
        links: {
          home: "/",
          about: "/about",
          login: "/login",
          signup: "/signup",
        },
        quiz: quiz,
      });
    });
  },
};
