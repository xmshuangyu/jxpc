/**
 * Created by Administrator on 2015/3/5.
 * 捷信PC端
 */
(function ($) {
    /*显示隐藏*/
    $.fn.h_s = function () {
        var h_s_box = $("[data-popup]"),
            h_t = h_s_box.children(".popup"),
            h_t_i=h_t.children("i"),
            h_c = h_s_box.children(".popup-box"),
            timeOut = null;
        /*单独为about_us定义*/
        function ac(ac) {
            ac.hover(function () {
                h_t_i.addClass("hover");
                h_t.addClass("zz");
                h_c.css("z-index", 2);
                h_c.animate({
                    opacity: 1
                }, 200);
                clearTimeout(timeOut);
            }, function () {
                timeOut = setTimeout(function () {
                    h_c.animate({
                        opacity: 0
                    }, 200, function () {
                        h_t.removeClass("zz");
                        h_t_i.removeClass("hover");
                        h_c.css("z-index", -1);
                    });
                }, 100);

            });
        }

        ac(h_c);
        ac(h_t);
        /*header最后一个菜单隐藏菜单小图标动画*/
        var menu = $(".menu"),
            li_a = menu.find("li");
        li_a.each(function () {
            var li_i = $(this).find("i");
            $(this).hover(function () {
                li_i.stop().animate({
                    left: -10
                })
            }, function () {
                li_i.stop().animate({
                    left: 0
                })
            })
        })
    }
    //------返回顶部--------//
    $.fn.back_top = function (options) {

        var settings = {
            topSpeed: 400, //回顶部时间
            topDistance: 300, //页面下拉距离
            fadeIn: 1200,
            fadeOut: 1200
        }
        //$("body").prepend("<div id='totop'><a>top</a></div>");
        if (options) {
            settings = $.extend(settings, options);
        }

        var topS = settings.topSpeed,
            topD = settings.topDistance,
            fIn = settings.fadeIn,
            fOut = settings.fadeOut,
            div_html = "<div data-z='back_top' class='back_top'><i class='icon'></i>TOP</div>";
        $("body").append(div_html);
        var _b_t = $('[data-z="back_top"]');
        //用_b_t=$(this)就可在页面用$("tag-name")调用
        $(window).on("scroll", function () {
            $(this).scrollTop() > topD ?
                _b_t.stop(true, true).fadeIn(fIn) :
                _b_t.stop(true, true).fadeOut(fOut);
        })

        _b_t.on("click", function () {
            $("html,body").animate({
                scrollTop: 0
            }, topS);
            return false;
        })
    };
    /**滑动--Loan定义**/
    $.fn.sliderBar = function (userConfig) {
        var
            config = {
                itemArray: null,
                valueElement: null
            };
        $.extend(config, userConfig);
        function sliderBar(sliderBar, itemArray, valueElement) {
            this.sliderBar = sliderBar;
            this.itemArray = itemArray;
            this.valueElement = valueElement;
        }

        //初始化
        sliderBar.prototype.clear = function () {
            var
                wE = this.sliderBar,
                lBar = wE.find('.slider-bar-light'),
                dot = wE.find('.slider-bar-dot'),
                wEW = wE.width(),
                items = this.itemArray,
                valueElement = this.valueElement;
            lBar.css({'width': 0 + 'px'});
            dot.css({'left': -(dot.width() / 2) + 'px'});
            valueElement.val(items[0]);
            this.valueElement.val(items[0]);
        }
        //取值
        sliderBar.prototype.getValue = function () {
            return this.valueElement.val();
        }
        //启动
        sliderBar.prototype.start = function () {
            var
            //滑动效果
                _self = this,
                wE = this.sliderBar,
                lBar = wE.find('.slider-bar-light'),
                dot = wE.find('.slider-bar-dot'),
                wEW = wE.width(),
                wEX = wE.offset().left,
                wEMaxX = wEX + wE.width(),
                dotW = dot.width() / 2, //移动元素宽度一半
                dotX = -dotW,
                dX = 0, //移动值
                lBarW = 0,
                isMove = false,
                valueX = 0,
            //计算值
                items = this.itemArray,
                valueElement = this.valueElement,
                itemL = items.length,  //总节点
                itemW = wEW / (itemL - 1), //每段长
                itemW2 = itemW / 2;//段长一半
            console.log(wEW);
            var setValue = function (valueX) {
                var
                    v1 = Math.floor(valueX / itemW), //结果
                    v2 = valueX % itemW, 	//余数
                    value = 0;
                if (v2 === 0) {
                    value = items[v1];
                } else {
                    if (v2 <= itemW2) {
                        value = items[v1];
                        dot.animate({left: itemW * v1 - 20 + 'px'}, 200);
                        lBar.animate({width: itemW * v1 + 'px'}, 200);
                    } else {
                        value = items[v1 + 1];
                        dot.animate({left: itemW * (v1 + 1) - 20 + 'px'}, 200);
                        lBar.animate({width: itemW * (v1 + 1) + 'px'}, 200);
                    }

                }
                valueElement.val(value);
            };
            dot.on('mousedown ', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var
                    cur = $(this);
                dotX = cur.position().left;
                isMove = true;
            });
            $(document).on('mousemove', function (event) {
                var
                    pageX = event.pageX;
                if (isMove) {
                    if (pageX >= wEX && pageX <= wEMaxX) {
                        dX = pageX - (wEX + dotX + dotW);
                        valueX = dX + dotX + dotW;
                        dot.css({left: dX + dotX + 'px'});
                        lBar.css({width: valueX + 'px'});
                    }
                }
            }).on('mouseup', function (event) {
                if (isMove) {
                    event.preventDefault();
                    isMove = false;
                    setValue(valueX);
                }
            });

            return _self;
        }
        return new sliderBar($(this), config.itemArray, config.valueElement).start();
    }
})(jQuery);
var jx = {

    //头部Hover下滑border
    a_border: function (index) {
        var a_border = $(".a_border"),
            nav = $("#f_nav"),
            li = nav.children("ul").children("li"),
            this_li = null;
        if(index!=null){
             this_li = li.eq(index);
        }
        li.each(function (e) {
            if(!$(this).is(li.last())){
                $(this).hover(function () {
                    if(li.find(".cur").length!=0){
                        li.find(".cur").removeClass("cur");
                    }
                    var left = ($(this).children("a").offset().left - nav.offset().left);
                    a_border.stop().animate({"width": $(this).children("a").width(), "left": left}, 200);
                }, function () {
                    if(this_li!=null){
                        var cur_left=this_li.children("a").offset().left - nav.offset().left;
                        cur_width=this_li.children("a").width()
                        a_border.stop().animate({
                            "width": cur_width,
                            "left": cur_left
                        }, 400);
                    }
                    else{
                        a_border.stop().animate({
                            "width": 0,
                            "left": 0
                        })
                    }
                });
            }

        });

    },
    about_intro: function () {
        var int_t = $(".nav_list").children("a"),

            int_c = $(".col");
        int_t.each(function (e) {
            $(this).on("click", function () {
                int_t.removeClass("cur").eq(e).addClass("cur");
                text(e);
            });

        });
        var text = function (now) {
            int_c.find('h3').css({opacity: 0}).eq(now).stop(true).delay(100).animate({opacity: 1}, 500);
            int_c.find('p').css({opacity: 0}).eq(now).stop(true).delay(600).animate({opacity: 1}, 500);
            int_c.find('img').css({opacity: 0, left: 0}).eq(now).stop(true).delay(700).animate({
                opacity: 1,
                left: -15
            }, 500);
        }
    },
    //重定义单选
    radio: function () {
        var $el = $("[data-change]"), t = true;
        $el.each(function () {
            var iSradio = $(this).attr("data-iSradio"), toggle = $(this).attr("data-toggle"), checked = $(this).attr("data-methods");
            $(this).on('click', function () {
                $(this).attr("data-val", 0).find('i.icon').attr('class', 'icon radio-on');
                if (iSradio == "true") {
                    var _this = $(this).parent().siblings();
                    _this.find("label").attr("data-val", 1).find('i.icon').attr('class', 'icon radio');
                } else if (toggle == "true") {
                    var status = ($(this).data('change') == 'un' + checked) ? checked + "-on" : checked,
                        m = ($(this).data('change') == 'un' + checked) ? checked : 'un' + checked,
                        value = ($(this).data('change') == checked) ? '0' : '1';
                    $(this).attr("data-val", value).find('i.icon').attr('class', 'icon ' + status);
                    $(this).data("change", m);
                } else {
                    $(this).attr("data-val", 1).siblings().attr("data-val", 0).find('i.icon').attr('class', 'icon radio');
                }
                //自定义change事件
                $(this).trigger('change');
            });
        })

    },
    //重定义select
    select: function () {

        var $select = $("[data-select]"),
            $st = $select.children(".st"),
            $sc = $select.children(".sc");
        $st.each(function (e) {
            $(this).on("click", function () {
                $st.children("i").removeClass("on").eq(e).addClass("on");
                $sc.hide().eq(e).fadeIn(200);
            })
            var li = $(this).siblings(".sc").find("li");
            li.each(function (e) {
                $(this).on("click", function () {
                    var content = $(this).text();
                    $(this).parents("[data-select]").find("span").html(content);
                    $sc.hide();
                    $st.children("i").removeClass("on");
                });
            });

        });
    },
    /*手风琴*/
    accordion: function () {
        var tabs_i = 0,
            $o_t = $(".o_t"),
            $o_c = $o_t.siblings(".o_c"),
            $o_ti = $o_t.find("i");
        $o_t.each(function (e) {
            $(this).on("click", function () {
                var $to_c = $(this).siblings(".o_c");
                if ($to_c.length != 0 && $to_c.css("display") == "none") {
                    $o_c.slideUp().eq(e).slideDown();
                    $o_ti.removeClass("cur").eq(e).addClass("cur");
                }
            })
        });
    },
    /*图片轮播*/
    slides: function () {
        var $focus = $(".focus");
        var sWidth = $focus.width(),
            l = $focus.find("li").length,
            index = 0,
            picTimer,
            span_i = $focus.children(".box").find("span");
        span_i.mouseover(function () {
            index = $(this).index();
            showPics(index, sWidth);
        }).eq(0).trigger("mouseover");
        $focus.find("ul").css("width", sWidth * l);
        $focus.hover(function () {
            clearInterval(picTimer);
        }, function () {
            picTimer = setInterval(function () {
                showPics(index, sWidth);
                index++;
                if (index == l) {
                    index = 0;
                }
            }, 2000);
        }).trigger("mouseleave");

        //显示图片函数，根据接收的index值显示相应的内容
        function showPics(index, sWidth) { //普通切换
            var nowLeft = -index * sWidth; //根据index值计算ul元素的left值
            $focus.find("ul").stop(true, false).animate({"left": nowLeft}, 500); //通过animate()调整ul元素滚动到计算出的position
            span_i.removeClass("on").eq(index).addClass("on");
        }

    },

    /*横向图片流*/
    level_water: function (D) {
        var D_box = $(".l-w-box"),
            img_box = D_box.find(".l-w"),
            pre = $(".et").find(".pre"),
            next = $(".et").find(".next"),
            index = img_box.index();
        wh(index);
        $().img_mid();//图片居中
        pot(index);
        var last_img = parseInt(img_box.eq(index).css("left")),//最后个left-->算出总宽度
            img_all=last_img+img_box.eq(index).width();
            m = 1,n=1;
        //设置总宽度
        D_box.css("width",img_all);
//img-div宽高付值
        function wh(sum) {
            for (var i = 0; i <= sum; i += 7) {
                img_box.eq(i).css({"width": 416, "height": 275});
                img_box.eq(i + 1).css({"width": 416, "height": 275});
                img_box.eq(i + 2).css({"width": 624, "height": 334});
                img_box.eq(i + 3).css({"width": 328, "height": 216});
                img_box.eq(i + 4).css({"width": 328, "height": 216});
                img_box.eq(i + 5).css({"width": 365, "height": 334});
                img_box.eq(i + 6).css({"width": 328, "height": 216});
            }
            img_box.each(function(){
                var img=$(this).children("img");
                if(img.width()/img.height()>$(this).width()/$(this).height()){
                    img.css("height",$(this).height())
                }
                else{
                    img.css("width",$(this).width())
                }
            })
            //for(var i = 0; i <= sum; i ++){
            //
            //    console.log(img_box.eq(i).width()/img_box.eq(i).height());
            //}

        }

//img-div定位
        function pot(sum) {
            var j = 0;
            for (var i = 0, j = 0; i <= sum; i += 7, j++) {
                img_box.eq(i).css({"left": 1420 * j, "top": 0});
                img_box.eq(i + 1).css({"left": 1420 * j, "top": 280});
                img_box.eq(i + 2).css({"left": 421 + 1420 * j, "top": 0});
                img_box.eq(i + 3).css({"left": 421 + 1420 * j, "top": 339});
                img_box.eq(i + 4).css({"left": 754 + 1420 * j, "top": 339});
                img_box.eq(i + 5).css({"left": 1050 + 1420 * j, "top": 0});
                img_box.eq(i + 6).css({"left": 1087 + 1420 * j, "top": 339});
            }
        }
        next.on("click", function () {
            //连击有问题
            n=1;
            D_box_l=parseInt(D_box.css("left"));
            console.log(D_box_l);
            if(last_img>=1050*m+1050){
                next.css("cursor","pointer");
                D_box.animate({"left": -1050* m});
                m++;
            }
            else if(img_all+D_box_l==1050){
                D_box.stop().animate({"left":D_box_l},400,function(){next.css("cursor","auto");});
            }
            else{
                D_box.animate({"left": D_box_l-(img_all-1050* m)},function(){next.css("cursor","auto");});
            }

        });
        pre.on("click", function () {
            m=1;
            D_box_l=parseInt(D_box.css("left"));
            if(-D_box_l>1050*n){
                pre.css("cursor","pointer");
                D_box.animate({"left": D_box_l+1050*n});
                n++;
            }
            else{
                D_box.stop().animate({"left":0},function(){pre.css("cursor","auto");});
            }

        });


    },
    /*滑动--loan调用*/
    loan: function () {
        var
            sliderV1 = null,
            sliderV2 = null,
            sliderV3 = null,
            $showMoney = $('#show-money');

        //贷款计算器 分期金额
        sliderV1 = $('#slider1').sliderBar({
            itemArray: [600, 1000, 3000, 5000, 10000, 20000],
            valueElement: $('#sliderV1')
        });
        //贷款计算器 首付比例
        sliderV2 = $('#slider2').sliderBar({
            itemArray: [0.1, 0.2, 0.3, 0.4, 0.5],
            valueElement: $('#sliderV2')
        });
        //贷款计算器 分期数
        sliderV3 = $('#slider3').sliderBar({
            itemArray: [9, 12, 15, 18, 24],
            valueElement: $('#sliderV3')
        });

        //计算
        $('#calculation').on('click', function () {
            var
                m = sliderV1.getValue(), //分期金额
                b = sliderV2.getValue(), //首付比例
                s = sliderV3.getValue(); //分期数

            //显示值
            //-------缺少计算公式--------
            $showMoney.text(m * b * s);
        });
        //重置
        $('#clear').on('click', function () {
            $showMoney.text(0);
            sliderV1.clear();
            sliderV2.clear();
            sliderV3.clear();
        });
    },
    /*event事件效果*/
    event_img: function (opt) {
        var et = $("#Event"),
            et_t = et.children(".et"),
            et_c = et.children(".ec"),
            ec_now = 0,//年份
            m = 0,//移动次数累加
            img_max = new Array(),//年份--每年多少个
            et_c_next = et.find(".next"),
            et_c_pre = et.find(".pre"),
            s=0;
        var ss=$.extend(s,opt);
        et_c.each(function (e) {
            img_max[e] = et_c.eq(e).find(".con").size();
            //这里用size和height效果
            et_c.eq(e).children(".p_a").css("width", img_max[e] * 250);
        });
        var $a = et_t.find("a");
        /*年份切换*/
        $a.each(function (e) {
            $(this).on("click", function () {
                $a.removeClass("cur").eq(e).addClass("cur");
                et_c.hide().eq(e).show();
                ec_now = e;
                m = 0;
            });
        });
        /*event浏览*/
        et_c_next.on("click", function () {
            if (has_next()) {
                //console.log(ec_now+"--"+m);
                $(this).css("cursor","pointer");
                m = move(ec_now, m, "right");
            }
            else {
               $(this).css("cursor","auto");
            }
            has_pre(m);

        });
        et_c_pre.on("click", function () {
            if (has_pre(m)) {
                $(this).css("cursor","pointer");
                m = move(ec_now, m);
            }
            else {
                $(this).css("cursor","auto");
            }
            //has_pre(m);

        });
        function move(e, i, type) {
            var cz = et_c.eq(e).children(".p_a"),
                cz_left = parseInt(cz.css("left")),
                cz_w = parseInt(cz.css("width"));
            if (type == "right") {
                //向右
                if (cz_w - 2000 - 1000 * i >= 0) {
                    cz.stop().animate({
                        left: -1000 * (i + 1)
                    })
                }
                else {
                    cz.stop().animate({
                        left: 1000 - cz_w
                    });
                }
                return ++i;
            }
            else {
                //向左
                if (-cz_left >= 1000) {
                    cz.stop().animate({
                        left: cz_left + 1000
                    })
                }
                else {
                    cz.stop().animate({
                        left: 0
                    })
                }
                return --i;
            }
        }

        function has_next() {
            var n = 4 + m * 4;
            if (n < img_max[ec_now]) {
                return true;
            }
            else {
                return false;
            }
        }

        function has_pre(m) {
            if (m > 0) {
                et_c_pre.show();
                return true
            }
            else {
                et_c_pre.hide();
                return false;
            }
        }


    }
}
$(function () {
    $().h_s();
    $().back_top();
    jx.radio();
    jx.select();
})
