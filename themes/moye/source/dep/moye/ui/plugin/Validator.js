/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/plugin/Validator",["require","jquery","./Plugin","./Validity","./ValidateRule","../lib"],function(require){var t=require("jquery"),e=require("./Plugin"),i=require("./Validity"),n=require("./ValidateRule"),r=require("../lib"),s=e.extend({$class:"Validator",options:{listen:["blur"],failEarly:!0,delay:0},activate:function(e){this.target=e,this.rules=r.map(e.rules,function(t){return new n(t)}),e.checkValidity=t.proxy(this.checkValidity,this,e);var i=e.validate=t.proxy(this.validate,this,e);if(this.delay)i=r.debounce.call(this,i,this.delay);this.listen&&r.each(this.listen,function(t){e.on(t,i)})},checkValidity:function(t){return this.check(t,!0)},validate:function(t){return this.check(t,!1)},check:function(e,n){var s=this,a=s.rules,o=a.length;if(e.isDisabled()||!o)return!0;var h=e.getValue(),l=!1,u=[],c=[],f=new i;n||s.target.fire("beforevalidate",{type:"beforevalidate",validity:f});for(var d=0;o>d;d++){var p=a[d],g=p.check(h,e);if(u.push(g),c.push(p.type),r.isPromise(g))l=!0;else if(!g.getState()&&s.failEarly)break}if(!l)return s.onValidateFinish(f,u,c,n);else return n||s.target.fire("validating",{type:"validating",validity:f}),t.when.apply(null,u).then(function(){return s.onValidateFinish(f,[].slice.call(arguments),c,n)},function(){return s.onValidateFinish(f,[].slice.call(arguments),c,n)})},onValidateFinish:function(e,i,n,s){var a=this.target;if(r.each(i,function(t,i){e.addState(n[i],t)}),!s){var o=e.getValidState(),h=new t.Event(o,{validity:e});a.fire(h);var l=new t.Event("aftervalidate",{validity:e});if(a.fire(l),!h.isDefaultPrevented()||!l.isDefaultPrevented())this.updateControlState(e)}return e.isValid()},updateControlState:function(t){var e=this.target;if(!e.isDisabled()&&!e.isReadOnly()){var i=t.isValid(),n=t.getValidState(),r=!i?"valid":"invalid";if(!e.hasState(n))e.addState(n);if(e.hasState(r))e.removeState(r)}},dispose:function(){this.target=null,this.$parent()}});return s});