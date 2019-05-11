function checkLoginState() {
  FB.getLoginStatus(function(response) {
    FB.api('/me', function(response) {
      $.post('/getstatus', response, (data)=> {
        if (typeof(data[0])!="undefined") {
          document.getElementById("fb-login-button").style.display="none";
          document.getElementById("logout").style.display="none";
          document.getElementById("establish_membership").style.display="none";
          document.getElementById("continue_visitor").style.display="none";
          document.getElementById("login").style.display="none";
          if (click==="login") {
            setTimeout(testAPI, 5000);
            document.getElementById('status').innerHTML = "Hello, "+response.name+". Thanks for being here again!<br>Redirect to order page in 5 seconds.";
          }
          else { 
            setTimeout(testAPI, 5000);
            document.getElementById('status').innerHTML = "Hello, "+response.name+". You have been our member already.<br>Redirect to order page in 5 seconds.";
          }
        }
        else {
          document.getElementById("fb-login-button").style.display="none";
          document.getElementById("logout").style.display="none";
          document.getElementById("establish_membership").style.display="none";
          document.getElementById("continue_visitor").style.display="none";
          document.getElementById("login").style.display="none";
          if (click==="login") {
            document.getElementById('status').innerHTML = "Hello, "+response.name+". You haven't established membership yet.<br>Please establish first.";
            document.getElementById("establish_membership").style.display="block";
          }
          else {
            setTimeout(testAPI, 5000);
            document.getElementById('status').innerHTML = "Hello, "+response.name+". Thanks for being our member!<br>Redirect to order page in 5 seconds.";
          }
        }
      });
    });
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : "587487145096824",
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : "v3.2" // The Graph API version to use for the call
  });
  //checkLoginState();		
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var now={};
function testAPI() {
  document.getElementById("fb-login-button").style.display="none";
  document.getElementById("login").style.display="none";
  document.getElementById("establish_membership").style.display="none";
  document.getElementById("continue_visitor").style.display="none";
  document.getElementById("logout").style.display="block";
  FB.api('/me', function(response) {
    console.log(response);
    document.getElementById('status').innerHTML = 'Welcome, ' + response.name + '!';
		now.id=response.id;
    now.name=response.name;
		event.preventDefault()
	  $.post('/login', response);
  });
  /*$.ajax({
    type: "GET",
  	url: "./order.html", 
  	datatype: "html",
    success: function(data) {
		  document.getElementById('order').innerHTML = data;
		}
	});*/
  document.getElementById("show").style.display="block";
}

function logout() {
	$.post('/logout', {"id":now.id});
	now={};
  document.getElementById("show").style.display="none";
	document.getElementById('status').innerHTML = "Please log in Facebook or continue as a visitor." ;
  document.getElementById("establish_membership").style.display="block";
  document.getElementById("logout").style.display="none";
  document.getElementById("continue_visitor").style.display="block";
  document.getElementById("fb-login-button").style.display="none";
  document.getElementById("login").style.display="block";
}

function visitor() {
  $.post('/login', {"id":"-1", "name":"visitor"}, (data)=> {
    now["id"]=data.id;
    now["name"]="visitor"
    console.log(now);
    document.getElementById('status').innerHTML = 'You are NO.' + now.id + ' visitor';
  })
  document.getElementById("login").style.display="block";
  document.getElementById("establish_membership").style.display="block";
  document.getElementById("logout").style.display="none";
  document.getElementById("continue_visitor").style.display="none";
  document.getElementById("fb-login-button").style.display="none";  
	/*$.ajax({
    type: "GET",
  	url: "order.html",
  	datatype: "html",
  	success: function(data) {
			document.getElementById('order').innerHTML = data;
		}
  });*/
  document.getElementById("show").style.display="block";
}
var click="";
function establish() {
  click="establish";
  document.getElementById("show").style.display="none";
  document.getElementById('status').innerHTML = "Login Facebook to be our member";
  document.getElementById("establish_membership").style.display="none";
  document.getElementById("logout").style.display="none";
  document.getElementById("continue_visitor").style.display="none";
  document.getElementById("fb-login-button").style.display="block";
  document.getElementById("login").style.display="none";
}

function login() {
  click="login";
  document.getElementById("show").style.display="none";
  document.getElementById('status').innerHTML = "Login Facebook to continue";
  document.getElementById("establish_membership").style.display="none";
  document.getElementById("logout").style.display="none";
  document.getElementById("continue_visitor").style.display="none";
  document.getElementById("fb-login-button").style.display="block";
  document.getElementById("login").style.display="none";
}
