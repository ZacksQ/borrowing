(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{146:function(_,e,t){var a=t(21)("iterator"),r=!1;try{var l=[7][a]();l.return=function(){r=!0},Array.from(l,function(){throw 2})}catch(_){}_.exports=function(_,e){if(!e&&!r)return!1;var t=!1;try{var l=[7],n=l[a]();n.next=function(){return{done:t=!0}},l[a]=function(){return n},_(l)}catch(_){}return t}},147:function(_,e,t){var a=t(57),r=t(21)("toStringTag"),l="Arguments"==a(function(){return arguments}());_.exports=function(_){var e,t,n;return void 0===_?"Undefined":null===_?"Null":"string"==typeof(t=function(_,e){try{return _[e]}catch(_){}}(e=Object(_),r))?t:l?a(e):"Object"==(n=a(e))&&"function"==typeof e.callee?"Arguments":n}},148:function(_,e,t){var a=t(147),r=t(21)("iterator"),l=t(37);_.exports=t(23).getIteratorMethod=function(_){if(void 0!=_)return _[r]||_["@@iterator"]||l[a(_)]}},149:function(_,e,t){"use strict";var a=t(25),r=t(38);_.exports=function(_,e,t){e in _?a.f(_,e,r(0,t)):_[e]=t}},150:function(_,e,t){var a=t(37),r=t(21)("iterator"),l=Array.prototype;_.exports=function(_){return void 0!==_&&(a.Array===_||l[r]===_)}},151:function(_,e,t){var a=t(32);_.exports=function(_,e,t,r){try{return r?e(a(t)[0],t[1]):e(t)}catch(e){var l=_.return;throw void 0!==l&&a(l.call(_)),e}}},152:function(_,e,t){"use strict";var a=t(58),r=t(27),l=t(56),n=t(151),o=t(150),i=t(86),s=t(149),E=t(148);r(r.S+r.F*!t(146)(function(_){Array.from(_)}),"Array",{from:function(_){var e,t,r,u,c=l(_),d="function"==typeof this?this:Array,p=arguments.length,P=p>1?arguments[1]:void 0,O=void 0!==P,M=0,D=E(c);if(O&&(P=a(P,p>2?arguments[2]:void 0,2)),void 0==D||d==Array&&o(D))for(t=new d(e=i(c.length));e>M;M++)s(t,M,O?P(c[M],M):c[M]);else for(u=D.call(c),t=new d;!(r=u.next()).done;M++)s(t,M,O?n(u,P,[r.value,M],!0):r.value);return t.length=M,t}})},153:function(_,e,t){t(87),t(152),_.exports=t(23).Array.from},154:function(_,e,t){_.exports={default:t(153),__esModule:!0}},190:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"default",function(){return WorkFlowStep3});var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9),babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__),babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(12),babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__),babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(83),babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__),babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6),babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__),babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(7),babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__),babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(4),babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__),babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5),babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__),react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__),_comps_index__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(1),_workflow_scss__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(31),_workflow_scss__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(_workflow_scss__WEBPACK_IMPORTED_MODULE_9__),_helper_helper__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(2),qs__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(16),qs__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_11__);!function(){var _=__webpack_require__(3).enterModule;_&&_(module)}();var cl=_helper_helper__WEBPACK_IMPORTED_MODULE_10__.c.get("LoansPlatform/city_list"),job=[[{value:3,label:"个体/企业主"},{value:1,label:"上班族"},{value:2,label:"学生"},{value:4,label:"无固定职业/其他"}]],degree=[{value:"00",label:"初中及以下"},{value:"01",label:"高中"},{value:"05",label:"中专"},{value:"02",label:"大专"},{value:"03",label:"本科"},{value:"04",label:"硕士"},{value:"06",label:"博士"}],industry=[{value:1,label:"金融"},{value:2,label:"房地产/建筑"},{value:3,label:"互联网/计算机"},{value:4,label:"通讯"},{value:5,label:"服务/教育培训"},{value:6,label:"政府机关/非盈利机构"},{value:7,label:"制造业"},{value:8,label:"零售"},{value:9,label:"广告业"},{value:10,label:"贸易"},{value:11,label:"医疗"},{value:12,label:"物流/运输"}],httpdata=_helper_helper__WEBPACK_IMPORTED_MODULE_10__.c.get("LoansDispatch/saveLoanInfo"),WorkFlowStep3=function(_Component){function WorkFlowStep3(){var _,e,t,a;babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this,WorkFlowStep3);for(var r=arguments.length,l=Array(r),n=0;n<r;n++)l[n]=arguments[n];return e=t=babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this,(_=WorkFlowStep3.__proto__||Object.getPrototypeOf(WorkFlowStep3)).call.apply(_,[this].concat(l))),t.state={job:[1],degree:[1],industry:[1],district:[],districtdata:[],company:"",addressdetail:"",mail:"",income:""},a=e,babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(t,a)}return babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(WorkFlowStep3,_Component),babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(WorkFlowStep3,[{key:"componentDidMount",value:function(){var _=this;Object(_helper_helper__WEBPACK_IMPORTED_MODULE_10__.g)("工作信息认证"),cl.then(function(e){0==e.data.code&&_.setState({districtdata:[].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(e.data.data))})}),httpdata.then(function(e){if(0==e.data.code){var t=e.data.data;_.setState({company_name:t.company_name,mail:t.email,income:t.income})}})}},{key:"render",value:function(){var _,e,t=this;return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{className:"workflow step3"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.n,{step:3}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.i,{style:{backgroundColor:"white"},className:"picker-list"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.m,{data:job,title:"职业身份",cascade:!1,value:this.state.job,onOk:function(_){t.setState({job:_});var e=t.refs;2==_[0]?(e.industry.style.display="none",e.company.style.display="none",e.address.style.display="none",e.addressdetail.style.display="none",e.tel.style.display="none",e.income.style.display="none"):(e.industry.style="block",e.company.style="block",e.address.style="block",e.addressdetail.style="block",e.tel.style="block",e.income.style="block")},cols:1}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.m,{data:degree,title:"学历",value:this.state.degree,onOk:function(_){return t.setState({degree:_})},cols:1}),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{ref:"industry"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.m,{data:industry,title:"所属行业",value:this.state.industry,onOk:function(_){return t.setState({industry:_})},cols:1})),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{ref:"company"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.h,(_={label:"公司名称",ref:"companyvalue",placeholder:"请输入公司全称"},babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_,"ref","companyvalue"),babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_,"value",this.state.company_name),babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_,"onChange",function(_){t.setState({company_name:_})}),_))),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{ref:"address"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.m,{data:this.state.districtdata,title:"公司地址",value:this.state.district,onOk:function(_){t.setState({district:_})},onDismiss:function(_){return console.log("dismiss",_)}})),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{ref:"addressdetail"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.h,{label:"详细地址",placeholder:"街道、楼牌号等",maxLength:"19",ref:"addressdetailvalue",value:this.state.company_address,onChange:function(_){t.setState({company_address:_})}})),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{ref:"tel"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.h,{label:"公司电话",dou:!0,first:{placeholder:"区号",type:"tel",maxLength:"4"},second:{placeholder:"固话号码",type:"tel",maxLength:"8"},ref:"telvalue"})),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{ref:"income"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.h,{label:"月收入",placeholder:"输入金额",type:"number",ref:"incomevalue",value:this.state.income,onChange:function(_){t.setState({income:_})}})),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.h,(e={label:"工作邮箱",placeholder:"输入工作邮箱",ref:"email"},babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(e,"ref","emailvalue"),babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(e,"value",this.state.mail),babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(e,"onChange",function(_){t.setState({mail:_})}),e))),react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div",{className:"wrap"},react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_8__.b,{onClick:function(){Object(_helper_helper__WEBPACK_IMPORTED_MODULE_10__.h)("工作信息下一步被点击","loan-wf3v1");var _=t.refs,e={work_type:t.state.job[0],degree:t.state.degree[0],work_email:_.emailvalue.getvalue()};if(2!=e.work_type){if((e=babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({},e,{work_attribute:t.state.industry[0],company_name:_.companyvalue.getvalue(),company_address:t.state.district.toString(),company_detail_address:_.addressdetailvalue.getvalue(),income:_.incomevalue.getvalue(),company_phone:_.telvalue.getvalue()})).company_name.length<3||e.company_name.length>40)return _comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail("公司名称有误，请重新输入"),!1;var a=e.company_detail_address.match(/(号|区|路|镇|市|村|街|县|单元|栋|楼|室|巷|组|苑|园|里|幢|弄|房|座|大厦|户|排|屯|广场|中心|大学|百货|大道|城)/g);if(null==a||a.length<2)return _comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail("地址格式有误，请重新输入"),!1;if(""==e.income)return _comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail("月收入不能为空"),!1;if(""==e.company_address)return _comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail("公司地址不能为空"),!1}return""==e.work_email?(_comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail("邮箱不能为空"),!1):/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.work_email)?void _helper_helper__WEBPACK_IMPORTED_MODULE_10__.c.post("LoansDispatch/saveLoanInfo",qs__WEBPACK_IMPORTED_MODULE_11___default.a.stringify(e)).then(function(_){0==_.data.code?t.props.history.push("./workflowstep4"):_comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail(_.data.message)}):(_comps_index__WEBPACK_IMPORTED_MODULE_8__.a.fail("邮箱格式有误，请重新输入"),!1)}})))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),WorkFlowStep3}(react__WEBPACK_IMPORTED_MODULE_7__.Component);!function(){var _=__webpack_require__(3).default,e=__webpack_require__(3).leaveModule;_&&(_.register(cl,"cl","E:/Project/long/src/views/workflow/workflowstep3.js"),_.register(job,"job","E:/Project/long/src/views/workflow/workflowstep3.js"),_.register(degree,"degree","E:/Project/long/src/views/workflow/workflowstep3.js"),_.register(industry,"industry","E:/Project/long/src/views/workflow/workflowstep3.js"),_.register(httpdata,"httpdata","E:/Project/long/src/views/workflow/workflowstep3.js"),_.register(WorkFlowStep3,"WorkFlowStep3","E:/Project/long/src/views/workflow/workflowstep3.js"),e(module))}()}.call(this,__webpack_require__(10)(module))},31:function(_,e){},83:function(_,e,t){"use strict";e.__esModule=!0;var a=function(_){return _&&_.__esModule?_:{default:_}}(t(154));e.default=function(_){if(Array.isArray(_)){for(var e=0,t=Array(_.length);e<_.length;e++)t[e]=_[e];return t}return(0,a.default)(_)}}}]);