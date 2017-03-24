/**
 * Created by lixiaotong on 2017/3/24.
 */
define(['jquery','nprogress'],function ($,nprogress) {
    /*
    * 如果发生过多次的ajax请求  则ajaxStop以最后一个结束的为准
    * ajaxStart和ajaxStop是控制的页面上的所有的ajax的请求
    * */
    //控制全局遮罩
    $(document).ajaxStart(function(){
        $('.overlayer').show();
    });
    $(document).ajaxStop(function(){
        $('.overlayer').hide();
    });
    // 进度条功能
    nprogress.start();
    nprogress.done();
});