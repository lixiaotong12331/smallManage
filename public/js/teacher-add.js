/**
 * Created by lixiaotong on 2017/3/24.
 */
define(['jquery', 'template', 'util', 'datepicker', 'language', 'validate', 'form'], function ($, template, util) {

    /*
     * 编辑和添加共用一个页面,所以如何区分当前的页面是添加操作还是编辑操作呢？
     * 答：根据url地址的不同  如果地址中有tc_id的话，那么就是编辑，否则是添加
     * */
    var tc_id = util.qs('tc_id');
    if (tc_id){
        $.ajax({
            url: '/api/teacher/edit',
            type: 'get',
            dataType: 'json',
            data: {
                tc_id: tc_id
            },
            success: function (data) {
                console.log(data);
                //回填数据
                data.result.tInfo = '编辑讲师';
                var html = template('teacherEdit', data.result);
                $('#teacherInfo').html(html);
                checkForm('/api/teacher/update');
            }
        });
    }else{
        //添加讲师
        var html = template('teacherEdit',{
            tInfo:'添加讲师',
            tc_gender:0
        });
        $('#teacherInfo').html(html);
        checkForm('/api/teacher/add');
    }
function checkForm(url) {
    $('#teacherForm').validate({
        sendForm:false,//阻止表单默认提交
        valid:function () {// 验证通过后提交表单
            //提交表单
            console.log($(this));  //这个this指的是表单
            $(this).ajaxSubmit({
                type:'post',
                url:url,
                dataType:'json',
                success:function (data) {
                    if(data.code == 200){
                         location.href = '/teacher/list';
                        console.log(data);
                    }
                }
            });
        },
        //遍历验证每一个只要有一个不合法就会触发
        eachInvalidField:function(){ //这个this指的是验证的当前的那个输入框
            console.log($(this));
            $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        eachValidField:function () {
            $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
        },
        description:{
            tcName:{
                required:'用户名不能为空'
            },
            tcPass:{
                required:'密码不能为空',
                pattern:'只能是六位数'
            },
            joinDate:{
                required:'入职日期不能为空'
            }

        }
        
    });
}
})
;