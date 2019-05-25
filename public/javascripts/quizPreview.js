// QUIZ PREVIEW JAVASCRIPT

// Declaring functions //

// initialising quiz
function initQuiz(){
  // selecting elements
  let attemptQuiz = document.querySelector("#attemptQuiz");
  let quiz = document.querySelector("#quiz");

  // adding event listener to attempt button
  attemptQuiz.addEventListener("click", () => {
    quiz.style.display = "block";
  });
}

function calculateScore(){
  // selecting elements
  let submitAns = document.querySelector("#submitAns");
  let quizResult = document.querySelector("#quizResult");
  let quizTitle = document.querySelector("#quizTitle");
  let optionArr = document.querySelectorAll(".option")
  let userScore = 0;

  // adding event listener to submit answers button
  submitAns.addEventListener("click", () => {
    // calculating result
    let totalScore = quizTitle.dataset.score;

    optionArr.forEach((option) => {
      if(option.dataset.bool === "true") option.parentElement.style.color = "green";
      if(option.checked && option.dataset.bool === "true"){
        userScore++;
      }
      else if(option.checked && option.dataset.bool === "false") {
        option.parentElement.style.color = "red";
      }
    });

    quizResult.innerHTML = `<p>You scored <strong>${userScore}</strong> out of <strong>${totalScore}</strong></p>`;
    if(userScore/totalScore > 0.6) quizResult.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    else quizResult.style.backgroundColor = "rgba(255, 0, 0, 0.7)";

    // displaying result
    quizResult.style.display = "block";
  });
}


// execution
initQuiz();
calculateScore();
  