$.ajax({
    type: "get",
    url: "http://localhost:8088/product/getItem",
    data: {
        id:id
    },
    dataType: "json",
    success: function(response) {
        console.log(response);
        if(response.error ==1){
            alert(response.msg);
        }
        if(response.error==0){
           /*  alert('登录成功，即将跳转到登录页'); */
           console.log(response);

            let temp ='';
            temp =`
            <td><input type="checkbox"></td>
            <td><img src="../img/smart_all_2.jpg" alt=""></td>
            <td>${response.title}</td>
            <td>${response.num}</td>
            <td>${response.price}</td>
            <td>${response.total_price}</td>
            <td><span>删除</span></td>
            `;

           $('.shop_contain').append('temp');

            // location = "login-1.html";
        }
    }
});