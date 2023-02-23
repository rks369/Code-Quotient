const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const errorSpan = document.getElementById('error_msg');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click', function (event) {
  let user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  }
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  }).then(response => response.json())
    .then(function (result) {
      console.log(result);
      if (result['msg'] == 'success') {
        window.location.href = './myAccount';
      } else if (result['msg'] == 'userexist') {
        errorSpan.innerHTML = "Email Id Already Exists"
      }
    });
})