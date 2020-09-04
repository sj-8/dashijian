$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从 layui 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    console.log(layer, "-----");


    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码需要6-12位哦，且中间不能有空格哦亲'
        ],
        // value这个形参会自动拿到表单中输入的值
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入的密码不同'
            }

        }
    });

    // 注册的接口调用
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
            }
        });

    })
    // 登录的接口的调用
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })



})