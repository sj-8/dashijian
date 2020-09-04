$(function () {
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            // 请求头用预ajax预配置的文件去配置
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res);
                renderAvatar(res.data)
            },

            // 定义结束的函数若token身份认证不通过清除token,把他优化到prefilter函数里 全局挂载
            // complete: function (res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
            // }
        });
    }
    //定义 渲染头像的函数 晚上自己写一遍
    // function renderAvatar(user) {
    //     // 1. 获取用户的名称
    //     var name = user.nickname || user.username
    //     // 2. 设置欢迎的文本
    //     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //     // 3. 按需渲染用户的头像
    //     if (user.user_pic !== null) {
    //         // 3.1 渲染图片头像
    //         $('.layui-nav-img')
    //             .attr('src', user.user_pic)
    //             .show()
    //         $('.text-avatar').hide()
    //     } else {
    //         // 3.2 渲染文本头像
    //         $('.layui-nav-img').hide()
    //         var first = name[0].toUpperCase()
    //         $('.text-avatar')
    //             .html(first)
    //             .show()
    //     }
    // }
    function renderAvatar(userformation) {
        let name = userformation.nickname || userformation.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (userformation.user_pic !== null) {
            $('.layui-nav-img')
                .attr('src', user.user_pic)
                .show()
            $('.text-avatar').hide()
        } else {
            let first = name[0].toUpperCase()
            $('.layui-nav-img').hide()

            $('.text-avatar').html(first).show()
        }
    }
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 点击退出以后跳转到登录界面并且清空本地缓存的数据,在这之前先用layui调出确认提醒框效果
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index)
        })
    })
})