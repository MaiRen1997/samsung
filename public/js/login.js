import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
$(function() {
    /*判断上次是否勾选记住密码和自动登录*/
    /* var check1s = localStorage.getItem("check1");
    var check2s = localStorage.getItem("check2");
    var oldName = localStorage.getItem("userName");
    var oldPass = localStorage.getItem("passWord");
    if (check1s == "true") {
        $("#login-username").val(oldName);
        $("#login-password").val(oldPass);
        $("#check1").prop('checked', true);
    } else {
        $("#login-username").val('');
        $("#login-password").val('');
        $("#check1").prop('checked', false);
    }
    if (check2s == "true") {
        $("#check2").prop('checked', true);
        $("#loginFrom").submit();
        //location="https://www.baidu.com?userName="+oldName+"&passWord="+oldPass;//添加退出当前账号功能
    } else {
        $("#check2").prop('checked', false);
    } */




    /*拿到刚刚注册的账号*/
    /*if(localStorage.getItem("name")!=null){
        $("#login-username").val(localStorage.getItem("name"));
    }*/
    /*登录*/

    /* $("#login").click(function() {
        var userName = $("#login-username").val();
        var passWord = $("#login-password").val();
        // 获取当前输入的账号密码
        localStorage.setItem("userName", userName)
        localStorage.setItem("passWord", passWord)
            // 获取记住密码  自动登录的 checkbox的值
        var check1 = $("#check1").prop('checked');
        var check2 = $('#check2').prop('checked');
        localStorage.setItem("check1", check1);
        localStorage.setItem("check2", check2);
    }) */


    $('.login').on('click', function() {
        // let password = $.md5($('[name=passWord]').val());
        let password =$('[name=userName]').val();
        // alert(1);
        // console.log(1);
        // console.log(password);
        console.log($('[name=userName]').val());
        console.log(password);
        $.ajax({
            type: "post",
            url: "http://10.31.162.52:8088/users/login",
            data: {
                username: $('[name=userName]').val(),
                password: password,
            },
            dataType: "json",
            success: function(response) {
                // console.log(response);
                if(response.error ==1){
                    alert(response.msg);
                    /*清空文本框内容*/
                    $('[name=userName]').val('');
                    $('[name=passWord]').val('');
                }
                if(response.error==0){
                    alert('登录成功，即将跳转到首页');
                    
                    location = "../index.html";
                }
            }
        });
    
    });
    /*$("#check2").click(function(){
        var flag=$('#check2').prop('checked');
        if(flag){
            var userName=$("#login-username").val();
            var passWord=$("#login-password").val();
            $.ajax({
                type:"post",
                url:"http://localhost:8080/powers/pow/regUsers",
                data:{"userName":userName,"passWord":passWord},
                async:true,
                success:function(res){
                    alert(res);
                }
            });
        }
    })*/
});