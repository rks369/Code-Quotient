let password = document.getElementById('password');
let password_err = document.getElementById('password_err');

let cnf_password = document.getElementById('confirm_password');
let cnf_password_err = document.getElementById('cnf_password_err');

let error_msg = document.getElementById('error_msg');

let change_password = document.getElementById('change_password');

password.addEventListener('keyup', () => {
  error_msg.innerHTML = ''
  validatePassword(password.value.trim());
})

cnf_password.addEventListener('keyup', () => {
  error_msg.innerHTML = ''
  validatePassword(cnf_password.value.trim());
})

function validatePassword(password) {
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  let flag = true;

  if (!password.match(lowerCaseLetters)) {
    let p = document.createElement('p');
    p.innerHTML = 'One Lowercase Letter';
    password_err.append(p);
    flag = false;
  }

  if (!password.match(upperCaseLetters)) {

    let p = document.createElement('p');
    p.innerHTML = 'One Uppercase Letter';
    password_err.append(p);
    flag = false;
  }


  if (!password.match(numbers)) {

    let p = document.createElement('p');
    p.innerHTML = 'One Number';
    password_err.append(p);
    flag = false;
  }

  if (password.length < 8) {
    let p = document.createElement('p');
    p.innerHTML = 'Minimum 8 Character Long';
    password_err.append(p);
    flag = false;
  }

  return flag;

}

change_password.addEventListener('click', () => {
  error_msg.innerHTML = '';
  password_err.innerHTML = '';
  cnf_password_err.innerHTML = '';

  if (!validatePassword(password.value.trim())) {
    password.innerHTML = 'Please Enter A Valid Password!';
  } else if (!validatePassword(cnf_password.value.trim())) {
    cnf_password_err.innerHTML = 'Please Enter A Valid Password!';
  } else if (password.value.trim() == cnf_password.value.trim()) {
    fetch('/changePassword', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ password: password.value.trim() })
    }).then(response => response.json())
      .then(function (result) {
        console.log(result);
        if (result['msg'] == 'done') {
          error_msg.innerHTML = 'Password Change SucessFully. Redirecting Please Wait';
          setTimeout(() => {
            window.location.href = './products';
          }, 1000)
        } else {
          error_msg.innerHTML = 'Something Went Wrong !!!';
        }
      })
  } else {
    error_msg.innerHTML = 'Password & Confirm Password Did not Match !!!';
  }
})