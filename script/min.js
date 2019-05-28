//{

//variable
let count = 0
let order_number = 0
//漢堡單價
let waitminute = 15;

let months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
let weekdays = 'SUN,MON,TUE,WED,THU,FRI,SAT'.split(',')

//funcntion

//common_used
add_func = function () {
    var number = $(this).siblings('.order_number').html();
    var singalprice = Number($(this).siblings('.price_non').html())
    var now_price = Number($(this).siblings('.single_price').html())
    var total = Number($('#co').html())
    /* if(total==0){
         total+=singalprice 
     }*/
    if (number < 10) {
        number++;
        now_price += singalprice
        total += singalprice
    }
    $(this).siblings('.order_number').html(number)
    $(this).siblings('.single_price').html(now_price)
    $('#co').html(total)
}

minus_func = function () {
    var number = $(this).siblings('.order_number').html();
    var singalprice = Number($(this).siblings('.price_non').html())
    var now_price = Number($(this).siblings('.single_price').html())
    var total = Number($('#co').html())
    if (number != 1) {
        number--;
        now_price -= singalprice
        total -= singalprice
    }
    $(this).siblings('.order_number').html(number)
    $(this).siblings('.single_price').html(now_price)
    $('#co').html(total)

}

delete_func = function () {
    //$(this).parent().addClass('animated bounceOutLeft 0.5s ')
    //$(this).parent().delay(10000).css('display','none');

    var minus = Number($(this).siblings('.single_price').html())
    var total = Number($('#co').html())
    var a = total - minus
    console.log(minus)
    $('#co').html(a)

    $(this).parent().addClass('animated bounceOutLeft 0.5s ')
    $(this).parent().delay(500).hide(100);
}


Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
}


//common used


$('#start_order').click(function () {

    //debug
    count++;
    console.log('start!!boo ya')
    console.log(count)
})

$('.menber_icon').click(function () {

    //debug
    console.log('link to menber')
})


$('#add_1').on('click', function () {
    d = document.createElement('div');
    $(d).addClass('order_list animated bounceInRight 0.5s')
        .html(
            `<p class="order_name">黑胡椒</p>
            <p class="ingredient">材料</p>
            <p class="sauce">醬汁</p>
            <div class="delete_btn"></div>
            <p class="single_price">120</p>
            <p class='order_number'>1</p>
            <div class="add_btn">add</div>
            <div class="minus_btn">minus</div>
            <div class="price_non" style="display:none;">120</div>`
        )
        .attr('id', 'order_' + order_number)
        .appendTo($(".append_rigion"))

    var singalprice = Number($(d).children('.price_non').html())
    var total = Number($('#co').html())
    console.log(singalprice)
    total += singalprice
    $('#co').html(total)

    $(d).children('.delete_btn').on('click', delete_func)

    $(d).children('.add_btn').on('click', add_func)
    $(d).children('.minus_btn').on('click', minus_func)

    $('wrap').modal()
    //$('.shadow').show()
})

$('#add_2').on('click', function () {

})

$('#add_3').on('click', function () {

})

$('#add_4').on('click', function () {

})
//delete

//$('.delete_btn').on('click',delete_func)

//$('.add_btn').on('click',add_func)

//$('.minus_btn').on('click',minus_func)

//shadow return
$('.shadow').on('click', function () {
    $('.shadow').modal()
})

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
    document.getElementById('getimetext').innerHTML = '選擇取餐時間';
    $('#default').addClass('opacity')
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
    var d = new Date()
    console.log(day)
    var hour = day.getHours()
    var minute = day.getMinutes()
    minute += waitminute
    if (minute > 60) {
        minute -= 60
        hour++
    }

    var Dtomorrow = new Date(d.addDays(1))
    var Ddayafter = new Date(d.addDays(1))

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


$('#default').on('click', function () {
    $('.time_block').animate({ height: "50%" })
    document.getElementById('default').innerHTML = "系統預定"

    $('#default').removeClass('opacity')
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

    document.getElementById('storeinfo1').style.color = 'white';
    document.getElementById('week').style.color = 'white';
    document.getElementById('month').style.color = 'white';
    document.getElementById('day').style.color = 'white';
    document.getElementById('hour').style.color = 'white';
    document.getElementById('minute').style.color = 'white';
    document.getElementById('dot1').style.color = 'white';
    document.getElementById('dot2').style.color = 'white';

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
    if (minute > 60) {
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
    document.getElementById('getimetext').innerHTML = '取餐時間';
})


$('#next2').on('click', function () {
    $('#step2_btn').removeClass('red')
    $('#step3_btn').addClass('red')
    $('#defa').removeClass('opacity')
    $('#next1').fadeOut()
    $('#self_defind').fadeOut()
    document.getElementById('default').innerHTML = "自行設定"
    $('.time_block').animate({ height: "27%" })
    $('.step3').removeClass('animated fadeOutRight 0.5s')
    $('.step3').addClass('animated fadeInRight 0.5s')
    $('.step3').show()
    document.getElementById('getimetext').innerHTML = '取餐時間';

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
    $('#line').removeClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').addClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)

    document.getElementById('storeinfo1').style.color = 'red';
    document.getElementById('week').style.color = 'red';
    document.getElementById('month').style.color = 'red';
    document.getElementById('day').style.color = 'red';
    document.getElementById('hour').style.color = 'red';
    document.getElementById('minute').style.color = 'red';
    document.getElementById('dot1').style.color = 'red';
    document.getElementById('dot2').style.color = 'red';
})

$('#wallet').on('click', function () {
    $('#line').addClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').removeClass('opacity')
    $('#yoyo').addClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)

    document.getElementById('storeinfo1').style.color = 'red';
    document.getElementById('week').style.color = 'red';
    document.getElementById('month').style.color = 'red';
    document.getElementById('day').style.color = 'red';
    document.getElementById('hour').style.color = 'red';
    document.getElementById('minute').style.color = 'red';
    document.getElementById('dot1').style.color = 'red';
    document.getElementById('dot2').style.color = 'red';
})

$('#card').on('click', function () {
    $('#line').addClass('opacity')
    $('#card').removeClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').addClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)

    document.getElementById('storeinfo1').style.color = 'red';
    document.getElementById('week').style.color = 'red';
    document.getElementById('month').style.color = 'red';
    document.getElementById('day').style.color = 'red';
    document.getElementById('hour').style.color = 'red';
    document.getElementById('minute').style.color = 'red';
    document.getElementById('dot1').style.color = 'red';
    document.getElementById('dot2').style.color = 'red';
})

$('#yoyo').on('click', function () {
    $('#line').addClass('opacity')
    $('#card').addClass('opacity')
    $('#wallet').addClass('opacity')
    $('#yoyo').removeClass('opacity')

    $('#step3_btn').addClass('red')
    $('#step1_btn').removeClass('red')
    $('#step2_btn').removeClass('red')
    $('#confirm_red').fadeIn(200)

    document.getElementById('storeinfo1').style.color = 'red';
    document.getElementById('week').style.color = 'red';
    document.getElementById('month').style.color = 'red';
    document.getElementById('day').style.color = 'red';
    document.getElementById('hour').style.color = 'red';
    document.getElementById('minute').style.color = 'red';
    document.getElementById('dot1').style.color = 'red';
    document.getElementById('dot2').style.color = 'red';
})

/*select time*/
$('#tod').on('click', function () {
    $('#tod').addClass('block_selected')
    $('#tom').removeClass('block_selected')
    $('#dat').removeClass('block_selected')
    $('#day_').html(Number($('#tod').html()))
})

$('#tom').on('click', function () {
    $('#tom').addClass('block_selected')
    $('#tod').removeClass('block_selected')
    $('#dat').removeClass('block_selected')
    $('#day_').html(Number($('#tom').html()))
})

$('#dat').on('click', function () {
    $('#dat').addClass('block_selected')
    $('#tom').removeClass('block_selected')
    $('#tod').removeClass('block_selected')
    $('#day_').html(Number($('#dat').html()))
})

$('#hour11').on('click', function () {
    $('#hour11').addClass('block_selected')
    $('#hour12').removeClass('block_selected')
    $('#hour13').removeClass('block_selected')
    $('#hour_').html(11)
})

$('#hour12').on('click', function () {
    $('#hour12').addClass('block_selected')
    $('#hour11').removeClass('block_selected')
    $('#hour13').removeClass('block_selected')
    $('#hour_').html(12)
})

$('#hour13').on('click', function () {
    $('#hour13').addClass('block_selected')
    $('#hour12').removeClass('block_selected')
    $('#hour11').removeClass('block_selected')
    $('#hour_').html(13)
})

$('#minute00').on('click', function () {
    $('#minute00').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(00)
})

$('#minute10').on('click', function () {
    $('#minute10').addClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(10)
})

$('#minute20').on('click', function () {
    $('#minute20').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(20)
})

$('#minute30').on('click', function () {
    $('#minute30').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(30)
})

$('#minute40').on('click', function () {
    $('#minute40').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute50').removeClass('block_selected')
    $('#minute_').html(40)
})

$('#minute50').on('click', function () {
    $('#minute50').addClass('block_selected')
    $('#minute10').removeClass('block_selected')
    $('#minute20').removeClass('block_selected')
    $('#minute30').removeClass('block_selected')
    $('#minute40').removeClass('block_selected')
    $('#minute00').removeClass('block_selected')
    $('#minute_').html(50)
})

//event

//}

//page 0
//visiter function
$("#visiter_img").hover(
    function () {
        $(this).attr("src", "./img/工作區域 4.png");
    },
    function () {
        $(this).attr("src", "./img/工作區域 1.png");
    }
);
$('#visiter_img').on('click', function () {

});


//registered function
$("#registered_img").hover(
    function () {
        $(this).attr("src", "./img/工作區域 6.png");
    },
    function () {
        $(this).attr("src", "./img/工作區域 3.png");
    }
);
$('#registered_img').on('click', function () {
    $('.mid_icon').hide()
    $('#signup').fadeIn(300)
});

//memberlogin function
$("#memberlogin_img").hover(
    function () {
        $(this).attr("src", "./img/工作區域 5.png");
    },
    function () {
        $(this).attr("src", "./img/工作區域 2.png");
    }
);

//以下為SIGNIN/SIGNUP動畫 按外部icon時觸發


$('#memberlogin_img').on('click', function () {
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
});

$('#signinbotton').unbind('click').click(function () {
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
    $('#signin').delay(1050).hide();
})

$('#registered_img').on('click', function () {
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
    $('#forgetpassward_text').delay(850).animate({
        opacity: 1,
        bottom: '39%'
    }, 200);
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
});

$('#signupbotton').on('click', function () {

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
    $('#forgetpassward_text').delay(550).animate({
        opacity: 0,
        bottom: '36%'
    }, 200);
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
    $('#signin').delay(1300).hide();
});

/*以下是會員登入頁面控制的JQuery*/
$('#shop').on('click', function () {
    $('#shop').html(
        `<img src="./img/工作區域 2 (2).png" style="width:100%;">
    <div class="text">購買紀錄</div>`)
    $('.person_block').css('display','none')
    $('.shop_block').css('display','block')
})

$('#coupon').on('click', function () {
    $('#coupon').html(
        `<img src="./img/工作區域 3 (1).png" style="width:100%;">
    <div class="text">折價卷</div>`)
    $('.person_block').css('display','none')
    $('.coupon_block').css('display','block')
})

$('#info').on('click', function () {
    $('#info').html(
        `<img src="./img/工作區域 4 (2).png" style="width:100%;">
        <div class="text">通知</div>`)
    $('.person_block').css('display','none')
    $('.info_block').css('display','block')
})

$('#el_wallet').on('click', function () {
    $('#el_wallet').html(
        `<img src="./img/工作區域 5 (2).png" style="width:100%;">
        <div class="text">我的錢包</div>`)
        $('.person_block').css('display','none')
        $('.el_block').css('display','block')
})

$('#comment').on('click', function () {
    $('#comment').html(
        ` <img src="./img/工作區域 6 (2).png" style="width:100%;">
        <div class="text">評論</div>`
    )
    $('.person_block').css('display','none')
    $('.comment_block').css('display','block')
})

$('#setting').on('click', function () {
    $('#setting').html(
        ` <img src="./img/工作區域 7 (2).png" style="width:100%;">
        <div class="text"> 個人設定</div>`
    )
    $('.person_block').css('display','none')
    $('.setting_block').css('display','block')
})

$('.info').on('click',function(){
    $(this).attr('background-image','url(../img/mail_open.png)')
    $(this).attr('background-color','#e6e6e6')
})
 /*以上是會員登入介面的程式碼*/