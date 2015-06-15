/* ===========================================================
 * jquery-loadingbar.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Add a Youtube-like loading bar
 * to all your AJAX links
 *
 * https://github.com/peachananr/loading-bar
 *
 * ========================================================== */

!function ($) {

    var defaults = {
        replaceURL: false,
        //target: "#loadingbar-frame",
        direction: "right",

        /* Deafult Ajax Parameters  */
        async: true,
        complete: function (xhr, text) {
        },
        cache: true,
        error: function (xhr, text, e) {
        },
        global: true,
        headers: {},
        statusCode: {},
        success: function (data, text, xhr) {
        },
        dataType: "html"
    };

    $.fx.step.textShadowBlur = function (fx) {
        $(fx.elem).prop('textShadowBlur', fx.now).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px black'});
    };


    $.fn.loadingbar = function (options) {
        var settings = $.extend({}, defaults, options),
            el = $(this),
            href = el.attr("href"),
            target = (el.data("target")) ? el.data("target") : settings.target,
            type = (el.data("type")) ? el.data("type") : settings.type,
            datatype = (el.data("datatype")) ? el.data("datatype") : settings.dataType

        return this.each(function () {
            el.ready(function () {
                $.ajax({
                    type: type,
                    url: href,
                    async: settings.async,
                    complete: settings.complete,
                    cache: settings.cache,
                    error: settings.error,
                    global: settings.global,
                    headers: settings.headers,
                    statusCode: settings.statusCode,
                    success: settings.success,
                    dataType: datatype,
                    beforeSend: function () {
                        if ($("#loadingbar").length === 0) {
                            $("body").append("<div id='loadingbar'></div>")
                            $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));

                            switch (settings.direction) {
                                case 'right':
                                    $("#loadingbar").width((50 + Math.random() * 30) + "%");
                                    break;
                                case 'left':
                                    $("#loadingbar").addClass("left").animate({
                                        right: 0,
                                        left: 100 - (50 + Math.random() * 30) + "%"
                                    }, 200);
                                    break;
                                case 'down':
                                    $("#loadingbar").addClass("down").animate({
                                        left: 0,
                                        height: (50 + Math.random() * 30) + "%"
                                    }, 200);
                                    break;
                                case 'up':
                                    $("#loadingbar").addClass("up").animate({
                                        left: 0,
                                        top: 100 - (50 + Math.random() * 30) + "%"
                                    }, 200);
                                    break;
                            }

                        }
                    }
                }).always(function () {
                    switch (settings.direction) {
                        case 'right':
                            $("#loadingbar").width("101%").delay(200).fadeOut(400, function () {
                                $(this).remove();
                            });
                            break;
                        case 'left':
                            $("#loadingbar").css("left", "0").delay(200).fadeOut(400, function () {
                                $(this).remove();
                            });
                            break;
                        case 'down':
                            $("#loadingbar").height("101%").delay(200).fadeOut(400, function () {
                                $(this).remove();
                            });
                            break;
                        case 'up':
                            $("#loadingbar").css("top", "0").delay(200).fadeOut(400, function () {
                                $(this).remove();
                            });
                            break;
                    }

                }).done(function (data) {
                    if (history.replaceState && settings.replaceURL == true) history.pushState({}, document.title, href);
                    if (settings.done) {
                        settings.done(data, target)
                    } else {
                        $(target).html(data)
                    }

                });
                return false
            });

        });
    }

    /*图片垂直居中*/
    $.fn.img_mid=function(){
        var img_box=$("[data-img]"),
            img_div=img_box.children("div");
        img_div.each(function(e){
            var img=$(this).children("img"),
                d_h=$(this).height(),
                d_w=$(this).width(),
                img_w=img.width(),
                img_h=img.height();
            img.css({"top":(d_h-img_h)/2,"left":(d_w-img_w)/2});
        });
    }
    /*锚点导航左侧固定*/
    $.fn.scrollDiv=function(scrollobj){
        var Scroll=$(scrollobj),
            sh=Scroll.outerHeight(true),
            stop=Scroll.find(".nav_l1").outerHeight(true)+sh-1,
            Scrolltop=Scroll.offset().top;
        var left=Scroll.offset().left;
        var top=Scroll.offset().top;
        var doh=$(document).height();
        var winw=$(window).height();
        var fh=$("footer").height();
        var ieh=$.browser.msie?26:0;   //判断IE内核
        $(window).scroll(function(){
            var scrolltop=$(this).scrollTop(),
                toph=$("footer").offset().top-sh-Scrolltop+ieh,
                dheight=doh-scrolltop;
            // alert("$(".footer").offset().top")
            if(scrolltop>Scrolltop&& ((doh-scrolltop) > (winw+fh/2-sh))){
                $(scrollobj).removeAttr("style").css({"position":"fixed","top":0});
            }else{
                if(scrolltop>Scrolltop && ((doh-scrolltop) <= (winw+fh))){
                    $(scrollobj).removeAttr("style").css({"position":"absolute","top":toph-stop});
                }else{
                    $(scrollobj).removeAttr("style");
                }
            }
        })
        //平滑滚动
        var a=Scroll.find("a");
        a.each(function(){
            $(this).on("click",function(){
                var href=$(this).attr("href"),
                    top=$(href).offset().top;console.log(top)
                $("html,body").animate({scrollTop: top}, 1000);
                return false;
            })
        });
    };

}(jQuery);
$(window).loadingbar({
    done: function (data) {
        $.each(data.items, function (i, item) {
            //$("<img/>").attr("src", item.media.m).prependTo($("#frame"));
            if (i === 2) {
                return false;
            }
        });
    }
});
