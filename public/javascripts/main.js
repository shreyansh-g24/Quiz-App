// MAIN.JS //

// Declaring Global Variables and Constants //
let Global_quizStore = null;

// Declaring functions //

// displaying the quiz list
// quizArr: receives an array of quizzes
// returns: 0 if success
function displayQuizList(quizArr){
  // selecting quiz container
  let quizDisplayContainer = document.querySelector("#homeQuizDisplayContainer");
  // resetting container html
  quizDisplayContainer.innerHTML = "";

  // displaying quizzes
  quizArr.forEach((quiz) => {
    quizDisplayContainer.innerHTML += formatHtml(quiz);
  });

  return 0;
}

// formatting html block with quiz data
// quizObj: receives a quiz object
// returns: formatted html code
function formatHtml(quizObj){
  let quizRedirect = "";

  // updating redirection url depending upon if the user is logged in
  if(isLoggedIn()) quizRedirect = `http://localhost:3000/api/v1/quiz/search/${quizObj._doc._id}`;
  else if(!isLoggedIn()) quizRedirect = "http://localhost:3000/login";

  // formatting html card with quiz info
  let formattedQuizCard = `<div class="card margin-basic shadow-basic">
<div class="card-content">
  <p class="title">${quizObj._doc.title}</p>
  <p class="subtitle">by ${quizObj._doc.creator_id.username}</p>
</div>
<footer class="card-footer">
  <p class="card-footer-item"><span><a href="${quizRedirect}">Read
        More</a></span></p>
</footer>
</div>`;

  return formattedQuizCard;
}

// Execution //
// fetching and displaying data
fetch("http://localhost:3000/api/v1/quiz")
  .then(response => response.json())
  .then(data => {
    Global_quizStore = data;
    displayQuizList(data);
  })
