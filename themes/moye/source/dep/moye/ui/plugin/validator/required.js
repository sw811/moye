/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/plugin/validator/required",["require","../../lib","../ValidityState","../ValidateRule"],function(require){var t=require("../../lib"),e=require("../ValidityState"),i=require("../ValidateRule");i.register("required",{check:function(i,n){if(t.isNumber(i))i=""+i;var r=!!i;return new e(r,this.getMessage(n,r))},message:{invalid:"请填写!{title}"}})});