(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{192:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"default",function(){return WorkFlowStep1});var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6),babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__),babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7),babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__),babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4),babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__),babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5),babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__),_comps_index__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(1),_helper_helper__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2),qs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(16),qs__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_7__),_workflow_scss__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(31),_workflow_scss__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(_workflow_scss__WEBPACK_IMPORTED_MODULE_8__);!function(){var _=__webpack_require__(3).enterModule;_&&_(module)}();for(var httpdata=_helper_helper__WEBPACK_IMPORTED_MODULE_6__.c.get("LoansDispatch/saveBaseInfo"),linesway=[{value:"DEC",label:"装修"},{value:"EDU",label:"教育"},{value:"JYDQ",label:"家用电器"},{value:"MAR",label:"婚庆"},{value:"SJSM",label:"手机数码"},{value:"TRA",label:"旅游"},{value:"JJJJ",label:"家具家居"},{value:"RENT",label:"租房"},{value:"JKYL",label:"健康医疗"},{value:"OTH",label:"其他"}],limitdays=[[{value:3,label:"3个月"},{value:4,label:"4个月"},{value:5,label:"5个月"},{value:6,label:"6个月"},{value:7,label:"7个月"},{value:8,label:"8个月"},{value:9,label:"9个月"},{value:10,label:"10个月"},{value:11,label:"11个月"},{value:12,label:"12个月"}]],amount=[[]],dis=1e3;dis<=5e4;dis+=100)amount[0].push({value:dis,label:dis+"元"});var WorkFlowStep1=function(_Component){function WorkFlowStep1(){var _,e,a,t;babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this,WorkFlowStep1);for(var l=arguments.length,r=Array(l),s=0;s<l;s++)r[s]=arguments[s];return e=a=babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this,(_=WorkFlowStep1.__proto__||Object.getPrototypeOf(WorkFlowStep1)).call.apply(_,[this].concat(r))),a.state={linesway:[],limitdays:[3],amount:[1e4]},t=e,babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(a,t)}return babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(WorkFlowStep1,_Component),babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(WorkFlowStep1,[{key:"componentDidMount",value:function(){var _=this;Object(_helper_helper__WEBPACK_IMPORTED_MODULE_6__.g)("借款信息选择"),document.querySelectorAll(".ctrl-icon")[0].addEventListener("click",function(){document.querySelectorAll(".am-list-extra")[0].click()}),document.querySelectorAll(".ctrl-icon")[1].addEventListener("click",function(){document.querySelectorAll(".am-list-extra")[1].click()}),httpdata.then(function(e){if(0==e.data.code){var a=e.data.data;a.loan_user&&_.setState({linesway:[a.loan_user]})}})}},{key:"render",value:function(){var _=this;return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"workflow"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.n,{step:1}),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"condition-pannel"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"amount"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"label"},"借款金额"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"label"},"1000~50000元"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"select heavy"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.m,{data:amount,title:"",cascade:!1,value:this.state.amount,ref:"pi",onOk:function(e){return _.setState({amount:e})},cols:1})," ",react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.f,{type:"tsz ctrl-icon",ref:"tsz"}))),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"limit-days"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"label"},"期限"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"label"},"3~12月"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"select heavy"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.m,{data:limitdays,title:"",cascade:!1,value:this.state.limitdays,onOk:function(e){return _.setState({limitdays:e})},cols:1})," ",react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.f,{type:"tsz ctrl-icon"})))),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"tip"},"实际金额、期限、费率等以审批结果为准"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.m,{data:linesway,title:"借款用途",value:this.state.linesway,cols:1,onOk:function(e){console.log(e),_.setState({linesway:e})}}),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",{className:"wrap"},react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_comps_index__WEBPACK_IMPORTED_MODULE_5__.b,{onClick:function(){if(Object(_helper_helper__WEBPACK_IMPORTED_MODULE_6__.h)("借款信息下一步被点击","loan-wf1v1"),!_.state.linesway[0])return _comps_index__WEBPACK_IMPORTED_MODULE_5__.a.fail("未选择借款用途"),!1;var e={expect_money:_.state.amount[0],expect_month_number:_.state.limitdays[0],loan_use:_.state.linesway[0]};_helper_helper__WEBPACK_IMPORTED_MODULE_6__.c.post("LoansDispatch/saveBaseInfo",qs__WEBPACK_IMPORTED_MODULE_7___default.a.stringify(e)).then(function(e){0==e.data.code?_.props.history.push("./workflowstep2"):alert(e.data.message)})}})))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),WorkFlowStep1}(react__WEBPACK_IMPORTED_MODULE_4__.Component);!function(){var _=__webpack_require__(3).default,e=__webpack_require__(3).leaveModule;_&&(_.register(httpdata,"httpdata","E:/Project/long/src/views/workflow/workflowstep1.js"),_.register(linesway,"linesway","E:/Project/long/src/views/workflow/workflowstep1.js"),_.register(limitdays,"limitdays","E:/Project/long/src/views/workflow/workflowstep1.js"),_.register(amount,"amount","E:/Project/long/src/views/workflow/workflowstep1.js"),_.register(WorkFlowStep1,"WorkFlowStep1","E:/Project/long/src/views/workflow/workflowstep1.js"),e(module))}()}.call(this,__webpack_require__(10)(module))},31:function(_,e){}}]);