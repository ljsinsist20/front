$(function() {
    //动态元素要进行事件委托
    $(".reg-box").on('click', '#link_login', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    $("#link_reg").on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，并且不可以出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一样'
            }
        }
    })

    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.msg)
            }
            layer.msg(res.msg)
                // $('#link_login').click(function() {
                //     $('.login-box').show()
                //     $('.reg-box').hide()
                // }) 未知bug 不执行 。。。。。。
        })
    })


    $('#form_login').on('submit', function(e) {
        e.preventDefault()
            // $.ajax({
            //     url: '/api/login',
            //     method: 'POST',
            //     data: $(this).serialize(),
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg(res.message)
            //         }
            //         layer.msg('登录成功')
            //         localStorage.setItem('token', res.token)
            //         location.href = '/index.html'
            //     }
            // })
        layer.msg('登录成功')
            // localStorage.setItem('token', res.token)
        location.href = '/index.html'
    })
})