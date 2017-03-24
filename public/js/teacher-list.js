/**
 * Created by lixiaotong on 2017/3/22.
 */
define(['jquery','template','bootstrap','overlay'],function($,template){
    // util.setMenu('/teacher/list');
    $.ajax({
        type:'GET',
        url:'/api/teacher',
        dataType:'json',
        success:function (data) {
            //实现教师数据列表加载  // 工作就是接受数据  模板引擎渲染页面
            // 模板引擎的作用  模板加上数据等于静态标签
            var html = template('teacherTpl',{list:data.result});
            $('#teacherList').html(html);
            //点击查看功能
            // 接口请求的参数是tc_id


            $('.teacherBtn').find('a:eq(0)').click(function(){
                var tc_id = $(this).parents('td').attr('data-tcid');
                console.log(tc_id);
                 // 通过上面的data获取到tc_id
                $.ajax({
                    url:'/api/teacher/view',
                    type:'get',
                    dataType:'json',
                    data:{tc_id:tc_id },
                    success:function (data) {
                        if(data.code == 200){
                            console.log(data);

                            // data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g,' ');
                            data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');
                            var html = template('teacherInfoModal',data.result);
                            $('#teacherInfo').html(html);
                            //bootstrap中的插件的两种调用的方法  一个是通过类调用  我们什么都不用写  二是手动调用
                            $('#teacherModal').modal();
                        }
                    }
                });
            });
            // 启用和注销讲师
            $('.teacherBtn').find('a:eq(2)').click(function(){
                var tc_id = $(this).parents('td').attr('data-tcid');
                var tc_status = $(this).parents('td').attr('data-status');
                var that = $(this);
                $.ajax({
                    url:'/api/teacher/handle',
                    type:'post',
                    data:{
                        tc_id:tc_id,
                        tc_status:tc_status
                    },
                    dataType:'json',
                    success:function(data){
                        if(data.code==200){
                            if(data.result.tc_status==1){
                                that.text('注销');
                            }else{
                                that.text('启用');
                            }
                            //更改页面中的状态  因为点击之后数据库中的状态改变了  所以要重新更改页面中的状态
                           that.parents('td').attr('data-status',data.result.tc_status)
                        }
                    }
                });
            });


        }
    });
});