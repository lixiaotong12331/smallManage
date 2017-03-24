define(['jquery', 'template', 'util','nprogress','cookie'], function ($, template,util,nprogress) {

    util.setMenu(location.pathname);
    //括号里的接收的是前面的返回值  是形参
    // 控制左侧导航菜单的显示和隐藏
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    //在没有登录的时候，禁止操作别的页面
    var pathname = location.pathname;
    var $flag = $.cookie('PHPSESSID');
    if (!$flag && pathname.indexOf('login') == -1) {
        //没有登录过，并且不在登录页面
        location.href = '/login';
    }

    // 实现登录功能
    $('#loginForm').submit(function () {
        var formDate = $(this).serialize();
        $.ajax({
            url: '/api/login',
            type: 'post',
            dataType: 'json',
            data: formDate,
            success: function (data) {
                if (data.code == 200) {
                    //console.log(data.result);
                    var logInfo = JSON.stringify(data.result);
                    $.cookie('logInfo', logInfo, {path: '/'});
                    location.href = 'index/index';
                }
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });
        return false;//阻止默认行为  页面不会刷新
    });

    // var pathname = location.pathname;
    // if (pathname.indexOf('login') == -1 || pathname.length != 1) {
    //     // 渲染登录信息
    //     var obj = JSON.parse($.cookie('logInfo'));
    //     var html = template('logInfo', obj);
    //     $('.aside .profile').html(html);
    // }
    // 渲染侧边栏中的个人信息
    var obj = JSON.parse($.cookie('logInfo'));
    console.log(obj);
    var tpl = '<div class="profile">' +
        '<div class="avatar img-circle">' +
        '<img src="{{tc_avatar}}">' +
        '</div>' +
        '<h4>{{tc_name}}</h4>' +
        '</div>';
    var render = template.compile(tpl);  //返回一个渲染函数
    var html = render(obj); //给这个渲染函数传入实参
    $('.aside .profile').html(html);

    // 退出功能
    $('#logoutId').click(function(){
        $.ajax({
            url:'/api/logout',
            dataType:'json',
            type:'post',
            success:function (data) {
                location.href="/login";
                alert(data.msg); //会先打印信息然后退出
            },
            error:function () {
                alert('退出失败，请重新退出');
            }
        });
    });
    // 进度条功能
    nprogress.start();
    nprogress.done();

});