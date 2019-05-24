// API CONTROLLER: QUIZ //

// importing modules
let mongoose = require("mongoose");
let stringSimilarity = require("string-similarity");

// getting quiz model
let Quiz = mongoose.model("Quiz");

// exporting quiz controller functions
module.exports = {
  // returning all quizzes
  returnAll: function(req, res, next){
    Quiz.find({}, (err, quizArr) => {
      if(err) return next(err);
      res.status(200).json(quizArr);
    });
  },

  // searching db for matching quizzes
  searchQuizzes: function(req, res, next){
    // extracting the query string
    let queryString = req.body.query;
    Quiz.find({}, function(err, quizArr){
      if(err) return next(err);
      
      // extracting quiz titles into an array
      let titles = [];
      
      // TEMP: Add support for searching via description and tags and return the _id of the matches as well ////////////////////////////

      quizArr.forEach((quiz) => titles.push(quiz.title));

      // matching the titles array with the query string and arranging in descending order of similarity
      let match = stringSimilarity.findBestMatch(queryString, titles);
      let matchRatings = match.ratings;
      let matches = matchRatings.sort(function(a, b){return b.rating - a.rating});

      let order = [];
      matches.forEach((match) => order.push(match.target));

      // returning the matches
      res.status(200).json(order);
    });
  },

  // returning the requested quiz
  returnQuiz: function(req, res, next){
    Quiz.findById(req.params.id, (err, quiz) => {
      if(err) return next(err);
      res.status(200).json(quiz);
    });
  },
};
