// JAVSCRIPT FOR HEADER //

// Declaring global variables and constants
let Global_User = JSON.parse(localStorage.getItem("quizAppUser")) ? JSON.parse(localStorage.getItem("quizAppUser")) : "";
let Global_OrderedQuiz = null;

// Declaring functions //

// looking up quizzes using query strings
function searchQuizHandler(){
  // selecting the input field
  let searchQuizInput = document.querySelector("#heroSearchbar");
  searchQuizInput.addEventListener("keyup", (event) => {
    if(event.keyCode === 13){
      fetch("http://localhost:3000/api/v1/quiz/search", {
        method: "POST",
        body: JSON.stringify({query: searchQuizInput.value}),
        headers: {
          "Content-Type": "application/json",
          "x-auth": Global_User.token,
        },
      }).then(response => response.json())
        .then(data => {
          Global_OrderedQuiz = data;
          displayQuizList(Global_OrderedQuiz);
        })
        .catch(e => console.log(e));

        searchQuizInput.value = "";
    }
  });
}

// extracting and saving token from url
function queryHandler(){
  if(window.location.search){ 
    let queries = window.location.search.split("&");
    queries = queries.map((query) => query.split("="));
    let user = {};
    // handling user info
    if(queries[0] && queries[0][0] === "?t") {
      let token = queries[0][1];
      user.token = token;
    }
    if(queries[1] && queries[1][0] === "u") {
      let username = queries[1][1];
      user.username = username;
    }
    if(queries[2] && queries[2][0] === "id") {
      let userId = queries[2][1];
      user.userId = userId;
    }

    // handling messages
    if(queries[0] && queries[0][0] === "?message") return displayMessage(queries[0][1], queries[1][1]);

    localStorage.setItem("quizAppUser", JSON.stringify(user));

    // resetting the location
    window.location = window.location.origin;
  }
  return 0;
}

// displaying message in header
// message: receives the message to be displayed
// status: a boolean value to convey if the message is a success or a danger message
function displayMessage(message, status){
  let messageContainer = document.querySelector("#messageContainer");
  message = decodeURI(message);
  messageContainer.innerText = message;
  if(status === "success") messageContainer.classList.add("is-success");
  else if(!status === "danger") messageContainer.classList.add("is-danger");
  return 0;
}

// Checking if user is logged in
function isLoggedIn(){
  let token = Global_User.token;
  if(Boolean(token)) return true;
  else if(!Boolean(token)) return false;
}

// initialising the page depending upon if the user is logged in or not
function init(){
  // selecting elements
  let heroSearchbarText = document.querySelector("#heroSearchbarHelpText");
  let heroSearchbar = document.querySelector("#heroSearchbar");
  let heroSignUp = document.querySelector("#heroSignUp");
  let heroLogIn = document.querySelector('#heroLogIn');

  if(isLoggedIn()){
    // updating elements
    // search bar
    heroSearchbarText.innerText = "Search Quiz by Topic of choice.";
    heroSearchbar.disabled = false;
    // login/signup
    heroLogIn.innerText = "LogOut"
    heroLogIn.href = "#";
    heroLogIn.addEventListener("click", () => {
      localStorage.clear();
      window.location.replace("http://localhost:3000/");
    });
    heroSignUp.innerText = "Hi, " + Global_User.username;
    heroSignUp.classList.add("is-info");
    heroSignUp.href = `http://localhost:3000/users/${Global_User.userId}/?t=${Global_User.token}`;
  }
  else if(!isLoggedIn()){
    // updating elements
    // search bar
    heroSearchbarText.innerText = "Login or SignUp to search.";
    heroSearchbar.disabled = true;
    // login/signup
    heroLogIn.innerText = "Log In";
    heroSignUp.innerText = "Sign Up";
  }
}

// Execution //
searchQuizHandler();
queryHandler();
init();