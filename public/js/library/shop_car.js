// import { json } from 'express';
import './jquery.js';

$.ajax({
    type: "get",
    url: "http://10.31.162.52:8088/product/getItem",
    data: {
        /* id:id */
    },
    dataType: "json",
    success: function(response) {
        // console.log(response);
        
        if(response.length){
//<td><img src="../${JSON.parse(response[i].picture)[0].src}" alt="" width="100px" height="100px"></td>
        //    console.log(response.length);
        let temp='';
            for(let i=0;i<response.length;i++){
             temp +=`
             <tr class = 'good_item'>
                            <td class='first_td'><input type="checkbox" class = 'check_box'><span class ='order_id'>${response[i].order_id}</span></td>
                            <td><img src="${JSON.parse(response[i].picture)[0].src}" alt="" width="100px" height="100px"></td>
                            <td>${response[i].title}</td>
                            <td><span  class = 'add'>+</span><span class="num">${response[i].num}</span><span class="del">-</span></td>
                            <td class="price">${response[i].price}</td>
                            <td class="total_price">${response[i].total_price}</td>
                            <td><a href="#"><span class="del_item">删除</span></a></td>
                        </tr>
             `; 
            //  console.log(JSON.parse(response[i].picture)[0].src);
            }

           $('.shop_contain').append(`${temp}`);

            // location = "login-1.html";
        }
    }
});


$(function() {
    /*删除事件委托*/
    console.log(1);
    $('.good_item').on('click','.del_item',function(){
        // console.log($(this).parent().parent().parent().remove());
        // console.log($(this).parent().parent().siblings('.first_td').children('.order_id').text());
        $.ajax({
            type: "get",
            url: "http://10.31.162.52:8088/product/removeItems",
            data: {
                // num:num,
                id:$(this).parent().parent().siblings('.first_td').children('.order_id').text(),
                // total_price:price
            },
            dataType: "json",
            success: function(response) {
                console.log(response);
                if(response.length){
                    // console.log(1);
                }
            }
        });
        
        // $(this).parent().remove();

    });
    /*加事件委托*/
    $('.good_item').on('click','.add',function(){
        let num=0;
        num = parseInt($(this).siblings('.num').text());
        num++;
        $(this).siblings('.num').text(`${num}`);
        let price = parseInt($(this).parent().siblings('.price').text())*num;
        
        parseInt($(this).parent().siblings('.total_price').text(`${price}`));
        
        $(this).siblings('.num').text(`${num}`);
        console.log($(this).parent().siblings().children('.order_id').text());
        // 增加数量操作数据库
        $.ajax({
            type: "get",
            url: "http://10.31.162.52:8088/product/setItems",
            data: {
                num:num,
                id:$(this).parent().siblings().children('.order_id').text(),
                total_price:price
            },
            dataType: "json",
            success: function(response) {
                console.log(response);
                /* if(response.length){
                } */
            }
        });
    });
    /*减事件，事件委托 */
    $('.good_item').on('click','.del',function(){
        let num =0;
        num = parseInt($(this).siblings('.num').text());
        num--;
        if(num<=0){
            num=1;
        };
        let price = parseInt($(this).parent().siblings('.price').text())*num;
        parseInt($(this).parent().siblings('.total_price').text(`${price}`));
        $(this).siblings('.num').text(`${num}`);
        /*减少数量，操作数据库 */
        $.ajax({
            type: "get",
            url: "http://10.31.162.52:8088/product/setItems",
            data: {
                num:num,
                id:$(this).parent().siblings().children('.order_id').text(),
                total_price:price
            },
            dataType: "json",
            success: function(response) {
                console.log(response);
                if(response.length){
                }
            }
        });
    });

    /*复选框加价钱*/
    let total_price = 0;
    let price =0;
    $('.good_item').on('change','.check_box',function(){
        
        if(this.checked){
            // console.log(parseInt($(this).parent().siblings('.total_price').text()));
            price = parseInt($(this).parent().siblings('.total_price').text());
            total_price+=price;
            // console.log(1);
           
        }
        else{
            price = parseInt($(this).parent().siblings('.total_price').text());
            total_price-=price;
        }
        $('.cal_price').text(total_price);
    });
    /* $(".check_box").change(function() {
        if(this.checked) {
            console.log($(this).parent().siblings('.total_price'));
            // console.log(1);
        }
    }); */
});
