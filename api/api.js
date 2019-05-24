// ROUTE HANDLER: API.JS //

let express = require("express");
let router = express.Router();

// requiring routers
let quizRouter = require("./v1/routes/quizzes");

// Redirecting requests for /api/v1
router.use("/v1/quiz/", quizRouter);

// exporting api router
module.exports = router;
