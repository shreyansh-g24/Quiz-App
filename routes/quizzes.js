// ROUTE HANDLER: QUIZZES.JS //

// importing modules
let express = require("express");
let router = express.Router();

// requiring controller
let quizController = require("./../controllers/quizController");

/* 
  Handled Routes:
    => GET / : requesting all quizzes
    => POST /new: create a new quiz
    => POST /search: search quizzes based on query string
    => GET /search/:id :- returns the quiz with matching id
    => GET /delete/:id :- deleting a quiz and returning it, selection with id
*/

router.get("/", quizController.returnAll);
router.post("/new", quizController.createNew);
router.post("/search", quizController.searchQuizzes);
router.get("/search/:id", quizController.returnQuiz);
router.get("/delete/:id", quizController.deleteQuiz);

// exporting router
module.exports = router;
