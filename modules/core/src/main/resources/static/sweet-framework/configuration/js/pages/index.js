/*配置清单
 *
 */
var tabs = require("tabs");
var waves = require("waves");
var bootstrapTable = require("bootstrapTable");
var bootstrapTableEdit = require("bootstrapTableEdit");

// x-editable 依赖bootstrap - popover.js、tooltip.js
var tooltip = require("tooltip");
var popover = require("popover");
var bootstrapTableEditUi = require("bootstrapTableEditUi");


var bootstrapTableLang = require("bootstrapTableLang");


window.tableEvents = {
    'click .selectValue': function(e, value, row, index) {

    }
}

var backupAction = {
    data: null,
    init: function() {
        var _this = this;
        _this.handler.init();

    },
    handler: {
        init: function(__this) {
            var _this = this;
            $.getJSON(app.apiUrl + 'backup.json', function(data) {
                if (data.code == 'success') {
                    var objdata = new Array();
                    // 获取key值
                    for (var o in data.data) {
                        objdata.push(data.data[o]);
                        // for (var i = 0; i < data.data[o].items.length; i++) {
                        //     if (data.data[o].items[i].candidateValues) {
                        //         var str = new Array();
                        //         var sp = data.data[o].items[i].candidateValues.split(',');
                        //         data.data[o].items[i].candidateValues = sp;
                        //     }
                        // }
                    }
                    console.log(objdata);
                    backupAction.data = objdata;
                    var html = template('backupHtmltmpl', {
                        data: objdata
                    });
                    document.getElementById('backupHtml').innerHTML = html;
                    $('ul.nav-tabs').tabs();

                    backupAction.tabAction.init();
                }


            }).error(function(error) {
                console.log(error)
            });
        }
    },
    tabAction: {
        el: '#data-table',
        tab: '#backupHtml li.tab',
        option: {
            height: function(){
                // console.log($("#data-table").length)
               var tableH = $(window).height() - 60;

                return tableH;
            }(),
            // showRefresh: true,
            iconsPrefix: "ion",
            icons: {
                refresh: 'ion-android-refresh'
            },
            onLoadSuccess: function() {
                console.log('success')
            },
            onLoadError: function() {
                console.log('error')
            },
            onPostBody: function() {
                $('.selectValue').each(function(index) {
                    var value = $(this).attr('self-value');
                    if (value&&value!="null") {
                        var sp = value.split(','),
                            source = new Array();
                        for (var i = 0; i < sp.length; i++) {
                            source.push({
                                value: i,
                                text: sp[i]
                            })
                        }
                        console.log(source);
                        $(this).editable({
                        	value:0,
                            source: source,
                            title:'修改属性'
                        });
                    }
                })

                // $('.selectValue').editable();
            },
            columns: [{
                field: 'key',
                title: 'key',
                width: '15%'
            }, {
                field: 'name',
                title: 'name',
                width: '20%'
            }, {
                field: 'type',
                title: 'type',
                width: '15%'
            }, {
                field: 'candidateValues',
                title: 'candidateValues',
                width: '5%',
                events: tableEvents,
                formatter: function(value, row, index) {
                    if (value) {
                        text = value.split(',')[0]
                    } else {
                        text = 'NULL'
                    }
                    return [
                        '<a class="selectValue" href="javascript:void(0)" data-type="select" data-pk="1" self-value="' + value + '">' + text + '</a>'
                    ].join('');
                }
            }, {
                field: 'defaultValue',
                title: 'defaultValue',
                width: '15%'
            }, {
                field: 'description',
                title: 'description'
            }]

        },
        init: function() {
            var _this = this;
            _this.handler._init();
            _this.event();



        },
        handler: {
            _init: function() {
                var _this = this,
                    __this = backupAction.tabAction;
                $(__this.el).bootstrapTable(__this.option);
                _this.dataChange();
            },
            checkIndexOrReOp: function() {
                var el = backupAction.tabAction.tab,
                    columns = backupAction.tabAction.option.columns,
                    result = null;
                $(el).each(function(index) {
                    if ($(this).hasClass('active')) {
                        for (var o in backupAction.data) {
                            var name = backupAction.data[index].group;
                            //              console.log(name);
                            result = backupAction.data[index].items;
                        }
                    }
                })
                return result;
            },
            dataChange: function() {
                var _this = this,
                    __this = backupAction.tabAction;
                $(__this.el).bootstrapTable('load', __this.handler.checkIndexOrReOp());
                console.log(__this.handler.checkIndexOrReOp())
            }
        },
        event: function() {
            var _this = this;
            $('#backupHtml li.tab').on('shown.bs.tab', function(e) {
                e.preventDefault();
                _this.handler.dataChange();
            });


        }
    }
}

$(function() {
    backupAction.init();
});
