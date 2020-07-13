'use strict';

// 2
let login = new UserForm();
// let register = new UserForm();

// 3 pls kill me
login.loginFormCallback = data => ApiConnector.login(data, (response) => {
  console.log(response);
  if (response.success) {
      location.reload();
  } else {
      login.setLoginErrorMessage(response.data);
  }
})


login.registerFormCallback  = data => ApiConnector.register(data, (response) => {
  console.log(response);
  if (response.success) {
    location.reload();
  } else {
    login.setRegisterErrorMessage(response.data);
  }
})


