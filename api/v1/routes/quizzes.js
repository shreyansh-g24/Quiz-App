// API ROUTE HANDLER: QUIZZES.JS //

// importing modules
let express = require("express");
let router = express.Router();

// requiring controller functions
let quizController = require("./../controllers/quizController");
let {authenticateJWT} = require("./../../../controllers/userController");

/* 
  Handled Routes:
    => GET / : requesting all quizzes
    => POST /search: search quizzes based on query string
    => GET /search/:id :- returns the quiz with matching id
*/

router.get("/", quizController.returnAll);
router.post("/search", authenticateJWT, quizController.searchQuizzes);
router.get("/search/:id", authenticateJWT, quizController.returnQuiz);

// exporting router
module.exports = router;
