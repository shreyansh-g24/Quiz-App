  // SIGNUP FORM JAVASCRIPT //
  // Declaring functions //
  function isAlphanumeric(str){
    if(str.match(/[^0-9A-Za-z]/i)) return false;
    else return true;
  }

  // selecting input fields
  let usernameInput  = document.querySelector("#usernameInput");
  let emailInput = document.querySelector("#emailInput");
  let passwordInput = document.querySelector("#passwordInput");
  // selecting help texts
  let usernameSuccess = document.querySelector("#usernameSuccess");
  let usernameWarning = document.querySelector("#usernameWarning");
  let emailSuccess = document.querySelector("#emailSuccess");
  let emailWarning = document.querySelector("#emailWarning");
  let passwordSuccess = document.querySelector("#passwordSuccess");
  let passwordWarning = document.querySelector("#passwordWarning");

  // adding event listeners to input fields
  // username input
  usernameInput.addEventListener("keyup", () => {
    if(usernameInput.value !== "" && usernameInput.value.length < 6){
      // updating help text
      usernameWarning.style.display = "block";
      usernameWarning.innerText = "The username is invalid!";
      usernameSuccess.style.display = "none";
      // updating input field values
      usernameInput.classList.remove("is-success");
      usernameInput.classList.add("is-danger");
    }
    else if(!isAlphanumeric(usernameInput.value)){
      // updating help text
      usernameWarning.style.display = "block";
      usernameWarning.innerText = "The username has to be alphanumeric!";
      usernameSuccess.style.display = "none";
      // updating input field values
      usernameInput.classList.remove("is-success");
      usernameInput.classList.add("is-danger");
    }
    else if(usernameInput.value.length > 6 && isAlphanumeric(usernameInput.value)){
      // updating help text
      usernameWarning.style.display = "none";
      usernameSuccess.style.display = "block";
      // updating input field values
      usernameInput.classList.remove("is-danger");
      usernameInput.classList.add("is-success");
    }
  });
  // password input
  passwordInput.addEventListener("keyup", () => {
    if(passwordInput.value !== "" && passwordInput.value.length < 6){
      // updating help text
      passwordWarning.style.display = "block";
      passwordWarning.innerText = "The password is less than 6 characters";
      passwordSuccess.style.display = "none";
      // updating input field values
      passwordInput.classList.remove("is-success");
      passwordInput.classList.add("is-danger");
    }
    else if(passwordInput.value.length > 6){
      // updating help text
      passwordWarning.style.display = "none";
      passwordSuccess.style.display = "block";
      // updating input field values
      passwordInput.classList.remove("is-danger");
      passwordInput.classList.add("is-success");
    }
  });
  // email input
  emailInput.addEventListener("keyup", () => {
    if(emailInput.value !== "" && !emailInput.checkValidity()){
      // updating help text
      emailWarning.style.display = "block";
      emailWarning.innerText = "The email is invalid!";
      emailSuccess.style.display = "none";
      // updating input field values
      emailInput.classList.remove("is-success");
      emailInput.classList.add("is-danger");
    }
    else if(emailInput.checkValidity()){
      // updating help text
      emailWarning.style.display = "none";
      emailSuccess.style.display = "block";
      // updating input field values
      emailInput.classList.remove("is-danger");
      emailInput.classList.add("is-success");
    }
  });

  // adding event listener on cancel btn
  let resetBtn = document.querySelector("#resetBtn");

  resetBtn.addEventListener("click", () => {
    // resetting classes on help text and input fields
    passwordSuccess.style.display = "none";
    passwordWarning.style.display = "none";
    usernameSuccess.style.display = "none";
    usernameWarning.style.display = "none";
    emailSuccess.style.display = "none";
    emailWarning.style.display = "none";
    emailInput.classList.remove("is-danger", "is-success");
    usernameInput.classList.remove("is-danger", "is-success");
    passwordInput.classList.remove("is-danger", "is-success");
  });
