webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, app, template) {/*配置清单
	 *
	 */
	var tabs = __webpack_require__(5);
	var waves = __webpack_require__(6);
	var bootstrapTable = __webpack_require__(9);
	var bootstrapTableEdit = __webpack_require__(10);

	// x-editable 依赖bootstrap - popover.js、tooltip.js
	var tooltip = __webpack_require__(11);
	var popover = __webpack_require__(12);
	var bootstrapTableEditUi = __webpack_require__(13);


	var bootstrapTableLang = __webpack_require__(14);


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
	            $.getJSON(app.apiUrl, function(data) {
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(4)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
	!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

	return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
	return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"=="function"&&__webpack_require__(2)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 3 */
/***/ function(module, exports) {

	var app = {
		apiUrl:"../../configuration/metadata",  //api接口地址，结尾以 ‘/’ 结束
		init:function(){
			console.log('app.js')
		}

	}

	app.init();

	module.exports = app;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
	!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return d}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=d:this.template=d}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: tab.js v3.3.0
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2014 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TAB CLASS DEFINITION
	  // ====================

	  var Tab = function (element) {
	    this.element = $(element)
	  }

	  Tab.VERSION = '3.3.0'

	  Tab.TRANSITION_DURATION = 150

	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    if ($this.parent('li').hasClass('active')) return

	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })

	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)

	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

	    var $target = $(selector)

	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }

	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)

	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)

	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }

	      if (element.parent('.dropdown-menu')) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }

	      callback && callback()
	    }

	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()

	    $active.removeClass('in')
	  }


	  // TAB PLUGIN DEFINITION
	  // =====================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')

	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tab

	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab


	  // TAB NO CONFLICT
	  // ===============

	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }


	  // TAB DATA-API
	  // ============

	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }

	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

	}(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery, $) {var Hammer=__webpack_require__(7),
	    velocity=__webpack_require__(8);

	;(function(window) {
	    'use strict';

	    var Waves = Waves || {};
	    var $$ = document.querySelectorAll.bind(document);

	    // Find exact position of element
	    function isWindow(obj) {
	        return obj !== null && obj === obj.window;
	    }

	    function getWindow(elem) {
	        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	    }

	    function offset(elem) {
	        var docElem, win,
	            box = {top: 0, left: 0},
	            doc = elem && elem.ownerDocument;

	        docElem = doc.documentElement;

	        if (typeof elem.getBoundingClientRect !== typeof undefined) {
	            box = elem.getBoundingClientRect();
	        }
	        win = getWindow(doc);
	        return {
	            top: box.top + win.pageYOffset - docElem.clientTop,
	            left: box.left + win.pageXOffset - docElem.clientLeft
	        };
	    }

	    function convertStyle(obj) {
	        var style = '';

	        for (var a in obj) {
	            if (obj.hasOwnProperty(a)) {
	                style += (a + ':' + obj[a] + ';');
	            }
	        }

	        return style;
	    }

	    var Effect = {

	        // Effect delay
	        duration: 750,

	        show: function(e, element) {

	            // Disable right click
	            if (e.button === 2) {
	                return false;
	            }

	            var el = element || this;

	            // Create ripple
	            var ripple = document.createElement('div');
	            ripple.className = 'waves-ripple';
	            el.appendChild(ripple);

	            // Get click coordinate and element witdh
	            var pos         = offset(el);
	            var relativeY   = (e.pageY - pos.top);
	            var relativeX   = (e.pageX - pos.left);
	            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

	            // Support for touch devices
	            if ('touches' in e) {
	              relativeY   = (e.touches[0].pageY - pos.top);
	              relativeX   = (e.touches[0].pageX - pos.left);
	            }

	            // Attach data to element
	            ripple.setAttribute('data-hold', Date.now());
	            ripple.setAttribute('data-scale', scale);
	            ripple.setAttribute('data-x', relativeX);
	            ripple.setAttribute('data-y', relativeY);

	            // Set ripple position
	            var rippleStyle = {
	                'top': relativeY+'px',
	                'left': relativeX+'px'
	            };

	            ripple.className = ripple.className + ' waves-notransition';
	            ripple.setAttribute('style', convertStyle(rippleStyle));
	            ripple.className = ripple.className.replace('waves-notransition', '');

	            // Scale the ripple
	            rippleStyle['-webkit-transform'] = scale;
	            rippleStyle['-moz-transform'] = scale;
	            rippleStyle['-ms-transform'] = scale;
	            rippleStyle['-o-transform'] = scale;
	            rippleStyle.transform = scale;
	            rippleStyle.opacity   = '1';

	            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
	            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
	            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
	            rippleStyle['transition-duration']         = Effect.duration + 'ms';

	            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

	            ripple.setAttribute('style', convertStyle(rippleStyle));
	        },

	        hide: function(e) {
	            TouchHandler.touchup(e);

	            var el = this;
	            var width = el.clientWidth * 1.4;

	            // Get first ripple
	            var ripple = null;
	            var ripples = el.getElementsByClassName('waves-ripple');
	            if (ripples.length > 0) {
	                ripple = ripples[ripples.length - 1];
	            } else {
	                return false;
	            }

	            var relativeX   = ripple.getAttribute('data-x');
	            var relativeY   = ripple.getAttribute('data-y');
	            var scale       = ripple.getAttribute('data-scale');

	            // Get delay beetween mousedown and mouse leave
	            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
	            var delay = 350 - diff;

	            if (delay < 0) {
	                delay = 0;
	            }

	            // Fade out ripple after delay
	            setTimeout(function() {
	                var style = {
	                    'top': relativeY+'px',
	                    'left': relativeX+'px',
	                    'opacity': '0',

	                    // Duration
	                    '-webkit-transition-duration': Effect.duration + 'ms',
	                    '-moz-transition-duration': Effect.duration + 'ms',
	                    '-o-transition-duration': Effect.duration + 'ms',
	                    'transition-duration': Effect.duration + 'ms',
	                    '-webkit-transform': scale,
	                    '-moz-transform': scale,
	                    '-ms-transform': scale,
	                    '-o-transform': scale,
	                    'transform': scale,
	                };

	                ripple.setAttribute('style', convertStyle(style));

	                setTimeout(function() {
	                    try {
	                        el.removeChild(ripple);
	                    } catch(e) {
	                        return false;
	                    }
	                }, Effect.duration);
	            }, delay);
	        },

	        // Little hack to make <input> can perform waves effect
	        wrapInput: function(elements) {
	            for (var a = 0; a < elements.length; a++) {
	                var el = elements[a];

	                if (el.tagName.toLowerCase() === 'input') {
	                    var parent = el.parentNode;

	                    // If input already have parent just pass through
	                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
	                        continue;
	                    }

	                    // Put element class and style to the specified parent
	                    var wrapper = document.createElement('i');
	                    wrapper.className = el.className + ' waves-input-wrapper';

	                    var elementStyle = el.getAttribute('style');

	                    if (!elementStyle) {
	                        elementStyle = '';
	                    }

	                    wrapper.setAttribute('style', elementStyle);

	                    el.className = 'waves-button-input';
	                    el.removeAttribute('style');

	                    // Put element as child
	                    parent.replaceChild(wrapper, el);
	                    wrapper.appendChild(el);
	                }
	            }
	        }
	    };


	    /**
	     * Disable mousedown event for 500ms during and after touch
	     */
	    var TouchHandler = {
	        /* uses an integer rather than bool so there's no issues with
	         * needing to clear timeouts if another touch event occurred
	         * within the 500ms. Cannot mouseup between touchstart and
	         * touchend, nor in the 500ms after touchend. */
	        touches: 0,
	        allowEvent: function(e) {
	            var allow = true;

	            if (e.type === 'touchstart') {
	                TouchHandler.touches += 1; //push
	            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
	                setTimeout(function() {
	                    if (TouchHandler.touches > 0) {
	                        TouchHandler.touches -= 1; //pop after 500ms
	                    }
	                }, 500);
	            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
	                allow = false;
	            }

	            return allow;
	        },
	        touchup: function(e) {
	            TouchHandler.allowEvent(e);
	        }
	    };


	    /**
	     * Delegated click handler for .waves-effect element.
	     * returns null when .waves-effect element not in "click tree"
	     */
	    function getWavesEffectElement(e) {
	        if (TouchHandler.allowEvent(e) === false) {
	            return null;
	        }

	        var element = null;
	        var target = e.target || e.srcElement;

	        while (target.parentElement !== null) {
	            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
	                element = target;
	                break;
	            } else if (target.classList.contains('waves-effect')) {
	                element = target;
	                break;
	            }
	            target = target.parentElement;
	        }

	        return element;
	    }

	    /**
	     * Bubble the click and show effect if .waves-effect elem was found
	     */
	    function showEffect(e) {
	        var element = getWavesEffectElement(e);

	        if (element !== null) {
	            Effect.show(e, element);

	            if ('ontouchstart' in window) {
	                element.addEventListener('touchend', Effect.hide, false);
	                element.addEventListener('touchcancel', Effect.hide, false);
	            }

	            element.addEventListener('mouseup', Effect.hide, false);
	            element.addEventListener('mouseleave', Effect.hide, false);
	        }
	    }

	    Waves.displayEffect = function(options) {
	        options = options || {};

	        if ('duration' in options) {
	            Effect.duration = options.duration;
	        }

	        //Wrap input inside <i> tag
	        Effect.wrapInput($$('.waves-effect'));

	        if ('ontouchstart' in window) {
	            document.body.addEventListener('touchstart', showEffect, false);
	        }

	        document.body.addEventListener('mousedown', showEffect, false);
	    };

	    /**
	     * Attach Waves to an input element (or any element which doesn't
	     * bubble mouseup/mousedown events).
	     *   Intended to be used with dynamically loaded forms/inputs, or
	     * where the user doesn't want a delegated click handler.
	     */
	    Waves.attach = function(element) {
	        //FUTURE: automatically add waves classes and allow users
	        // to specify them with an options param? Eg. light/classic/button
	        if (element.tagName.toLowerCase() === 'input') {
	            Effect.wrapInput([element]);
	            element = element.parentElement;
	        }

	        if ('ontouchstart' in window) {
	            element.addEventListener('touchstart', showEffect, false);
	        }

	        element.addEventListener('mousedown', showEffect, false);
	    };

	    window.Waves = Waves;

	    document.addEventListener('DOMContentLoaded', function() {
	        Waves.displayEffect();
	    }, false);

	})(window);
	(function(factory) {
	   factory(jQuery, Hammer);
	}(function($, Hammer) {
	    function hammerify(el, options) {
	        var $el = $(el);
	        if (!$el.data("hammer")) {
	            $el.data("hammer", new Hammer($el[0], options));
	        }
	    }

	    $.fn.hammer = function(options) {
	        return this.each(function() {
	            hammerify(this, options);
	        });
	    };

	    // extend the emit method to also trigger jQuery events
	    Hammer.Manager.prototype.emit = (function(originalEmit) {
	        return function(type, data) {
	            originalEmit.call(this, type, data);
	            $(this.element).trigger({
	                type: type,
	                gesture: data
	            });
	        };
	    })(Hammer.Manager.prototype.emit);
	}));

	  var methods = {
	    init : function() {
	      return this.each(function() {

	      // For each set of tabs, we want to keep track of
	      // which tab is active and its associated content
	      var $this = $(this),
	          window_width = $(window).width();

	      $this.width('100%');
	      // Set Tab Width for each tab
	      var $num_tabs = $(this).children('li').length;
	      $this.children('li').each(function() {
	        $(this).width((100/$num_tabs)+'%');
	      });
	      var $active, $content, $links = $this.find('li.tab a'),
	          $tabs_width = $this.width(),
	          $tab_width = $this.find('li').first().outerWidth(),
	          $index = 0;

	      // If the location.hash matches one of the links, use that as the active tab.
	      $active = $($links.filter('[href="'+location.hash+'"]'));

	      // If no match is found, use the first link or any with class 'active' as the initial active tab.
	      if ($active.length === 0) {
	          $active = $(this).find('li.tab a.active').first();
	      }
	      if ($active.length === 0) {
	        $active = $(this).find('li.tab a').first();
	      }

	      $active.addClass('active');
	      $index = $links.index($active);
	      if ($index < 0) {
	        $index = 0;
	      }

	      $content = $($active[0].hash);

	      // append indicator then set indicator width to tab width
	      $this.append('<div class="indicator"></div>');
	      console.log($this);
	      var $indicator = $this.find('.indicator');
	      if ($this.is(":visible")) {
	        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
	        $indicator.css({"left": $index * $tab_width});
	      }
	      $(window).resize(function () {
	        $tabs_width = $this.width();
	        $tab_width = $this.find('li').first().outerWidth();
	        if ($index < 0) {
	          $index = 0;
	        }
	        if ($tab_width !== 0 && $tabs_width !== 0) {
	          $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
	          $indicator.css({"left": $index * $tab_width});
	        }
	      });

	      // Hide the remaining content
	      $links.not($active).each(function () {
	        $(this.hash).hide();
	      });


	      // Bind the click event handler
	      $this.on('click', 'a', function(e){
	        $tabs_width = $this.width();
	        $tab_width = $this.find('li').first().outerWidth();

	        // Make the old tab inactive.
	        $active.removeClass('active');
	        $content.hide();

	        // Update the variables with the new link and content
	        $active = $(this);
	        $content = $(this.hash);
	        $links = $this.find('li.tab a');

	        // Make the tab active.
	        $active.addClass('active');
	        var $prev_index = $index;
	        $index = $links.index($(this));
	        if ($index < 0) {
	          $index = 0;
	        }
	        // Change url to current tab
	        // window.location.hash = $active.attr('href');

	        $content.show();

	        // Update indicator
	        if (($index - $prev_index) >= 0) {
	          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
	          $indicator.velocity({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});

	        }
	        else {
	          $indicator.velocity({"left": $index * $tab_width}, { duration: 300, queue: false, easing: 'easeOutQuad'});
	          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
	        }

	        // Prevent the anchor's default click action
	        e.preventDefault();
	      });
	    });

	    },
	    select_tab : function( id ) {
	      this.find('a[href="#' + id + '"]').trigger('click');
	    }
	  };

	  $.fn.tabs = function(methodOrOptions) {
	    if ( methods[methodOrOptions] ) {
	      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	      // Default to "init"
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
	    }
	  };

	  $(document).ready(function(){
	    $('ul.tabs').tabs();
	  });

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(1)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;
	/*! Hammer.JS - v2.0.8 - 2016-09-30
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c)  Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {
	    'use strict';
	    /**
	     * @private
	     * use the val2 when val1 is undefined
	     * @param {*} val1
	     * @param {*} val2
	     * @returns {*}
	     */
	    function ifUndefined(val1, val2) {
	        return val1 === undefined ? val2 : val1;
	    }

	    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	    var TEST_ELEMENT = document.createElement('div');

	    var TYPE_FUNCTION = 'function';

	    var round = Math.round;
	    var abs = Math.abs;
	    var now = Date.now;

	    /**
	     * @private
	     * get the prefixed property
	     * @param {Object} obj
	     * @param {String} property
	     * @returns {String|Undefined} prefixed
	     */
	    function prefixed(obj, property) {
	        var prefix = void 0;
	        var prop = void 0;
	        var camelProp = property[0].toUpperCase() + property.slice(1);

	        var i = 0;
	        while (i < VENDOR_PREFIXES.length) {
	            prefix = VENDOR_PREFIXES[i];
	            prop = prefix ? prefix + camelProp : property;

	            if (prop in obj) {
	                return prop;
	            }
	            i++;
	        }
	        return undefined;
	    }

	    function getTouchActionProps() {
	        if (!NATIVE_TOUCH_ACTION) {
	            return false;
	        }
	        var touchMap = {};
	        var cssSupports = window.CSS && window.CSS.supports;
	        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	            // If css.supports is not supported but there is native touch-action assume it supports
	            // all values. This is the case for IE 10 and 11.
	            return touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	        });
	        return touchMap;
	    }

	    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	    // magical touchAction value
	    var TOUCH_ACTION_COMPUTE = 'compute';
	    var TOUCH_ACTION_AUTO = 'auto';
	    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	    var TOUCH_ACTION_NONE = 'none';
	    var TOUCH_ACTION_PAN_X = 'pan-x';
	    var TOUCH_ACTION_PAN_Y = 'pan-y';
	    var TOUCH_ACTION_MAP = getTouchActionProps();

	    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	    var SUPPORT_TOUCH = 'ontouchstart' in window;
	    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	    var INPUT_TYPE_TOUCH = 'touch';
	    var INPUT_TYPE_PEN = 'pen';
	    var INPUT_TYPE_MOUSE = 'mouse';
	    var INPUT_TYPE_KINECT = 'kinect';

	    var COMPUTE_INTERVAL = 25;

	    var INPUT_START = 1;
	    var INPUT_MOVE = 2;
	    var INPUT_END = 4;
	    var INPUT_CANCEL = 8;

	    var DIRECTION_NONE = 1;
	    var DIRECTION_LEFT = 2;
	    var DIRECTION_RIGHT = 4;
	    var DIRECTION_UP = 8;
	    var DIRECTION_DOWN = 16;

	    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	    var PROPS_XY = ['x', 'y'];
	    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	    var STATE_POSSIBLE = 1;
	    var STATE_BEGAN = 2;
	    var STATE_CHANGED = 4;
	    var STATE_ENDED = 8;
	    var STATE_RECOGNIZED = STATE_ENDED;
	    var STATE_CANCELLED = 16;
	    var STATE_FAILED = 32;

	    /**
	     * @private
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} target
	     * @param {...Object} objects_to_assign
	     * @returns {Object} target
	     */
	    var assign = void 0;
	    if (typeof Object.assign !== 'function') {
	        assign = function assign(target) {
	            if (target === undefined || target === null) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }

	            var output = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var source = arguments[index];
	                if (source !== undefined && source !== null) {
	                    for (var nextKey in source) {
	                        if (source.hasOwnProperty(nextKey)) {
	                            output[nextKey] = source[nextKey];
	                        }
	                    }
	                }
	            }
	            return output;
	        };
	    } else {
	        assign = Object.assign;
	    }

	    var assign$1 = assign;

	    /**
	     * @private
	     * get a unique id
	     * @returns {number} uniqueId
	     */
	    var _uniqueId = 1;

	    function uniqueId() {
	        return _uniqueId++;
	    }

	    /**
	     * @private
	     * walk objects and arrays
	     * @param {Object} obj
	     * @param {Function} iterator
	     * @param {Object} context
	     */
	    function each(obj, iterator, context) {
	        var i = void 0;

	        if (!obj) {
	            return;
	        }

	        if (obj.forEach) {
	            obj.forEach(iterator, context);
	        } else if (obj.length !== undefined) {
	            i = 0;
	            while (i < obj.length) {
	                iterator.call(context, obj[i], i, obj);
	                i++;
	            }
	        } else {
	            for (i in obj) {
	                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	            }
	        }
	    }

	    /**
	     * @private
	     * if the argument is an array, we want to execute the fn on each entry
	     * if it aint an array we don't want to do a thing.
	     * this is used by all the methods that accept a single and array argument.
	     * @param {*|Array} arg
	     * @param {String} fn
	     * @param {Object} [context]
	     * @returns {Boolean}
	     */
	    function invokeArrayArg(arg, fn, context) {
	        if (Array.isArray(arg)) {
	            each(arg, context[fn], context);
	            return true;
	        }
	        return false;
	    }

	    /**
	     * @private
	     * find if a array contains the object using indexOf or a simple polyFill
	     * @param {Array} src
	     * @param {String} find
	     * @param {String} [findByKey]
	     * @return {Boolean|Number} false when not found, or the index
	     */
	    function inArray(src, find, findByKey) {
	        if (src.indexOf && !findByKey) {
	            return src.indexOf(find);
	        } else {
	            var i = 0;
	            while (i < src.length) {
	                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
	                    // do not use === here, test fails
	                    return i;
	                }
	                i++;
	            }
	            return -1;
	        }
	    }

	    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
	        return typeof obj;
	    } : function(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };

	    var asyncGenerator = function() {
	        function AwaitValue(value) {
	            this.value = value;
	        }

	        function AsyncGenerator(gen) {
	            var front, back;

	            function send(key, arg) {
	                return new Promise(function(resolve, reject) {
	                    var request = {
	                        key: key,
	                        arg: arg,
	                        resolve: resolve,
	                        reject: reject,
	                        next: null
	                    };

	                    if (back) {
	                        back = back.next = request;
	                    } else {
	                        front = back = request;
	                        resume(key, arg);
	                    }
	                });
	            }

	            function resume(key, arg) {
	                try {
	                    var result = gen[key](arg);
	                    var value = result.value;

	                    if (value instanceof AwaitValue) {
	                        Promise.resolve(value.value).then(function(arg) {
	                            resume("next", arg);
	                        }, function(arg) {
	                            resume("throw", arg);
	                        });
	                    } else {
	                        settle(result.done ? "return" : "normal", result.value);
	                    }
	                } catch (err) {
	                    settle("throw", err);
	                }
	            }

	            function settle(type, value) {
	                switch (type) {
	                    case "return":
	                        front.resolve({
	                            value: value,
	                            done: true
	                        });
	                        break;

	                    case "throw":
	                        front.reject(value);
	                        break;

	                    default:
	                        front.resolve({
	                            value: value,
	                            done: false
	                        });
	                        break;
	                }

	                front = front.next;

	                if (front) {
	                    resume(front.key, front.arg);
	                } else {
	                    back = null;
	                }
	            }

	            this._invoke = send;

	            if (typeof gen.return !== "function") {
	                this.return = undefined;
	            }
	        }

	        if (typeof Symbol === "function" && Symbol.asyncIterator) {
	            AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
	                return this;
	            };
	        }

	        AsyncGenerator.prototype.next = function(arg) {
	            return this._invoke("next", arg);
	        };

	        AsyncGenerator.prototype.throw = function(arg) {
	            return this._invoke("throw", arg);
	        };

	        AsyncGenerator.prototype.return = function(arg) {
	            return this._invoke("return", arg);
	        };

	        return {
	            wrap: function(fn) {
	                return function() {
	                    return new AsyncGenerator(fn.apply(this, arguments));
	                };
	            },
	            await: function(value) {
	                return new AwaitValue(value);
	            }
	        };
	    }();

	    var classCallCheck = function(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    };

	    var createClass = function() {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function(Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    var get = function get(object, property, receiver) {
	        if (object === null) object = Function.prototype;
	        var desc = Object.getOwnPropertyDescriptor(object, property);

	        if (desc === undefined) {
	            var parent = Object.getPrototypeOf(object);

	            if (parent === null) {
	                return undefined;
	            } else {
	                return get(parent, property, receiver);
	            }
	        } else if ("value" in desc) {
	            return desc.value;
	        } else {
	            var getter = desc.get;

	            if (getter === undefined) {
	                return undefined;
	            }

	            return getter.call(receiver);
	        }
	    };

	    var inherits = function(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }

	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    };

	    var possibleConstructorReturn = function(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }

	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    };

	    var slicedToArray = function() {
	        function sliceIterator(arr, i) {
	            var _arr = [];
	            var _n = true;
	            var _d = false;
	            var _e = undefined;

	            try {
	                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	                    _arr.push(_s.value);

	                    if (i && _arr.length === i) break;
	                }
	            } catch (err) {
	                _d = true;
	                _e = err;
	            } finally {
	                try {
	                    if (!_n && _i["return"]) _i["return"]();
	                } finally {
	                    if (_d) throw _e;
	                }
	            }

	            return _arr;
	        }

	        return function(arr, i) {
	            if (Array.isArray(arr)) {
	                return arr;
	            } else if (Symbol.iterator in Object(arr)) {
	                return sliceIterator(arr, i);
	            } else {
	                throw new TypeError("Invalid attempt to destructure non-iterable instance");
	            }
	        };
	    }();

	    /**
	     * @private
	     * let a boolean value also be a function that must return a boolean
	     * this first item in args will be used as the context
	     * @param {Boolean|Function} val
	     * @param {Array} [args]
	     * @returns {Boolean}
	     */
	    function boolOrFn(val, args) {
	        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === TYPE_FUNCTION) {
	            return val.apply(args ? args[0] || undefined : undefined, args);
	        }
	        return val;
	    }

	    /**
	     * @private
	     * get a recognizer by name if it is bound to a manager
	     * @param {Recognizer|String} otherRecognizer
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer}
	     */
	    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	        var manager = recognizer.manager;

	        if (manager) {
	            return manager.get(otherRecognizer);
	        }
	        return otherRecognizer;
	    }

	    /**
	     * @private
	     * get a usable string, used as event postfix
	     * @param {constant} state
	     * @returns {String} state
	     */
	    function stateStr(state) {
	        if (state & STATE_CANCELLED) {
	            return 'cancel';
	        } else if (state & STATE_ENDED) {
	            return 'end';
	        } else if (state & STATE_CHANGED) {
	            return 'move';
	        } else if (state & STATE_BEGAN) {
	            return 'start';
	        }
	        return '';
	    }

	    /**
	     * @private
	     * Recognizer flow explained; *
	     * All recognizers have the initial state of POSSIBLE when a input session starts.
	     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	     * Example session for mouse-input: mousedown -> mousemove -> mouseup
	     *
	     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	     * which determines with state it should be.
	     *
	     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	     * POSSIBLE to give it another change on the next cycle.
	     *
	     *               Possible
	     *                  |
	     *            +-----+---------------+
	     *            |                     |
	     *      +-----+-----+               |
	     *      |           |               |
	     *   Failed      Cancelled          |
	     *                          +-------+------+
	     *                          |              |
	     *                      Recognized       Began
	     *                                         |
	     *                                      Changed
	     *                                         |
	     *                                  Ended/Recognized
	     */

	    /**
	     * @private
	     * Recognizer
	     * Every recognizer needs to extend from this class.
	     * @constructor
	     * @param {Object} options
	     */

	    var Recognizer = function() {
	        function Recognizer(options) {
	            classCallCheck(this, Recognizer);

	            this.options = assign$1({}, this.defaults, options || {});

	            this.id = uniqueId();

	            this.manager = null;

	            // default is enable true
	            this.options.enable = ifUndefined(this.options.enable, true);

	            this.state = STATE_POSSIBLE;
	            this.simultaneous = {};
	            this.requireFail = [];
	        }

	        /**
	         * @private
	         * set options
	         * @param {Object} options
	         * @return {Recognizer}
	         */


	        createClass(Recognizer, [{
	            key: 'set',
	            value: function set(options) {
	                assign$1(this.options, options);

	                // also update the touchAction, in case something changed about the directions/enabled state
	                this.manager && this.manager.touchAction.update();
	                return this;
	            }

	            /**
	             * @private
	             * recognize simultaneous with an other recognizer.
	             * @param {Recognizer} otherRecognizer
	             * @returns {Recognizer} this
	             */

	        }, {
	            key: 'recognizeWith',
	            value: function recognizeWith(otherRecognizer) {
	                if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	                    return this;
	                }

	                var simultaneous = this.simultaneous;

	                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	                if (!simultaneous[otherRecognizer.id]) {
	                    simultaneous[otherRecognizer.id] = otherRecognizer;
	                    otherRecognizer.recognizeWith(this);
	                }
	                return this;
	            }

	            /**
	             * @private
	             * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	             * @param {Recognizer} otherRecognizer
	             * @returns {Recognizer} this
	             */

	        }, {
	            key: 'dropRecognizeWith',
	            value: function dropRecognizeWith(otherRecognizer) {
	                if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	                    return this;
	                }

	                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	                delete this.simultaneous[otherRecognizer.id];
	                return this;
	            }

	            /**
	             * @private
	             * recognizer can only run when an other is failing
	             * @param {Recognizer} otherRecognizer
	             * @returns {Recognizer} this
	             */

	        }, {
	            key: 'requireFailure',
	            value: function requireFailure(otherRecognizer) {
	                if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	                    return this;
	                }

	                var requireFail = this.requireFail;

	                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	                if (inArray(requireFail, otherRecognizer) === -1) {
	                    requireFail.push(otherRecognizer);
	                    otherRecognizer.requireFailure(this);
	                }
	                return this;
	            }

	            /**
	             * @private
	             * drop the requireFailure link. it does not remove the link on the other recognizer.
	             * @param {Recognizer} otherRecognizer
	             * @returns {Recognizer} this
	             */

	        }, {
	            key: 'dropRequireFailure',
	            value: function dropRequireFailure(otherRecognizer) {
	                if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	                    return this;
	                }

	                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	                var index = inArray(this.requireFail, otherRecognizer);
	                if (index > -1) {
	                    this.requireFail.splice(index, 1);
	                }
	                return this;
	            }

	            /**
	             * @private
	             * has require failures boolean
	             * @returns {boolean}
	             */

	        }, {
	            key: 'hasRequireFailures',
	            value: function hasRequireFailures() {
	                return this.requireFail.length > 0;
	            }

	            /**
	             * @private
	             * if the recognizer can recognize simultaneous with an other recognizer
	             * @param {Recognizer} otherRecognizer
	             * @returns {Boolean}
	             */

	        }, {
	            key: 'canRecognizeWith',
	            value: function canRecognizeWith(otherRecognizer) {
	                return !!this.simultaneous[otherRecognizer.id];
	            }

	            /**
	             * @private
	             * You should use `tryEmit` instead of `emit` directly to check
	             * that all the needed recognizers has failed before emitting.
	             * @param {Object} input
	             */

	        }, {
	            key: 'emit',
	            value: function emit(input) {
	                var self = this;
	                var state = this.state;


	                function emit(event) {
	                    self.manager.emit(event, input);
	                }

	                // 'panstart' and 'panmove'
	                if (state < STATE_ENDED) {
	                    emit(self.options.event + stateStr(state));
	                }

	                emit(self.options.event); // simple 'eventName' events

	                if (input.additionalEvent) {
	                    // additional event(panleft, panright, pinchin, pinchout...)
	                    emit(input.additionalEvent);
	                }

	                // panend and pancancel
	                if (state >= STATE_ENDED) {
	                    emit(self.options.event + stateStr(state));
	                }
	            }

	            /**
	             * @private
	             * Check that all the require failure recognizers has failed,
	             * if true, it emits a gesture event,
	             * otherwise, setup the state to FAILED.
	             * @param {Object} input
	             */

	        }, {
	            key: 'tryEmit',
	            value: function tryEmit(input) {
	                if (this.canEmit()) {
	                    return this.emit(input);
	                }
	                // it's failing anyway
	                this.state = STATE_FAILED;
	            }

	            /**
	             * @private
	             * can we emit?
	             * @returns {boolean}
	             */

	        }, {
	            key: 'canEmit',
	            value: function canEmit() {
	                var i = 0;
	                while (i < this.requireFail.length) {
	                    if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                        return false;
	                    }
	                    i++;
	                }
	                return true;
	            }

	            /**
	             * @private
	             * update the recognizer
	             * @param {Object} inputData
	             */

	        }, {
	            key: 'recognize',
	            value: function recognize(inputData) {
	                // make a new copy of the inputData
	                // so we can change the inputData without messing up the other recognizers
	                var inputDataClone = assign$1({}, inputData);

	                // is is enabled and allow recognizing?
	                if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	                    this.reset();
	                    this.state = STATE_FAILED;
	                    return;
	                }

	                // reset when we've reached the end
	                if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	                    this.state = STATE_POSSIBLE;
	                }

	                this.state = this.process(inputDataClone);

	                // the recognizer has recognized a gesture
	                // so trigger an event
	                if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	                    this.tryEmit(inputDataClone);
	                }
	            }

	            /**
	             * @private
	             * return the state of the recognizer
	             * the actual recognizing happens in this method
	             * @virtual
	             * @param {Object} inputData
	             * @returns {constant} STATE
	             */

	            /* jshint ignore:start */

	        }, {
	            key: 'process',
	            value: function process(inputData) {}
	                /* jshint ignore:end */

	            /**
	             * @private
	             * return the preferred touch-action
	             * @virtual
	             * @returns {Array}
	             */

	        }, {
	            key: 'getTouchAction',
	            value: function getTouchAction() {}

	            /**
	             * @private
	             * called when the gesture isn't allowed to recognize
	             * like when another is being recognized or it is disabled
	             * @virtual
	             */

	        }, {
	            key: 'reset',
	            value: function reset() {}
	        }]);
	        return Recognizer;
	    }();

	    Recognizer.prototype.defaults = {};

	    /**
	     * @private
	     * This recognizer is just used as a base for the simple attribute recognizers.
	     * @constructor
	     * @extends Recognizer
	     */

	    var AttrRecognizer = function(_Recognizer) {
	        inherits(AttrRecognizer, _Recognizer);

	        function AttrRecognizer() {
	            classCallCheck(this, AttrRecognizer);
	            return possibleConstructorReturn(this, (AttrRecognizer.__proto__ || Object.getPrototypeOf(AttrRecognizer)).apply(this, arguments));
	        }

	        /**
	         * @private
	         * Used to check if it the recognizer receives valid input, like input.distance > 10.
	         * @memberof AttrRecognizer
	         * @param {Object} input
	         * @returns {Boolean} recognized
	         */


	        createClass(AttrRecognizer, [{
	            key: 'attrTest',
	            value: function attrTest(input) {
	                var optionPointers = this.options.pointers;
	                return optionPointers === 0 || input.pointers.length === optionPointers;
	            }

	            /**
	             * @private
	             * Process the input and return the state for the recognizer
	             * @memberof AttrRecognizer
	             * @param {Object} input
	             * @returns {*} State
	             */

	        }, {
	            key: 'process',
	            value: function process(input) {
	                var state = this.state;
	                var eventType = input.eventType;


	                var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	                var isValid = this.attrTest(input);

	                // on cancel input and we've recognized before, return STATE_CANCELLED
	                if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	                    return state | STATE_CANCELLED;
	                } else if (isRecognized || isValid) {
	                    if (eventType & INPUT_END) {
	                        return state | STATE_ENDED;
	                    } else if (!(state & STATE_BEGAN)) {
	                        return STATE_BEGAN;
	                    }
	                    return state | STATE_CHANGED;
	                }
	                return STATE_FAILED;
	            }
	        }]);
	        return AttrRecognizer;
	    }(Recognizer);

	    AttrRecognizer.prototype.defaults = {
	        /**
	         * @private
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    };

	    /**
	     * @private
	     * Rotate
	     * Recognized when two or more pointer are moving in a circular motion.
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    var RotateRecognizer = function(_AttrRecognizer) {
	        inherits(RotateRecognizer, _AttrRecognizer);

	        function RotateRecognizer() {
	            classCallCheck(this, RotateRecognizer);
	            return possibleConstructorReturn(this, (RotateRecognizer.__proto__ || Object.getPrototypeOf(RotateRecognizer)).apply(this, arguments));
	        }

	        createClass(RotateRecognizer, [{
	            key: 'getTouchAction',
	            value: function getTouchAction() {
	                return [TOUCH_ACTION_NONE];
	            }
	        }, {
	            key: 'attrTest',
	            value: function attrTest(input) {
	                return get(RotateRecognizer.prototype.__proto__ || Object.getPrototypeOf(RotateRecognizer.prototype), 'attrTest', this).call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	            }
	        }]);
	        return RotateRecognizer;
	    }(AttrRecognizer);

	    RotateRecognizer.prototype.defaults = {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    };

	    /**
	     * @private
	     * Pinch
	     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    var PinchRecognizer = function(_AttrRecognizer) {
	        inherits(PinchRecognizer, _AttrRecognizer);

	        function PinchRecognizer() {
	            classCallCheck(this, PinchRecognizer);
	            return possibleConstructorReturn(this, (PinchRecognizer.__proto__ || Object.getPrototypeOf(PinchRecognizer)).apply(this, arguments));
	        }

	        createClass(PinchRecognizer, [{
	            key: 'getTouchAction',
	            value: function getTouchAction() {
	                return [TOUCH_ACTION_NONE];
	            }
	        }, {
	            key: 'attrTest',
	            value: function attrTest(input) {
	                return get(PinchRecognizer.prototype.__proto__ || Object.getPrototypeOf(PinchRecognizer.prototype), 'attrTest', this).call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	            }
	        }, {
	            key: 'emit',
	            value: function emit(input) {
	                if (input.scale !== 1) {
	                    var inOut = input.scale < 1 ? 'in' : 'out';
	                    input.additionalEvent = this.options.event + inOut;
	                }
	                get(PinchRecognizer.prototype.__proto__ || Object.getPrototypeOf(PinchRecognizer.prototype), 'emit', this).call(this, input);
	            }
	        }]);
	        return PinchRecognizer;
	    }(AttrRecognizer);

	    PinchRecognizer.prototype.defaults = {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    };

	    /**
	     * @private
	     * direction cons to string
	     * @param {constant} direction
	     * @returns {String}
	     */
	    function directionStr(direction) {
	        if (direction === DIRECTION_DOWN) {
	            return 'down';
	        } else if (direction === DIRECTION_UP) {
	            return 'up';
	        } else if (direction === DIRECTION_LEFT) {
	            return 'left';
	        } else if (direction === DIRECTION_RIGHT) {
	            return 'right';
	        }
	        return '';
	    }

	    /**
	     * @private
	     * Pan
	     * Recognized when the pointer is down and moved in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    var PanRecognizer = function(_AttrRecognizer) {
	        inherits(PanRecognizer, _AttrRecognizer);

	        function PanRecognizer() {
	            classCallCheck(this, PanRecognizer);

	            var _this = possibleConstructorReturn(this, (PanRecognizer.__proto__ || Object.getPrototypeOf(PanRecognizer)).apply(this, arguments));

	            _this.pX = null;
	            _this.pY = null;
	            return _this;
	        }

	        createClass(PanRecognizer, [{
	            key: 'getTouchAction',
	            value: function getTouchAction() {
	                var direction = this.options.direction;

	                var actions = [];
	                if (direction & DIRECTION_HORIZONTAL) {
	                    actions.push(TOUCH_ACTION_PAN_Y);
	                }
	                if (direction & DIRECTION_VERTICAL) {
	                    actions.push(TOUCH_ACTION_PAN_X);
	                }
	                return actions;
	            }
	        }, {
	            key: 'directionTest',
	            value: function directionTest(input) {
	                var options = this.options;

	                var hasMoved = true;
	                var distance = input.distance;
	                var direction = input.direction;

	                var x = input.deltaX;
	                var y = input.deltaY;

	                // lock to axis?
	                if (!(direction & options.direction)) {
	                    if (options.direction & DIRECTION_HORIZONTAL) {
	                        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                        hasMoved = x !== this.pX;
	                        distance = Math.abs(input.deltaX);
	                    } else {
	                        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	                        hasMoved = y !== this.pY;
	                        distance = Math.abs(input.deltaY);
	                    }
	                }
	                input.direction = direction;
	                return hasMoved && distance > options.threshold && direction & options.direction;
	            }
	        }, {
	            key: 'attrTest',
	            value: function attrTest(input) {
	                return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
	                    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	            }
	        }, {
	            key: 'emit',
	            value: function emit(input) {

	                this.pX = input.deltaX;
	                this.pY = input.deltaY;

	                var direction = directionStr(input.direction);

	                if (direction) {
	                    input.additionalEvent = this.options.event + direction;
	                }
	                get(PanRecognizer.prototype.__proto__ || Object.getPrototypeOf(PanRecognizer.prototype), 'emit', this).call(this, input);
	            }
	        }]);
	        return PanRecognizer;
	    }(AttrRecognizer);

	    PanRecognizer.prototype.defaults = {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    };

	    /**
	     * @private
	     * Swipe
	     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */

	    var SwipeRecognizer = function(_AttrRecognizer) {
	        inherits(SwipeRecognizer, _AttrRecognizer);

	        function SwipeRecognizer() {
	            classCallCheck(this, SwipeRecognizer);
	            return possibleConstructorReturn(this, (SwipeRecognizer.__proto__ || Object.getPrototypeOf(SwipeRecognizer)).apply(this, arguments));
	        }

	        createClass(SwipeRecognizer, [{
	            key: 'getTouchAction',
	            value: function getTouchAction() {
	                return PanRecognizer.prototype.getTouchAction.call(this);
	            }
	        }, {
	            key: 'attrTest',
	            value: function attrTest(input) {
	                var direction = this.options.direction;

	                var velocity = void 0;

	                if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	                    velocity = input.overallVelocity;
	                } else if (direction & DIRECTION_HORIZONTAL) {
	                    velocity = input.overallVelocityX;
	                } else if (direction & DIRECTION_VERTICAL) {
	                    velocity = input.overallVelocityY;
	                }

	                return get(SwipeRecognizer.prototype.__proto__ || Object.getPrototypeOf(SwipeRecognizer.prototype), 'attrTest', this).call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	            }
	        }, {
	            key: 'emit',
	            value: function emit(input) {
	                var direction = directionStr(input.offsetDirection);
	                if (direction) {
	                    this.manager.emit(this.options.event + direction, input);
	                }

	                this.manager.emit(this.options.event, input);
	            }
	        }]);
	        return SwipeRecognizer;
	    }(AttrRecognizer);

	    SwipeRecognizer.prototype.defaults = {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    };

	    /**
	     * @private
	     * simple function bind
	     * @param {Function} fn
	     * @param {Object} context
	     * @returns {Function}
	     */
	    function bindFn(fn, context) {
	        return function boundFn() {
	            return fn.apply(context, arguments);
	        };
	    }

	    /**
	     * @private
	     * set a timeout with a given scope
	     * @param {Function} fn
	     * @param {Number} timeout
	     * @param {Object} context
	     * @returns {number}
	     */
	    function setTimeoutContext(fn, timeout, context) {
	        return setTimeout(bindFn(fn, context), timeout);
	    }

	    /**
	     * @private
	     * calculate the absolute distance between two points
	     * @param {Object} p1 {x, y}
	     * @param {Object} p2 {x, y}
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} distance
	     */
	    function getDistance(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]];
	        var y = p2[props[1]] - p1[props[1]];

	        return Math.sqrt(x * x + y * y);
	    }

	    /**
	     * @private
	     * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	     * a single tap.
	     *
	     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	     * multi-taps being recognized.
	     * @constructor
	     * @extends Recognizer
	     */

	    var TapRecognizer = function(_Recognizer) {
	        inherits(TapRecognizer, _Recognizer);

	        function TapRecognizer() {
	            classCallCheck(this, TapRecognizer);

	            // previous time and center,
	            // used for tap counting
	            var _this = possibleConstructorReturn(this, (TapRecognizer.__proto__ || Object.getPrototypeOf(TapRecognizer)).apply(this, arguments));

	            _this.pTime = false;
	            _this.pCenter = false;

	            _this._timer = null;
	            _this._input = null;
	            _this.count = 0;
	            return _this;
	        }

	        createClass(TapRecognizer, [{
	            key: 'getTouchAction',
	            value: function getTouchAction() {
	                return [TOUCH_ACTION_MANIPULATION];
	            }
	        }, {
	            key: 'process',
	            value: function process(input) {
	                var _this2 = this;

	                var options = this.options;


	                var validPointers = input.pointers.length === options.pointers;
	                var validMovement = input.distance < options.threshold;
	                var validTouchTime = input.deltaTime < options.time;

	                this.reset();

	                if (input.eventType & INPUT_START && this.count === 0) {
	                    return this.failTimeout();
	                }

	                // we only allow little movement
	                // and we've reached an end event, so a tap is possible
	                if (validMovement && validTouchTime && validPointers) {
	                    if (input.eventType !== INPUT_END) {
	                        return this.failTimeout();
	                    }

	                    var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	                    var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	                    this.pTime = input.timeStamp;
	                    this.pCenter = input.center;

	                    if (!validMultiTap || !validInterval) {
	                        this.count = 1;
	                    } else {
	                        this.count += 1;
	                    }

	                    this._input = input;

	                    // if tap count matches we have recognized it,
	                    // else it has began recognizing...
	                    var tapCount = this.count % options.taps;
	                    if (tapCount === 0) {
	                        // no failing requirements, immediately trigger the tap event
	                        // or wait as long as the multitap interval to trigger
	                        if (!this.hasRequireFailures()) {
	                            return STATE_RECOGNIZED;
	                        } else {
	                            this._timer = setTimeoutContext(function() {
	                                _this2.state = STATE_RECOGNIZED;
	                                _this2.tryEmit();
	                            }, options.interval, this);
	                            return STATE_BEGAN;
	                        }
	                    }
	                }
	                return STATE_FAILED;
	            }
	        }, {
	            key: 'failTimeout',
	            value: function failTimeout() {
	                var _this3 = this;

	                this._timer = setTimeoutContext(function() {
	                    _this3.state = STATE_FAILED;
	                }, this.options.interval, this);
	                return STATE_FAILED;
	            }
	        }, {
	            key: 'reset',
	            value: function reset() {
	                clearTimeout(this._timer);
	            }
	        }, {
	            key: 'emit',
	            value: function emit() {
	                if (this.state === STATE_RECOGNIZED) {
	                    this._input.tapCount = this.count;
	                    this.manager.emit(this.options.event, this._input);
	                }
	            }
	        }]);
	        return TapRecognizer;
	    }(Recognizer);

	    TapRecognizer.prototype.defaults = {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    };

	    /**
	     * @private
	     * Press
	     * Recognized when the pointer is down for x ms without any movement.
	     * @constructor
	     * @extends Recognizer
	     */

	    var PressRecognizer = function(_Recognizer) {
	        inherits(PressRecognizer, _Recognizer);

	        function PressRecognizer() {
	            classCallCheck(this, PressRecognizer);

	            var _this = possibleConstructorReturn(this, (PressRecognizer.__proto__ || Object.getPrototypeOf(PressRecognizer)).apply(this, arguments));

	            _this._timer = null;
	            _this._input = null;
	            return _this;
	        }

	        createClass(PressRecognizer, [{
	            key: 'getTouchAction',
	            value: function getTouchAction() {
	                return [TOUCH_ACTION_AUTO];
	            }
	        }, {
	            key: 'process',
	            value: function process(input) {
	                var _this2 = this;

	                var options = this.options;

	                var validPointers = input.pointers.length === options.pointers;
	                var validMovement = input.distance < options.threshold;
	                var validTime = input.deltaTime > options.time;

	                this._input = input;

	                // we only allow little movement
	                // and we've reached an end event, so a tap is possible
	                if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	                    this.reset();
	                } else if (input.eventType & INPUT_START) {
	                    this.reset();
	                    this._timer = setTimeoutContext(function() {
	                        _this2.state = STATE_RECOGNIZED;
	                        _this2.tryEmit();
	                    }, options.time, this);
	                } else if (input.eventType & INPUT_END) {
	                    return STATE_RECOGNIZED;
	                }
	                return STATE_FAILED;
	            }
	        }, {
	            key: 'reset',
	            value: function reset() {
	                clearTimeout(this._timer);
	            }
	        }, {
	            key: 'emit',
	            value: function emit(input) {
	                if (this.state !== STATE_RECOGNIZED) {
	                    return;
	                }

	                if (input && input.eventType & INPUT_END) {
	                    this.manager.emit(this.options.event + 'up', input);
	                } else {
	                    this._input.timeStamp = now();
	                    this.manager.emit(this.options.event, this._input);
	                }
	            }
	        }]);
	        return PressRecognizer;
	    }(Recognizer);

	    PressRecognizer.prototype.defaults = {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    };

	    /**
	     * @private
	     * small indexOf wrapper
	     * @param {String} str
	     * @param {String} find
	     * @returns {Boolean} found
	     */
	    function inStr(str, find) {
	        return str.indexOf(find) > -1;
	    }

	    /**
	     * @private
	     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	     * @param {String} actions
	     * @returns {*}
	     */
	    function cleanTouchActions(actions) {
	        // none
	        if (inStr(actions, TOUCH_ACTION_NONE)) {
	            return TOUCH_ACTION_NONE;
	        }

	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	        // if both pan-x and pan-y are set (different recognizers
	        // for different directions, e.g. horizontal pan but vertical swipe?)
	        // we need none (as otherwise with pan-x pan-y combined none of these
	        // recognizers will work, since the browser would handle all panning
	        if (hasPanX && hasPanY) {
	            return TOUCH_ACTION_NONE;
	        }

	        // pan-x OR pan-y
	        if (hasPanX || hasPanY) {
	            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	        }

	        // manipulation
	        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	            return TOUCH_ACTION_MANIPULATION;
	        }

	        return TOUCH_ACTION_AUTO;
	    }

	    /**
	     * @private
	     * Touch Action
	     * sets the touchAction property or uses the js alternative
	     * @param {Manager} manager
	     * @param {String} value
	     * @constructor
	     */

	    var TouchAction = function() {
	        function TouchAction(manager, value) {
	            classCallCheck(this, TouchAction);

	            this.manager = manager;
	            this.set(value);
	        }

	        /**
	         * @private
	         * set the touchAction value on the element or enable the polyfill
	         * @param {String} value
	         */


	        createClass(TouchAction, [{
	            key: 'set',
	            value: function set(value) {
	                // find out the touch-action by the event handlers
	                if (value === TOUCH_ACTION_COMPUTE) {
	                    value = this.compute();
	                }

	                if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	                    this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	                }
	                this.actions = value.toLowerCase().trim();
	            }

	            /**
	             * @private
	             * just re-set the touchAction value
	             */

	        }, {
	            key: 'update',
	            value: function update() {
	                this.set(this.manager.options.touchAction);
	            }

	            /**
	             * @private
	             * compute the value for the touchAction property based on the recognizer's settings
	             * @returns {String} value
	             */

	        }, {
	            key: 'compute',
	            value: function compute() {
	                var actions = [];
	                each(this.manager.recognizers, function(recognizer) {
	                    if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                        actions = actions.concat(recognizer.getTouchAction());
	                    }
	                });
	                return cleanTouchActions(actions.join(' '));
	            }

	            /**
	             * @private
	             * this method is called on each input cycle and provides the preventing of the browser behavior
	             * @param {Object} input
	             */

	        }, {
	            key: 'preventDefaults',
	            value: function preventDefaults(input) {
	                var srcEvent = input.srcEvent;

	                var direction = input.offsetDirection;

	                // if the touch action did prevented once this session
	                if (this.manager.session.prevented) {
	                    srcEvent.preventDefault();
	                    return;
	                }

	                var actions = this.actions;

	                var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	                var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	                var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	                if (hasNone) {
	                    // do not prevent defaults if this is a tap gesture
	                    var isTapPointer = input.pointers.length === 1;
	                    var isTapMovement = input.distance < 2;
	                    var isTapTouchTime = input.deltaTime < 250;

	                    if (isTapPointer && isTapMovement && isTapTouchTime) {
	                        return;
	                    }
	                }

	                if (hasPanX && hasPanY) {
	                    // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	                    return;
	                }

	                if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	                    return this.preventSrc(srcEvent);
	                }
	            }

	            /**
	             * @private
	             * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	             * @param {Object} srcEvent
	             */

	        }, {
	            key: 'preventSrc',
	            value: function preventSrc(srcEvent) {
	                this.manager.session.prevented = true;
	                srcEvent.preventDefault();
	            }
	        }]);
	        return TouchAction;
	    }();

	    /**
	     * @private
	     * find if a node is in the given parent
	     * @method hasParent
	     * @param {HTMLElement} node
	     * @param {HTMLElement} parent
	     * @return {Boolean} found
	     */
	    function hasParent(node, parent) {
	        while (node) {
	            if (node === parent) {
	                return true;
	            }
	            node = node.parentNode;
	        }
	        return false;
	    }

	    /**
	     * @private
	     * get the center of all the pointers
	     * @param {Array} pointers
	     * @return {Object} center contains `x` and `y` properties
	     */
	    function getCenter(pointers) {
	        var pointersLength = pointers.length;

	        // no need to loop when only one touch
	        if (pointersLength === 1) {
	            return {
	                x: round(pointers[0].clientX),
	                y: round(pointers[0].clientY)
	            };
	        }

	        var x = 0;
	        var y = 0;
	        var i = 0;
	        while (i < pointersLength) {
	            x += pointers[i].clientX;
	            y += pointers[i].clientY;
	            i++;
	        }

	        return {
	            x: round(x / pointersLength),
	            y: round(y / pointersLength)
	        };
	    }

	    /**
	     * @private
	     * create a simple clone from the input used for storage of firstInput and firstMultiple
	     * @param {Object} input
	     * @returns {Object} clonedInputData
	     */
	    function simpleCloneInputData(input) {
	        // make a simple copy of the pointers because we will get a reference if we don't
	        // we only need clientXY for the calculations
	        var pointers = [];
	        var i = 0;
	        while (i < input.pointers.length) {
	            pointers[i] = {
	                clientX: round(input.pointers[i].clientX),
	                clientY: round(input.pointers[i].clientY)
	            };
	            i++;
	        }

	        return {
	            timeStamp: now(),
	            pointers: pointers,
	            center: getCenter(pointers),
	            deltaX: input.deltaX,
	            deltaY: input.deltaY
	        };
	    }

	    /**
	     * @private
	     * calculate the angle between two coordinates
	     * @param {Object} p1
	     * @param {Object} p2
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} angle
	     */
	    function getAngle(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]];
	        var y = p2[props[1]] - p1[props[1]];
	        return Math.atan2(y, x) * 180 / Math.PI;
	    }

	    /**
	     * @private
	     * get the direction between two points
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Number} direction
	     */
	    function getDirection(x, y) {
	        if (x === y) {
	            return DIRECTION_NONE;
	        }

	        if (abs(x) >= abs(y)) {
	            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        }
	        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	    }

	    function computeDeltaXY(session, input) {
	        var center = input.center;
	        // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
	        // jscs throwing error on defalut destructured values and without defaults tests fail

	        var offset = session.offsetDelta || {};
	        var prevDelta = session.prevDelta || {};
	        var prevInput = session.prevInput || {};

	        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	            prevDelta = session.prevDelta = {
	                x: prevInput.deltaX || 0,
	                y: prevInput.deltaY || 0
	            };

	            offset = session.offsetDelta = {
	                x: center.x,
	                y: center.y
	            };
	        }

	        input.deltaX = prevDelta.x + (center.x - offset.x);
	        input.deltaY = prevDelta.y + (center.y - offset.y);
	    }

	    /**
	     * @private
	     * calculate the velocity between two points. unit is in px per ms.
	     * @param {Number} deltaTime
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Object} velocity `x` and `y`
	     */
	    function getVelocity(deltaTime, x, y) {
	        return {
	            x: x / deltaTime || 0,
	            y: y / deltaTime || 0
	        };
	    }

	    /**
	     * @private
	     * calculate the scale factor between two pointersets
	     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} scale
	     */
	    function getScale(start, end) {
	        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	    }

	    /**
	     * @private
	     * calculate the rotation degrees between two pointersets
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} rotation
	     */
	    function getRotation(start, end) {
	        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	    }

	    /**
	     * @private
	     * velocity is calculated every x ms
	     * @param {Object} session
	     * @param {Object} input
	     */
	    function computeIntervalInputData(session, input) {
	        var last = session.lastInterval || input;
	        var deltaTime = input.timeStamp - last.timeStamp;
	        var velocity = void 0;
	        var velocityX = void 0;
	        var velocityY = void 0;
	        var direction = void 0;

	        if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	            var deltaX = input.deltaX - last.deltaX;
	            var deltaY = input.deltaY - last.deltaY;

	            var v = getVelocity(deltaTime, deltaX, deltaY);
	            velocityX = v.x;
	            velocityY = v.y;
	            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
	            direction = getDirection(deltaX, deltaY);

	            session.lastInterval = input;
	        } else {
	            // use latest velocity info if it doesn't overtake a minimum period
	            velocity = last.velocity;
	            velocityX = last.velocityX;
	            velocityY = last.velocityY;
	            direction = last.direction;
	        }

	        input.velocity = velocity;
	        input.velocityX = velocityX;
	        input.velocityY = velocityY;
	        input.direction = direction;
	    }

	    /**
	     * @private
	     * extend the data with some usable properties like scale, rotate, velocity etc
	     * @param {Object} manager
	     * @param {Object} input
	     */
	    function computeInputData(manager, input) {
	        var session = manager.session;
	        var pointers = input.pointers;
	        var pointersLength = pointers.length;

	        // store the first input to calculate the distance and direction

	        if (!session.firstInput) {
	            session.firstInput = simpleCloneInputData(input);
	        }

	        // to compute scale and rotation we need to store the multiple touches
	        if (pointersLength > 1 && !session.firstMultiple) {
	            session.firstMultiple = simpleCloneInputData(input);
	        } else if (pointersLength === 1) {
	            session.firstMultiple = false;
	        }

	        var firstInput = session.firstInput;
	        var firstMultiple = session.firstMultiple;

	        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	        var center = input.center = getCenter(pointers);
	        input.timeStamp = now();
	        input.deltaTime = input.timeStamp - firstInput.timeStamp;

	        input.angle = getAngle(offsetCenter, center);
	        input.distance = getDistance(offsetCenter, center);

	        computeDeltaXY(session, input);
	        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	        input.overallVelocityX = overallVelocity.x;
	        input.overallVelocityY = overallVelocity.y;
	        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

	        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

	        computeIntervalInputData(session, input);

	        // find the correct target
	        var target = manager.element;
	        if (hasParent(input.srcEvent.target, target)) {
	            target = input.srcEvent.target;
	        }
	        input.target = target;
	    }

	    /**
	     * @private
	     * handle input events
	     * @param {Manager} manager
	     * @param {String} eventType
	     * @param {Object} input
	     */
	    function inputHandler(manager, eventType, input) {
	        var pointersLen = input.pointers.length;
	        var changedPointersLen = input.changedPointers.length;
	        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

	        input.isFirst = !!isFirst;
	        input.isFinal = !!isFinal;

	        if (isFirst) {
	            manager.session = {};
	        }

	        // source event is the normalized value of the domEvents
	        // like 'touchstart, mouseup, pointerdown'
	        input.eventType = eventType;

	        // compute scale, rotation etc
	        computeInputData(manager, input);

	        // emit secret event
	        manager.emit('hammer.input', input);

	        manager.recognize(input);
	        manager.session.prevInput = input;
	    }

	    /**
	     * @private
	     * split string on whitespace
	     * @param {String} str
	     * @returns {Array} words
	     */

	    function splitStr(str) {
	        return str.trim().split(/\s+/g);
	    }

	    /**
	     * @private
	     * addEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */
	    function addEventListeners(target, types, handler) {
	        each(splitStr(types), function(type) {
	            target.addEventListener(type, handler, false);
	        });
	    }

	    /**
	     * @private
	     * removeEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */
	    function removeEventListeners(target, types, handler) {
	        each(splitStr(types), function(type) {
	            target.removeEventListener(type, handler, false);
	        });
	    }

	    /**
	     * @private
	     * get the window object of an element
	     * @param {HTMLElement} element
	     * @returns {DocumentView|Window}
	     */
	    function getWindowForElement(element) {
	        var doc = element.ownerDocument || element;
	        return doc.defaultView || doc.parentWindow || window;
	    }

	    /**
	     * @private
	     * create new input type manager
	     * @param {Manager} manager
	     * @param {Function} callback
	     * @returns {Input}
	     * @constructor
	     */

	    var Input = function() {
	        function Input(manager, callback) {
	            classCallCheck(this, Input);

	            var self = this;
	            this.manager = manager;
	            this.callback = callback;
	            this.element = manager.element;
	            this.target = manager.options.inputTarget;

	            // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	            // so when disabled the input events are completely bypassed.
	            this.domHandler = function(ev) {
	                if (boolOrFn(manager.options.enable, [manager])) {
	                    self.handler(ev);
	                }
	            };

	            this.init();
	        }
	        /**
	         * @private
	         * should handle the inputEvent data and trigger the callback
	         * @virtual
	         */


	        createClass(Input, [{
	            key: 'handler',
	            value: function handler() {}

	            /**
	             * @private
	             * bind the events
	             */

	        }, {
	            key: 'init',
	            value: function init() {
	                this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	                this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	                this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	            }

	            /**
	             * @private
	             * unbind the events
	             */

	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	                this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	                this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	            }
	        }]);
	        return Input;
	    }();

	    var POINTER_INPUT_MAP = {
	        pointerdown: INPUT_START,
	        pointermove: INPUT_MOVE,
	        pointerup: INPUT_END,
	        pointercancel: INPUT_CANCEL,
	        pointerout: INPUT_CANCEL
	    };

	    // in IE10 the pointer types is defined as an enum
	    var IE10_POINTER_TYPE_ENUM = {
	        2: INPUT_TYPE_TOUCH,
	        3: INPUT_TYPE_PEN,
	        4: INPUT_TYPE_MOUSE,
	        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	    };

	    var POINTER_ELEMENT_EVENTS = 'pointerdown';
	    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	    // IE10 has prefixed support, and case-sensitive
	    if (window.MSPointerEvent && !window.PointerEvent) {
	        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	    }

	    /**
	     * @private
	     * Pointer events input
	     * @constructor
	     * @extends Input
	     */

	    var PointerEventInput = function(_Input) {
	        inherits(PointerEventInput, _Input);

	        function PointerEventInput() {
	            classCallCheck(this, PointerEventInput);

	            var _this = possibleConstructorReturn(this, (PointerEventInput.__proto__ || Object.getPrototypeOf(PointerEventInput)).apply(this, arguments));

	            _this.evEl = POINTER_ELEMENT_EVENTS;
	            _this.evWin = POINTER_WINDOW_EVENTS;

	            _this.store = _this.manager.session.pointerEvents = [];
	            return _this;
	        }

	        /**
	         * @private
	         * handle mouse events
	         * @param {Object} ev
	         */


	        createClass(PointerEventInput, [{
	            key: 'handler',
	            value: function handler(ev) {
	                var store = this.store;

	                var removePointer = false;

	                var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	                var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	                var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	                var isTouch = pointerType === INPUT_TYPE_TOUCH;

	                // get index of the event in the store
	                var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	                // start and mouse must be down
	                if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	                    if (storeIndex < 0) {
	                        store.push(ev);
	                        storeIndex = store.length - 1;
	                    }
	                } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	                    removePointer = true;
	                }

	                // it not found, so the pointer hasn't been down (so it's probably a hover)
	                if (storeIndex < 0) {
	                    return;
	                }

	                // update the event in the store
	                store[storeIndex] = ev;

	                this.callback(this.manager, eventType, {
	                    pointers: store,
	                    changedPointers: [ev],
	                    pointerType: pointerType,
	                    srcEvent: ev
	                });

	                if (removePointer) {
	                    // remove from the store
	                    store.splice(storeIndex, 1);
	                }
	            }
	        }]);
	        return PointerEventInput;
	    }(Input);

	    /**
	     * @private
	     * convert array-like objects to real arrays
	     * @param {Object} obj
	     * @returns {Array}
	     */
	    function toArray$1(obj) {
	        return Array.prototype.slice.call(obj, 0);
	    }

	    /**
	     * @private
	     * unique array with objects based on a key (like 'id') or just by the array's value
	     * @param {Array} src [{id:1},{id:2},{id:1}]
	     * @param {String} [key]
	     * @param {Boolean} [sort=False]
	     * @returns {Array} [{id:1},{id:2}]
	     */
	    function uniqueArray(src, key, sort) {
	        var results = [];
	        var values = [];
	        var i = 0;

	        while (i < src.length) {
	            var val = key ? src[i][key] : src[i];
	            if (inArray(values, val) < 0) {
	                results.push(src[i]);
	            }
	            values[i] = val;
	            i++;
	        }

	        if (sort) {
	            if (!key) {
	                results = results.sort();
	            } else {
	                results = results.sort(function(a, b) {
	                    return a[key] > b[key];
	                });
	            }
	        }

	        return results;
	    }

	    var TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };

	    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	    /**
	     * @private
	     * Multi-user touch events input
	     * @constructor
	     * @extends Input
	     */

	    var TouchInput = function(_Input) {
	        inherits(TouchInput, _Input);

	        function TouchInput() {
	            classCallCheck(this, TouchInput);

	            TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
	            TouchInput.prototype.targetIds = {};

	            var _this = possibleConstructorReturn(this, (TouchInput.__proto__ || Object.getPrototypeOf(TouchInput)).apply(this, arguments));

	            _this.evTarget = TOUCH_TARGET_EVENTS;
	            _this.targetIds = {};
	            return _this;
	        }

	        createClass(TouchInput, [{
	            key: 'handler',
	            value: function handler(ev) {
	                var type = TOUCH_INPUT_MAP[ev.type];
	                var touches = getTouches.call(this, ev, type);
	                if (!touches) {
	                    return;
	                }

	                this.callback(this.manager, type, {
	                    pointers: touches[0],
	                    changedPointers: touches[1],
	                    pointerType: INPUT_TYPE_TOUCH,
	                    srcEvent: ev
	                });
	            }
	        }]);
	        return TouchInput;
	    }(Input);

	    function getTouches(ev, type) {
	        var allTouches = toArray$1(ev.touches);
	        var targetIds = this.targetIds;

	        // when there is only one touch, the process can be simplified

	        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	            targetIds[allTouches[0].identifier] = true;
	            return [allTouches, allTouches];
	        }

	        var i = void 0;
	        var targetTouches = void 0;
	        var changedTouches = toArray$1(ev.changedTouches);
	        var changedTargetTouches = [];
	        var target = this.target;

	        // get target touches from touches

	        targetTouches = allTouches.filter(function(touch) {
	            return hasParent(touch.target, target);
	        });

	        // collect touches
	        if (type === INPUT_START) {
	            i = 0;
	            while (i < targetTouches.length) {
	                targetIds[targetTouches[i].identifier] = true;
	                i++;
	            }
	        }

	        // filter changed touches to only contain touches that exist in the collected target ids
	        i = 0;
	        while (i < changedTouches.length) {
	            if (targetIds[changedTouches[i].identifier]) {
	                changedTargetTouches.push(changedTouches[i]);
	            }

	            // cleanup removed touches
	            if (type & (INPUT_END | INPUT_CANCEL)) {
	                delete targetIds[changedTouches[i].identifier];
	            }
	            i++;
	        }

	        if (!changedTargetTouches.length) {
	            return;
	        }

	        return [
	            // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	            uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches
	        ];
	    }

	    var MOUSE_INPUT_MAP = {
	        mousedown: INPUT_START,
	        mousemove: INPUT_MOVE,
	        mouseup: INPUT_END
	    };

	    var MOUSE_ELEMENT_EVENTS = 'mousedown';
	    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	    /**
	     * @private
	     * Mouse events input
	     * @constructor
	     * @extends Input
	     */

	    var MouseInput = function(_Input) {
	        inherits(MouseInput, _Input);

	        function MouseInput() {
	            classCallCheck(this, MouseInput);

	            var _this = possibleConstructorReturn(this, (MouseInput.__proto__ || Object.getPrototypeOf(MouseInput)).apply(this, arguments));

	            _this.evEl = MOUSE_ELEMENT_EVENTS;
	            _this.evWin = MOUSE_WINDOW_EVENTS;

	            _this.pressed = false; // mousedown state
	            return _this;
	        }

	        /**
	         * @private
	         * handle mouse events
	         * @param {Object} ev
	         */


	        createClass(MouseInput, [{
	            key: 'handler',
	            value: function handler(ev) {
	                var eventType = MOUSE_INPUT_MAP[ev.type];

	                // on start we want to have the left mouse button down
	                if (eventType & INPUT_START && ev.button === 0) {
	                    this.pressed = true;
	                }

	                if (eventType & INPUT_MOVE && ev.which !== 1) {
	                    eventType = INPUT_END;
	                }

	                // mouse must be down
	                if (!this.pressed) {
	                    return;
	                }

	                if (eventType & INPUT_END) {
	                    this.pressed = false;
	                }

	                this.callback(this.manager, eventType, {
	                    pointers: [ev],
	                    changedPointers: [ev],
	                    pointerType: INPUT_TYPE_MOUSE,
	                    srcEvent: ev
	                });
	            }
	        }]);
	        return MouseInput;
	    }(Input);

	    /**
	     * @private
	     * Combined touch and mouse input
	     *
	     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	     * This because touch devices also emit mouse events while doing a touch.
	     *
	     * @constructor
	     * @extends Input
	     */

	    var DEDUP_TIMEOUT = 2500;
	    var DEDUP_DISTANCE = 25;

	    var TouchMouseInput = function(_Input) {
	        inherits(TouchMouseInput, _Input);

	        function TouchMouseInput() {
	            classCallCheck(this, TouchMouseInput);

	            var _this = possibleConstructorReturn(this, (TouchMouseInput.__proto__ || Object.getPrototypeOf(TouchMouseInput)).apply(this, arguments));

	            var handler = bindFn(_this.handler, _this);
	            _this.touch = new TouchInput(_this.manager, handler);
	            _this.mouse = new MouseInput(_this.manager, handler);

	            _this.primaryTouch = null;
	            _this.lastTouches = [];
	            return _this;
	        }

	        /**
	         * @private
	         * handle mouse and touch events
	         * @param {Hammer} manager
	         * @param {String} inputEvent
	         * @param {Object} inputData
	         */


	        createClass(TouchMouseInput, [{
	            key: 'handler',
	            value: function handler(manager, inputEvent, inputData) {
	                var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
	                var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

	                if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	                    return;
	                }

	                // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	                if (isTouch) {
	                    recordTouches.call(this, inputEvent, inputData);
	                } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	                    return;
	                }

	                this.callback(manager, inputEvent, inputData);
	            }

	            /**
	             * @private
	             * remove the event listeners
	             */

	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                this.touch.destroy();
	                this.mouse.destroy();
	            }
	        }]);
	        return TouchMouseInput;
	    }(Input);

	    function recordTouches(eventType, eventData) {
	        if (eventType & INPUT_START) {
	            this.primaryTouch = eventData.changedPointers[0].identifier;
	            setLastTouch.call(this, eventData);
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            setLastTouch.call(this, eventData);
	        }
	    }

	    function setLastTouch(eventData) {
	        var _this2 = this;

	        var _eventData$changedPoi = slicedToArray(eventData.changedPointers, 1);

	        var touch = _eventData$changedPoi[0];

	        if (touch.identifier === this.primaryTouch) {
	            (function() {
	                var lastTouch = { x: touch.clientX, y: touch.clientY };
	                _this2.lastTouches.push(lastTouch);
	                var lts = _this2.lastTouches;
	                var removeLastTouch = function removeLastTouch() {
	                    var i = lts.indexOf(lastTouch);
	                    if (i > -1) {
	                        lts.splice(i, 1);
	                    }
	                };
	                setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	            })();
	        }
	    }

	    function isSyntheticEvent(eventData) {
	        var x = eventData.srcEvent.clientX;
	        var y = eventData.srcEvent.clientY;
	        for (var i = 0; i < this.lastTouches.length; i++) {
	            var t = this.lastTouches[i];
	            var dx = Math.abs(x - t.x);
	            var dy = Math.abs(y - t.y);
	            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	                return true;
	            }
	        }
	        return false;
	    }

	    /**
	     * @private
	     * create new input type manager
	     * called by the Manager constructor
	     * @param {Hammer} manager
	     * @returns {Input}
	     */
	    function createInputInstance(manager) {
	        var Type = void 0;
	        // let inputClass = manager.options.inputClass;
	        var inputClass = manager.options.inputClass;

	        if (inputClass) {
	            Type = inputClass;
	        } else if (SUPPORT_POINTER_EVENTS) {
	            Type = PointerEventInput;
	        } else if (SUPPORT_ONLY_TOUCH) {
	            Type = TouchInput;
	        } else if (!SUPPORT_TOUCH) {
	            Type = MouseInput;
	        } else {
	            Type = TouchMouseInput;
	        }
	        return new Type(manager, inputHandler);
	    }

	    var STOP = 1;
	    var FORCED_STOP = 2;

	    /**
	     * @private
	     * Manager
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */

	    var Manager = function() {
	        function Manager(element, options) {
	            var _this = this;

	            classCallCheck(this, Manager);

	            this.options = assign$1({}, Hammer.defaults, options || {});

	            this.options.inputTarget = this.options.inputTarget || element;

	            this.handlers = {};
	            this.session = {};
	            this.recognizers = [];
	            this.oldCssProps = {};

	            this.element = element;
	            this.input = createInputInstance(this);
	            this.touchAction = new TouchAction(this, this.options.touchAction);

	            toggleCssProps(this, true);

	            each(this.options.recognizers, function(item) {
	                var recognizer = _this.add(new item[0](item[1]));
	                item[2] && recognizer.recognizeWith(item[2]);
	                item[3] && recognizer.requireFailure(item[3]);
	            }, this);
	        }

	        /**
	         * @private
	         * set options
	         * @param {Object} options
	         * @returns {Manager}
	         */


	        createClass(Manager, [{
	            key: 'set',
	            value: function set(options) {
	                assign$1(this.options, options);

	                // Options that need a little more setup
	                if (options.touchAction) {
	                    this.touchAction.update();
	                }
	                if (options.inputTarget) {
	                    // Clean up existing event listeners and reinitialize
	                    this.input.destroy();
	                    this.input.target = options.inputTarget;
	                    this.input.init();
	                }
	                return this;
	            }

	            /**
	             * @private
	             * stop recognizing for this session.
	             * This session will be discarded, when a new [input]start event is fired.
	             * When forced, the recognizer cycle is stopped immediately.
	             * @param {Boolean} [force]
	             */

	        }, {
	            key: 'stop',
	            value: function stop(force) {
	                this.session.stopped = force ? FORCED_STOP : STOP;
	            }

	            /**
	             * @private
	             * run the recognizers!
	             * called by the inputHandler function on every movement of the pointers (touches)
	             * it walks through all the recognizers and tries to detect the gesture that is being made
	             * @param {Object} inputData
	             */

	        }, {
	            key: 'recognize',
	            value: function recognize(inputData) {
	                var session = this.session;

	                if (session.stopped) {
	                    return;
	                }

	                // run the touch-action polyfill
	                this.touchAction.preventDefaults(inputData);

	                var recognizer = void 0;
	                var recognizers = this.recognizers;

	                // this holds the recognizer that is being recognized.
	                // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	                // if no recognizer is detecting a thing, it is set to `null`

	                var curRecognizer = session.curRecognizer;

	                // reset when the last recognizer is recognized
	                // or when we're in a new session

	                if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	                    curRecognizer = session.curRecognizer = null;
	                }

	                var i = 0;
	                while (i < recognizers.length) {
	                    recognizer = recognizers[i];

	                    // find out if we are allowed try to recognize the input for this one.
	                    // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	                    // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	                    //      that is being recognized.
	                    // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	                    //      this can be setup with the `recognizeWith()` method on the recognizer.
	                    if (session.stopped !== FORCED_STOP && ( // 1
	                            !curRecognizer || recognizer === curRecognizer || // 2
	                            recognizer.canRecognizeWith(curRecognizer))) {
	                        // 3
	                        recognizer.recognize(inputData);
	                    } else {
	                        recognizer.reset();
	                    }

	                    // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	                    // current active recognizer. but only if we don't already have an active recognizer
	                    if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                        curRecognizer = session.curRecognizer = recognizer;
	                    }
	                    i++;
	                }
	            }

	            /**
	             * @private
	             * get a recognizer by its event name.
	             * @param {Recognizer|String} recognizer
	             * @returns {Recognizer|Null}
	             */

	        }, {
	            key: 'get',
	            value: function get(recognizer) {
	                if (recognizer instanceof Recognizer) {
	                    return recognizer;
	                }

	                var recognizers = this.recognizers;

	                for (var i = 0; i < recognizers.length; i++) {
	                    if (recognizers[i].options.event === recognizer) {
	                        return recognizers[i];
	                    }
	                }
	                return null;
	            }

	            /**
	             * @private add a recognizer to the manager
	             * existing recognizers with the same event name will be removed
	             * @param {Recognizer} recognizer
	             * @returns {Recognizer|Manager}
	             */

	        }, {
	            key: 'add',
	            value: function add(recognizer) {
	                if (invokeArrayArg(recognizer, 'add', this)) {
	                    return this;
	                }

	                // remove existing
	                var existing = this.get(recognizer.options.event);
	                if (existing) {
	                    this.remove(existing);
	                }

	                this.recognizers.push(recognizer);
	                recognizer.manager = this;

	                this.touchAction.update();
	                return recognizer;
	            }

	            /**
	             * @private
	             * remove a recognizer by name or instance
	             * @param {Recognizer|String} recognizer
	             * @returns {Manager}
	             */

	        }, {
	            key: 'remove',
	            value: function remove(recognizer) {
	                if (invokeArrayArg(recognizer, 'remove', this)) {
	                    return this;
	                }

	                recognizer = this.get(recognizer);

	                // let's make sure this recognizer exists
	                if (recognizer) {
	                    var recognizers = this.recognizers;

	                    var index = inArray(recognizers, recognizer);

	                    if (index !== -1) {
	                        recognizers.splice(index, 1);
	                        this.touchAction.update();
	                    }
	                }

	                return this;
	            }

	            /**
	             * @private
	             * bind event
	             * @param {String} events
	             * @param {Function} handler
	             * @returns {EventEmitter} this
	             */

	        }, {
	            key: 'on',
	            value: function on(events, handler) {
	                if (events === undefined) {
	                    return;
	                }
	                if (handler === undefined) {
	                    return;
	                }

	                var handlers = this.handlers;

	                each(splitStr(events), function(event) {
	                    handlers[event] = handlers[event] || [];
	                    handlers[event].push(handler);
	                });
	                return this;
	            }

	            /**
	             * @private unbind event, leave emit blank to remove all handlers
	             * @param {String} events
	             * @param {Function} [handler]
	             * @returns {EventEmitter} this
	             */

	        }, {
	            key: 'off',
	            value: function off(events, handler) {
	                if (events === undefined) {
	                    return;
	                }

	                var handlers = this.handlers;

	                each(splitStr(events), function(event) {
	                    if (!handler) {
	                        delete handlers[event];
	                    } else {
	                        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	                    }
	                });
	                return this;
	            }

	            /**
	             * @private emit event to the listeners
	             * @param {String} event
	             * @param {Object} data
	             */

	        }, {
	            key: 'emit',
	            value: function emit(event, data) {
	                // we also want to trigger dom events
	                if (this.options.domEvents) {
	                    triggerDomEvent(event, data);
	                }

	                // no handlers, so skip it all
	                var handlers = this.handlers[event] && this.handlers[event].slice();
	                if (!handlers || !handlers.length) {
	                    return;
	                }

	                data.type = event;
	                data.preventDefault = function() {
	                    data.srcEvent.preventDefault();
	                };

	                var i = 0;
	                while (i < handlers.length) {
	                    handlers[i](data);
	                    i++;
	                }
	            }

	            /**
	             * @private
	             * destroy the manager and unbinds all events
	             * it doesn't unbind dom events, that is the user own responsibility
	             */

	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                this.element && toggleCssProps(this, false);

	                this.handlers = {};
	                this.session = {};
	                this.input.destroy();
	                this.element = null;
	            }
	        }]);
	        return Manager;
	    }();

	    function toggleCssProps(manager, add) {
	        var element = manager.element;

	        if (!element.style) {
	            return;
	        }
	        var prop = void 0;
	        each(manager.options.cssProps, function(value, name) {
	            prop = prefixed(element.style, name);
	            if (add) {
	                manager.oldCssProps[prop] = element.style[prop];
	                element.style[prop] = value;
	            } else {
	                element.style[prop] = manager.oldCssProps[prop] || '';
	            }
	        });
	        if (!add) {
	            manager.oldCssProps = {};
	        }
	    }

	    /**
	     * @private
	     * trigger dom event
	     * @param {String} event
	     * @param {Object} data
	     */
	    function triggerDomEvent(event, data) {
	        var gestureEvent = document.createEvent('Event');
	        gestureEvent.initEvent(event, true, true);
	        gestureEvent.gesture = data;
	        data.target.dispatchEvent(gestureEvent);
	    }

	    /**
	     * @private
	     * Simple way to create a manager with a default set of recognizers.
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */

	    var Hammer = function Hammer(element, options) {
	        classCallCheck(this, Hammer);

	        options = options || {};
	        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	        return new Manager(element, options);
	    };

	    Hammer.VERSION = '2.0.8';

	    /**
	     * @private
	     * default settings
	     * @namespace
	     */
	    Hammer.defaults = {
	        /**
	         * @private
	         * set if DOM events are being triggered.
	         * But this is slower and unused by simple implementations, so disabled by default.
	         * @type {Boolean}
	         * @default false
	         */
	        domEvents: false,

	        /**
	         * @private
	         * The value for the touchAction property/fallback.
	         * When set to `compute` it will magically set the correct value based on the added recognizers.
	         * @type {String}
	         * @default compute
	         */
	        touchAction: TOUCH_ACTION_COMPUTE,

	        /**
	         * @private
	         * @type {Boolean}
	         * @default true
	         */
	        enable: true,

	        /**
	         * @private
	         * EXPERIMENTAL FEATURE -- can be removed/changed
	         * Change the parent input target element.
	         * If Null, then it is being set the to main element.
	         * @type {Null|EventTarget}
	         * @default null
	         */
	        inputTarget: null,

	        /**
	         * @private
	         * force an input class
	         * @type {Null|Function}
	         * @default null
	         */
	        inputClass: null,

	        /**
	         * @private
	         * Default recognizer setup when calling `Hammer()`
	         * When creating a new Manager these will be skipped.
	         * @type {Array}
	         */
	        preset: [
	            // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	            [RotateRecognizer, { enable: false }],
	            [PinchRecognizer, { enable: false },
	                ['rotate']
	            ],
	            [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }],
	            [PanRecognizer, { direction: DIRECTION_HORIZONTAL },
	                ['swipe']
	            ],
	            [TapRecognizer],
	            [TapRecognizer, { event: 'doubletap', taps: 2 },
	                ['tap']
	            ],
	            [PressRecognizer]
	        ],

	        /**
	         * @private
	         * Some CSS properties can be used to improve the working of Hammer.
	         * Add them to this method and they will be set when creating a new Manager.
	         * @namespace
	         */
	        cssProps: {
	            /**
	             * @private
	             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	             * @type {String}
	             * @default 'none'
	             */
	            userSelect: 'none',

	            /**
	             * @private
	             * Disable the Windows Phone grippers when pressing an element.
	             * @type {String}
	             * @default 'none'
	             */
	            touchSelect: 'none',

	            /**
	             * @private
	             * Disables the default callout shown when you touch and hold a touch target.
	             * On iOS, when you touch and hold a touch target such as a link, Safari displays
	             * a callout containing information about the link. This property allows you to disable that callout.
	             * @type {String}
	             * @default 'none'
	             */
	            touchCallout: 'none',

	            /**
	             * @private
	             * Specifies whether zooming is enabled. Used by IE10>
	             * @type {String}
	             * @default 'none'
	             */
	            contentZooming: 'none',

	            /**
	             * @private
	             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	             * @type {String}
	             * @default 'none'
	             */
	            userDrag: 'none',

	            /**
	             * @private
	             * Overrides the highlight color shown when the user taps a link or a JavaScript
	             * clickable element in iOS. This property obeys the alpha value, if specified.
	             * @type {String}
	             * @default 'rgba(0,0,0,0)'
	             */
	            tapHighlightColor: 'rgba(0,0,0,0)'
	        }
	    };

	    var SINGLE_TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };

	    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	    /**
	     * @private
	     * Touch events input
	     * @constructor
	     * @extends Input
	     */

	    var SingleTouchInput = function(_Input) {
	        inherits(SingleTouchInput, _Input);

	        function SingleTouchInput() {
	            classCallCheck(this, SingleTouchInput);

	            var _this = possibleConstructorReturn(this, (SingleTouchInput.__proto__ || Object.getPrototypeOf(SingleTouchInput)).apply(this, arguments));

	            _this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	            _this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	            _this.started = false;

	            Input.apply(_this, arguments);
	            return _this;
	        }

	        createClass(SingleTouchInput, [{
	            key: 'handler',
	            value: function handler(ev) {
	                var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	                // should we handle the touch events?
	                if (type === INPUT_START) {
	                    this.started = true;
	                }

	                if (!this.started) {
	                    return;
	                }

	                var touches = normalizeSingleTouches.call(this, ev, type);

	                // when done, reset the started state
	                if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	                    this.started = false;
	                }

	                this.callback(this.manager, type, {
	                    pointers: touches[0],
	                    changedPointers: touches[1],
	                    pointerType: INPUT_TYPE_TOUCH,
	                    srcEvent: ev
	                });
	            }
	        }]);
	        return SingleTouchInput;
	    }(Input);

	    function normalizeSingleTouches(ev, type) {
	        var all = toArray$1(ev.touches);
	        var changed = toArray$1(ev.changedTouches);

	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            all = uniqueArray(all.concat(changed), 'identifier', true);
	        }

	        return [all, changed];
	    }

	    /**
	     * @private
	     * wrap a method with a deprecation warning and stack trace
	     * @param {Function} method
	     * @param {String} name
	     * @param {String} message
	     * @returns {Function} A new function wrapping the supplied method.
	     */
	    function deprecate(method, name, message) {
	        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	        return function() {
	            var e = new Error('get-stack-trace');
	            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	            var log = window.console && (window.console.warn || window.console.log);
	            if (log) {
	                log.call(window.console, deprecationMessage, stack);
	            }
	            return method.apply(this, arguments);
	        };
	    }

	    /**
	     * @private
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} dest
	     * @param {Object} src
	     * @param {Boolean} [merge=false]
	     * @returns {Object} dest
	     */
	    var extend = deprecate(function(dest, src, merge) {
	        var keys = Object.keys(src);
	        var i = 0;
	        while (i < keys.length) {
	            if (!merge || merge && dest[keys[i]] === undefined) {
	                dest[keys[i]] = src[keys[i]];
	            }
	            i++;
	        }
	        return dest;
	    }, 'extend', 'Use `assign`.');

	    /**
	     * @private
	     * merge the values from src in the dest.
	     * means that properties that exist in dest will not be overwritten by src
	     * @param {Object} dest
	     * @param {Object} src
	     * @returns {Object} dest
	     */
	    var merge = deprecate(function(dest, src) {
	        return extend(dest, src, true);
	    }, 'merge', 'Use `assign`.');

	    /**
	     * @private
	     * simple class inheritance
	     * @param {Function} child
	     * @param {Function} base
	     * @param {Object} [properties]
	     */
	    function inherit(child, base, properties) {
	        var baseP = base.prototype;
	        var childP = void 0;

	        childP = child.prototype = Object.create(baseP);
	        childP.constructor = child;
	        childP._super = baseP;

	        if (properties) {
	            assign$1(childP, properties);
	        }
	    }

	    // this prevents errors when Hammer is loaded in the presence of an AMD
	    //  style loader but by script tag, not by the loader.

	    assign$1(Hammer, {
	        INPUT_START: INPUT_START,
	        INPUT_MOVE: INPUT_MOVE,
	        INPUT_END: INPUT_END,
	        INPUT_CANCEL: INPUT_CANCEL,

	        STATE_POSSIBLE: STATE_POSSIBLE,
	        STATE_BEGAN: STATE_BEGAN,
	        STATE_CHANGED: STATE_CHANGED,
	        STATE_ENDED: STATE_ENDED,
	        STATE_RECOGNIZED: STATE_RECOGNIZED,
	        STATE_CANCELLED: STATE_CANCELLED,
	        STATE_FAILED: STATE_FAILED,

	        DIRECTION_NONE: DIRECTION_NONE,
	        DIRECTION_LEFT: DIRECTION_LEFT,
	        DIRECTION_RIGHT: DIRECTION_RIGHT,
	        DIRECTION_UP: DIRECTION_UP,
	        DIRECTION_DOWN: DIRECTION_DOWN,
	        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	        DIRECTION_ALL: DIRECTION_ALL,

	        Manager: Manager,
	        Input: Input,
	        TouchAction: TouchAction,

	        TouchInput: TouchInput,
	        MouseInput: MouseInput,
	        PointerEventInput: PointerEventInput,
	        TouchMouseInput: TouchMouseInput,
	        SingleTouchInput: SingleTouchInput,

	        Recognizer: Recognizer,
	        AttrRecognizer: AttrRecognizer,
	        Tap: TapRecognizer,
	        Pan: PanRecognizer,
	        Swipe: SwipeRecognizer,
	        Pinch: PinchRecognizer,
	        Rotate: RotateRecognizer,
	        Press: PressRecognizer,

	        on: addEventListeners,
	        off: removeEventListeners,
	        each: each,
	        merge: merge,
	        extend: extend,
	        assign: assign$1,
	        inherit: inherit,
	        bindFn: bindFn,
	        prefixed: prefixed,
	        toArray: toArray$1,
	        inArray: inArray,
	        uniqueArray: uniqueArray,
	        splitStr: splitStr,
	        boolOrFn: boolOrFn,
	        hasParent: hasParent,
	        addEventListeners: addEventListeners,
	        removeEventListeners: removeEventListeners
	    });

	    /* jshint ignore:start */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Hammer;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Hammer;
	    } else {
	        window[exportName] = Hammer;
	    }
	    /* jshint ignore:end */
	})(window, document, 'Hammer');


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery) {/*! VelocityJS.org (1.4.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

	/*************************
	 Velocity jQuery Shim
	 *************************/

	/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

	/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
	/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
	/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */

	(function(window) {
		"use strict";
		/***************
		 Setup
		 ***************/

		/* If jQuery is already loaded, there's no point in loading this shim. */
		if (__webpack_provided_window_dot_jQuery) {
			return;
		}

		/* jQuery base. */
		var $ = function(selector, context) {
			return new $.fn.init(selector, context);
		};

		/********************
		 Private Methods
		 ********************/

		/* jQuery */
		$.isWindow = function(obj) {
			/* jshint eqeqeq: false */
			return obj && obj === obj.window;
		};

		/* jQuery */
		$.type = function(obj) {
			if (!obj) {
				return obj + "";
			}

			return typeof obj === "object" || typeof obj === "function" ?
					class2type[toString.call(obj)] || "object" :
					typeof obj;
		};

		/* jQuery */
		$.isArray = Array.isArray || function(obj) {
			return $.type(obj) === "array";
		};

		/* jQuery */
		function isArraylike(obj) {
			var length = obj.length,
					type = $.type(obj);

			if (type === "function" || $.isWindow(obj)) {
				return false;
			}

			if (obj.nodeType === 1 && length) {
				return true;
			}

			return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
		}

		/***************
		 $ Methods
		 ***************/

		/* jQuery: Support removed for IE<9. */
		$.isPlainObject = function(obj) {
			var key;

			if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
				return false;
			}

			try {
				if (obj.constructor &&
						!hasOwn.call(obj, "constructor") &&
						!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch (e) {
				return false;
			}

			for (key in obj) {
			}

			return key === undefined || hasOwn.call(obj, key);
		};

		/* jQuery */
		$.each = function(obj, callback, args) {
			var value,
					i = 0,
					length = obj.length,
					isArray = isArraylike(obj);

			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						if (!obj.hasOwnProperty(i)) {
							continue;
						}
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				}

			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						if (!obj.hasOwnProperty(i)) {
							continue;
						}
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				}
			}

			return obj;
		};

		/* Custom */
		$.data = function(node, key, value) {
			/* $.getData() */
			if (value === undefined) {
				var getId = node[$.expando],
						store = getId && cache[getId];

				if (key === undefined) {
					return store;
				} else if (store) {
					if (key in store) {
						return store[key];
					}
				}
				/* $.setData() */
			} else if (key !== undefined) {
				var setId = node[$.expando] || (node[$.expando] = ++$.uuid);

				cache[setId] = cache[setId] || {};
				cache[setId][key] = value;

				return value;
			}
		};

		/* Custom */
		$.removeData = function(node, keys) {
			var id = node[$.expando],
					store = id && cache[id];

			if (store) {
				// Cleanup the entire store if no keys are provided.
				if (!keys) {
					delete cache[id];
				} else {
					$.each(keys, function(_, key) {
						delete store[key];
					});
				}
			}
		};

		/* jQuery */
		$.extend = function() {
			var src, copyIsArray, copy, name, options, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = false;

			if (typeof target === "boolean") {
				deep = target;

				target = arguments[i] || {};
				i++;
			}

			if (typeof target !== "object" && $.type(target) !== "function") {
				target = {};
			}

			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				if ((options = arguments[i])) {
					for (name in options) {
						if (!options.hasOwnProperty(name)) {
							continue;
						}
						src = target[name];
						copy = options[name];

						if (target === copy) {
							continue;
						}

						if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && $.isArray(src) ? src : [];

							} else {
								clone = src && $.isPlainObject(src) ? src : {};
							}

							target[name] = $.extend(deep, clone, copy);

						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;
		};

		/* jQuery 1.4.3 */
		$.queue = function(elem, type, data) {
			function $makeArray(arr, results) {
				var ret = results || [];

				if (arr) {
					if (isArraylike(Object(arr))) {
						/* $.merge */
						(function(first, second) {
							var len = +second.length,
									j = 0,
									i = first.length;

							while (j < len) {
								first[i++] = second[j++];
							}

							if (len !== len) {
								while (second[j] !== undefined) {
									first[i++] = second[j++];
								}
							}

							first.length = i;

							return first;
						})(ret, typeof arr === "string" ? [arr] : arr);
					} else {
						[].push.call(ret, arr);
					}
				}

				return ret;
			}

			if (!elem) {
				return;
			}

			type = (type || "fx") + "queue";

			var q = $.data(elem, type);

			if (!data) {
				return q || [];
			}

			if (!q || $.isArray(data)) {
				q = $.data(elem, type, $makeArray(data));
			} else {
				q.push(data);
			}

			return q;
		};

		/* jQuery 1.4.3 */
		$.dequeue = function(elems, type) {
			/* Custom: Embed element iteration. */
			$.each(elems.nodeType ? [elems] : elems, function(i, elem) {
				type = type || "fx";

				var queue = $.queue(elem, type),
						fn = queue.shift();

				if (fn === "inprogress") {
					fn = queue.shift();
				}

				if (fn) {
					if (type === "fx") {
						queue.unshift("inprogress");
					}

					fn.call(elem, function() {
						$.dequeue(elem, type);
					});
				}
			});
		};

		/******************
		 $.fn Methods
		 ******************/

		/* jQuery */
		$.fn = $.prototype = {
			init: function(selector) {
				/* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
				if (selector.nodeType) {
					this[0] = selector;

					return this;
				} else {
					throw new Error("Not a DOM node.");
				}
			},
			offset: function() {
				/* jQuery altered code: Dropped disconnected DOM node checking. */
				var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {top: 0, left: 0};

				return {
					top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
					left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
				};
			},
			position: function() {
				/* jQuery */
				function offsetParentFn(elem) {
					var offsetParent = elem.offsetParent;

					while (offsetParent && offsetParent.nodeName.toLowerCase() !== "html" && offsetParent.style && offsetParent.style.position === "static") {
						offsetParent = offsetParent.offsetParent;
					}

					return offsetParent || document;
				}

				/* Zepto */
				var elem = this[0],
						offsetParent = offsetParentFn(elem),
						offset = this.offset(),
						parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? {top: 0, left: 0} : $(offsetParent).offset();

				offset.top -= parseFloat(elem.style.marginTop) || 0;
				offset.left -= parseFloat(elem.style.marginLeft) || 0;

				if (offsetParent.style) {
					parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0;
					parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0;
				}

				return {
					top: offset.top - parentOffset.top,
					left: offset.left - parentOffset.left
				};
			}
		};

		/**********************
		 Private Variables
		 **********************/

		/* For $.data() */
		var cache = {};
		$.expando = "velocity" + (new Date().getTime());
		$.uuid = 0;

		/* For $.queue() */
		var class2type = {},
				hasOwn = class2type.hasOwnProperty,
				toString = class2type.toString;

		var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
		for (var i = 0; i < types.length; i++) {
			class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
		}

		/* Makes $(node) possible, without having to call init. */
		$.fn.init.prototype = $.fn;

		/* Globalize Velocity onto the window, and assign its Utilities property. */
		window.Velocity = {Utilities: $};
	})(window);

	/******************
	 Velocity.js
	 ******************/

	(function(factory) {
		"use strict";
		/* CommonJS module. */
		if (typeof module === "object" && typeof module.exports === "object") {
			module.exports = factory();
			/* AMD module. */
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			/* Browser globals. */
		} else {
			factory();
		}
	}(function() {
		"use strict";
		return function(global, window, document, undefined) {

			/***************
			 Summary
			 ***************/

			/*
			 - CSS: CSS stack that works independently from the rest of Velocity.
			 - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
			 - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
			 - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
			 Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
			 - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
			 - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
			 - completeCall(): Handles the cleanup process for each Velocity call.
			 */

			/*********************
			 Helper Functions
			 *********************/

			/* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
			var IE = (function() {
				if (document.documentMode) {
					return document.documentMode;
				} else {
					for (var i = 7; i > 4; i--) {
						var div = document.createElement("div");

						div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

						if (div.getElementsByTagName("span").length) {
							div = null;

							return i;
						}
					}
				}

				return undefined;
			})();

			/* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
			var rAFShim = (function() {
				var timeLast = 0;

				return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
					var timeCurrent = (new Date()).getTime(),
							timeDelta;

					/* Dynamically set delay on a per-tick basis to match 60fps. */
					/* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
					timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
					timeLast = timeCurrent + timeDelta;

					return setTimeout(function() {
						callback(timeCurrent + timeDelta);
					}, timeDelta);
				};
			})();

			var performance = (function() {
				var perf = window.performance || {};

				if (!perf.hasOwnProperty("now")) {
					var nowOffset = perf.timing && perf.timing.domComplete ? perf.timing.domComplete : (new Date()).getTime();

					perf.now = function() {
						return (new Date()).getTime() - nowOffset;
					};
				}
				return perf;
			})();

			/* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
			function compactSparseArray(array) {
				var index = -1,
						length = array ? array.length : 0,
						result = [];

				while (++index < length) {
					var value = array[index];

					if (value) {
						result.push(value);
					}
				}

				return result;
			}

			function sanitizeElements(elements) {
				/* Unwrap jQuery/Zepto objects. */
				if (Type.isWrapped(elements)) {
					elements = [].slice.call(elements);
					/* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
				} else if (Type.isNode(elements)) {
					elements = [elements];
				}

				return elements;
			}

			var Type = {
				isNumber: function(variable) {
					return (typeof variable === "number");
				},
				isString: function(variable) {
					return (typeof variable === "string");
				},
				isArray: Array.isArray || function(variable) {
					return Object.prototype.toString.call(variable) === "[object Array]";
				},
				isFunction: function(variable) {
					return Object.prototype.toString.call(variable) === "[object Function]";
				},
				isNode: function(variable) {
					return variable && variable.nodeType;
				},
				/* Determine if variable is an array-like wrapped jQuery, Zepto or similar element, or even a NodeList etc. */
				/* NOTE: HTMLFormElements also have a length. */
				isWrapped: function(variable) {
					return variable
							&& Type.isNumber(variable.length)
							&& !Type.isString(variable)
							&& !Type.isFunction(variable)
							&& !Type.isNode(variable)
							&& (variable.length === 0 || Type.isNode(variable[0]));
				},
				isSVG: function(variable) {
					return window.SVGElement && (variable instanceof window.SVGElement);
				},
				isEmptyObject: function(variable) {
					for (var name in variable) {
						if (variable.hasOwnProperty(name)) {
							return false;
						}
					}

					return true;
				}
			};

			/*****************
			 Dependencies
			 *****************/

			var $,
					isJQuery = false;

			if (global.fn && global.fn.jquery) {
				$ = global;
				isJQuery = true;
			} else {
				$ = window.Velocity.Utilities;
			}

			if (IE <= 8 && !isJQuery) {
				throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
			} else if (IE <= 7) {
				/* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
				jQuery.fn.velocity = jQuery.fn.animate;

				/* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
				return;
			}

			/*****************
			 Constants
			 *****************/

			var DURATION_DEFAULT = 400,
					EASING_DEFAULT = "swing";

			/*************
			 State
			 *************/

			var Velocity = {
				/* Container for page-wide Velocity state data. */
				State: {
					/* Detect mobile devices to determine if mobileHA should be turned on. */
					isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
					/* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
					isAndroid: /Android/i.test(navigator.userAgent),
					isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
					isChrome: window.chrome,
					isFirefox: /Firefox/i.test(navigator.userAgent),
					/* Create a cached element for re-use when checking for CSS property prefixes. */
					prefixElement: document.createElement("div"),
					/* Cache every prefix match to avoid repeating lookups. */
					prefixMatches: {},
					/* Cache the anchor used for animating window scrolling. */
					scrollAnchor: null,
					/* Cache the browser-specific property names associated with the scroll anchor. */
					scrollPropertyLeft: null,
					scrollPropertyTop: null,
					/* Keep track of whether our RAF tick is running. */
					isTicking: false,
					/* Container for every in-progress call to Velocity. */
					calls: [],
					delayedElements: {
						count: 0
					}
				},
				/* Velocity's custom CSS stack. Made global for unit testing. */
				CSS: {/* Defined below. */},
				/* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
				Utilities: $,
				/* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
				Redirects: {/* Manually registered by the user. */},
				Easings: {/* Defined below. */},
				/* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
				Promise: window.Promise,
				/* Velocity option defaults, which can be overriden by the user. */
				defaults: {
					queue: "",
					duration: DURATION_DEFAULT,
					easing: EASING_DEFAULT,
					begin: undefined,
					complete: undefined,
					progress: undefined,
					display: undefined,
					visibility: undefined,
					loop: false,
					delay: false,
					mobileHA: true,
					/* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
					_cacheValues: true,
					/* Advanced: Set to false if the promise should always resolve on empty element lists. */
					promiseRejectEmpty: true
				},
				/* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
				init: function(element) {
					$.data(element, "velocity", {
						/* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
						isSVG: Type.isSVG(element),
						/* Keep track of whether the element is currently being animated by Velocity.
						 This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
						isAnimating: false,
						/* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
						computedStyle: null,
						/* Tween data is cached for each animation on the element so that data can be passed across calls --
						 in particular, end values are used as subsequent start values in consecutive Velocity calls. */
						tweensContainer: null,
						/* The full root property values of each CSS hook being animated on this element are cached so that:
						 1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
						 2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
						rootPropertyValueCache: {},
						/* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
						transformCache: {}
					});
				},
				/* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
				hook: null, /* Defined below. */
				/* Velocity-wide animation time remapping for testing purposes. */
				mock: false,
				version: {major: 1, minor: 4, patch: 0},
				/* Set to 1 or 2 (most verbose) to output debug info to console. */
				debug: false,
				/* Use rAF high resolution timestamp when available */
				timestamp: true,
				/* Pause all animations */
				pauseAll: function(queueName) {
					var currentTime = (new Date()).getTime();

					$.each(Velocity.State.calls, function(i, activeCall) {

						if (activeCall) {

							/* If we have a queueName and this call is not on that queue, skip */
							if (queueName !== undefined && ((activeCall[2].queue !== queueName) || (activeCall[2].queue === false))) {
								return true;
							}

							/* Set call to paused */
							activeCall[5] = {
								resume: false
							};
						}
					});

					/* Pause timers on any currently delayed calls */
					$.each(Velocity.State.delayedElements, function(k, element) {
						if (!element) {
							return;
						}
						pauseDelayOnElement(element, currentTime);
					});
				},
				/* Resume all animations */
				resumeAll: function(queueName) {
					var currentTime = (new Date()).getTime();

					$.each(Velocity.State.calls, function(i, activeCall) {

						if (activeCall) {

							/* If we have a queueName and this call is not on that queue, skip */
							if (queueName !== undefined && ((activeCall[2].queue !== queueName) || (activeCall[2].queue === false))) {
								return true;
							}

							/* Set call to resumed if it was paused */
							if (activeCall[5]) {
								activeCall[5].resume = true;
							}
						}
					});
					/* Resume timers on any currently delayed calls */
					$.each(Velocity.State.delayedElements, function(k, element) {
						if (!element) {
							return;
						}
						resumeDelayOnElement(element, currentTime);
					});
				}
			};

			/* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
			if (window.pageYOffset !== undefined) {
				Velocity.State.scrollAnchor = window;
				Velocity.State.scrollPropertyLeft = "pageXOffset";
				Velocity.State.scrollPropertyTop = "pageYOffset";
			} else {
				Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
				Velocity.State.scrollPropertyLeft = "scrollLeft";
				Velocity.State.scrollPropertyTop = "scrollTop";
			}

			/* Shorthand alias for jQuery's $.data() utility. */
			function Data(element) {
				/* Hardcode a reference to the plugin name. */
				var response = $.data(element, "velocity");

				/* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
				return response === null ? undefined : response;
			}

			/**************
			 Delay Timer
			 **************/

			function pauseDelayOnElement(element, currentTime) {
				/* Check for any delay timers, and pause the set timeouts (while preserving time data)
				 to be resumed when the "resume" command is issued */
				var data = Data(element);
				if (data && data.delayTimer && !data.delayPaused) {
					data.delayRemaining = data.delay - currentTime + data.delayBegin;
					data.delayPaused = true;
					clearTimeout(data.delayTimer.setTimeout);
				}
			}

			function resumeDelayOnElement(element, currentTime) {
				/* Check for any paused timers and resume */
				var data = Data(element);
				if (data && data.delayTimer && data.delayPaused) {
					/* If the element was mid-delay, re initiate the timeout with the remaining delay */
					data.delayPaused = false;
					data.delayTimer.setTimeout = setTimeout(data.delayTimer.next, data.delayRemaining);
				}
			}



			/**************
			 Easing
			 **************/

			/* Step easing generator. */
			function generateStep(steps) {
				return function(p) {
					return Math.round(p * steps) * (1 / steps);
				};
			}

			/* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
			function generateBezier(mX1, mY1, mX2, mY2) {
				var NEWTON_ITERATIONS = 4,
						NEWTON_MIN_SLOPE = 0.001,
						SUBDIVISION_PRECISION = 0.0000001,
						SUBDIVISION_MAX_ITERATIONS = 10,
						kSplineTableSize = 11,
						kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
						float32ArraySupported = "Float32Array" in window;

				/* Must contain four arguments. */
				if (arguments.length !== 4) {
					return false;
				}

				/* Arguments must be numbers. */
				for (var i = 0; i < 4; ++i) {
					if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
						return false;
					}
				}

				/* X values must be in the [0, 1] range. */
				mX1 = Math.min(mX1, 1);
				mX2 = Math.min(mX2, 1);
				mX1 = Math.max(mX1, 0);
				mX2 = Math.max(mX2, 0);

				var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

				function A(aA1, aA2) {
					return 1.0 - 3.0 * aA2 + 3.0 * aA1;
				}
				function B(aA1, aA2) {
					return 3.0 * aA2 - 6.0 * aA1;
				}
				function C(aA1) {
					return 3.0 * aA1;
				}

				function calcBezier(aT, aA1, aA2) {
					return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
				}

				function getSlope(aT, aA1, aA2) {
					return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
				}

				function newtonRaphsonIterate(aX, aGuessT) {
					for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
						var currentSlope = getSlope(aGuessT, mX1, mX2);

						if (currentSlope === 0.0) {
							return aGuessT;
						}

						var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
						aGuessT -= currentX / currentSlope;
					}

					return aGuessT;
				}

				function calcSampleValues() {
					for (var i = 0; i < kSplineTableSize; ++i) {
						mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
					}
				}

				function binarySubdivide(aX, aA, aB) {
					var currentX, currentT, i = 0;

					do {
						currentT = aA + (aB - aA) / 2.0;
						currentX = calcBezier(currentT, mX1, mX2) - aX;
						if (currentX > 0.0) {
							aB = currentT;
						} else {
							aA = currentT;
						}
					} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

					return currentT;
				}

				function getTForX(aX) {
					var intervalStart = 0.0,
							currentSample = 1,
							lastSample = kSplineTableSize - 1;

					for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
						intervalStart += kSampleStepSize;
					}

					--currentSample;

					var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
							guessForT = intervalStart + dist * kSampleStepSize,
							initialSlope = getSlope(guessForT, mX1, mX2);

					if (initialSlope >= NEWTON_MIN_SLOPE) {
						return newtonRaphsonIterate(aX, guessForT);
					} else if (initialSlope === 0.0) {
						return guessForT;
					} else {
						return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
					}
				}

				var _precomputed = false;

				function precompute() {
					_precomputed = true;
					if (mX1 !== mY1 || mX2 !== mY2) {
						calcSampleValues();
					}
				}

				var f = function(aX) {
					if (!_precomputed) {
						precompute();
					}
					if (mX1 === mY1 && mX2 === mY2) {
						return aX;
					}
					if (aX === 0) {
						return 0;
					}
					if (aX === 1) {
						return 1;
					}

					return calcBezier(getTForX(aX), mY1, mY2);
				};

				f.getControlPoints = function() {
					return [{x: mX1, y: mY1}, {x: mX2, y: mY2}];
				};

				var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
				f.toString = function() {
					return str;
				};

				return f;
			}

			/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
			/* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
			 then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
			var generateSpringRK4 = (function() {
				function springAccelerationForState(state) {
					return (-state.tension * state.x) - (state.friction * state.v);
				}

				function springEvaluateStateWithDerivative(initialState, dt, derivative) {
					var state = {
						x: initialState.x + derivative.dx * dt,
						v: initialState.v + derivative.dv * dt,
						tension: initialState.tension,
						friction: initialState.friction
					};

					return {dx: state.v, dv: springAccelerationForState(state)};
				}

				function springIntegrateState(state, dt) {
					var a = {
						dx: state.v,
						dv: springAccelerationForState(state)
					},
							b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
							c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
							d = springEvaluateStateWithDerivative(state, dt, c),
							dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
							dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

					state.x = state.x + dxdt * dt;
					state.v = state.v + dvdt * dt;

					return state;
				}

				return function springRK4Factory(tension, friction, duration) {

					var initState = {
						x: -1,
						v: 0,
						tension: null,
						friction: null
					},
							path = [0],
							time_lapsed = 0,
							tolerance = 1 / 10000,
							DT = 16 / 1000,
							have_duration, dt, last_state;

					tension = parseFloat(tension) || 500;
					friction = parseFloat(friction) || 20;
					duration = duration || null;

					initState.tension = tension;
					initState.friction = friction;

					have_duration = duration !== null;

					/* Calculate the actual time it takes for this animation to complete with the provided conditions. */
					if (have_duration) {
						/* Run the simulation without a duration. */
						time_lapsed = springRK4Factory(tension, friction);
						/* Compute the adjusted time delta. */
						dt = time_lapsed / duration * DT;
					} else {
						dt = DT;
					}

					while (true) {
						/* Next/step function .*/
						last_state = springIntegrateState(last_state || initState, dt);
						/* Store the position. */
						path.push(1 + last_state.x);
						time_lapsed += 16;
						/* If the change threshold is reached, break. */
						if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
							break;
						}
					}

					/* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
					 computed path and returns a snapshot of the position according to a given percentComplete. */
					return !have_duration ? time_lapsed : function(percentComplete) {
						return path[ (percentComplete * (path.length - 1)) | 0 ];
					};
				};
			}());

			/* jQuery easings. */
			Velocity.Easings = {
				linear: function(p) {
					return p;
				},
				swing: function(p) {
					return 0.5 - Math.cos(p * Math.PI) / 2;
				},
				/* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
				spring: function(p) {
					return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
				}
			};

			/* CSS3 and Robert Penner easings. */
			$.each(
					[
						["ease", [0.25, 0.1, 0.25, 1.0]],
						["ease-in", [0.42, 0.0, 1.00, 1.0]],
						["ease-out", [0.00, 0.0, 0.58, 1.0]],
						["ease-in-out", [0.42, 0.0, 0.58, 1.0]],
						["easeInSine", [0.47, 0, 0.745, 0.715]],
						["easeOutSine", [0.39, 0.575, 0.565, 1]],
						["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
						["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
						["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
						["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
						["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
						["easeOutCubic", [0.215, 0.61, 0.355, 1]],
						["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
						["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
						["easeOutQuart", [0.165, 0.84, 0.44, 1]],
						["easeInOutQuart", [0.77, 0, 0.175, 1]],
						["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
						["easeOutQuint", [0.23, 1, 0.32, 1]],
						["easeInOutQuint", [0.86, 0, 0.07, 1]],
						["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
						["easeOutExpo", [0.19, 1, 0.22, 1]],
						["easeInOutExpo", [1, 0, 0, 1]],
						["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
						["easeOutCirc", [0.075, 0.82, 0.165, 1]],
						["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]
					], function(i, easingArray) {
				Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
			});

			/* Determine the appropriate easing type given an easing input. */
			function getEasing(value, duration) {
				var easing = value;

				/* The easing option can either be a string that references a pre-registered easing,
				 or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
				if (Type.isString(value)) {
					/* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
					if (!Velocity.Easings[value]) {
						easing = false;
					}
				} else if (Type.isArray(value) && value.length === 1) {
					easing = generateStep.apply(null, value);
				} else if (Type.isArray(value) && value.length === 2) {
					/* springRK4 must be passed the animation's duration. */
					/* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
					 function generated with default tension and friction values. */
					easing = generateSpringRK4.apply(null, value.concat([duration]));
				} else if (Type.isArray(value) && value.length === 4) {
					/* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
					easing = generateBezier.apply(null, value);
				} else {
					easing = false;
				}

				/* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
				 if the Velocity-wide default has been incorrectly modified. */
				if (easing === false) {
					if (Velocity.Easings[Velocity.defaults.easing]) {
						easing = Velocity.defaults.easing;
					} else {
						easing = EASING_DEFAULT;
					}
				}

				return easing;
			}

			/*****************
			 CSS Stack
			 *****************/

			/* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
			 It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
			/* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
			var CSS = Velocity.CSS = {
				/*************
				 RegEx
				 *************/

				RegEx: {
					isHex: /^#([A-f\d]{3}){1,2}$/i,
					/* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
					valueUnwrap: /^[A-z]+\((.*)\)$/i,
					wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
					/* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
					valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
				},
				/************
				 Lists
				 ************/

				Lists: {
					colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
					transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
					transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
					units: [
						"%", // relative
						"em", "ex", "ch", "rem", // font relative
						"vw", "vh", "vmin", "vmax", // viewport relative
						"cm", "mm", "Q", "in", "pc", "pt", "px", // absolute lengths
						"deg", "grad", "rad", "turn", // angles
						"s", "ms" // time
					],
					colorNames: {
						"aliceblue": "240,248,255",
						"antiquewhite": "250,235,215",
						"aquamarine": "127,255,212",
						"aqua": "0,255,255",
						"azure": "240,255,255",
						"beige": "245,245,220",
						"bisque": "255,228,196",
						"black": "0,0,0",
						"blanchedalmond": "255,235,205",
						"blueviolet": "138,43,226",
						"blue": "0,0,255",
						"brown": "165,42,42",
						"burlywood": "222,184,135",
						"cadetblue": "95,158,160",
						"chartreuse": "127,255,0",
						"chocolate": "210,105,30",
						"coral": "255,127,80",
						"cornflowerblue": "100,149,237",
						"cornsilk": "255,248,220",
						"crimson": "220,20,60",
						"cyan": "0,255,255",
						"darkblue": "0,0,139",
						"darkcyan": "0,139,139",
						"darkgoldenrod": "184,134,11",
						"darkgray": "169,169,169",
						"darkgrey": "169,169,169",
						"darkgreen": "0,100,0",
						"darkkhaki": "189,183,107",
						"darkmagenta": "139,0,139",
						"darkolivegreen": "85,107,47",
						"darkorange": "255,140,0",
						"darkorchid": "153,50,204",
						"darkred": "139,0,0",
						"darksalmon": "233,150,122",
						"darkseagreen": "143,188,143",
						"darkslateblue": "72,61,139",
						"darkslategray": "47,79,79",
						"darkturquoise": "0,206,209",
						"darkviolet": "148,0,211",
						"deeppink": "255,20,147",
						"deepskyblue": "0,191,255",
						"dimgray": "105,105,105",
						"dimgrey": "105,105,105",
						"dodgerblue": "30,144,255",
						"firebrick": "178,34,34",
						"floralwhite": "255,250,240",
						"forestgreen": "34,139,34",
						"fuchsia": "255,0,255",
						"gainsboro": "220,220,220",
						"ghostwhite": "248,248,255",
						"gold": "255,215,0",
						"goldenrod": "218,165,32",
						"gray": "128,128,128",
						"grey": "128,128,128",
						"greenyellow": "173,255,47",
						"green": "0,128,0",
						"honeydew": "240,255,240",
						"hotpink": "255,105,180",
						"indianred": "205,92,92",
						"indigo": "75,0,130",
						"ivory": "255,255,240",
						"khaki": "240,230,140",
						"lavenderblush": "255,240,245",
						"lavender": "230,230,250",
						"lawngreen": "124,252,0",
						"lemonchiffon": "255,250,205",
						"lightblue": "173,216,230",
						"lightcoral": "240,128,128",
						"lightcyan": "224,255,255",
						"lightgoldenrodyellow": "250,250,210",
						"lightgray": "211,211,211",
						"lightgrey": "211,211,211",
						"lightgreen": "144,238,144",
						"lightpink": "255,182,193",
						"lightsalmon": "255,160,122",
						"lightseagreen": "32,178,170",
						"lightskyblue": "135,206,250",
						"lightslategray": "119,136,153",
						"lightsteelblue": "176,196,222",
						"lightyellow": "255,255,224",
						"limegreen": "50,205,50",
						"lime": "0,255,0",
						"linen": "250,240,230",
						"magenta": "255,0,255",
						"maroon": "128,0,0",
						"mediumaquamarine": "102,205,170",
						"mediumblue": "0,0,205",
						"mediumorchid": "186,85,211",
						"mediumpurple": "147,112,219",
						"mediumseagreen": "60,179,113",
						"mediumslateblue": "123,104,238",
						"mediumspringgreen": "0,250,154",
						"mediumturquoise": "72,209,204",
						"mediumvioletred": "199,21,133",
						"midnightblue": "25,25,112",
						"mintcream": "245,255,250",
						"mistyrose": "255,228,225",
						"moccasin": "255,228,181",
						"navajowhite": "255,222,173",
						"navy": "0,0,128",
						"oldlace": "253,245,230",
						"olivedrab": "107,142,35",
						"olive": "128,128,0",
						"orangered": "255,69,0",
						"orange": "255,165,0",
						"orchid": "218,112,214",
						"palegoldenrod": "238,232,170",
						"palegreen": "152,251,152",
						"paleturquoise": "175,238,238",
						"palevioletred": "219,112,147",
						"papayawhip": "255,239,213",
						"peachpuff": "255,218,185",
						"peru": "205,133,63",
						"pink": "255,192,203",
						"plum": "221,160,221",
						"powderblue": "176,224,230",
						"purple": "128,0,128",
						"red": "255,0,0",
						"rosybrown": "188,143,143",
						"royalblue": "65,105,225",
						"saddlebrown": "139,69,19",
						"salmon": "250,128,114",
						"sandybrown": "244,164,96",
						"seagreen": "46,139,87",
						"seashell": "255,245,238",
						"sienna": "160,82,45",
						"silver": "192,192,192",
						"skyblue": "135,206,235",
						"slateblue": "106,90,205",
						"slategray": "112,128,144",
						"snow": "255,250,250",
						"springgreen": "0,255,127",
						"steelblue": "70,130,180",
						"tan": "210,180,140",
						"teal": "0,128,128",
						"thistle": "216,191,216",
						"tomato": "255,99,71",
						"turquoise": "64,224,208",
						"violet": "238,130,238",
						"wheat": "245,222,179",
						"whitesmoke": "245,245,245",
						"white": "255,255,255",
						"yellowgreen": "154,205,50",
						"yellow": "255,255,0"
					}
				},
				/************
				 Hooks
				 ************/

				/* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
				 (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
				/* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
				 tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
				Hooks: {
					/********************
					 Registration
					 ********************/

					/* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
					/* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
					templates: {
						"textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
						"boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
						"clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
						"backgroundPosition": ["X Y", "0% 0%"],
						"transformOrigin": ["X Y Z", "50% 50% 0px"],
						"perspectiveOrigin": ["X Y", "50% 50%"]
					},
					/* A "registered" hook is one that has been converted from its template form into a live,
					 tweenable property. It contains data to associate it with its root property. */
					registered: {
						/* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
						 which consists of the subproperty's name, the associated root property's name,
						 and the subproperty's position in the root's value. */
					},
					/* Convert the templates into individual hooks then append them to the registered object above. */
					register: function() {
						/* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
						 currently set to "transparent" default to their respective template below when color-animated,
						 and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
						 which is almost always set closer to black than white. */
						for (var i = 0; i < CSS.Lists.colors.length; i++) {
							var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
							CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
						}

						var rootProperty,
								hookTemplate,
								hookNames;

						/* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
						 Thus, we re-arrange the templates accordingly. */
						if (IE) {
							for (rootProperty in CSS.Hooks.templates) {
								if (!CSS.Hooks.templates.hasOwnProperty(rootProperty)) {
									continue;
								}
								hookTemplate = CSS.Hooks.templates[rootProperty];
								hookNames = hookTemplate[0].split(" ");

								var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

								if (hookNames[0] === "Color") {
									/* Reposition both the hook's name and its default value to the end of their respective strings. */
									hookNames.push(hookNames.shift());
									defaultValues.push(defaultValues.shift());

									/* Replace the existing template for the hook's root property. */
									CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
								}
							}
						}

						/* Hook registration. */
						for (rootProperty in CSS.Hooks.templates) {
							if (!CSS.Hooks.templates.hasOwnProperty(rootProperty)) {
								continue;
							}
							hookTemplate = CSS.Hooks.templates[rootProperty];
							hookNames = hookTemplate[0].split(" ");

							for (var j in hookNames) {
								if (!hookNames.hasOwnProperty(j)) {
									continue;
								}
								var fullHookName = rootProperty + hookNames[j],
										hookPosition = j;

								/* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
								 and the hook's position in its template's default value string. */
								CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
							}
						}
					},
					/*****************************
					 Injection and Extraction
					 *****************************/

					/* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
					/* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
					getRoot: function(property) {
						var hookData = CSS.Hooks.registered[property];

						if (hookData) {
							return hookData[0];
						} else {
							/* If there was no hook match, return the property name untouched. */
							return property;
						}
					},
					getUnit: function(str, start) {
						var unit = (str.substr(start || 0, 5).match(/^[a-z%]+/) || [])[0] || "";

						if (unit && CSS.Lists.units.indexOf(unit) >= 0) {
							return unit;
						}
						return "";
					},
					fixColors: function(str) {
						return str.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function($0, $1, $2) {
							if (CSS.Lists.colorNames.hasOwnProperty($2)) {
								return ($1 ? $1 : "rgba(") + CSS.Lists.colorNames[$2] + ($1 ? "" : ",1)");
							}
							return $1 + $2;
						});
					},
					/* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
					 the targeted hook can be injected or extracted at its standard position. */
					cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
						/* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
						if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
							rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
						}

						/* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
						 default to the root's default value as defined in CSS.Hooks.templates. */
						/* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
						 zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
						if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
							rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
						}

						return rootPropertyValue;
					},
					/* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
					extractValue: function(fullHookName, rootPropertyValue) {
						var hookData = CSS.Hooks.registered[fullHookName];

						if (hookData) {
							var hookRoot = hookData[0],
									hookPosition = hookData[1];

							rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

							/* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
							return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
						} else {
							/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
							return rootPropertyValue;
						}
					},
					/* Inject the hook's value into its root property's value. This is used to piece back together the root property
					 once Velocity has updated one of its individually hooked values through tweening. */
					injectValue: function(fullHookName, hookValue, rootPropertyValue) {
						var hookData = CSS.Hooks.registered[fullHookName];

						if (hookData) {
							var hookRoot = hookData[0],
									hookPosition = hookData[1],
									rootPropertyValueParts,
									rootPropertyValueUpdated;

							rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

							/* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
							 then reconstruct the rootPropertyValue string. */
							rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
							rootPropertyValueParts[hookPosition] = hookValue;
							rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

							return rootPropertyValueUpdated;
						} else {
							/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
							return rootPropertyValue;
						}
					}
				},
				/*******************
				 Normalizations
				 *******************/

				/* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
				 and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
				Normalizations: {
					/* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
					 the targeted element (which may need to be queried), and the targeted property value. */
					registered: {
						clip: function(type, element, propertyValue) {
							switch (type) {
								case "name":
									return "clip";
									/* Clip needs to be unwrapped and stripped of its commas during extraction. */
								case "extract":
									var extracted;

									/* If Velocity also extracted this value, skip extraction. */
									if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
										extracted = propertyValue;
									} else {
										/* Remove the "rect()" wrapper. */
										extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

										/* Strip off commas. */
										extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
									}

									return extracted;
									/* Clip needs to be re-wrapped during injection. */
								case "inject":
									return "rect(" + propertyValue + ")";
							}
						},
						blur: function(type, element, propertyValue) {
							switch (type) {
								case "name":
									return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
								case "extract":
									var extracted = parseFloat(propertyValue);

									/* If extracted is NaN, meaning the value isn't already extracted. */
									if (!(extracted || extracted === 0)) {
										var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

										/* If the filter string had a blur component, return just the blur value and unit type. */
										if (blurComponent) {
											extracted = blurComponent[1];
											/* If the component doesn't exist, default blur to 0. */
										} else {
											extracted = 0;
										}
									}

									return extracted;
									/* Blur needs to be re-wrapped during injection. */
								case "inject":
									/* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
									if (!parseFloat(propertyValue)) {
										return "none";
									} else {
										return "blur(" + propertyValue + ")";
									}
							}
						},
						/* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
						opacity: function(type, element, propertyValue) {
							if (IE <= 8) {
								switch (type) {
									case "name":
										return "filter";
									case "extract":
										/* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
										 Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
										var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

										if (extracted) {
											/* Convert to decimal value. */
											propertyValue = extracted[1] / 100;
										} else {
											/* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
											propertyValue = 1;
										}

										return propertyValue;
									case "inject":
										/* Opacified elements are required to have their zoom property set to a non-zero value. */
										element.style.zoom = 1;

										/* Setting the filter property on elements with certain font property combinations can result in a
										 highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
										 value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
										if (parseFloat(propertyValue) >= 1) {
											return "";
										} else {
											/* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
											return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
										}
								}
								/* With all other browsers, normalization is not required; return the same values that were passed in. */
							} else {
								switch (type) {
									case "name":
										return "opacity";
									case "extract":
										return propertyValue;
									case "inject":
										return propertyValue;
								}
							}
						}
					},
					/*****************************
					 Batched Registrations
					 *****************************/

					/* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
					register: function() {

						/*****************
						 Transforms
						 *****************/

						/* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
						 so that they can be referenced in a properties map by their individual names. */
						/* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
						 setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
						 Transform setting is batched in this way to improve performance: the transform style only needs to be updated
						 once when multiple transform subproperties are being animated simultaneously. */
						/* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
						 transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
						 from being normalized for these browsers so that tweening skips these properties altogether
						 (since it will ignore them as being unsupported by the browser.) */
						if ((!IE || IE > 9) && !Velocity.State.isGingerbread) {
							/* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
							 share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
							CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
						}

						for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
							/* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
							 paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
							(function() {
								var transformName = CSS.Lists.transformsBase[i];

								CSS.Normalizations.registered[transformName] = function(type, element, propertyValue) {
									switch (type) {
										/* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
										case "name":
											return "transform";
											/* Transform values are cached onto a per-element transformCache object. */
										case "extract":
											/* If this transform has yet to be assigned a value, return its null value. */
											if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
												/* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
												return /^scale/i.test(transformName) ? 1 : 0;
												/* When transform values are set, they are wrapped in parentheses as per the CSS spec.
												 Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
											}
											return Data(element).transformCache[transformName].replace(/[()]/g, "");
										case "inject":
											var invalid = false;

											/* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
											 Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
											/* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
											switch (transformName.substr(0, transformName.length - 1)) {
												/* Whitelist unit types for each transform. */
												case "translate":
													invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
													break;
													/* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
												case "scal":
												case "scale":
													/* Chrome on Android has a bug in which scaled elements blur if their initial scale
													 value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
													 and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
													if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
														propertyValue = 1;
													}

													invalid = !/(\d)$/i.test(propertyValue);
													break;
												case "skew":
													invalid = !/(deg|\d)$/i.test(propertyValue);
													break;
												case "rotate":
													invalid = !/(deg|\d)$/i.test(propertyValue);
													break;
											}

											if (!invalid) {
												/* As per the CSS spec, wrap the value in parentheses. */
												Data(element).transformCache[transformName] = "(" + propertyValue + ")";
											}

											/* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
											return Data(element).transformCache[transformName];
									}
								};
							})();
						}

						/*************
						 Colors
						 *************/

						/* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
						 Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
						for (var j = 0; j < CSS.Lists.colors.length; j++) {
							/* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
							 (Otherwise, all functions would take the final for loop's colorName.) */
							(function() {
								var colorName = CSS.Lists.colors[j];

								/* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
								CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
									switch (type) {
										case "name":
											return colorName;
											/* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
										case "extract":
											var extracted;

											/* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
											if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
												extracted = propertyValue;
											} else {
												var converted,
														colorNames = {
															black: "rgb(0, 0, 0)",
															blue: "rgb(0, 0, 255)",
															gray: "rgb(128, 128, 128)",
															green: "rgb(0, 128, 0)",
															red: "rgb(255, 0, 0)",
															white: "rgb(255, 255, 255)"
														};

												/* Convert color names to rgb. */
												if (/^[A-z]+$/i.test(propertyValue)) {
													if (colorNames[propertyValue] !== undefined) {
														converted = colorNames[propertyValue];
													} else {
														/* If an unmatched color name is provided, default to black. */
														converted = colorNames.black;
													}
													/* Convert hex values to rgb. */
												} else if (CSS.RegEx.isHex.test(propertyValue)) {
													converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
													/* If the provided color doesn't match any of the accepted color formats, default to black. */
												} else if (!(/^rgba?\(/i.test(propertyValue))) {
													converted = colorNames.black;
												}

												/* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
												 repeated spaces (in case the value included spaces to begin with). */
												extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
											}

											/* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
											if ((!IE || IE > 8) && extracted.split(" ").length === 3) {
												extracted += " 1";
											}

											return extracted;
										case "inject":
											/* If we have a pattern then it might already have the right values */
											if (/^rgb/.test(propertyValue)) {
												return propertyValue;
											}

											/* If this is IE<=8 and an alpha component exists, strip it off. */
											if (IE <= 8) {
												if (propertyValue.split(" ").length === 4) {
													propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
												}
												/* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
											} else if (propertyValue.split(" ").length === 3) {
												propertyValue += " 1";
											}

											/* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
											 on all values but the fourth (R, G, and B only accept whole numbers). */
											return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
									}
								};
							})();
						}

						/**************
						 Dimensions
						 **************/
						function augmentDimension(name, element, wantInner) {
							var isBorderBox = CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() === "border-box";

							if (isBorderBox === (wantInner || false)) {
								/* in box-sizing mode, the CSS width / height accessors already give the outerWidth / outerHeight. */
								var i,
										value,
										augment = 0,
										sides = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"],
										fields = ["padding" + sides[0], "padding" + sides[1], "border" + sides[0] + "Width", "border" + sides[1] + "Width"];

								for (i = 0; i < fields.length; i++) {
									value = parseFloat(CSS.getPropertyValue(element, fields[i]));
									if (!isNaN(value)) {
										augment += value;
									}
								}
								return wantInner ? -augment : augment;
							}
							return 0;
						}
						function getDimension(name, wantInner) {
							return function(type, element, propertyValue) {
								switch (type) {
									case "name":
										return name;
									case "extract":
										return parseFloat(propertyValue) + augmentDimension(name, element, wantInner);
									case "inject":
										return (parseFloat(propertyValue) - augmentDimension(name, element, wantInner)) + "px";
								}
							};
						}
						CSS.Normalizations.registered.innerWidth = getDimension("width", true);
						CSS.Normalizations.registered.innerHeight = getDimension("height", true);
						CSS.Normalizations.registered.outerWidth = getDimension("width");
						CSS.Normalizations.registered.outerHeight = getDimension("height");
					}
				},
				/************************
				 CSS Property Names
				 ************************/

				Names: {
					/* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
					 Camelcasing is used to normalize property names between and across calls. */
					camelCase: function(property) {
						return property.replace(/-(\w)/g, function(match, subMatch) {
							return subMatch.toUpperCase();
						});
					},
					/* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
					SVGAttribute: function(property) {
						var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

						/* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
						if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
							SVGAttributes += "|transform";
						}

						return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
					},
					/* Determine whether a property should be set with a vendor prefix. */
					/* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
					 If the property is not at all supported by the browser, return a false flag. */
					prefixCheck: function(property) {
						/* If this property has already been checked, return the cached value. */
						if (Velocity.State.prefixMatches[property]) {
							return [Velocity.State.prefixMatches[property], true];
						} else {
							var vendors = ["", "Webkit", "Moz", "ms", "O"];

							for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
								var propertyPrefixed;

								if (i === 0) {
									propertyPrefixed = property;
								} else {
									/* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
									propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) {
										return match.toUpperCase();
									});
								}

								/* Check if the browser supports this property as prefixed. */
								if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
									/* Cache the match. */
									Velocity.State.prefixMatches[property] = propertyPrefixed;

									return [propertyPrefixed, true];
								}
							}

							/* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
							return [property, false];
						}
					}
				},
				/************************
				 CSS Property Values
				 ************************/

				Values: {
					/* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
					hexToRgb: function(hex) {
						var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
								longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
								rgbParts;

						hex = hex.replace(shortformRegex, function(m, r, g, b) {
							return r + r + g + g + b + b;
						});

						rgbParts = longformRegex.exec(hex);

						return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
					},
					isCSSNullValue: function(value) {
						/* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
						 Thus, we check for both falsiness and these special strings. */
						/* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
						 templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
						/* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
						return (!value || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
					},
					/* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
					getUnitType: function(property) {
						if (/^(rotate|skew)/i.test(property)) {
							return "deg";
						} else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
							/* The above properties are unitless. */
							return "";
						} else {
							/* Default to px for all other properties. */
							return "px";
						}
					},
					/* HTML elements default to an associated display type when they're not set to display:none. */
					/* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
					getDisplayType: function(element) {
						var tagName = element && element.tagName.toString().toLowerCase();

						if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
							return "inline";
						} else if (/^(li)$/i.test(tagName)) {
							return "list-item";
						} else if (/^(tr)$/i.test(tagName)) {
							return "table-row";
						} else if (/^(table)$/i.test(tagName)) {
							return "table";
						} else if (/^(tbody)$/i.test(tagName)) {
							return "table-row-group";
							/* Default to "block" when no match is found. */
						} else {
							return "block";
						}
					},
					/* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
					addClass: function(element, className) {
						if (element) {
							if (element.classList) {
								element.classList.add(className);
							} else if (Type.isString(element.className)) {
								// Element.className is around 15% faster then set/getAttribute
								element.className += (element.className.length ? " " : "") + className;
							} else {
								// Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
								var currentClass = element.getAttribute(IE <= 7 ? "className" : "class") || "";

								element.setAttribute("class", currentClass + (currentClass ? " " : "") + className);
							}
						}
					},
					removeClass: function(element, className) {
						if (element) {
							if (element.classList) {
								element.classList.remove(className);
							} else if (Type.isString(element.className)) {
								// Element.className is around 15% faster then set/getAttribute
								// TODO: Need some jsperf tests on performance - can we get rid of the regex and maybe use split / array manipulation?
								element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
							} else {
								// Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
								var currentClass = element.getAttribute(IE <= 7 ? "className" : "class") || "";

								element.setAttribute("class", currentClass.replace(new RegExp("(^|\s)" + className.split(" ").join("|") + "(\s|$)", "gi"), " "));
							}
						}
					}
				},
				/****************************
				 Style Getting & Setting
				 ****************************/

				/* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
				getPropertyValue: function(element, property, rootPropertyValue, forceStyleLookup) {
					/* Get an element's computed property value. */
					/* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
					 style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
					 *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
					function computePropertyValue(element, property) {
						/* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
						 element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
						 offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
						 We subtract border and padding to get the sum of interior + scrollbar. */
						var computedValue = 0;

						/* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
						 of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
						 codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
						 Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
						if (IE <= 8) {
							computedValue = $.css(element, property); /* GET */
							/* All other browsers support getComputedStyle. The returned live object reference is cached onto its
							 associated element so that it does not need to be refetched upon every GET. */
						} else {
							/* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
							 toggle display to the element type's default value. */
							var toggleDisplay = false;

							if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
								toggleDisplay = true;
								CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
							}

							var revertDisplay = function() {
								if (toggleDisplay) {
									CSS.setPropertyValue(element, "display", "none");
								}
							};

							if (!forceStyleLookup) {
								if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
									var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
									revertDisplay();

									return contentBoxHeight;
								} else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
									var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
									revertDisplay();

									return contentBoxWidth;
								}
							}

							var computedStyle;

							/* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
							 of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
							if (Data(element) === undefined) {
								computedStyle = window.getComputedStyle(element, null); /* GET */
								/* If the computedStyle object has yet to be cached, do so now. */
							} else if (!Data(element).computedStyle) {
								computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
								/* If computedStyle is cached, use it. */
							} else {
								computedStyle = Data(element).computedStyle;
							}

							/* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
							 Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
							 So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
							if (property === "borderColor") {
								property = "borderTopColor";
							}

							/* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
							 instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
							if (IE === 9 && property === "filter") {
								computedValue = computedStyle.getPropertyValue(property); /* GET */
							} else {
								computedValue = computedStyle[property];
							}

							/* Fall back to the property's style value (if defined) when computedValue returns nothing,
							 which can happen when the element hasn't been painted. */
							if (computedValue === "" || computedValue === null) {
								computedValue = element.style[property];
							}

							revertDisplay();
						}

						/* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
						 defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
						 effect as being set to 0, so no conversion is necessary.) */
						/* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
						 property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
						 to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
						if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
							var position = computePropertyValue(element, "position"); /* GET */

							/* For absolute positioning, jQuery's $.position() only returns values for top and left;
							 right and bottom will have their "auto" value reverted to 0. */
							/* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
							 Not a big deal since we're currently in a GET batch anyway. */
							if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
								/* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
								computedValue = $(element).position()[property] + "px"; /* GET */
							}
						}

						return computedValue;
					}

					var propertyValue;

					/* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
					 extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
					if (CSS.Hooks.registered[property]) {
						var hook = property,
								hookRoot = CSS.Hooks.getRoot(hook);

						/* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
						 query the DOM for the root property's value. */
						if (rootPropertyValue === undefined) {
							/* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
							rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
						}

						/* If this root has a normalization registered, peform the associated normalization extraction. */
						if (CSS.Normalizations.registered[hookRoot]) {
							rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
						}

						/* Extract the hook's value. */
						propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

						/* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
						 normalize the property's name and value, and handle the special case of transforms. */
						/* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
						 numerical and therefore do not require normalization extraction. */
					} else if (CSS.Normalizations.registered[property]) {
						var normalizedPropertyName,
								normalizedPropertyValue;

						normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

						/* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
						 At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
						 This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
						 thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
						if (normalizedPropertyName !== "transform") {
							normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

							/* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
							if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
								normalizedPropertyValue = CSS.Hooks.templates[property][1];
							}
						}

						propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
					}

					/* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
					if (!/^[\d-]/.test(propertyValue)) {
						/* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
						 their HTML attribute values instead of their CSS style values. */
						var data = Data(element);

						if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
							/* Since the height/width attribute values must be set manually, they don't reflect computed values.
							 Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
							if (/^(height|width)$/i.test(property)) {
								/* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
								try {
									propertyValue = element.getBBox()[property];
								} catch (error) {
									propertyValue = 0;
								}
								/* Otherwise, access the attribute value directly. */
							} else {
								propertyValue = element.getAttribute(property);
							}
						} else {
							propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
						}
					}

					/* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
					 convert CSS null-values to an integer of value 0. */
					if (CSS.Values.isCSSNullValue(propertyValue)) {
						propertyValue = 0;
					}

					if (Velocity.debug >= 2) {
						console.log("Get " + property + ": " + propertyValue);
					}

					return propertyValue;
				},
				/* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
				setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
					var propertyName = property;

					/* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
					if (property === "scroll") {
						/* If a container option is present, scroll the container instead of the browser window. */
						if (scrollData.container) {
							scrollData.container["scroll" + scrollData.direction] = propertyValue;
							/* Otherwise, Velocity defaults to scrolling the browser window. */
						} else {
							if (scrollData.direction === "Left") {
								window.scrollTo(propertyValue, scrollData.alternateValue);
							} else {
								window.scrollTo(scrollData.alternateValue, propertyValue);
							}
						}
					} else {
						/* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
						 Thus, for now, we merely cache transforms being SET. */
						if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
							/* Perform a normalization injection. */
							/* Note: The normalization logic handles the transformCache updating. */
							CSS.Normalizations.registered[property]("inject", element, propertyValue);

							propertyName = "transform";
							propertyValue = Data(element).transformCache[property];
						} else {
							/* Inject hooks. */
							if (CSS.Hooks.registered[property]) {
								var hookName = property,
										hookRoot = CSS.Hooks.getRoot(property);

								/* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
								rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

								propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
								property = hookRoot;
							}

							/* Normalize names and values. */
							if (CSS.Normalizations.registered[property]) {
								propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
								property = CSS.Normalizations.registered[property]("name", element);
							}

							/* Assign the appropriate vendor prefix before performing an official style update. */
							propertyName = CSS.Names.prefixCheck(property)[0];

							/* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
							 Try/catch is avoided for other browsers since it incurs a performance overhead. */
							if (IE <= 8) {
								try {
									element.style[propertyName] = propertyValue;
								} catch (error) {
									if (Velocity.debug) {
										console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
									}
								}
								/* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
								/* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
							} else {
								var data = Data(element);

								if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
									/* Note: For SVG attributes, vendor-prefixed property names are never used. */
									/* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
									element.setAttribute(property, propertyValue);
								} else {
									element.style[propertyName] = propertyValue;
								}
							}

							if (Velocity.debug >= 2) {
								console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
							}
						}
					}

					/* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
					return [propertyName, propertyValue];
				},
				/* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
				/* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
				flushTransformCache: function(element) {
					var transformString = "",
							data = Data(element);

					/* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
					 (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
					if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && data && data.isSVG) {
						/* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
						 Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
						var getTransformFloat = function(transformProperty) {
							return parseFloat(CSS.getPropertyValue(element, transformProperty));
						};

						/* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
						 we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
						var SVGTransforms = {
							translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
							skewX: [getTransformFloat("skewX")], skewY: [getTransformFloat("skewY")],
							/* If the scale property is set (non-1), use that value for the scaleX and scaleY values
							 (this behavior mimics the result of animating all these properties at once on HTML elements). */
							scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
							/* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
							 defining the rotation's origin point. We ignore the origin values (default them to 0). */
							rotate: [getTransformFloat("rotateZ"), 0, 0]
						};

						/* Iterate through the transform properties in the user-defined property map order.
						 (This mimics the behavior of non-SVG transform animation.) */
						$.each(Data(element).transformCache, function(transformName) {
							/* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
							 properties so that they match up with SVG's accepted transform properties. */
							if (/^translate/i.test(transformName)) {
								transformName = "translate";
							} else if (/^scale/i.test(transformName)) {
								transformName = "scale";
							} else if (/^rotate/i.test(transformName)) {
								transformName = "rotate";
							}

							/* Check that we haven't yet deleted the property from the SVGTransforms container. */
							if (SVGTransforms[transformName]) {
								/* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
								transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

								/* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
								 re-insert the same master property if we encounter another one of its axis-specific properties. */
								delete SVGTransforms[transformName];
							}
						});
					} else {
						var transformValue,
								perspective;

						/* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
						$.each(Data(element).transformCache, function(transformName) {
							transformValue = Data(element).transformCache[transformName];

							/* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
							if (transformName === "transformPerspective") {
								perspective = transformValue;
								return true;
							}

							/* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
							if (IE === 9 && transformName === "rotateZ") {
								transformName = "rotate";
							}

							transformString += transformName + transformValue + " ";
						});

						/* If present, set the perspective subproperty first. */
						if (perspective) {
							transformString = "perspective" + perspective + " " + transformString;
						}
					}

					CSS.setPropertyValue(element, "transform", transformString);
				}
			};

			/* Register hooks and normalizations. */
			CSS.Hooks.register();
			CSS.Normalizations.register();

			/* Allow hook setting in the same fashion as jQuery's $.css(). */
			Velocity.hook = function(elements, arg2, arg3) {
				var value;

				elements = sanitizeElements(elements);

				$.each(elements, function(i, element) {
					/* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
					if (Data(element) === undefined) {
						Velocity.init(element);
					}

					/* Get property value. If an element set was passed in, only return the value for the first element. */
					if (arg3 === undefined) {
						if (value === undefined) {
							value = CSS.getPropertyValue(element, arg2);
						}
						/* Set property value. */
					} else {
						/* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
						var adjustedSet = CSS.setPropertyValue(element, arg2, arg3);

						/* Transform properties don't automatically set. They have to be flushed to the DOM. */
						if (adjustedSet[0] === "transform") {
							Velocity.CSS.flushTransformCache(element);
						}

						value = adjustedSet;
					}
				});

				return value;
			};

			/*****************
			 Animation
			 *****************/

			var animate = function() {
				var opts;

				/******************
				 Call Chain
				 ******************/

				/* Logic for determining what to return to the call stack when exiting out of Velocity. */
				function getChain() {
					/* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
					 default to null instead of returning the targeted elements so that utility function's return value is standardized. */
					if (isUtility) {
						return promiseData.promise || null;
						/* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
					} else {
						return elementsWrapped;
					}
				}

				/*************************
				 Arguments Assignment
				 *************************/

				/* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
				 objects are defined on a container object that's passed in as Velocity's sole argument. */
				/* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
				var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
						/* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
						isUtility,
						/* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
						 passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
						elementsWrapped,
						argumentIndex;

				var elements,
						propertiesMap,
						options;

				/* Detect jQuery/Zepto elements being animated via the $.fn method. */
				if (Type.isWrapped(this)) {
					isUtility = false;

					argumentIndex = 0;
					elements = this;
					elementsWrapped = this;
					/* Otherwise, raw elements are being animated via the utility function. */
				} else {
					isUtility = true;

					argumentIndex = 1;
					elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
				}

				/***************
				 Promises
				 ***************/

				var promiseData = {
					promise: null,
					resolver: null,
					rejecter: null
				};

				/* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
				 promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
				 method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
				 call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
				/* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
				 triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
				 grouped together for the purposes of resolving and rejecting a promise. */
				if (isUtility && Velocity.Promise) {
					promiseData.promise = new Velocity.Promise(function(resolve, reject) {
						promiseData.resolver = resolve;
						promiseData.rejecter = reject;
					});
				}

				if (syntacticSugar) {
					propertiesMap = arguments[0].properties || arguments[0].p;
					options = arguments[0].options || arguments[0].o;
				} else {
					propertiesMap = arguments[argumentIndex];
					options = arguments[argumentIndex + 1];
				}

				elements = sanitizeElements(elements);

				if (!elements) {
					if (promiseData.promise) {
						if (!propertiesMap || !options || options.promiseRejectEmpty !== false) {
							promiseData.rejecter();
						} else {
							promiseData.resolver();
						}
					}
					return;
				}

				/* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
				 single raw DOM element is passed in (which doesn't contain a length property). */
				var elementsLength = elements.length,
						elementsIndex = 0;

				/***************************
				 Argument Overloading
				 ***************************/

				/* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
				 Overloading is detected by checking for the absence of an object being passed into options. */
				/* Note: The stop/finish/pause/resume actions do not accept animation options, and are therefore excluded from this check. */
				if (!/^(stop|finish|finishAll|pause|resume)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
					/* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
					var startingArgumentPosition = argumentIndex + 1;

					options = {};

					/* Iterate through all options arguments */
					for (var i = startingArgumentPosition; i < arguments.length; i++) {
						/* Treat a number as a duration. Parse it out. */
						/* Note: The following RegEx will return true if passed an array with a number as its first item.
						 Thus, arrays are skipped from this check. */
						if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
							options.duration = arguments[i];
							/* Treat strings and arrays as easings. */
						} else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
							options.easing = arguments[i];
							/* Treat a function as a complete callback. */
						} else if (Type.isFunction(arguments[i])) {
							options.complete = arguments[i];
						}
					}
				}

				/*********************
				 Action Detection
				 *********************/

				/* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
				 or they can be started, stopped, paused, resumed, or reversed . If a literal or referenced properties map is passed in as Velocity's
				 first argument, the associated action is "start". Alternatively, "scroll", "reverse", "pause", "resume" or "stop" can be passed in 
				 instead of a properties map. */
				var action;

				switch (propertiesMap) {
					case "scroll":
						action = "scroll";
						break;

					case "reverse":
						action = "reverse";
						break;

					case "pause":

						/*******************
						 Action: Pause
						 *******************/

						var currentTime = (new Date()).getTime();

						/* Handle delay timers */
						$.each(elements, function(i, element) {
							pauseDelayOnElement(element, currentTime);
						});

						/* Pause and Resume are call-wide (not on a per element basis). Thus, calling pause or resume on a 
						 single element will cause any calls that containt tweens for that element to be paused/resumed
						 as well. */

						/* Iterate through all calls and pause any that contain any of our elements */
						$.each(Velocity.State.calls, function(i, activeCall) {

							var found = false;
							/* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
							if (activeCall) {
								/* Iterate through the active call's targeted elements. */
								$.each(activeCall[1], function(k, activeElement) {
									var queueName = (options === undefined) ? "" : options;

									if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
										return true;
									}

									/* Iterate through the calls targeted by the stop command. */
									$.each(elements, function(l, element) {
										/* Check that this call was applied to the target element. */
										if (element === activeElement) {

											/* Set call to paused */
											activeCall[5] = {
												resume: false
											};

											/* Once we match an element, we can bounce out to the next call entirely */
											found = true;
											return false;
										}
									});

									/* Proceed to check next call if we have already matched */
									if (found) {
										return false;
									}
								});
							}

						});

						/* Since pause creates no new tweens, exit out of Velocity. */
						return getChain();

					case "resume":

						/*******************
						 Action: Resume
						 *******************/

						/* Handle delay timers */
						$.each(elements, function(i, element) {
							resumeDelayOnElement(element, currentTime);
						});

						/* Pause and Resume are call-wide (not on a per elemnt basis). Thus, calling pause or resume on a 
						 single element will cause any calls that containt tweens for that element to be paused/resumed
						 as well. */

						/* Iterate through all calls and pause any that contain any of our elements */
						$.each(Velocity.State.calls, function(i, activeCall) {
							var found = false;
							/* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
							if (activeCall) {
								/* Iterate through the active call's targeted elements. */
								$.each(activeCall[1], function(k, activeElement) {
									var queueName = (options === undefined) ? "" : options;

									if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
										return true;
									}

									/* Skip any calls that have never been paused */
									if (!activeCall[5]) {
										return true;
									}

									/* Iterate through the calls targeted by the stop command. */
									$.each(elements, function(l, element) {
										/* Check that this call was applied to the target element. */
										if (element === activeElement) {

											/* Flag a pause object to be resumed, which will occur during the next tick. In
											 addition, the pause object will at that time be deleted */
											activeCall[5].resume = true;

											/* Once we match an element, we can bounce out to the next call entirely */
											found = true;
											return false;
										}
									});

									/* Proceed to check next call if we have already matched */
									if (found) {
										return false;
									}
								});
							}

						});

						/* Since resume creates no new tweens, exit out of Velocity. */
						return getChain();

					case "finish":
					case "finishAll":
					case "stop":
						/*******************
						 Action: Stop
						 *******************/

						/* Clear the currently-active delay on each targeted element. */
						$.each(elements, function(i, element) {
							if (Data(element) && Data(element).delayTimer) {
								/* Stop the timer from triggering its cached next() function. */
								clearTimeout(Data(element).delayTimer.setTimeout);

								/* Manually call the next() function so that the subsequent queue items can progress. */
								if (Data(element).delayTimer.next) {
									Data(element).delayTimer.next();
								}

								delete Data(element).delayTimer;
							}

							/* If we want to finish everything in the queue, we have to iterate through it
							 and call each function. This will make them active calls below, which will
							 cause them to be applied via the duration setting. */
							if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
								/* Iterate through the items in the element's queue. */
								$.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
									/* The queue array can contain an "inprogress" string, which we skip. */
									if (Type.isFunction(item)) {
										item();
									}
								});

								/* Clearing the $.queue() array is achieved by resetting it to []. */
								$.queue(element, Type.isString(options) ? options : "", []);
							}
						});

						var callsToStop = [];

						/* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
						 been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
						 is stopped, the next item in its animation queue is immediately triggered. */
						/* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
						 or a custom queue string can be passed in. */
						/* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
						 regardless of the element's current queue state. */

						/* Iterate through every active call. */
						$.each(Velocity.State.calls, function(i, activeCall) {
							/* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
							if (activeCall) {
								/* Iterate through the active call's targeted elements. */
								$.each(activeCall[1], function(k, activeElement) {
									/* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
									 clear calls associated with the relevant queue. */
									/* Call stopping logic works as follows:
									 - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
									 - options === undefined --> stop current queue:"" call and all queue:false calls.
									 - options === false --> stop only queue:false calls.
									 - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
									var queueName = (options === undefined) ? "" : options;

									if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
										return true;
									}

									/* Iterate through the calls targeted by the stop command. */
									$.each(elements, function(l, element) {
										/* Check that this call was applied to the target element. */
										if (element === activeElement) {
											/* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
											 due to the queue-clearing above. */
											if (options === true || Type.isString(options)) {
												/* Iterate through the items in the element's queue. */
												$.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
													/* The queue array can contain an "inprogress" string, which we skip. */
													if (Type.isFunction(item)) {
														/* Pass the item's callback a flag indicating that we want to abort from the queue call.
														 (Specifically, the queue will resolve the call's associated promise then abort.)  */
														item(null, true);
													}
												});

												/* Clearing the $.queue() array is achieved by resetting it to []. */
												$.queue(element, Type.isString(options) ? options : "", []);
											}

											if (propertiesMap === "stop") {
												/* Since "reverse" uses cached start values (the previous call's endValues), these values must be
												 changed to reflect the final value that the elements were actually tweened to. */
												/* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
												 object. Also, queue:false animations can't be reversed. */
												var data = Data(element);
												if (data && data.tweensContainer && queueName !== false) {
													$.each(data.tweensContainer, function(m, activeTween) {
														activeTween.endValue = activeTween.currentValue;
													});
												}

												callsToStop.push(i);
											} else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
												/* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
												 they finish upon the next rAf tick then proceed with normal call completion logic. */
												activeCall[2].duration = 1;
											}
										}
									});
								});
							}
						});

						/* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
						 that the complete callback and display:none setting should be skipped since we're completing prematurely. */
						if (propertiesMap === "stop") {
							$.each(callsToStop, function(i, j) {
								completeCall(j, true);
							});

							if (promiseData.promise) {
								/* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
								promiseData.resolver(elements);
							}
						}

						/* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
						return getChain();

					default:
						/* Treat a non-empty plain object as a literal properties map. */
						if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
							action = "start";

							/****************
							 Redirects
							 ****************/

							/* Check if a string matches a registered redirect (see Redirects above). */
						} else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
							opts = $.extend({}, options);

							var durationOriginal = opts.duration,
									delayOriginal = opts.delay || 0;

							/* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
							if (opts.backwards === true) {
								elements = $.extend(true, [], elements).reverse();
							}

							/* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
							$.each(elements, function(elementIndex, element) {
								/* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
								if (parseFloat(opts.stagger)) {
									opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
								} else if (Type.isFunction(opts.stagger)) {
									opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
								}

								/* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
								 the duration of each element's animation, using floors to prevent producing very short durations. */
								if (opts.drag) {
									/* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
									opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

									/* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
									 B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
									 The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
									opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
								}

								/* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
								 reduce the opts checking logic required inside the redirect. */
								Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
							});

							/* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
							 (The performance overhead up to this point is virtually non-existant.) */
							/* Note: The jQuery call chain is kept intact by returning the complete element set. */
							return getChain();
						} else {
							var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

							if (promiseData.promise) {
								promiseData.rejecter(new Error(abortError));
							} else {
								console.log(abortError);
							}

							return getChain();
						}
				}

				/**************************
				 Call-Wide Variables
				 **************************/

				/* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
				 being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
				 avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
				 conversion metrics across Velocity animations that are not immediately consecutively chained. */
				var callUnitConversionData = {
					lastParent: null,
					lastPosition: null,
					lastFontSize: null,
					lastPercentToPxWidth: null,
					lastPercentToPxHeight: null,
					lastEmToPx: null,
					remToPx: null,
					vwToPx: null,
					vhToPx: null
				};

				/* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
				 Velocity.State.calls array that is processed during animation ticking. */
				var call = [];

				/************************
				 Element Processing
				 ************************/

				/* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
				 1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
				 2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
				 3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
				 `elementArrayIndex` allows passing index of the element in the original array to value functions.
				 If `elementsIndex` were used instead the index would be determined by the elements' per-element queue.
				 */
				function processElement(element, elementArrayIndex) {

					/*************************
					 Part I: Pre-Queueing
					 *************************/

					/***************************
					 Element-Wide Variables
					 ***************************/

					var /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
							opts = $.extend({}, Velocity.defaults, options),
							/* A container for the processed data associated with each property in the propertyMap.
							 (Each property in the map produces its own "tween".) */
							tweensContainer = {},
							elementUnitConversionData;

					/******************
					 Element Init
					 ******************/

					if (Data(element) === undefined) {
						Velocity.init(element);
					}

					/******************
					 Option: Delay
					 ******************/

					/* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
					/* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
					 (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
					if (parseFloat(opts.delay) && opts.queue !== false) {
						$.queue(element, opts.queue, function(next) {
							/* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
							Velocity.velocityQueueEntryFlag = true;

							/* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
							 The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command, and
							 delayBegin/delayTime is used to ensure we can "pause" and "resume" a tween that is still mid-delay. */

							/* Temporarily store delayed elements to facilite access for global pause/resume */
							var callIndex = Velocity.State.delayedElements.count++;
							Velocity.State.delayedElements[callIndex] = element;

							var delayComplete = (function(index) {
								return function() {
									/* Clear the temporary element */
									Velocity.State.delayedElements[index] = false;

									/* Finally, issue the call */
									next();
								};
							})(callIndex);


							Data(element).delayBegin = (new Date()).getTime();
							Data(element).delay = parseFloat(opts.delay);
							Data(element).delayTimer = {
								setTimeout: setTimeout(next, parseFloat(opts.delay)),
								next: delayComplete
							};
						});
					}

					/*********************
					 Option: Duration
					 *********************/

					/* Support for jQuery's named durations. */
					switch (opts.duration.toString().toLowerCase()) {
						case "fast":
							opts.duration = 200;
							break;

						case "normal":
							opts.duration = DURATION_DEFAULT;
							break;

						case "slow":
							opts.duration = 600;
							break;

						default:
							/* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
							opts.duration = parseFloat(opts.duration) || 1;
					}

					/************************
					 Global Option: Mock
					 ************************/

					if (Velocity.mock !== false) {
						/* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
						 Alternatively, a multiplier can be passed in to time remap all delays and durations. */
						if (Velocity.mock === true) {
							opts.duration = opts.delay = 1;
						} else {
							opts.duration *= parseFloat(Velocity.mock) || 1;
							opts.delay *= parseFloat(Velocity.mock) || 1;
						}
					}

					/*******************
					 Option: Easing
					 *******************/

					opts.easing = getEasing(opts.easing, opts.duration);

					/**********************
					 Option: Callbacks
					 **********************/

					/* Callbacks must functions. Otherwise, default to null. */
					if (opts.begin && !Type.isFunction(opts.begin)) {
						opts.begin = null;
					}

					if (opts.progress && !Type.isFunction(opts.progress)) {
						opts.progress = null;
					}

					if (opts.complete && !Type.isFunction(opts.complete)) {
						opts.complete = null;
					}

					/*********************************
					 Option: Display & Visibility
					 *********************************/

					/* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
					/* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
					if (opts.display !== undefined && opts.display !== null) {
						opts.display = opts.display.toString().toLowerCase();

						/* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
						if (opts.display === "auto") {
							opts.display = Velocity.CSS.Values.getDisplayType(element);
						}
					}

					if (opts.visibility !== undefined && opts.visibility !== null) {
						opts.visibility = opts.visibility.toString().toLowerCase();
					}

					/**********************
					 Option: mobileHA
					 **********************/

					/* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
					 on animating elements. HA is removed from the element at the completion of its animation. */
					/* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
					/* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
					opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

					/***********************
					 Part II: Queueing
					 ***********************/

					/* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
					 In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
					/* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
					 the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
					function buildQueue(next) {
						var data, lastTweensContainer;

						/*******************
						 Option: Begin
						 *******************/

						/* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
						if (opts.begin && elementsIndex === 0) {
							/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
							try {
								opts.begin.call(elements, elements);
							} catch (error) {
								setTimeout(function() {
									throw error;
								}, 1);
							}
						}

						/*****************************************
						 Tween Data Construction (for Scroll)
						 *****************************************/

						/* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
						if (action === "scroll") {
							/* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
							var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
									scrollOffset = parseFloat(opts.offset) || 0,
									scrollPositionCurrent,
									scrollPositionCurrentAlternate,
									scrollPositionEnd;

							/* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
							 as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
							if (opts.container) {
								/* Ensure that either a jQuery object or a raw DOM element was passed in. */
								if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
									/* Extract the raw DOM element from the jQuery wrapper. */
									opts.container = opts.container[0] || opts.container;
									/* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
									 (due to the user's natural interaction with the page). */
									scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

									/* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
									 -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
									 the scroll container's current scroll position. */
									scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
									/* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
								} else {
									opts.container = null;
								}
							} else {
								/* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
								 the appropriate cached property names (which differ based on browser type). */
								scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
								/* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
								scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

								/* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
								 and therefore end values do not need to be compounded onto current values. */
								scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
							}

							/* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
							tweensContainer = {
								scroll: {
									rootPropertyValue: false,
									startValue: scrollPositionCurrent,
									currentValue: scrollPositionCurrent,
									endValue: scrollPositionEnd,
									unitType: "",
									easing: opts.easing,
									scrollData: {
										container: opts.container,
										direction: scrollDirection,
										alternateValue: scrollPositionCurrentAlternate
									}
								},
								element: element
							};

							if (Velocity.debug) {
								console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
							}

							/******************************************
							 Tween Data Construction (for Reverse)
							 ******************************************/

							/* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
							 that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
							 the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
							/* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
							/* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
							 there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
							 as reverting to the element's values as they were prior to the previous *Velocity* call. */
						} else if (action === "reverse") {
							data = Data(element);

							/* Abort if there is no prior animation data to reverse to. */
							if (!data) {
								return;
							}

							if (!data.tweensContainer) {
								/* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
								$.dequeue(element, opts.queue);

								return;
							} else {
								/*********************
								 Options Parsing
								 *********************/

								/* If the element was hidden via the display option in the previous call,
								 revert display to "auto" prior to reversal so that the element is visible again. */
								if (data.opts.display === "none") {
									data.opts.display = "auto";
								}

								if (data.opts.visibility === "hidden") {
									data.opts.visibility = "visible";
								}

								/* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
								 Further, remove the previous call's callback options; typically, users do not want these to be refired. */
								data.opts.loop = false;
								data.opts.begin = null;
								data.opts.complete = null;

								/* Since we're extending an opts object that has already been extended with the defaults options object,
								 we remove non-explicitly-defined properties that are auto-assigned values. */
								if (!options.easing) {
									delete opts.easing;
								}

								if (!options.duration) {
									delete opts.duration;
								}

								/* The opts object used for reversal is an extension of the options object optionally passed into this
								 reverse call plus the options used in the previous Velocity call. */
								opts = $.extend({}, data.opts, opts);

								/*************************************
								 Tweens Container Reconstruction
								 *************************************/

								/* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
								lastTweensContainer = $.extend(true, {}, data ? data.tweensContainer : null);

								/* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
								for (var lastTween in lastTweensContainer) {
									/* In addition to tween data, tweensContainers contain an element property that we ignore here. */
									if (lastTweensContainer.hasOwnProperty(lastTween) && lastTween !== "element") {
										var lastStartValue = lastTweensContainer[lastTween].startValue;

										lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
										lastTweensContainer[lastTween].endValue = lastStartValue;

										/* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
										 Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
										 The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
										if (!Type.isEmptyObject(options)) {
											lastTweensContainer[lastTween].easing = opts.easing;
										}

										if (Velocity.debug) {
											console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
										}
									}
								}

								tweensContainer = lastTweensContainer;
							}

							/*****************************************
							 Tween Data Construction (for Start)
							 *****************************************/

						} else if (action === "start") {

							/*************************
							 Value Transferring
							 *************************/

							/* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
							 while the element was in the process of being animated by Velocity, then this current call is safe to use
							 the end values from the prior call as its start values. Velocity attempts to perform this value transfer
							 process whenever possible in order to avoid requerying the DOM. */
							/* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
							 then the DOM is queried for the element's current values as a last resort. */
							/* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */

							data = Data(element);

							/* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
							 to transfer over end values to use as start values. If it's set to true and there is a previous
							 Velocity call to pull values from, do so. */
							if (data && data.tweensContainer && data.isAnimating === true) {
								lastTweensContainer = data.tweensContainer;
							}

							/***************************
							 Tween Data Calculation
							 ***************************/

							/* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
							/* Property map values can either take the form of 1) a single value representing the end value,
							 or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
							 The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
							 the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
							var parsePropertyValue = function(valueData, skipResolvingEasing) {
								var endValue, easing, startValue;

								/* If we have a function as the main argument then resolve it first, in case it returns an array that needs to be split */
								if (Type.isFunction(valueData)) {
									valueData = valueData.call(element, elementArrayIndex, elementsLength);
								}

								/* Handle the array format, which can be structured as one of three potential overloads:
								 A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
								if (Type.isArray(valueData)) {
									/* endValue is always the first item in the array. Don't bother validating endValue's value now
									 since the ensuing property cycling logic does that. */
									endValue = valueData[0];

									/* Two-item array format: If the second item is a number, function, or hex string, treat it as a
									 start value since easings can only be non-hex strings or arrays. */
									if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
										startValue = valueData[1];
										/* Two or three-item array: If the second item is a non-hex string easing name or an array, treat it as an easing. */
									} else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1]) && Velocity.Easings[valueData[1]]) || Type.isArray(valueData[1])) {
										easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

										/* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
										startValue = valueData[2];
									} else {
										startValue = valueData[1] || valueData[2];
									}
									/* Handle the single-value format. */
								} else {
									endValue = valueData;
								}

								/* Default to the call's easing if a per-property easing type was not defined. */
								if (!skipResolvingEasing) {
									easing = easing || opts.easing;
								}

								/* If functions were passed in as values, pass the function the current element as its context,
								 plus the element's index and the element set's size as arguments. Then, assign the returned value. */
								if (Type.isFunction(endValue)) {
									endValue = endValue.call(element, elementArrayIndex, elementsLength);
								}

								if (Type.isFunction(startValue)) {
									startValue = startValue.call(element, elementArrayIndex, elementsLength);
								}

								/* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
								return [endValue || 0, easing, startValue];
							};

							var fixPropertyValue = function(property, valueData) {
								/* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
								var rootProperty = CSS.Hooks.getRoot(property),
										rootPropertyValue = false,
										/* Parse out endValue, easing, and startValue from the property's data. */
										endValue = valueData[0],
										easing = valueData[1],
										startValue = valueData[2],
										pattern;

								/**************************
								 Start Value Sourcing
								 **************************/

								/* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
								 inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
								 Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
								/* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
								 there is no way to check for their explicit browser support, and so we skip skip this check for them. */
								if ((!data || !data.isSVG) && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
									if (Velocity.debug) {
										console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
									}
									return;
								}

								/* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
								 animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
								 a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
								if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
									startValue = 0;
								}

								/* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
								 for all of the current call's properties that were *also* animated in the previous call. */
								/* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
								if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
									if (startValue === undefined) {
										startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
									}

									/* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
									 instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
									 attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
									rootPropertyValue = data.rootPropertyValueCache[rootProperty];
									/* If values were not transferred from a previous Velocity call, query the DOM as needed. */
								} else {
									/* Handle hooked properties. */
									if (CSS.Hooks.registered[property]) {
										if (startValue === undefined) {
											rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
											/* Note: The following getPropertyValue() call does not actually trigger a DOM query;
											 getPropertyValue() will extract the hook from rootPropertyValue. */
											startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
											/* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
											 just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
											 root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
											 to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
										} else {
											/* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
											rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
										}
										/* Handle non-hooked properties that haven't already been defined via forcefeeding. */
									} else if (startValue === undefined) {
										startValue = CSS.getPropertyValue(element, property); /* GET */
									}
								}

								/**************************
								 Value Data Extraction
								 **************************/

								var separatedValue,
										endValueUnitType,
										startValueUnitType,
										operator = false;

								/* Separates a property value into its numeric value and its unit type. */
								var separateValue = function(property, value) {
									var unitType,
											numericValue;

									numericValue = (value || "0")
											.toString()
											.toLowerCase()
											/* Match the unit type at the end of the value. */
											.replace(/[%A-z]+$/, function(match) {
												/* Grab the unit type. */
												unitType = match;

												/* Strip the unit type off of value. */
												return "";
											});

									/* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
									if (!unitType) {
										unitType = CSS.Values.getUnitType(property);
									}

									return [numericValue, unitType];
								};

								if (startValue !== endValue && Type.isString(startValue) && Type.isString(endValue)) {
									pattern = "";
									var iStart = 0, // index in startValue
											iEnd = 0, // index in endValue
											aStart = [], // array of startValue numbers
											aEnd = [], // array of endValue numbers
											inCalc = 0, // Keep track of being inside a "calc()" so we don't duplicate it
											inRGB = 0, // Keep track of being inside an RGB as we can't use fractional values
											inRGBA = 0; // Keep track of being inside an RGBA as we must pass fractional for the alpha channel

									startValue = CSS.Hooks.fixColors(startValue);
									endValue = CSS.Hooks.fixColors(endValue);
									while (iStart < startValue.length && iEnd < endValue.length) {
										var cStart = startValue[iStart],
												cEnd = endValue[iEnd];

										if (/[\d\.]/.test(cStart) && /[\d\.]/.test(cEnd)) {
											var tStart = cStart, // temporary character buffer
													tEnd = cEnd, // temporary character buffer
													dotStart = ".", // Make sure we can only ever match a single dot in a decimal
													dotEnd = "."; // Make sure we can only ever match a single dot in a decimal

											while (++iStart < startValue.length) {
												cStart = startValue[iStart];
												if (cStart === dotStart) {
													dotStart = ".."; // Can never match two characters
												} else if (!/\d/.test(cStart)) {
													break;
												}
												tStart += cStart;
											}
											while (++iEnd < endValue.length) {
												cEnd = endValue[iEnd];
												if (cEnd === dotEnd) {
													dotEnd = ".."; // Can never match two characters
												} else if (!/\d/.test(cEnd)) {
													break;
												}
												tEnd += cEnd;
											}
											var uStart = CSS.Hooks.getUnit(startValue, iStart), // temporary unit type
													uEnd = CSS.Hooks.getUnit(endValue, iEnd); // temporary unit type

											iStart += uStart.length;
											iEnd += uEnd.length;
											if (uStart === uEnd) {
												// Same units
												if (tStart === tEnd) {
													// Same numbers, so just copy over
													pattern += tStart + uStart;
												} else {
													// Different numbers, so store them
													pattern += "{" + aStart.length + (inRGB ? "!" : "") + "}" + uStart;
													aStart.push(parseFloat(tStart));
													aEnd.push(parseFloat(tEnd));
												}
											} else {
												// Different units, so put into a "calc(from + to)" and animate each side to/from zero
												var nStart = parseFloat(tStart),
														nEnd = parseFloat(tEnd);

												pattern += (inCalc < 5 ? "calc" : "") + "("
														+ (nStart ? "{" + aStart.length + (inRGB ? "!" : "") + "}" : "0") + uStart
														+ " + "
														+ (nEnd ? "{" + (aStart.length + 1) + (inRGB ? "!" : "") + "}" : "0") + uEnd
														+ ")";
												if (nStart) {
													aStart.push(parseFloat(tStart));
													aStart.push(parseFloat(0));
												}
												if (nEnd) {
													aEnd.push(parseFloat(0));
													aEnd.push(parseFloat(tEnd));
												}
											}
										} else if (cStart === cEnd) {
											pattern += cStart;
											iStart++;
											iEnd++;
											// Keep track of being inside a calc()
											if (inCalc === 0 && cStart === "c"
													|| inCalc === 1 && cStart === "a"
													|| inCalc === 2 && cStart === "l"
													|| inCalc === 3 && cStart === "c"
													|| inCalc >= 4 && cStart === "("
													) {
												inCalc++;
											} else if ((inCalc && inCalc < 5)
													|| inCalc >= 4 && cStart === ")" && --inCalc < 5) {
												inCalc = 0;
											}
											// Keep track of being inside an rgb() / rgba()
											if (inRGB === 0 && cStart === "r"
													|| inRGB === 1 && cStart === "g"
													|| inRGB === 2 && cStart === "b"
													|| inRGB === 3 && cStart === "a"
													|| inRGB >= 3 && cStart === "("
													) {
												if (inRGB === 3 && cStart === "a") {
													inRGBA = 1;
												}
												inRGB++;
											} else if (inRGBA && cStart === ",") {
												if (++inRGBA > 3) {
													inRGB = inRGBA = 0;
												}
											} else if ((inRGBA && inRGB < (inRGBA ? 5 : 4))
													|| inRGB >= (inRGBA ? 4 : 3) && cStart === ")" && --inRGB < (inRGBA ? 5 : 4)) {
												inRGB = inRGBA = 0;
											}
										} else {
											inCalc = 0;
											// TODO: changing units, fixing colours
											break;
										}
									}
									if (iStart !== startValue.length || iEnd !== endValue.length) {
										if (Velocity.debug) {
											console.error("Trying to pattern match mis-matched strings [\"" + endValue + "\", \"" + startValue + "\"]");
										}
										pattern = undefined;
									}
									if (pattern) {
										if (aStart.length) {
											if (Velocity.debug) {
												console.log("Pattern found \"" + pattern + "\" -> ", aStart, aEnd, "[" + startValue + "," + endValue + "]");
											}
											startValue = aStart;
											endValue = aEnd;
											endValueUnitType = startValueUnitType = "";
										} else {
											pattern = undefined;
										}
									}
								}

								if (!pattern) {
									/* Separate startValue. */
									separatedValue = separateValue(property, startValue);
									startValue = separatedValue[0];
									startValueUnitType = separatedValue[1];

									/* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
									separatedValue = separateValue(property, endValue);
									endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
										operator = subMatch;

										/* Strip the operator off of the value. */
										return "";
									});
									endValueUnitType = separatedValue[1];

									/* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
									startValue = parseFloat(startValue) || 0;
									endValue = parseFloat(endValue) || 0;

									/***************************************
									 Property-Specific Value Conversion
									 ***************************************/

									/* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
									if (endValueUnitType === "%") {
										/* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
										 which is identical to the em unit's behavior, so we piggyback off of that. */
										if (/^(fontSize|lineHeight)$/.test(property)) {
											/* Convert % into an em decimal value. */
											endValue = endValue / 100;
											endValueUnitType = "em";
											/* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
										} else if (/^scale/.test(property)) {
											endValue = endValue / 100;
											endValueUnitType = "";
											/* For RGB components, take the defined percentage of 255 and strip off the unit type. */
										} else if (/(Red|Green|Blue)$/i.test(property)) {
											endValue = (endValue / 100) * 255;
											endValueUnitType = "";
										}
									}
								}

								/***************************
								 Unit Ratio Calculation
								 ***************************/

								/* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
								 %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
								 for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
								 from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
								 1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
								 2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
								/* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
								 setting values with the target unit type then comparing the returned pixel value. */
								/* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
								 of batching the SETs and GETs together upfront outweights the potential overhead
								 of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
								/* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
								var calculateUnitRatios = function() {

									/************************
									 Same Ratio Checks
									 ************************/

									/* The properties below are used to determine whether the element differs sufficiently from this call's
									 previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
									 of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
									 this is done to minimize DOM querying. */
									var sameRatioIndicators = {
										myParent: element.parentNode || document.body, /* GET */
										position: CSS.getPropertyValue(element, "position"), /* GET */
										fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
									},
											/* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
											samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
											/* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
											sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);

									/* Store these ratio indicators call-wide for the next element to compare against. */
									callUnitConversionData.lastParent = sameRatioIndicators.myParent;
									callUnitConversionData.lastPosition = sameRatioIndicators.position;
									callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

									/***************************
									 Element-Specific Units
									 ***************************/

									/* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
									 of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
									var measurement = 100,
											unitRatios = {};

									if (!sameEmRatio || !samePercentRatio) {
										var dummy = data && data.isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

										Velocity.init(dummy);
										sameRatioIndicators.myParent.appendChild(dummy);

										/* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
										 Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
										/* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
										$.each(["overflow", "overflowX", "overflowY"], function(i, property) {
											Velocity.CSS.setPropertyValue(dummy, property, "hidden");
										});
										Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
										Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
										Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

										/* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
										$.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(i, property) {
											Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
										});
										/* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
										Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

										/* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
										unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
										unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
										unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

										sameRatioIndicators.myParent.removeChild(dummy);
									} else {
										unitRatios.emToPx = callUnitConversionData.lastEmToPx;
										unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
										unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
									}

									/***************************
									 Element-Agnostic Units
									 ***************************/

									/* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
									 once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
									 that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
									 so we calculate it now. */
									if (callUnitConversionData.remToPx === null) {
										/* Default to browsers' default fontSize of 16px in the case of 0. */
										callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
									}

									/* Similarly, viewport units are %-relative to the window's inner dimensions. */
									if (callUnitConversionData.vwToPx === null) {
										callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
										callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
									}

									unitRatios.remToPx = callUnitConversionData.remToPx;
									unitRatios.vwToPx = callUnitConversionData.vwToPx;
									unitRatios.vhToPx = callUnitConversionData.vhToPx;

									if (Velocity.debug >= 1) {
										console.log("Unit ratios: " + JSON.stringify(unitRatios), element);
									}
									return unitRatios;
								};

								/********************
								 Unit Conversion
								 ********************/

								/* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
								if (/[\/*]/.test(operator)) {
									endValueUnitType = startValueUnitType;
									/* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
									 is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
									 on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
									 would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
									/* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
								} else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
									/* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
									/* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
									 match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
									 which remains past the point of the animation's completion. */
									if (endValue === 0) {
										endValueUnitType = startValueUnitType;
									} else {
										/* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
										 If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
										elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

										/* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
										/* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
										var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";

										/* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
										 1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
										switch (startValueUnitType) {
											case "%":
												/* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
												 Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
												 to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
												startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
												break;

											case "px":
												/* px acts as our midpoint in the unit conversion process; do nothing. */
												break;

											default:
												startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
										}

										/* Invert the px ratios to convert into to the target unit. */
										switch (endValueUnitType) {
											case "%":
												startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
												break;

											case "px":
												/* startValue is already in px, do nothing; we're done. */
												break;

											default:
												startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
										}
									}
								}

								/*********************
								 Relative Values
								 *********************/

								/* Operator logic must be performed last since it requires unit-normalized start and end values. */
								/* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
								 to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
								 50 points is added on top of the current % value. */
								switch (operator) {
									case "+":
										endValue = startValue + endValue;
										break;

									case "-":
										endValue = startValue - endValue;
										break;

									case "*":
										endValue = startValue * endValue;
										break;

									case "/":
										endValue = startValue / endValue;
										break;
								}

								/**************************
								 tweensContainer Push
								 **************************/

								/* Construct the per-property tween object, and push it to the element's tweensContainer. */
								tweensContainer[property] = {
									rootPropertyValue: rootPropertyValue,
									startValue: startValue,
									currentValue: startValue,
									endValue: endValue,
									unitType: endValueUnitType,
									easing: easing
								};
								if (pattern) {
									tweensContainer[property].pattern = pattern;
								}

								if (Velocity.debug) {
									console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
								}
							};

							/* Create a tween out of each property, and append its associated data to tweensContainer. */
							for (var property in propertiesMap) {

								if (!propertiesMap.hasOwnProperty(property)) {
									continue;
								}
								/* The original property name's format must be used for the parsePropertyValue() lookup,
								 but we then use its camelCase styling to normalize it for manipulation. */
								var propertyName = CSS.Names.camelCase(property),
										valueData = parsePropertyValue(propertiesMap[property]);

								/* Find shorthand color properties that have been passed a hex string. */
								/* Would be quicker to use CSS.Lists.colors.includes() if possible */
								if (CSS.Lists.colors.indexOf(propertyName) >= 0) {
									/* Parse the value data for each shorthand. */
									var endValue = valueData[0],
											easing = valueData[1],
											startValue = valueData[2];

									if (CSS.RegEx.isHex.test(endValue)) {
										/* Convert the hex strings into their RGB component arrays. */
										var colorComponents = ["Red", "Green", "Blue"],
												endValueRGB = CSS.Values.hexToRgb(endValue),
												startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

										/* Inject the RGB component tweens into propertiesMap. */
										for (var i = 0; i < colorComponents.length; i++) {
											var dataArray = [endValueRGB[i]];

											if (easing) {
												dataArray.push(easing);
											}

											if (startValueRGB !== undefined) {
												dataArray.push(startValueRGB[i]);
											}

											fixPropertyValue(propertyName + colorComponents[i], dataArray);
										}
										/* If we have replaced a shortcut color value then don't update the standard property name */
										continue;
									}
								}
								fixPropertyValue(propertyName, valueData);
							}

							/* Along with its property data, store a reference to the element itself onto tweensContainer. */
							tweensContainer.element = element;
						}

						/*****************
						 Call Push
						 *****************/

						/* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
						 being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
						if (tweensContainer.element) {
							/* Apply the "velocity-animating" indicator class. */
							CSS.Values.addClass(element, "velocity-animating");

							/* The call array houses the tweensContainers for each element being animated in the current call. */
							call.push(tweensContainer);

							data = Data(element);

							if (data) {
								/* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
								if (opts.queue === "") {

									data.tweensContainer = tweensContainer;
									data.opts = opts;
								}

								/* Switch on the element's animating flag. */
								data.isAnimating = true;
							}

							/* Once the final element in this call's element set has been processed, push the call array onto
							 Velocity.State.calls for the animation tick to immediately begin processing. */
							if (elementsIndex === elementsLength - 1) {
								/* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
								 Anything on this call container is subjected to tick() processing. */
								Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver, null, 0]);

								/* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
								if (Velocity.State.isTicking === false) {
									Velocity.State.isTicking = true;

									/* Start the tick loop. */
									tick();
								}
							} else {
								elementsIndex++;
							}
						}
					}

					/* When the queue option is set to false, the call skips the element's queue and fires immediately. */
					if (opts.queue === false) {
						/* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
						 we manually inject the delay property here with an explicit setTimeout. */
						if (opts.delay) {

							/* Temporarily store delayed elements to facilitate access for global pause/resume */
							var callIndex = Velocity.State.delayedElements.count++;
							Velocity.State.delayedElements[callIndex] = element;

							var delayComplete = (function(index) {
								return function() {
									/* Clear the temporary element */
									Velocity.State.delayedElements[index] = false;

									/* Finally, issue the call */
									buildQueue();
								};
							})(callIndex);

							Data(element).delayBegin = (new Date()).getTime();
							Data(element).delay = parseFloat(opts.delay);
							Data(element).delayTimer = {
								setTimeout: setTimeout(buildQueue, parseFloat(opts.delay)),
								next: delayComplete
							};
						} else {
							buildQueue();
						}
						/* Otherwise, the call undergoes element queueing as normal. */
						/* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
					} else {
						$.queue(element, opts.queue, function(next, clearQueue) {
							/* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
							 so it's fine if this is repeatedly triggered for each element in the associated call.) */
							if (clearQueue === true) {
								if (promiseData.promise) {
									promiseData.resolver(elements);
								}

								/* Do not continue with animation queueing. */
								return true;
							}

							/* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
							 See completeCall() for further details. */
							Velocity.velocityQueueEntryFlag = true;

							buildQueue(next);
						});
					}

					/*********************
					 Auto-Dequeuing
					 *********************/

					/* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
					 must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
					 for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
					 queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
					 first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
					/* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
					 each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
					/* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
					 Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
					if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
						$.dequeue(element);
					}
				}

				/**************************
				 Element Set Iteration
				 **************************/

				/* If the "nodeType" property exists on the elements variable, we're animating a single element.
				 Place it in an array so that $.each() can iterate over it. */
				$.each(elements, function(i, element) {
					/* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
					if (Type.isNode(element)) {
						processElement(element, i);
					}
				});

				/******************
				 Option: Loop
				 ******************/

				/* The loop option accepts an integer indicating how many times the element should loop between the values in the
				 current call's properties map and the element's property values prior to this call. */
				/* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
				 to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
				 which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
				opts = $.extend({}, Velocity.defaults, options);
				opts.loop = parseInt(opts.loop, 10);
				var reverseCallsCount = (opts.loop * 2) - 1;

				if (opts.loop) {
					/* Double the loop count to convert it into its appropriate number of "reverse" calls.
					 Subtract 1 from the resulting value since the current call is included in the total alternation count. */
					for (var x = 0; x < reverseCallsCount; x++) {
						/* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
						 isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
						 call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
						var reverseOptions = {
							delay: opts.delay,
							progress: opts.progress
						};

						/* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
						 so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
						if (x === reverseCallsCount - 1) {
							reverseOptions.display = opts.display;
							reverseOptions.visibility = opts.visibility;
							reverseOptions.complete = opts.complete;
						}

						animate(elements, "reverse", reverseOptions);
					}
				}

				/***************
				 Chaining
				 ***************/

				/* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
				return getChain();
			};

			/* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
			Velocity = $.extend(animate, Velocity);
			/* For legacy support, also expose the literal animate method. */
			Velocity.animate = animate;

			/**************
			 Timing
			 **************/

			/* Ticker function. */
			var ticker = window.requestAnimationFrame || rAFShim;

			/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
			 To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
			 devices to avoid wasting battery power on inactive tabs. */
			/* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
			if (!Velocity.State.isMobile && document.hidden !== undefined) {
				var updateTicker = function() {
					/* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
					if (document.hidden) {
						ticker = function(callback) {
							/* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
							return setTimeout(function() {
								callback(true);
							}, 16);
						};

						/* The rAF loop has been paused by the browser, so we manually restart the tick. */
						tick();
					} else {
						ticker = window.requestAnimationFrame || rAFShim;
					}
				};

				/* Page could be sitting in the background at this time (i.e. opened as new tab) so making sure we use correct ticker from the start */
				updateTicker();

				/* And then run check again every time visibility changes */
				document.addEventListener("visibilitychange", updateTicker);
			}

			/************
			 Tick
			 ************/

			/* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
			function tick(timestamp) {
				/* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
				 We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
				 the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
				 calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
				 the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
				 by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
				if (timestamp) {
					/* We normally use RAF's high resolution timestamp but as it can be significantly offset when the browser is
					 under high stress we give the option for choppiness over allowing the browser to drop huge chunks of frames.
					 We use performance.now() and shim it if it doesn't exist for when the tab is hidden. */
					var timeCurrent = Velocity.timestamp && timestamp !== true ? timestamp : performance.now();

					/********************
					 Call Iteration
					 ********************/

					var callsLength = Velocity.State.calls.length;

					/* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
					 when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
					 has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
					if (callsLength > 10000) {
						Velocity.State.calls = compactSparseArray(Velocity.State.calls);
						callsLength = Velocity.State.calls.length;
					}

					/* Iterate through each active call. */
					for (var i = 0; i < callsLength; i++) {
						/* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
						if (!Velocity.State.calls[i]) {
							continue;
						}

						/************************
						 Call-Wide Variables
						 ************************/

						var callContainer = Velocity.State.calls[i],
								call = callContainer[0],
								opts = callContainer[2],
								timeStart = callContainer[3],
								firstTick = !!timeStart,
								tweenDummyValue = null,
								pauseObject = callContainer[5],
								millisecondsEllapsed = callContainer[6];



						/* If timeStart is undefined, then this is the first time that this call has been processed by tick().
						 We assign timeStart now so that its value is as close to the real animation start time as possible.
						 (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
						 between that time and now would cause the first few frames of the tween to be skipped since
						 percentComplete is calculated relative to timeStart.) */
						/* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
						 first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
						 same style value as the element's current value. */
						if (!timeStart) {
							timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
						}

						/* If a pause object is present, skip processing unless it has been set to resume */
						if (pauseObject) {
							if (pauseObject.resume === true) {
								/* Update the time start to accomodate the paused completion amount */
								timeStart = callContainer[3] = Math.round(timeCurrent - millisecondsEllapsed - 16);

								/* Remove pause object after processing */
								callContainer[5] = null;
							} else {
								continue;
							}
						}

						millisecondsEllapsed = callContainer[6] = timeCurrent - timeStart;

						/* The tween's completion percentage is relative to the tween's start time, not the tween's start value
						 (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
						 Accordingly, we ensure that percentComplete does not exceed 1. */
						var percentComplete = Math.min((millisecondsEllapsed) / opts.duration, 1);

						/**********************
						 Element Iteration
						 **********************/

						/* For every call, iterate through each of the elements in its set. */
						for (var j = 0, callLength = call.length; j < callLength; j++) {
							var tweensContainer = call[j],
									element = tweensContainer.element;

							/* Check to see if this element has been deleted midway through the animation by checking for the
							 continued existence of its data cache. If it's gone, or the element is currently paused, skip animating this element. */
							if (!Data(element)) {
								continue;
							}

							var transformPropertyExists = false;

							/**********************************
							 Display & Visibility Toggling
							 **********************************/

							/* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
							 (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
							if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
								if (opts.display === "flex") {
									var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];

									$.each(flexValues, function(i, flexValue) {
										CSS.setPropertyValue(element, "display", flexValue);
									});
								}

								CSS.setPropertyValue(element, "display", opts.display);
							}

							/* Same goes with the visibility option, but its "none" equivalent is "hidden". */
							if (opts.visibility !== undefined && opts.visibility !== "hidden") {
								CSS.setPropertyValue(element, "visibility", opts.visibility);
							}

							/************************
							 Property Iteration
							 ************************/

							/* For every element, iterate through each property. */
							for (var property in tweensContainer) {
								/* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
								if (tweensContainer.hasOwnProperty(property) && property !== "element") {
									var tween = tweensContainer[property],
											currentValue,
											/* Easing can either be a pre-genereated function or a string that references a pre-registered easing
											 on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
											easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

									/******************************
									 Current Value Calculation
									 ******************************/

									if (Type.isString(tween.pattern)) {
										var patternReplace = percentComplete === 1 ?
												function($0, index, round) {
													var result = tween.endValue[index];

													return round ? Math.round(result) : result;
												} :
												function($0, index, round) {
													var startValue = tween.startValue[index],
															tweenDelta = tween.endValue[index] - startValue,
															result = startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));

													return round ? Math.round(result) : result;
												};

										currentValue = tween.pattern.replace(/{(\d+)(!)?}/g, patternReplace);
									} else if (percentComplete === 1) {
										/* If this is the last tick pass (if we've reached 100% completion for this tween),
										 ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
										currentValue = tween.endValue;
									} else {
										/* Otherwise, calculate currentValue based on the current delta from startValue. */
										var tweenDelta = tween.endValue - tween.startValue;

										currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));
										/* If no value change is occurring, don't proceed with DOM updating. */
									}
									if (!firstTick && (currentValue === tween.currentValue)) {
										continue;
									}

									tween.currentValue = currentValue;

									/* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
									 it can be passed into the progress callback. */
									if (property === "tween") {
										tweenDummyValue = currentValue;
									} else {
										/******************
										 Hooks: Part I
										 ******************/
										var hookRoot;

										/* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
										 for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
										 rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
										 updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
										 subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
										if (CSS.Hooks.registered[property]) {
											hookRoot = CSS.Hooks.getRoot(property);

											var rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

											if (rootPropertyValueCache) {
												tween.rootPropertyValue = rootPropertyValueCache;
											}
										}

										/*****************
										 DOM Update
										 *****************/

										/* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
										/* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
										var adjustedSetData = CSS.setPropertyValue(element, /* SET */
												property,
												tween.currentValue + (IE < 9 && parseFloat(currentValue) === 0 ? "" : tween.unitType),
												tween.rootPropertyValue,
												tween.scrollData);

										/*******************
										 Hooks: Part II
										 *******************/

										/* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
										if (CSS.Hooks.registered[property]) {
											/* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
											if (CSS.Normalizations.registered[hookRoot]) {
												Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
											} else {
												Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
											}
										}

										/***************
										 Transforms
										 ***************/

										/* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
										if (adjustedSetData[0] === "transform") {
											transformPropertyExists = true;
										}

									}
								}
							}

							/****************
							 mobileHA
							 ****************/

							/* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
							 It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
							if (opts.mobileHA) {
								/* Don't set the null transform hack if we've already done so. */
								if (Data(element).transformCache.translate3d === undefined) {
									/* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
									Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

									transformPropertyExists = true;
								}
							}

							if (transformPropertyExists) {
								CSS.flushTransformCache(element);
							}
						}

						/* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
						 Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
						if (opts.display !== undefined && opts.display !== "none") {
							Velocity.State.calls[i][2].display = false;
						}
						if (opts.visibility !== undefined && opts.visibility !== "hidden") {
							Velocity.State.calls[i][2].visibility = false;
						}

						/* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
						if (opts.progress) {
							opts.progress.call(callContainer[1],
									callContainer[1],
									percentComplete,
									Math.max(0, (timeStart + opts.duration) - timeCurrent),
									timeStart,
									tweenDummyValue);
						}

						/* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
						if (percentComplete === 1) {
							completeCall(i);
						}
					}
				}

				/* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
				if (Velocity.State.isTicking) {
					ticker(tick);
				}
			}

			/**********************
			 Call Completion
			 **********************/

			/* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
			function completeCall(callIndex, isStopped) {
				/* Ensure the call exists. */
				if (!Velocity.State.calls[callIndex]) {
					return false;
				}

				/* Pull the metadata from the call. */
				var call = Velocity.State.calls[callIndex][0],
						elements = Velocity.State.calls[callIndex][1],
						opts = Velocity.State.calls[callIndex][2],
						resolver = Velocity.State.calls[callIndex][4];

				var remainingCallsExist = false;

				/*************************
				 Element Finalization
				 *************************/

				for (var i = 0, callLength = call.length; i < callLength; i++) {
					var element = call[i].element;

					/* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
					/* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
					/* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
					if (!isStopped && !opts.loop) {
						if (opts.display === "none") {
							CSS.setPropertyValue(element, "display", opts.display);
						}

						if (opts.visibility === "hidden") {
							CSS.setPropertyValue(element, "visibility", opts.visibility);
						}
					}

					/* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
					 a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
					 an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
					 we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
					 is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
					var data = Data(element);

					if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
						/* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
						if (data) {
							data.isAnimating = false;
							/* Clear the element's rootPropertyValueCache, which will become stale. */
							data.rootPropertyValueCache = {};

							var transformHAPropertyExists = false;
							/* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
							$.each(CSS.Lists.transforms3D, function(i, transformName) {
								var defaultValue = /^scale/.test(transformName) ? 1 : 0,
										currentValue = data.transformCache[transformName];

								if (data.transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
									transformHAPropertyExists = true;

									delete data.transformCache[transformName];
								}
							});

							/* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
							if (opts.mobileHA) {
								transformHAPropertyExists = true;
								delete data.transformCache.translate3d;
							}

							/* Flush the subproperty removals to the DOM. */
							if (transformHAPropertyExists) {
								CSS.flushTransformCache(element);
							}

							/* Remove the "velocity-animating" indicator class. */
							CSS.Values.removeClass(element, "velocity-animating");
						}
					}

					/*********************
					 Option: Complete
					 *********************/

					/* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
					/* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
					if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
						/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
						try {
							opts.complete.call(elements, elements);
						} catch (error) {
							setTimeout(function() {
								throw error;
							}, 1);
						}
					}

					/**********************
					 Promise Resolving
					 **********************/

					/* Note: Infinite loops don't return promises. */
					if (resolver && opts.loop !== true) {
						resolver(elements);
					}

					/****************************
					 Option: Loop (Infinite)
					 ****************************/

					if (data && opts.loop === true && !isStopped) {
						/* If a rotateX/Y/Z property is being animated by 360 deg with loop:true, swap tween start/end values to enable
						 continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
						$.each(data.tweensContainer, function(propertyName, tweenContainer) {
							if (/^rotate/.test(propertyName) && ((parseFloat(tweenContainer.startValue) - parseFloat(tweenContainer.endValue)) % 360 === 0)) {
								var oldStartValue = tweenContainer.startValue;

								tweenContainer.startValue = tweenContainer.endValue;
								tweenContainer.endValue = oldStartValue;
							}

							if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
								tweenContainer.endValue = 0;
								tweenContainer.startValue = 100;
							}
						});

						Velocity(element, "reverse", {loop: true, delay: opts.delay});
					}

					/***************
					 Dequeueing
					 ***************/

					/* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
					 which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
					 $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
					if (opts.queue !== false) {
						$.dequeue(element, opts.queue);
					}
				}

				/************************
				 Calls Array Cleanup
				 ************************/

				/* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
				 (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
				Velocity.State.calls[callIndex] = false;

				/* Iterate through the calls array to determine if this was the final in-progress animation.
				 If so, set a flag to end ticking and clear the calls array. */
				for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
					if (Velocity.State.calls[j] !== false) {
						remainingCallsExist = true;

						break;
					}
				}

				if (remainingCallsExist === false) {
					/* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
					Velocity.State.isTicking = false;

					/* Clear the calls array so that its length is reset. */
					delete Velocity.State.calls;
					Velocity.State.calls = [];
				}
			}

			/******************
			 Frameworks
			 ******************/

			/* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
			 If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
			 also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
			 accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
			 (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
			global.Velocity = Velocity;

			if (global !== window) {
				/* Assign the element function to Velocity's core animate() method. */
				global.fn.velocity = animate;
				/* Assign the object function's defaults to Velocity's global defaults object. */
				global.fn.velocity.defaults = Velocity.defaults;
			}

			/***********************
			 Packaged Redirects
			 ***********************/

			/* slideUp, slideDown */
			$.each(["Down", "Up"], function(i, direction) {
				Velocity.Redirects["slide" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
					var opts = $.extend({}, options),
							begin = opts.begin,
							complete = opts.complete,
							inlineValues = {},
							computedValues = {height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: ""};

					if (opts.display === undefined) {
						/* Show the element before slideDown begins and hide the element after slideUp completes. */
						/* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
						opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
					}

					opts.begin = function() {
						/* If the user passed in a begin callback, fire it now. */
						if (elementsIndex === 0 && begin) {
							begin.call(elements, elements);
						}

						/* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
						for (var property in computedValues) {
							if (!computedValues.hasOwnProperty(property)) {
								continue;
							}
							inlineValues[property] = element.style[property];

							/* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
							 use forcefeeding to start from computed values and animate down to 0. */
							var propertyValue = CSS.getPropertyValue(element, property);
							computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
						}

						/* Force vertical overflow content to clip so that sliding works as expected. */
						inlineValues.overflow = element.style.overflow;
						element.style.overflow = "hidden";
					};

					opts.complete = function() {
						/* Reset element to its pre-slide inline values once its slide animation is complete. */
						for (var property in inlineValues) {
							if (inlineValues.hasOwnProperty(property)) {
								element.style[property] = inlineValues[property];
							}
						}

						/* If the user passed in a complete callback, fire it now. */
						if (elementsIndex === elementsSize - 1) {
							if (complete) {
								complete.call(elements, elements);
							}
							if (promiseData) {
								promiseData.resolver(elements);
							}
						}
					};

					Velocity(element, computedValues, opts);
				};
			});

			/* fadeIn, fadeOut */
			$.each(["In", "Out"], function(i, direction) {
				Velocity.Redirects["fade" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
					var opts = $.extend({}, options),
							complete = opts.complete,
							propertiesMap = {opacity: (direction === "In") ? 1 : 0};

					/* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
					 callbacks by firing them only when the final element has been reached. */
					if (elementsIndex !== 0) {
						opts.begin = null;
					}
					if (elementsIndex !== elementsSize - 1) {
						opts.complete = null;
					} else {
						opts.complete = function() {
							if (complete) {
								complete.call(elements, elements);
							}
							if (promiseData) {
								promiseData.resolver(elements);
							}
						};
					}

					/* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
					/* Note: We allow users to pass in "null" to skip display setting altogether. */
					if (opts.display === undefined) {
						opts.display = (direction === "In" ? "auto" : "none");
					}

					Velocity(this, propertiesMap, opts);
				};
			});

			return Velocity;
		}((__webpack_provided_window_dot_jQuery || window.Zepto || window), window, (window ? window.document : undefined));
	}));

	/******************
	 Known Issues
	 ******************/

	/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
	 Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
	 will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(1)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @author zhixin wen <wenzhixin2010@gmail.com>
	 * version: 1.11.0
	 * https://github.com/wenzhixin/bootstrap-table/
	 */

	(function ($) {
	    'use strict';

	    // TOOLS DEFINITION
	    // ======================

	    var cachedWidth = null;

	    // it only does '%s', and return '' when arguments are undefined
	    var sprintf = function (str) {
	        var args = arguments,
	            flag = true,
	            i = 1;

	        str = str.replace(/%s/g, function () {
	            var arg = args[i++];

	            if (typeof arg === 'undefined') {
	                flag = false;
	                return '';
	            }
	            return arg;
	        });
	        return flag ? str : '';
	    };

	    var getPropertyFromOther = function (list, from, to, value) {
	        var result = '';
	        $.each(list, function (i, item) {
	            if (item[from] === value) {
	                result = item[to];
	                return false;
	            }
	            return true;
	        });
	        return result;
	    };

	    var getFieldIndex = function (columns, field) {
	        var index = -1;

	        $.each(columns, function (i, column) {
	            if (column.field === field) {
	                index = i;
	                return false;
	            }
	            return true;
	        });
	        return index;
	    };

	    // http://jsfiddle.net/wenyi/47nz7ez9/3/
	    var setFieldIndex = function (columns) {
	        var i, j, k,
	            totalCol = 0,
	            flag = [];

	        for (i = 0; i < columns[0].length; i++) {
	            totalCol += columns[0][i].colspan || 1;
	        }

	        for (i = 0; i < columns.length; i++) {
	            flag[i] = [];
	            for (j = 0; j < totalCol; j++) {
	                flag[i][j] = false;
	            }
	        }

	        for (i = 0; i < columns.length; i++) {
	            for (j = 0; j < columns[i].length; j++) {
	                var r = columns[i][j],
	                    rowspan = r.rowspan || 1,
	                    colspan = r.colspan || 1,
	                    index = $.inArray(false, flag[i]);

	                if (colspan === 1) {
	                    r.fieldIndex = index;
	                    // when field is undefined, use index instead
	                    if (typeof r.field === 'undefined') {
	                        r.field = index;
	                    }
	                }

	                for (k = 0; k < rowspan; k++) {
	                    flag[i + k][index] = true;
	                }
	                for (k = 0; k < colspan; k++) {
	                    flag[i][index + k] = true;
	                }
	            }
	        }
	    };

	    var getScrollBarWidth = function () {
	        if (cachedWidth === null) {
	            var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
	                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
	                w1, w2;

	            outer.append(inner);
	            $('body').append(outer);

	            w1 = inner[0].offsetWidth;
	            outer.css('overflow', 'scroll');
	            w2 = inner[0].offsetWidth;

	            if (w1 === w2) {
	                w2 = outer[0].clientWidth;
	            }

	            outer.remove();
	            cachedWidth = w1 - w2;
	        }
	        return cachedWidth;
	    };

	    var calculateObjectValue = function (self, name, args, defaultValue) {
	        var func = name;

	        if (typeof name === 'string') {
	            // support obj.func1.func2
	            var names = name.split('.');

	            if (names.length > 1) {
	                func = window;
	                $.each(names, function (i, f) {
	                    func = func[f];
	                });
	            } else {
	                func = window[name];
	            }
	        }
	        if (typeof func === 'object') {
	            return func;
	        }
	        if (typeof func === 'function') {
	            return func.apply(self, args);
	        }
	        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
	            return sprintf.apply(this, [name].concat(args));
	        }
	        return defaultValue;
	    };

	    var compareObjects = function (objectA, objectB, compareLength) {
	        // Create arrays of property names
	        var objectAProperties = Object.getOwnPropertyNames(objectA),
	            objectBProperties = Object.getOwnPropertyNames(objectB),
	            propName = '';

	        if (compareLength) {
	            // If number of properties is different, objects are not equivalent
	            if (objectAProperties.length !== objectBProperties.length) {
	                return false;
	            }
	        }

	        for (var i = 0; i < objectAProperties.length; i++) {
	            propName = objectAProperties[i];

	            // If the property is not in the object B properties, continue with the next property
	            if ($.inArray(propName, objectBProperties) > -1) {
	                // If values of same property are not equal, objects are not equivalent
	                if (objectA[propName] !== objectB[propName]) {
	                    return false;
	                }
	            }
	        }

	        // If we made it this far, objects are considered equivalent
	        return true;
	    };

	    var escapeHTML = function (text) {
	        if (typeof text === 'string') {
	            return text
	                .replace(/&/g, '&amp;')
	                .replace(/</g, '&lt;')
	                .replace(/>/g, '&gt;')
	                .replace(/"/g, '&quot;')
	                .replace(/'/g, '&#039;')
	                .replace(/`/g, '&#x60;');
	        }
	        return text;
	    };

	    var getRealHeight = function ($el) {
	        var height = 0;
	        $el.children().each(function () {
	            if (height < $(this).outerHeight(true)) {
	                height = $(this).outerHeight(true);
	            }
	        });
	        return height;
	    };

	    var getRealDataAttr = function (dataAttr) {
	        for (var attr in dataAttr) {
	            var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase();
	            if (auxAttr !== attr) {
	                dataAttr[auxAttr] = dataAttr[attr];
	                delete dataAttr[attr];
	            }
	        }

	        return dataAttr;
	    };

	    var getItemField = function (item, field, escape) {
	        var value = item;

	        if (typeof field !== 'string' || item.hasOwnProperty(field)) {
	            return escape ? escapeHTML(item[field]) : item[field];
	        }
	        var props = field.split('.');
	        for (var p in props) {
	            value = value && value[props[p]];
	        }
	        return escape ? escapeHTML(value) : value;
	    };

	    var isIEBrowser = function () {
	        return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
	    };

	    var objectKeys = function () {
	        // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	        if (!Object.keys) {
	            Object.keys = (function() {
	                var hasOwnProperty = Object.prototype.hasOwnProperty,
	                    hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
	                    dontEnums = [
	                        'toString',
	                        'toLocaleString',
	                        'valueOf',
	                        'hasOwnProperty',
	                        'isPrototypeOf',
	                        'propertyIsEnumerable',
	                        'constructor'
	                    ],
	                    dontEnumsLength = dontEnums.length;

	                return function(obj) {
	                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
	                        throw new TypeError('Object.keys called on non-object');
	                    }

	                    var result = [], prop, i;

	                    for (prop in obj) {
	                        if (hasOwnProperty.call(obj, prop)) {
	                            result.push(prop);
	                        }
	                    }

	                    if (hasDontEnumBug) {
	                        for (i = 0; i < dontEnumsLength; i++) {
	                            if (hasOwnProperty.call(obj, dontEnums[i])) {
	                                result.push(dontEnums[i]);
	                            }
	                        }
	                    }
	                    return result;
	                };
	            }());
	        }
	    };

	    // BOOTSTRAP TABLE CLASS DEFINITION
	    // ======================

	    var BootstrapTable = function (el, options) {
	        this.options = options;
	        this.$el = $(el);
	        this.$el_ = this.$el.clone();
	        this.timeoutId_ = 0;
	        this.timeoutFooter_ = 0;

	        this.init();
	    };

	    BootstrapTable.DEFAULTS = {
	        classes: 'table table-hover',
	        locale: undefined,
	        height: undefined,
	        undefinedText: '-',
	        sortName: undefined,
	        sortOrder: 'asc',
	        sortStable: false,
	        striped: false,
	        columns: [[]],
	        data: [],
	        dataField: 'rows',
	        method: 'get',
	        url: undefined,
	        ajax: undefined,
	        cache: true,
	        contentType: 'application/json',
	        dataType: 'json',
	        ajaxOptions: {},
	        queryParams: function (params) {
	            return params;
	        },
	        queryParamsType: 'limit', // undefined
	        responseHandler: function (res) {
	            return res;
	        },
	        pagination: false,
	        onlyInfoPagination: false,
	        sidePagination: 'client', // client or server
	        totalRows: 0, // server side need to set
	        pageNumber: 1,
	        pageSize: 10,
	        pageList: [10, 25, 50, 100],
	        paginationHAlign: 'right', //right, left
	        paginationVAlign: 'bottom', //bottom, top, both
	        paginationDetailHAlign: 'left', //right, left
	        paginationPreText: '&lsaquo;',
	        paginationNextText: '&rsaquo;',
	        search: false,
	        searchOnEnterKey: false,
	        strictSearch: false,
	        searchAlign: 'right',
	        selectItemName: 'btSelectItem',
	        showHeader: true,
	        showFooter: false,
	        showColumns: false,
	        showPaginationSwitch: false,
	        showRefresh: false,
	        showToggle: false,
	        buttonsAlign: 'right',
	        smartDisplay: true,
	        escape: false,
	        minimumCountColumns: 1,
	        idField: undefined,
	        uniqueId: undefined,
	        cardView: false,
	        detailView: false,
	        detailFormatter: function (index, row) {
	            return '';
	        },
	        trimOnSearch: true,
	        clickToSelect: false,
	        singleSelect: false,
	        toolbar: undefined,
	        toolbarAlign: 'left',
	        checkboxHeader: true,
	        sortable: true,
	        silentSort: true,
	        maintainSelected: false,
	        searchTimeOut: 500,
	        searchText: '',
	        iconSize: undefined,
	        buttonsClass: 'default',
	        iconsPrefix: 'glyphicon', // glyphicon of fa (font awesome)
	        icons: {
	            paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
	            paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
	            refresh: 'glyphicon-refresh icon-refresh',
	            toggle: 'glyphicon-list-alt icon-list-alt',
	            columns: 'glyphicon-th icon-th',
	            detailOpen: 'glyphicon-plus icon-plus',
	            detailClose: 'glyphicon-minus icon-minus'
	        },

	        customSearch: $.noop,

	        customSort: $.noop,

	        rowStyle: function (row, index) {
	            return {};
	        },

	        rowAttributes: function (row, index) {
	            return {};
	        },

	        footerStyle: function (row, index) {
	            return {};
	        },

	        onAll: function (name, args) {
	            return false;
	        },
	        onClickCell: function (field, value, row, $element) {
	            return false;
	        },
	        onDblClickCell: function (field, value, row, $element) {
	            return false;
	        },
	        onClickRow: function (item, $element) {
	            return false;
	        },
	        onDblClickRow: function (item, $element) {
	            return false;
	        },
	        onSort: function (name, order) {
	            return false;
	        },
	        onCheck: function (row) {
	            return false;
	        },
	        onUncheck: function (row) {
	            return false;
	        },
	        onCheckAll: function (rows) {
	            return false;
	        },
	        onUncheckAll: function (rows) {
	            return false;
	        },
	        onCheckSome: function (rows) {
	            return false;
	        },
	        onUncheckSome: function (rows) {
	            return false;
	        },
	        onLoadSuccess: function (data) {
	            return false;
	        },
	        onLoadError: function (status) {
	            return false;
	        },
	        onColumnSwitch: function (field, checked) {
	            return false;
	        },
	        onPageChange: function (number, size) {
	            return false;
	        },
	        onSearch: function (text) {
	            return false;
	        },
	        onToggle: function (cardView) {
	            return false;
	        },
	        onPreBody: function (data) {
	            return false;
	        },
	        onPostBody: function () {
	            return false;
	        },
	        onPostHeader: function () {
	            return false;
	        },
	        onExpandRow: function (index, row, $detail) {
	            return false;
	        },
	        onCollapseRow: function (index, row) {
	            return false;
	        },
	        onRefreshOptions: function (options) {
	            return false;
	        },
	        onRefresh: function (params) {
	          return false;
	        },
	        onResetView: function () {
	            return false;
	        }
	    };

	    BootstrapTable.LOCALES = {};

	    BootstrapTable.LOCALES['en-US'] = BootstrapTable.LOCALES.en = {
	        formatLoadingMessage: function () {
	            return 'Loading, please wait...';
	        },
	        formatRecordsPerPage: function (pageNumber) {
	            return sprintf('%s rows per page', pageNumber);
	        },
	        formatShowingRows: function (pageFrom, pageTo, totalRows) {
	            return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
	        },
	        formatDetailPagination: function (totalRows) {
	            return sprintf('Showing %s rows', totalRows);
	        },
	        formatSearch: function () {
	            return 'Search';
	        },
	        formatNoMatches: function () {
	            return 'No matching records found';
	        },
	        formatPaginationSwitch: function () {
	            return 'Hide/Show pagination';
	        },
	        formatRefresh: function () {
	            return 'Refresh';
	        },
	        formatToggle: function () {
	            return 'Toggle';
	        },
	        formatColumns: function () {
	            return 'Columns';
	        },
	        formatAllRows: function () {
	            return 'All';
	        }
	    };

	    $.extend(BootstrapTable.DEFAULTS, BootstrapTable.LOCALES['en-US']);

	    BootstrapTable.COLUMN_DEFAULTS = {
	        radio: false,
	        checkbox: false,
	        checkboxEnabled: true,
	        field: undefined,
	        title: undefined,
	        titleTooltip: undefined,
	        'class': undefined,
	        align: undefined, // left, right, center
	        halign: undefined, // left, right, center
	        falign: undefined, // left, right, center
	        valign: undefined, // top, middle, bottom
	        width: undefined,
	        sortable: false,
	        order: 'asc', // asc, desc
	        visible: true,
	        switchable: true,
	        clickToSelect: true,
	        formatter: undefined,
	        footerFormatter: undefined,
	        events: undefined,
	        sorter: undefined,
	        sortName: undefined,
	        cellStyle: undefined,
	        searchable: true,
	        searchFormatter: true,
	        cardVisible: true
	    };

	    BootstrapTable.EVENTS = {
	        'all.bs.table': 'onAll',
	        'click-cell.bs.table': 'onClickCell',
	        'dbl-click-cell.bs.table': 'onDblClickCell',
	        'click-row.bs.table': 'onClickRow',
	        'dbl-click-row.bs.table': 'onDblClickRow',
	        'sort.bs.table': 'onSort',
	        'check.bs.table': 'onCheck',
	        'uncheck.bs.table': 'onUncheck',
	        'check-all.bs.table': 'onCheckAll',
	        'uncheck-all.bs.table': 'onUncheckAll',
	        'check-some.bs.table': 'onCheckSome',
	        'uncheck-some.bs.table': 'onUncheckSome',
	        'load-success.bs.table': 'onLoadSuccess',
	        'load-error.bs.table': 'onLoadError',
	        'column-switch.bs.table': 'onColumnSwitch',
	        'page-change.bs.table': 'onPageChange',
	        'search.bs.table': 'onSearch',
	        'toggle.bs.table': 'onToggle',
	        'pre-body.bs.table': 'onPreBody',
	        'post-body.bs.table': 'onPostBody',
	        'post-header.bs.table': 'onPostHeader',
	        'expand-row.bs.table': 'onExpandRow',
	        'collapse-row.bs.table': 'onCollapseRow',
	        'refresh-options.bs.table': 'onRefreshOptions',
	        'reset-view.bs.table': 'onResetView',
	        'refresh.bs.table': 'onRefresh'
	    };

	    BootstrapTable.prototype.init = function () {
	        this.initLocale();
	        this.initContainer();
	        this.initTable();
	        this.initHeader();
	        this.initData();
	        this.initFooter();
	        this.initToolbar();
	        this.initPagination();
	        this.initBody();
	        this.initSearchText();
	        this.initServer();
	    };

	    BootstrapTable.prototype.initLocale = function () {
	        if (this.options.locale) {
	            var parts = this.options.locale.split(/-|_/);
	            parts[0].toLowerCase();
	            if (parts[1]) parts[1].toUpperCase();
	            if ($.fn.bootstrapTable.locales[this.options.locale]) {
	                // locale as requested
	                $.extend(this.options, $.fn.bootstrapTable.locales[this.options.locale]);
	            } else if ($.fn.bootstrapTable.locales[parts.join('-')]) {
	                // locale with sep set to - (in case original was specified with _)
	                $.extend(this.options, $.fn.bootstrapTable.locales[parts.join('-')]);
	            } else if ($.fn.bootstrapTable.locales[parts[0]]) {
	                // short locale language code (i.e. 'en')
	                $.extend(this.options, $.fn.bootstrapTable.locales[parts[0]]);
	            }
	        }
	    };

	    BootstrapTable.prototype.initContainer = function () {
	        this.$container = $([
	            '<div class="bootstrap-table">',
	            '<div class="fixed-table-toolbar"></div>',
	            this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
	                '<div class="fixed-table-pagination" style="clear: both;"></div>' :
	                '',
	            '<div class="fixed-table-container">',
	            '<div class="fixed-table-header"><table></table></div>',
	            '<div class="fixed-table-body">',
	            '<div class="fixed-table-loading">',
	            this.options.formatLoadingMessage(),
	            '</div>',
	            '</div>',
	            '<div class="fixed-table-footer"><table><tr></tr></table></div>',
	            this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both' ?
	                '<div class="fixed-table-pagination"></div>' :
	                '',
	            '</div>',
	            '</div>'
	        ].join(''));

	        this.$container.insertAfter(this.$el);
	        this.$tableContainer = this.$container.find('.fixed-table-container');
	        this.$tableHeader = this.$container.find('.fixed-table-header');
	        this.$tableBody = this.$container.find('.fixed-table-body');
	        this.$tableLoading = this.$container.find('.fixed-table-loading');
	        this.$tableFooter = this.$container.find('.fixed-table-footer');
	        this.$toolbar = this.$container.find('.fixed-table-toolbar');
	        this.$pagination = this.$container.find('.fixed-table-pagination');

	        this.$tableBody.append(this.$el);
	        this.$container.after('<div class="clearfix"></div>');

	        this.$el.addClass(this.options.classes);
	        if (this.options.striped) {
	            this.$el.addClass('table-striped');
	        }
	        if ($.inArray('table-no-bordered', this.options.classes.split(' ')) !== -1) {
	            this.$tableContainer.addClass('table-no-bordered');
	        }
	    };

	    BootstrapTable.prototype.initTable = function () {
	        var that = this,
	            columns = [],
	            data = [];

	        this.$header = this.$el.find('>thead');
	        if (!this.$header.length) {
	            this.$header = $('<thead></thead>').appendTo(this.$el);
	        }
	        this.$header.find('tr').each(function () {
	            var column = [];

	            $(this).find('th').each(function () {
	                // Fix #2014 - getFieldIndex and elsewhere assume this is string, causes issues if not
	                if (typeof $(this).data('field') !== 'undefined') {
	                    $(this).data('field', $(this).data('field') + '');
	                }
	                column.push($.extend({}, {
	                    title: $(this).html(),
	                    'class': $(this).attr('class'),
	                    titleTooltip: $(this).attr('title'),
	                    rowspan: $(this).attr('rowspan') ? +$(this).attr('rowspan') : undefined,
	                    colspan: $(this).attr('colspan') ? +$(this).attr('colspan') : undefined
	                }, $(this).data()));
	            });
	            columns.push(column);
	        });
	        if (!$.isArray(this.options.columns[0])) {
	            this.options.columns = [this.options.columns];
	        }
	        this.options.columns = $.extend(true, [], columns, this.options.columns);
	        this.columns = [];

	        setFieldIndex(this.options.columns);
	        $.each(this.options.columns, function (i, columns) {
	            $.each(columns, function (j, column) {
	                column = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, column);

	                if (typeof column.fieldIndex !== 'undefined') {
	                    that.columns[column.fieldIndex] = column;
	                }

	                that.options.columns[i][j] = column;
	            });
	        });

	        // if options.data is setting, do not process tbody data
	        if (this.options.data.length) {
	            return;
	        }

	        var m = [];
	        this.$el.find('>tbody>tr').each(function (y) {
	            var row = {};

	            // save tr's id, class and data-* attributes
	            row._id = $(this).attr('id');
	            row._class = $(this).attr('class');
	            row._data = getRealDataAttr($(this).data());

	            $(this).find('>td').each(function (x) {
	                var $this = $(this),
	                    cspan = +$this.attr('colspan') || 1,
	                    rspan = +$this.attr('rowspan') || 1,
	                    tx, ty;

	                for (; m[y] && m[y][x]; x++); //skip already occupied cells in current row

	                for (tx = x; tx < x + cspan; tx++) { //mark matrix elements occupied by current cell with true
	                    for (ty = y; ty < y + rspan; ty++) {
	                        if (!m[ty]) { //fill missing rows
	                            m[ty] = [];
	                        }
	                        m[ty][tx] = true;
	                    }
	                }

	                var field = that.columns[x].field;

	                row[field] = $(this).html();
	                // save td's id, class and data-* attributes
	                row['_' + field + '_id'] = $(this).attr('id');
	                row['_' + field + '_class'] = $(this).attr('class');
	                row['_' + field + '_rowspan'] = $(this).attr('rowspan');
	                row['_' + field + '_colspan'] = $(this).attr('colspan');
	                row['_' + field + '_title'] = $(this).attr('title');
	                row['_' + field + '_data'] = getRealDataAttr($(this).data());
	            });
	            data.push(row);
	        });
	        this.options.data = data;
	        if (data.length) this.fromHtml = true;
	    };

	    BootstrapTable.prototype.initHeader = function () {
	        var that = this,
	            visibleColumns = {},
	            html = [];

	        this.header = {
	            fields: [],
	            styles: [],
	            classes: [],
	            formatters: [],
	            events: [],
	            sorters: [],
	            sortNames: [],
	            cellStyles: [],
	            searchables: []
	        };

	        $.each(this.options.columns, function (i, columns) {
	            html.push('<tr>');

	            if (i === 0 && !that.options.cardView && that.options.detailView) {
	                html.push(sprintf('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>',
	                    that.options.columns.length));
	            }

	            $.each(columns, function (j, column) {
	                var text = '',
	                    halign = '', // header align style
	                    align = '', // body align style
	                    style = '',
	                    class_ = sprintf(' class="%s"', column['class']),
	                    order = that.options.sortOrder || column.order,
	                    unitWidth = 'px',
	                    width = column.width;

	                if (column.width !== undefined && (!that.options.cardView)) {
	                    if (typeof column.width === 'string') {
	                        if (column.width.indexOf('%') !== -1) {
	                            unitWidth = '%';
	                        }
	                    }
	                }
	                if (column.width && typeof column.width === 'string') {
	                    width = column.width.replace('%', '').replace('px', '');
	                }

	                halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
	                align = sprintf('text-align: %s; ', column.align);
	                style = sprintf('vertical-align: %s; ', column.valign);
	                style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width ?
	                    '36px' : (width ? width + unitWidth : undefined));

	                if (typeof column.fieldIndex !== 'undefined') {
	                    that.header.fields[column.fieldIndex] = column.field;
	                    that.header.styles[column.fieldIndex] = align + style;
	                    that.header.classes[column.fieldIndex] = class_;
	                    that.header.formatters[column.fieldIndex] = column.formatter;
	                    that.header.events[column.fieldIndex] = column.events;
	                    that.header.sorters[column.fieldIndex] = column.sorter;
	                    that.header.sortNames[column.fieldIndex] = column.sortName;
	                    that.header.cellStyles[column.fieldIndex] = column.cellStyle;
	                    that.header.searchables[column.fieldIndex] = column.searchable;

	                    if (!column.visible) {
	                        return;
	                    }

	                    if (that.options.cardView && (!column.cardVisible)) {
	                        return;
	                    }

	                    visibleColumns[column.field] = column;
	                }

	                html.push('<th' + sprintf(' title="%s"', column.titleTooltip),
	                    column.checkbox || column.radio ?
	                        sprintf(' class="bs-checkbox %s"', column['class'] || '') :
	                        class_,
	                    sprintf(' style="%s"', halign + style),
	                    sprintf(' rowspan="%s"', column.rowspan),
	                    sprintf(' colspan="%s"', column.colspan),
	                    sprintf(' data-field="%s"', column.field),
	                    "tabindex='0'",
	                    '>');

	                html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ?
	                    'sortable both' : ''));

	                text = column.title;

	                if (column.checkbox) {
	                    if (!that.options.singleSelect && that.options.checkboxHeader) {
	                        text = '<input name="btSelectAll" type="checkbox" />';
	                    }
	                    that.header.stateField = column.field;
	                }
	                if (column.radio) {
	                    text = '';
	                    that.header.stateField = column.field;
	                    that.options.singleSelect = true;
	                }

	                html.push(text);
	                html.push('</div>');
	                html.push('<div class="fht-cell"></div>');
	                html.push('</div>');
	                html.push('</th>');
	            });
	            html.push('</tr>');
	        });

	        this.$header.html(html.join(''));
	        this.$header.find('th[data-field]').each(function (i) {
	            $(this).data(visibleColumns[$(this).data('field')]);
	        });
	        this.$container.off('click', '.th-inner').on('click', '.th-inner', function (event) {
	            var target = $(this);

	            if (that.options.detailView) {
	                if (target.closest('.bootstrap-table')[0] !== that.$container[0])
	                    return false;
	            }

	            if (that.options.sortable && target.parent().data().sortable) {
	                that.onSort(event);
	            }
	        });

	        this.$header.children().children().off('keypress').on('keypress', function (event) {
	            if (that.options.sortable && $(this).data().sortable) {
	                var code = event.keyCode || event.which;
	                if (code == 13) { //Enter keycode
	                    that.onSort(event);
	                }
	            }
	        });

	        $(window).off('resize.bootstrap-table');
	        if (!this.options.showHeader || this.options.cardView) {
	            this.$header.hide();
	            this.$tableHeader.hide();
	            this.$tableLoading.css('top', 0);
	        } else {
	            this.$header.show();
	            this.$tableHeader.show();
	            this.$tableLoading.css('top', this.$header.outerHeight() + 1);
	            // Assign the correct sortable arrow
	            this.getCaret();
	            $(window).on('resize.bootstrap-table', $.proxy(this.resetWidth, this));
	        }

	        this.$selectAll = this.$header.find('[name="btSelectAll"]');
	        this.$selectAll.off('click').on('click', function () {
	                var checked = $(this).prop('checked');
	                that[checked ? 'checkAll' : 'uncheckAll']();
	                that.updateSelected();
	            });
	    };

	    BootstrapTable.prototype.initFooter = function () {
	        if (!this.options.showFooter || this.options.cardView) {
	            this.$tableFooter.hide();
	        } else {
	            this.$tableFooter.show();
	        }
	    };

	    /**
	     * @param data
	     * @param type: append / prepend
	     */
	    BootstrapTable.prototype.initData = function (data, type) {
	        if (type === 'append') {
	            this.data = this.data.concat(data);
	        } else if (type === 'prepend') {
	            this.data = [].concat(data).concat(this.data);
	        } else {
	            this.data = data || this.options.data;
	        }

	        // Fix #839 Records deleted when adding new row on filtered table
	        if (type === 'append') {
	            this.options.data = this.options.data.concat(data);
	        } else if (type === 'prepend') {
	            this.options.data = [].concat(data).concat(this.options.data);
	        } else {
	            this.options.data = this.data;
	        }

	        if (this.options.sidePagination === 'server') {
	            return;
	        }
	        this.initSort();
	    };

	    BootstrapTable.prototype.initSort = function () {
	        var that = this,
	            name = this.options.sortName,
	            order = this.options.sortOrder === 'desc' ? -1 : 1,
	            index = $.inArray(this.options.sortName, this.header.fields);

	        if (this.options.customSort !== $.noop) {
	            this.options.customSort.apply(this, [this.options.sortName, this.options.sortOrder]);
	            return;
	        }

	        if (index !== -1) {
	            if (this.options.sortStable) {
	                $.each(this.data, function (i, row) {
	                    if (!row.hasOwnProperty('_position')) row._position = i;
	                });
	            }

	            this.data.sort(function (a, b) {
	                if (that.header.sortNames[index]) {
	                    name = that.header.sortNames[index];
	                }
	                var aa = getItemField(a, name, that.options.escape),
	                    bb = getItemField(b, name, that.options.escape),
	                    value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);

	                if (value !== undefined) {
	                    return order * value;
	                }

	                // Fix #161: undefined or null string sort bug.
	                if (aa === undefined || aa === null) {
	                    aa = '';
	                }
	                if (bb === undefined || bb === null) {
	                    bb = '';
	                }

	                if (that.options.sortStable && aa === bb) {
	                    aa = a._position;
	                    bb = b._position;
	                }

	                // IF both values are numeric, do a numeric comparison
	                if ($.isNumeric(aa) && $.isNumeric(bb)) {
	                    // Convert numerical values form string to float.
	                    aa = parseFloat(aa);
	                    bb = parseFloat(bb);
	                    if (aa < bb) {
	                        return order * -1;
	                    }
	                    return order;
	                }

	                if (aa === bb) {
	                    return 0;
	                }

	                // If value is not a string, convert to string
	                if (typeof aa !== 'string') {
	                    aa = aa.toString();
	                }

	                if (aa.localeCompare(bb) === -1) {
	                    return order * -1;
	                }

	                return order;
	            });
	        }
	    };

	    BootstrapTable.prototype.onSort = function (event) {
	        var $this = event.type === "keypress" ? $(event.currentTarget) : $(event.currentTarget).parent(),
	            $this_ = this.$header.find('th').eq($this.index());

	        this.$header.add(this.$header_).find('span.order').remove();

	        if (this.options.sortName === $this.data('field')) {
	            this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
	        } else {
	            this.options.sortName = $this.data('field');
	            this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
	        }
	        this.trigger('sort', this.options.sortName, this.options.sortOrder);

	        $this.add($this_).data('order', this.options.sortOrder);

	        // Assign the correct sortable arrow
	        this.getCaret();

	        if (this.options.sidePagination === 'server') {
	            this.initServer(this.options.silentSort);
	            return;
	        }

	        this.initSort();
	        this.initBody();
	    };

	    BootstrapTable.prototype.initToolbar = function () {
	        var that = this,
	            html = [],
	            timeoutId = 0,
	            $keepOpen,
	            $search,
	            switchableCount = 0;

	        if (this.$toolbar.find('.bs-bars').children().length) {
	            $('body').append($(this.options.toolbar));
	        }
	        this.$toolbar.html('');

	        if (typeof this.options.toolbar === 'string' || typeof this.options.toolbar === 'object') {
	            $(sprintf('<div class="bs-bars pull-%s"></div>', this.options.toolbarAlign))
	                .appendTo(this.$toolbar)
	                .append($(this.options.toolbar));
	        }

	        // showColumns, showToggle, showRefresh
	        html = [sprintf('<div class="columns columns-%s btn-group pull-%s">',
	            this.options.buttonsAlign, this.options.buttonsAlign)];

	        if (typeof this.options.icons === 'string') {
	            this.options.icons = calculateObjectValue(null, this.options.icons);
	        }

	        if (this.options.showPaginationSwitch) {
	            html.push(sprintf('<button class="btn' +
	                    sprintf(' btn-%s', this.options.buttonsClass) +
	                    sprintf(' btn-%s', this.options.iconSize) +
	                    '" type="button" name="paginationSwitch" title="%s">',
	                    this.options.formatPaginationSwitch()),
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown),
	                '</button>');
	        }

	        if (this.options.showRefresh) {
	            html.push(sprintf('<button class="btn' +
	                    sprintf(' btn-%s', this.options.buttonsClass) +
	                    sprintf(' btn-%s', this.options.iconSize) +
	                    '" type="button" name="refresh" title="%s">',
	                    this.options.formatRefresh()),
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh),
	                '</button>');
	        }

	        if (this.options.showToggle) {
	            html.push(sprintf('<button class="btn' +
	                    sprintf(' btn-%s', this.options.buttonsClass) +
	                    sprintf(' btn-%s', this.options.iconSize) +
	                    '" type="button" name="toggle" title="%s">',
	                    this.options.formatToggle()),
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle),
	                '</button>');
	        }

	        if (this.options.showColumns) {
	            html.push(sprintf('<div class="keep-open btn-group" title="%s">',
	                    this.options.formatColumns()),
	                '<button type="button" class="btn' +
	                sprintf(' btn-%s', this.options.buttonsClass) +
	                sprintf(' btn-%s', this.options.iconSize) +
	                ' dropdown-toggle" data-toggle="dropdown">',
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns),
	                ' <span class="caret"></span>',
	                '</button>',
	                '<ul class="dropdown-menu" role="menu">');

	            $.each(this.columns, function (i, column) {
	                if (column.radio || column.checkbox) {
	                    return;
	                }

	                if (that.options.cardView && !column.cardVisible) {
	                    return;
	                }

	                var checked = column.visible ? ' checked="checked"' : '';

	                if (column.switchable) {
	                    html.push(sprintf('<li>' +
	                        '<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>' +
	                        '</li>', column.field, i, checked, column.title));
	                    switchableCount++;
	                }
	            });
	            html.push('</ul>',
	                '</div>');
	        }

	        html.push('</div>');

	        // Fix #188: this.showToolbar is for extensions
	        if (this.showToolbar || html.length > 2) {
	            this.$toolbar.append(html.join(''));
	        }

	        if (this.options.showPaginationSwitch) {
	            this.$toolbar.find('button[name="paginationSwitch"]')
	                .off('click').on('click', $.proxy(this.togglePagination, this));
	        }

	        if (this.options.showRefresh) {
	            this.$toolbar.find('button[name="refresh"]')
	                .off('click').on('click', $.proxy(this.refresh, this));
	        }

	        if (this.options.showToggle) {
	            this.$toolbar.find('button[name="toggle"]')
	                .off('click').on('click', function () {
	                    that.toggleView();
	                });
	        }

	        if (this.options.showColumns) {
	            $keepOpen = this.$toolbar.find('.keep-open');

	            if (switchableCount <= this.options.minimumCountColumns) {
	                $keepOpen.find('input').prop('disabled', true);
	            }

	            $keepOpen.find('li').off('click').on('click', function (event) {
	                event.stopImmediatePropagation();
	            });
	            $keepOpen.find('input').off('click').on('click', function () {
	                var $this = $(this);

	                that.toggleColumn($(this).val(), $this.prop('checked'), false);
	                that.trigger('column-switch', $(this).data('field'), $this.prop('checked'));
	            });
	        }

	        if (this.options.search) {
	            html = [];
	            html.push(
	                '<div class="pull-' + this.options.searchAlign + ' search">',
	                sprintf('<input class="form-control' +
	                    sprintf(' input-%s', this.options.iconSize) +
	                    '" type="text" placeholder="%s">',
	                    this.options.formatSearch()),
	                '</div>');

	            this.$toolbar.append(html.join(''));
	            $search = this.$toolbar.find('.search input');
	            $search.off('keyup drop').on('keyup drop', function (event) {
	                if (that.options.searchOnEnterKey && event.keyCode !== 13) {
	                    return;
	                }

	                if ($.inArray(event.keyCode, [37, 38, 39, 40]) > -1) {
	                    return;
	                }

	                clearTimeout(timeoutId); // doesn't matter if it's 0
	                timeoutId = setTimeout(function () {
	                    that.onSearch(event);
	                }, that.options.searchTimeOut);
	            });

	            if (isIEBrowser()) {
	                $search.off('mouseup').on('mouseup', function (event) {
	                    clearTimeout(timeoutId); // doesn't matter if it's 0
	                    timeoutId = setTimeout(function () {
	                        that.onSearch(event);
	                    }, that.options.searchTimeOut);
	                });
	            }
	        }
	    };

	    BootstrapTable.prototype.onSearch = function (event) {
	        var text = $.trim($(event.currentTarget).val());

	        // trim search input
	        if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
	            $(event.currentTarget).val(text);
	        }

	        if (text === this.searchText) {
	            return;
	        }
	        this.searchText = text;
	        this.options.searchText = text;

	        this.options.pageNumber = 1;
	        this.initSearch();
	        this.updatePagination();
	        this.trigger('search', text);
	    };

	    BootstrapTable.prototype.initSearch = function () {
	        var that = this;

	        if (this.options.sidePagination !== 'server') {
	            if (this.options.customSearch !== $.noop) {
	                this.options.customSearch.apply(this, [this.searchText]);
	                return;
	            }

	            var s = this.searchText && (this.options.escape ?
	                escapeHTML(this.searchText) : this.searchText).toLowerCase();
	            var f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns;

	            // Check filter
	            this.data = f ? $.grep(this.options.data, function (item, i) {
	                for (var key in f) {
	                    if ($.isArray(f[key]) && $.inArray(item[key], f[key]) === -1 ||
	                            item[key] !== f[key]) {
	                        return false;
	                    }
	                }
	                return true;
	            }) : this.options.data;

	            this.data = s ? $.grep(this.data, function (item, i) {
	                for (var j = 0; j < that.header.fields.length; j++) {

	                    if (!that.header.searchables[j]) {
	                        continue;
	                    }

	                    var key = $.isNumeric(that.header.fields[j]) ? parseInt(that.header.fields[j], 10) : that.header.fields[j];
	                    var column = that.columns[getFieldIndex(that.columns, key)];
	                    var value;

	                    if (typeof key === 'string') {
	                        value = item;
	                        var props = key.split('.');
	                        for (var prop_index = 0; prop_index < props.length; prop_index++) {
	                            value = value[props[prop_index]];
	                        }

	                        // Fix #142: respect searchForamtter boolean
	                        if (column && column.searchFormatter) {
	                            value = calculateObjectValue(column,
	                                that.header.formatters[j], [value, item, i], value);
	                        }
	                    } else {
	                        value = item[key];
	                    }

	                    if (typeof value === 'string' || typeof value === 'number') {
	                        if (that.options.strictSearch) {
	                            if ((value + '').toLowerCase() === s) {
	                                return true;
	                            }
	                        } else {
	                            if ((value + '').toLowerCase().indexOf(s) !== -1) {
	                                return true;
	                            }
	                        }
	                    }
	                }
	                return false;
	            }) : this.data;
	        }
	    };

	    BootstrapTable.prototype.initPagination = function () {
	        if (!this.options.pagination) {
	            this.$pagination.hide();
	            return;
	        } else {
	            this.$pagination.show();
	        }

	        var that = this,
	            html = [],
	            $allSelected = false,
	            i, from, to,
	            $pageList,
	            $first, $pre,
	            $next, $last,
	            $number,
	            data = this.getData(),
	            pageList = this.options.pageList;

	        if (this.options.sidePagination !== 'server') {
	            this.options.totalRows = data.length;
	        }

	        this.totalPages = 0;
	        if (this.options.totalRows) {
	            if (this.options.pageSize === this.options.formatAllRows()) {
	                this.options.pageSize = this.options.totalRows;
	                $allSelected = true;
	            } else if (this.options.pageSize === this.options.totalRows) {
	                // Fix #667 Table with pagination,
	                // multiple pages and a search that matches to one page throws exception
	                var pageLst = typeof this.options.pageList === 'string' ?
	                    this.options.pageList.replace('[', '').replace(']', '')
	                        .replace(/ /g, '').toLowerCase().split(',') : this.options.pageList;
	                if ($.inArray(this.options.formatAllRows().toLowerCase(), pageLst)  > -1) {
	                    $allSelected = true;
	                }
	            }

	            this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1;

	            this.options.totalPages = this.totalPages;
	        }
	        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
	            this.options.pageNumber = this.totalPages;
	        }

	        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
	        this.pageTo = this.options.pageNumber * this.options.pageSize;
	        if (this.pageTo > this.options.totalRows) {
	            this.pageTo = this.options.totalRows;
	        }

	        html.push(
	            '<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">',
	            '<span class="pagination-info">',
	            this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows) :
	            this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows),
	            '</span>');

	        if (!this.options.onlyInfoPagination) {
	            html.push('<span class="page-list">');

	            var pageNumber = [
	                    sprintf('<span class="btn-group %s">',
	                        this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
	                            'dropdown' : 'dropup'),
	                    '<button type="button" class="btn' +
	                    sprintf(' btn-%s', this.options.buttonsClass) +
	                    sprintf(' btn-%s', this.options.iconSize) +
	                    ' dropdown-toggle" data-toggle="dropdown">',
	                    '<span class="page-size">',
	                    $allSelected ? this.options.formatAllRows() : this.options.pageSize,
	                    '</span>',
	                    ' <span class="caret"></span>',
	                    '</button>',
	                    '<ul class="dropdown-menu" role="menu">'
	                ];

	            if (typeof this.options.pageList === 'string') {
	                var list = this.options.pageList.replace('[', '').replace(']', '')
	                    .replace(/ /g, '').split(',');

	                pageList = [];
	                $.each(list, function (i, value) {
	                    pageList.push(value.toUpperCase() === that.options.formatAllRows().toUpperCase() ?
	                        that.options.formatAllRows() : +value);
	                });
	            }

	            $.each(pageList, function (i, page) {
	                if (!that.options.smartDisplay || i === 0 || pageList[i - 1] <= that.options.totalRows) {
	                    var active;
	                    if ($allSelected) {
	                        active = page === that.options.formatAllRows() ? ' class="active"' : '';
	                    } else {
	                        active = page === that.options.pageSize ? ' class="active"' : '';
	                    }
	                    pageNumber.push(sprintf('<li%s><a href="javascript:void(0)">%s</a></li>', active, page));
	                }
	            });
	            pageNumber.push('</ul></span>');

	            html.push(this.options.formatRecordsPerPage(pageNumber.join('')));
	            html.push('</span>');

	            html.push('</div>',
	                '<div class="pull-' + this.options.paginationHAlign + ' pagination">',
	                '<ul class="pagination' + sprintf(' pagination-%s', this.options.iconSize) + '">',
	                '<li class="page-pre"><a href="javascript:void(0)">' + this.options.paginationPreText + '</a></li>');

	            if (this.totalPages < 5) {
	                from = 1;
	                to = this.totalPages;
	            } else {
	                from = this.options.pageNumber - 2;
	                to = from + 4;
	                if (from < 1) {
	                    from = 1;
	                    to = 5;
	                }
	                if (to > this.totalPages) {
	                    to = this.totalPages;
	                    from = to - 4;
	                }
	            }

	            if (this.totalPages >= 6) {
	                if (this.options.pageNumber >= 3) {
	                    html.push('<li class="page-first' + (1 === this.options.pageNumber ? ' active' : '') + '">',
	                        '<a href="javascript:void(0)">', 1, '</a>',
	                        '</li>');

	                    from++;
	                }

	                if (this.options.pageNumber >= 4) {
	                    if (this.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
	                        from--;
	                    } else {
	                        html.push('<li class="page-first-separator disabled">',
	                            '<a href="javascript:void(0)">...</a>',
	                            '</li>');
	                    }

	                    to--;
	                }
	            }

	            if (this.totalPages >= 7) {
	                if (this.options.pageNumber >= (this.totalPages - 2)) {
	                    from--;
	                }
	            }

	            if (this.totalPages == 6) {
	                if (this.options.pageNumber >= (this.totalPages - 2)) {
	                    to++;
	                }
	            } else if (this.totalPages >= 7) {
	                if (this.totalPages == 7 || this.options.pageNumber >= (this.totalPages - 3)) {
	                    to++;
	                }
	            }

	            for (i = from; i <= to; i++) {
	                html.push('<li class="page-number' + (i === this.options.pageNumber ? ' active' : '') + '">',
	                    '<a href="javascript:void(0)">', i, '</a>',
	                    '</li>');
	            }

	            if (this.totalPages >= 8) {
	                if (this.options.pageNumber <= (this.totalPages - 4)) {
	                    html.push('<li class="page-last-separator disabled">',
	                        '<a href="javascript:void(0)">...</a>',
	                        '</li>');
	                }
	            }

	            if (this.totalPages >= 6) {
	                if (this.options.pageNumber <= (this.totalPages - 3)) {
	                    html.push('<li class="page-last' + (this.totalPages === this.options.pageNumber ? ' active' : '') + '">',
	                        '<a href="javascript:void(0)">', this.totalPages, '</a>',
	                        '</li>');
	                }
	            }

	            html.push(
	                '<li class="page-next"><a href="javascript:void(0)">' + this.options.paginationNextText + '</a></li>',
	                '</ul>',
	                '</div>');
	        }
	        this.$pagination.html(html.join(''));

	        if (!this.options.onlyInfoPagination) {
	            $pageList = this.$pagination.find('.page-list a');
	            $first = this.$pagination.find('.page-first');
	            $pre = this.$pagination.find('.page-pre');
	            $next = this.$pagination.find('.page-next');
	            $last = this.$pagination.find('.page-last');
	            $number = this.$pagination.find('.page-number');

	            if (this.options.smartDisplay) {
	                if (this.totalPages <= 1) {
	                    this.$pagination.find('div.pagination').hide();
	                }
	                if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
	                    this.$pagination.find('span.page-list').hide();
	                }

	                // when data is empty, hide the pagination
	                this.$pagination[this.getData().length ? 'show' : 'hide']();
	            }
	            if ($allSelected) {
	                this.options.pageSize = this.options.formatAllRows();
	            }
	            $pageList.off('click').on('click', $.proxy(this.onPageListChange, this));
	            $first.off('click').on('click', $.proxy(this.onPageFirst, this));
	            $pre.off('click').on('click', $.proxy(this.onPagePre, this));
	            $next.off('click').on('click', $.proxy(this.onPageNext, this));
	            $last.off('click').on('click', $.proxy(this.onPageLast, this));
	            $number.off('click').on('click', $.proxy(this.onPageNumber, this));
	        }
	    };

	    BootstrapTable.prototype.updatePagination = function (event) {
	        // Fix #171: IE disabled button can be clicked bug.
	        if (event && $(event.currentTarget).hasClass('disabled')) {
	            return;
	        }

	        if (!this.options.maintainSelected) {
	            this.resetRows();
	        }

	        this.initPagination();
	        if (this.options.sidePagination === 'server') {
	            this.initServer();
	        } else {
	            this.initBody();
	        }

	        this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
	    };

	    BootstrapTable.prototype.onPageListChange = function (event) {
	        var $this = $(event.currentTarget);

	        $this.parent().addClass('active').siblings().removeClass('active');
	        this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ?
	            this.options.formatAllRows() : +$this.text();
	        this.$toolbar.find('.page-size').text(this.options.pageSize);

	        this.updatePagination(event);
	    };

	    BootstrapTable.prototype.onPageFirst = function (event) {
	        this.options.pageNumber = 1;
	        this.updatePagination(event);
	    };

	    BootstrapTable.prototype.onPagePre = function (event) {
	        if ((this.options.pageNumber - 1) === 0) {
	            this.options.pageNumber = this.options.totalPages;
	        } else {
	            this.options.pageNumber--;
	        }
	        this.updatePagination(event);
	    };

	    BootstrapTable.prototype.onPageNext = function (event) {
	        if ((this.options.pageNumber + 1) > this.options.totalPages) {
	            this.options.pageNumber = 1;
	        } else {
	            this.options.pageNumber++;
	        }
	        this.updatePagination(event);
	    };

	    BootstrapTable.prototype.onPageLast = function (event) {
	        this.options.pageNumber = this.totalPages;
	        this.updatePagination(event);
	    };

	    BootstrapTable.prototype.onPageNumber = function (event) {
	        if (this.options.pageNumber === +$(event.currentTarget).text()) {
	            return;
	        }
	        this.options.pageNumber = +$(event.currentTarget).text();
	        this.updatePagination(event);
	    };

	    BootstrapTable.prototype.initBody = function (fixedScroll) {
	        var that = this,
	            html = [],
	            data = this.getData();

	        this.trigger('pre-body', data);

	        this.$body = this.$el.find('>tbody');
	        if (!this.$body.length) {
	            this.$body = $('<tbody></tbody>').appendTo(this.$el);
	        }

	        //Fix #389 Bootstrap-table-flatJSON is not working

	        if (!this.options.pagination || this.options.sidePagination === 'server') {
	            this.pageFrom = 1;
	            this.pageTo = data.length;
	        }

	        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
	            var key,
	                item = data[i],
	                style = {},
	                csses = [],
	                data_ = '',
	                attributes = {},
	                htmlAttributes = [];

	            style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

	            if (style && style.css) {
	                for (key in style.css) {
	                    csses.push(key + ': ' + style.css[key]);
	                }
	            }

	            attributes = calculateObjectValue(this.options,
	                this.options.rowAttributes, [item, i], attributes);

	            if (attributes) {
	                for (key in attributes) {
	                    htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
	                }
	            }

	            if (item._data && !$.isEmptyObject(item._data)) {
	                $.each(item._data, function (k, v) {
	                    // ignore data-index
	                    if (k === 'index') {
	                        return;
	                    }
	                    data_ += sprintf(' data-%s="%s"', k, v);
	                });
	            }

	            html.push('<tr',
	                sprintf(' %s', htmlAttributes.join(' ')),
	                sprintf(' id="%s"', $.isArray(item) ? undefined : item._id),
	                sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)),
	                sprintf(' data-index="%s"', i),
	                sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]),
	                sprintf('%s', data_),
	                '>'
	            );

	            if (this.options.cardView) {
	                html.push(sprintf('<td colspan="%s"><div class="card-views">', this.header.fields.length));
	            }

	            if (!this.options.cardView && this.options.detailView) {
	                html.push('<td>',
	                    '<a class="detail-icon" href="javascript:">',
	                    sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen),
	                    '</a>',
	                    '</td>');
	            }

	            $.each(this.header.fields, function (j, field) {
	                var text = '',
	                    value = getItemField(item, field, that.options.escape),
	                    type = '',
	                    cellStyle = {},
	                    id_ = '',
	                    class_ = that.header.classes[j],
	                    data_ = '',
	                    rowspan_ = '',
	                    colspan_ = '',
	                    title_ = '',
	                    column = that.columns[j];

	                if (that.fromHtml && typeof value === 'undefined') {
	                    return;
	                }

	                if (!column.visible) {
	                    return;
	                }

	                if (that.options.cardView && !column.cardVisible) {
	                    return;
	                }

	                style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));

	                // handle td's id and class
	                if (item['_' + field + '_id']) {
	                    id_ = sprintf(' id="%s"', item['_' + field + '_id']);
	                }
	                if (item['_' + field + '_class']) {
	                    class_ = sprintf(' class="%s"', item['_' + field + '_class']);
	                }
	                if (item['_' + field + '_rowspan']) {
	                    rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan']);
	                }
	                if (item['_' + field + '_colspan']) {
	                    colspan_ = sprintf(' colspan="%s"', item['_' + field + '_colspan']);
	                }
	                if (item['_' + field + '_title']) {
	                    title_ = sprintf(' title="%s"', item['_' + field + '_title']);
	                }
	                cellStyle = calculateObjectValue(that.header,
	                    that.header.cellStyles[j], [value, item, i, field], cellStyle);
	                if (cellStyle.classes) {
	                    class_ = sprintf(' class="%s"', cellStyle.classes);
	                }
	                if (cellStyle.css) {
	                    var csses_ = [];
	                    for (var key in cellStyle.css) {
	                        csses_.push(key + ': ' + cellStyle.css[key]);
	                    }
	                    style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
	                }

	                value = calculateObjectValue(column,
	                    that.header.formatters[j], [value, item, i], value);

	                if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
	                    $.each(item['_' + field + '_data'], function (k, v) {
	                        // ignore data-index
	                        if (k === 'index') {
	                            return;
	                        }
	                        data_ += sprintf(' data-%s="%s"', k, v);
	                    });
	                }

	                if (column.checkbox || column.radio) {
	                    type = column.checkbox ? 'checkbox' : type;
	                    type = column.radio ? 'radio' : type;

	                    text = [sprintf(that.options.cardView ?
	                        '<div class="card-view %s">' : '<td class="bs-checkbox %s">', column['class'] || ''),
	                        '<input' +
	                        sprintf(' data-index="%s"', i) +
	                        sprintf(' name="%s"', that.options.selectItemName) +
	                        sprintf(' type="%s"', type) +
	                        sprintf(' value="%s"', item[that.options.idField]) +
	                        sprintf(' checked="%s"', value === true ||
	                        (value && value.checked) ? 'checked' : undefined) +
	                        sprintf(' disabled="%s"', !column.checkboxEnabled ||
	                        (value && value.disabled) ? 'disabled' : undefined) +
	                        ' />',
	                        that.header.formatters[j] && typeof value === 'string' ? value : '',
	                        that.options.cardView ? '</div>' : '</td>'
	                    ].join('');

	                    item[that.header.stateField] = value === true || (value && value.checked);
	                } else {
	                    value = typeof value === 'undefined' || value === null ?
	                        that.options.undefinedText : value;

	                    text = that.options.cardView ? ['<div class="card-view">',
	                        that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style,
	                            getPropertyFromOther(that.columns, 'field', 'title', field)) : '',
	                        sprintf('<span class="value">%s</span>', value),
	                        '</div>'
	                    ].join('') : [sprintf('<td%s %s %s %s %s %s %s>',
	                        id_, class_, style, data_, rowspan_, colspan_, title_),
	                        value,
	                        '</td>'
	                    ].join('');

	                    // Hide empty data on Card view when smartDisplay is set to true.
	                    if (that.options.cardView && that.options.smartDisplay && value === '') {
	                        // Should set a placeholder for event binding correct fieldIndex
	                        text = '<div class="card-view"></div>';
	                    }
	                }

	                html.push(text);
	            });

	            if (this.options.cardView) {
	                html.push('</div></td>');
	            }

	            html.push('</tr>');
	        }

	        // show no records
	        if (!html.length) {
	            html.push('<tr class="no-records-found">',
	                sprintf('<td colspan="%s">%s</td>',
	                    this.$header.find('th').length, this.options.formatNoMatches()),
	                '</tr>');
	        }

	        this.$body.html(html.join(''));

	        if (!fixedScroll) {
	            this.scrollTo(0);
	        }

	        // click to select by column
	        this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', function (e) {
	            var $td = $(this),
	                $tr = $td.parent(),
	                item = that.data[$tr.data('index')],
	                index = $td[0].cellIndex,
	                fields = that.getVisibleFields(),
	                field = fields[that.options.detailView && !that.options.cardView ? index - 1 : index],
	                column = that.columns[getFieldIndex(that.columns, field)],
	                value = getItemField(item, field, that.options.escape);

	            if ($td.find('.detail-icon').length) {
	                return;
	            }

	            that.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $td);
	            that.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $tr, field);

	            // if click to select - then trigger the checkbox/radio click
	            if (e.type === 'click' && that.options.clickToSelect && column.clickToSelect) {
	                var $selectItem = $tr.find(sprintf('[name="%s"]', that.options.selectItemName));
	                if ($selectItem.length) {
	                    $selectItem[0].click(); // #144: .trigger('click') bug
	                }
	            }
	        });

	        this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', function () {
	            var $this = $(this),
	                $tr = $this.parent().parent(),
	                index = $tr.data('index'),
	                row = data[index]; // Fix #980 Detail view, when searching, returns wrong row

	            // remove and update
	            if ($tr.next().is('tr.detail-view')) {
	                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailOpen));
	                $tr.next().remove();
	                that.trigger('collapse-row', index, row);
	            } else {
	                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailClose));
	                $tr.after(sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.find('td').length));
	                var $element = $tr.next().find('td');
	                var content = calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '');
	                if($element.length === 1) {
	                    $element.append(content);
	                }
	                that.trigger('expand-row', index, row, $element);
	            }
	            that.resetView();
	        });

	        this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
	        this.$selectItem.off('click').on('click', function (event) {
	            event.stopImmediatePropagation();

	            var $this = $(this),
	                checked = $this.prop('checked'),
	                row = that.data[$this.data('index')];

	            if (that.options.maintainSelected && $(this).is(':radio')) {
	                $.each(that.options.data, function (i, row) {
	                    row[that.header.stateField] = false;
	                });
	            }

	            row[that.header.stateField] = checked;

	            if (that.options.singleSelect) {
	                that.$selectItem.not(this).each(function () {
	                    that.data[$(this).data('index')][that.header.stateField] = false;
	                });
	                that.$selectItem.filter(':checked').not(this).prop('checked', false);
	            }

	            that.updateSelected();
	            that.trigger(checked ? 'check' : 'uncheck', row, $this);
	        });

	        $.each(this.header.events, function (i, events) {
	            if (!events) {
	                return;
	            }
	            // fix bug, if events is defined with namespace
	            if (typeof events === 'string') {
	                events = calculateObjectValue(null, events);
	            }

	            var field = that.header.fields[i],
	                fieldIndex = $.inArray(field, that.getVisibleFields());

	            if (that.options.detailView && !that.options.cardView) {
	                fieldIndex += 1;
	            }

	            for (var key in events) {
	                that.$body.find('>tr:not(.no-records-found)').each(function () {
	                    var $tr = $(this),
	                        $td = $tr.find(that.options.cardView ? '.card-view' : 'td').eq(fieldIndex),
	                        index = key.indexOf(' '),
	                        name = key.substring(0, index),
	                        el = key.substring(index + 1),
	                        func = events[key];

	                    $td.find(el).off(name).on(name, function (e) {
	                        var index = $tr.data('index'),
	                            row = that.data[index],
	                            value = row[field];

	                        func.apply(this, [e, value, row, index]);
	                    });
	                });
	            }
	        });

	        this.updateSelected();
	        this.resetView();

	        this.trigger('post-body', data);
	    };

	    BootstrapTable.prototype.initServer = function (silent, query, url) {
	        var that = this,
	            data = {},
	            params = {
	                searchText: this.searchText,
	                sortName: this.options.sortName,
	                sortOrder: this.options.sortOrder
	            },
	            request;

	        if (this.options.pagination) {
	            params.pageSize = this.options.pageSize === this.options.formatAllRows() ?
	                this.options.totalRows : this.options.pageSize;
	            params.pageNumber = this.options.pageNumber;
	        }

	        if (!(url || this.options.url) && !this.options.ajax) {
	            return;
	        }

	        if (this.options.queryParamsType === 'limit') {
	            params = {
	                search: params.searchText,
	                sort: params.sortName,
	                order: params.sortOrder
	            };

	            if (this.options.pagination) {
	                params.offset = this.options.pageSize === this.options.formatAllRows() ?
	                    0 : this.options.pageSize * (this.options.pageNumber - 1);
	                params.limit = this.options.pageSize === this.options.formatAllRows() ?
	                    this.options.totalRows : this.options.pageSize;
	            }
	        }

	        if (!($.isEmptyObject(this.filterColumnsPartial))) {
	            params.filter = JSON.stringify(this.filterColumnsPartial, null);
	        }

	        data = calculateObjectValue(this.options, this.options.queryParams, [params], data);

	        $.extend(data, query || {});

	        // false to stop request
	        if (data === false) {
	            return;
	        }

	        if (!silent) {
	            this.$tableLoading.show();
	        }
	        request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
	            type: this.options.method,
	            url:  url || this.options.url,
	            data: this.options.contentType === 'application/json' && this.options.method === 'post' ?
	                JSON.stringify(data) : data,
	            cache: this.options.cache,
	            contentType: this.options.contentType,
	            dataType: this.options.dataType,
	            success: function (res) {
	                res = calculateObjectValue(that.options, that.options.responseHandler, [res], res);

	                that.load(res);
	                that.trigger('load-success', res);
	                if (!silent) that.$tableLoading.hide();
	            },
	            error: function (res) {
	                that.trigger('load-error', res.status, res);
	                if (!silent) that.$tableLoading.hide();
	            }
	        });

	        if (this.options.ajax) {
	            calculateObjectValue(this, this.options.ajax, [request], null);
	        } else {
	            if (this._xhr && this._xhr.readyState !== 4) {
	                this._xhr.abort();
	            }
	            this._xhr = $.ajax(request);
	        }
	    };

	    BootstrapTable.prototype.initSearchText = function () {
	        if (this.options.search) {
	            if (this.options.searchText !== '') {
	                var $search = this.$toolbar.find('.search input');
	                $search.val(this.options.searchText);
	                this.onSearch({currentTarget: $search});
	            }
	        }
	    };

	    BootstrapTable.prototype.getCaret = function () {
	        var that = this;

	        $.each(this.$header.find('th'), function (i, th) {
	            $(th).find('.sortable').removeClass('desc asc').addClass($(th).data('field') === that.options.sortName ? that.options.sortOrder : 'both');
	        });
	    };

	    BootstrapTable.prototype.updateSelected = function () {
	        var checkAll = this.$selectItem.filter(':enabled').length &&
	            this.$selectItem.filter(':enabled').length ===
	            this.$selectItem.filter(':enabled').filter(':checked').length;

	        this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);

	        this.$selectItem.each(function () {
	            $(this).closest('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
	        });
	    };

	    BootstrapTable.prototype.updateRows = function () {
	        var that = this;

	        this.$selectItem.each(function () {
	            that.data[$(this).data('index')][that.header.stateField] = $(this).prop('checked');
	        });
	    };

	    BootstrapTable.prototype.resetRows = function () {
	        var that = this;

	        $.each(this.data, function (i, row) {
	            that.$selectAll.prop('checked', false);
	            that.$selectItem.prop('checked', false);
	            if (that.header.stateField) {
	                row[that.header.stateField] = false;
	            }
	        });
	    };

	    BootstrapTable.prototype.trigger = function (name) {
	        var args = Array.prototype.slice.call(arguments, 1);

	        name += '.bs.table';
	        this.options[BootstrapTable.EVENTS[name]].apply(this.options, args);
	        this.$el.trigger($.Event(name), args);

	        this.options.onAll(name, args);
	        this.$el.trigger($.Event('all.bs.table'), [name, args]);
	    };

	    BootstrapTable.prototype.resetHeader = function () {
	        // fix #61: the hidden table reset header bug.
	        // fix bug: get $el.css('width') error sometime (height = 500)
	        clearTimeout(this.timeoutId_);
	        this.timeoutId_ = setTimeout($.proxy(this.fitHeader, this), this.$el.is(':hidden') ? 100 : 0);
	    };

	    BootstrapTable.prototype.fitHeader = function () {
	        var that = this,
	            fixedBody,
	            scrollWidth,
	            focused,
	            focusedTemp;

	        if (that.$el.is(':hidden')) {
	            that.timeoutId_ = setTimeout($.proxy(that.fitHeader, that), 100);
	            return;
	        }
	        fixedBody = this.$tableBody.get(0);

	        scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth &&
	        fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ?
	            getScrollBarWidth() : 0;

	        this.$el.css('margin-top', -this.$header.outerHeight());

	        focused = $(':focus');
	        if (focused.length > 0) {
	            var $th = focused.parents('th');
	            if ($th.length > 0) {
	                var dataField = $th.attr('data-field');
	                if (dataField !== undefined) {
	                    var $headerTh = this.$header.find("[data-field='" + dataField + "']");
	                    if ($headerTh.length > 0) {
	                        $headerTh.find(":input").addClass("focus-temp");
	                    }
	                }
	            }
	        }

	        this.$header_ = this.$header.clone(true, true);
	        this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
	        this.$tableHeader.css({
	            'margin-right': scrollWidth
	        }).find('table').css('width', this.$el.outerWidth())
	            .html('').attr('class', this.$el.attr('class'))
	            .append(this.$header_);


	        focusedTemp = $('.focus-temp:visible:eq(0)');
	        if (focusedTemp.length > 0) {
	            focusedTemp.focus();
	            this.$header.find('.focus-temp').removeClass('focus-temp');
	        }

	        // fix bug: $.data() is not working as expected after $.append()
	        this.$header.find('th[data-field]').each(function (i) {
	            that.$header_.find(sprintf('th[data-field="%s"]', $(this).data('field'))).data($(this).data());
	        });

	        var visibleFields = this.getVisibleFields(),
	            $ths = this.$header_.find('th');

	        this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
	            var $this = $(this),
	                index = i;

	            if (that.options.detailView && !that.options.cardView) {
	                if (i === 0) {
	                    that.$header_.find('th.detail').find('.fht-cell').width($this.innerWidth());
	                }
	                index = i - 1;
	            }

	            var $th = that.$header_.find(sprintf('th[data-field="%s"]', visibleFields[index]));
	            if ($th.length > 1) {
	                $th = $($ths[$this[0].cellIndex]);
	            }

	            $th.find('.fht-cell').width($this.innerWidth());
	        });
	        // horizontal scroll event
	        // TODO: it's probably better improving the layout than binding to scroll event
	        this.$tableBody.off('scroll').on('scroll', function () {
	            that.$tableHeader.scrollLeft($(this).scrollLeft());

	            if (that.options.showFooter && !that.options.cardView) {
	                that.$tableFooter.scrollLeft($(this).scrollLeft());
	            }
	        });
	        that.trigger('post-header');
	    };

	    BootstrapTable.prototype.resetFooter = function () {
	        var that = this,
	            data = that.getData(),
	            html = [];

	        if (!this.options.showFooter || this.options.cardView) { //do nothing
	            return;
	        }

	        if (!this.options.cardView && this.options.detailView) {
	            html.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>');
	        }

	        $.each(this.columns, function (i, column) {
	            var key,
	                falign = '', // footer align style
	                valign = '',
	                csses = [],
	                style = {},
	                class_ = sprintf(' class="%s"', column['class']);

	            if (!column.visible) {
	                return;
	            }

	            if (that.options.cardView && (!column.cardVisible)) {
	                return;
	            }

	            falign = sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
	            valign = sprintf('vertical-align: %s; ', column.valign);

	            style = calculateObjectValue(null, that.options.footerStyle);

	            if (style && style.css) {
	                for (key in style.css) {
	                    csses.push(key + ': ' + style.css[key]);
	                }
	            }

	            html.push('<td', class_, sprintf(' style="%s"', falign + valign + csses.concat().join('; ')), '>');
	            html.push('<div class="th-inner">');

	            html.push(calculateObjectValue(column, column.footerFormatter, [data], '&nbsp;') || '&nbsp;');

	            html.push('</div>');
	            html.push('<div class="fht-cell"></div>');
	            html.push('</div>');
	            html.push('</td>');
	        });

	        this.$tableFooter.find('tr').html(html.join(''));
	        this.$tableFooter.show();
	        clearTimeout(this.timeoutFooter_);
	        this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this),
	            this.$el.is(':hidden') ? 100 : 0);
	    };

	    BootstrapTable.prototype.fitFooter = function () {
	        var that = this,
	            $footerTd,
	            elWidth,
	            scrollWidth;

	        clearTimeout(this.timeoutFooter_);
	        if (this.$el.is(':hidden')) {
	            this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100);
	            return;
	        }

	        elWidth = this.$el.css('width');
	        scrollWidth = elWidth > this.$tableBody.width() ? getScrollBarWidth() : 0;

	        this.$tableFooter.css({
	            'margin-right': scrollWidth
	        }).find('table').css('width', elWidth)
	            .attr('class', this.$el.attr('class'));

	        $footerTd = this.$tableFooter.find('td');

	        this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
	            var $this = $(this);

	            $footerTd.eq(i).find('.fht-cell').width($this.innerWidth());
	        });
	    };

	    BootstrapTable.prototype.toggleColumn = function (index, checked, needUpdate) {
	        if (index === -1) {
	            return;
	        }
	        this.columns[index].visible = checked;
	        this.initHeader();
	        this.initSearch();
	        this.initPagination();
	        this.initBody();

	        if (this.options.showColumns) {
	            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

	            if (needUpdate) {
	                $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
	            }

	            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
	                $items.filter(':checked').prop('disabled', true);
	            }
	        }
	    };

	    BootstrapTable.prototype.toggleRow = function (index, uniqueId, visible) {
	        if (index === -1) {
	            return;
	        }

	        this.$body.find(typeof index !== 'undefined' ?
	            sprintf('tr[data-index="%s"]', index) :
	            sprintf('tr[data-uniqueid="%s"]', uniqueId))
	            [visible ? 'show' : 'hide']();
	    };

	    BootstrapTable.prototype.getVisibleFields = function () {
	        var that = this,
	            visibleFields = [];

	        $.each(this.header.fields, function (j, field) {
	            var column = that.columns[getFieldIndex(that.columns, field)];

	            if (!column.visible) {
	                return;
	            }
	            visibleFields.push(field);
	        });
	        return visibleFields;
	    };

	    // PUBLIC FUNCTION DEFINITION
	    // =======================

	    BootstrapTable.prototype.resetView = function (params) {
	        var padding = 0;

	        if (params && params.height) {
	            this.options.height = params.height;
	        }

	        this.$selectAll.prop('checked', this.$selectItem.length > 0 &&
	            this.$selectItem.length === this.$selectItem.filter(':checked').length);

	        if (this.options.height) {
	            var toolbarHeight = getRealHeight(this.$toolbar),
	                paginationHeight = getRealHeight(this.$pagination),
	                height = this.options.height - toolbarHeight - paginationHeight;

	            this.$tableContainer.css('height', height + 'px');
	        }

	        if (this.options.cardView) {
	            // remove the element css
	            this.$el.css('margin-top', '0');
	            this.$tableContainer.css('padding-bottom', '0');
	            this.$tableFooter.hide();
	            return;
	        }

	        if (this.options.showHeader && this.options.height) {
	            this.$tableHeader.show();
	            this.resetHeader();
	            padding += this.$header.outerHeight();
	        } else {
	            this.$tableHeader.hide();
	            this.trigger('post-header');
	        }

	        if (this.options.showFooter) {
	            this.resetFooter();
	            if (this.options.height) {
	                padding += this.$tableFooter.outerHeight() + 1;
	            }
	        }

	        // Assign the correct sortable arrow
	        this.getCaret();
	        this.$tableContainer.css('padding-bottom', padding + 'px');
	        this.trigger('reset-view');
	    };

	    BootstrapTable.prototype.getData = function (useCurrentPage) {
	        return (this.searchText || !$.isEmptyObject(this.filterColumns) || !$.isEmptyObject(this.filterColumnsPartial)) ?
	            (useCurrentPage ? this.data.slice(this.pageFrom - 1, this.pageTo) : this.data) :
	            (useCurrentPage ? this.options.data.slice(this.pageFrom - 1, this.pageTo) : this.options.data);
	    };

	    BootstrapTable.prototype.load = function (data) {
	        var fixedScroll = false;

	        // #431: support pagination
	        if (this.options.sidePagination === 'server') {
	            this.options.totalRows = data.total;
	            fixedScroll = data.fixedScroll;
	            data = data[this.options.dataField];
	        } else if (!$.isArray(data)) { // support fixedScroll
	            fixedScroll = data.fixedScroll;
	            data = data.data;
	        }

	        this.initData(data);
	        this.initSearch();
	        this.initPagination();
	        this.initBody(fixedScroll);
	    };

	    BootstrapTable.prototype.append = function (data) {
	        this.initData(data, 'append');
	        this.initSearch();
	        this.initPagination();
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.prepend = function (data) {
	        this.initData(data, 'prepend');
	        this.initSearch();
	        this.initPagination();
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.remove = function (params) {
	        var len = this.options.data.length,
	            i, row;

	        if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
	            return;
	        }

	        for (i = len - 1; i >= 0; i--) {
	            row = this.options.data[i];

	            if (!row.hasOwnProperty(params.field)) {
	                continue;
	            }
	            if ($.inArray(row[params.field], params.values) !== -1) {
	                this.options.data.splice(i, 1);
	            }
	        }

	        if (len === this.options.data.length) {
	            return;
	        }

	        this.initSearch();
	        this.initPagination();
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.removeAll = function () {
	        if (this.options.data.length > 0) {
	            this.options.data.splice(0, this.options.data.length);
	            this.initSearch();
	            this.initPagination();
	            this.initBody(true);
	        }
	    };

	    BootstrapTable.prototype.getRowByUniqueId = function (id) {
	        var uniqueId = this.options.uniqueId,
	            len = this.options.data.length,
	            dataRow = null,
	            i, row, rowUniqueId;

	        for (i = len - 1; i >= 0; i--) {
	            row = this.options.data[i];

	            if (row.hasOwnProperty(uniqueId)) { // uniqueId is a column
	                rowUniqueId = row[uniqueId];
	            } else if(row._data.hasOwnProperty(uniqueId)) { // uniqueId is a row data property
	                rowUniqueId = row._data[uniqueId];
	            } else {
	                continue;
	            }

	            if (typeof rowUniqueId === 'string') {
	                id = id.toString();
	            } else if (typeof rowUniqueId === 'number') {
	                if ((Number(rowUniqueId) === rowUniqueId) && (rowUniqueId % 1 === 0)) {
	                    id = parseInt(id);
	                } else if ((rowUniqueId === Number(rowUniqueId)) && (rowUniqueId !== 0)) {
	                    id = parseFloat(id);
	                }
	            }

	            if (rowUniqueId === id) {
	                dataRow = row;
	                break;
	            }
	        }

	        return dataRow;
	    };

	    BootstrapTable.prototype.removeByUniqueId = function (id) {
	        var len = this.options.data.length,
	            row = this.getRowByUniqueId(id);

	        if (row) {
	            this.options.data.splice(this.options.data.indexOf(row), 1);
	        }

	        if (len === this.options.data.length) {
	            return;
	        }

	        this.initSearch();
	        this.initPagination();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.updateByUniqueId = function (params) {
	        var that = this;
	        var allParams = $.isArray(params) ? params : [ params ];

	        $.each(allParams, function(i, params) {
	            var rowId;

	            if (!params.hasOwnProperty('id') || !params.hasOwnProperty('row')) {
	                return;
	            }

	            rowId = $.inArray(that.getRowByUniqueId(params.id), that.options.data);

	            if (rowId === -1) {
	                return;
	            }
	            $.extend(that.options.data[rowId], params.row);
	        });

	        this.initSearch();
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.insertRow = function (params) {
	        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
	            return;
	        }
	        this.data.splice(params.index, 0, params.row);
	        this.initSearch();
	        this.initPagination();
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.updateRow = function (params) {
	        var that = this;
	        var allParams = $.isArray(params) ? params : [ params ];

	        $.each(allParams, function(i, params) {
	            if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
	                return;
	            }
	            $.extend(that.options.data[params.index], params.row);
	        });

	        this.initSearch();
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.showRow = function (params) {
	        if (!params.hasOwnProperty('index') && !params.hasOwnProperty('uniqueId')) {
	            return;
	        }
	        this.toggleRow(params.index, params.uniqueId, true);
	    };

	    BootstrapTable.prototype.hideRow = function (params) {
	        if (!params.hasOwnProperty('index') && !params.hasOwnProperty('uniqueId')) {
	            return;
	        }
	        this.toggleRow(params.index, params.uniqueId, false);
	    };

	    BootstrapTable.prototype.getRowsHidden = function (show) {
	        var rows = $(this.$body[0]).children().filter(':hidden'),
	            i = 0;
	        if (show) {
	            for (; i < rows.length; i++) {
	                $(rows[i]).show();
	            }
	        }
	        return rows;
	    };

	    BootstrapTable.prototype.mergeCells = function (options) {
	        var row = options.index,
	            col = $.inArray(options.field, this.getVisibleFields()),
	            rowspan = options.rowspan || 1,
	            colspan = options.colspan || 1,
	            i, j,
	            $tr = this.$body.find('>tr'),
	            $td;

	        if (this.options.detailView && !this.options.cardView) {
	            col += 1;
	        }

	        $td = $tr.eq(row).find('>td').eq(col);

	        if (row < 0 || col < 0 || row >= this.data.length) {
	            return;
	        }

	        for (i = row; i < row + rowspan; i++) {
	            for (j = col; j < col + colspan; j++) {
	                $tr.eq(i).find('>td').eq(j).hide();
	            }
	        }

	        $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
	    };

	    BootstrapTable.prototype.updateCell = function (params) {
	        if (!params.hasOwnProperty('index') ||
	            !params.hasOwnProperty('field') ||
	            !params.hasOwnProperty('value')) {
	            return;
	        }
	        this.data[params.index][params.field] = params.value;

	        if (params.reinit === false) {
	            return;
	        }
	        this.initSort();
	        this.initBody(true);
	    };

	    BootstrapTable.prototype.getOptions = function () {
	        return this.options;
	    };

	    BootstrapTable.prototype.getSelections = function () {
	        var that = this;

	        return $.grep(this.options.data, function (row) {
	            return row[that.header.stateField];
	        });
	    };

	    BootstrapTable.prototype.getAllSelections = function () {
	        var that = this;

	        return $.grep(this.options.data, function (row) {
	            return row[that.header.stateField];
	        });
	    };

	    BootstrapTable.prototype.checkAll = function () {
	        this.checkAll_(true);
	    };

	    BootstrapTable.prototype.uncheckAll = function () {
	        this.checkAll_(false);
	    };

	    BootstrapTable.prototype.checkInvert = function () {
	        var that = this;
	        var rows = that.$selectItem.filter(':enabled');
	        var checked = rows.filter(':checked');
	        rows.each(function() {
	            $(this).prop('checked', !$(this).prop('checked'));
	        });
	        that.updateRows();
	        that.updateSelected();
	        that.trigger('uncheck-some', checked);
	        checked = that.getSelections();
	        that.trigger('check-some', checked);
	    };

	    BootstrapTable.prototype.checkAll_ = function (checked) {
	        var rows;
	        if (!checked) {
	            rows = this.getSelections();
	        }
	        this.$selectAll.add(this.$selectAll_).prop('checked', checked);
	        this.$selectItem.filter(':enabled').prop('checked', checked);
	        this.updateRows();
	        if (checked) {
	            rows = this.getSelections();
	        }
	        this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
	    };

	    BootstrapTable.prototype.check = function (index) {
	        this.check_(true, index);
	    };

	    BootstrapTable.prototype.uncheck = function (index) {
	        this.check_(false, index);
	    };

	    BootstrapTable.prototype.check_ = function (checked, index) {
	        var $el = this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
	        this.data[index][this.header.stateField] = checked;
	        this.updateSelected();
	        this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el);
	    };

	    BootstrapTable.prototype.checkBy = function (obj) {
	        this.checkBy_(true, obj);
	    };

	    BootstrapTable.prototype.uncheckBy = function (obj) {
	        this.checkBy_(false, obj);
	    };

	    BootstrapTable.prototype.checkBy_ = function (checked, obj) {
	        if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
	            return;
	        }

	        var that = this,
	            rows = [];
	        $.each(this.options.data, function (index, row) {
	            if (!row.hasOwnProperty(obj.field)) {
	                return false;
	            }
	            if ($.inArray(row[obj.field], obj.values) !== -1) {
	                var $el = that.$selectItem.filter(':enabled')
	                    .filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
	                row[that.header.stateField] = checked;
	                rows.push(row);
	                that.trigger(checked ? 'check' : 'uncheck', row, $el);
	            }
	        });
	        this.updateSelected();
	        this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
	    };

	    BootstrapTable.prototype.destroy = function () {
	        this.$el.insertBefore(this.$container);
	        $(this.options.toolbar).insertBefore(this.$el);
	        this.$container.next().remove();
	        this.$container.remove();
	        this.$el.html(this.$el_.html())
	            .css('margin-top', '0')
	            .attr('class', this.$el_.attr('class') || ''); // reset the class
	    };

	    BootstrapTable.prototype.showLoading = function () {
	        this.$tableLoading.show();
	    };

	    BootstrapTable.prototype.hideLoading = function () {
	        this.$tableLoading.hide();
	    };

	    BootstrapTable.prototype.togglePagination = function () {
	        this.options.pagination = !this.options.pagination;
	        var button = this.$toolbar.find('button[name="paginationSwitch"] i');
	        if (this.options.pagination) {
	            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown);
	        } else {
	            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp);
	        }
	        this.updatePagination();
	    };

	    BootstrapTable.prototype.refresh = function (params) {
	        if (params && params.url) {
	            this.options.pageNumber = 1;
	        }
	        this.initServer(params && params.silent,
	            params && params.query, params && params.url);
	        this.trigger('refresh', params);
	    };

	    BootstrapTable.prototype.resetWidth = function () {
	        if (this.options.showHeader && this.options.height) {
	            this.fitHeader();
	        }
	        if (this.options.showFooter) {
	            this.fitFooter();
	        }
	    };

	    BootstrapTable.prototype.showColumn = function (field) {
	        this.toggleColumn(getFieldIndex(this.columns, field), true, true);
	    };

	    BootstrapTable.prototype.hideColumn = function (field) {
	        this.toggleColumn(getFieldIndex(this.columns, field), false, true);
	    };

	    BootstrapTable.prototype.getHiddenColumns = function () {
	        return $.grep(this.columns, function (column) {
	            return !column.visible;
	        });
	    };

	    BootstrapTable.prototype.getVisibleColumns = function () {
	        return $.grep(this.columns, function (column) {
	            return column.visible;
	        });
	    };

	    BootstrapTable.prototype.toggleAllColumns = function (visible) {
	        $.each(this.columns, function (i, column) {
	            this.columns[i].visible = visible;
	        });

	        this.initHeader();
	        this.initSearch();
	        this.initPagination();
	        this.initBody();
	        if (this.options.showColumns) {
	            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

	            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
	                $items.filter(':checked').prop('disabled', true);
	            }
	        }
	    };

	    BootstrapTable.prototype.showAllColumns = function () {
	        this.toggleAllColumns(true);
	    };

	    BootstrapTable.prototype.hideAllColumns = function () {
	        this.toggleAllColumns(false);
	    };

	    BootstrapTable.prototype.filterBy = function (columns) {
	        this.filterColumns = $.isEmptyObject(columns) ? {} : columns;
	        this.options.pageNumber = 1;
	        this.initSearch();
	        this.updatePagination();
	    };

	    BootstrapTable.prototype.scrollTo = function (value) {
	        if (typeof value === 'string') {
	            value = value === 'bottom' ? this.$tableBody[0].scrollHeight : 0;
	        }
	        if (typeof value === 'number') {
	            this.$tableBody.scrollTop(value);
	        }
	        if (typeof value === 'undefined') {
	            return this.$tableBody.scrollTop();
	        }
	    };

	    BootstrapTable.prototype.getScrollPosition = function () {
	        return this.scrollTo();
	    };

	    BootstrapTable.prototype.selectPage = function (page) {
	        if (page > 0 && page <= this.options.totalPages) {
	            this.options.pageNumber = page;
	            this.updatePagination();
	        }
	    };

	    BootstrapTable.prototype.prevPage = function () {
	        if (this.options.pageNumber > 1) {
	            this.options.pageNumber--;
	            this.updatePagination();
	        }
	    };

	    BootstrapTable.prototype.nextPage = function () {
	        if (this.options.pageNumber < this.options.totalPages) {
	            this.options.pageNumber++;
	            this.updatePagination();
	        }
	    };

	    BootstrapTable.prototype.toggleView = function () {
	        this.options.cardView = !this.options.cardView;
	        this.initHeader();
	        // Fixed remove toolbar when click cardView button.
	        //that.initToolbar();
	        this.initBody();
	        this.trigger('toggle', this.options.cardView);
	    };

	    BootstrapTable.prototype.refreshOptions = function (options) {
	        //If the objects are equivalent then avoid the call of destroy / init methods
	        if (compareObjects(this.options, options, true)) {
	            return;
	        }
	        this.options = $.extend(this.options, options);
	        this.trigger('refresh-options', this.options);
	        this.destroy();
	        this.init();
	    };

	    BootstrapTable.prototype.resetSearch = function (text) {
	        var $search = this.$toolbar.find('.search input');
	        $search.val(text || '');
	        this.onSearch({currentTarget: $search});
	    };

	    BootstrapTable.prototype.expandRow_ = function (expand, index) {
	        var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', index));
	        if ($tr.next().is('tr.detail-view') === (expand ? false : true)) {
	            $tr.find('> td > .detail-icon').click();
	        }
	    };

	    BootstrapTable.prototype.expandRow = function (index) {
	        this.expandRow_(true, index);
	    };

	    BootstrapTable.prototype.collapseRow = function (index) {
	        this.expandRow_(false, index);
	    };

	    BootstrapTable.prototype.expandAllRows = function (isSubTable) {
	        if (isSubTable) {
	            var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', 0)),
	                that = this,
	                detailIcon = null,
	                executeInterval = false,
	                idInterval = -1;

	            if (!$tr.next().is('tr.detail-view')) {
	                $tr.find('> td > .detail-icon').click();
	                executeInterval = true;
	            } else if (!$tr.next().next().is('tr.detail-view')) {
	                $tr.next().find(".detail-icon").click();
	                executeInterval = true;
	            }

	            if (executeInterval) {
	                try {
	                    idInterval = setInterval(function () {
	                        detailIcon = that.$body.find("tr.detail-view").last().find(".detail-icon");
	                        if (detailIcon.length > 0) {
	                            detailIcon.click();
	                        } else {
	                            clearInterval(idInterval);
	                        }
	                    }, 1);
	                } catch (ex) {
	                    clearInterval(idInterval);
	                }
	            }
	        } else {
	            var trs = this.$body.children();
	            for (var i = 0; i < trs.length; i++) {
	                this.expandRow_(true, $(trs[i]).data("index"));
	            }
	        }
	    };

	    BootstrapTable.prototype.collapseAllRows = function (isSubTable) {
	        if (isSubTable) {
	            this.expandRow_(false, 0);
	        } else {
	            var trs = this.$body.children();
	            for (var i = 0; i < trs.length; i++) {
	                this.expandRow_(false, $(trs[i]).data("index"));
	            }
	        }
	    };

	    BootstrapTable.prototype.updateFormatText = function (name, text) {
	        if (this.options[sprintf('format%s', name)]) {
	            if (typeof text === 'string') {
	                this.options[sprintf('format%s', name)] = function () {
	                    return text;
	                };
	            } else if (typeof text === 'function') {
	                this.options[sprintf('format%s', name)] = text;
	            }
	        }
	        this.initToolbar();
	        this.initPagination();
	        this.initBody();
	    };

	    // BOOTSTRAP TABLE PLUGIN DEFINITION
	    // =======================

	    var allowedMethods = [
	        'getOptions',
	        'getSelections', 'getAllSelections', 'getData',
	        'load', 'append', 'prepend', 'remove', 'removeAll',
	        'insertRow', 'updateRow', 'updateCell', 'updateByUniqueId', 'removeByUniqueId',
	        'getRowByUniqueId', 'showRow', 'hideRow', 'getRowsHidden',
	        'mergeCells',
	        'checkAll', 'uncheckAll', 'checkInvert',
	        'check', 'uncheck',
	        'checkBy', 'uncheckBy',
	        'refresh',
	        'resetView',
	        'resetWidth',
	        'destroy',
	        'showLoading', 'hideLoading',
	        'showColumn', 'hideColumn', 'getHiddenColumns', 'getVisibleColumns',
	        'showAllColumns', 'hideAllColumns',
	        'filterBy',
	        'scrollTo',
	        'getScrollPosition',
	        'selectPage', 'prevPage', 'nextPage',
	        'togglePagination',
	        'toggleView',
	        'refreshOptions',
	        'resetSearch',
	        'expandRow', 'collapseRow', 'expandAllRows', 'collapseAllRows',
	        'updateFormatText'
	    ];

	    $.fn.bootstrapTable = function (option) {
	        var value,
	            args = Array.prototype.slice.call(arguments, 1);

	        this.each(function () {
	            var $this = $(this),
	                data = $this.data('bootstrap.table'),
	                options = $.extend({}, BootstrapTable.DEFAULTS, $this.data(),
	                    typeof option === 'object' && option);

	            if (typeof option === 'string') {
	                if ($.inArray(option, allowedMethods) < 0) {
	                    throw new Error("Unknown method: " + option);
	                }

	                if (!data) {
	                    return;
	                }

	                value = data[option].apply(data, args);

	                if (option === 'destroy') {
	                    $this.removeData('bootstrap.table');
	                }
	            }

	            if (!data) {
	                $this.data('bootstrap.table', (data = new BootstrapTable(this, options)));
	            }
	        });

	        return typeof value === 'undefined' ? this : value;
	    };

	    $.fn.bootstrapTable.Constructor = BootstrapTable;
	    $.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
	    $.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
	    $.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
	    $.fn.bootstrapTable.methods = allowedMethods;
	    $.fn.bootstrapTable.utils = {
	        sprintf: sprintf,
	        getFieldIndex: getFieldIndex,
	        compareObjects: compareObjects,
	        calculateObjectValue: calculateObjectValue,
	        getItemField: getItemField,
	        objectKeys: objectKeys,
	        isIEBrowser: isIEBrowser
	    };

	    // BOOTSTRAP TABLE INIT
	    // =======================

	    $(function () {
	        $('[data-toggle="table"]').bootstrapTable();
	    });
	})(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @author zhixin wen <wenzhixin2010@gmail.com>
	 * extensions: https://github.com/vitalets/x-editable
	 */
	(function($) {

	    'use strict';

	    $.extend($.fn.bootstrapTable.defaults, {
	        editable: true,
	        onEditableInit: function() {
	            return false;
	        },
	        onEditableSave: function(field, row, oldValue, $el) {
	            return false;
	        },
	        onEditableShown: function(field, row, $el, editable) {
	            return false;
	        },
	        onEditableHidden: function(field, row, $el, reason) {
	            return false;
	        }
	    });

	    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
	        'editable-init.bs.table': 'onEditableInit',
	        'editable-save.bs.table': 'onEditableSave',
	        'editable-shown.bs.table': 'onEditableShown',
	        'editable-hidden.bs.table': 'onEditableHidden'
	    });

	    var BootstrapTable = $.fn.bootstrapTable.Constructor,
	        _initTable = BootstrapTable.prototype.initTable,
	        _initBody = BootstrapTable.prototype.initBody;

	    BootstrapTable.prototype.initTable = function() {
	        var that = this;
	        _initTable.apply(this, Array.prototype.slice.apply(arguments));

	        if (!this.options.editable) {
	            return;
	        }

	        $.each(this.columns, function(i, column) {
	            if (!column.editable) {
	                return;
	            }

	            var editableOptions = {},
	                editableDataMarkup = [],
	                editableDataPrefix = 'editable-';

	            var processDataOptions = function(key, value) {
	                // Replace camel case with dashes.
	                var dashKey = key.replace(/([A-Z])/g, function($1) {
	                    return "-" + $1.toLowerCase();
	                });
	                if (dashKey.slice(0, editableDataPrefix.length) == editableDataPrefix) {
	                    var dataKey = dashKey.replace(editableDataPrefix, 'data-');
	                    editableOptions[dataKey] = value;
	                }
	            };

	            $.each(that.options, processDataOptions);

	            column.formatter = column.formatter || function(value, row, index) {
	                return value;
	            };
	            column._formatter = column._formatter ? column._formatter : column.formatter;
	            column.formatter = function(value, row, index) {
	                var result = column._formatter ? column._formatter(value, row, index) : value;

	                $.each(column, processDataOptions);

	                $.each(editableOptions, function(key, value) {
	                    editableDataMarkup.push(' ' + key + '="' + value + '"');
	                });

	                var _dont_edit_formatter = false;
	                if (column.editable.hasOwnProperty('noeditFormatter')) {
	                    _dont_edit_formatter = column.editable.noeditFormatter(value, row, index);
	                }

	                if (_dont_edit_formatter === false) {
	                    return ['<a href="javascript:void(0)"',
	                        ' data-name="' + column.field + '"',
	                        ' data-pk="' + row[that.options.idField] + '"',
	                        ' data-value="' + result + '"',
	                        editableDataMarkup.join(''),
	                        '>' + '</a>'
	                    ].join('');
	                } else {
	                    return _dont_edit_formatter;
	                }

	            };
	        });
	    };

	    BootstrapTable.prototype.initBody = function() {
	        var that = this;
	        _initBody.apply(this, Array.prototype.slice.apply(arguments));

	        if (!this.options.editable) {
	            return;
	        }

	        $.each(this.columns, function(i, column) {
	            if (!column.editable) {
	                return;
	            }

	            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
	                .off('save').on('save', function(e, params) {
	                    var data = that.getData(),
	                        index = $(this).parents('tr[data-index]').data('index'),
	                        row = data[index],
	                        oldValue = row[column.field];

	                    $(this).data('value', params.submitValue);
	                    row[column.field] = params.submitValue;
	                    that.trigger('editable-save', column.field, row, oldValue, $(this));
	                    that.resetFooter();
	                });
	            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
	                .off('shown').on('shown', function(e, editable) {
	                    var data = that.getData(),
	                        index = $(this).parents('tr[data-index]').data('index'),
	                        row = data[index];

	                    that.trigger('editable-shown', column.field, row, $(this), editable);
	                });
	            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
	                .off('hidden').on('hidden', function(e, reason) {
	                    var data = that.getData(),
	                        index = $(this).parents('tr[data-index]').data('index'),
	                        row = data[index];

	                    that.trigger('editable-hidden', column.field, row, $(this), reason);
	                });
	        });
	        this.trigger('editable-init');
	    };

	})(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.0
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2014 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================

	  var Tooltip = function (element, options) {
	    this.type       =
	    this.options    =
	    this.enabled    =
	    this.timeout    =
	    this.hoverState =
	    this.$element   = null

	    this.init('tooltip', element, options)
	  }

	  Tooltip.VERSION  = '3.3.0'

	  Tooltip.TRANSITION_DURATION = 150

	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }

	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

	    var triggers = this.options.trigger.split(' ')

	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]

	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }

	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }

	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }

	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }

	    return options
	  }

	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()

	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })

	    return options
	  }

	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (self && self.$tip && self.$tip.is(':visible')) {
	      self.hoverState = 'in'
	      return
	    }

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'in'

	    if (!self.options.delay || !self.options.delay.show) return self.show()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }

	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'out'

	    if (!self.options.delay || !self.options.delay.hide) return self.hide()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }

	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)

	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)

	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this

	      var $tip = this.tip()

	      var tipId = this.getUID(this.type)

	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)

	      if (this.options.animation) $tip.addClass('fade')

	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement

	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)

	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight

	      if (autoPlace) {
	        var orgPlacement = placement
	        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
	        var containerDim = this.getPosition($container)

	        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
	                    placement

	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }

	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

	      this.applyPlacement(calculatedOffset, placement)

	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null

	        if (prevHoverState == 'out') that.leave(that)
	      }

	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }

	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight

	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)

	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0

	    offset.top  = offset.top  + marginTop
	    offset.left = offset.left + marginLeft

	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)

	    $tip.addClass('in')

	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight

	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }

	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top

	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }

	  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
	    this.arrow()
	      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isHorizontal ? 'top' : 'left', '')
	  }

	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()

	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }

	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = this.tip()
	    var e    = $.Event('hide.bs.' + this.type)

	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      that.$element
	        .removeAttr('aria-describedby')
	        .trigger('hidden.bs.' + that.type)
	      callback && callback()
	    }

	    this.$element.trigger(e)

	    if (e.isDefaultPrevented()) return

	    $tip.removeClass('in')

	    $.support.transition && this.$tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()

	    this.hoverState = null

	    return this
	  }

	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }

	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }

	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element

	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'

	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }

	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

	  }

	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta

	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)

	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }

	    return delta
	  }

	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options

	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

	    return title
	  }

	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }

	  Tooltip.prototype.tip = function () {
	    return (this.$tip = this.$tip || $(this.options.template))
	  }

	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }

	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }

	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }

	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }

	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }

	    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	  }

	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	    })
	  }


	  // TOOLTIP PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this    = $(this)
	      var data     = $this.data('bs.tooltip')
	      var options  = typeof option == 'object' && option
	      var selector = options && options.selector

	      if (!data && option == 'destroy') return
	      if (selector) {
	        if (!data) $this.data('bs.tooltip', (data = {}))
	        if (!data[selector]) data[selector] = new Tooltip(this, options)
	      } else {
	        if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      }
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tooltip

	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip


	  // TOOLTIP NO CONFLICT
	  // ===================

	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }

	}(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: popover.js v3.3.0
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2014 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================

	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }

	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

	  Popover.VERSION  = '3.3.0'

	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })


	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================

	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

	  Popover.prototype.constructor = Popover

	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }

	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()

	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)

	    $tip.removeClass('fade top bottom left right in')

	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }

	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }

	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options

	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }

	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }

	  Popover.prototype.tip = function () {
	    if (!this.$tip) this.$tip = $(this.options.template)
	    return this.$tip
	  }


	  // POPOVER PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this    = $(this)
	      var data     = $this.data('bs.popover')
	      var options  = typeof option == 'object' && option
	      var selector = options && options.selector

	      if (!data && option == 'destroy') return
	      if (selector) {
	        if (!data) $this.data('bs.popover', (data = {}))
	        if (!data[selector]) data[selector] = new Popover(this, options)
	      } else {
	        if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      }
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.popover

	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover


	  // POPOVER NO CONFLICT
	  // ===================

	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }

	}(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery) {/*! X-editable - v1.5.1 
	* In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery
	* http://github.com/vitalets/x-editable
	* Copyright (c) 2013 Vitaliy Potapov; Licensed MIT */
	/**
	Form with single input element, two buttons and two states: normal/loading.
	Applied as jQuery method to DIV tag (not to form tag!). This is because form can be in loading state when spinner shown.
	Editableform is linked with one of input types, e.g. 'text', 'select' etc.

	@class editableform
	@uses text
	@uses textarea
	**/
	(function ($) {
	    "use strict";
	    
	    var EditableForm = function (div, options) {
	        this.options = $.extend({}, $.fn.editableform.defaults, options);
	        this.$div = $(div); //div, containing form. Not form tag. Not editable-element.
	        if(!this.options.scope) {
	            this.options.scope = this;
	        }
	        //nothing shown after init
	    };

	    EditableForm.prototype = {
	        constructor: EditableForm,
	        initInput: function() {  //called once
	            //take input from options (as it is created in editable-element)
	            this.input = this.options.input;
	            
	            //set initial value
	            //todo: may be add check: typeof str === 'string' ? 
	            this.value = this.input.str2value(this.options.value); 
	            
	            //prerender: get input.$input
	            this.input.prerender();
	        },
	        initTemplate: function() {
	            this.$form = $($.fn.editableform.template); 
	        },
	        initButtons: function() {
	            var $btn = this.$form.find('.editable-buttons');
	            $btn.append($.fn.editableform.buttons);
	            if(this.options.showbuttons === 'bottom') {
	                $btn.addClass('editable-buttons-bottom');
	            }
	        },
	        /**
	        Renders editableform

	        @method render
	        **/        
	        render: function() {
	            //init loader
	            this.$loading = $($.fn.editableform.loading);        
	            this.$div.empty().append(this.$loading);
	            
	            //init form template and buttons
	            this.initTemplate();
	            if(this.options.showbuttons) {
	                this.initButtons();
	            } else {
	                this.$form.find('.editable-buttons').remove();
	            }

	            //show loading state
	            this.showLoading();            
	            
	            //flag showing is form now saving value to server. 
	            //It is needed to wait when closing form.
	            this.isSaving = false;
	            
	            /**        
	            Fired when rendering starts
	            @event rendering 
	            @param {Object} event event object
	            **/            
	            this.$div.triggerHandler('rendering');
	            
	            //init input
	            this.initInput();
	            
	            //append input to form
	            this.$form.find('div.editable-input').append(this.input.$tpl);            
	            
	            //append form to container
	            this.$div.append(this.$form);
	            
	            //render input
	            $.when(this.input.render())
	            .then($.proxy(function () {
	                //setup input to submit automatically when no buttons shown
	                if(!this.options.showbuttons) {
	                    this.input.autosubmit(); 
	                }
	                 
	                //attach 'cancel' handler
	                this.$form.find('.editable-cancel').click($.proxy(this.cancel, this));
	                
	                if(this.input.error) {
	                    this.error(this.input.error);
	                    this.$form.find('.editable-submit').attr('disabled', true);
	                    this.input.$input.attr('disabled', true);
	                    //prevent form from submitting
	                    this.$form.submit(function(e){ e.preventDefault(); });
	                } else {
	                    this.error(false);
	                    this.input.$input.removeAttr('disabled');
	                    this.$form.find('.editable-submit').removeAttr('disabled');
	                    var value = (this.value === null || this.value === undefined || this.value === '') ? this.options.defaultValue : this.value;
	                    this.input.value2input(value);
	                    //attach submit handler
	                    this.$form.submit($.proxy(this.submit, this));
	                }

	                /**        
	                Fired when form is rendered
	                @event rendered
	                @param {Object} event event object
	                **/            
	                this.$div.triggerHandler('rendered');                

	                this.showForm();
	                
	                //call postrender method to perform actions required visibility of form
	                if(this.input.postrender) {
	                    this.input.postrender();
	                }                
	            }, this));
	        },
	        cancel: function() {   
	            /**        
	            Fired when form was cancelled by user
	            @event cancel 
	            @param {Object} event event object
	            **/              
	            this.$div.triggerHandler('cancel');
	        },
	        showLoading: function() {
	            var w, h;
	            if(this.$form) {
	                //set loading size equal to form
	                w = this.$form.outerWidth();
	                h = this.$form.outerHeight(); 
	                if(w) {
	                    this.$loading.width(w);
	                }
	                if(h) {
	                    this.$loading.height(h);
	                }
	                this.$form.hide();
	            } else {
	                //stretch loading to fill container width
	                w = this.$loading.parent().width();
	                if(w) {
	                    this.$loading.width(w);
	                }
	            }
	            this.$loading.show(); 
	        },

	        showForm: function(activate) {
	            this.$loading.hide();
	            this.$form.show();
	            if(activate !== false) {
	                this.input.activate(); 
	            }
	            /**        
	            Fired when form is shown
	            @event show 
	            @param {Object} event event object
	            **/                    
	            this.$div.triggerHandler('show');
	        },

	        error: function(msg) {
	            var $group = this.$form.find('.control-group'),
	                $block = this.$form.find('.editable-error-block'),
	                lines;

	            if(msg === false) {
	                $group.removeClass($.fn.editableform.errorGroupClass);
	                $block.removeClass($.fn.editableform.errorBlockClass).empty().hide(); 
	            } else {
	                //convert newline to <br> for more pretty error display
	                if(msg) {
	                    lines = (''+msg).split('\n');
	                    for (var i = 0; i < lines.length; i++) {
	                        lines[i] = $('<div>').text(lines[i]).html();
	                    }
	                    msg = lines.join('<br>');
	                }
	                $group.addClass($.fn.editableform.errorGroupClass);
	                $block.addClass($.fn.editableform.errorBlockClass).html(msg).show();
	            }
	        },

	        submit: function(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            
	            //get new value from input
	            var newValue = this.input.input2value(); 

	            //validation: if validate returns string or truthy value - means error
	            //if returns object like {newValue: '...'} => submitted value is reassigned to it
	            var error = this.validate(newValue);
	            if ($.type(error) === 'object' && error.newValue !== undefined) {
	                newValue = error.newValue;
	                this.input.value2input(newValue);
	                if(typeof error.msg === 'string') {
	                    this.error(error.msg);
	                    this.showForm();
	                    return;
	                }
	            } else if (error) {
	                this.error(error);
	                this.showForm();
	                return;
	            } 
	            
	            //if value not changed --> trigger 'nochange' event and return
	            /*jslint eqeq: true*/
	            if (!this.options.savenochange && this.input.value2str(newValue) == this.input.value2str(this.value)) {
	            /*jslint eqeq: false*/                
	                /**        
	                Fired when value not changed but form is submitted. Requires savenochange = false.
	                @event nochange 
	                @param {Object} event event object
	                **/                    
	                this.$div.triggerHandler('nochange');            
	                return;
	            } 

	            //convert value for submitting to server
	            var submitValue = this.input.value2submit(newValue);
	            
	            this.isSaving = true;
	            
	            //sending data to server
	            $.when(this.save(submitValue))
	            .done($.proxy(function(response) {
	                this.isSaving = false;

	                //run success callback
	                var res = typeof this.options.success === 'function' ? this.options.success.call(this.options.scope, response, newValue) : null;

	                //if success callback returns false --> keep form open and do not activate input
	                if(res === false) {
	                    this.error(false);
	                    this.showForm(false);
	                    return;
	                }

	                //if success callback returns string -->  keep form open, show error and activate input               
	                if(typeof res === 'string') {
	                    this.error(res);
	                    this.showForm();
	                    return;
	                }

	                //if success callback returns object like {newValue: <something>} --> use that value instead of submitted
	                //it is usefull if you want to chnage value in url-function
	                if(res && typeof res === 'object' && res.hasOwnProperty('newValue')) {
	                    newValue = res.newValue;
	                }

	                //clear error message
	                this.error(false);   
	                this.value = newValue;
	                /**        
	                Fired when form is submitted
	                @event save 
	                @param {Object} event event object
	                @param {Object} params additional params
	                @param {mixed} params.newValue raw new value
	                @param {mixed} params.submitValue submitted value as string
	                @param {Object} params.response ajax response

	                @example
	                $('#form-div').on('save'), function(e, params){
	                    if(params.newValue === 'username') {...}
	                });
	                **/
	                this.$div.triggerHandler('save', {newValue: newValue, submitValue: submitValue, response: response});
	            }, this))
	            .fail($.proxy(function(xhr) {
	                this.isSaving = false;

	                var msg;
	                if(typeof this.options.error === 'function') {
	                    msg = this.options.error.call(this.options.scope, xhr, newValue);
	                } else {
	                    msg = typeof xhr === 'string' ? xhr : xhr.responseText || xhr.statusText || 'Unknown error!';
	                }

	                this.error(msg);
	                this.showForm();
	            }, this));
	        },

	        save: function(submitValue) {
	            //try parse composite pk defined as json string in data-pk 
	            this.options.pk = $.fn.editableutils.tryParseJson(this.options.pk, true); 
	            
	            var pk = (typeof this.options.pk === 'function') ? this.options.pk.call(this.options.scope) : this.options.pk,
	            /*
	              send on server in following cases:
	              1. url is function
	              2. url is string AND (pk defined OR send option = always) 
	            */
	            send = !!(typeof this.options.url === 'function' || (this.options.url && ((this.options.send === 'always') || (this.options.send === 'auto' && pk !== null && pk !== undefined)))),
	            params;

	            if (send) { //send to server
	                this.showLoading();

	                //standard params
	                params = {
	                    name: this.options.name || '',
	                    value: submitValue,
	                    pk: pk 
	                };

	                //additional params
	                if(typeof this.options.params === 'function') {
	                    params = this.options.params.call(this.options.scope, params);  
	                } else {
	                    //try parse json in single quotes (from data-params attribute)
	                    this.options.params = $.fn.editableutils.tryParseJson(this.options.params, true);   
	                    $.extend(params, this.options.params);
	                }

	                if(typeof this.options.url === 'function') { //user's function
	                    return this.options.url.call(this.options.scope, params);
	                } else {  
	                    //send ajax to server and return deferred object
	                    return $.ajax($.extend({
	                        url     : this.options.url,
	                        data    : params,
	                        type    : 'POST'
	                    }, this.options.ajaxOptions));
	                }
	            }
	        }, 

	        validate: function (value) {
	            if (value === undefined) {
	                value = this.value;
	            }
	            if (typeof this.options.validate === 'function') {
	                return this.options.validate.call(this.options.scope, value);
	            }
	        },

	        option: function(key, value) {
	            if(key in this.options) {
	                this.options[key] = value;
	            }
	            
	            if(key === 'value') {
	                this.setValue(value);
	            }
	            
	            //do not pass option to input as it is passed in editable-element
	        },

	        setValue: function(value, convertStr) {
	            if(convertStr) {
	                this.value = this.input.str2value(value);
	            } else {
	                this.value = value;
	            }
	            
	            //if form is visible, update input
	            if(this.$form && this.$form.is(':visible')) {
	                this.input.value2input(this.value);
	            }            
	        }               
	    };

	    /*
	    Initialize editableform. Applied to jQuery object.

	    @method $().editableform(options)
	    @params {Object} options
	    @example
	    var $form = $('&lt;div&gt;').editableform({
	        type: 'text',
	        name: 'username',
	        url: '/post',
	        value: 'vitaliy'
	    });

	    //to display form you should call 'render' method
	    $form.editableform('render');     
	    */
	    $.fn.editableform = function (option) {
	        var args = arguments;
	        return this.each(function () {
	            var $this = $(this), 
	            data = $this.data('editableform'), 
	            options = typeof option === 'object' && option; 
	            if (!data) {
	                $this.data('editableform', (data = new EditableForm(this, options)));
	            }

	            if (typeof option === 'string') { //call method 
	                data[option].apply(data, Array.prototype.slice.call(args, 1));
	            } 
	        });
	    };

	    //keep link to constructor to allow inheritance
	    $.fn.editableform.Constructor = EditableForm;    

	    //defaults
	    $.fn.editableform.defaults = {
	        /* see also defaults for input */

	        /**
	        Type of input. Can be <code>text|textarea|select|date|checklist</code>

	        @property type 
	        @type string
	        @default 'text'
	        **/
	        type: 'text',
	        /**
	        Url for submit, e.g. <code>'/post'</code>  
	        If function - it will be called instead of ajax. Function should return deferred object to run fail/done callbacks.

	        @property url 
	        @type string|function
	        @default null
	        @example
	        url: function(params) {
	            var d = new $.Deferred;
	            if(params.value === 'abc') {
	                return d.reject('error message'); //returning error via deferred object
	            } else {
	                //async saving data in js model
	                someModel.asyncSaveMethod({
	                   ..., 
	                   success: function(){
	                      d.resolve();
	                   }
	                }); 
	                return d.promise();
	            }
	        } 
	        **/        
	        url:null,
	        /**
	        Additional params for submit. If defined as <code>object</code> - it is **appended** to original ajax data (pk, name and value).  
	        If defined as <code>function</code> - returned object **overwrites** original ajax data.
	        @example
	        params: function(params) {
	            //originally params contain pk, name and value
	            params.a = 1;
	            return params;
	        }

	        @property params 
	        @type object|function
	        @default null
	        **/          
	        params:null,
	        /**
	        Name of field. Will be submitted on server. Can be taken from <code>id</code> attribute

	        @property name 
	        @type string
	        @default null
	        **/         
	        name: null,
	        /**
	        Primary key of editable object (e.g. record id in database). For composite keys use object, e.g. <code>{id: 1, lang: 'en'}</code>.
	        Can be calculated dynamically via function.

	        @property pk 
	        @type string|object|function
	        @default null
	        **/         
	        pk: null,
	        /**
	        Initial value. If not defined - will be taken from element's content.
	        For __select__ type should be defined (as it is ID of shown text).

	        @property value 
	        @type string|object
	        @default null
	        **/        
	        value: null,
	        /**
	        Value that will be displayed in input if original field value is empty (`null|undefined|''`).

	        @property defaultValue 
	        @type string|object
	        @default null
	        @since 1.4.6
	        **/        
	        defaultValue: null,
	        /**
	        Strategy for sending data on server. Can be `auto|always|never`.
	        When 'auto' data will be sent on server **only if pk and url defined**, otherwise new value will be stored locally.

	        @property send 
	        @type string
	        @default 'auto'
	        **/          
	        send: 'auto', 
	        /**
	        Function for client-side validation. If returns string - means validation not passed and string showed as error.
	        Since 1.5.1 you can modify submitted value by returning object from `validate`: 
	        `{newValue: '...'}` or `{newValue: '...', msg: '...'}`

	        @property validate 
	        @type function
	        @default null
	        @example
	        validate: function(value) {
	            if($.trim(value) == '') {
	                return 'This field is required';
	            }
	        }
	        **/         
	        validate: null,
	        /**
	        Success callback. Called when value successfully sent on server and **response status = 200**.  
	        Usefull to work with json response. For example, if your backend response can be <code>{success: true}</code>
	        or <code>{success: false, msg: "server error"}</code> you can check it inside this callback.  
	        If it returns **string** - means error occured and string is shown as error message.  
	        If it returns **object like** <code>{newValue: &lt;something&gt;}</code> - it overwrites value, submitted by user.  
	        Otherwise newValue simply rendered into element.
	        
	        @property success 
	        @type function
	        @default null
	        @example
	        success: function(response, newValue) {
	            if(!response.success) return response.msg;
	        }
	        **/          
	        success: null,
	        /**
	        Error callback. Called when request failed (response status != 200).  
	        Usefull when you want to parse error response and display a custom message.
	        Must return **string** - the message to be displayed in the error block.
	                
	        @property error 
	        @type function
	        @default null
	        @since 1.4.4
	        @example
	        error: function(response, newValue) {
	            if(response.status === 500) {
	                return 'Service unavailable. Please try later.';
	            } else {
	                return response.responseText;
	            }
	        }
	        **/          
	        error: null,
	        /**
	        Additional options for submit ajax request.
	        List of values: http://api.jquery.com/jQuery.ajax
	        
	        @property ajaxOptions 
	        @type object
	        @default null
	        @since 1.1.1        
	        @example 
	        ajaxOptions: {
	            type: 'put',
	            dataType: 'json'
	        }        
	        **/        
	        ajaxOptions: null,
	        /**
	        Where to show buttons: left(true)|bottom|false  
	        Form without buttons is auto-submitted.

	        @property showbuttons 
	        @type boolean|string
	        @default true
	        @since 1.1.1
	        **/         
	        showbuttons: true,
	        /**
	        Scope for callback methods (success, validate).  
	        If <code>null</code> means editableform instance itself. 

	        @property scope 
	        @type DOMElement|object
	        @default null
	        @since 1.2.0
	        @private
	        **/            
	        scope: null,
	        /**
	        Whether to save or cancel value when it was not changed but form was submitted

	        @property savenochange 
	        @type boolean
	        @default false
	        @since 1.2.0
	        **/
	        savenochange: false
	    };   

	    /*
	    Note: following params could redefined in engine: bootstrap or jqueryui:
	    Classes 'control-group' and 'editable-error-block' must always present!
	    */      
	    $.fn.editableform.template = '<form class="form-inline editableform">'+
	    '<div class="control-group">' + 
	    '<div><div class="editable-input"></div><div class="editable-buttons"></div></div>'+
	    '<div class="editable-error-block"></div>' + 
	    '</div>' + 
	    '</form>';

	    //loading div
	    $.fn.editableform.loading = '<div class="editableform-loading"></div>';

	    //buttons
	    $.fn.editableform.buttons = '<button type="submit" class="editable-submit">ok</button>'+
	    '<button type="button" class="editable-cancel">cancel</button>';      

	    //error class attached to control-group
	    $.fn.editableform.errorGroupClass = null;  

	    //error class attached to editable-error-block
	    $.fn.editableform.errorBlockClass = 'editable-error';
	    
	    //engine
	    $.fn.editableform.engine = 'jquery';
	}(__webpack_provided_window_dot_jQuery));

	/**
	* EditableForm utilites
	*/
	(function ($) {
	    "use strict";
	    
	    //utils
	    $.fn.editableutils = {
	        /**
	        * classic JS inheritance function
	        */  
	        inherit: function (Child, Parent) {
	            var F = function() { };
	            F.prototype = Parent.prototype;
	            Child.prototype = new F();
	            Child.prototype.constructor = Child;
	            Child.superclass = Parent.prototype;
	        },

	        /**
	        * set caret position in input
	        * see http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
	        */        
	        setCursorPosition: function(elem, pos) {
	            if (elem.setSelectionRange) {
	                elem.setSelectionRange(pos, pos);
	            } else if (elem.createTextRange) {
	                var range = elem.createTextRange();
	                range.collapse(true);
	                range.moveEnd('character', pos);
	                range.moveStart('character', pos);
	                range.select();
	            }
	        },

	        /**
	        * function to parse JSON in *single* quotes. (jquery automatically parse only double quotes)
	        * That allows such code as: <a data-source="{'a': 'b', 'c': 'd'}">
	        * safe = true --> means no exception will be thrown
	        * for details see http://stackoverflow.com/questions/7410348/how-to-set-json-format-to-html5-data-attributes-in-the-jquery
	        */
	        tryParseJson: function(s, safe) {
	            if (typeof s === 'string' && s.length && s.match(/^[\{\[].*[\}\]]$/)) {
	                if (safe) {
	                    try {
	                        /*jslint evil: true*/
	                        s = (new Function('return ' + s))();
	                        /*jslint evil: false*/
	                    } catch (e) {} finally {
	                        return s;
	                    }
	                } else {
	                    /*jslint evil: true*/
	                    s = (new Function('return ' + s))();
	                    /*jslint evil: false*/
	                }
	            }
	            return s;
	        },

	        /**
	        * slice object by specified keys
	        */
	        sliceObj: function(obj, keys, caseSensitive /* default: false */) {
	            var key, keyLower, newObj = {};

	            if (!$.isArray(keys) || !keys.length) {
	                return newObj;
	            }

	            for (var i = 0; i < keys.length; i++) {
	                key = keys[i];
	                if (obj.hasOwnProperty(key)) {
	                    newObj[key] = obj[key];
	                }

	                if(caseSensitive === true) {
	                    continue;
	                }

	                //when getting data-* attributes via $.data() it's converted to lowercase.
	                //details: http://stackoverflow.com/questions/7602565/using-data-attributes-with-jquery
	                //workaround is code below.
	                keyLower = key.toLowerCase();
	                if (obj.hasOwnProperty(keyLower)) {
	                    newObj[key] = obj[keyLower];
	                }
	            }

	            return newObj;
	        },

	        /*
	        exclude complex objects from $.data() before pass to config
	        */
	        getConfigData: function($element) {
	            var data = {};
	            $.each($element.data(), function(k, v) {
	                if(typeof v !== 'object' || (v && typeof v === 'object' && (v.constructor === Object || v.constructor === Array))) {
	                    data[k] = v;
	                }
	            });
	            return data;
	        },

	        /*
	         returns keys of object
	        */
	        objectKeys: function(o) {
	            if (Object.keys) {
	                return Object.keys(o);  
	            } else {
	                if (o !== Object(o)) {
	                    throw new TypeError('Object.keys called on a non-object');
	                }
	                var k=[], p;
	                for (p in o) {
	                    if (Object.prototype.hasOwnProperty.call(o,p)) {
	                        k.push(p);
	                    }
	                }
	                return k;
	            }

	        },
	        
	       /**
	        method to escape html.
	       **/
	       escape: function(str) {
	           return $('<div>').text(str).html();
	       },
	       
	       /*
	        returns array items from sourceData having value property equal or inArray of 'value'
	       */
	       itemsByValue: function(value, sourceData, valueProp) {
	           if(!sourceData || value === null) {
	               return [];
	           }
	           
	           if (typeof(valueProp) !== "function") {
	               var idKey = valueProp || 'value';
	               valueProp = function (e) { return e[idKey]; };
	           }
	                      
	           var isValArray = $.isArray(value),
	           result = [], 
	           that = this;

	           $.each(sourceData, function(i, o) {
	               if(o.children) {
	                   result = result.concat(that.itemsByValue(value, o.children, valueProp));
	               } else {
	                   /*jslint eqeq: true*/
	                   if(isValArray) {
	                       if($.grep(value, function(v){  return v == (o && typeof o === 'object' ? valueProp(o) : o); }).length) {
	                           result.push(o); 
	                       }
	                   } else {
	                       var itemValue = (o && (typeof o === 'object')) ? valueProp(o) : o;
	                       if(value == itemValue) {
	                           result.push(o); 
	                       }
	                   }
	                   /*jslint eqeq: false*/
	               }
	           });
	           
	           return result;
	       },
	       
	       /*
	       Returns input by options: type, mode. 
	       */
	       createInput: function(options) {
	           var TypeConstructor, typeOptions, input,
	           type = options.type;

	           //`date` is some kind of virtual type that is transformed to one of exact types
	           //depending on mode and core lib
	           if(type === 'date') {
	               //inline
	               if(options.mode === 'inline') {
	                   if($.fn.editabletypes.datefield) {
	                       type = 'datefield';
	                   } else if($.fn.editabletypes.dateuifield) {
	                       type = 'dateuifield';
	                   }
	               //popup
	               } else {
	                   if($.fn.editabletypes.date) {
	                       type = 'date';
	                   } else if($.fn.editabletypes.dateui) {
	                       type = 'dateui';
	                   }
	               }
	               
	               //if type still `date` and not exist in types, replace with `combodate` that is base input
	               if(type === 'date' && !$.fn.editabletypes.date) {
	                   type = 'combodate';
	               } 
	           }
	           
	           //`datetime` should be datetimefield in 'inline' mode
	           if(type === 'datetime' && options.mode === 'inline') {
	             type = 'datetimefield';  
	           }           

	           //change wysihtml5 to textarea for jquery UI and plain versions
	           if(type === 'wysihtml5' && !$.fn.editabletypes[type]) {
	               type = 'textarea';
	           }

	           //create input of specified type. Input will be used for converting value, not in form
	           if(typeof $.fn.editabletypes[type] === 'function') {
	               TypeConstructor = $.fn.editabletypes[type];
	               typeOptions = this.sliceObj(options, this.objectKeys(TypeConstructor.defaults));
	               input = new TypeConstructor(typeOptions);
	               return input;
	           } else {
	               $.error('Unknown type: '+ type);
	               return false; 
	           }  
	       },
	       
	       //see http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	       supportsTransitions: function () {
	           var b = document.body || document.documentElement,
	               s = b.style,
	               p = 'transition',
	               v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
	               
	           if(typeof s[p] === 'string') {
	               return true; 
	           }

	           // Tests for vendor specific prop
	           p = p.charAt(0).toUpperCase() + p.substr(1);
	           for(var i=0; i<v.length; i++) {
	               if(typeof s[v[i] + p] === 'string') { 
	                   return true; 
	               }
	           }
	           return false;
	       }            
	       
	    };      
	}(__webpack_provided_window_dot_jQuery));

	/**
	Attaches stand-alone container with editable-form to HTML element. Element is used only for positioning, value is not stored anywhere.<br>
	This method applied internally in <code>$().editable()</code>. You should subscribe on it's events (save / cancel) to get profit of it.<br>
	Final realization can be different: bootstrap-popover, jqueryui-tooltip, poshytip, inline-div. It depends on which js file you include.<br>
	Applied as jQuery method.

	@class editableContainer
	@uses editableform
	**/
	(function ($) {
	    "use strict";

	    var Popup = function (element, options) {
	        this.init(element, options);
	    };
	    
	    var Inline = function (element, options) {
	        this.init(element, options);
	    };    

	    //methods
	    Popup.prototype = {
	        containerName: null, //method to call container on element
	        containerDataName: null, //object name in element's .data()
	        innerCss: null, //tbd in child class
	        containerClass: 'editable-container editable-popup', //css class applied to container element
	        defaults: {}, //container itself defaults
	        
	        init: function(element, options) {
	            this.$element = $(element);
	            //since 1.4.1 container do not use data-* directly as they already merged into options.
	            this.options = $.extend({}, $.fn.editableContainer.defaults, options);         
	            this.splitOptions();
	            
	            //set scope of form callbacks to element
	            this.formOptions.scope = this.$element[0]; 
	            
	            this.initContainer();
	            
	            //flag to hide container, when saving value will finish
	            this.delayedHide = false;

	            //bind 'destroyed' listener to destroy container when element is removed from dom
	            this.$element.on('destroyed', $.proxy(function(){
	                this.destroy();
	            }, this)); 
	            
	            //attach document handler to close containers on click / escape
	            if(!$(document).data('editable-handlers-attached')) {
	                //close all on escape
	                $(document).on('keyup.editable', function (e) {
	                    if (e.which === 27) {
	                        $('.editable-open').editableContainer('hide');
	                        //todo: return focus on element 
	                    }
	                });

	                //close containers when click outside 
	                //(mousedown could be better than click, it closes everything also on drag drop)
	                $(document).on('click.editable', function(e) {
	                    var $target = $(e.target), i,
	                        exclude_classes = ['.editable-container', 
	                                           '.ui-datepicker-header', 
	                                           '.datepicker', //in inline mode datepicker is rendered into body
	                                           '.modal-backdrop', 
	                                           '.bootstrap-wysihtml5-insert-image-modal', 
	                                           '.bootstrap-wysihtml5-insert-link-modal'
	                                           ];
	                    
	                    //check if element is detached. It occurs when clicking in bootstrap datepicker
	                    if (!$.contains(document.documentElement, e.target)) {
	                      return;
	                    }

	                    //for some reason FF 20 generates extra event (click) in select2 widget with e.target = document
	                    //we need to filter it via construction below. See https://github.com/vitalets/x-editable/issues/199
	                    //Possibly related to http://stackoverflow.com/questions/10119793/why-does-firefox-react-differently-from-webkit-and-ie-to-click-event-on-selec
	                    if($target.is(document)) {
	                       return; 
	                    }
	                    
	                    //if click inside one of exclude classes --> no nothing
	                    for(i=0; i<exclude_classes.length; i++) {
	                         if($target.is(exclude_classes[i]) || $target.parents(exclude_classes[i]).length) {
	                             return;
	                         }
	                    }
	                      
	                    //close all open containers (except one - target)
	                    Popup.prototype.closeOthers(e.target);
	                });
	                
	                $(document).data('editable-handlers-attached', true);
	            }                        
	        },

	        //split options on containerOptions and formOptions
	        splitOptions: function() {
	            this.containerOptions = {};
	            this.formOptions = {};
	            
	            if(!$.fn[this.containerName]) {
	                throw new Error(this.containerName + ' not found. Have you included corresponding js file?');   
	            }
	            
	            //keys defined in container defaults go to container, others go to form
	            for(var k in this.options) {
	              if(k in this.defaults) {
	                 this.containerOptions[k] = this.options[k];
	              } else {
	                 this.formOptions[k] = this.options[k];
	              } 
	            }
	        },
	        
	        /*
	        Returns jquery object of container
	        @method tip()
	        */         
	        tip: function() {
	            return this.container() ? this.container().$tip : null;
	        },

	        /* returns container object */
	        container: function() {
	            var container;
	            //first, try get it by `containerDataName`
	            if(this.containerDataName) {
	                if(container = this.$element.data(this.containerDataName)) {
	                    return container;
	                }
	            }
	            //second, try `containerName`
	            container = this.$element.data(this.containerName);
	            return container;
	        },

	        /* call native method of underlying container, e.g. this.$element.popover('method') */ 
	        call: function() {
	            this.$element[this.containerName].apply(this.$element, arguments); 
	        },        
	        
	        initContainer: function(){
	            this.call(this.containerOptions);
	        },

	        renderForm: function() {
	            this.$form
	            .editableform(this.formOptions)
	            .on({
	                save: $.proxy(this.save, this), //click on submit button (value changed)
	                nochange: $.proxy(function(){ this.hide('nochange'); }, this), //click on submit button (value NOT changed)                
	                cancel: $.proxy(function(){ this.hide('cancel'); }, this), //click on calcel button
	                show: $.proxy(function() {
	                    if(this.delayedHide) {
	                        this.hide(this.delayedHide.reason);
	                        this.delayedHide = false;
	                    } else {
	                        this.setPosition();
	                    }
	                }, this), //re-position container every time form is shown (occurs each time after loading state)
	                rendering: $.proxy(this.setPosition, this), //this allows to place container correctly when loading shown
	                resize: $.proxy(this.setPosition, this), //this allows to re-position container when form size is changed 
	                rendered: $.proxy(function(){
	                    /**        
	                    Fired when container is shown and form is rendered (for select will wait for loading dropdown options).  
	                    **Note:** Bootstrap popover has own `shown` event that now cannot be separated from x-editable's one.
	                    The workaround is to check `arguments.length` that is always `2` for x-editable.                     
	                    
	                    @event shown 
	                    @param {Object} event event object
	                    @example
	                    $('#username').on('shown', function(e, editable) {
	                        editable.input.$input.val('overwriting value of input..');
	                    });                     
	                    **/                      
	                    /*
	                     TODO: added second param mainly to distinguish from bootstrap's shown event. It's a hotfix that will be solved in future versions via namespaced events.  
	                    */
	                    this.$element.triggerHandler('shown', $(this.options.scope).data('editable')); 
	                }, this) 
	            })
	            .editableform('render');
	        },        

	        /**
	        Shows container with form
	        @method show()
	        @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
	        **/
	        /* Note: poshytip owerwrites this method totally! */          
	        show: function (closeAll) {
	            this.$element.addClass('editable-open');
	            if(closeAll !== false) {
	                //close all open containers (except this)
	                this.closeOthers(this.$element[0]);  
	            }
	            
	            //show container itself
	            this.innerShow();
	            this.tip().addClass(this.containerClass);

	            /*
	            Currently, form is re-rendered on every show. 
	            The main reason is that we dont know, what will container do with content when closed:
	            remove(), detach() or just hide() - it depends on container.
	            
	            Detaching form itself before hide and re-insert before show is good solution, 
	            but visually it looks ugly --> container changes size before hide.  
	            */             
	            
	            //if form already exist - delete previous data 
	            if(this.$form) {
	                //todo: destroy prev data!
	                //this.$form.destroy();
	            }

	            this.$form = $('<div>');
	            
	            //insert form into container body
	            if(this.tip().is(this.innerCss)) {
	                //for inline container
	                this.tip().append(this.$form); 
	            } else {
	                this.tip().find(this.innerCss).append(this.$form);
	            } 
	            
	            //render form
	            this.renderForm();
	        },

	        /**
	        Hides container with form
	        @method hide()
	        @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|undefined (=manual)</code>
	        **/         
	        hide: function(reason) {  
	            if(!this.tip() || !this.tip().is(':visible') || !this.$element.hasClass('editable-open')) {
	                return;
	            }
	            
	            //if form is saving value, schedule hide
	            if(this.$form.data('editableform').isSaving) {
	                this.delayedHide = {reason: reason};
	                return;    
	            } else {
	                this.delayedHide = false;
	            }

	            this.$element.removeClass('editable-open');   
	            this.innerHide();

	            /**
	            Fired when container was hidden. It occurs on both save or cancel.  
	            **Note:** Bootstrap popover has own `hidden` event that now cannot be separated from x-editable's one.
	            The workaround is to check `arguments.length` that is always `2` for x-editable. 

	            @event hidden 
	            @param {object} event event object
	            @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|manual</code>
	            @example
	            $('#username').on('hidden', function(e, reason) {
	                if(reason === 'save' || reason === 'cancel') {
	                    //auto-open next editable
	                    $(this).closest('tr').next().find('.editable').editable('show');
	                } 
	            });
	            **/
	            this.$element.triggerHandler('hidden', reason || 'manual');   
	        },

	        /* internal show method. To be overwritten in child classes */
	        innerShow: function () {
	             
	        },        

	        /* internal hide method. To be overwritten in child classes */
	        innerHide: function () {

	        },
	        
	        /**
	        Toggles container visibility (show / hide)
	        @method toggle()
	        @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
	        **/          
	        toggle: function(closeAll) {
	            if(this.container() && this.tip() && this.tip().is(':visible')) {
	                this.hide();
	            } else {
	                this.show(closeAll);
	            } 
	        },

	        /*
	        Updates the position of container when content changed.
	        @method setPosition()
	        */       
	        setPosition: function() {
	            //tbd in child class
	        },

	        save: function(e, params) {
	            /**        
	            Fired when new value was submitted. You can use <code>$(this).data('editableContainer')</code> inside handler to access to editableContainer instance
	            
	            @event save 
	            @param {Object} event event object
	            @param {Object} params additional params
	            @param {mixed} params.newValue submitted value
	            @param {Object} params.response ajax response
	            @example
	            $('#username').on('save', function(e, params) {
	                //assuming server response: '{success: true}'
	                var pk = $(this).data('editableContainer').options.pk;
	                if(params.response && params.response.success) {
	                    alert('value: ' + params.newValue + ' with pk: ' + pk + ' saved!');
	                } else {
	                    alert('error!'); 
	                } 
	            });
	            **/             
	            this.$element.triggerHandler('save', params);
	            
	            //hide must be after trigger, as saving value may require methods of plugin, applied to input
	            this.hide('save');
	        },

	        /**
	        Sets new option
	        
	        @method option(key, value)
	        @param {string} key 
	        @param {mixed} value 
	        **/         
	        option: function(key, value) {
	            this.options[key] = value;
	            if(key in this.containerOptions) {
	                this.containerOptions[key] = value;
	                this.setContainerOption(key, value); 
	            } else {
	                this.formOptions[key] = value;
	                if(this.$form) {
	                    this.$form.editableform('option', key, value);  
	                }
	            }
	        },
	        
	        setContainerOption: function(key, value) {
	            this.call('option', key, value);
	        },

	        /**
	        Destroys the container instance
	        @method destroy()
	        **/        
	        destroy: function() {
	            this.hide();
	            this.innerDestroy();
	            this.$element.off('destroyed');
	            this.$element.removeData('editableContainer');
	        },
	        
	        /* to be overwritten in child classes */
	        innerDestroy: function() {
	            
	        }, 
	        
	        /*
	        Closes other containers except one related to passed element. 
	        Other containers can be cancelled or submitted (depends on onblur option)
	        */
	        closeOthers: function(element) {
	            $('.editable-open').each(function(i, el){
	                //do nothing with passed element and it's children
	                if(el === element || $(el).find(element).length) {
	                    return;
	                }

	                //otherwise cancel or submit all open containers 
	                var $el = $(el),
	                ec = $el.data('editableContainer');

	                if(!ec) {
	                    return;  
	                }
	                
	                if(ec.options.onblur === 'cancel') {
	                    $el.data('editableContainer').hide('onblur');
	                } else if(ec.options.onblur === 'submit') {
	                    $el.data('editableContainer').tip().find('form').submit();
	                }
	            });

	        },
	        
	        /**
	        Activates input of visible container (e.g. set focus)
	        @method activate()
	        **/         
	        activate: function() {
	            if(this.tip && this.tip().is(':visible') && this.$form) {
	               this.$form.data('editableform').input.activate(); 
	            }
	        } 

	    };

	    /**
	    jQuery method to initialize editableContainer.
	    
	    @method $().editableContainer(options)
	    @params {Object} options
	    @example
	    $('#edit').editableContainer({
	        type: 'text',
	        url: '/post',
	        pk: 1,
	        value: 'hello'
	    });
	    **/  
	    $.fn.editableContainer = function (option) {
	        var args = arguments;
	        return this.each(function () {
	            var $this = $(this),
	            dataKey = 'editableContainer', 
	            data = $this.data(dataKey),
	            options = typeof option === 'object' && option,
	            Constructor = (options.mode === 'inline') ? Inline : Popup;             

	            if (!data) {
	                $this.data(dataKey, (data = new Constructor(this, options)));
	            }

	            if (typeof option === 'string') { //call method 
	                data[option].apply(data, Array.prototype.slice.call(args, 1));
	            }            
	        });
	    };     

	    //store constructors
	    $.fn.editableContainer.Popup = Popup;
	    $.fn.editableContainer.Inline = Inline;

	    //defaults
	    $.fn.editableContainer.defaults = {
	        /**
	        Initial value of form input

	        @property value 
	        @type mixed
	        @default null
	        @private
	        **/        
	        value: null,
	        /**
	        Placement of container relative to element. Can be <code>top|right|bottom|left</code>. Not used for inline container.

	        @property placement 
	        @type string
	        @default 'top'
	        **/        
	        placement: 'top',
	        /**
	        Whether to hide container on save/cancel.

	        @property autohide 
	        @type boolean
	        @default true
	        @private 
	        **/        
	        autohide: true,
	        /**
	        Action when user clicks outside the container. Can be <code>cancel|submit|ignore</code>.  
	        Setting <code>ignore</code> allows to have several containers open. 

	        @property onblur 
	        @type string
	        @default 'cancel'
	        @since 1.1.1
	        **/        
	        onblur: 'cancel',
	        
	        /**
	        Animation speed (inline mode only)
	        @property anim 
	        @type string
	        @default false
	        **/        
	        anim: false,
	        
	        /**
	        Mode of editable, can be `popup` or `inline` 
	        
	        @property mode 
	        @type string         
	        @default 'popup'
	        @since 1.4.0        
	        **/        
	        mode: 'popup'        
	    };

	    /* 
	    * workaround to have 'destroyed' event to destroy popover when element is destroyed
	    * see http://stackoverflow.com/questions/2200494/jquery-trigger-event-when-an-element-is-removed-from-the-dom
	    */
	    jQuery.event.special.destroyed = {
	        remove: function(o) {
	            if (o.handler) {
	                o.handler();
	            }
	        }
	    };    

	}(__webpack_provided_window_dot_jQuery));

	/**
	* Editable Inline 
	* ---------------------
	*/
	(function ($) {
	    "use strict";
	    
	    //copy prototype from EditableContainer
	    //extend methods
	    $.extend($.fn.editableContainer.Inline.prototype, $.fn.editableContainer.Popup.prototype, {
	        containerName: 'editableform',
	        innerCss: '.editable-inline',
	        containerClass: 'editable-container editable-inline', //css class applied to container element
	                 
	        initContainer: function(){
	            //container is <span> element
	            this.$tip = $('<span></span>');
	            
	            //convert anim to miliseconds (int)
	            if(!this.options.anim) {
	                this.options.anim = 0;
	            }         
	        },
	        
	        splitOptions: function() {
	            //all options are passed to form
	            this.containerOptions = {};
	            this.formOptions = this.options;
	        },
	        
	        tip: function() {
	           return this.$tip; 
	        },
	        
	        innerShow: function () {
	            this.$element.hide();
	            this.tip().insertAfter(this.$element).show();
	        }, 
	        
	        innerHide: function () {
	            this.$tip.hide(this.options.anim, $.proxy(function() {
	                this.$element.show();
	                this.innerDestroy();
	            }, this)); 
	        },
	        
	        innerDestroy: function() {
	            if(this.tip()) {
	                this.tip().empty().remove();
	            }
	        } 
	    });

	}(__webpack_provided_window_dot_jQuery));
	/**
	Makes editable any HTML element on the page. Applied as jQuery method.

	@class editable
	@uses editableContainer
	**/
	(function ($) {
	    "use strict";

	    var Editable = function (element, options) {
	        this.$element = $(element);
	        //data-* has more priority over js options: because dynamically created elements may change data-* 
	        this.options = $.extend({}, $.fn.editable.defaults, options, $.fn.editableutils.getConfigData(this.$element));  
	        if(this.options.selector) {
	            this.initLive();
	        } else {
	            this.init();
	        }
	        
	        //check for transition support
	        if(this.options.highlight && !$.fn.editableutils.supportsTransitions()) {
	            this.options.highlight = false;
	        }
	    };

	    Editable.prototype = {
	        constructor: Editable, 
	        init: function () {
	            var isValueByText = false, 
	                doAutotext, finalize;

	            //name
	            this.options.name = this.options.name || this.$element.attr('id');
	             
	            //create input of specified type. Input needed already here to convert value for initial display (e.g. show text by id for select)
	            //also we set scope option to have access to element inside input specific callbacks (e. g. source as function)
	            this.options.scope = this.$element[0]; 
	            this.input = $.fn.editableutils.createInput(this.options);
	            if(!this.input) {
	                return; 
	            }            

	            //set value from settings or by element's text
	            if (this.options.value === undefined || this.options.value === null) {
	                this.value = this.input.html2value($.trim(this.$element.html()));
	                isValueByText = true;
	            } else {
	                /*
	                  value can be string when received from 'data-value' attribute
	                  for complext objects value can be set as json string in data-value attribute, 
	                  e.g. data-value="{city: 'Moscow', street: 'Lenina'}"
	                */
	                this.options.value = $.fn.editableutils.tryParseJson(this.options.value, true); 
	                if(typeof this.options.value === 'string') {
	                    this.value = this.input.str2value(this.options.value);
	                } else {
	                    this.value = this.options.value;
	                }
	            }
	            
	            //add 'editable' class to every editable element
	            this.$element.addClass('editable');
	            
	            //specifically for "textarea" add class .editable-pre-wrapped to keep linebreaks
	            if(this.input.type === 'textarea') {
	                this.$element.addClass('editable-pre-wrapped');
	            }
	            
	            //attach handler activating editable. In disabled mode it just prevent default action (useful for links)
	            if(this.options.toggle !== 'manual') {
	                this.$element.addClass('editable-click');
	                this.$element.on(this.options.toggle + '.editable', $.proxy(function(e){
	                    //prevent following link if editable enabled
	                    if(!this.options.disabled) {
	                        e.preventDefault();
	                    }
	                    
	                    //stop propagation not required because in document click handler it checks event target
	                    //e.stopPropagation();
	                    
	                    if(this.options.toggle === 'mouseenter') {
	                        //for hover only show container
	                        this.show();
	                    } else {
	                        //when toggle='click' we should not close all other containers as they will be closed automatically in document click listener
	                        var closeAll = (this.options.toggle !== 'click');
	                        this.toggle(closeAll);
	                    }
	                }, this));
	            } else {
	                this.$element.attr('tabindex', -1); //do not stop focus on element when toggled manually
	            }
	            
	            //if display is function it's far more convinient to have autotext = always to render correctly on init
	            //see https://github.com/vitalets/x-editable-yii/issues/34
	            if(typeof this.options.display === 'function') {
	                this.options.autotext = 'always';
	            }
	            
	            //check conditions for autotext:
	            switch(this.options.autotext) {
	              case 'always':
	               doAutotext = true;
	              break;
	              case 'auto':
	                //if element text is empty and value is defined and value not generated by text --> run autotext
	                doAutotext = !$.trim(this.$element.text()).length && this.value !== null && this.value !== undefined && !isValueByText;
	              break;
	              default:
	               doAutotext = false;
	            }

	            //depending on autotext run render() or just finilize init
	            $.when(doAutotext ? this.render() : true).then($.proxy(function() {
	                if(this.options.disabled) {
	                    this.disable();
	                } else {
	                    this.enable(); 
	                }
	               /**        
	               Fired when element was initialized by `$().editable()` method. 
	               Please note that you should setup `init` handler **before** applying `editable`. 
	                              
	               @event init 
	               @param {Object} event event object
	               @param {Object} editable editable instance (as here it cannot accessed via data('editable'))
	               @since 1.2.0
	               @example
	               $('#username').on('init', function(e, editable) {
	                   alert('initialized ' + editable.options.name);
	               });
	               $('#username').editable();
	               **/                  
	                this.$element.triggerHandler('init', this);
	            }, this));
	        },

	        /*
	         Initializes parent element for live editables 
	        */
	        initLive: function() {
	           //store selector 
	           var selector = this.options.selector;
	           //modify options for child elements
	           this.options.selector = false; 
	           this.options.autotext = 'never';
	           //listen toggle events
	           this.$element.on(this.options.toggle + '.editable', selector, $.proxy(function(e){
	               var $target = $(e.target);
	               if(!$target.data('editable')) {
	                   //if delegated element initially empty, we need to clear it's text (that was manually set to `empty` by user)
	                   //see https://github.com/vitalets/x-editable/issues/137 
	                   if($target.hasClass(this.options.emptyclass)) {
	                      $target.empty();
	                   }
	                   $target.editable(this.options).trigger(e);
	               }
	           }, this)); 
	        },
	        
	        /*
	        Renders value into element's text.
	        Can call custom display method from options.
	        Can return deferred object.
	        @method render()
	        @param {mixed} response server response (if exist) to pass into display function
	        */          
	        render: function(response) {
	            //do not display anything
	            if(this.options.display === false) {
	                return;
	            }
	            
	            //if input has `value2htmlFinal` method, we pass callback in third param to be called when source is loaded
	            if(this.input.value2htmlFinal) {
	                return this.input.value2html(this.value, this.$element[0], this.options.display, response); 
	            //if display method defined --> use it    
	            } else if(typeof this.options.display === 'function') {
	                return this.options.display.call(this.$element[0], this.value, response);
	            //else use input's original value2html() method    
	            } else {
	                return this.input.value2html(this.value, this.$element[0]); 
	            }
	        },
	        
	        /**
	        Enables editable
	        @method enable()
	        **/          
	        enable: function() {
	            this.options.disabled = false;
	            this.$element.removeClass('editable-disabled');
	            this.handleEmpty(this.isEmpty);
	            if(this.options.toggle !== 'manual') {
	                if(this.$element.attr('tabindex') === '-1') {    
	                    this.$element.removeAttr('tabindex');                                
	                }
	            }
	        },
	        
	        /**
	        Disables editable
	        @method disable()
	        **/         
	        disable: function() {
	            this.options.disabled = true; 
	            this.hide();           
	            this.$element.addClass('editable-disabled');
	            this.handleEmpty(this.isEmpty);
	            //do not stop focus on this element
	            this.$element.attr('tabindex', -1);                
	        },
	        
	        /**
	        Toggles enabled / disabled state of editable element
	        @method toggleDisabled()
	        **/         
	        toggleDisabled: function() {
	            if(this.options.disabled) {
	                this.enable();
	            } else { 
	                this.disable(); 
	            }
	        },  
	        
	        /**
	        Sets new option
	        
	        @method option(key, value)
	        @param {string|object} key option name or object with several options
	        @param {mixed} value option new value
	        @example
	        $('.editable').editable('option', 'pk', 2);
	        **/          
	        option: function(key, value) {
	            //set option(s) by object
	            if(key && typeof key === 'object') {
	               $.each(key, $.proxy(function(k, v){
	                  this.option($.trim(k), v); 
	               }, this)); 
	               return;
	            }

	            //set option by string             
	            this.options[key] = value;                          
	            
	            //disabled
	            if(key === 'disabled') {
	               return value ? this.disable() : this.enable();
	            } 
	            
	            //value
	            if(key === 'value') {
	                this.setValue(value);
	            }
	            
	            //transfer new option to container! 
	            if(this.container) {
	                this.container.option(key, value);  
	            }
	             
	            //pass option to input directly (as it points to the same in form)
	            if(this.input.option) {
	                this.input.option(key, value);
	            }
	            
	        },              
	        
	        /*
	        * set emptytext if element is empty
	        */
	        handleEmpty: function (isEmpty) {
	            //do not handle empty if we do not display anything
	            if(this.options.display === false) {
	                return;
	            }

	            /* 
	            isEmpty may be set directly as param of method.
	            It is required when we enable/disable field and can't rely on content 
	            as node content is text: "Empty" that is not empty %)
	            */
	            if(isEmpty !== undefined) { 
	                this.isEmpty = isEmpty;
	            } else {
	                //detect empty
	                //for some inputs we need more smart check
	                //e.g. wysihtml5 may have <br>, <p></p>, <img>
	                if(typeof(this.input.isEmpty) === 'function') {
	                    this.isEmpty = this.input.isEmpty(this.$element);                    
	                } else {
	                    this.isEmpty = $.trim(this.$element.html()) === '';
	                }
	            }           
	            
	            //emptytext shown only for enabled
	            if(!this.options.disabled) {
	                if (this.isEmpty) {
	                    this.$element.html(this.options.emptytext);
	                    if(this.options.emptyclass) {
	                        this.$element.addClass(this.options.emptyclass);
	                    }
	                } else if(this.options.emptyclass) {
	                    this.$element.removeClass(this.options.emptyclass);
	                }
	            } else {
	                //below required if element disable property was changed
	                if(this.isEmpty) {
	                    this.$element.empty();
	                    if(this.options.emptyclass) {
	                        this.$element.removeClass(this.options.emptyclass);
	                    }
	                }
	            }
	        },        
	        
	        /**
	        Shows container with form
	        @method show()
	        @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
	        **/  
	        show: function (closeAll) {
	            if(this.options.disabled) {
	                return;
	            }
	            
	            //init editableContainer: popover, tooltip, inline, etc..
	            if(!this.container) {
	                var containerOptions = $.extend({}, this.options, {
	                    value: this.value,
	                    input: this.input //pass input to form (as it is already created)
	                });
	                this.$element.editableContainer(containerOptions);
	                //listen `save` event 
	                this.$element.on("save.internal", $.proxy(this.save, this));
	                this.container = this.$element.data('editableContainer'); 
	            } else if(this.container.tip().is(':visible')) {
	                return;
	            }      
	            
	            //show container
	            this.container.show(closeAll);
	        },
	        
	        /**
	        Hides container with form
	        @method hide()
	        **/       
	        hide: function () {   
	            if(this.container) {  
	                this.container.hide();
	            }
	        },
	        
	        /**
	        Toggles container visibility (show / hide)
	        @method toggle()
	        @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
	        **/  
	        toggle: function(closeAll) {
	            if(this.container && this.container.tip().is(':visible')) {
	                this.hide();
	            } else {
	                this.show(closeAll);
	            }
	        },
	        
	        /*
	        * called when form was submitted
	        */          
	        save: function(e, params) {
	            //mark element with unsaved class if needed
	            if(this.options.unsavedclass) {
	                /*
	                 Add unsaved css to element if:
	                  - url is not user's function 
	                  - value was not sent to server
	                  - params.response === undefined, that means data was not sent
	                  - value changed 
	                */
	                var sent = false;
	                sent = sent || typeof this.options.url === 'function';
	                sent = sent || this.options.display === false; 
	                sent = sent || params.response !== undefined; 
	                sent = sent || (this.options.savenochange && this.input.value2str(this.value) !== this.input.value2str(params.newValue)); 
	                
	                if(sent) {
	                    this.$element.removeClass(this.options.unsavedclass); 
	                } else {
	                    this.$element.addClass(this.options.unsavedclass);                    
	                }
	            }
	            
	            //highlight when saving
	            if(this.options.highlight) {
	                var $e = this.$element,
	                    bgColor = $e.css('background-color');
	                    
	                $e.css('background-color', this.options.highlight);
	                setTimeout(function(){
	                    if(bgColor === 'transparent') {
	                        bgColor = ''; 
	                    }
	                    $e.css('background-color', bgColor);
	                    $e.addClass('editable-bg-transition');
	                    setTimeout(function(){
	                       $e.removeClass('editable-bg-transition');  
	                    }, 1700);
	                }, 10);
	            }
	            
	            //set new value
	            this.setValue(params.newValue, false, params.response);
	            
	            /**        
	            Fired when new value was submitted. You can use <code>$(this).data('editable')</code> to access to editable instance
	            
	            @event save 
	            @param {Object} event event object
	            @param {Object} params additional params
	            @param {mixed} params.newValue submitted value
	            @param {Object} params.response ajax response
	            @example
	            $('#username').on('save', function(e, params) {
	                alert('Saved value: ' + params.newValue);
	            });
	            **/
	            //event itself is triggered by editableContainer. Description here is only for documentation              
	        },

	        validate: function () {
	            if (typeof this.options.validate === 'function') {
	                return this.options.validate.call(this, this.value);
	            }
	        },
	        
	        /**
	        Sets new value of editable
	        @method setValue(value, convertStr)
	        @param {mixed} value new value 
	        @param {boolean} convertStr whether to convert value from string to internal format
	        **/         
	        setValue: function(value, convertStr, response) {
	            if(convertStr) {
	                this.value = this.input.str2value(value);
	            } else {
	                this.value = value;
	            }
	            if(this.container) {
	                this.container.option('value', this.value);
	            }
	            $.when(this.render(response))
	            .then($.proxy(function() {
	                this.handleEmpty();
	            }, this));
	        },
	        
	        /**
	        Activates input of visible container (e.g. set focus)
	        @method activate()
	        **/         
	        activate: function() {
	            if(this.container) {
	               this.container.activate(); 
	            }
	        },
	        
	        /**
	        Removes editable feature from element
	        @method destroy()
	        **/        
	        destroy: function() {
	            this.disable();
	            
	            if(this.container) {
	               this.container.destroy(); 
	            }
	            
	            this.input.destroy();

	            if(this.options.toggle !== 'manual') {
	                this.$element.removeClass('editable-click');
	                this.$element.off(this.options.toggle + '.editable');
	            } 
	            
	            this.$element.off("save.internal");
	            
	            this.$element.removeClass('editable editable-open editable-disabled');
	            this.$element.removeData('editable');
	        }        
	    };

	    /* EDITABLE PLUGIN DEFINITION
	    * ======================= */

	    /**
	    jQuery method to initialize editable element.
	    
	    @method $().editable(options)
	    @params {Object} options
	    @example
	    $('#username').editable({
	        type: 'text',
	        url: '/post',
	        pk: 1
	    });
	    **/
	    $.fn.editable = function (option) {
	        //special API methods returning non-jquery object
	        var result = {}, args = arguments, datakey = 'editable';
	        switch (option) {
	            /**
	            Runs client-side validation for all matched editables
	            
	            @method validate()
	            @returns {Object} validation errors map
	            @example
	            $('#username, #fullname').editable('validate');
	            // possible result:
	            {
	              username: "username is required",
	              fullname: "fullname should be minimum 3 letters length"
	            }
	            **/
	            case 'validate':
	                this.each(function () {
	                    var $this = $(this), data = $this.data(datakey), error;
	                    if (data && (error = data.validate())) {
	                        result[data.options.name] = error;
	                    }
	                });
	            return result;

	            /**
	            Returns current values of editable elements.   
	            Note that it returns an **object** with name-value pairs, not a value itself. It allows to get data from several elements.    
	            If value of some editable is `null` or `undefined` it is excluded from result object.
	            When param `isSingle` is set to **true** - it is supposed you have single element and will return value of editable instead of object.   
	             
	            @method getValue()
	            @param {bool} isSingle whether to return just value of single element
	            @returns {Object} object of element names and values
	            @example
	            $('#username, #fullname').editable('getValue');
	            //result:
	            {
	            username: "superuser",
	            fullname: "John"
	            }
	            //isSingle = true
	            $('#username').editable('getValue', true);
	            //result "superuser" 
	            **/
	            case 'getValue':
	                if(arguments.length === 2 && arguments[1] === true) { //isSingle = true
	                    result = this.eq(0).data(datakey).value;
	                } else {
	                    this.each(function () {
	                        var $this = $(this), data = $this.data(datakey);
	                        if (data && data.value !== undefined && data.value !== null) {
	                            result[data.options.name] = data.input.value2submit(data.value);
	                        }
	                    });
	                }
	            return result;

	            /**
	            This method collects values from several editable elements and submit them all to server.   
	            Internally it runs client-side validation for all fields and submits only in case of success.  
	            See <a href="#newrecord">creating new records</a> for details.  
	            Since 1.5.1 `submit` can be applied to single element to send data programmatically. In that case
	            `url`, `success` and `error` is taken from initial options and you can just call `$('#username').editable('submit')`. 
	            
	            @method submit(options)
	            @param {object} options 
	            @param {object} options.url url to submit data 
	            @param {object} options.data additional data to submit
	            @param {object} options.ajaxOptions additional ajax options
	            @param {function} options.error(obj) error handler 
	            @param {function} options.success(obj,config) success handler
	            @returns {Object} jQuery object
	            **/
	            case 'submit':  //collects value, validate and submit to server for creating new record
	                var config = arguments[1] || {},
	                $elems = this,
	                errors = this.editable('validate');

	                // validation ok
	                if($.isEmptyObject(errors)) {
	                    var ajaxOptions = {};
	                                                      
	                    // for single element use url, success etc from options
	                    if($elems.length === 1) {
	                        var editable = $elems.data('editable');
	                        //standard params
	                        var params = {
	                            name: editable.options.name || '',
	                            value: editable.input.value2submit(editable.value),
	                            pk: (typeof editable.options.pk === 'function') ? 
	                                editable.options.pk.call(editable.options.scope) : 
	                                editable.options.pk 
	                        };

	                        //additional params
	                        if(typeof editable.options.params === 'function') {
	                            params = editable.options.params.call(editable.options.scope, params);  
	                        } else {
	                            //try parse json in single quotes (from data-params attribute)
	                            editable.options.params = $.fn.editableutils.tryParseJson(editable.options.params, true);   
	                            $.extend(params, editable.options.params);
	                        }

	                        ajaxOptions = {
	                            url: editable.options.url,
	                            data: params,
	                            type: 'POST'  
	                        };
	                        
	                        // use success / error from options 
	                        config.success = config.success || editable.options.success;
	                        config.error = config.error || editable.options.error;
	                        
	                    // multiple elements
	                    } else {
	                        var values = this.editable('getValue'); 
	                        
	                        ajaxOptions = {
	                            url: config.url,
	                            data: values, 
	                            type: 'POST'
	                        };                        
	                    }                    

	                    // ajax success callabck (response 200 OK)
	                    ajaxOptions.success = typeof config.success === 'function' ? function(response) {
	                            config.success.call($elems, response, config);
	                        } : $.noop;
	                                  
	                    // ajax error callabck
	                    ajaxOptions.error = typeof config.error === 'function' ? function() {
	                             config.error.apply($elems, arguments);
	                        } : $.noop;
	                       
	                    // extend ajaxOptions    
	                    if(config.ajaxOptions) { 
	                        $.extend(ajaxOptions, config.ajaxOptions);
	                    }
	                    
	                    // extra data 
	                    if(config.data) {
	                        $.extend(ajaxOptions.data, config.data);
	                    }                     
	                    
	                    // perform ajax request
	                    $.ajax(ajaxOptions);
	                } else { //client-side validation error
	                    if(typeof config.error === 'function') {
	                        config.error.call($elems, errors);
	                    }
	                }
	            return this;
	        }

	        //return jquery object
	        return this.each(function () {
	            var $this = $(this), 
	                data = $this.data(datakey), 
	                options = typeof option === 'object' && option;

	            //for delegated targets do not store `editable` object for element
	            //it's allows several different selectors.
	            //see: https://github.com/vitalets/x-editable/issues/312    
	            if(options && options.selector) {
	                data = new Editable(this, options);
	                return; 
	            }    
	            
	            if (!data) {
	                $this.data(datakey, (data = new Editable(this, options)));
	            }

	            if (typeof option === 'string') { //call method 
	                data[option].apply(data, Array.prototype.slice.call(args, 1));
	            } 
	        });
	    };    
	            

	    $.fn.editable.defaults = {
	        /**
	        Type of input. Can be <code>text|textarea|select|date|checklist</code> and more

	        @property type 
	        @type string
	        @default 'text'
	        **/
	        type: 'text',        
	        /**
	        Sets disabled state of editable

	        @property disabled 
	        @type boolean
	        @default false
	        **/         
	        disabled: false,
	        /**
	        How to toggle editable. Can be <code>click|dblclick|mouseenter|manual</code>.   
	        When set to <code>manual</code> you should manually call <code>show/hide</code> methods of editable.    
	        **Note**: if you call <code>show</code> or <code>toggle</code> inside **click** handler of some DOM element, 
	        you need to apply <code>e.stopPropagation()</code> because containers are being closed on any click on document.
	        
	        @example
	        $('#edit-button').click(function(e) {
	            e.stopPropagation();
	            $('#username').editable('toggle');
	        });

	        @property toggle 
	        @type string
	        @default 'click'
	        **/          
	        toggle: 'click',
	        /**
	        Text shown when element is empty.

	        @property emptytext 
	        @type string
	        @default 'Empty'
	        **/         
	        emptytext: 'Empty',
	        /**
	        Allows to automatically set element's text based on it's value. Can be <code>auto|always|never</code>. Useful for select and date.
	        For example, if dropdown list is <code>{1: 'a', 2: 'b'}</code> and element's value set to <code>1</code>, it's html will be automatically set to <code>'a'</code>.  
	        <code>auto</code> - text will be automatically set only if element is empty.  
	        <code>always|never</code> - always(never) try to set element's text.

	        @property autotext 
	        @type string
	        @default 'auto'
	        **/          
	        autotext: 'auto', 
	        /**
	        Initial value of input. If not set, taken from element's text.  
	        Note, that if element's text is empty - text is automatically generated from value and can be customized (see `autotext` option).  
	        For example, to display currency sign:
	        @example
	        <a id="price" data-type="text" data-value="100"></a>
	        <script>
	        $('#price').editable({
	            ...
	            display: function(value) {
	              $(this).text(value + '$');
	            } 
	        }) 
	        </script>
	                
	        @property value 
	        @type mixed
	        @default element's text
	        **/
	        value: null,
	        /**
	        Callback to perform custom displaying of value in element's text.  
	        If `null`, default input's display used.  
	        If `false`, no displaying methods will be called, element's text will never change.  
	        Runs under element's scope.  
	        _**Parameters:**_  
	        
	        * `value` current value to be displayed
	        * `response` server response (if display called after ajax submit), since 1.4.0
	         
	        For _inputs with source_ (select, checklist) parameters are different:  
	          
	        * `value` current value to be displayed
	        * `sourceData` array of items for current input (e.g. dropdown items) 
	        * `response` server response (if display called after ajax submit), since 1.4.0
	                  
	        To get currently selected items use `$.fn.editableutils.itemsByValue(value, sourceData)`.
	        
	        @property display 
	        @type function|boolean
	        @default null
	        @since 1.2.0
	        @example
	        display: function(value, sourceData) {
	           //display checklist as comma-separated values
	           var html = [],
	               checked = $.fn.editableutils.itemsByValue(value, sourceData);
	               
	           if(checked.length) {
	               $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
	               $(this).html(html.join(', '));
	           } else {
	               $(this).empty(); 
	           }
	        }
	        **/          
	        display: null,
	        /**
	        Css class applied when editable text is empty.

	        @property emptyclass 
	        @type string
	        @since 1.4.1        
	        @default editable-empty
	        **/        
	        emptyclass: 'editable-empty',
	        /**
	        Css class applied when value was stored but not sent to server (`pk` is empty or `send = 'never'`).  
	        You may set it to `null` if you work with editables locally and submit them together.  

	        @property unsavedclass 
	        @type string
	        @since 1.4.1        
	        @default editable-unsaved
	        **/        
	        unsavedclass: 'editable-unsaved',
	        /**
	        If selector is provided, editable will be delegated to the specified targets.  
	        Usefull for dynamically generated DOM elements.  
	        **Please note**, that delegated targets can't be initialized with `emptytext` and `autotext` options, 
	        as they actually become editable only after first click.  
	        You should manually set class `editable-click` to these elements.  
	        Also, if element originally empty you should add class `editable-empty`, set `data-value=""` and write emptytext into element:

	        @property selector 
	        @type string
	        @since 1.4.1        
	        @default null
	        @example
	        <div id="user">
	          <!-- empty -->
	          <a href="#" data-name="username" data-type="text" class="editable-click editable-empty" data-value="" title="Username">Empty</a>
	          <!-- non-empty -->
	          <a href="#" data-name="group" data-type="select" data-source="/groups" data-value="1" class="editable-click" title="Group">Operator</a>
	        </div>     
	        
	        <script>
	        $('#user').editable({
	            selector: 'a',
	            url: '/post',
	            pk: 1
	        });
	        </script>
	        **/         
	        selector: null,
	        /**
	        Color used to highlight element after update. Implemented via CSS3 transition, works in modern browsers.
	        
	        @property highlight 
	        @type string|boolean
	        @since 1.4.5        
	        @default #FFFF80 
	        **/
	        highlight: '#FFFF80'
	    };
	    
	}(__webpack_provided_window_dot_jQuery));

	/**
	AbstractInput - base class for all editable inputs.
	It defines interface to be implemented by any input type.
	To create your own input you can inherit from this class.

	@class abstractinput
	**/
	(function ($) {
	    "use strict";

	    //types
	    $.fn.editabletypes = {};

	    var AbstractInput = function () { };

	    AbstractInput.prototype = {
	       /**
	        Initializes input

	        @method init() 
	        **/
	       init: function(type, options, defaults) {
	           this.type = type;
	           this.options = $.extend({}, defaults, options);
	       },

	       /*
	       this method called before render to init $tpl that is inserted in DOM
	       */
	       prerender: function() {
	           this.$tpl = $(this.options.tpl); //whole tpl as jquery object    
	           this.$input = this.$tpl;         //control itself, can be changed in render method
	           this.$clear = null;              //clear button
	           this.error = null;               //error message, if input cannot be rendered           
	       },
	       
	       /**
	        Renders input from tpl. Can return jQuery deferred object.
	        Can be overwritten in child objects

	        @method render()
	       **/
	       render: function() {

	       }, 

	       /**
	        Sets element's html by value. 

	        @method value2html(value, element)
	        @param {mixed} value
	        @param {DOMElement} element
	       **/
	       value2html: function(value, element) {
	           $(element)[this.options.escape ? 'text' : 'html']($.trim(value));
	       },

	       /**
	        Converts element's html to value

	        @method html2value(html)
	        @param {string} html
	        @returns {mixed}
	       **/
	       html2value: function(html) {
	           return $('<div>').html(html).text();
	       },

	       /**
	        Converts value to string (for internal compare). For submitting to server used value2submit().

	        @method value2str(value) 
	        @param {mixed} value
	        @returns {string}
	       **/
	       value2str: function(value) {
	           return value;
	       }, 

	       /**
	        Converts string received from server into value. Usually from `data-value` attribute.

	        @method str2value(str)
	        @param {string} str
	        @returns {mixed}
	       **/
	       str2value: function(str) {
	           return str;
	       }, 
	       
	       /**
	        Converts value for submitting to server. Result can be string or object.

	        @method value2submit(value) 
	        @param {mixed} value
	        @returns {mixed}
	       **/
	       value2submit: function(value) {
	           return value;
	       },

	       /**
	        Sets value of input.

	        @method value2input(value) 
	        @param {mixed} value
	       **/
	       value2input: function(value) {
	           this.$input.val(value);
	       },

	       /**
	        Returns value of input. Value can be object (e.g. datepicker)

	        @method input2value() 
	       **/
	       input2value: function() { 
	           return this.$input.val();
	       }, 

	       /**
	        Activates input. For text it sets focus.

	        @method activate() 
	       **/
	       activate: function() {
	           if(this.$input.is(':visible')) {
	               this.$input.focus();
	           }
	       },

	       /**
	        Creates input.

	        @method clear() 
	       **/        
	       clear: function() {
	           this.$input.val(null);
	       },

	       /**
	        method to escape html.
	       **/
	       escape: function(str) {
	           return $('<div>').text(str).html();
	       },
	       
	       /**
	        attach handler to automatically submit form when value changed (useful when buttons not shown)
	       **/
	       autosubmit: function() {
	        
	       },
	       
	       /**
	       Additional actions when destroying element 
	       **/
	       destroy: function() {
	       },

	       // -------- helper functions --------
	       setClass: function() {          
	           if(this.options.inputclass) {
	               this.$input.addClass(this.options.inputclass); 
	           } 
	       },

	       setAttr: function(attr) {
	           if (this.options[attr] !== undefined && this.options[attr] !== null) {
	               this.$input.attr(attr, this.options[attr]);
	           } 
	       },
	       
	       option: function(key, value) {
	            this.options[key] = value;
	       }
	       
	    };
	        
	    AbstractInput.defaults = {  
	        /**
	        HTML template of input. Normally you should not change it.

	        @property tpl 
	        @type string
	        @default ''
	        **/   
	        tpl: '',
	        /**
	        CSS class automatically applied to input
	        
	        @property inputclass 
	        @type string
	        @default null
	        **/         
	        inputclass: null,
	        
	        /**
	        If `true` - html will be escaped in content of element via $.text() method.  
	        If `false` - html will not be escaped, $.html() used.  
	        When you use own `display` function, this option obviosly has no effect.
	        
	        @property escape 
	        @type boolean
	        @since 1.5.0
	        @default true
	        **/         
	        escape: true,
	                
	        //scope for external methods (e.g. source defined as function)
	        //for internal use only
	        scope: null,
	        
	        //need to re-declare showbuttons here to get it's value from common config (passed only options existing in defaults)
	        showbuttons: true 
	    };
	    
	    $.extend($.fn.editabletypes, {abstractinput: AbstractInput});
	        
	}(__webpack_provided_window_dot_jQuery));

	/**
	List - abstract class for inputs that have source option loaded from js array or via ajax

	@class list
	@extends abstractinput
	**/
	(function ($) {
	    "use strict";
	    
	    var List = function (options) {
	       
	    };

	    $.fn.editableutils.inherit(List, $.fn.editabletypes.abstractinput);

	    $.extend(List.prototype, {
	        render: function () {
	            var deferred = $.Deferred();

	            this.error = null;
	            this.onSourceReady(function () {
	                this.renderList();
	                deferred.resolve();
	            }, function () {
	                this.error = this.options.sourceError;
	                deferred.resolve();
	            });

	            return deferred.promise();
	        },

	        html2value: function (html) {
	            return null; //can't set value by text
	        },
	        
	        value2html: function (value, element, display, response) {
	            var deferred = $.Deferred(),
	                success = function () {
	                    if(typeof display === 'function') {
	                        //custom display method
	                        display.call(element, value, this.sourceData, response); 
	                    } else {
	                        this.value2htmlFinal(value, element);
	                    }
	                    deferred.resolve();
	               };
	            
	            //for null value just call success without loading source
	            if(value === null) {
	               success.call(this);   
	            } else {
	               this.onSourceReady(success, function () { deferred.resolve(); });
	            }

	            return deferred.promise();
	        },  

	        // ------------- additional functions ------------

	        onSourceReady: function (success, error) {
	            //run source if it function
	            var source;
	            if ($.isFunction(this.options.source)) {
	                source = this.options.source.call(this.options.scope);
	                this.sourceData = null;
	                //note: if function returns the same source as URL - sourceData will be taken from cahce and no extra request performed
	            } else {
	                source = this.options.source;
	            }            
	            
	            //if allready loaded just call success
	            if(this.options.sourceCache && $.isArray(this.sourceData)) {
	                success.call(this);
	                return; 
	            }

	            //try parse json in single quotes (for double quotes jquery does automatically)
	            try {
	                source = $.fn.editableutils.tryParseJson(source, false);
	            } catch (e) {
	                error.call(this);
	                return;
	            }

	            //loading from url
	            if (typeof source === 'string') {
	                //try to get sourceData from cache
	                if(this.options.sourceCache) {
	                    var cacheID = source,
	                    cache;

	                    if (!$(document).data(cacheID)) {
	                        $(document).data(cacheID, {});
	                    }
	                    cache = $(document).data(cacheID);

	                    //check for cached data
	                    if (cache.loading === false && cache.sourceData) { //take source from cache
	                        this.sourceData = cache.sourceData;
	                        this.doPrepend();
	                        success.call(this);
	                        return;
	                    } else if (cache.loading === true) { //cache is loading, put callback in stack to be called later
	                        cache.callbacks.push($.proxy(function () {
	                            this.sourceData = cache.sourceData;
	                            this.doPrepend();
	                            success.call(this);
	                        }, this));

	                        //also collecting error callbacks
	                        cache.err_callbacks.push($.proxy(error, this));
	                        return;
	                    } else { //no cache yet, activate it
	                        cache.loading = true;
	                        cache.callbacks = [];
	                        cache.err_callbacks = [];
	                    }
	                }
	                
	                //ajaxOptions for source. Can be overwritten bt options.sourceOptions
	                var ajaxOptions = $.extend({
	                    url: source,
	                    type: 'get',
	                    cache: false,
	                    dataType: 'json',
	                    success: $.proxy(function (data) {
	                        if(cache) {
	                            cache.loading = false;
	                        }
	                        this.sourceData = this.makeArray(data);
	                        if($.isArray(this.sourceData)) {
	                            if(cache) {
	                                //store result in cache
	                                cache.sourceData = this.sourceData;
	                                //run success callbacks for other fields waiting for this source
	                                $.each(cache.callbacks, function () { this.call(); }); 
	                            }
	                            this.doPrepend();
	                            success.call(this);
	                        } else {
	                            error.call(this);
	                            if(cache) {
	                                //run error callbacks for other fields waiting for this source
	                                $.each(cache.err_callbacks, function () { this.call(); }); 
	                            }
	                        }
	                    }, this),
	                    error: $.proxy(function () {
	                        error.call(this);
	                        if(cache) {
	                             cache.loading = false;
	                             //run error callbacks for other fields
	                             $.each(cache.err_callbacks, function () { this.call(); }); 
	                        }
	                    }, this)
	                }, this.options.sourceOptions);
	                
	                //loading sourceData from server
	                $.ajax(ajaxOptions);
	                
	            } else { //options as json/array
	                this.sourceData = this.makeArray(source);
	                    
	                if($.isArray(this.sourceData)) {
	                    this.doPrepend();
	                    success.call(this);   
	                } else {
	                    error.call(this);
	                }
	            }
	        },

	        doPrepend: function () {
	            if(this.options.prepend === null || this.options.prepend === undefined) {
	                return;  
	            }
	            
	            if(!$.isArray(this.prependData)) {
	                //run prepend if it is function (once)
	                if ($.isFunction(this.options.prepend)) {
	                    this.options.prepend = this.options.prepend.call(this.options.scope);
	                }
	              
	                //try parse json in single quotes
	                this.options.prepend = $.fn.editableutils.tryParseJson(this.options.prepend, true);
	                
	                //convert prepend from string to object
	                if (typeof this.options.prepend === 'string') {
	                    this.options.prepend = {'': this.options.prepend};
	                }
	                
	                this.prependData = this.makeArray(this.options.prepend);
	            }

	            if($.isArray(this.prependData) && $.isArray(this.sourceData)) {
	                this.sourceData = this.prependData.concat(this.sourceData);
	            }
	        },

	        /*
	         renders input list
	        */
	        renderList: function() {
	            // this method should be overwritten in child class
	        },
	       
	         /*
	         set element's html by value
	        */
	        value2htmlFinal: function(value, element) {
	            // this method should be overwritten in child class
	        },        

	        /**
	        * convert data to array suitable for sourceData, e.g. [{value: 1, text: 'abc'}, {...}]
	        */
	        makeArray: function(data) {
	            var count, obj, result = [], item, iterateItem;
	            if(!data || typeof data === 'string') {
	                return null; 
	            }

	            if($.isArray(data)) { //array
	                /* 
	                   function to iterate inside item of array if item is object.
	                   Caclulates count of keys in item and store in obj. 
	                */
	                iterateItem = function (k, v) {
	                    obj = {value: k, text: v};
	                    if(count++ >= 2) {
	                        return false;// exit from `each` if item has more than one key.
	                    }
	                };
	            
	                for(var i = 0; i < data.length; i++) {
	                    item = data[i]; 
	                    if(typeof item === 'object') {
	                        count = 0; //count of keys inside item
	                        $.each(item, iterateItem);
	                        //case: [{val1: 'text1'}, {val2: 'text2} ...]
	                        if(count === 1) { 
	                            result.push(obj); 
	                            //case: [{value: 1, text: 'text1'}, {value: 2, text: 'text2'}, ...]
	                        } else if(count > 1) {
	                            //removed check of existance: item.hasOwnProperty('value') && item.hasOwnProperty('text')
	                            if(item.children) {
	                                item.children = this.makeArray(item.children);   
	                            }
	                            result.push(item);
	                        }
	                    } else {
	                        //case: ['text1', 'text2' ...]
	                        result.push({value: item, text: item}); 
	                    }
	                }
	            } else {  //case: {val1: 'text1', val2: 'text2, ...}
	                $.each(data, function (k, v) {
	                    result.push({value: k, text: v});
	                });  
	            }
	            return result;
	        },
	        
	        option: function(key, value) {
	            this.options[key] = value;
	            if(key === 'source') {
	                this.sourceData = null;
	            }
	            if(key === 'prepend') {
	                this.prependData = null;
	            }            
	        }        

	    });      

	    List.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        Source data for list.  
	        If **array** - it should be in format: `[{value: 1, text: "text1"}, {value: 2, text: "text2"}, ...]`  
	        For compability, object format is also supported: `{"1": "text1", "2": "text2" ...}` but it does not guarantee elements order.
	        
	        If **string** - considered ajax url to load items. In that case results will be cached for fields with the same source and name. See also `sourceCache` option.
	          
	        If **function**, it should return data in format above (since 1.4.0).
	        
	        Since 1.4.1 key `children` supported to render OPTGROUP (for **select** input only).  
	        `[{text: "group1", children: [{value: 1, text: "text1"}, {value: 2, text: "text2"}]}, ...]` 

			
	        @property source 
	        @type string | array | object | function
	        @default null
	        **/         
	        source: null, 
	        /**
	        Data automatically prepended to the beginning of dropdown list.
	        
	        @property prepend 
	        @type string | array | object | function
	        @default false
	        **/         
	        prepend: false,
	        /**
	        Error message when list cannot be loaded (e.g. ajax error)
	        
	        @property sourceError 
	        @type string
	        @default Error when loading list
	        **/          
	        sourceError: 'Error when loading list',
	        /**
	        if <code>true</code> and source is **string url** - results will be cached for fields with the same source.    
	        Usefull for editable column in grid to prevent extra requests.
	        
	        @property sourceCache 
	        @type boolean
	        @default true
	        @since 1.2.0
	        **/        
	        sourceCache: true,
	        /**
	        Additional ajax options to be used in $.ajax() when loading list from server.
	        Useful to send extra parameters (`data` key) or change request method (`type` key).
	        
	        @property sourceOptions 
	        @type object|function
	        @default null
	        @since 1.5.0
	        **/        
	        sourceOptions: null
	    });

	    $.fn.editabletypes.list = List;      

	}(__webpack_provided_window_dot_jQuery));

	/**
	Text input

	@class text
	@extends abstractinput
	@final
	@example
	<a href="#" id="username" data-type="text" data-pk="1">awesome</a>
	<script>
	$(function(){
	    $('#username').editable({
	        url: '/post',
	        title: 'Enter username'
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";
	    
	    var Text = function (options) {
	        this.init('text', options, Text.defaults);
	    };

	    $.fn.editableutils.inherit(Text, $.fn.editabletypes.abstractinput);

	    $.extend(Text.prototype, {
	        render: function() {
	           this.renderClear();
	           this.setClass();
	           this.setAttr('placeholder');
	        },
	        
	        activate: function() {
	            if(this.$input.is(':visible')) {
	                this.$input.focus();
	                $.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length);
	                if(this.toggleClear) {
	                    this.toggleClear();
	                }
	            }
	        },
	        
	        //render clear button
	        renderClear:  function() {
	           if (this.options.clear) {
	               this.$clear = $('<span class="editable-clear-x"></span>');
	               this.$input.after(this.$clear)
	                          .css('padding-right', 24)
	                          .keyup($.proxy(function(e) {
	                              //arrows, enter, tab, etc
	                              if(~$.inArray(e.keyCode, [40,38,9,13,27])) {
	                                return;
	                              }                            

	                              clearTimeout(this.t);
	                              var that = this;
	                              this.t = setTimeout(function() {
	                                that.toggleClear(e);
	                              }, 100);
	                              
	                          }, this))
	                          .parent().css('position', 'relative');
	                          
	               this.$clear.click($.proxy(this.clear, this));                       
	           }            
	        },
	        
	        postrender: function() {
	            /*
	            //now `clear` is positioned via css
	            if(this.$clear) {
	                //can position clear button only here, when form is shown and height can be calculated
	//                var h = this.$input.outerHeight(true) || 20,
	                var h = this.$clear.parent().height(),
	                    delta = (h - this.$clear.height()) / 2;
	                    
	                //this.$clear.css({bottom: delta, right: delta});
	            }
	            */ 
	        },
	        
	        //show / hide clear button
	        toggleClear: function(e) {
	            if(!this.$clear) {
	                return;
	            }
	            
	            var len = this.$input.val().length,
	                visible = this.$clear.is(':visible');
	                 
	            if(len && !visible) {
	                this.$clear.show();
	            } 
	            
	            if(!len && visible) {
	                this.$clear.hide();
	            } 
	        },
	        
	        clear: function() {
	           this.$clear.hide();
	           this.$input.val('').focus();
	        }          
	    });

	    Text.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        @property tpl 
	        @default <input type="text">
	        **/         
	        tpl: '<input type="text">',
	        /**
	        Placeholder attribute of input. Shown when input is empty.

	        @property placeholder 
	        @type string
	        @default null
	        **/             
	        placeholder: null,
	        
	        /**
	        Whether to show `clear` button 
	        
	        @property clear 
	        @type boolean
	        @default true        
	        **/
	        clear: true
	    });

	    $.fn.editabletypes.text = Text;

	}(__webpack_provided_window_dot_jQuery));

	/**
	Textarea input

	@class textarea
	@extends abstractinput
	@final
	@example
	<a href="#" id="comments" data-type="textarea" data-pk="1">awesome comment!</a>
	<script>
	$(function(){
	    $('#comments').editable({
	        url: '/post',
	        title: 'Enter comments',
	        rows: 10
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";
	    
	    var Textarea = function (options) {
	        this.init('textarea', options, Textarea.defaults);
	    };

	    $.fn.editableutils.inherit(Textarea, $.fn.editabletypes.abstractinput);

	    $.extend(Textarea.prototype, {
	        render: function () {
	            this.setClass();
	            this.setAttr('placeholder');
	            this.setAttr('rows');                        
	            
	            //ctrl + enter
	            this.$input.keydown(function (e) {
	                if (e.ctrlKey && e.which === 13) {
	                    $(this).closest('form').submit();
	                }
	            });
	        },
	        
	       //using `white-space: pre-wrap` solves \n  <--> BR conversion very elegant!
	       /* 
	       value2html: function(value, element) {
	            var html = '', lines;
	            if(value) {
	                lines = value.split("\n");
	                for (var i = 0; i < lines.length; i++) {
	                    lines[i] = $('<div>').text(lines[i]).html();
	                }
	                html = lines.join('<br>');
	            }
	            $(element).html(html);
	        },
	       
	        html2value: function(html) {
	            if(!html) {
	                return '';
	            }

	            var regex = new RegExp(String.fromCharCode(10), 'g');
	            var lines = html.split(/<br\s*\/?>/i);
	            for (var i = 0; i < lines.length; i++) {
	                var text = $('<div>').html(lines[i]).text();

	                // Remove newline characters (\n) to avoid them being converted by value2html() method
	                // thus adding extra <br> tags
	                text = text.replace(regex, '');

	                lines[i] = text;
	            }
	            return lines.join("\n");
	        },
	         */
	        activate: function() {
	            $.fn.editabletypes.text.prototype.activate.call(this);
	        }
	    });

	    Textarea.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        @property tpl
	        @default <textarea></textarea>
	        **/
	        tpl:'<textarea></textarea>',
	        /**
	        @property inputclass
	        @default input-large
	        **/
	        inputclass: 'input-large',
	        /**
	        Placeholder attribute of input. Shown when input is empty.

	        @property placeholder
	        @type string
	        @default null
	        **/
	        placeholder: null,
	        /**
	        Number of rows in textarea

	        @property rows
	        @type integer
	        @default 7
	        **/        
	        rows: 7        
	    });

	    $.fn.editabletypes.textarea = Textarea;

	}(__webpack_provided_window_dot_jQuery));

	/**
	Select (dropdown)

	@class select
	@extends list
	@final
	@example
	<a href="#" id="status" data-type="select" data-pk="1" data-url="/post" data-title="Select status"></a>
	<script>
	$(function(){
	    $('#status').editable({
	        value: 2,    
	        source: [
	              {value: 1, text: 'Active'},
	              {value: 2, text: 'Blocked'},
	              {value: 3, text: 'Deleted'}
	           ]
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";
	    
	    var Select = function (options) {
	        this.init('select', options, Select.defaults);
	    };

	    $.fn.editableutils.inherit(Select, $.fn.editabletypes.list);

	    $.extend(Select.prototype, {
	        renderList: function() {
	            this.$input.empty();

	            var fillItems = function($el, data) {
	                var attr;
	                if($.isArray(data)) {
	                    for(var i=0; i<data.length; i++) {
	                        attr = {};
	                        if(data[i].children) {
	                            attr.label = data[i].text;
	                            $el.append(fillItems($('<optgroup>', attr), data[i].children)); 
	                        } else {
	                            attr.value = data[i].value;
	                            if(data[i].disabled) {
	                                attr.disabled = true;
	                            }
	                            $el.append($('<option>', attr).text(data[i].text)); 
	                        }
	                    }
	                }
	                return $el;
	            };        

	            fillItems(this.$input, this.sourceData);
	            
	            this.setClass();
	            
	            //enter submit
	            this.$input.on('keydown.editable', function (e) {
	                if (e.which === 13) {
	                    $(this).closest('form').submit();
	                }
	            });            
	        },
	       
	        value2htmlFinal: function(value, element) {
	            var text = '', 
	                items = $.fn.editableutils.itemsByValue(value, this.sourceData);
	                
	            if(items.length) {
	                text = items[0].text;
	            }
	            
	            //$(element).text(text);
	            $.fn.editabletypes.abstractinput.prototype.value2html.call(this, text, element);
	        },
	        
	        autosubmit: function() {
	            this.$input.off('keydown.editable').on('change.editable', function(){
	                $(this).closest('form').submit();
	            });
	        }
	    });      

	    Select.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
	        /**
	        @property tpl 
	        @default <select></select>
	        **/         
	        tpl:'<select></select>'
	    });

	    $.fn.editabletypes.select = Select;      

	}(__webpack_provided_window_dot_jQuery));

	/**
	List of checkboxes. 
	Internally value stored as javascript array of values.

	@class checklist
	@extends list
	@final
	@example
	<a href="#" id="options" data-type="checklist" data-pk="1" data-url="/post" data-title="Select options"></a>
	<script>
	$(function(){
	    $('#options').editable({
	        value: [2, 3],    
	        source: [
	              {value: 1, text: 'option1'},
	              {value: 2, text: 'option2'},
	              {value: 3, text: 'option3'}
	           ]
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";
	    
	    var Checklist = function (options) {
	        this.init('checklist', options, Checklist.defaults);
	    };

	    $.fn.editableutils.inherit(Checklist, $.fn.editabletypes.list);

	    $.extend(Checklist.prototype, {
	        renderList: function() {
	            var $label, $div;
	            
	            this.$tpl.empty();
	            
	            if(!$.isArray(this.sourceData)) {
	                return;
	            }

	            for(var i=0; i<this.sourceData.length; i++) {
	                $label = $('<label>').append($('<input>', {
	                                           type: 'checkbox',
	                                           value: this.sourceData[i].value 
	                                     }))
	                                     .append($('<span>').text(' '+this.sourceData[i].text));
	                
	                $('<div>').append($label).appendTo(this.$tpl);
	            }
	            
	            this.$input = this.$tpl.find('input[type="checkbox"]');
	            this.setClass();
	        },
	       
	       value2str: function(value) {
	           return $.isArray(value) ? value.sort().join($.trim(this.options.separator)) : '';
	       },  
	       
	       //parse separated string
	        str2value: function(str) {
	           var reg, value = null;
	           if(typeof str === 'string' && str.length) {
	               reg = new RegExp('\\s*'+$.trim(this.options.separator)+'\\s*');
	               value = str.split(reg);
	           } else if($.isArray(str)) {
	               value = str; 
	           } else {
	               value = [str];
	           }
	           return value;
	        },       
	       
	       //set checked on required checkboxes
	       value2input: function(value) {
	            this.$input.prop('checked', false);
	            if($.isArray(value) && value.length) {
	               this.$input.each(function(i, el) {
	                   var $el = $(el);
	                   // cannot use $.inArray as it performs strict comparison
	                   $.each(value, function(j, val){
	                       /*jslint eqeq: true*/
	                       if($el.val() == val) {
	                       /*jslint eqeq: false*/                           
	                           $el.prop('checked', true);
	                       }
	                   });
	               }); 
	            }  
	        },  
	        
	       input2value: function() { 
	           var checked = [];
	           this.$input.filter(':checked').each(function(i, el) {
	               checked.push($(el).val());
	           });
	           return checked;
	       },            
	          
	       //collect text of checked boxes
	        value2htmlFinal: function(value, element) {
	           var html = [],
	               checked = $.fn.editableutils.itemsByValue(value, this.sourceData),
	               escape = this.options.escape;
	               
	           if(checked.length) {
	               $.each(checked, function(i, v) {
	                   var text = escape ? $.fn.editableutils.escape(v.text) : v.text; 
	                   html.push(text); 
	               });
	               $(element).html(html.join('<br>'));
	           } else {
	               $(element).empty(); 
	           }
	        },
	        
	       activate: function() {
	           this.$input.first().focus();
	       },
	       
	       autosubmit: function() {
	           this.$input.on('keydown', function(e){
	               if (e.which === 13) {
	                   $(this).closest('form').submit();
	               }
	           });
	       }
	    });      

	    Checklist.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
	        /**
	        @property tpl 
	        @default <div></div>
	        **/         
	        tpl:'<div class="editable-checklist"></div>',
	        
	        /**
	        @property inputclass 
	        @type string
	        @default null
	        **/         
	        inputclass: null,        
	        
	        /**
	        Separator of values when reading from `data-value` attribute

	        @property separator 
	        @type string
	        @default ','
	        **/         
	        separator: ','
	    });

	    $.fn.editabletypes.checklist = Checklist;      

	}(__webpack_provided_window_dot_jQuery));

	/**
	HTML5 input types.
	Following types are supported:

	* password
	* email
	* url
	* tel
	* number
	* range
	* time

	Learn more about html5 inputs:  
	http://www.w3.org/wiki/HTML5_form_additions  
	To check browser compatibility please see:  
	https://developer.mozilla.org/en-US/docs/HTML/Element/Input
	            
	@class html5types 
	@extends text
	@final
	@since 1.3.0
	@example
	<a href="#" id="email" data-type="email" data-pk="1">admin@example.com</a>
	<script>
	$(function(){
	    $('#email').editable({
	        url: '/post',
	        title: 'Enter email'
	    });
	});
	</script>
	**/

	/**
	@property tpl 
	@default depends on type
	**/ 

	/*
	Password
	*/
	(function ($) {
	    "use strict";
	    
	    var Password = function (options) {
	        this.init('password', options, Password.defaults);
	    };
	    $.fn.editableutils.inherit(Password, $.fn.editabletypes.text);
	    $.extend(Password.prototype, {
	       //do not display password, show '[hidden]' instead
	       value2html: function(value, element) {
	           if(value) {
	               $(element).text('[hidden]');
	           } else {
	               $(element).empty(); 
	           }
	       },
	       //as password not displayed, should not set value by html
	       html2value: function(html) {
	           return null;
	       }       
	    });    
	    Password.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
	        tpl: '<input type="password">'
	    });
	    $.fn.editabletypes.password = Password;
	}(__webpack_provided_window_dot_jQuery));


	/*
	Email
	*/
	(function ($) {
	    "use strict";
	    
	    var Email = function (options) {
	        this.init('email', options, Email.defaults);
	    };
	    $.fn.editableutils.inherit(Email, $.fn.editabletypes.text);
	    Email.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
	        tpl: '<input type="email">'
	    });
	    $.fn.editabletypes.email = Email;
	}(__webpack_provided_window_dot_jQuery));


	/*
	Url
	*/
	(function ($) {
	    "use strict";
	    
	    var Url = function (options) {
	        this.init('url', options, Url.defaults);
	    };
	    $.fn.editableutils.inherit(Url, $.fn.editabletypes.text);
	    Url.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
	        tpl: '<input type="url">'
	    });
	    $.fn.editabletypes.url = Url;
	}(__webpack_provided_window_dot_jQuery));


	/*
	Tel
	*/
	(function ($) {
	    "use strict";
	    
	    var Tel = function (options) {
	        this.init('tel', options, Tel.defaults);
	    };
	    $.fn.editableutils.inherit(Tel, $.fn.editabletypes.text);
	    Tel.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
	        tpl: '<input type="tel">'
	    });
	    $.fn.editabletypes.tel = Tel;
	}(__webpack_provided_window_dot_jQuery));


	/*
	Number
	*/
	(function ($) {
	    "use strict";
	    
	    var NumberInput = function (options) {
	        this.init('number', options, NumberInput.defaults);
	    };
	    $.fn.editableutils.inherit(NumberInput, $.fn.editabletypes.text);
	    $.extend(NumberInput.prototype, {
	         render: function () {
	            NumberInput.superclass.render.call(this);
	            this.setAttr('min');
	            this.setAttr('max');
	            this.setAttr('step');
	        },
	        postrender: function() {
	            if(this.$clear) {
	                //increase right ffset  for up/down arrows
	                this.$clear.css({right: 24});
	                /*
	                //can position clear button only here, when form is shown and height can be calculated
	                var h = this.$input.outerHeight(true) || 20,
	                    delta = (h - this.$clear.height()) / 2;
	                
	                //add 12px to offset right for up/down arrows    
	                this.$clear.css({top: delta, right: delta + 16});
	                */
	            } 
	        }        
	    });     
	    NumberInput.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
	        tpl: '<input type="number">',
	        inputclass: 'input-mini',
	        min: null,
	        max: null,
	        step: null
	    });
	    $.fn.editabletypes.number = NumberInput;
	}(__webpack_provided_window_dot_jQuery));


	/*
	Range (inherit from number)
	*/
	(function ($) {
	    "use strict";
	    
	    var Range = function (options) {
	        this.init('range', options, Range.defaults);
	    };
	    $.fn.editableutils.inherit(Range, $.fn.editabletypes.number);
	    $.extend(Range.prototype, {
	        render: function () {
	            this.$input = this.$tpl.filter('input');
	            
	            this.setClass();
	            this.setAttr('min');
	            this.setAttr('max');
	            this.setAttr('step');           
	            
	            this.$input.on('input', function(){
	                $(this).siblings('output').text($(this).val()); 
	            });  
	        },
	        activate: function() {
	            this.$input.focus();
	        }         
	    });
	    Range.defaults = $.extend({}, $.fn.editabletypes.number.defaults, {
	        tpl: '<input type="range"><output style="width: 30px; display: inline-block"></output>',
	        inputclass: 'input-medium'
	    });
	    $.fn.editabletypes.range = Range;
	}(__webpack_provided_window_dot_jQuery));

	/*
	Time
	*/
	(function ($) {
	    "use strict";

	    var Time = function (options) {
	        this.init('time', options, Time.defaults);
	    };
	    //inherit from abstract, as inheritance from text gives selection error.
	    $.fn.editableutils.inherit(Time, $.fn.editabletypes.abstractinput);
	    $.extend(Time.prototype, {
	        render: function() {
	           this.setClass();
	        }        
	    });
	    Time.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        tpl: '<input type="time">'
	    });
	    $.fn.editabletypes.time = Time;
	}(__webpack_provided_window_dot_jQuery));

	/**
	Select2 input. Based on amazing work of Igor Vaynberg https://github.com/ivaynberg/select2.  
	Please see [original select2 docs](http://ivaynberg.github.com/select2) for detailed description and options.  
	 
	You should manually download and include select2 distributive:  

	    <link href="select2/select2.css" rel="stylesheet" type="text/css"></link>  
	    <script src="select2/select2.js"></script>  
	    
	To make it **bootstrap-styled** you can use css from [here](https://github.com/t0m/select2-bootstrap-css): 

	    <link href="select2-bootstrap.css" rel="stylesheet" type="text/css"></link>    
	    
	**Note:** currently `autotext` feature does not work for select2 with `ajax` remote source.    
	You need initially put both `data-value` and element's text youself:    

	    <a href="#" data-type="select2" data-value="1">Text1</a>
	    
	    
	@class select2
	@extends abstractinput
	@since 1.4.1
	@final
	@example
	<a href="#" id="country" data-type="select2" data-pk="1" data-value="ru" data-url="/post" data-title="Select country"></a>
	<script>
	$(function(){
	    //local source
	    $('#country').editable({
	        source: [
	              {id: 'gb', text: 'Great Britain'},
	              {id: 'us', text: 'United States'},
	              {id: 'ru', text: 'Russia'}
	           ],
	        select2: {
	           multiple: true
	        }
	    });
	    //remote source (simple)
	    $('#country').editable({
	        source: '/getCountries',
	        select2: {
	            placeholder: 'Select Country',
	            minimumInputLength: 1
	        }
	    });
	    //remote source (advanced)
	    $('#country').editable({
	        select2: {
	            placeholder: 'Select Country',
	            allowClear: true,
	            minimumInputLength: 3,
	            id: function (item) {
	                return item.CountryId;
	            },
	            ajax: {
	                url: '/getCountries',
	                dataType: 'json',
	                data: function (term, page) {
	                    return { query: term };
	                },
	                results: function (data, page) {
	                    return { results: data };
	                }
	            },
	            formatResult: function (item) {
	                return item.CountryName;
	            },
	            formatSelection: function (item) {
	                return item.CountryName;
	            },
	            initSelection: function (element, callback) {
	                return $.get('/getCountryById', { query: element.val() }, function (data) {
	                    callback(data);
	                });
	            } 
	        }  
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";
	    
	    var Constructor = function (options) {
	        this.init('select2', options, Constructor.defaults);

	        options.select2 = options.select2 || {};

	        this.sourceData = null;
	        
	        //placeholder
	        if(options.placeholder) {
	            options.select2.placeholder = options.placeholder;
	        }
	       
	        //if not `tags` mode, use source
	        if(!options.select2.tags && options.source) {
	            var source = options.source;
	            //if source is function, call it (once!)
	            if ($.isFunction(options.source)) {
	                source = options.source.call(options.scope);
	            }               

	            if (typeof source === 'string') {
	                options.select2.ajax = options.select2.ajax || {};
	                //some default ajax params
	                if(!options.select2.ajax.data) {
	                    options.select2.ajax.data = function(term) {return { query:term };};
	                }
	                if(!options.select2.ajax.results) {
	                    options.select2.ajax.results = function(data) { return {results:data };};
	                }
	                options.select2.ajax.url = source;
	            } else {
	                //check format and convert x-editable format to select2 format (if needed)
	                this.sourceData = this.convertSource(source);
	                options.select2.data = this.sourceData;
	            }
	        } 

	        //overriding objects in config (as by default jQuery extend() is not recursive)
	        this.options.select2 = $.extend({}, Constructor.defaults.select2, options.select2);

	        //detect whether it is multi-valued
	        this.isMultiple = this.options.select2.tags || this.options.select2.multiple;
	        this.isRemote = ('ajax' in this.options.select2);

	        //store function returning ID of item
	        //should be here as used inautotext for local source
	        this.idFunc = this.options.select2.id;
	        if (typeof(this.idFunc) !== "function") {
	            var idKey = this.idFunc || 'id';
	            this.idFunc = function (e) { return e[idKey]; };
	        }

	        //store function that renders text in select2
	        this.formatSelection = this.options.select2.formatSelection;
	        if (typeof(this.formatSelection) !== "function") {
	            this.formatSelection = function (e) { return e.text; };
	        }
	    };

	    $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);

	    $.extend(Constructor.prototype, {
	        render: function() {
	            this.setClass();

	            //can not apply select2 here as it calls initSelection 
	            //over input that does not have correct value yet.
	            //apply select2 only in value2input
	            //this.$input.select2(this.options.select2);

	            //when data is loaded via ajax, we need to know when it's done to populate listData
	            if(this.isRemote) {
	                //listen to loaded event to populate data
	                this.$input.on('select2-loaded', $.proxy(function(e) {
	                    this.sourceData = e.items.results;
	                }, this));
	            }

	            //trigger resize of editableform to re-position container in multi-valued mode
	            if(this.isMultiple) {
	               this.$input.on('change', function() {
	                   $(this).closest('form').parent().triggerHandler('resize');
	               });
	            }
	       },

	       value2html: function(value, element) {
	           var text = '', data,
	               that = this;

	           if(this.options.select2.tags) { //in tags mode just assign value
	              data = value; 
	              //data = $.fn.editableutils.itemsByValue(value, this.options.select2.tags, this.idFunc);
	           } else if(this.sourceData) {
	              data = $.fn.editableutils.itemsByValue(value, this.sourceData, this.idFunc); 
	           } else {
	              //can not get list of possible values 
	              //(e.g. autotext for select2 with ajax source)
	           }

	           //data may be array (when multiple values allowed)
	           if($.isArray(data)) {
	               //collect selected data and show with separator
	               text = [];
	               $.each(data, function(k, v){
	                   text.push(v && typeof v === 'object' ? that.formatSelection(v) : v);
	               });
	           } else if(data) {
	               text = that.formatSelection(data);
	           }

	           text = $.isArray(text) ? text.join(this.options.viewseparator) : text;

	           //$(element).text(text);
	           Constructor.superclass.value2html.call(this, text, element); 
	       },

	       html2value: function(html) {
	           return this.options.select2.tags ? this.str2value(html, this.options.viewseparator) : null;
	       },

	       value2input: function(value) {
	           // if value array => join it anyway
	           if($.isArray(value)) {
	              value = value.join(this.getSeparator());
	           }

	           //for remote source just set value, text is updated by initSelection
	           if(!this.$input.data('select2')) {
	               this.$input.val(value);
	               this.$input.select2(this.options.select2);
	           } else {
	               //second argument needed to separate initial change from user's click (for autosubmit)   
	               this.$input.val(value).trigger('change', true); 

	               //Uncaught Error: cannot call val() if initSelection() is not defined
	               //this.$input.select2('val', value);
	           }

	           // if defined remote source AND no multiple mode AND no user's initSelection provided --> 
	           // we should somehow get text for provided id.
	           // The solution is to use element's text as text for that id (exclude empty)
	           if(this.isRemote && !this.isMultiple && !this.options.select2.initSelection) {
	               // customId and customText are methods to extract `id` and `text` from data object
	               // we can use this workaround only if user did not define these methods
	               // otherwise we cant construct data object
	               var customId = this.options.select2.id,
	                   customText = this.options.select2.formatSelection;

	               if(!customId && !customText) {
	                   var $el = $(this.options.scope);
	                   if (!$el.data('editable').isEmpty) {
	                       var data = {id: value, text: $el.text()};
	                       this.$input.select2('data', data); 
	                   }
	               }
	           }
	       },
	       
	       input2value: function() { 
	           return this.$input.select2('val');
	       },

	       str2value: function(str, separator) {
	            if(typeof str !== 'string' || !this.isMultiple) {
	                return str;
	            }

	            separator = separator || this.getSeparator();

	            var val, i, l;

	            if (str === null || str.length < 1) {
	                return null;
	            }
	            val = str.split(separator);
	            for (i = 0, l = val.length; i < l; i = i + 1) {
	                val[i] = $.trim(val[i]);
	            }

	            return val;
	       },

	        autosubmit: function() {
	            this.$input.on('change', function(e, isInitial){
	                if(!isInitial) {
	                  $(this).closest('form').submit();
	                }
	            });
	        },

	        getSeparator: function() {
	            return this.options.select2.separator || $.fn.select2.defaults.separator;
	        },

	        /*
	        Converts source from x-editable format: {value: 1, text: "1"} to
	        select2 format: {id: 1, text: "1"}
	        */
	        convertSource: function(source) {
	            if($.isArray(source) && source.length && source[0].value !== undefined) {
	                for(var i = 0; i<source.length; i++) {
	                    if(source[i].value !== undefined) {
	                        source[i].id = source[i].value;
	                        delete source[i].value;
	                    }
	                }
	            }
	            return source;
	        },
	        
	        destroy: function() {
	            if(this.$input.data('select2')) {
	                this.$input.select2('destroy');
	            }
	        }
	        
	    });

	    Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        @property tpl 
	        @default <input type="hidden">
	        **/
	        tpl:'<input type="hidden">',
	        /**
	        Configuration of select2. [Full list of options](http://ivaynberg.github.com/select2).

	        @property select2 
	        @type object
	        @default null
	        **/
	        select2: null,
	        /**
	        Placeholder attribute of select

	        @property placeholder 
	        @type string
	        @default null
	        **/
	        placeholder: null,
	        /**
	        Source data for select. It will be assigned to select2 `data` property and kept here just for convenience.
	        Please note, that format is different from simple `select` input: use 'id' instead of 'value'.
	        E.g. `[{id: 1, text: "text1"}, {id: 2, text: "text2"}, ...]`.

	        @property source 
	        @type array|string|function
	        @default null        
	        **/
	        source: null,
	        /**
	        Separator used to display tags.

	        @property viewseparator 
	        @type string
	        @default ', '        
	        **/
	        viewseparator: ', '
	    });

	    $.fn.editabletypes.select2 = Constructor;

	}(__webpack_provided_window_dot_jQuery));

	/**
	* Combodate - 1.0.5
	* Dropdown date and time picker.
	* Converts text input into dropdowns to pick day, month, year, hour, minute and second.
	* Uses momentjs as datetime library http://momentjs.com.
	* For i18n include corresponding file from https://github.com/timrwood/moment/tree/master/lang 
	*
	* Confusion at noon and midnight - see http://en.wikipedia.org/wiki/12-hour_clock#Confusion_at_noon_and_midnight
	* In combodate: 
	* 12:00 pm --> 12:00 (24-h format, midday)
	* 12:00 am --> 00:00 (24-h format, midnight, start of day)
	* 
	* Differs from momentjs parse rules:
	* 00:00 pm, 12:00 pm --> 12:00 (24-h format, day not change)
	* 00:00 am, 12:00 am --> 00:00 (24-h format, day not change)
	* 
	* 
	* Author: Vitaliy Potapov
	* Project page: http://github.com/vitalets/combodate
	* Copyright (c) 2012 Vitaliy Potapov. Released under MIT License.
	**/
	(function ($) {

	    var Combodate = function (element, options) {
	        this.$element = $(element);
	        if(!this.$element.is('input')) {
	            $.error('Combodate should be applied to INPUT element');
	            return;
	        }
	        this.options = $.extend({}, $.fn.combodate.defaults, options, this.$element.data());
	        this.init();  
	     };

	    Combodate.prototype = {
	        constructor: Combodate, 
	        init: function () {
	            this.map = {
	                //key   regexp    moment.method
	                day:    ['D',    'date'], 
	                month:  ['M',    'month'], 
	                year:   ['Y',    'year'], 
	                hour:   ['[Hh]', 'hours'],
	                minute: ['m',    'minutes'], 
	                second: ['s',    'seconds'],
	                ampm:   ['[Aa]', ''] 
	            };
	            
	            this.$widget = $('<span class="combodate"></span>').html(this.getTemplate());
	                      
	            this.initCombos();
	            
	            //update original input on change 
	            this.$widget.on('change', 'select', $.proxy(function(e) {
	                this.$element.val(this.getValue()).change();
	                // update days count if month or year changes
	                if (this.options.smartDays) {
	                    if ($(e.target).is('.month') || $(e.target).is('.year')) {
	                        this.fillCombo('day');
	                    }
	                }
	            }, this));
	            
	            this.$widget.find('select').css('width', 'auto');
	                                       
	            // hide original input and insert widget                                       
	            this.$element.hide().after(this.$widget);
	            
	            // set initial value
	            this.setValue(this.$element.val() || this.options.value);
	        },
	        
	        /*
	         Replace tokens in template with <select> elements 
	        */         
	        getTemplate: function() {
	            var tpl = this.options.template;

	            //first pass
	            $.each(this.map, function(k, v) {
	                v = v[0]; 
	                var r = new RegExp(v+'+'),
	                    token = v.length > 1 ? v.substring(1, 2) : v;
	                    
	                tpl = tpl.replace(r, '{'+token+'}');
	            });

	            //replace spaces with &nbsp;
	            tpl = tpl.replace(/ /g, '&nbsp;');

	            //second pass
	            $.each(this.map, function(k, v) {
	                v = v[0];
	                var token = v.length > 1 ? v.substring(1, 2) : v;
	                    
	                tpl = tpl.replace('{'+token+'}', '<select class="'+k+'"></select>');
	            });   

	            return tpl;
	        },
	        
	        /*
	         Initialize combos that presents in template 
	        */        
	        initCombos: function() {
	            for (var k in this.map) {
	                var $c = this.$widget.find('.'+k);
	                // set properties like this.$day, this.$month etc.
	                this['$'+k] = $c.length ? $c : null;
	                // fill with items
	                this.fillCombo(k);
	            }
	        },

	        /*
	         Fill combo with items 
	        */        
	        fillCombo: function(k) {
	            var $combo = this['$'+k];
	            if (!$combo) {
	                return;
	            }

	            // define method name to fill items, e.g `fillDays`
	            var f = 'fill' + k.charAt(0).toUpperCase() + k.slice(1); 
	            var items = this[f]();
	            var value = $combo.val();

	            $combo.empty();
	            for(var i=0; i<items.length; i++) {
	                $combo.append('<option value="'+items[i][0]+'">'+items[i][1]+'</option>');
	            }

	            $combo.val(value);
	        },

	        /*
	         Initialize items of combos. Handles `firstItem` option 
	        */
	        fillCommon: function(key) {
	            var values = [],
	                relTime;
	                
	            if(this.options.firstItem === 'name') {
	                //need both to support moment ver < 2 and  >= 2
	                relTime = moment.relativeTime || moment.langData()._relativeTime; 
	                var header = typeof relTime[key] === 'function' ? relTime[key](1, true, key, false) : relTime[key];
	                //take last entry (see momentjs lang files structure) 
	                header = header.split(' ').reverse()[0];                
	                values.push(['', header]);
	            } else if(this.options.firstItem === 'empty') {
	                values.push(['', '']);
	            }
	            return values;
	        },  


	        /*
	        fill day
	        */
	        fillDay: function() {
	            var items = this.fillCommon('d'), name, i,
	                twoDigit = this.options.template.indexOf('DD') !== -1,
	                daysCount = 31;

	            // detect days count (depends on month and year)
	            // originally https://github.com/vitalets/combodate/pull/7
	            if (this.options.smartDays && this.$month && this.$year) {
	                var month = parseInt(this.$month.val(), 10);
	                var year = parseInt(this.$year.val(), 10);

	                if (!isNaN(month) && !isNaN(year)) {
	                    daysCount = moment([year, month]).daysInMonth();
	                }
	            }

	            for (i = 1; i <= daysCount; i++) {
	                name = twoDigit ? this.leadZero(i) : i;
	                items.push([i, name]);
	            }
	            return items;        
	        },
	        
	        /*
	        fill month
	        */
	        fillMonth: function() {
	            var items = this.fillCommon('M'), name, i, 
	                longNames = this.options.template.indexOf('MMMM') !== -1,
	                shortNames = this.options.template.indexOf('MMM') !== -1,
	                twoDigit = this.options.template.indexOf('MM') !== -1;
	                
	            for(i=0; i<=11; i++) {
	                if(longNames) {
	                    //see https://github.com/timrwood/momentjs.com/pull/36
	                    name = moment().date(1).month(i).format('MMMM');
	                } else if(shortNames) {
	                    name = moment().date(1).month(i).format('MMM');
	                } else if(twoDigit) {
	                    name = this.leadZero(i+1);
	                } else {
	                    name = i+1;
	                }
	                items.push([i, name]);
	            } 
	            return items;
	        },  
	        
	        /*
	        fill year
	        */
	        fillYear: function() {
	            var items = [], name, i, 
	                longNames = this.options.template.indexOf('YYYY') !== -1;
	           
	            for(i=this.options.maxYear; i>=this.options.minYear; i--) {
	                name = longNames ? i : (i+'').substring(2);
	                items[this.options.yearDescending ? 'push' : 'unshift']([i, name]);
	            }
	            
	            items = this.fillCommon('y').concat(items);
	            
	            return items;              
	        },    
	        
	        /*
	        fill hour
	        */
	        fillHour: function() {
	            var items = this.fillCommon('h'), name, i,
	                h12 = this.options.template.indexOf('h') !== -1,
	                h24 = this.options.template.indexOf('H') !== -1,
	                twoDigit = this.options.template.toLowerCase().indexOf('hh') !== -1,
	                min = h12 ? 1 : 0, 
	                max = h12 ? 12 : 23;
	                
	            for(i=min; i<=max; i++) {
	                name = twoDigit ? this.leadZero(i) : i;
	                items.push([i, name]);
	            } 
	            return items;                 
	        },    
	        
	        /*
	        fill minute
	        */
	        fillMinute: function() {
	            var items = this.fillCommon('m'), name, i,
	                twoDigit = this.options.template.indexOf('mm') !== -1;

	            for(i=0; i<=59; i+= this.options.minuteStep) {
	                name = twoDigit ? this.leadZero(i) : i;
	                items.push([i, name]);
	            }    
	            return items;              
	        },  
	        
	        /*
	        fill second
	        */
	        fillSecond: function() {
	            var items = this.fillCommon('s'), name, i,
	                twoDigit = this.options.template.indexOf('ss') !== -1;

	            for(i=0; i<=59; i+= this.options.secondStep) {
	                name = twoDigit ? this.leadZero(i) : i;
	                items.push([i, name]);
	            }    
	            return items;              
	        },  
	        
	        /*
	        fill ampm
	        */
	        fillAmpm: function() {
	            var ampmL = this.options.template.indexOf('a') !== -1,
	                ampmU = this.options.template.indexOf('A') !== -1,            
	                items = [
	                    ['am', ampmL ? 'am' : 'AM'],
	                    ['pm', ampmL ? 'pm' : 'PM']
	                ];
	            return items;                              
	        },                                       

	        /*
	         Returns current date value from combos. 
	         If format not specified - `options.format` used.
	         If format = `null` - Moment object returned.
	        */
	        getValue: function(format) {
	            var dt, values = {}, 
	                that = this,
	                notSelected = false;
	                
	            //getting selected values    
	            $.each(this.map, function(k, v) {
	                if(k === 'ampm') {
	                    return;
	                }
	                var def = k === 'day' ? 1 : 0;
	                  
	                values[k] = that['$'+k] ? parseInt(that['$'+k].val(), 10) : def; 
	                
	                if(isNaN(values[k])) {
	                   notSelected = true;
	                   return false; 
	                }
	            });
	            
	            //if at least one visible combo not selected - return empty string
	            if(notSelected) {
	               return '';
	            }
	            
	            //convert hours 12h --> 24h 
	            if(this.$ampm) {
	                //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
	                if(values.hour === 12) {
	                    values.hour = this.$ampm.val() === 'am' ? 0 : 12;                    
	                } else {
	                    values.hour = this.$ampm.val() === 'am' ? values.hour : values.hour+12;
	                }
	            }    
	            
	            dt = moment([values.year, values.month, values.day, values.hour, values.minute, values.second]);
	            
	            //highlight invalid date
	            this.highlight(dt);
	                              
	            format = format === undefined ? this.options.format : format;
	            if(format === null) {
	               return dt.isValid() ? dt : null; 
	            } else {
	               return dt.isValid() ? dt.format(format) : ''; 
	            }           
	        },
	        
	        setValue: function(value) {
	            if(!value) {
	                return;
	            }
	            
	            var dt = typeof value === 'string' ? moment(value, this.options.format) : moment(value),
	                that = this,
	                values = {};
	            
	            //function to find nearest value in select options
	            function getNearest($select, value) {
	                var delta = {};
	                $select.children('option').each(function(i, opt){
	                    var optValue = $(opt).attr('value'),
	                    distance;

	                    if(optValue === '') return;
	                    distance = Math.abs(optValue - value); 
	                    if(typeof delta.distance === 'undefined' || distance < delta.distance) {
	                        delta = {value: optValue, distance: distance};
	                    } 
	                }); 
	                return delta.value;
	            }             
	            
	            if(dt.isValid()) {
	                //read values from date object
	                $.each(this.map, function(k, v) {
	                    if(k === 'ampm') {
	                       return; 
	                    }
	                    values[k] = dt[v[1]]();
	                });
	               
	                if(this.$ampm) {
	                    //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
	                    if(values.hour >= 12) {
	                        values.ampm = 'pm';
	                        if(values.hour > 12) {
	                            values.hour -= 12;
	                        }
	                    } else {
	                        values.ampm = 'am';
	                        if(values.hour === 0) {
	                            values.hour = 12;
	                        }
	                    } 
	                }
	               
	                $.each(values, function(k, v) {
	                    //call val() for each existing combo, e.g. this.$hour.val()
	                    if(that['$'+k]) {
	                       
	                        if(k === 'minute' && that.options.minuteStep > 1 && that.options.roundTime) {
	                           v = getNearest(that['$'+k], v);
	                        }
	                       
	                        if(k === 'second' && that.options.secondStep > 1 && that.options.roundTime) {
	                           v = getNearest(that['$'+k], v);
	                        }                       
	                       
	                        that['$'+k].val(v);
	                    }
	                });

	                // update days count
	                if (this.options.smartDays) {
	                    this.fillCombo('day');
	                }
	               
	               this.$element.val(dt.format(this.options.format)).change();
	            }
	        },
	        
	        /*
	         highlight combos if date is invalid
	        */
	        highlight: function(dt) {
	            if(!dt.isValid()) {
	                if(this.options.errorClass) {
	                    this.$widget.addClass(this.options.errorClass);
	                } else {
	                    //store original border color
	                    if(!this.borderColor) {
	                        this.borderColor = this.$widget.find('select').css('border-color'); 
	                    }
	                    this.$widget.find('select').css('border-color', 'red');
	                } 
	            } else {
	                if(this.options.errorClass) {
	                    this.$widget.removeClass(this.options.errorClass);
	                } else {
	                    this.$widget.find('select').css('border-color', this.borderColor);
	                }  
	            }
	        },
	        
	        leadZero: function(v) {
	            return v <= 9 ? '0' + v : v; 
	        },
	        
	        destroy: function() {
	            this.$widget.remove();
	            this.$element.removeData('combodate').show();
	        }
	        
	        //todo: clear method        
	    };

	    $.fn.combodate = function ( option ) {
	        var d, args = Array.apply(null, arguments);
	        args.shift();

	        //getValue returns date as string / object (not jQuery object)
	        if(option === 'getValue' && this.length && (d = this.eq(0).data('combodate'))) {
	          return d.getValue.apply(d, args);
	        }        
	        
	        return this.each(function () {
	            var $this = $(this),
	            data = $this.data('combodate'),
	            options = typeof option == 'object' && option;
	            if (!data) {
	                $this.data('combodate', (data = new Combodate(this, options)));
	            }
	            if (typeof option == 'string' && typeof data[option] == 'function') {
	                data[option].apply(data, args);
	            }
	        });
	    };  
	    
	    $.fn.combodate.defaults = {
	         //in this format value stored in original input
	        format: 'DD-MM-YYYY HH:mm',      
	        //in this format items in dropdowns are displayed
	        template: 'D / MMM / YYYY   H : mm',
	        //initial value, can be `new Date()`    
	        value: null,                       
	        minYear: 1970,
	        maxYear: new Date().getFullYear(),
	        yearDescending: true,
	        minuteStep: 5,
	        secondStep: 1,
	        firstItem: 'empty', //'name', 'empty', 'none'
	        errorClass: null,
	        roundTime: true, // whether to round minutes and seconds if step > 1
	        smartDays: false // whether days in combo depend on selected month: 31, 30, 28
	    };

	}(__webpack_provided_window_dot_jQuery));
	/**
	Combodate input - dropdown date and time picker.    
	Based on [combodate](http://vitalets.github.com/combodate) plugin (included). To use it you should manually include [momentjs](http://momentjs.com).

	    <script src="js/moment.min.js"></script>
	   
	Allows to input:

	* only date
	* only time 
	* both date and time  

	Please note, that format is taken from momentjs and **not compatible** with bootstrap-datepicker / jquery UI datepicker.  
	Internally value stored as `momentjs` object. 

	@class combodate
	@extends abstractinput
	@final
	@since 1.4.0
	@example
	<a href="#" id="dob" data-type="combodate" data-pk="1" data-url="/post" data-value="1984-05-15" data-title="Select date"></a>
	<script>
	$(function(){
	    $('#dob').editable({
	        format: 'YYYY-MM-DD',    
	        viewformat: 'DD.MM.YYYY',    
	        template: 'D / MMMM / YYYY',    
	        combodate: {
	                minYear: 2000,
	                maxYear: 2015,
	                minuteStep: 1
	           }
	        }
	    });
	});
	</script>
	**/

	/*global moment*/

	(function ($) {
	    "use strict";
	    
	    var Constructor = function (options) {
	        this.init('combodate', options, Constructor.defaults);
	        
	        //by default viewformat equals to format
	        if(!this.options.viewformat) {
	            this.options.viewformat = this.options.format;
	        }        
	        
	        //try parse combodate config defined as json string in data-combodate
	        options.combodate = $.fn.editableutils.tryParseJson(options.combodate, true);

	        //overriding combodate config (as by default jQuery extend() is not recursive)
	        this.options.combodate = $.extend({}, Constructor.defaults.combodate, options.combodate, {
	            format: this.options.format,
	            template: this.options.template
	        });
	    };

	    $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);    
	    
	    $.extend(Constructor.prototype, {
	        render: function () {
	            this.$input.combodate(this.options.combodate);
	                    
	            if($.fn.editableform.engine === 'bs3') {
	                this.$input.siblings().find('select').addClass('form-control');
	            }
	            
	            if(this.options.inputclass) {
	                this.$input.siblings().find('select').addClass(this.options.inputclass);
	            }            
	            //"clear" link
	            /*
	            if(this.options.clear) {
	                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
	                    e.preventDefault();
	                    e.stopPropagation();
	                    this.clear();
	                }, this));
	                
	                this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));  
	            } 
	            */               
	        },
	        
	        value2html: function(value, element) {
	            var text = value ? value.format(this.options.viewformat) : '';
	            //$(element).text(text);
	            Constructor.superclass.value2html.call(this, text, element);  
	        },

	        html2value: function(html) {
	            return html ? moment(html, this.options.viewformat) : null;
	        },   
	        
	        value2str: function(value) {
	            return value ? value.format(this.options.format) : '';
	       }, 
	       
	       str2value: function(str) {
	           return str ? moment(str, this.options.format) : null;
	       }, 
	       
	       value2submit: function(value) {
	           return this.value2str(value);
	       },                    

	       value2input: function(value) {
	           this.$input.combodate('setValue', value);
	       },
	        
	       input2value: function() { 
	           return this.$input.combodate('getValue', null);
	       },       
	       
	       activate: function() {
	           this.$input.siblings('.combodate').find('select').eq(0).focus();
	       },
	       
	       /*
	       clear:  function() {
	          this.$input.data('datepicker').date = null;
	          this.$input.find('.active').removeClass('active');
	       },
	       */
	       
	       autosubmit: function() {
	           
	       }

	    });
	    
	    Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        @property tpl 
	        @default <input type="text">
	        **/         
	        tpl:'<input type="text">',
	        /**
	        @property inputclass 
	        @default null
	        **/         
	        inputclass: null,
	        /**
	        Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
	        See list of tokens in [momentjs docs](http://momentjs.com/docs/#/parsing/string-format)  
	        
	        @property format 
	        @type string
	        @default YYYY-MM-DD
	        **/         
	        format:'YYYY-MM-DD',
	        /**
	        Format used for displaying date. Also applied when converting date from element's text on init.   
	        If not specified equals to `format`.
	        
	        @property viewformat 
	        @type string
	        @default null
	        **/          
	        viewformat: null,        
	        /**
	        Template used for displaying dropdowns.
	        
	        @property template 
	        @type string
	        @default D / MMM / YYYY
	        **/          
	        template: 'D / MMM / YYYY',  
	        /**
	        Configuration of combodate.
	        Full list of options: http://vitalets.github.com/combodate/#docs
	        
	        @property combodate 
	        @type object
	        @default null
	        **/
	        combodate: null
	        
	        /*
	        (not implemented yet)
	        Text shown as clear date button. 
	        If <code>false</code> clear button will not be rendered.
	        
	        @property clear 
	        @type boolean|string
	        @default 'x clear'         
	        */
	        //clear: '&times; clear'
	    });   

	    $.fn.editabletypes.combodate = Constructor;

	}(__webpack_provided_window_dot_jQuery));

	/*
	Editableform based on Twitter Bootstrap 3
	*/
	(function ($) {
	    "use strict";
	    
	    //store parent methods
	    var pInitInput = $.fn.editableform.Constructor.prototype.initInput;
	    
	    $.extend($.fn.editableform.Constructor.prototype, {
	        initTemplate: function() {
	            this.$form = $($.fn.editableform.template); 
	            this.$form.find('.control-group').addClass('form-group');
	            this.$form.find('.editable-error-block').addClass('help-block');
	        },
	        initInput: function() {  
	            pInitInput.apply(this);

	            //for bs3 set default class `input-sm` to standard inputs
	            var emptyInputClass = this.input.options.inputclass === null || this.input.options.inputclass === false;
	            var defaultClass = 'input-sm';
	            
	            //bs3 add `form-control` class to standard inputs
	            var stdtypes = 'text,select,textarea,password,email,url,tel,number,range,time,typeaheadjs'.split(','); 
	            if(~$.inArray(this.input.type, stdtypes)) {
	                this.input.$input.addClass('form-control');
	                if(emptyInputClass) {
	                    this.input.options.inputclass = defaultClass;
	                    this.input.$input.addClass(defaultClass);
	                }
	            }             
	        
	            //apply bs3 size class also to buttons (to fit size of control)
	            var $btn = this.$form.find('.editable-buttons');
	            var classes = emptyInputClass ? [defaultClass] : this.input.options.inputclass.split(' ');
	            for(var i=0; i<classes.length; i++) {
	                // `btn-sm` is default now
	                /*
	                if(classes[i].toLowerCase() === 'input-sm') { 
	                    $btn.find('button').addClass('btn-sm');  
	                }
	                */
	                if(classes[i].toLowerCase() === 'input-lg') {
	                    $btn.find('button').removeClass('btn-sm').addClass('btn-lg'); 
	                }
	            }
	        }
	    });    
	    
	    //buttons
	    $.fn.editableform.buttons = 
	      '<button type="submit" class="btn btn-primary btn-sm editable-submit">'+
	        '<i class="ion-checkmark"></i>'+
	      '</button>'+
	      '<button type="button" class="btn btn-default btn-sm editable-cancel">'+
	        '<i class="ion-close"></i>'+
	      '</button>';         
	    
	    //error classes
	    $.fn.editableform.errorGroupClass = 'has-error';
	    $.fn.editableform.errorBlockClass = null;  
	    //engine
	    $.fn.editableform.engine = 'bs3';  
	}(__webpack_provided_window_dot_jQuery));
	/**
	* Editable Popover3 (for Bootstrap 3) 
	* ---------------------
	* requires bootstrap-popover.js
	*/
	(function ($) {
	    "use strict";

	    //extend methods
	    $.extend($.fn.editableContainer.Popup.prototype, {
	        containerName: 'popover',
	        containerDataName: 'bs.popover',
	        innerCss: '.popover-content',
	        defaults: $.fn.popover.Constructor.DEFAULTS,

	        initContainer: function(){
	            $.extend(this.containerOptions, {
	                trigger: 'manual',
	                selector: false,
	                content: ' ',
	                template: this.defaults.template
	            });
	            
	            //as template property is used in inputs, hide it from popover
	            var t;
	            if(this.$element.data('template')) {
	               t = this.$element.data('template');
	               this.$element.removeData('template');  
	            } 
	            
	            this.call(this.containerOptions);
	            
	            if(t) {
	               //restore data('template')
	               this.$element.data('template', t); 
	            }
	        }, 
	        
	        /* show */
	        innerShow: function () {
	            this.call('show');                
	        },  
	        
	        /* hide */
	        innerHide: function () {
	            this.call('hide');       
	        }, 
	        
	        /* destroy */
	        innerDestroy: function() {
	            this.call('destroy');
	        },                               
	        
	        setContainerOption: function(key, value) {
	            this.container().options[key] = value; 
	        },               

	        /**
	        * move popover to new position. This function mainly copied from bootstrap-popover.
	        */
	        /*jshint laxcomma: true, eqeqeq: false*/
	        setPosition: function () { 

	            (function() {
	            /*    
	                var $tip = this.tip()
	                , inside
	                , pos
	                , actualWidth
	                , actualHeight
	                , placement
	                , tp
	                , tpt
	                , tpb
	                , tpl
	                , tpr;

	                placement = typeof this.options.placement === 'function' ?
	                this.options.placement.call(this, $tip[0], this.$element[0]) :
	                this.options.placement;

	                inside = /in/.test(placement);
	               
	                $tip
	              //  .detach()
	              //vitalets: remove any placement class because otherwise they dont influence on re-positioning of visible popover
	                .removeClass('top right bottom left')
	                .css({ top: 0, left: 0, display: 'block' });
	              //  .insertAfter(this.$element);
	               
	                pos = this.getPosition(inside);

	                actualWidth = $tip[0].offsetWidth;
	                actualHeight = $tip[0].offsetHeight;

	                placement = inside ? placement.split(' ')[1] : placement;

	                tpb = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
	                tpt = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
	                tpl = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
	                tpr = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};

	                switch (placement) {
	                    case 'bottom':
	                        if ((tpb.top + actualHeight) > ($(window).scrollTop() + $(window).height())) {
	                            if (tpt.top > $(window).scrollTop()) {
	                                placement = 'top';
	                            } else if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
	                                placement = 'right';
	                            } else if (tpl.left > $(window).scrollLeft()) {
	                                placement = 'left';
	                            } else {
	                                placement = 'right';
	                            }
	                        }
	                        break;
	                    case 'top':
	                        if (tpt.top < $(window).scrollTop()) {
	                            if ((tpb.top + actualHeight) < ($(window).scrollTop() + $(window).height())) {
	                                placement = 'bottom';
	                            } else if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
	                                placement = 'right';
	                            } else if (tpl.left > $(window).scrollLeft()) {
	                                placement = 'left';
	                            } else {
	                                placement = 'right';
	                            }
	                        }
	                        break;
	                    case 'left':
	                        if (tpl.left < $(window).scrollLeft()) {
	                            if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
	                                placement = 'right';
	                            } else if (tpt.top > $(window).scrollTop()) {
	                                placement = 'top';
	                            } else if (tpt.top > $(window).scrollTop()) {
	                                placement = 'bottom';
	                            } else {
	                                placement = 'right';
	                            }
	                        }
	                        break;
	                    case 'right':
	                        if ((tpr.left + actualWidth) > ($(window).scrollLeft() + $(window).width())) {
	                            if (tpl.left > $(window).scrollLeft()) {
	                                placement = 'left';
	                            } else if (tpt.top > $(window).scrollTop()) {
	                                placement = 'top';
	                            } else if (tpt.top > $(window).scrollTop()) {
	                                placement = 'bottom';
	                            }
	                        }
	                        break;
	                }

	                switch (placement) {
	                    case 'bottom':
	                        tp = tpb;
	                        break;
	                    case 'top':
	                        tp = tpt;
	                        break;
	                    case 'left':
	                        tp = tpl;
	                        break;
	                    case 'right':
	                        tp = tpr;
	                        break;
	                }

	                $tip
	                .offset(tp)
	                .addClass(placement)
	                .addClass('in');
	           */
	                     
	           
	            var $tip = this.tip();
	            
	            var placement = typeof this.options.placement == 'function' ?
	                this.options.placement.call(this, $tip[0], this.$element[0]) :
	                this.options.placement;            

	            var autoToken = /\s?auto?\s?/i;
	            var autoPlace = autoToken.test(placement);
	            if (autoPlace) {
	                placement = placement.replace(autoToken, '') || 'top';
	            }
	            
	            
	            var pos = this.getPosition();
	            var actualWidth = $tip[0].offsetWidth;
	            var actualHeight = $tip[0].offsetHeight;

	            if (autoPlace) {
	                var $parent = this.$element.parent();

	                var orgPlacement = placement;
	                var docScroll    = document.documentElement.scrollTop || document.body.scrollTop;
	                var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth();
	                var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight();
	                var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left;

	                placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
	                            placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
	                            placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
	                            placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
	                            placement;

	                $tip
	                  .removeClass(orgPlacement)
	                  .addClass(placement);
	            }


	            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

	            this.applyPlacement(calculatedOffset, placement);            
	                     
	                
	            }).call(this.container());
	          /*jshint laxcomma: false, eqeqeq: true*/  
	        }            
	    });

	}(__webpack_provided_window_dot_jQuery));

	/* =========================================================
	 * bootstrap-datepicker.js
	 * http://www.eyecon.ro/bootstrap-datepicker
	 * =========================================================
	 * Copyright 2012 Stefan Petre
	 * Improvements by Andrew Rowls
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */

	(function( $ ) {

		function UTCDate(){
			return new Date(Date.UTC.apply(Date, arguments));
		}
		function UTCToday(){
			var today = new Date();
			return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
		}

		// Picker object

		var Datepicker = function(element, options) {
			var that = this;

			this._process_options(options);

			this.element = $(element);
			this.isInline = false;
			this.isInput = this.element.is('input');
			this.component = this.element.is('.date') ? this.element.find('.add-on, .btn') : false;
			this.hasInput = this.component && this.element.find('input').length;
			if(this.component && this.component.length === 0)
				this.component = false;

			this.picker = $(DPGlobal.template);
			this._buildEvents();
			this._attachEvents();

			if(this.isInline) {
				this.picker.addClass('datepicker-inline').appendTo(this.element);
			} else {
				this.picker.addClass('datepicker-dropdown dropdown-menu');
			}

			if (this.o.rtl){
				this.picker.addClass('datepicker-rtl');
				this.picker.find('.prev i, .next i')
							.toggleClass('icon-arrow-left icon-arrow-right');
			}


			this.viewMode = this.o.startView;

			if (this.o.calendarWeeks)
				this.picker.find('tfoot th.today')
							.attr('colspan', function(i, val){
								return parseInt(val) + 1;
							});

			this._allow_update = false;

			this.setStartDate(this.o.startDate);
			this.setEndDate(this.o.endDate);
			this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

			this.fillDow();
			this.fillMonths();

			this._allow_update = true;

			this.update();
			this.showMode();

			if(this.isInline) {
				this.show();
			}
		};

		Datepicker.prototype = {
			constructor: Datepicker,

			_process_options: function(opts){
				// Store raw options for reference
				this._o = $.extend({}, this._o, opts);
				// Processed options
				var o = this.o = $.extend({}, this._o);

				// Check if "de-DE" style date is available, if not language should
				// fallback to 2 letter code eg "de"
				var lang = o.language;
				if (!dates[lang]) {
					lang = lang.split('-')[0];
					if (!dates[lang])
						lang = defaults.language;
				}
				o.language = lang;

				switch(o.startView){
					case 2:
					case 'decade':
						o.startView = 2;
						break;
					case 1:
					case 'year':
						o.startView = 1;
						break;
					default:
						o.startView = 0;
				}

				switch (o.minViewMode) {
					case 1:
					case 'months':
						o.minViewMode = 1;
						break;
					case 2:
					case 'years':
						o.minViewMode = 2;
						break;
					default:
						o.minViewMode = 0;
				}

				o.startView = Math.max(o.startView, o.minViewMode);

				o.weekStart %= 7;
				o.weekEnd = ((o.weekStart + 6) % 7);

				var format = DPGlobal.parseFormat(o.format)
				if (o.startDate !== -Infinity) {
					o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				}
				if (o.endDate !== Infinity) {
					o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				}

				o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
				if (!$.isArray(o.daysOfWeekDisabled))
					o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
				o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
					return parseInt(d, 10);
				});
			},
			_events: [],
			_secondaryEvents: [],
			_applyEvents: function(evs){
				for (var i=0, el, ev; i<evs.length; i++){
					el = evs[i][0];
					ev = evs[i][1];
					el.on(ev);
				}
			},
			_unapplyEvents: function(evs){
				for (var i=0, el, ev; i<evs.length; i++){
					el = evs[i][0];
					ev = evs[i][1];
					el.off(ev);
				}
			},
			_buildEvents: function(){
				if (this.isInput) { // single input
					this._events = [
						[this.element, {
							focus: $.proxy(this.show, this),
							keyup: $.proxy(this.update, this),
							keydown: $.proxy(this.keydown, this)
						}]
					];
				}
				else if (this.component && this.hasInput){ // component: input + button
					this._events = [
						// For components that are not readonly, allow keyboard nav
						[this.element.find('input'), {
							focus: $.proxy(this.show, this),
							keyup: $.proxy(this.update, this),
							keydown: $.proxy(this.keydown, this)
						}],
						[this.component, {
							click: $.proxy(this.show, this)
						}]
					];
				}
				else if (this.element.is('div')) {  // inline datepicker
					this.isInline = true;
				}
				else {
					this._events = [
						[this.element, {
							click: $.proxy(this.show, this)
						}]
					];
				}

				this._secondaryEvents = [
					[this.picker, {
						click: $.proxy(this.click, this)
					}],
					[$(window), {
						resize: $.proxy(this.place, this)
					}],
					[$(document), {
						mousedown: $.proxy(function (e) {
							// Clicked outside the datepicker, hide it
							if (!(
								this.element.is(e.target) ||
								this.element.find(e.target).size() ||
								this.picker.is(e.target) ||
								this.picker.find(e.target).size()
							)) {
								this.hide();
							}
						}, this)
					}]
				];
			},
			_attachEvents: function(){
				this._detachEvents();
				this._applyEvents(this._events);
			},
			_detachEvents: function(){
				this._unapplyEvents(this._events);
			},
			_attachSecondaryEvents: function(){
				this._detachSecondaryEvents();
				this._applyEvents(this._secondaryEvents);
			},
			_detachSecondaryEvents: function(){
				this._unapplyEvents(this._secondaryEvents);
			},
			_trigger: function(event, altdate){
				var date = altdate || this.date,
					local_date = new Date(date.getTime() + (date.getTimezoneOffset()*60000));

				this.element.trigger({
					type: event,
					date: local_date,
					format: $.proxy(function(altformat){
						var format = altformat || this.o.format;
						return DPGlobal.formatDate(date, format, this.o.language);
					}, this)
				});
			},

			show: function(e) {
				if (!this.isInline)
					this.picker.appendTo('body');
				this.picker.show();
				this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
				this.place();
				this._attachSecondaryEvents();
				if (e) {
					e.preventDefault();
				}
				this._trigger('show');
			},

			hide: function(e){
				if(this.isInline) return;
				if (!this.picker.is(':visible')) return;
				this.picker.hide().detach();
				this._detachSecondaryEvents();
				this.viewMode = this.o.startView;
				this.showMode();

				if (
					this.o.forceParse &&
					(
						this.isInput && this.element.val() ||
						this.hasInput && this.element.find('input').val()
					)
				)
					this.setValue();
				this._trigger('hide');
			},

			remove: function() {
				this.hide();
				this._detachEvents();
				this._detachSecondaryEvents();
				this.picker.remove();
				delete this.element.data().datepicker;
				if (!this.isInput) {
					delete this.element.data().date;
				}
			},

			getDate: function() {
				var d = this.getUTCDate();
				return new Date(d.getTime() + (d.getTimezoneOffset()*60000));
			},

			getUTCDate: function() {
				return this.date;
			},

			setDate: function(d) {
				this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset()*60000)));
			},

			setUTCDate: function(d) {
				this.date = d;
				this.setValue();
			},

			setValue: function() {
				var formatted = this.getFormattedDate();
				if (!this.isInput) {
					if (this.component){
						this.element.find('input').val(formatted);
					}
				} else {
					this.element.val(formatted);
				}
			},

			getFormattedDate: function(format) {
				if (format === undefined)
					format = this.o.format;
				return DPGlobal.formatDate(this.date, format, this.o.language);
			},

			setStartDate: function(startDate){
				this._process_options({startDate: startDate});
				this.update();
				this.updateNavArrows();
			},

			setEndDate: function(endDate){
				this._process_options({endDate: endDate});
				this.update();
				this.updateNavArrows();
			},

			setDaysOfWeekDisabled: function(daysOfWeekDisabled){
				this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
				this.update();
				this.updateNavArrows();
			},

			place: function(){
							if(this.isInline) return;
				var zIndex = parseInt(this.element.parents().filter(function() {
								return $(this).css('z-index') != 'auto';
							}).first().css('z-index'))+10;
				var offset = this.component ? this.component.parent().offset() : this.element.offset();
				var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(true);
				this.picker.css({
					top: offset.top + height,
					left: offset.left,
					zIndex: zIndex
				});
			},

			_allow_update: true,
			update: function(){
				if (!this._allow_update) return;

				var date, fromArgs = false;
				if(arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
					date = arguments[0];
					fromArgs = true;
				} else {
					date = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
					delete this.element.data().date;
				}

				this.date = DPGlobal.parseDate(date, this.o.format, this.o.language);

				if(fromArgs) this.setValue();

				if (this.date < this.o.startDate) {
					this.viewDate = new Date(this.o.startDate);
				} else if (this.date > this.o.endDate) {
					this.viewDate = new Date(this.o.endDate);
				} else {
					this.viewDate = new Date(this.date);
				}
				this.fill();
			},

			fillDow: function(){
				var dowCnt = this.o.weekStart,
				html = '<tr>';
				if(this.o.calendarWeeks){
					var cell = '<th class="cw">&nbsp;</th>';
					html += cell;
					this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
				}
				while (dowCnt < this.o.weekStart + 7) {
					html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
				}
				html += '</tr>';
				this.picker.find('.datepicker-days thead').append(html);
			},

			fillMonths: function(){
				var html = '',
				i = 0;
				while (i < 12) {
					html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
				}
				this.picker.find('.datepicker-months td').html(html);
			},

			setRange: function(range){
				if (!range || !range.length)
					delete this.range;
				else
					this.range = $.map(range, function(d){ return d.valueOf(); });
				this.fill();
			},

			getClassNames: function(date){
				var cls = [],
					year = this.viewDate.getUTCFullYear(),
					month = this.viewDate.getUTCMonth(),
					currentDate = this.date.valueOf(),
					today = new Date();
				if (date.getUTCFullYear() < year || (date.getUTCFullYear() == year && date.getUTCMonth() < month)) {
					cls.push('old');
				} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() == year && date.getUTCMonth() > month)) {
					cls.push('new');
				}
				// Compare internal UTC date with local today, not UTC today
				if (this.o.todayHighlight &&
					date.getUTCFullYear() == today.getFullYear() &&
					date.getUTCMonth() == today.getMonth() &&
					date.getUTCDate() == today.getDate()) {
					cls.push('today');
				}
				if (currentDate && date.valueOf() == currentDate) {
					cls.push('active');
				}
				if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
					$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
					cls.push('disabled');
				}
				if (this.range){
					if (date > this.range[0] && date < this.range[this.range.length-1]){
						cls.push('range');
					}
					if ($.inArray(date.valueOf(), this.range) != -1){
						cls.push('selected');
					}
				}
				return cls;
			},

			fill: function() {
				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth(),
					startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
					startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
					endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
					endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
					currentDate = this.date && this.date.valueOf(),
					tooltip;
				this.picker.find('.datepicker-days thead th.datepicker-switch')
							.text(dates[this.o.language].months[month]+' '+year);
				this.picker.find('tfoot th.today')
							.text(dates[this.o.language].today)
							.toggle(this.o.todayBtn !== false);
				this.picker.find('tfoot th.clear')
							.text(dates[this.o.language].clear)
							.toggle(this.o.clearBtn !== false);
				this.updateNavArrows();
				this.fillMonths();
				var prevMonth = UTCDate(year, month-1, 28,0,0,0,0),
					day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
				prevMonth.setUTCDate(day);
				prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
				var nextMonth = new Date(prevMonth);
				nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
				nextMonth = nextMonth.valueOf();
				var html = [];
				var clsName;
				while(prevMonth.valueOf() < nextMonth) {
					if (prevMonth.getUTCDay() == this.o.weekStart) {
						html.push('<tr>');
						if(this.o.calendarWeeks){
							// ISO 8601: First week contains first thursday.
							// ISO also states week starts on Monday, but we can be more abstract here.
							var
								// Start of current week: based on weekstart/current date
								ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
								// Thursday of this week
								th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
								// First Thursday of year, year from thursday
								yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
								// Calendar week: ms between thursdays, div ms per day, div 7 days
								calWeek =  (th - yth) / 864e5 / 7 + 1;
							html.push('<td class="cw">'+ calWeek +'</td>');

						}
					}
					clsName = this.getClassNames(prevMonth);
					clsName.push('day');

					var before = this.o.beforeShowDay(prevMonth);
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;

					clsName = $.unique(clsName);
					html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
					if (prevMonth.getUTCDay() == this.o.weekEnd) {
						html.push('</tr>');
					}
					prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
				}
				this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
				var currentYear = this.date && this.date.getUTCFullYear();

				var months = this.picker.find('.datepicker-months')
							.find('th:eq(1)')
								.text(year)
								.end()
							.find('span').removeClass('active');
				if (currentYear && currentYear == year) {
					months.eq(this.date.getUTCMonth()).addClass('active');
				}
				if (year < startYear || year > endYear) {
					months.addClass('disabled');
				}
				if (year == startYear) {
					months.slice(0, startMonth).addClass('disabled');
				}
				if (year == endYear) {
					months.slice(endMonth+1).addClass('disabled');
				}

				html = '';
				year = parseInt(year/10, 10) * 10;
				var yearCont = this.picker.find('.datepicker-years')
									.find('th:eq(1)')
										.text(year + '-' + (year + 9))
										.end()
									.find('td');
				year -= 1;
				for (var i = -1; i < 11; i++) {
					html += '<span class="year'+(i == -1 ? ' old' : i == 10 ? ' new' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
					year += 1;
				}
				yearCont.html(html);
			},

			updateNavArrows: function() {
				if (!this._allow_update) return;

				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth();
				switch (this.viewMode) {
					case 0:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
							this.picker.find('.prev').css({visibility: 'hidden'});
						} else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
							this.picker.find('.next').css({visibility: 'hidden'});
						} else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
					case 1:
					case 2:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
							this.picker.find('.prev').css({visibility: 'hidden'});
						} else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
							this.picker.find('.next').css({visibility: 'hidden'});
						} else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
				}
			},

			click: function(e) {
				e.preventDefault();
				var target = $(e.target).closest('span, td, th');
				if (target.length == 1) {
					switch(target[0].nodeName.toLowerCase()) {
						case 'th':
							switch(target[0].className) {
								case 'datepicker-switch':
									this.showMode(1);
									break;
								case 'prev':
								case 'next':
									var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
									switch(this.viewMode){
										case 0:
											this.viewDate = this.moveMonth(this.viewDate, dir);
											break;
										case 1:
										case 2:
											this.viewDate = this.moveYear(this.viewDate, dir);
											break;
									}
									this.fill();
									break;
								case 'today':
									var date = new Date();
									date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

									this.showMode(-2);
									var which = this.o.todayBtn == 'linked' ? null : 'view';
									this._setDate(date, which);
									break;
								case 'clear':
									var element;
									if (this.isInput)
										element = this.element;
									else if (this.component)
										element = this.element.find('input');
									if (element)
										element.val("").change();
									this._trigger('changeDate');
									this.update();
									if (this.o.autoclose)
										this.hide();
									break;
							}
							break;
						case 'span':
							if (!target.is('.disabled')) {
								this.viewDate.setUTCDate(1);
								if (target.is('.month')) {
									var day = 1;
									var month = target.parent().find('span').index(target);
									var year = this.viewDate.getUTCFullYear();
									this.viewDate.setUTCMonth(month);
									this._trigger('changeMonth', this.viewDate);
									if (this.o.minViewMode === 1) {
										this._setDate(UTCDate(year, month, day,0,0,0,0));
									}
								} else {
									var year = parseInt(target.text(), 10)||0;
									var day = 1;
									var month = 0;
									this.viewDate.setUTCFullYear(year);
									this._trigger('changeYear', this.viewDate);
									if (this.o.minViewMode === 2) {
										this._setDate(UTCDate(year, month, day,0,0,0,0));
									}
								}
								this.showMode(-1);
								this.fill();
							}
							break;
						case 'td':
							if (target.is('.day') && !target.is('.disabled')){
								var day = parseInt(target.text(), 10)||1;
								var year = this.viewDate.getUTCFullYear(),
									month = this.viewDate.getUTCMonth();
								if (target.is('.old')) {
									if (month === 0) {
										month = 11;
										year -= 1;
									} else {
										month -= 1;
									}
								} else if (target.is('.new')) {
									if (month == 11) {
										month = 0;
										year += 1;
									} else {
										month += 1;
									}
								}
								this._setDate(UTCDate(year, month, day,0,0,0,0));
							}
							break;
					}
				}
			},

			_setDate: function(date, which){
				if (!which || which == 'date')
					this.date = new Date(date);
				if (!which || which  == 'view')
					this.viewDate = new Date(date);
				this.fill();
				this.setValue();
				this._trigger('changeDate');
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component){
					element = this.element.find('input');
				}
				if (element) {
					element.change();
					if (this.o.autoclose && (!which || which == 'date')) {
						this.hide();
					}
				}
			},

			moveMonth: function(date, dir){
				if (!dir) return date;
				var new_date = new Date(date.valueOf()),
					day = new_date.getUTCDate(),
					month = new_date.getUTCMonth(),
					mag = Math.abs(dir),
					new_month, test;
				dir = dir > 0 ? 1 : -1;
				if (mag == 1){
					test = dir == -1
						// If going back one month, make sure month is not current month
						// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
						? function(){ return new_date.getUTCMonth() == month; }
						// If going forward one month, make sure month is as expected
						// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
						: function(){ return new_date.getUTCMonth() != new_month; };
					new_month = month + dir;
					new_date.setUTCMonth(new_month);
					// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
					if (new_month < 0 || new_month > 11)
						new_month = (new_month + 12) % 12;
				} else {
					// For magnitudes >1, move one month at a time...
					for (var i=0; i<mag; i++)
						// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
						new_date = this.moveMonth(new_date, dir);
					// ...then reset the day, keeping it in the new month
					new_month = new_date.getUTCMonth();
					new_date.setUTCDate(day);
					test = function(){ return new_month != new_date.getUTCMonth(); };
				}
				// Common date-resetting loop -- if date is beyond end of month, make it
				// end of month
				while (test()){
					new_date.setUTCDate(--day);
					new_date.setUTCMonth(new_month);
				}
				return new_date;
			},

			moveYear: function(date, dir){
				return this.moveMonth(date, dir*12);
			},

			dateWithinRange: function(date){
				return date >= this.o.startDate && date <= this.o.endDate;
			},

			keydown: function(e){
				if (this.picker.is(':not(:visible)')){
					if (e.keyCode == 27) // allow escape to hide and re-show picker
						this.show();
					return;
				}
				var dateChanged = false,
					dir, day, month,
					newDate, newViewDate;
				switch(e.keyCode){
					case 27: // escape
						this.hide();
						e.preventDefault();
						break;
					case 37: // left
					case 39: // right
						if (!this.o.keyboardNavigation) break;
						dir = e.keyCode == 37 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.date, dir);
							newViewDate = this.moveYear(this.viewDate, dir);
						} else if (e.shiftKey){
							newDate = this.moveMonth(this.date, dir);
							newViewDate = this.moveMonth(this.viewDate, dir);
						} else {
							newDate = new Date(this.date);
							newDate.setUTCDate(this.date.getUTCDate() + dir);
							newViewDate = new Date(this.viewDate);
							newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
						}
						if (this.dateWithinRange(newDate)){
							this.date = newDate;
							this.viewDate = newViewDate;
							this.setValue();
							this.update();
							e.preventDefault();
							dateChanged = true;
						}
						break;
					case 38: // up
					case 40: // down
						if (!this.o.keyboardNavigation) break;
						dir = e.keyCode == 38 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.date, dir);
							newViewDate = this.moveYear(this.viewDate, dir);
						} else if (e.shiftKey){
							newDate = this.moveMonth(this.date, dir);
							newViewDate = this.moveMonth(this.viewDate, dir);
						} else {
							newDate = new Date(this.date);
							newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
							newViewDate = new Date(this.viewDate);
							newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
						}
						if (this.dateWithinRange(newDate)){
							this.date = newDate;
							this.viewDate = newViewDate;
							this.setValue();
							this.update();
							e.preventDefault();
							dateChanged = true;
						}
						break;
					case 13: // enter
						this.hide();
						e.preventDefault();
						break;
					case 9: // tab
						this.hide();
						break;
				}
				if (dateChanged){
					this._trigger('changeDate');
					var element;
					if (this.isInput) {
						element = this.element;
					} else if (this.component){
						element = this.element.find('input');
					}
					if (element) {
						element.change();
					}
				}
			},

			showMode: function(dir) {
				if (dir) {
					this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
				}
				/*
					vitalets: fixing bug of very special conditions:
					jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.
					Method show() does not set display css correctly and datepicker is not shown.
					Changed to .css('display', 'block') solve the problem.
					See https://github.com/vitalets/x-editable/issues/37

					In jquery 1.7.2+ everything works fine.
				*/
				//this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
				this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
				this.updateNavArrows();
			}
		};

		var DateRangePicker = function(element, options){
			this.element = $(element);
			this.inputs = $.map(options.inputs, function(i){ return i.jquery ? i[0] : i; });
			delete options.inputs;

			$(this.inputs)
				.datepicker(options)
				.bind('changeDate', $.proxy(this.dateUpdated, this));

			this.pickers = $.map(this.inputs, function(i){ return $(i).data('datepicker'); });
			this.updateDates();
		};
		DateRangePicker.prototype = {
			updateDates: function(){
				this.dates = $.map(this.pickers, function(i){ return i.date; });
				this.updateRanges();
			},
			updateRanges: function(){
				var range = $.map(this.dates, function(d){ return d.valueOf(); });
				$.each(this.pickers, function(i, p){
					p.setRange(range);
				});
			},
			dateUpdated: function(e){
				var dp = $(e.target).data('datepicker'),
					new_date = dp.getUTCDate(),
					i = $.inArray(e.target, this.inputs),
					l = this.inputs.length;
				if (i == -1) return;

				if (new_date < this.dates[i]){
					// Date being moved earlier/left
					while (i>=0 && new_date < this.dates[i]){
						this.pickers[i--].setUTCDate(new_date);
					}
				}
				else if (new_date > this.dates[i]){
					// Date being moved later/right
					while (i<l && new_date > this.dates[i]){
						this.pickers[i++].setUTCDate(new_date);
					}
				}
				this.updateDates();
			},
			remove: function(){
				$.map(this.pickers, function(p){ p.remove(); });
				delete this.element.data().datepicker;
			}
		};

		function opts_from_el(el, prefix){
			// Derive options from element data-attrs
			var data = $(el).data(),
				out = {}, inkey,
				replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])'),
				prefix = new RegExp('^' + prefix.toLowerCase());
			for (var key in data)
				if (prefix.test(key)){
					inkey = key.replace(replace, function(_,a){ return a.toLowerCase(); });
					out[inkey] = data[key];
				}
			return out;
		}

		function opts_from_locale(lang){
			// Derive options from locale plugins
			var out = {};
			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			if (!dates[lang]) {
				lang = lang.split('-')[0]
				if (!dates[lang])
					return;
			}
			var d = dates[lang];
			$.each(locale_opts, function(i,k){
				if (k in d)
					out[k] = d[k];
			});
			return out;
		}

		var old = $.fn.datepicker;
		var datepicker = $.fn.datepicker = function ( option ) {
			var args = Array.apply(null, arguments);
			args.shift();
			var internal_return,
				this_return;
			this.each(function () {
				var $this = $(this),
					data = $this.data('datepicker'),
					options = typeof option == 'object' && option;
				if (!data) {
					var elopts = opts_from_el(this, 'date'),
						// Preliminary otions
						xopts = $.extend({}, defaults, elopts, options),
						locopts = opts_from_locale(xopts.language),
						// Options priority: js args, data-attrs, locales, defaults
						opts = $.extend({}, defaults, locopts, elopts, options);
					if ($this.is('.input-daterange') || opts.inputs){
						var ropts = {
							inputs: opts.inputs || $this.find('input').toArray()
						};
						$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
					}
					else{
						$this.data('datepicker', (data = new Datepicker(this, opts)));
					}
				}
				if (typeof option == 'string' && typeof data[option] == 'function') {
					internal_return = data[option].apply(data, args);
					if (internal_return !== undefined)
						return false;
				}
			});
			if (internal_return !== undefined)
				return internal_return;
			else
				return this;
		};

		var defaults = $.fn.datepicker.defaults = {
			autoclose: false,
			beforeShowDay: $.noop,
			calendarWeeks: false,
			clearBtn: false,
			daysOfWeekDisabled: [],
			endDate: Infinity,
			forceParse: true,
			format: 'mm/dd/yyyy',
			keyboardNavigation: true,
			language: 'en',
			minViewMode: 0,
			rtl: false,
			startDate: -Infinity,
			startView: 0,
			todayBtn: false,
			todayHighlight: false,
			weekStart: 0
		};
		var locale_opts = $.fn.datepicker.locale_opts = [
			'format',
			'rtl',
			'weekStart'
		];
		$.fn.datepicker.Constructor = Datepicker;
		var dates = $.fn.datepicker.dates = {
			en: {
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				today: "Today",
				clear: "Clear"
			}
		};

		var DPGlobal = {
			modes: [
				{
					clsName: 'days',
					navFnc: 'Month',
					navStep: 1
				},
				{
					clsName: 'months',
					navFnc: 'FullYear',
					navStep: 1
				},
				{
					clsName: 'years',
					navFnc: 'FullYear',
					navStep: 10
			}],
			isLeapYear: function (year) {
				return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
			},
			getDaysInMonth: function (year, month) {
				return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
			},
			validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
			nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
			parseFormat: function(format){
				// IE treats \0 as a string end in inputs (truncating the value),
				// so it's a bad format delimiter, anyway
				var separators = format.replace(this.validParts, '\0').split('\0'),
					parts = format.match(this.validParts);
				if (!separators || !separators.length || !parts || parts.length === 0){
					throw new Error("Invalid date format.");
				}
				return {separators: separators, parts: parts};
			},
			parseDate: function(date, format, language) {
				if (date instanceof Date) return date;
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
					var part_re = /([\-+]\d+)([dmwy])/,
						parts = date.match(/([\-+]\d+)([dmwy])/g),
						part, dir;
					date = new Date();
					for (var i=0; i<parts.length; i++) {
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						switch(part[2]){
							case 'd':
								date.setUTCDate(date.getUTCDate() + dir);
								break;
							case 'm':
								date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
								break;
							case 'w':
								date.setUTCDate(date.getUTCDate() + dir * 7);
								break;
							case 'y':
								date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
								break;
						}
					}
					return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
				}
				var parts = date && date.match(this.nonpunctuation) || [],
					date = new Date(),
					parsed = {},
					setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
					setters_map = {
						yyyy: function(d,v){ return d.setUTCFullYear(v); },
						yy: function(d,v){ return d.setUTCFullYear(2000+v); },
						m: function(d,v){
							v -= 1;
							while (v<0) v += 12;
							v %= 12;
							d.setUTCMonth(v);
							while (d.getUTCMonth() != v)
								d.setUTCDate(d.getUTCDate()-1);
							return d;
						},
						d: function(d,v){ return d.setUTCDate(v); }
					},
					val, filtered, part;
				setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
				setters_map['dd'] = setters_map['d'];
				date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
				var fparts = format.parts.slice();
				// Remove noop parts
				if (parts.length != fparts.length) {
					fparts = $(fparts).filter(function(i,p){
						return $.inArray(p, setters_order) !== -1;
					}).toArray();
				}
				// Process remainder
				if (parts.length == fparts.length) {
					for (var i=0, cnt = fparts.length; i < cnt; i++) {
						val = parseInt(parts[i], 10);
						part = fparts[i];
						if (isNaN(val)) {
							switch(part) {
								case 'MM':
									filtered = $(dates[language].months).filter(function(){
										var m = this.slice(0, parts[i].length),
											p = parts[i].slice(0, m.length);
										return m == p;
									});
									val = $.inArray(filtered[0], dates[language].months) + 1;
									break;
								case 'M':
									filtered = $(dates[language].monthsShort).filter(function(){
										var m = this.slice(0, parts[i].length),
											p = parts[i].slice(0, m.length);
										return m == p;
									});
									val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
									break;
							}
						}
						parsed[part] = val;
					}
					for (var i=0, s; i<setters_order.length; i++){
						s = setters_order[i];
						if (s in parsed && !isNaN(parsed[s]))
							setters_map[s](date, parsed[s]);
					}
				}
				return date;
			},
			formatDate: function(date, format, language){
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var val = {
					d: date.getUTCDate(),
					D: dates[language].daysShort[date.getUTCDay()],
					DD: dates[language].days[date.getUTCDay()],
					m: date.getUTCMonth() + 1,
					M: dates[language].monthsShort[date.getUTCMonth()],
					MM: dates[language].months[date.getUTCMonth()],
					yy: date.getUTCFullYear().toString().substring(2),
					yyyy: date.getUTCFullYear()
				};
				val.dd = (val.d < 10 ? '0' : '') + val.d;
				val.mm = (val.m < 10 ? '0' : '') + val.m;
				var date = [],
					seps = $.extend([], format.separators);
				for (var i=0, cnt = format.parts.length; i <= cnt; i++) {
					if (seps.length)
						date.push(seps.shift());
					date.push(val[format.parts[i]]);
				}
				return date.join('');
			},
			headTemplate: '<thead>'+
								'<tr>'+
									'<th class="prev"><i class="icon-arrow-left"/></th>'+
									'<th colspan="5" class="datepicker-switch"></th>'+
									'<th class="next"><i class="icon-arrow-right"/></th>'+
								'</tr>'+
							'</thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
			footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
		};
		DPGlobal.template = '<div class="datepicker">'+
								'<div class="datepicker-days">'+
									'<table class=" table-condensed">'+
										DPGlobal.headTemplate+
										'<tbody></tbody>'+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-months">'+
									'<table class="table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-years">'+
									'<table class="table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
							'</div>';

		$.fn.datepicker.DPGlobal = DPGlobal;


		/* DATEPICKER NO CONFLICT
		* =================== */

		$.fn.datepicker.noConflict = function(){
			$.fn.datepicker = old;
			return this;
		};


		/* DATEPICKER DATA-API
		* ================== */

		$(document).on(
			'focus.datepicker.data-api click.datepicker.data-api',
			'[data-provide="datepicker"]',
			function(e){
				var $this = $(this);
				if ($this.data('datepicker')) return;
				e.preventDefault();
				// component click requires us to explicitly show it
				datepicker.call($this, 'show');
			}
		);
		$(function(){
			//$('[data-provide="datepicker-inline"]').datepicker();
	        //vit: changed to support noConflict()
	        datepicker.call($('[data-provide="datepicker-inline"]'));
		});

	}( __webpack_provided_window_dot_jQuery ));

	/**
	Bootstrap-datepicker.  
	Description and examples: https://github.com/eternicode/bootstrap-datepicker.  
	For **i18n** you should include js file from here: https://github.com/eternicode/bootstrap-datepicker/tree/master/js/locales
	and set `language` option.  
	Since 1.4.0 date has different appearance in **popup** and **inline** modes. 

	@class date
	@extends abstractinput
	@final
	@example
	<a href="#" id="dob" data-type="date" data-pk="1" data-url="/post" data-title="Select date">15/05/1984</a>
	<script>
	$(function(){
	    $('#dob').editable({
	        format: 'yyyy-mm-dd',    
	        viewformat: 'dd/mm/yyyy',    
	        datepicker: {
	                weekStart: 1
	           }
	        }
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";
	    
	    //store bootstrap-datepicker as bdateicker to exclude conflict with jQuery UI one
	    $.fn.bdatepicker = $.fn.datepicker.noConflict();
	    if(!$.fn.datepicker) { //if there were no other datepickers, keep also original name
	        $.fn.datepicker = $.fn.bdatepicker;    
	    }    
	    
	    var Date = function (options) {
	        this.init('date', options, Date.defaults);
	        this.initPicker(options, Date.defaults);
	    };

	    $.fn.editableutils.inherit(Date, $.fn.editabletypes.abstractinput);    
	    
	    $.extend(Date.prototype, {
	        initPicker: function(options, defaults) {
	            //'format' is set directly from settings or data-* attributes

	            //by default viewformat equals to format
	            if(!this.options.viewformat) {
	                this.options.viewformat = this.options.format;
	            }
	            
	            //try parse datepicker config defined as json string in data-datepicker
	            options.datepicker = $.fn.editableutils.tryParseJson(options.datepicker, true);
	            
	            //overriding datepicker config (as by default jQuery extend() is not recursive)
	            //since 1.4 datepicker internally uses viewformat instead of format. Format is for submit only
	            this.options.datepicker = $.extend({}, defaults.datepicker, options.datepicker, {
	                format: this.options.viewformat
	            });
	            
	            //language
	            this.options.datepicker.language = this.options.datepicker.language || 'en'; 

	            //store DPglobal
	            this.dpg = $.fn.bdatepicker.DPGlobal; 

	            //store parsed formats
	            this.parsedFormat = this.dpg.parseFormat(this.options.format);
	            this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat);            
	        },
	        
	        render: function () {
	            this.$input.bdatepicker(this.options.datepicker);
	            
	            //"clear" link
	            if(this.options.clear) {
	                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
	                    e.preventDefault();
	                    e.stopPropagation();
	                    this.clear();
	                }, this));
	                
	                this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));  
	            }                
	        },
	        
	        value2html: function(value, element) {
	           var text = value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '';
	           Date.superclass.value2html.call(this, text, element); 
	        },

	        html2value: function(html) {
	            return this.parseDate(html, this.parsedViewFormat);
	        },   

	        value2str: function(value) {
	            return value ? this.dpg.formatDate(value, this.parsedFormat, this.options.datepicker.language) : '';
	        }, 

	        str2value: function(str) {
	            return this.parseDate(str, this.parsedFormat);
	        }, 

	        value2submit: function(value) {
	            return this.value2str(value);
	        },                    

	        value2input: function(value) {
	            this.$input.bdatepicker('update', value);
	        },

	        input2value: function() { 
	            return this.$input.data('datepicker').date;
	        },       

	        activate: function() {
	        },

	        clear:  function() {
	            this.$input.data('datepicker').date = null;
	            this.$input.find('.active').removeClass('active');
	            if(!this.options.showbuttons) {
	                this.$input.closest('form').submit(); 
	            }
	        },

	        autosubmit: function() {
	            this.$input.on('mouseup', '.day', function(e){
	                if($(e.currentTarget).is('.old') || $(e.currentTarget).is('.new')) {
	                    return;
	                }
	                var $form = $(this).closest('form');
	                setTimeout(function() {
	                    $form.submit();
	                }, 200);
	            });
	           //changedate is not suitable as it triggered when showing datepicker. see #149
	           /*
	           this.$input.on('changeDate', function(e){
	               var $form = $(this).closest('form');
	               setTimeout(function() {
	                   $form.submit();
	               }, 200);
	           });
	           */
	       },
	       
	       /*
	        For incorrect date bootstrap-datepicker returns current date that is not suitable
	        for datefield.
	        This function returns null for incorrect date.  
	       */
	       parseDate: function(str, format) {
	           var date = null, formattedBack;
	           if(str) {
	               date = this.dpg.parseDate(str, format, this.options.datepicker.language);
	               if(typeof str === 'string') {
	                   formattedBack = this.dpg.formatDate(date, format, this.options.datepicker.language);
	                   if(str !== formattedBack) {
	                       date = null;
	                   }
	               }
	           }
	           return date;
	       }

	    });

	    Date.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        @property tpl 
	        @default <div></div>
	        **/         
	        tpl:'<div class="editable-date well"></div>',
	        /**
	        @property inputclass 
	        @default null
	        **/
	        inputclass: null,
	        /**
	        Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
	        Possible tokens are: <code>d, dd, m, mm, yy, yyyy</code>  

	        @property format 
	        @type string
	        @default yyyy-mm-dd
	        **/
	        format:'yyyy-mm-dd',
	        /**
	        Format used for displaying date. Also applied when converting date from element's text on init.   
	        If not specified equals to <code>format</code>

	        @property viewformat 
	        @type string
	        @default null
	        **/
	        viewformat: null,
	        /**
	        Configuration of datepicker.
	        Full list of options: http://bootstrap-datepicker.readthedocs.org/en/latest/options.html

	        @property datepicker 
	        @type object
	        @default {
	            weekStart: 0,
	            startView: 0,
	            minViewMode: 0,
	            autoclose: false
	        }
	        **/
	        datepicker:{
	            weekStart: 0,
	            startView: 0,
	            minViewMode: 0,
	            autoclose: false
	        },
	        /**
	        Text shown as clear date button. 
	        If <code>false</code> clear button will not be rendered.

	        @property clear 
	        @type boolean|string
	        @default 'x clear'
	        **/
	        clear: '&times; clear'
	    });

	    $.fn.editabletypes.date = Date;

	}(__webpack_provided_window_dot_jQuery));

	/**
	Bootstrap datefield input - modification for inline mode.
	Shows normal <input type="text"> and binds popup datepicker.  
	Automatically shown in inline mode.

	@class datefield
	@extends date

	@since 1.4.0
	**/
	(function ($) {
	    "use strict";
	    
	    var DateField = function (options) {
	        this.init('datefield', options, DateField.defaults);
	        this.initPicker(options, DateField.defaults);
	    };

	    $.fn.editableutils.inherit(DateField, $.fn.editabletypes.date);    
	    
	    $.extend(DateField.prototype, {
	        render: function () {
	            this.$input = this.$tpl.find('input');
	            this.setClass();
	            this.setAttr('placeholder');
	    
	            //bootstrap-datepicker is set `bdateicker` to exclude conflict with jQuery UI one. (in date.js)        
	            this.$tpl.bdatepicker(this.options.datepicker);
	            
	            //need to disable original event handlers
	            this.$input.off('focus keydown');
	            
	            //update value of datepicker
	            this.$input.keyup($.proxy(function(){
	               this.$tpl.removeData('date');
	               this.$tpl.bdatepicker('update');
	            }, this));
	            
	        },   
	        
	       value2input: function(value) {
	           this.$input.val(value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '');
	           this.$tpl.bdatepicker('update');
	       },
	        
	       input2value: function() { 
	           return this.html2value(this.$input.val());
	       },              
	        
	       activate: function() {
	           $.fn.editabletypes.text.prototype.activate.call(this);
	       },
	       
	       autosubmit: function() {
	         //reset autosubmit to empty  
	       }
	    });
	    
	    DateField.defaults = $.extend({}, $.fn.editabletypes.date.defaults, {
	        /**
	        @property tpl 
	        **/         
	        tpl:'<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
	        /**
	        @property inputclass 
	        @default 'input-small'
	        **/         
	        inputclass: 'input-small',
	        
	        /* datepicker config */
	        datepicker: {
	            weekStart: 0,
	            startView: 0,
	            minViewMode: 0,
	            autoclose: true
	        }
	    });
	    
	    $.fn.editabletypes.datefield = DateField;

	}(__webpack_provided_window_dot_jQuery));
	/**
	Bootstrap-datetimepicker.  
	Based on [smalot bootstrap-datetimepicker plugin](https://github.com/smalot/bootstrap-datetimepicker). 
	Before usage you should manually include dependent js and css:

	    <link href="css/datetimepicker.css" rel="stylesheet" type="text/css"></link> 
	    <script src="js/bootstrap-datetimepicker.js"></script>

	For **i18n** you should include js file from here: https://github.com/smalot/bootstrap-datetimepicker/tree/master/js/locales
	and set `language` option.  

	@class datetime
	@extends abstractinput
	@final
	@since 1.4.4
	@example
	<a href="#" id="last_seen" data-type="datetime" data-pk="1" data-url="/post" title="Select date & time">15/03/2013 12:45</a>
	<script>
	$(function(){
	    $('#last_seen').editable({
	        format: 'yyyy-mm-dd hh:ii',    
	        viewformat: 'dd/mm/yyyy hh:ii',    
	        datetimepicker: {
	                weekStart: 1
	           }
	        }
	    });
	});
	</script>
	**/
	(function ($) {
	    "use strict";

	    var DateTime = function (options) {
	        this.init('datetime', options, DateTime.defaults);
	        this.initPicker(options, DateTime.defaults);
	    };

	    $.fn.editableutils.inherit(DateTime, $.fn.editabletypes.abstractinput);

	    $.extend(DateTime.prototype, {
	        initPicker: function(options, defaults) {
	            //'format' is set directly from settings or data-* attributes

	            //by default viewformat equals to format
	            if(!this.options.viewformat) {
	                this.options.viewformat = this.options.format;
	            }
	            
	            //try parse datetimepicker config defined as json string in data-datetimepicker
	            options.datetimepicker = $.fn.editableutils.tryParseJson(options.datetimepicker, true);

	            //overriding datetimepicker config (as by default jQuery extend() is not recursive)
	            //since 1.4 datetimepicker internally uses viewformat instead of format. Format is for submit only
	            this.options.datetimepicker = $.extend({}, defaults.datetimepicker, options.datetimepicker, {
	                format: this.options.viewformat
	            });

	            //language
	            this.options.datetimepicker.language = this.options.datetimepicker.language || 'en'; 

	            //store DPglobal
	            this.dpg = $.fn.datetimepicker.DPGlobal; 

	            //store parsed formats
	            this.parsedFormat = this.dpg.parseFormat(this.options.format, this.options.formatType);
	            this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat, this.options.formatType);
	        },

	        render: function () {
	            this.$input.datetimepicker(this.options.datetimepicker);

	            //adjust container position when viewMode changes
	            //see https://github.com/smalot/bootstrap-datetimepicker/pull/80
	            this.$input.on('changeMode', function(e) {
	                var f = $(this).closest('form').parent();
	                //timeout here, otherwise container changes position before form has new size
	                setTimeout(function(){
	                    f.triggerHandler('resize');
	                }, 0);
	            });

	            //"clear" link
	            if(this.options.clear) {
	                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
	                    e.preventDefault();
	                    e.stopPropagation();
	                    this.clear();
	                }, this));

	                this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));  
	            }
	        },

	        value2html: function(value, element) {
	            //formatDate works with UTCDate!
	            var text = value ? this.dpg.formatDate(this.toUTC(value), this.parsedViewFormat, this.options.datetimepicker.language, this.options.formatType) : '';
	            if(element) {
	                DateTime.superclass.value2html.call(this, text, element);
	            } else {
	                return text;
	            }
	        },

	        html2value: function(html) {
	            //parseDate return utc date!
	            var value = this.parseDate(html, this.parsedViewFormat); 
	            return value ? this.fromUTC(value) : null;
	        },

	        value2str: function(value) {
	            //formatDate works with UTCDate!
	            return value ? this.dpg.formatDate(this.toUTC(value), this.parsedFormat, this.options.datetimepicker.language, this.options.formatType) : '';
	       },

	       str2value: function(str) {
	           //parseDate return utc date!
	           var value = this.parseDate(str, this.parsedFormat);
	           return value ? this.fromUTC(value) : null;
	       },

	       value2submit: function(value) {
	           return this.value2str(value);
	       },

	       value2input: function(value) {
	           if(value) {
	             this.$input.data('datetimepicker').setDate(value);
	           }
	       },

	       input2value: function() { 
	           //date may be cleared, in that case getDate() triggers error
	           var dt = this.$input.data('datetimepicker');
	           return dt.date ? dt.getDate() : null;
	       },

	       activate: function() {
	       },

	       clear: function() {
	          this.$input.data('datetimepicker').date = null;
	          this.$input.find('.active').removeClass('active');
	          if(!this.options.showbuttons) {
	             this.$input.closest('form').submit(); 
	          }          
	       },

	       autosubmit: function() {
	           this.$input.on('mouseup', '.minute', function(e){
	               var $form = $(this).closest('form');
	               setTimeout(function() {
	                   $form.submit();
	               }, 200);
	           });
	       },

	       //convert date from local to utc
	       toUTC: function(value) {
	         return value ? new Date(value.valueOf() - value.getTimezoneOffset() * 60000) : value;  
	       },

	       //convert date from utc to local
	       fromUTC: function(value) {
	         return value ? new Date(value.valueOf() + value.getTimezoneOffset() * 60000) : value;  
	       },

	       /*
	        For incorrect date bootstrap-datetimepicker returns current date that is not suitable
	        for datetimefield.
	        This function returns null for incorrect date.  
	       */
	       parseDate: function(str, format) {
	           var date = null, formattedBack;
	           if(str) {
	               date = this.dpg.parseDate(str, format, this.options.datetimepicker.language, this.options.formatType);
	               if(typeof str === 'string') {
	                   formattedBack = this.dpg.formatDate(date, format, this.options.datetimepicker.language, this.options.formatType);
	                   if(str !== formattedBack) {
	                       date = null;
	                   } 
	               }
	           }
	           return date;
	       }

	    });

	    DateTime.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
	        /**
	        @property tpl 
	        @default <div></div>
	        **/         
	        tpl:'<div class="editable-date well"></div>',
	        /**
	        @property inputclass 
	        @default null
	        **/
	        inputclass: null,
	        /**
	        Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
	        Possible tokens are: <code>d, dd, m, mm, yy, yyyy, h, i</code>  
	        
	        @property format 
	        @type string
	        @default yyyy-mm-dd hh:ii
	        **/         
	        format:'yyyy-mm-dd hh:ii',
	        formatType:'standard',
	        /**
	        Format used for displaying date. Also applied when converting date from element's text on init.   
	        If not specified equals to <code>format</code>
	        
	        @property viewformat 
	        @type string
	        @default null
	        **/
	        viewformat: null,
	        /**
	        Configuration of datetimepicker.
	        Full list of options: https://github.com/smalot/bootstrap-datetimepicker

	        @property datetimepicker 
	        @type object
	        @default { }
	        **/
	        datetimepicker:{
	            todayHighlight: false,
	            autoclose: false
	        },
	        /**
	        Text shown as clear date button. 
	        If <code>false</code> clear button will not be rendered.

	        @property clear 
	        @type boolean|string
	        @default 'x clear'
	        **/
	        clear: '&times; clear'
	    });

	    $.fn.editabletypes.datetime = DateTime;

	}(__webpack_provided_window_dot_jQuery));
	/**
	Bootstrap datetimefield input - datetime input for inline mode.
	Shows normal <input type="text"> and binds popup datetimepicker.  
	Automatically shown in inline mode.

	@class datetimefield
	@extends datetime

	**/
	(function ($) {
	    "use strict";
	    
	    var DateTimeField = function (options) {
	        this.init('datetimefield', options, DateTimeField.defaults);
	        this.initPicker(options, DateTimeField.defaults);
	    };

	    $.fn.editableutils.inherit(DateTimeField, $.fn.editabletypes.datetime);
	    
	    $.extend(DateTimeField.prototype, {
	        render: function () {
	            this.$input = this.$tpl.find('input');
	            this.setClass();
	            this.setAttr('placeholder');
	            
	            this.$tpl.datetimepicker(this.options.datetimepicker);
	            
	            //need to disable original event handlers
	            this.$input.off('focus keydown');
	            
	            //update value of datepicker
	            this.$input.keyup($.proxy(function(){
	               this.$tpl.removeData('date');
	               this.$tpl.datetimepicker('update');
	            }, this));
	            
	        },   
	      
	       value2input: function(value) {
	           this.$input.val(this.value2html(value));
	           this.$tpl.datetimepicker('update');
	       },
	        
	       input2value: function() { 
	           return this.html2value(this.$input.val());
	       },              
	        
	       activate: function() {
	           $.fn.editabletypes.text.prototype.activate.call(this);
	       },
	       
	       autosubmit: function() {
	         //reset autosubmit to empty  
	       }
	    });
	    
	    DateTimeField.defaults = $.extend({}, $.fn.editabletypes.datetime.defaults, {
	        /**
	        @property tpl 
	        **/         
	        tpl:'<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
	        /**
	        @property inputclass 
	        @default 'input-medium'
	        **/         
	        inputclass: 'input-medium',
	        
	        /* datetimepicker config */
	        datetimepicker:{
	            todayHighlight: false,
	            autoclose: true
	        }
	    });
	    
	    $.fn.editabletypes.datetimefield = DateTimeField;

	}(__webpack_provided_window_dot_jQuery));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(1)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * Bootstrap Table Chinese translation
	 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
	 */
	(function ($) {
	    'use strict';

	    $.fn.bootstrapTable.locales['zh-CN'] = {
	        formatLoadingMessage: function () {
	            return '正在努力地加载数据中，请稍候……';
	        },
	        formatRecordsPerPage: function (pageNumber) {
	            return '每页显示 ' + pageNumber + ' 条记录';
	        },
	        formatShowingRows: function (pageFrom, pageTo, totalRows) {
	            return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
	        },
	        formatSearch: function () {
	            return '搜索';
	        },
	        formatNoMatches: function () {
	            return '没有找到匹配的记录';
	        },
	        formatPaginationSwitch: function () {
	            return '隐藏/显示分页';
	        },
	        formatRefresh: function () {
	            return '刷新';
	        },
	        formatToggle: function () {
	            return '切换';
	        },
	        formatColumns: function () {
	            return '列';
	        },
	        formatExport: function () {
	            return '导出数据';
	        },
	        formatClearFilters: function () {
	            return '清空过滤';
	        }
	    };

	    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

	})(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);