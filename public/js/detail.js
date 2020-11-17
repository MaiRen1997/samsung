import './library/jquery.js';
$(function() {
    /*导航栏滚动*/
    $(document).scroll(function() {
        var scroH = $(document).scrollTop(); //滚动高度
        var viewH = $(window).height(); //可见高度
        var contentH = $(document).height(); //内容高度
        /* console.log(scroH); */
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
    /*手机图片显示滚动*/
    {
        let top = 0;
        $('#up_click').on('click', function() {
            console.log($('.contain_ul').position().top);

            $('.contain_ul').css({ 'top': `${top}px` });

            if (Math.abs(top) > 0) {
                $('#down_click').css({ 'visibility': 'visible' });
            }
            if (Math.abs(top) > 110) {
                $('#up_click').css({ 'visibility': 'hidden' });
            }
            top -= 10;
        });
        $('#down_click').on('click', function() {

            $('.contain_ul').css({ 'top': `${top}px` });
            if (Math.abs(top) <= 110) {
                $('#up_click').css({ 'visibility': 'visible' });
            }
            if (Math.abs(top) <= 0) {
                $('#down_click').css({ 'visibility': 'hidden' });
            }
            top += 10;
        });
    }
    // 边框实现,图片替换
    {
        $('.contain_ul>li').on('click', function() {
            $(this).css({ 'border': '1px solid black' }).siblings().css({ 'border': 'none', 'border': '1px solid rgba(255,255,255,0)' });
            /*大图路径替换*/
            /* $('.big_show>img').attr({ 'background': '../../html' + `${$(this).children().attr('src').slice(2, )}` }); */
            $('.big_show').css({ 'background': 'url(../../html' + `${$(this).children().attr('src').slice(2, )}) no-repeat center center/100% 100%` });
            console.log('../html' + `${$(this).children().attr('src').slice(2, )}`);
        });
    }
    // 放大镜效果
    {
        /* $('.big_show').on('mouseover', function() {
                $('.small_move').css({ 'display': 'block' }) */
        let mouseX = 0; //鼠标移动的位置X
        let mouseY = 0; //鼠标移动的位置Y
        let maxLeft = 0; //最右边
        let maxTop = 0; //最下边
        let markLeft = 0; //放大镜移动的左部距离
        let markTop = 0; //放大镜移动的顶部距离
        let perX = 0; //移动的X百分比
        let perY = 0; //移动的Y百分比
        let bigLeft = 0; //大图要移动left的距离
        let bigTop = 0; //大图要移动top的距离
        function updataMark($mark) {
            //让小框只能在小图中移动
            if (markLeft < 0) {
                markLeft = 0;
            } else if (markLeft > markLeft) {
                markLeft = markLeft;
            }
            if (markTop < 0) {
                markTop = 0;
            } else if (markTop > maxTop) {
                markTop = maxTop;
            }
            perX = markLeft / $(".small_move").outerWidth();
            perY = markTop / $(".small_move").outerHeight();
            bigLeft = -perX * $(".big_move").outerWidth();
            bigTop = -perY * $(".big_move").outerHeight();
            //小框的位置和属性
            $mark.css({ "left": markLeft, "top": markTop, "display": "block" });
            //改变完放大镜位置后改变大图的位置
            function updataBig() {
                $(".bigImg").css({ "left": bigLeft, "top": bigTop, "display": "block" });
            }
            /* }) */
        }
    }
    {
        $('.add_car').on('click',function(){
            // console.log($('.contain_ul>li:eq(1)>img')[0].src);
            $.ajax({
                type: "get",
                url: "http://10.31.162.52:8088/product/add_Items",
                data: {
                   /*  id:$(this).parent().siblings().children('.order_id').text() */
                    id:22,
                    title:$('.right_display>h2').text(),
                    num:1,
                    price:$('.right_display>h3>span').text(),
                    total_price:$('.right_display>h3>span').text(),
                    picture:`[{"src": "${$('.contain_ul>li:eq(1)>img')[0].src}","alt":"small3"}]`
                },
                dataType: "json", 
                success: function(response) {
                    console.log(response);
                    if(response.length){
                        console.log(1);
                    }
                }
            });
        });
    }

});