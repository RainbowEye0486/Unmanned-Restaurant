//page 0
//visiter function

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    if (response.status==="connected") {
	  FB.api('/me', function(response) {      
        $.post('/fbget', response, (data)=> {
          if (typeof(data[0])!="undefined") {
            if (click==="fblogin") {
			        testAPI();
              //setTimeout(testAPI, 5000);
            }
            else {             
		          FB.logout(function(response) {
				        console.log(response);
			        });
              alert("此Facebook帳號已註冊");
            }
          }
          else {          
            if (click==="fblogin") {
			        FB.logout(function(response) {
				        console.log(response);
			        });
			        alert("此Facebook帳號尚未註冊");
            }
            else {
              testAPI();
            }
          }
        });
      })
	}
	else {
      alert("Please login Facebook to continue.");
    }    
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
  //document.getElementById("logout").style.display="block";
  FB.api('/me', { locale: 'en_US', fields: 'name, email' }, function(response) {
    console.log(response);
	now.id=response.id;
    now.name=response.name;
	event.preventDefault()
	$.post('/fblogin', response);
  });  
	if (click==="fblogin") {
		alert("Facebook登入成功");
		setTimeout(function(){$('#menu_region').fadeIn(300);
			$('#cart_region').fadeIn(300);}, 1550);
		signinvanish();
	}
	if (click==="fbregister") {
		alert("Facebook註冊成功");
		setTimeout(function(){$('#menu_region').fadeIn(300);
			$('#cart_region').fadeIn(300);}, 1100);
		signupvanish();
	}
}

/*function logout() {
	$.post('/logout', {"id":now.id});
	now={};
	$('.mid_icon').fadeIn(300)
}*/

var click="";
function fbregister() {
	click="fbregister";
	FB.login(function(response) {
		checkLoginState();
	});
}

function fblogin() {
	click="fblogin";
	FB.login(function(response) {
		checkLoginState();
	});
}

$('#signinbotton').on('click',function(){
	if ($("input[name=signin_mail]").val()==="") {
		alert("尚未填寫E-mail");
		eval("document.getElementById('mail_input').focus()");    
	}
	else if ($("input[name=signin_password]").val()==="") {
		alert("尚未填寫Password");
		eval("document.getElementById('passward_input').focus()");
	}
	else {
		$.post('/signin', {email:$("input[name=signin_mail]").val(), 
				password:$("input[name=signin_password]").val()}, (data)=> {			
			if (data[0]==="登入成功") {
				alert(data[0]);
				now.id="selfown";
				now.name=data[1];
				setTimeout(function(){$('#menu_region').fadeIn(300);
					$('#cart_region').fadeIn(300);}, 1100);
				signinvanish();
			}
			else {
				alert(data);
			}
		});
	}
})

$('#signupbotton').on('click',function(){
	var nameup = document.getElementById('name_input_up');
	var mailup = document.getElementById('mail_input_up');
	var passward_up = document.getElementById('passward_input_up');
	if (!nameup.validity.valid) {
		alert("Username有誤");
		eval("document.getElementById('name_input_up').focus()");
	}
	else if (!mailup.validity.valid) {
		alert("E-mail有誤");
		eval("document.getElementById('mail_input_up').focus()"); 
	}
	else if (!passward_up.validity.valid) {
		alert("Password有誤");
		eval("document.getElementById('passward_input_up').focus()"); 
	}
	else {
		$.post('/signup', {name:$("input[name=signup_name]").val(), email:$("input[name=signup_mail]").val(), 
				password:$("input[name=signup_password]").val()}, (data)=> {
			alert(data);
			if (data==="註冊成功") {
				now.id="selfown";
				now.name=$("input[name=signup_name]").val();
				setTimeout(function(){$('#menu_region').fadeIn(300);
					$('#cart_region').fadeIn(300);}, 1100);
				signupvanish();
			}
		});			
	}
})

$('#visiter_img').on('click',function(){
	$.post('/fblogin', {"id":"-1", "name":"visitor"}, (data)=> {
		now["id"]=data.id;
		now["name"]="visitor"
		console.log(now);
		click="visitor";
		//document.getElementById('status').innerHTML = 'You are NO.' + now.id + ' visitor';
	})
	$('.mid_icon').hide()
	setTimeout(function(){$('#menu_region').fadeIn(200);
			$('#cart_region').fadeIn(500)}, 200)
});

$("#visiter_img").hover(
    function() {
       $(this).attr("src","./img/工作區域 4.png");
    },
    function() {
       $(this).attr("src","./img/工作區域 1.png");
    }
);
 //memberlogin function
$("#memberlogin_img").hover(
	function() {
	   $(this).attr("src","./img/工作區域 5.png");
	},
	function() {
	   $(this).attr("src","./img/工作區域 2.png");
	}
);

 //registered function
$("#registered_img").hover(
	function() {
	   $(this).attr("src","./img/工作區域 6.png");
	},
	function() {
	   $(this).attr("src","./img/工作區域 3.png");
	}
);

function signinshow() { 
    $('.mid_icon').hide();
    $('#signin').show();
    $('#signin_bg').animate({
        opacity: 1,
        left: '0%'
    }, 600);
    $('#signin_text').delay(300).animate({
        opacity: 1,
        bottom: '83.5%'
    }, 300);
    $('#mail_text').delay(400).animate({
        opacity: 1,
        bottom: '69%'
    }, 300);
    $('#mail_input').delay(400).animate({
        opacity: 1,
        bottom: '63%'
    }, 300);
    $('#passward_text').delay(500).animate({
        opacity: 1,
        bottom: '52%'
    }, 300);
    $('#passward_input').delay(500).animate({
        opacity: 1,
        bottom: '46%'
    }, 300);
    $('#forgetpassward_text').delay(650).animate({
        opacity: 1,
        bottom: '39%'
    }, 300);
    $('#signinbotton').delay(550).animate({
        opacity: 1,
        bottom: '20%'
    }, 300);
    $('#fbbotton').delay(650).animate({
        opacity: 1,
        bottom: '9.5%'
    }, 300);
    $('#signup1').delay(650).animate({
        opacity: 1,
        bottom: '80%'
    }, 300);
};

function signinvanish() { 
    $('#signin_text').delay(350).animate({
        opacity: 0,
        bottom: '79%'
    }, 300);
    $('#mail_text').delay(400).animate({
        opacity: 0,
        bottom: '67%'
    }, 300);
    $('#mail_input').delay(450).animate({
        opacity: 0,
        bottom: '59%'
    }, 300);
    $('#passward_text').delay(500).animate({
        opacity: 0,
        bottom: '45%'
    }, 300);
    $('#passward_input').delay(550).animate({
        opacity: 0,
        bottom: '39%'
    }, 300);
    $('#forgetpassward_text').delay(900).animate({
        opacity: 0,
        bottom: '35%'
    }, 200);
    $('#signinbotton').delay(650).animate({
        opacity: 0,
        bottom: '18%'
    }, 300);
    $('#fbbotton').delay(700).animate({
        opacity: 0,
        bottom: '2.5%'
    }, 300);
    $('#signup1').delay(800).animate({
        opacity: 0,
        bottom: '78%'
    }, 300);
    $('#signin_bg').delay(1000).animate({
        opacity: 0,
        left: '10%'
    }, 500);
    //$('#signup').delay(1050).hide();
};

function signupshow() { 
    $('.mid_icon').hide();
    $('#signup').show();
    $('#signup_bg').animate({
        opacity: 1,
        left: '0%'
    }, 600);
    $('#signup_text').delay(300).animate({
        opacity: 1,
        bottom: '84.5%'
    }, 300);
    $('#name_text_up').delay(400).animate({
        opacity: 1,
        bottom: '70%'
    }, 300);
    $('#name_input_up').delay(400).animate({
        opacity: 1,
        bottom: '65%'
    }, 300);
    $('#mail_text_up').delay(500).animate({
        opacity: 1,
        bottom: '56%'
    }, 300);
    $('#mail_input_up').delay(500).animate({
        opacity: 1,
        bottom: '51%'
    }, 300);
    $('#passward_text_up').delay(600).animate({
        opacity: 1,
        bottom: '42%'
    }, 500);
    $('#passward_input_up').delay(600).animate({
        opacity: 1,
        bottom: '37%'
    }, 500);
    $('#signupbotton').delay(650).animate({
        opacity: 1,
        bottom: '20%'
    }, 400);
    $('#fbbotton_up').delay(750).animate({
        opacity: 1,
        bottom: '9.5%'
    }, 300);
    $('#signup2').delay(750).animate({
        opacity: 1,
        bottom: '80%'
    }, 300);
};

function signupvanish() {   
    $('#signup_text').delay(0).animate({
        opacity: 0,
        bottom: '81.5%'
    }, 300);
    $('#name_text_up').delay(100).animate({
        opacity: 0,
        bottom: '67%'
    }, 300);
    $('#name_input_up').delay(100).animate({
        opacity: 0,
        bottom: '62%'
    }, 300);
    $('#mail_text_up').delay(200).animate({
        opacity: 0,
        bottom: '53%'
    }, 300);
    $('#mail_input_up').delay(200).animate({
        opacity: 0,
        bottom: '48%'
    }, 300);
    $('#passward_text_up').delay(300).animate({
        opacity: 0,
        bottom: '39%'
    }, 500);
    $('#passward_input_up').delay(300).animate({
        opacity: 0,
        bottom: '34%'
    }, 500);
    $('#signupbotton').delay(350).animate({
        opacity: 0,
        bottom: '17%'
    }, 400);
    $('#fbbotton_up').delay(450).animate({
        opacity: 0,
        bottom: '6.5%'
    }, 300);
    $('#signup2').delay(450).animate({
        opacity: 0,
        bottom: '77%'
    }, 300);
    $('#signup_bg').delay(700).animate({
        opacity: 0,
        left: '10%'
    }, 400);
	//$('#signin').delay(1300).hide();
};

$('#signup1').on('click',function(){
	$('#signin').hide();
	signupshow();
	signinvanish();

});

$('#signup2').on('click',function(){
	$('#signup').hide();
	signinshow();
	signupvanish();
});
