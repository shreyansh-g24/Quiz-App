// LOGIN JAVASCRIPT //

let LoginPageUser = JSON.parse(localStorage.getItem("quizAppUser"));

// checking if any user is already logged in
if(LoginPageUser.token) {
  window.location.replace("http://localhost:3000/");
};
