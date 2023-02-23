
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorSpan = document.getElementById('error_msg');
const loginBtn = document.getElementById('loginBtn');


loginBtn.addEventListener('click', function (event) {
  let user = {
    email: emailInput.value,
    password: passwordInput.value,
  }
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  }).then(response => response.json())
    .then(function (result) {
      console.log(result);
      if(result['msg']=='success')
      {
        window.location.href='./myAccount';
      }else if(result['msg']=='userexist')
     {
       errorSpan.innerHTML="Email Id Already Exists"
     }
    });
})