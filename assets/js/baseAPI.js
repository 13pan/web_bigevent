$.ajaxPrefilter((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 权限接口拦截
    if(options.url.includes('/my')){
        options.headers = {
            Authorization: localStorage.getItem("token")
        }
    }
    // 认证
    options.complete = (res) => {
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})