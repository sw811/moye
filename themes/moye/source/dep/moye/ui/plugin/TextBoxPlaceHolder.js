/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/plugin/TextBoxPlaceHolder",["require","../lib","./Plugin","../Popup"],function(require){var t=require("../lib"),e=require("./Plugin"),i=require("../Popup"),n=e.extend({$class:"TextBoxPlaceHolder",options:{color:"#ccc"},activate:function(e){var i=t.browser.ie;if(!i||i>8)return void(e.placeholder&&$(e.input).attr("placeholder",e.placeholder));e.getPlaceHolder=$.proxy(this.getPlaceHolder,this),this.control=e,this.input=e.input;var n=e.placeholder||$(this.input).attr("placeholder");this.placeholder=n?n:"请输入",this.build();var r=this,s=e.id;$(this.input).on("blur."+s,function(t){r.isNeedToShow()?r.show():r.hide()}).on("focus."+s,function(t){r.hide()})},build:function(){var t=$(this.input),e=this,n=t.css("zIndex")||1;n+=1;var r='<div style="color:'+this.options.color+";font-size:"+t.css("fontSize")+";height:"+t.outerHeight()+"px;width:"+t.outerWidth()+"px;z-index:"+n+";line-height:"+t.outerHeight()+'px">'+this.placeholder+"</div>",s=parseInt(t.css("paddingLeft"),10)+parseInt(t.css("borderLeftWidth"),10),a=-parseInt(t.outerHeight(),10);return this.main=new i({target:t,mode:"static",content:r,offset:{x:s,y:a}}).render().show().on("click",function(t){e.hide(),e.input.focus()}),this.main.delegate(window,"resize",this.main.onWindowResize),this.control},getPlaceHolder:function(){return this.main},isNeedToShow:function(){var t=this.control;return""===t.getValue()&&!$(t.input).is(":focus")},show:function(){return this.main.show(),this.control},hide:function(){return this.main.hide(),this.control},inactivate:function(){var t=this.control,e=t.id;$(t.input).off("focus."+e).off("blur."+e),this.control=null,this.input=null,this.placeholder=null},dispose:function(){this.main.destroy(),this.$parent()}});return n});