import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
/*表单验证 */
// $(function() {
/*表单验证*/
// {
/*错误class  form-control is-invalid
    正确class  form-control is-valid*/
let flagName = false;
let flagPas = false;
let flagPass = false;
/*验证用户名*/
let name, passWord, passWords;
$("#register-username").change(function() {
        name = $("#register-username").val();
        /* console.log(name); */
        if (name.length < 2 || name.length > 10) {
            $("#register-username").removeClass("form-control is-valid");
            $("#register-username").addClass("form-control is-invalid");
            flagName = false;
        } else {
            $("#register-username").removeClass("form-control is-invalid");
            $("#register-username").addClass("form-control is-valid");
            flagName = true;
        };
    })
    /*验证密码*/
$("#register-password").change(function() {
    passWord = $("#register-password ").val();
    if (passWord.length < 6 || passWord.length > 18) {
        $("#register-password ").removeClass("form-control is-valid ");
        $("#register-password ").addClass("form-control is-invalid ");
        flagPas = false;
    } else {
        $("#register-password ").removeClass("form-control is-invalid ");
        $("#register-password ").addClass("form-control is-valid ");
        flagPas = true;
    };
});
/*验证确认密码*/
$("#register-passwords").change(function() {
    passWords = $("#register-passwords").val();
    if ((passWord != passWords) || (passWords.length < 6 || passWords.length > 18)) {
        $("#register-passwords").removeClass("form-control is-valid");
        $("#register-passwords").addClass("form-control is-invalid");
        flagPass = false;
    } else {
        $("#register-passwords").removeClass("form-control is-invalid");
        $("#register-passwords").addClass("form-control is-valid");
        flagPass = true;
    };
});

$(".submit ").click(function() {
    console.log(1);
    if (flagName && flagPas && flagPass) {
        localStorage.setItem("name", name);
        localStorage.setItem("passWord", passWord);
        // location = "login-1.html";
    } else {
        if (!flagName) {
            $("#register-username").addClass("form-control is-invalid");
        };
        if (!flagPas) {
            $("#register-password").addClass("form-control is-invalid");
        };
        if (!flagPass) {
            $("#register-passwords").addClass("form-control is-invalid");
        };
    };
});
// }

// {
/* 提交验证 */
$('.submit').on('click', function() {
    let password = $.md5($('[name=registerPassword]').val());
    /* console.log(1); */
    $.ajax({
        type: "post",
        url: "http://localhost:8088/users/reg",
        data: {
            username: $('[name=registerUsername]').val(),
            password: password,
            email: $('[name=registerEmail]').val(),
            phone: $('[name=registerPhone]').val(),
            address: $('[name=registerAddress]').val(),
        },
        dataType: "json",
        success: function(response) {
            console.log(response);
            if(response.error ==1){
                alert(response.msg);
                /*清空文本框内容*/
                $('[name=registerUsername]').val('');
                $('[name=registerPassword]').val('');
                $('[name=registerPasswords]').val('');
                $('[name=registerEmail]').val('');
                $('[name=registerPhone]').val('');
                $('[name=registerAddress]').val('');
            }
            if(response.error==0){
                alert('登录成功，即将跳转到登录页');
                // location = "login-1.html";
            }
        }
    });

});
// }
// });