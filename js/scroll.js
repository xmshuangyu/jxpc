// JavaScript Document
$('.ddw').val(0);
$('.ddw2').val(0);
//setTimeout(function () {
//}, 100);

$(function () {
    $('.num_box').mousewheel(function (event, delta) {
        //console.log(delta);
        var aaaa = $('.ddw2').val();
        if (aaaa == 1) {
            return;
        }
        qpgd(delta);
    });
});
function qpgd(a) {
    var z = $('.ddw').val();
   		b = parseInt(z);//滚动时的值，从0开始 下滚 -1 上滚加1
    	c = $('.num').length;//多少屏
    if (a < 0) {//-1往下滚
        if (-b == c - 1) {//滚到底
            return;
        }
        b -= 1;
        $('.ddw2').val(1);
    } else if (a > 0) {//1往上滚
        if (-b == 0) {
            return;
        }
        b += 1;
        $('.ddw2').val(1);
    }
    if (-b == 0) {
        //----写第二屏还原的样式---//
        $("#num_1").find(".pro").removeClass("cur");
        //----写第二屏还原的样式---//
        setTimeout(function(){$(".i_banner").addClass("cur");},800)
    } else if (-b == 1) {
        $(".i_banner").removeClass("cur");
        for(var i=3;i<=10;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=27;i<=29;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=19;i<=26;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        for(var i=39;i<=41;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        setTimeout(function () {$(".media").removeClass("cur")})
        //第二屏动画，以下类推
        $("#num_1").find(".pro").addClass("cur");
    } else if (-b == 2) {
        //----写第二屏还原的样式---//
        $("#num_1").find(".pro").removeClass("cur");
        //----写第二屏还原的样式---//
        //--第三屏效果--//
            for(var i=3;i<=10;i++){
                $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
            }
            for(var i=27;i<=29;i++){
                $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
            }
            for(var i=19;i<=26;i++){
                $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
            }
            for(var i=39;i<=41;i++){
                $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
            }
        setTimeout(function () {$(".media").addClass("cur")},400)
        //--第四还原动画--//

        } else if (-b == 3) {
        for(var i=3;i<=10;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=27;i<=29;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=19;i<=26;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        for(var i=39;i<=41;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        setTimeout(function () {$(".media").removeClass("cur")})
        //写第四屏效果//
    }
    else if (-b == 4) {
        $('.num').eq(3).find('p').animate({'top': '0'}, 500);
        $('.num').eq(5).find('p').animate({'top': '0'}, 500);
        setTimeout(function () {
            $('.num').eq(4).find('p').animate({'top': '50%'}, 500);
        }, 1600);
    }
    $('.ddw').val(b);
    $('.fixed_r li').eq(-b).addClass('on').siblings('li').removeClass('on');
    var single_hh = $(window).height();
    click_hh = -single_hh * b;
    $('.num_box').animate({'bottom': click_hh}, 1000);
    setTimeout(function () {
        $('.ddw2').val(0);
    }, 1400);
}
$('.fixed_r li').eq(0).addClass('on');
$('.fixed_r li').click(function () {
    var b = $(this).index();
    $(this).addClass('on').siblings('li').removeClass('on');
    $('.ddw').val(-b);
    /*---------------------*/
    if (-b == 0) {
        console.log(8);
        //----写第二屏还原的样式---//
        $("#num_1").find(".pro").removeClass("cur");
        //----写第二屏还原的样式---//
        setTimeout(function(){$(".i_banner").addClass("cur");},800)
    } else if (-b == 1) {
        console.log(18);

        $(".i_banner").removeClass("cur");
        for(var i=3;i<=10;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=27;i<=29;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=19;i<=26;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        for(var i=39;i<=41;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        setTimeout(function () {$(".media").removeClass("cur")})
        //第二屏动画，以下类推
        $("#num_1").find(".pro").addClass("cur");
    } else if (-b == 2) {
        //----写第二屏还原的样式---//
        $("#num_1").find(".pro").removeClass("cur");
        //----写第二屏还原的样式---//
        //--第三屏效果--//
        //右边
        for(var i=3;i<=10;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        for(var i=27;i<=29;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        for(var i=19;i<=26;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=39;i<=41;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        setTimeout(function () {$(".media").addClass("cur")},400)


    } else if (-b == 3) {
        for(var i=3;i<=10;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=27;i<=29;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))+30);
        }
        for(var i=19;i<=26;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        for(var i=39;i<=41;i++){
            $("[data-list="+i+"]").css("left",parseInt($("[data-list="+i+"]").css("left"))-30);
        }
        setTimeout(function () {$(".media").removeClass("cur")})
        //写第四屏效果//
    }
    else if (-b == 4) {
        $('.num').eq(3).find('p').animate({'top': '0'}, 500);
        $('.num').eq(5).find('p').animate({'top': '0'}, 500);
        setTimeout(function () {
            $('.num').eq(4).find('p').animate({'top': '50%'}, 500);
        }, 1600);
    }
    /*---------------------*/

    var single_hh = $(window).height();
    click_hh = single_hh * b;
    $('.num_box').animate({'bottom': click_hh}, 1000);
})
function quanp() {
    var single_hh = $(window).height();
    var single_ww = $(window).width();
    $('.num').height(single_hh);
    $('.i_banner li').width(single_ww);
}
quanp();
$(window).resize(function () {
    if (typeof indexSlides != 'undefined' && indexSlides.reformat)
        indexSlides.reformat();
    quanp();
});