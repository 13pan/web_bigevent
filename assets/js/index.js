$(function (){
    getUserInfo ()
    // 退出
    const layer = layui.layer;
    $('#logout').click(function () {
        layui.layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    })
})
const layer = layui.layer
// 获取用户信息
function getUserInfo(){
    $.ajax({
        type: "GET",
        url:"/my/userinfo",
        // headers:{
        //     Authorization: localStorage.getItem("token")
        // },
        success: (res) => {
            console.log(res);
            if(res.status !== 0) return layer.msg("获取用户信息失败")
            layer.msg('获取用户信息成功')
            randerAvatar(res.data)
            console.log(res);
        },
        // complete: (res) => {
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
const randerAvatar = user => {
    const name = user.nickname || user.username;
    $('#welcome').html(`欢迎${name}`)
    if (user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        const firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
    }
}