$(function() {
    // 获取 表格数据
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                // 调用 template
                const htmlStr = template("tpl-table", res);
                $("tbody").empty().html(htmlStr);
            },
        });
    };

    initArtCateList();
    const layer = layui.layer;

$("#btnAddCate").click(() => {
    layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $('#dialog-add').html(),
    });
});
// 添加分类
$('body').on('submit','#form-add',function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:(res) => {
            if(res.status !== 0) return layer.msg('新增分类失败')
            initArtCateList()
            layer.msg('新增分类成功')
            layer.close(indexAdd)
        }
    })
})
// 修改
let indexEdit = null
$('tbody').on('click','.btn-edit', function(){
    indexEdit = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $('#dialog-edit').html(),
    })
    const id = $(this).attr("data-id");
// 发起请求获取对应分类的数据
   $.ajax({
    method: "GET",
    url: "/my/article/cates/" + id,
    success: function (res) {
    $('form').val("form-edit", res.data);
    }
});
})
// 更新文章分类
$("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg("更新分类数据失败！");
            }
            layer.msg("更新分类数据成功！");
            layer.close(indexEdit);
            initArtCateList();
        },
    });
});
// 删除
$('body').on('click','.btn-delete',function () {
    const id = $(this).attr("data-id");
    $.ajax({
        type:'GET', 
        url:'/my/article/deletecate/' + id,
        success:(res) => {
          if(res.status !== 0) return layer.msg('删除失败');
             layer.msg('删除成功');
             layer.close(index)
             initArtCateList()
        }
    })
})
})