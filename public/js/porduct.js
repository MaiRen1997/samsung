import './library/jquery.js';
import cookie from './library/cookie.js';

(function() {
    let id = location.search.split('=')[1]; // 获得商品id
    let type = '';
    $(".smart_ul>li:not([class='all'])").hover(function(){
            type=$(this).attr('id');
        $.ajax({
            type: "get",
            url: 'http://localhost:8088/product/getProducts',
            /* data: { id: id }, */
            data:{type:type},
            dataType: "json",
            success: function(res) {
                /*设置第一个，第二个图片*/
                $('.smart_first>img').attr({'src':`${JSON.parse(res[0].picture)[0].src}`});
                $('#smart-1 img').attr({'src':`${JSON.parse(res[0].picture)[1].src}`});
                
                /*控制展示模块的显示与隐藏*/
                if(res.length<=6){
                    for(let j=0;j<=res.length;j++){
                        $(`#smart-${j}`).css({'visibility':'visible'});
                    }
                    for(let i=res.length+1;i<=6;i++){
                        $(`#smart-${i}`).css({'visibility':'hidden'});
                    }
                }
                $('#smart-1 h4').text(res[0].title);
                $('#smart-1 .smart_price').text('￥'+res[0].price);
                // console.log(res.length);
                /*更改展示模块的图片 */
                for(let i=2;i<=res.length;i++){
                    // console.log(i);
                    // console.log(res[i-1].picture); 
                    // console.log(JSON.parse(res[i-1].picture));
                    //改变图片
                        $('#smart-'+i+' img').attr({'src':`${JSON.parse(res[i-1].picture)[0].src}`}); 
                    //改变标题
                    /* console.log(res[i-1].title); */
                    // console.log( $('#smart-'+i+' h4').text());
                    $('#smart-'+i+' h4').text(res[i-1].title);
                    //改变价格
                    $('#smart-'+i+' .smart_price').text('￥'+res[i-1].price);
                    }
                }
                
                /* console.log(JSON.parse(res[0].picture)[0].src);
                console.log(JSON.parse(res[0].picture)[1].src);
                console.log(JSON.parse(res[1].picture)[0].src);
                console.log(JSON.parse(res[2].picture)[0].src);
                console.log(JSON.parse(res[3].picture)[0].src);
                console.log(JSON.parse(res[4].picture)[0].src);
                console.log(JSON.parse(res[5].picture)[0].src); */
                // console.log(JSON.parse(res[0].picture)[0].src);
                // console.log(res[0].picture[0].src);
                /* res = res[0]; */
                // let picture = JSON.parse(res.picture);
    
                // let template = `
                // <h1>${res.title}</h1>
                // <div class="p-picture">
                //     <img src="../${picture[1].src}">
                // </div>
                // <div class="p-price">
                //     价格:<span>￥</span>${res.price}
                // </div>
                // <div class="p-num">库存数量:${res.num}</div>
                // <input type="number" value="1" min="1" max="${res.num}" id="num">
                // <input type="button" value="加入购物车" id="additem">
                // <div>
                //     ${res.details}
                // </div>
                // `;
       /*  $('.smart_first>img').attr({'src':`${JSON.parse(res[0].picture)[0].src}`});
        $('#smart-1 img').attr({'src':`${JSON.parse(res[0].picture)[1].src}`});
        $('#smart-2 img').attr({'src':`${JSON.parse(res[1].picture)[0].src}`});
        $('#smart-3 img').attr({'src':`${JSON.parse(res[2].picture)[0].src}`});
        $('#smart-4 img').attr({'src':`${JSON.parse(res[3].picture)[0].src}`});
        $('#smart-5 img').attr({'src':`${JSON.parse(res[4].picture)[0].src}`});
        $('#smart-6 img').attr({'src':`${JSON.parse(res[5].picture)[0].src}`}); */
                // 渲染页面
                /* $('.smart_bg').append(template).find('#additem').on('click', function() {
                    addItem(res.id, $('#num').val());
                }); */
        });
    
    },function(){
       
    });
   
    function addItem(id, num) {
        let shop = cookie.get('shop'); // 从cookie中获得shop数据

        let product = {
            id: id,
            num: num
        }

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop); // 将取出的cookie数据转成对象

            // 判断cookie中的购物车数据 是否已存在本条数据的id
            // 如果本条数据的id已存在 修改数量
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(el => {
                    el.id === id ? el.num = num : null;
                });
            } else {
                shop.push(product);
            }

        } else { // cookie中不存在shop数据
            shop = []; // 设置一个数组
            shop.push(product); // 将当前商品存入数组
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }

})();