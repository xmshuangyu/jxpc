/**
 * 首页滚屏
 * 
 */
$(function(){
	var numBox = $('#num_box'),                     //包裹层
		numItems = numBox.find('.num'),         //每一屏对象
		itemsCount = numItems.length,               //屏总数
		winH = 0,
		index = 0,                                  //当前显示对象索引 
		isAnimate = false;
	
	//初始数组
	var initFun = [
		{
			//1屏
			isInit : false,                //是否已加载
			isPre : false,                 //是否在预加载
			init : function(){
				var
			        imgItem = numItems.eq(0).find('#banner ul li'),
			        navItem = numItems.eq(0).find("#banner ol li"),
			        index = 0,
			        len = imgItem.length,
			        interval = null;
			    imgItem.eq(0).fadeIn();
			    navItem.eq(0).addClass('active');
			    interval = setInterval(function(){
			        toggle(index, ++index);
			    },4000);
			    //切换
			    function toggle(num,num2){
			        imgItem.eq(num).fadeOut();
			        if(num2 < 0){
			            num2  =  len - 1;
			        }else if(num2 >= len){
			            num2  =  0;
			        }
			        index = num2;
			        navItem.removeClass('active').eq(num2).addClass('active');
			        imgItem.eq(num2).fadeIn(1000);
			    }
			    //点击切换
			    navItem.on('click',function(){
			    	clearInterval(interval);
			    	var curIndex = navItem.index($(this));
			    	toggle(index,curIndex);
			    	index = curIndex;
			    	interval = setInterval(function(){
			        	toggle(index, ++index);
			    	},4000);
			    });
			}
		},
		{
			//2屏
			isInit : true,
			isPre : false,
			init : function(){initItem(1,this);}
		},
		{
			//3屏
			isInit : false,
			isPre : false,
			init : function(){
				//设置元素位置
				setPosition();
				function setPosition(){
					var WIDTH = 250,
						HEIGHT =  215;
					var starX = 1920/2-WIDTH/2,
						centerItems = numItems.eq(2).find('.center').children('div'),
						rightItmes = numItems.eq(2).find('.right').children('div'),
						leftItmes = numItems.eq(2).find('.left').children('div');
					centerItems.each(function(i){
						centerItems.eq(i).css({
							left : starX+'px',
							top : HEIGHT*i+5*i+'px'
						});
					});
					var c = 0,          //列值
						r = 0,          //行值
						count = 0;      //记数器  
					rightItmes.each(function(i){
						count++;
						if(c%2 === 0){
							rightItmes.eq(i).css({
								left : starX+190*(c+1)+'px',
								top : HEIGHT*r+5*r-HEIGHT/2+'px'
							});
							r++;
							if(count >= 4){
								c++;
								r = 0;
								count = 0;
							}
						}else{
							rightItmes.eq(i).css({
								left : starX+190*(c+1)+'px',
								top : HEIGHT*r+5*r+'px'
							});
							r++;
							if(count >= 3){
								c++;
								r = 0;
								count = 0;
							}
						}
					});
					
					c = 0;          //列值
					r = 0;          //行值
					count = 0;      //记数器  
					leftItmes.each(function(i){
						count++;
						if(c%2 === 0){
							leftItmes.eq(i).css({
								left : starX-190*(c+1)+'px',
								top : HEIGHT*r+5*r-HEIGHT/2+'px'
							});
							r++;
							if(count >= 4){
								c++;
								r = 0;
								count = 0;
							}
						}else{
							leftItmes.eq(i).css({
								left : starX-190*(c+1)+'px',
								top : HEIGHT*r+5*r+'px'
							});
							r++;
							if(count >= 3){
								c++;
								r = 0;
								count = 0;
							}
						}
					});
				}
			}
		},
		{
			//4屏
			isInit : true,
			isPre : false,
			init : function(){initItem(3,this);}
		},
		{
			//5屏
			isInit : true,
			isPre : false,
			init : function(){
				initItem(4,this,function(){
					$('#goTop').on('click',function(){
						index = 0;
						showItem();
					});
				});
			}
		}
	];
	
	setSize();
	function setSize(){
		for(var i = 0;i < initFun.length;i++){
			if(!initFun[i].isInit){
				initFun[i].init();	
			}
		}		
		numBox.fullpage({
			scrollOverflow : true,
			onLeave: function(curIndex, nextIndex, direction){
				index = nextIndex-1;
		   		showItem(index);
			}
		});
		
		$('.go-next').on('click',function(){
			numBox.fullpage.moveSectionDown();
		});
	}
	//显示对象
	showItem(index);
	function showItem(curIndex){
		if(curIndex >itemsCount-1) {
			index = itemsCount-1;
			return;
		};
		if(curIndex < 0){
			index = 0;
			return;
		}
		
		if(!numItems.eq(index).hasClass('cur')){
			numItems.eq(index).addClass('cur');	
		}
	}
	
});

