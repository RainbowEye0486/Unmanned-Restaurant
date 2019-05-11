var order=["", "", "", "", ""];
var n=[0, 0, 0, 0, 0];
var last="";
var index=0;
var price=0;
var price_temp=0;
var place="";
var datetime=new Date();


var burger=0;
$("#burger1").click(function(){
  burger=1;
  price_temp=100;
})
$("#burger2").click(function(){
  burger=2;
  price_temp=120;
})
$("#burger3").click(function(){
  burger=3;
  price_temp=150;
})
$("#burger4").click(function(){
  burger=4;
  price_temp=180;
})

$("#history").click(function(){
  $.post('/gethistory', {"id":now.id, "burger":burger}, (data)=> {
    if (data[0][`last_order${burger}`]!=null) {
      var array=[];
      array=data[0][`last_order${burger}`].split("");
      console.log(array);
      if (array[0]==="T") {
        cheese=true;
        $("#cheese_op").animate({
          opacity: 1
        }, 250, function(){});
        $("#cheese_pic").animate({
          opacity: 1
        }, 250, function(){});
      }
      else {
        $("#cheese_op").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#cheese_pic").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      if (array[1]==="T") {
        tomato=true;
        $("#tomato_op").animate({
          opacity: 1
        }, 250, function(){});
        $("#tomato_pic").animate({
          opacity: 1
        }, 250, function(){});
      }
      else {
        $("#tomato_op").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#tomato_pic").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      if (array[2]==="T") {
        cucumber=true;
        $("#cucumber_op").animate({
          opacity: 1
        }, 250, function(){});
        $("#cucumber_pic").animate({
          opacity: 1
        }, 250, function(){});
      }
      else {
        $("#cucumber_op").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#cucumber_pic").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      if (array[3]==="T") {
        lettuce=true;
        $("#lettuce_op").animate({
          opacity: 1
        }, 250, function(){});
        $("#lettuce_pic").animate({
          opacity: 1
        }, 250, function(){});
      }
      else {
        $("#lettuce_op").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#lettuce_pic").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      if (array[4]==="0") {
        sauce = 0;
        $("#spicy_sauce").animate({
          opacity: 1
        }, 250, function(){});
        $("#wasabi_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#peanut_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#no_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      else if (array[4]==="1") {
        sauce = 1;
        $("#spicy_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#wasabi_sauce").animate({
          opacity: 1
        }, 250, function(){});
        $("#peanut_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#no_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      else if (array[4]==="2") {
        sauce = 2;
        $("#spicy_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#wasabi_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#peanut_sauce").animate({
          opacity: 1
        }, 250, function(){});
        $("#no_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
      }
      else if (array[4]==="3") {
        sauce = 1;
        $("#spicy_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#wasabi_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#peanut_sauce").animate({
          opacity: 0.4
        }, 250, function(){});
        $("#no_sauce").animate({
          opacity: 1
        }, 250, function(){});
      }
    } 
  })
})

$("#add_to_cart").click(function(){
  switch(burger) {
    case 1:
      order[index]=order[index]+"Burger1";
      break;
    case 2:
      order[index]=order[index]+"Burger2";
      break;
    case 3:
      order[index]=order[index]+"Burger3";
      break;
    case 4:
      order[index]=order[index]+"Burger4";
      break;
  }

  if (cheese) {
    order[index]=order[index]+"/Cheese";
    last=last+"T";
  }
  else {
    order[index]=order[index]+"/NoCheese";
    last=last+"F";
  }
  if (tomato) {
    order[index]=order[index]+"/Tomato";
    last=last+"T";
  }
  else {
    order[index]=order[index]+"/NoTomato";
    last=last+"F";
  }
  if (cucumber) {
    order[index]=order[index]+"/Cucumber";
    last=last+"T";
  }  
  else {
    order[index]=order[index]+"/NoCucumber";
    last=last+"F";
  }
  if (lettuce) {
    order[index]=order[index]+"/Lettuce";
    last=last+"T";
  }  
  else {
    order[index]=order[index]+"/NoLettuce";
    last=last+"F";
  }

  switch(sauce) {
    case 0:
      order[index]=order[index]+"/Spicy";
      last=last+"0";
      break;
    case 1:
      order[index]=order[index]+"/Wasabi";
      last=last+"1";
      break;
    case 2:
      order[index]=order[index]+"/Peanut";
      last=last+"2";
      break;
    case 3:
      order[index]=order[index]+"/NoSauce";
      last=last+"3";
      break;
  }
  console.log(last);
  $.post('/history', {"id":now.id, "burger":burger, "last":last})
  n[index]=amount;
  price=price+price_temp*n[index];
  index=index+1;
  last="";
})

function confirm() {
  place="NCKU";
  datetime=datetime.getFullYear() + '-' +
  ('00' + (datetime.getMonth()+1)).slice(-2) + '-' +
  ('00' + datetime.getDate()).slice(-2) + ' ' + 
  ('00' + datetime.getHours()).slice(-2) + ':' + 
  ('00' + datetime.getMinutes()).slice(-2) + ':' + 
  ('00' + datetime.getSeconds()).slice(-2);
  console.log(datetime);
  console.log(order);
  console.log(n);
  console.log(price);
  $.post('/order', {"id":now.id, "item":order, "number":n, "time":datetime, "place":place, "amount":price});
}
