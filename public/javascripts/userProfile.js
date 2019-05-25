// USER PROFILE PAGE JAVASCRIPT //

// declaring functions
function createQuizInit(){
  let createQuizBtn = document.querySelector("#heroCreateQuiz");

  createQuizBtn.addEventListener("click", () => {
    window.location.replace("http://localhost:3000/quiz/newQuizForm");
  });
}


//executions //
// let token = JSON.parse(localStorage.getItem("quizAppUser")).token;
// console.log(token);

// deleting and restoring quizzes
// let deleteQuiz = document.querySelector("#deleteQuiz");
// let restoreQuiz = document.querySelector("#restoreQuiz");
// deleteQuiz.href += "/?t=" + token;
// restoreQuiz.href += "/?t=" + token;

