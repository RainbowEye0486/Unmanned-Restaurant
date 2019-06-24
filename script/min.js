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

detail_func = function(){
    $(this).parent('.shop').children('.detail_block').show()
    $('.mask').show()
}

cancel_func = function(){
   
    $('.mask').hide();
    $('.mask_top').hide();
    $('.mail').hide();
}

star_func = function(){
    
    $(this).css('background-image',`url(../img/star.png)`)
    $(this).parents('.shop').children('.raking_pic').css('background-image','url(../img/smile.png)')
}

send_out_func = function(){
    alert("送出資料")
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
        `<img src="./img/M工作區域 7.png" style="width:100%;">
    `)
    $('#coupon').html(
        `<img src="./img/M工作區域 2.png" style="width:100%;">
    `)

    $('#info').html(
        `<img src="./img/M工作區域 3.png" style="width:100%;">
        `)

    $('#el_wallet').html(
        `<img src="./img/M工作區域 4.png" style="width:100%;">
        `)

    $('#comment').html(
        `<img src="./img/M工作區域 5.png" style="width:100%;">
        `
    )

    $('#setting').html(
        `<img src="./img/M工作區域 6.png" style="width:100%;">
        `
    )

    $('.person_block').css('display', 'none')
    $('.shop_block').css('display', 'block')
})

$('#coupon').on('click', function () {
    $('#shop').html(
        `<img src="./img/M工作區域 1.png" style="width:100%;">
        `)

    $('#coupon').html(
        `<img src="./img/M工作區域 8.png" style="width:100%;">
    >`)

    $('#info').html(
        `<img src="./img/M工作區域 3.png" style="width:100%;">
    `)

    $('#el_wallet').html(
        `<img src="./img/M工作區域 4.png" style="width:100%;">
        `)

    $('#comment').html(
        `<img src="./img/M工作區域 5.png" style="width:100%;">
    `
    )

    $('#setting').html(
        `<img src="./img/M工作區域 6.png" style="width:100%;">
        `
    )

    $('.person_block').css('display', 'none')
    $('.coupon_block').css('display', 'block')
})

$('#info').on('click', function () {

    $('#shop').html(
        `<img src="./img/M工作區域 1.png" style="width:100%;">
    `)

    $('#info').html(
        `<img src="./img/M工作區域 9.png" style="width:100%;">
        `)
    $('#coupon').html(
        `<img src="./img/M工作區域 2.png" style="width:100%;">
        `)

    $('#el_wallet').html(
        `<img src="./img/M工作區域 4.png" style="width:100%;">
        `)

    $('#comment').html(
        `<img src="./img/M工作區域 5.png" style="width:100%;">
    `
    )

    $('#setting').html(
        `<img src="./img/M工作區域 6.png" style="width:100%;">
    `
    )

    $('.person_block').css('display', 'none')
    $('.info_block').css('display', 'block')
})

$('#el_wallet').on('click', function () {

    $('#shop').html(
        `<img src="./img/M工作區域 1.png" style="width:100%;">
        `)


    $('#coupon').html(
        `<img src="./img/M工作區域 2.png" style="width:100%;">
        `)

    $('#info').html(
        `<img src="./img/M工作區域 3.png" style="width:100%;">
        `)

    $('#el_wallet').html(
        `<img src="./img/M工作區域 10.png" style="width:100%;">
       `)

    $('#setting').html(
        `<img src="./img/M工作區域 6.png" style="width:100%;">
    `)

    $('#comment').html(
        `<img src="./img/M工作區域 5.png" style="width:100%;">
        `
    )

    $('.person_block').css('display', 'none')
    $('.el_block').css('display', 'block')
})

$('#comment').on('click', function () {
    
    $('#shop').html(
        `<img src="./img/M工作區域 1.png" style="width:100%;">
    `)

    $('#coupon').html(
        `<img src="./img/M工作區域 2.png" style="width:100%;">
        `)

    $('#info').html(
        `<img src="./img/M工作區域 3.png" style="width:100%;">
        `)

    $('#el_wallet').html(
        `<img src="./img/M工作區域 4.png" style="width:100%;">
        `)

    $('#comment').html(
        ` <img src="./img/M工作區域 11.png" style="width:100%;">
        `
    )

    $('#setting').html(
        `<img src="./img/M工作區域 6.png" style="width:100%;">
        `
    )

    $('.person_block').css('display', 'none')
    $('.comment_block').css('display', 'block')
})

$('#setting').on('click', function () {

    $('#shop').html(
        `<img src="./img/M工作區域 1.png" style="width:100%;">
        `)

    $('#coupon').html(
        `<img src="./img/M工作區域 2.png" style="width:100%;">
        `)

    $('#setting').html(
        `<img src="./img/M工作區域 12.png" style="width:100%;">
    `)

    $('#info').html(
        `<img src="./img/M工作區域 3.png" style="width:100%;">
        `)

    $('#el_wallet').html(
        `<img src="./img/M工作區域 4.png" style="width:100%;">
        `)

    $('#comment').html(
        `<img src="./img/M工作區域 5.png" style="width:100%;">
        `
    )
    $('.person_block').css('display', 'none')
    $('.setting_block').css('display', 'block')
})

$('.info').on('click', function () {
    $(this).attr('background-image', 'url(../img/mail_open.png)')
    $(this).attr('background-color', '#e6e6e6')
})

$('.mask').on('click',function(){
    $('.mask').hide();
    $('.mask_top').hide();
})


$('.cancel_btn').on('click',cancel_func)


$('#accumulate_btn').on('click',function(){
    $('.mask').show();
    $('.member_system').show();
})

$('#bonus_btn').on('click',function(){
    $('.mask').show();
    $('.red_gold').show();
})

$('.click_mail').on('click',function(){
    $('.mask').show()
    $(this).css('background-color','#e6e6e6');
    $(this).parent().children('.mail_pic').css('background-image',`url(../img/mail_open.png)`);
    $(this).parent().children('.mail_pic').css('padding-bottom','7%')
    $(this).parent().children('.mail_pic').css('top','13%')
    $(this).parent().children('.mail_pic').css('left','2.8%')
    $(this).parent().children('.mail').show()
    
})

$('.detail_pic').on('click',detail_func)

$('.star').on('click',star_func)

$('#send_out').on('click',send_out_func)

$('.cancel_mail').on('click',function(){
    $(this).parent().remove();
})

$('#gogo_order').on('click',function(){
    a=document.createElement('div')
    $(a).addClass('shop')
    .html(` <p id="order_time">20190503<br>11:21</p>
    <p id="pay_way">信用卡</p>
    <p id="left_time" >剩餘10分鐘</p>
    <p id="take_time">11:50</p>
    <p id="pay_money">240</p>
    <div class="detail_pic"></div>
    <div class="raking_pic"></div>
    
    <div class="detail_block mask_top">
        <div class="dodo_pic"></div>
        <div class="cancel_btn"></div>
        <div class="detail_white_block">
            <p style="left:11%;top:13%;font-size: 1vw;">餐點品項</p>
            <p style="left:58%;top:13%;font-size: 1vw;">數量</p>
            <p style="left:80%;top:13%;font-size: 1vw;">單價</p>
        </div>
        <div class="detail_order_block">
            <div class="detail_order">
                <div class="cover">
                        <p class="detail_name" style="left: 2%;">黑膠鮮檸鮭魚堡</p>
                        <p class="detail_contain" style="left: 2%;font-size: 1vw;top:45%;">花生醬</p>
                        <p class="detail_number" style="left: 57%;">2</p>
                        <p class="detail_perprice" style="left: 76%;">230</p>
                </div>
               
            </div>
            <div class="detail_order">
                <div class="cover">
                        <p class="detail_name" style="left: 2%;">黑膠起士牛肉堡</p>
                        <p class="detail_contain" style="left: 2%;font-size: 1vw;top:45%;">不要醬</p>
                        <p class="detail_number" style="left: 57%;">1</p>
                        <p class="detail_perprice" style="left: 76%;">120</p>
                </div>
                
            </div>
            <div class="detail_order">
                <div class="cover">
                        <p class="detail_name" style="left: 2%;">黑膠鮮檸鮭魚堡</p>
                        <p class="detail_contain" style="left: 2%;font-size: 1vw;top:45%;">花生醬</p>
                        <p class="detail_number" style="left: 57%;">2</p>
                        <p class="detail_perprice" style="left: 76%;">230</p>
                </div>
                
            </div>
        </div>
        <div class="total">
            <p>TATAL COST</p>
            <p id="detail_cost" style="left:80%;">340</p>
        </div>
        <p style="top:66%;left:3%;">使用折價券</p>
        <p id="detail_coupon" style="top:66%;left:41.5%;">-0</p>
            <div class="detail_right">
                <p id="de_name" style="top:1%;left:37%;">黑膠漢堡台南車站店</p>
                <p id="de_adress" style="top: 13%;left: 37%;font-size: 1.2vw;">台南市東區大學路26號</p>
                <p id="de_phone" style="top:21%;left: 37%;font-size: 1.2vw;">電話:(06)237 3472</p>
                <p id="de_time" style="top:31%;left: 37%;">JUNE19(WED)   12:20</p>
                <p id="de_payway" style="top:47%;left: 37%;">信用卡付款</p>
                
                <p style="top:86%;left:44%;font-size: 1.2vw;">如果喜歡該品項請點擊星星</p>

                <button type="button" class="btn btn-secondary btn-lg " id='send_out'>送出</button>
                <div class="detail_place" ></div>
                <div class="detail_time"></div>
                <div class="detail_way"></div>
                <div class="detail_comment"></div>
 
                <div class="comment_list">
                        <div class="comment_list_per">
                            <div class="cover2">
                                <p class="de_comment">黑膠鮮檸鮭魚堡</p><!--注意這裡是使用class-->
                                <div class="star"></div>
                            </div>
                        </div>
                        <div class="comment_list_per">
                            <div class="cover2">
                                <p class="de_comment">黑膠鮮檸鮭魚堡</p><!--注意這裡是使用class-->
                                <div class="star">
                            </div> 
                            </div>
                        </div> 
                </div>                
            </div>
    </div>
</div>`)
.appendTo($('.shop_inner'))

$(a).children('.detail_pic').on('click',detail_func)
$(a).find('.star').on('click',star_func)
$(a).find('.cancel_btn').on('click',cancel_func)
$(a).find('#send_out').on('click',send_out_func)

})

$('#send_out').on('click',function(){
    w=document.createElement('div')
    $(w).addClass('detail_order')
    .html(` <div class="cover">
    <p class="detail_name" style="left: 2%;">--</p>
    <p class="detail_contain" style="left: 2%;font-size: 1vw;top:45%;">花生醬</p>
    <p class="detail_number" style="left: 57%;">2</p>
    <p class="detail_perprice" style="left: 76%;">230</p>
</div>
`)
.appendTo($(this).parents('.shop').find('.detail_order_block'))

    f=document.createElement('div')
    $(f).addClass('comment_list_per')
    .html(`
    <div class="cover2">
        <p class="de_comment">--</p>
        <div class="star"></div> 
    </div>`
).appendTo($(this).parents('.shop').find('.comment_list'))


$(f).find('.star').on('click',star_func)


})


$('#gogo_order').on('click',function(){
    s=document.createElement('div')
    $(s).addClass('info')
    .html(`
    <div class="click_mail"></div>
    <div class="cancel_mail"></div>
    <div class="mail_pic"></div>
    <p id="send_time">20190503</p>
    <p id="send_name">黑膠漢堡</p>
    <p id="send_topic">已完成訂單</p>
    
    <div class="mail mask_top">
       
        <p style="top:12%;left:16%;">主旨</p>
        <p id="mail_topic" style="top:12%;left:27%">恭喜加入會員!請打開信件領取優惠券</p>
        <p style="top:21%;left:13%;">收件時間</p>
        <p id="receive_time" style="top:20%;left:27%;">20190503</p>
        <div class="mail_box">
            <p id="mailtext" style="text-align: left;top:0%;">此信件為系統自動發出之信件，請勿直接回覆(也沒辦法讓你回復)，謝謝您的配合!
                <br><br><br>感謝您成功加入會員
                <br>我們準備了50元折價券供您消費使用
                <br>在結帳的頁面即可提供使用
                <br><br><br>黑膠漢堡
            </p>
        </div>
    </div>
`)
.appendTo($('.info_inner'))

$(s).find('.cancel_mail').on('click',function(){
    $(this).parent().remove();
})



})
/*以上是會員登入介面的程式碼*/