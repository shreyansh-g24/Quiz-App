// ROUTE HANDLER: QUIZZES.JS //

// importing modules
let express = require("express");
let router = express.Router();

// requiring controller functions
let quizController = require("./../controllers/quizController");
let {authenticateJWT, extractJWT} = require("./../controllers/userController");

/* 
  Handled Routes:
    => POST /new: create a new quiz
    => GET /newQuizForm: Rendering form for a new quiz
    => GET /delete/:id :- deleting a quiz and returning it, selection with id
    => GET /restore/:id :- restoring a previously deleted quiz and returning it, selection with id
*/

router.post("/new", authenticateJWT, quizController.createNew);
router.get("/newQuizForm", quizController.renderNewQuizForm);
router.get("/delete/:id", extractJWT, quizController.deleteQuiz);
router.get("/restore/:id", extractJWT, quizController.restoreQuiz);

// exporting router
module.exports = router;
