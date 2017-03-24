/**
 * Created by lixiaotong on 2017/3/22.
 */
define(['jquery'],function($){
    return {
        setMenu:function (pathname) {
            //判断当前的路径和你点的是不是一个  找到当前的这个文件路径的a
            $('.navs a[href="'+pathname+'"]').addClass('active');
        },
        //封装一个取得url？后面的参数的值的
         qs:function(pname){
             var pathname = location.search;
             pathname = pathname.slice(1);
             var obj = {};
             if(pathname){
                 //将字符串分割成为数组
                 var arr = pathname.split('&');
                 for(var i = 0;i<arr.length;i++){
                     var kv = arr[i].split('=');
                     obj[kv[0]] = kv[1];
                 }
             }
             return obj[pname];
         }
    }
});