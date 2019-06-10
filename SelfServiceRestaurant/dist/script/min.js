//1:spicy, 2:wasabi, 3:peanut, 4:no sauce
var sauce = 1;

//0:default, 1:history, 2:custom
var default_or_not = 0;

//0:order, 1:adjust
var custom_state = 0;

//Food custom
var cheese = true;
var tomato = true;
var cucumber = true;
var lettuce = true;

//Amount of the order (1~9)
var amount = 1;

//1:Burger1, 2:Burger2, 3:Burger3, 4:Burger4
var burger = 0;
var burger_1 = "黑膠起司牛肉堡";
var burger_2 = "墨西雙椒";
var burger_3 = "鳳梨莎莎";
var burger_4 = "黑膠鮮檸鮭魚堡"; //品名直接由此設定

var price_1 = 100;
var price_2 = 100;
var price_3 = 100;
var price_4 = 120; //單價直接由此設定

var sauce_1 = "辣醬";
var sauce_2 = "芥末醬";
var sauce_3 = "花生醬";
var sauce_4 = "無醬料"; // 醬料直接由此設定

var count = 0;

//The number of the number, increasing when adding a new burger. Use it to call the settings in the database.
var order_number = 0;
var real_number = 0; //不可超過5筆訂單
var adjusting_order; 

let waitminute = 15;

let months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
let weekdays = 'SUN,MON,TUE,WED,THU,FRI,SAT'.split(',')

$(document).ready(function(){

    adj_func = function () {

        //訂單編號，可用來call資料
        var order_num = Number($(this).siblings('.order_number').html());
        adjusting_order = order_num;
        amount = Number($(this).siblings('.order_amount').html())

        burger = $(this).siblings('.burger_non').html();
        console.log(burger);
        sauce = $(this).siblings('.sauce_non').html();
        console.log(sauce);
        var buf;
        buf = $(this).siblings('.cheese_non').html();
        console.log(buf);
        if(buf == '1') cheese = true;
        else cheese = false;
        buf = $(this).siblings('.tomato_non').html();
        console.log(buf);
        if(buf == '1') tomato = true;
        else tomato = false;
        buf = $(this).siblings('.cucumber_non').html();
        console.log(buf);
        if(buf == '1') cucumber = true;
        else cucumber = false;
        buf = $(this).siblings('.lettuce_non').html();
        console.log(buf);
        if(buf == '1') lettuce = true;
        else lettuce = false;

        if(burger == 1) $("#Custom_page").children('.content').children('.burger_name').html(burger_1);
        if(burger == 2) $("#Custom_page").children('.content').children('.burger_name').html(burger_2);
        if(burger == 3) $("#Custom_page").children('.content').children('.burger_name').html(burger_3);
        if(burger == 4) $("#Custom_page").children('.content').children('.burger_name').html(burger_4);

        //check the setting state
        if(default_or_not == 0){
            $("#default").animate({
                opacity: 1
            }, 250, function(){});
            $("#history").animate({
                opacity: 0.6
            }, 250, function(){});
        }
        else if(default_or_not == 1){
            $("#default").animate({
                opacity: 0.6
            }, 250, function(){});
            $("#history").animate({
                opacity: 1
            }, 250, function(){});
        }
        else if(default_or_not == 2){
            $("#default").animate({
                opacity: 0.6
            }, 250, function(){});
            $("#history").animate({
                opacity: 0.6
            }, 250, function(){});
        }
        
        set_func();
        $("#Custom_page").animate({
            top: "0"
        }, 400, function(){});
        $("#cover").show();
        $("#cover").animate({
            opacity: 0.4
        }, 400, function(){});
        custom_state = 1;
    }

    //add button in order list
    add_func = function () {
        var order_amount = Number($(this).siblings('.order_amount').html());
        var singel_price = Number($(this).siblings('.price_non').html());
        var new_price = Number($(this).siblings('.single_price').html());
        var total = Number($('#total_cost').html());
        if (order_amount < 9) {
            order_amount++;
            new_price += singel_price;
            total += singel_price;
        }
        $(this).siblings('.order_amount').html(order_amount);
        $(this).siblings('.single_price').html(new_price);
        $('#total_cost').html(total);
    }

    //minus button in order list
    minus_func = function () {
        var order_amount = $(this).siblings('.order_amount').html();
        var singel_price = Number($(this).siblings('.price_non').html())
        var new_price = Number($(this).siblings('.single_price').html())
        var total = Number($('#total_cost').html())
        if (order_amount > 1) {
            order_amount--;
            new_price -= singel_price;
            total -= singel_price;
        }
        $(this).siblings('.order_amount').html(order_amount);
        $(this).siblings('.single_price').html(new_price);
        $('#total_cost').html(total)
    
    }
    
    //delete button in order list
    delete_func = function () {
        var single_price = Number($(this).siblings('.single_price').html());
        var total = Number($('#total_cost').html());
        var new_cost = total - single_price;
        $('#total_cost').html(new_cost);
        $(this).parent().addClass('animated bounceOutLeft 0.5s ')
        $(this).parent().delay(500).hide(100);
		real_number--;
    }

    //default setting of the order, called when add a new order
    default_func = function () {
        $("#default").animate({
            opacity: 1
        }, 250, function(){});
        $("#history").animate({
            opacity: 0.6
        }, 250, function(){});
        cheese = true;
        tomato = true;
        cucumber = true;
        lettuce = true;
		amount = 1;
        sauce = 1;
        set_func(); 
    }

    set_func = function () {
        if(cheese == true){
            $("#cheese_op").animate({
                opacity: 1
            }, 250, function(){});
            $("#cheese_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#cheese_op").animate({
                opacity: 0.4
            }, 250, function(){});   
            $("#cheese_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }

        if(tomato == true){
            $("#tomato_op").animate({
                opacity: 1
            }, 250, function(){});   
            $("#tomato_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#tomato_op").animate({
                opacity: 0.4
            }, 250, function(){});   
            $("#tomato_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }

        if(cucumber == true){
            $("#cucumber_op").animate({
                opacity: 1
            }, 250, function(){});   
            $("#cucumber_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#cucumber_op").animate({
                opacity: 0.4
            }, 250, function(){});   
            $("#cucumber_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }

        if(lettuce == true){
            $("#lettuce_op").animate({
                opacity: 1
            }, 250, function(){});   
            $("#lettuce_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#lettuce_op").animate({
                opacity: 0.4
            }, 250, function(){});   
            $("#lettuce_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }

        $("#wasabi_sauce").animate({
            opacity: 0.4
        }, 0, function(){});
        $("#peanut_sauce").animate({
            opacity: 0.4
        }, 0, function(){});
        $("#no_sauce").animate({
            opacity: 0.4
        }, 0, function(){});

        if(sauce == 1){
            $("#spicy_sauce").animate({
                opacity: 1
            }, 250, function(){});
        }
        else if(sauce == 2){
            $("#wasabi_sauce").animate({
                opacity: 1
            }, 250, function(){});
            $("#spicy_sauce").animate({
                opacity: 0.4
            }, 250, function(){});
        }
        else if(sauce == 3){
            $("#peanut_sauce").animate({
                opacity: 1
            }, 250, function(){});
            $("#spicy_sauce").animate({
                opacity: 0.4
            }, 250, function(){});
        }
        else if(sauce == 4){
            $("#no_sauce").animate({
                opacity: 1
            }, 250, function(){});
            $("#spicy_sauce").animate({
                opacity: 0.4
            }, 250, function(){});
        }
		$('#amount').html(amount);
    }

    //add an order of Burger1
    $("#add_1_button").click(function(){
        if (real_number>4) {
			console.log("Too many orders");
		}
		else {			
			$("#Custom_page").animate({
				top: "0"
			}, 400, function(){});
			$("#cover").show();
			$("#cover").animate({
				opacity: 0.4
			}, 400, function(){});
			burger = 1;
			default_func();
			$("#Custom_page").children('.content').children('.burger_name').html(burger_1);
			custom_state = 0;
		}
    });

    //add an order of Burger2
    $("#add_2_button").click(function(){
        if (real_number>4) {
			console.log("Too many orders");
		}
		else {			
			$("#Custom_page").animate({
				top: "0"
			}, 400, function(){});
			$("#cover").show();
			$("#cover").animate({
				opacity: 0.4
			}, 400, function(){});
			burger = 2;
			default_func();
			$("#Custom_page").children('.content').children('.burger_name').html(burger_2);
			custom_state = 0;
		}
    });

    //add an order of Burger3
    $("#add_3_button").click(function(){
		if (real_number>4) {
			console.log("Too many orders");
		}
		else {
			$("#Custom_page").animate({
				top: "0"
			}, 400, function(){});
			$("#cover").show();
			$("#cover").animate({
				opacity: 0.4
			}, 400, function(){});
			burger = 3;
			default_func();
			$("#Custom_page").children('.content').children('.burger_name').html(burger_3);
			custom_state = 0;
		}
    });

    //add an order of Burger4
    $("#add_4_button").click(function(){
		if (real_number>4) {
			console.log("Too many orders");
		}
		else {
			$("#Custom_page").animate({
				top: "0"
			}, 400, function(){});
			$("#cover").show();
			$("#cover").animate({
				opacity: 0.4
			}, 400, function(){});
			burger = 4;
			default_func();
			$("#Custom_page").children('.content').children('.burger_name').html(burger_4);
			custom_state = 0;
		}
    });

    //SUBMIT
    $("#comfirm_and_pay_btn").click(function(){
		var day = new Date()
		console.log(day)
		var hour = day.getHours()
		var minute = day.getMinutes()
		minute += waitminute
		if (minute >= 60) {
			minute -= 60
			hour++
		}
		$('#week').html(weekdays[day.getDay()])
		$('#month').html(months[day.getMonth()])
		$('#day').html(day.getDate())
		$('#hour').html(hour)
		$('#minute').html(minute)
		/*這裡是重抓時間的功能，之後可能用到上一頁面執行*/
		$('#menu_region').hide(500);
		$('#cart_region').hide(500);
		setTimeout(function(){$('.mid_region').fadeIn(500)}, 500)
    });

    $("#cancel").click(function(){
        $("#Custom_page").animate({
            top: "-100%"
        }, 400, function(){});
        $("#cover").animate({
            opacity: 0
        }, 400, function(){$("#cover").hide();});
    });

    //Show the order at the shopping cart, afer click the "add_to_cart" button
    $("#add_to_cart").unbind("click").click(function(){
        $("#Custom_page").animate({
            top: "-100%"
        }, 400, function(){});
        $("#cover").animate({
            opacity: 0
        }, 400, function(){$("#cover").hide();});
        
        if(custom_state == 0){
            real_number++;
            d = document.createElement('div');
            $(d).addClass('order_list animated bounceInRight 0.5s')
                .html(
                    `<p class="order_name">品名</p>
                    <p class="no_ingredient">材料</p>
                    <p class="sauce">醬汁</p>
                    <p class="single_price">100</p>
                    <p class='order_amount'>1</p>
                    <div class="container_for_click"></div>
                    <img src="./img/delete_button.png" class="delete_img">
                    <img src="./img/delete_button_hover.png" class="delete_btn">
                    <img src="./img/cart_add_button.png" class="add_img">
                    <img src="./img/cart_add_button_hover.png" class="add_btn">
                    <img src="./img/cart_minus_button.png" class="minus_img">
                    <img src="./img/cart_minus_button_hover.png" class="minus_btn">
                    <div class="order_number" style="display:none;">number</div>
                    <div class="price_non" style="display:none;">120</div>
                    <div class="burger_non" style="display:none;">1</div>
                    <div class="sauce_non" style="display:none;">1</div>
                    <div class="cheese_non" style="display:none;">1</div>
                    <div class="tomato_non" style="display:none;">1</div>
                    <div class="cucumber_non" style="display:none;">1</div>
                    <div class="lettuce_non" style="display:none;">1</div>`
                )
                .attr('id', 'order_' + order_number)
                .appendTo($("#shopping_cart"))
    
        
            $(d).children('.order_number').html(order_number);
            order_number++;
        
            //bind the buttons to functions
        
            $(d).children('.order_name').on('click', adj_func);
            $(d).children('.no_ingredient').on('click', adj_func);
            $(d).children('.sauce').on('click', adj_func);
            $(d).children('.single_price').on('click', adj_func);
            $(d).children('.container_for_click').on('click', adj_func);
            $(d).children('.delete_btn').on('click', delete_func);
            $(d).children('.add_btn').on('click', add_func);
            $(d).children('.minus_btn').on('click', minus_func);


            $(d).children('.order_amount').html(amount);
            if(burger == 1){
                $(d).children('.order_name').html(burger_1);
                $(d).children('.price_non').html(price_1);
            }
            else if(burger == 2){
                $(d).children('.order_name').html(burger_2);
                $(d).children('.price_non').html(price_2);
            }
            else if(burger == 3){
                $(d).children('.order_name').html(burger_3);
                $(d).children('.price_non').html(price_3);
            }
            else if(burger == 4){
                $(d).children('.order_name').html(burger_4);
                $(d).children('.price_non').html(price_4);
            }
        
            $(d).children('.burger_non').html(burger);
            $(d).children('.sauce_non').html(sauce);

            //輸出醬料
            if(sauce == 1){
                $(d).children('.sauce').html(sauce_1);
            }
            else if(sauce == 2){
                $(d).children('.sauce').html(sauce_2);
            }
            else if(sauce == 3){
                $(d).children('.sauce').html(sauce_3);
            }
            else if(sauce == 4){
                $(d).children('.sauce').html(sauce_4);
            }
            var request = false;
            var _no_ingredient = "不要";
            if(cheese == false){
                _no_ingredient += "起司 ";
                request = true;
                $(d).children('.cheese_non').html('0');
            }
            if(tomato == false){
                _no_ingredient += "番茄 ";
                request = true;
                $(d).children('.tomato_non').html('0');
            }
            if(cucumber == false){
                _no_ingredient += "酸黃瓜 ";
                request = true;
                $(d).children('.cucumber_non').html('0');
            }
            if(lettuce == false){
                _no_ingredient += "生菜 ";
                request = true;
                $(d).children('.lettuce_non').html('0');
            }

            var _single_price = Number($(d).children('.price_non').html()) * amount;
            var total = Number($('#total_cost').html()) + _single_price;
            //change the total cost
            
            if(request == true){
                $(d).children('.no_ingredient').html(_no_ingredient);
            }
            else{
                $(d).children('.no_ingredient').html(" ");
            }
            $(d).children('.single_price').html(_single_price);
            $('#total_cost').html(total);
        }

        else if(custom_state == 1){
            
            var ID = '#order_' + adjusting_order;
            console.log(ID);
            if(sauce == 1){
                $(ID).children('.sauce').html(sauce_1);
            }
            else if(sauce == 2){
                $(ID).children('.sauce').html(sauce_2);
            }
            else if(sauce == 3){
                $(ID).children('.sauce').html(sauce_3);
            }
            else if(sauce == 4){
                $(ID).children('.sauce').html(sauce_4);
            }
            var request = false;
            var _no_ingredient = "不要";
            $(ID).children('.cheese_non').html('1');
            $(ID).children('.tomato_non').html('1');
            $(ID).children('.cucumber_non').html('1');
            $(ID).children('.lettuce_non').html('1');
            if(cheese == false){
                _no_ingredient += "起司 ";
                request = true;
                $(ID).children('.cheese_non').html('0');
            }
            if(tomato == false){
                _no_ingredient += "番茄 ";
                request = true;
                $(ID).children('.tomato_non').html('0');
            }
            if(cucumber == false){
                _no_ingredient += "酸黃瓜 ";
                request = true;
                $(ID).children('.cucumber_non').html('0');
            }
            if(lettuce == false){
                _no_ingredient += "生菜 ";
                request = true;
                $(ID).children('.lettuce_non').html('0');
            }
            
            if(request == true){
                $(ID).children('.no_ingredient').html(_no_ingredient);
            }
            else{
                $(ID).children('.no_ingredient').html(" ");
            }

            
            var total = Number($('#total_cost').html()) - Number($(ID).children('.order_amount').html()) * Number($(ID).children('.price_non').html());
            var _single_price = Number($(ID).children('.price_non').html()) * amount;
            total += _single_price;
            $(ID).children('.single_price').html(_single_price);
            $(ID).children('.order_amount').html(amount);
            $('#total_cost').html(total);

        }
        //$('wrap').modal()
        //$('.shadow').show()
		//amount=1;
		//$("#amount").html(amount);
    });

    /* Selecte the sauce  */
    $("#spicy_sauce").click(function(){
        if(sauce != 1){
            sauce = 1;
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
    })

    $("#wasabi_sauce").click(function(){
        if(sauce != 2){
            sauce = 2;
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
    })

    $("#peanut_sauce").click(function(){
        if(sauce != 3){
            sauce = 3;
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
    })

    $("#no_sauce").click(function(){
        if(sauce != 4){
            sauce = 4;
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
    })

    /* Choose setting if needed. */
    $("#default").unbind("click").click(function(){
        if(default_or_not != 0){
            default_or_not = 0;
            default_func();
        }
    })

    $("#history").unbind("click").click(function(){
        if(default_or_not != 1){
            default_or_not = 1;
            $("#default").animate({
                opacity: 0.6
            }, 250, function(){});
            $("#history").animate({
                opacity: 1
            }, 250, function(){});
        }
    })

    /* Custom the element of the burger. */
    $("#cheese_op").unbind("click").click(function(){
        cheese = !cheese;
        if(cheese == true){
            $("#cheese_op").animate({
                opacity: 1
            }, 250, function(){});
            $("#cheese_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#cheese_op").animate({
                opacity: 0.4
            }, 250, function(){});
            $("#cheese_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }
        default_or_not = 2;
        $("#default").animate({
            opacity: 0.6
        }, 250, function(){});
        $("#history").animate({
            opacity: 0.6
        }, 250, function(){});
    })

    $("#tomato_op").unbind("click").click(function(){
        tomato = !tomato;
        if(tomato == true){
            $("#tomato_op").animate({
                opacity: 1
            }, 250, function(){});
            $("#tomato_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#tomato_op").animate({
                opacity: 0.4
            }, 250, function(){});
            $("#tomato_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }
        default_or_not = 2;
        $("#default").animate({
            opacity: 0.6
        }, 250, function(){});
        $("#history").animate({
            opacity: 0.6
        }, 250, function(){});
    })

    $("#cucumber_op").unbind("click").click(function(){
        cucumber = !cucumber;
        if(cucumber == true){
            $("#cucumber_op").animate({
                opacity: 1
            }, 250, function(){});
            $("#cucumber_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#cucumber_op").animate({
                opacity: 0.4
            }, 250, function(){});
            $("#cucumber_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }
        default_or_not = 2;
        $("#default").animate({
            opacity: 0.6
        }, 250, function(){});
        $("#history").animate({
            opacity: 0.6
        }, 250, function(){});
    })

    $("#lettuce_op").unbind("click").click(function(){
        lettuce = !lettuce;
        if(lettuce == true){
            $("#lettuce_op").animate({
                opacity: 1
            }, 250, function(){});
            $("#lettuce_pic").animate({
                opacity: 1
            }, 250, function(){});
        }
        else{
            $("#lettuce_op").animate({
                opacity: 0.4
            }, 250, function(){});
            $("#lettuce_pic").animate({
                opacity: 0.4
            }, 250, function(){});
        }
        default_or_not = 2;
        $("#default").animate({
            opacity: 0.6
        }, 250, function(){});
        $("#history").animate({
            opacity: 0.6
        }, 250, function(){});
    })

    /* Adjust the amount of the order */
    $("#add").unbind("click").click(function(){
        if(amount < 9){
            amount++;
            $("#amount").html(amount);
        }
    })

    $("#minus").unbind("click").click(function(){
        if(amount > 1){
            amount--;
            $("#amount").html(amount);
        }
    })
	
	//Sidebar member
    $("#icon_member").unbind("click").click(function(){
        if (now.name!="visitor" && typeof(now.name)!="undefined") {
			order=["", "", "", "", ""];
			n=[0, 0, 0, 0, 0];
			$("#menu_region").hide();
			$("#cart_region").hide();
			$(".mid_region").hide();
			$(".mid_region").hide();
			$(".left").show();
			$(".right").show();
			$(".name").html(now.name);
			$("#headphoto").attr("width", "100%");
			if (now.id==="selfown") {
				$.post('/selfownget', now, (data)=> {
					$("#headphoto").attr("src", "https://graph.facebook.com/"+data[0].fbid+"/picture?type=large");
				})
			}
			else {
				$("#headphoto").attr("src", "https://graph.facebook.com/"+now.id+"/picture?type=large");
			}
		}
    })
	
	$("#gogo_order").unbind("click").click(function(){
		$("#menu_region").show();
		$("#cart_region").show();
		$(".left").hide();
		$(".right").hide();
	})

    //Sidebar map
    $("#icon_map").unbind("click").click(function(){
        $("#Map").animate({
            top: "0"
        }, 400, function(){});
        $("#cover").show();
        $("#cover").animate({
            opacity: 0.4
        }, 400, function(){});
    })

    $("#Map").unbind("click").click(function(){
        $("#Map").animate({
            top: "-100%"
        }, 400, function(){});
        $("#cover").animate({
            opacity: 0
        }, 400, function(){$("#cover").hide();});
    })

    //Sidebar menu
    $("#icon_menu").unbind("click").click(function(){
        $("#Menu").animate({
            top: "0"
        }, 400, function(){});
        $("#cover").show();
        $("#cover").animate({
            opacity: 0.4
        }, 400, function(){});
    })

    $("#Menu").unbind("click").click(function(){
        $("#Menu").animate({
            top: "-100%"
        }, 400, function(){});
        $("#cover").animate({
            opacity: 0
        }, 400, function(){$("#cover").hide();});
    })
    
});

Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + days);
      return this;
}


//in third page
$('#step1_btn').on('click', function () {
    $('#step1_btn').addClass('red')
    $('#step2_btn').removeClass('red')
    $('#step3_btn').removeClass('red')
    $('.step2').addClass('animated fadeOutRight 0.3s')
    $('.step3').addClass('animated fadeOutRight 0.3s')
})
/*
$('#chtext2').on('click', function () {
    $('#step1_btn').addClass('red')
    $('#step2_btn').removeClass('red')
    $('#step3_btn').removeClass('red')
    document.getElementById('storeinfo1').innerHTML = '' ;
    document.getElementById('storeinfo2').innerHTML = '' ;
})
*/

$('#step2_btn').on('click', function () {
    $('#step2_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step3_btn').removeClass('red')
    $('.time_block').animate({ height: "50%" })
    $('#next1').fadeIn()
    $('#self_defind').fadeIn()
    $('.step3').addClass('animated fadeOutRight 0.5s')

})

$('#step3_btn').on('click', function () {
    $('#step3_btn').addClass('red')
    $('#step2_btn').removeClass('red')
    $('#step1_btn').removeClass('red')
})


$('#self_defind').on('click', function () {
    document.getElementById('getimetext').innerHTML = '選擇取餐時間' ;
    $('#timedefault').addClass('opacity')
    $('#defa').addClass('opacity')
    $('#self_defind').removeClass('opacity')

    $('#cost').removeClass('animated fadeOutLeft 0.5s')
    $('#cost').addClass('animated fadeInLeft 0.5s')
    
    $('#cost').show()
    $('.time_table').removeClass('animated fadeOutLeft 0.5s')
    $('.time_table').addClass('animated fadeInLeft 0.5s')
    $('.time_table').show()

    $('#next1').hide()

    $('#step2_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step3_btn').removeClass('red')

    /*這裡是重抓時間的功能，之後可能用到上一頁面執行*/
    var day = new Date()
    var d=new Date()
    console.log(day)
    var hour = day.getHours()
    var minute = day.getMinutes()
    minute += waitminute
    if (minute >= 60) {
        minute -= 60
        hour++
    }
    
    var Dtomorrow=new Date(d.addDays(1))
    var Ddayafter=new Date(d.addDays(1))

    $('#week_').html(weekdays[day.getDay()])
    $('#month_').html(months[day.getMonth()])
    $('#day_').html(day.getDate())
    $('#hour_').html(hour)
    $('#minute_').html(minute)

    $('#tod').html(day.getDate())
    $('#tom').html(Dtomorrow.getDate())
    $('#dat').html(Ddayafter.getDate())
    /*這裡是重抓時間的功能，之後可能用到上一頁面執行*/
})


$('#timedefault').on('click', function () {
    $('.time_block').animate({ height: "50%" })
    document.getElementById('timedefault').innerHTML ="系統預定"

    $('#timedefault').removeClass('opacity')
    $('#defa').removeClass('opacity')
    $('#self_defind').addClass('opacity')

    $('#cost').addClass('animated fadeOutLeft 0.5s')
    //$('#cost').delay(500).hide(500)
    $('.time_table').addClass('animated fadeOutLeft 0.5s')
    //$('.time_table').delay(500).hide()

    $('#next1').show()

    $('#step2_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step3_btn').removeClass('red')
    $('#self_defind').fadeIn()
    $('.step3').addClass('animated fadeOutRight 0.5s')

    $('#confirm_red').hide()

    document.getElementById('storeinfo1').style.color='white';
    document.getElementById('week').style.color='white';
    document.getElementById('month').style.color='white';
    document.getElementById('day').style.color='white';
    document.getElementById('hour').style.color='white';
    document.getElementById('minute').style.color='white';
    document.getElementById('dot1').style.color='white';
    document.getElementById('dot2').style.color='white';

    $('#line').addClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').addClass('opacity')


    /*這裡是重抓時間的功能，之後可能用到上一頁面執行*/
    var day = new Date()
    console.log(day)
    var hour = day.getHours()
    var minute = day.getMinutes()
    minute += waitminute
    if (minute >= 60) {
        minute -= 60
        hour++
    }
    $('#week').html(weekdays[day.getDay()])
    $('#month').html(months[day.getMonth()])
    $('#day').html(day.getDate())
    $('#hour').html(hour)
    $('#minute').html(minute)
    /*這裡是重抓時間的功能，之後可能用到上一頁面執行*/
})

$('#next1').on('click', function () {
    $('#step2_btn').removeClass('red')
    $('#step3_btn').addClass('red')
    $('#next1').fadeOut()
    $('#self_defind').fadeOut()
    $('.time_block').animate({ height: "27%" })
    $('.step3').removeClass('animated fadeOutRight 0.5s')
    $('.step3').addClass('animated fadeInRight 0.5s')
    $('.step3').show()
	if (now.name==="visitor") {
		document.getElementById("wallet").style.display="none";
	}
    document.getElementById('getimetext').innerHTML = '取餐時間' ;
})


$('#next2').on('click', function () {
    $('#step2_btn').removeClass('red')
    $('#step3_btn').addClass('red')
    $('#defa').removeClass('opacity')
    $('#next1').fadeOut()
    $('#self_defind').fadeOut()
    document.getElementById('timedefault').innerHTML = "自行設定"
    $('.time_block').animate({ height: "27%" })
    $('.step3').removeClass('animated fadeOutRight 0.5s')
    $('.step3').addClass('animated fadeInRight 0.5s')
    $('.step3').show()
	if (now.name==="visitor") {
		document.getElementById("wallet").style.display="none";
	}
    document.getElementById('getimetext').innerHTML = '取餐時間' ;

    $('#cost').addClass('animated fadeOutLeft 0.5s')
    $('#cost').delay(400).hide()
    $('.time_table').addClass('animated fadeOutLeft 0.5s')
    $('.time_table').delay(400).hide()


    $('#week').html($('#week_').html())
    $('#month').html($('#month_').html())
    $('#day').html($('#day_').html())
    $('#hour').html($('#hour_').html())
    $('#minute').html($('#minute_').html())
})


$('#line').on('click', function () {
	howtopay="line"
    $('#line').removeClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').addClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)
    
    document.getElementById('storeinfo1').style.color='red';
    document.getElementById('week').style.color='red';
    document.getElementById('month').style.color='red';
    document.getElementById('day').style.color='red';
    document.getElementById('hour').style.color='red';
    document.getElementById('minute').style.color='red';
    document.getElementById('dot1').style.color='red';
    document.getElementById('dot2').style.color='red';
})

$('#wallet').on('click', function () {
	howtopay="wallet";
    $('#line').addClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').removeClass('opacity')
    $('#yoyo').addClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)
    
    document.getElementById('storeinfo1').style.color='red';
    document.getElementById('week').style.color='red';
    document.getElementById('month').style.color='red';
    document.getElementById('day').style.color='red';
    document.getElementById('hour').style.color='red';
    document.getElementById('minute').style.color='red';
    document.getElementById('dot1').style.color='red';
    document.getElementById('dot2').style.color='red';
})

$('#card').on('click', function () {
	howtopay="card";
    $('#line').addClass('opacity')
    $('#card').removeClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').addClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)
    
    document.getElementById('storeinfo1').style.color='red';
    document.getElementById('week').style.color='red';
    document.getElementById('month').style.color='red';
    document.getElementById('day').style.color='red';
    document.getElementById('hour').style.color='red';
    document.getElementById('minute').style.color='red';
    document.getElementById('dot1').style.color='red';
    document.getElementById('dot2').style.color='red';
})

$('#yoyo').on('click', function () {
	howtopay="yoyo";
    $('#line').addClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').removeClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)
    
    document.getElementById('storeinfo1').style.color='red';
    document.getElementById('week').style.color='red';
    document.getElementById('month').style.color='red';
    document.getElementById('day').style.color='red';
    document.getElementById('hour').style.color='red';
    document.getElementById('minute').style.color='red';
    document.getElementById('dot1').style.color='red';
    document.getElementById('dot2').style.color='red';
})

/*select time*/
$('#tod').on('click',function(){
    $('#tod').addClass('block_selected')
    $('#tom').removeClass('block_selected')
    $('#dat').removeClass('block_selected')
    $('#day_').html(Number($('#tod').html()))
}) 

$('#tom').on('click',function(){
    $('#tom').addClass('block_selected')
    $('#tod').removeClass('block_selected')
    $('#dat').removeClass('block_selected')
    $('#day_').html(Number($('#tom').html()))
}) 

$('#dat').on('click',function(){
    $('#dat').addClass('block_selected')
    $('#tom').removeClass('block_selected')
    $('#tod').removeClass('block_selected')
    $('#day_').html(Number($('#dat').html()))
}) 

$('#hour11').on('click',function(){
    $('#hour11').addClass('block_selected')
    $('#hour12').removeClass('block_selected')
    $('#hour13').removeClass('block_selected')
    $('#hour_').html(11)
}) 

$('#hour12').on('click',function(){
    $('#hour12').addClass('block_selected')
    $('#hour11').removeClass('block_selected')
    $('#hour13').removeClass('block_selected')
    $('#hour_').html(12)
}) 

$('#hour13').on('click',function(){
    $('#hour13').addClass('block_selected')
    $('#hour12').removeClass('block_selected')
    $('#hour11').removeClass('block_selected')
    $('#hour_').html(13)
}) 

$('#minute00').on('click',function(){
    $('#minute00').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html("00")
}) 

$('#minute10').on('click',function(){
    $('#minute10').addClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(10)
}) 

$('#minute20').on('click',function(){
    $('#minute20').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(20)
}) 

$('#minute30').on('click',function(){
    $('#minute30').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(30)
}) 

$('#minute40').on('click',function(){
    $('#minute40').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(40)
}) 

$('#minute50').on('click',function(){
    $('#minute50').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute_').html(50)
}) 
