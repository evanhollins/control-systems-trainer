(this["webpackJsonpcontrol-systems-trainer"]=this["webpackJsonpcontrol-systems-trainer"]||[]).push([[0],{160:function(module,__webpack_exports__,__webpack_require__){"use strict";var C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51),C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(52),C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(84),C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(91),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__),react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(85),react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(48),react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(57),_App_css__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(192),_App_css__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_8__),_Editor_Editor__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(163),_Graph_Graph__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(165),_Sim_Sim__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(180),_Exercises_Exercise1__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(181),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(8),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__),App=function(_React$Component){Object(C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.a)(App,_React$Component);var _super=Object(C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.a)(App);function App(_){var e;return Object(C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a)(this,App),(e=_super.call(this,_)).state={graphData:[]},e.sim=new _Sim_Sim__WEBPACK_IMPORTED_MODULE_11__.a((function(_){return e.setState({graphData:_})})),e}return Object(C_src_frc_control_systems_trainer_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a)(App,[{key:"run",value:function run(code){eval(code);var exercise=new window.CurrentExercise;this.sim.setup(exercise,5,.1),this.sim.run()}},{key:"render",value:function(){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_5__.a,{fluid:!0,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6__.a,{className:"app",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7__.a,{xs:6,className:"section editor",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_Editor_Editor__WEBPACK_IMPORTED_MODULE_9__.a,{initialValue:_Exercises_Exercise1__WEBPACK_IMPORTED_MODULE_12__.a,onRun:this.run.bind(this)})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7__.a,{xs:6,className:"section",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6__.a,{className:"preview"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6__.a,{className:"graph",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_Graph_Graph__WEBPACK_IMPORTED_MODULE_10__.a,{data:this.state.graphData})})]})]})})}}]),App}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);__webpack_exports__.a=App},163:function(_,e,t){"use strict";var r=t(51),s=t(52),a=t(84),n=t(91),c=t(0),i=t.n(c),o=t(164),u=t.n(o),E=(t(200),t(201),t(85)),p=t(48),O=t(57),l=t(119),b=(t(202),t(8)),d=function(_){Object(a.a)(t,_);var e=Object(n.a)(t);function t(_){var s;return Object(r.a)(this,t),(s=e.call(this,_)).editor=null,s}return Object(s.a)(t,[{key:"setup",value:function(_){this.editor=_,this.reset()}},{key:"reset",value:function(){this.editor.setValue(this.props.initialValue)}},{key:"render",value:function(){var _=this;return Object(b.jsxs)(E.a,{className:"editorContainer",children:[Object(b.jsxs)(p.a,{className:"justify-content-between",children:[Object(b.jsx)(O.a,{xs:"auto",children:Object(b.jsx)(l.a,{variant:"primary",onClick:this.reset.bind(this),children:"Reset"})}),Object(b.jsx)(O.a,{xs:"auto",children:Object(b.jsx)(l.a,{variant:"success",onClick:function(){return _.props.onRun(_.editor.getValue())},children:"Run"})})]}),Object(b.jsx)(p.a,{className:"editorRow",children:Object(b.jsx)(u.a,{mode:"javascript",theme:"github",name:"editor",editorProps:{$blockScrolling:!0},height:"100%",width:"100%",onLoad:this.setup.bind(this)})})]})}}]),t}(i.a.Component);e.a=d},165:function(_,e,t){"use strict";var r=t(341),s=t(342),a=t(117),n=t(118),c=t(343),i=t(94),o=t(61),u=t(8);e.a=function(_){return Object(u.jsx)("div",{children:Object(u.jsx)(r.a,{width:"100%",height:"100%",children:Object(u.jsxs)(s.a,{data:_.data,children:[Object(u.jsx)(a.a,{dataKey:"time",tickFormatter:function(_){return isNaN(_)?_:_.toFixed(2)}}),Object(u.jsx)(n.a,{}),Object(u.jsx)(c.a,{strokeDasharray:"3 3"}),Object(u.jsx)(i.a,{dataKey:"target"}),Object(u.jsx)(i.a,{dataKey:"current"}),Object(u.jsx)(o.a,{})]})})})}},180:function(_,e,t){"use strict";var r=t(51),s=t(52),a=function(){function _(e){Object(r.a)(this,_),this.updateGraphData=e}return Object(s.a)(_,[{key:"setup",value:function(_,e,t){this.exercise=_,this.durationMs=e,this.stepMs=t}},{key:"run",value:function(){this.exercise.reset();for(var _=0;_<this.durationMs;_+=this.stepMs)this.exercise.run(_);this.updateGraphData(this.exercise.data)}}]),_}();e.a=a},181:function(_,e,t){"use strict";e.a="\nclass Exercise1 {\n\n  reset() {\n    this.data = []\n  }\n\n  run(time) {\n    this.data.push({\n      time: time,\n      target: 0,\n      current: Math.sin(time)\n    })\n  }\n}\n\nwindow.CurrentExercise = Exercise1;"},191:function(_,e,t){},192:function(_,e,t){},202:function(_,e,t){},340:function(_,e,t){"use strict";t.r(e);var r=t(0),s=t.n(r),a=t(65),n=t.n(a),c=(t(191),t(160)),i=function(_){_&&_ instanceof Function&&t.e(3).then(t.bind(null,349)).then((function(e){var t=e.getCLS,r=e.getFID,s=e.getFCP,a=e.getLCP,n=e.getTTFB;t(_),r(_),s(_),a(_),n(_)}))},o=(t(339),t(8));n.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(c.a,{})}),document.getElementById("root")),i()}},[[340,1,2]]]);
//# sourceMappingURL=main.5d7d7a52.chunk.js.map