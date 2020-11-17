import './library/jquery.js';
import './library/jquery.lazyload.js';


$(function() {
    //第二个导航的js
    $(document).scroll(function() {
        var scroH = $(document).scrollTop(); //滚动高度
        var viewH = $(window).height(); //可见高度
        var contentH = $(document).height(); //内容高度
        // console.log(scroH);
        if (scroH <= 45) {
            $('#nav').css({ 'position': 'relative' });
        }
        if (scroH > 45) { //距离顶部大于100px时
            // console.log(2);
            $('#nav').css({ 'position': 'fixed', 'top': '0' });
        }
        if (scroH <= 490) {
            $('.left_nav').css({ 'position': 'absolute', 'top': '530px' });
            $('.right_nav').css({ 'position': 'absolute', 'top': '530px' });
        }
        if (scroH > 490) { //距离底部高度小于100px
            $('.left_nav').css({ 'position': 'fixed', 'top': '48px' });
            $('.right_nav').css({ 'position': 'fixed', 'top': '45px' });
        }

    });
    /*  {
         $(document).on('mousewheel DOMMouseScroll', onMouseScroll);

         function onMouseScroll(e) {
             e.preventDefault();
             var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
             var delta = Math.max(-1, Math.min(1, wheel));
             if (delta < 0) { //向下滚动
                 console.log('向下滚动');
             } else { //向上滚动
                 console.log('向上滚动');
             }
             //  console.log($(document).scrollTop());
             console.log($('#nav').offset().top);
             // console.log($('#nav').position());
             // console.log($('#nav').scrollTop());
             // console.log($('#nav').innerHeight());
         }
     } */
    /*下拉框的显示与隐藏 */
    {
        $('#nav-center>li').hover(function() {
            $('.nav_info').stop(true,false);
            $('.nav_info').slideDown();
        }, function() {
            $('.nav_info').slideUp();
        });
    }
    /*轮播图的js*/
    {
        //每个固定的时间移动图片
        let timer;
        let index = 0;
        let flag = 1;
        /*追加第一张图片*/
        // clearInterval(timer);
        $('.content').children(':nth-of-type(1)').clone().appendTo($('.content'));
        /*更改圆点选择 */
        function changePoint(i) {
            $(".index>li").eq(i).css("background-color", "black")
                .siblings('li').css("background-color", "rgba(100,100,100,0.3)");
        }
        /*图片轮询*/
        function picLoop() {
            index++;
            if (index == 5) { //运行到第六张图片
                $(".content").animate({
                    "left": 0
                });
                index = 0;
            }
            $(".content").animate({
                "left": -1700 * index
            }, 500);
            changePoint(index);
        }
        timer = setInterval(picLoop, 2000);

        /*设置点击圆点时，圆点变实心*/
        $('.index>li').on('click', function() {
            index = $(this).attr('id');
            speed = 0;
            $(".content").animate({
                "left": -1700 * index
            }, 1000);
            changePoint(index-1);
            clearInterval(timer);
        });
        /*设置点击的背景图*/
        $('.last_li').on("click", function() {
            clearInterval(timer);
            if (!flag) {
                $('.last_li').attr({ 'style': 'background:url(../html/img/kv-play.png);' });
                clearInterval(timer);
            } else {
                $('.last_li').attr({ 'style': 'background:url(../html/img/kv-pause.png);' });
                timer = setInterval(
                    picLoop, 2000);

            }
            flag = !(flag);
        });

    }
    /*左边的导航菜单*/
    {
        /* $('.left_nav').children('li:nth-of-type(1)').css('background', 'url(https://static.samsungeshop.com.cn/prod/resources/2020/7/23/zhinengshouji_xiaoping_30_46.png)');
            $('.left_nav').children('li:nth-of-type(2)').css('background', 'url(https://static.samsungeshop.com.cn/prod/resources/2020/7/23/zhinengshouji_xiaoping_30_46.png)');
            $('.left_nav').children('li:nth-of-type(3)').css('background', 'url(https://static.samsungeshop.com.cn/prod/resources/2020/7/23/zhinengshouji_xiaoping_30_46.png)');
            $('.left_nav').children('li:nth-of-type(4)').css('background', 'url(https://static.samsungeshop.com.cn/prod/resources/2020/7/23/zhinengshouji_xiaoping_30_46.png)');
            $('.left_nav').children('li:nth-of-type(5)').css('background', 'url(https://static.samsungeshop.com.cn/prod/resources/2020/7/23/zhinengshouji_xiaoping_30_46.png)');
            $('.left_nav').children('li:nth-of-type(6)').css('background', 'url(https://static.samsungeshop.com.cn/prod/resources/2020/7/23/zhinengshouji_xiaoping_30_46.png)'); */
        /*右边的导航菜单*/
    }
    /*图片懒加载*/
    $('.lazy').lazyload({
        effect: 'fadeIn',
        placeholder: '../html/img/timg.gif'
    });
    /*设置更改登录名字*/
    /* if(localStorage.getItem(`${document.cookie.split(';')[1].split('=')[1]}`=='true')){
        $("#is_loged").text(document.cookie.split(';')[0].split('=')[1]);
    } */
    $("#is_loged").text(document.cookie.split(';')[0].split('=')[1]);

    /* let splie_result = document.cookie.split(';').map(function(elm){
        return elm.split('=');
    })
    // console.log(splie_result);
    let result_arr = splie_result[0].concat(splie_result[1]);
    result_arr.map(function(el){
        el.toString().trim();
    }); */
    /* console.log(result_arr);
    console.log(result_arr.indexOf('username'));
    console.log(result_arr[result_arr.indexOf('username')]); */
    // console.log(document.cookie.split(';')[1].split('=')[1] =='true');
});