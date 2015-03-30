/**
* 动态内容区JS  by xcl
* 项目地址：https://github.com/xucongli1989/dynamicCon
* 使用：
* 引用jquery（时代在进步，不再支持live绑定，请使用较新版本）
* $.DynamicCon();
*/
(function ($) {
    var defaults = {
        container: ".dynamicCon", //最外层的容器class
        temp: ".temp", //模板层class
        items: ".items", //具体行class
        minCount: 1, //具体行的最小数量 
        maxCount: 50, //具体行的最大数量
        addBtn: ".addBtn", //添加按钮class
        delBtn: ".delBtn", //删除按钮class
        afterAddOrDel: function () { }//添加后或删除后事件
    };

    $.extend({
        DynamicCon: function (options) {
            options = $.extend({}, defaults, options || {});
            var $conAll = $(options.container);
            $conAll.each(function (i) {
                //当前容器（适应多个调用该插件的情况）
                var $con = $(this);

                //当前容器中的模板行
                var $temp = $con.find(options.temp); 

                //更换模板行的class为具体行的class
                $temp.removeClass(options.temp.substring(1, options.temp.length)).addClass(options.items.substring(1, options.items.length)).wrap("<div style='display:none'></div>");

                //将模板的html字符串存放于变量中
                var tempHtml = $temp.parent().html();

                //删除模板dom
                $temp.parent().remove();

                //添加行事件
                $(document).on("click", $con.find(options.addBtn).selector, function () {
                    var $conThis = $($conAll[i]);
                    if ($conThis.find(options.items).length == options.maxCount) {
                        alert("最多只能添加" + options.maxCount + "行！");
                        return false;
                    }
                    $(this).closest(options.items).after(tempHtml);
                    options.afterAddOrDel();
                });

                //删除行事件
                $(document).on("click", $con.find(options.delBtn).selector, function () {
                    var $conThis = $($conAll[i]);
                    if ($conThis.find(options.items).length == options.minCount) {
                        alert("最少要有" + options.minCount + "行！");
                        return false;
                    }
                    $(this).closest(options.items).remove();
                    options.afterAddOrDel();
                });

            });
        }
    });
})(jQuery);