"use strict";
var loginModule = (function(){
  var login = {
    'token': null,
    startLogin: function(){
      login.getLoginInfo();
    },
    getLoginInfo: function(){
      let user = document.getElementById('login-email').value;
      let pass = document.getElementById('login-password').value;
      console.log(user);
      console.log(pass);
      if(user !== '' && pass !== ''){
        if(login.validateEmail(user)){
          login.sendLogin('https://apis.detroitmi.gov/photo_survey/auth_token/',{"email":user,"password":pass})
        }else{
          console.log('invalid email');
          document.getElementById('invalid-login').className = "login-alert active";
          document.getElementById('login-display').className = "";
          document.getElementById('login-display').className = "error";
          setTimeout(function() {
            document.getElementById('login-display').className = "";
          }, 1000);
        }
      }else{
        console.log('missing fields');
        document.getElementById('invalid-login').className = "login-alert active";
        document.getElementById('login-display').className = "";
        document.getElementById('login-display').className = "error";
        setTimeout(function() {
          document.getElementById('login-display').className = "";
        }, 1000);
      }
    },
    closeErrorMessage: function(){
      document.getElementById('invalid-login').className = "login-alert";
    },
    validateEmail : function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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
            login.setToken(response.token);
            console.log(login.getToken);
            login.exitLoginScreen();
          },
          error: function(error){
              console.log("Something went wrong", error);
              document.getElementById('invalid-login').className = "login-alert active";
              document.getElementById('login-display').className = "";
              document.getElementById('login-display').className = "error";
              setTimeout(function() {
                document.getElementById('login-display').className = "";
              }, 1000);
          }
      });
    },
    exitLoginScreen: function(){
      document.getElementById('login-panel').className = 'hidden';
      login.getToken();
    },
    setToken: function(token){
      login.token = token;
    },
    getToken: function(){
    return login.token;
    }
  };
  return login;
})(window);
