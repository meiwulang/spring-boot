var modelConfig = {
    alias: { //配置需要引入的JS模块
        jquery: "vendors/jquery.min.js",
        director:"vendors/director.js",
        layer: "vendors/layer.js",
        template: "vendors/template.js",
        scrollBar: "vendors/jquery.mCustomScrollbar.js",
        mousewheel: "vendors/jquery.mousewheel.js",
        prism: "vendors/prism.js",
        bootstrapTable: "vendors/bootstrapTable/bootstrap-table.js",
        bootstrapTableEdit:"vendors/bootstrapTable/extensions/editable/bootstrap-table-editable.js",
        bootstrapTableEditUi:"vendors/bootstrapTable/extensions/editable/bootstrap-table-editable-ui.js",
        bootstrapTableLang: "vendors/bootstrapTable/locale/bootstrap-table-zh-CN.js",
        velocity:"vendors/velocity.js",
        hammer: "vendors/hammer.js",
        tooltip:"vendors/bootstrap/tooltip.js",
        popover:"vendors/bootstrap/popover.js",
        collapse:"vendors/bootstrap/collapse.js",
        transition:"vendors/bootstrap/transition.js",
        tabs: "vendors/bootstrap/tabs.js",
        waves: "vendors/waves.js",
        app: "app.js",
        demo: "util/demo.js"

    },
    global: { //定义引入模块的全局对象，方便不需要require 直接使用
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery":'jquery',
        template: 'template',
        app:'app'
    }
}


module.exports = modelConfig;
