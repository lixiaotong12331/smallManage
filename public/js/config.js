/**
 * Created by lixiaotong on 2017/3/22.
 */

//配置js文件路径
require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        bootstrap : 'bootstrap/js/bootstrap',
        nprogress: 'nprogress/nprogress',
        echarts: 'echarts/echarts.min',
        cookie: 'jquery-cookie/jquery.cookie',
        ckediter: 'ckeditor/ckeditor',
        datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker',
        language: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        region: 'jquery-region/jquery.region',
        uploadify: 'uploadify/jquery.uploadify',
        form: 'jquery-form/jquery.form',
        validate: 'validate/jquery-validate',
        template: 'artTemplate/template',
        util: '../js/util',
        overlay:'../js/overlay'
    },
    shim: {
        bootstrap : {
            // 把bootstrap转成标准模块（依赖于标准的jQuery模块）
            deps : ['jquery']
        },
        language: {
            deps: ['jquery', 'datepicker']
        },
        uploadify: {
            deps: ['jquery']
        },
        ckeditor: {
            exports: 'CKEDITOR',//  为这个非标准的模块定义一个返回值  
            deps: ['jquery']
        },
        overlay:{
            deps: ['jquery']
        },
        validate : {
            deps : ['jquery']
        }

    }
});


// <script src="/public/assets/jquery/jquery.min.js"></script>
//     <script src="/public/assets/jquery-cookie/jquery.cookie.js"></script>
//     <script src="/public/assets/bootstrap/js/bootstrap.min.js"></script>
//     <script src="/public/assets/nprogress/nprogress.js"></script>
//     <script src="/public/assets/echarts/echarts.min.js"></script>
//     <script src="/public/js/common.js"></script>