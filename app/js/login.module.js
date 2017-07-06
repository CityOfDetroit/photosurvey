"use strict";
var loginModule = (function(){
  var validateEmail = function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  var login = {
    'token': null,
    'user': null,
    'password': null,
    startLogin: function(){
      this.getLoginInfo();
    },
    getLoginInfo: function(){
      let user = document.getElementById('login-email').value;
      let pass = document.getElementById('login-password').value;
      console.log(user);
      console.log(pass);
      if(user !== '' && pass !== ''){
        console.log('not empty fields');
        if(validateEmail(user)){
          console.log('valid email');
          this.sendLogin('https://apis.detroitmi.gov/photo_survey/auth_token/',{"email":user,"password":pass})
        }else{
          console.log('invalid email');
        }
      }else{
        console.log('missing fields');
      }
    },
    sendLogin: function(url, data){
      data = JSON.stringify(data);
      console.log(data);
      $.ajax({
          url: url,
          type: "POST",
          data: data,
          dataType:'json',
          success: function(response){
            console.log(response);
            this.token = response.token;
            console.log(this.token);
            login.exitLoginScreen();
          },
          error: function(error){
              console.log("Something went wrong", error);
          }
      });
    },
    exitLoginScreen: function(){
      document.getElementById('login-panel').className = 'hidden';
      this.getToken();
    },
    getToken: function(){
      currentToken = this.token;
    }
  };
  return login;
})(window);
