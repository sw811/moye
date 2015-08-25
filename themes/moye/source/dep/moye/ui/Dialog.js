/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/Dialog",["require","jquery","./lib","./Control","./Panel","./Mask","./painter"],function(require){var t=require("jquery"),e=require("./lib"),i=require("./Control"),n=require("./Panel"),s=require("./Mask"),a=i.extend({type:"Dialog",options:{title:"",content:"",close:"x",footer:"",width:400,mask:!0,maskClickClose:!0,hideDispose:!1,level:10,buttons:null},init:function(t){this.$parent(t),this.visible=!1},initStructure:function(){var i=this.helper,n=this.main;e.each([this.header!==!1?"header":"","content",this.footer!==!1?"footer":""],function(t){if(t){var e=this.createPanel(t).appendTo(n);this.addChild(e,t),this.helper.addPartClasses(t,e.main)}},this);var a=this.level;if(n=t(n).css("zIndex",a).appendTo(document.body),this.close!==!1)n.append(i.createPart("close","i",this.getCloseHTML(this.close),{"data-action":"close"}));if(this.mask)this.mask=s.create({skin:"dialog",level:a-1}).render()},createPanel:function(t){var e=this.id+t;return new n({id:e})},getCloseHTML:function(t){return t},initEvents:function(){if(this.delegate(this.main,"click","[data-action]",this.onMainClicked),this.mask&&this.maskClickClose)this.mask.on("click",t.proxy(this.onCloseClicked,this))},onMainClicked:function(e){var i=t(e.currentTarget),n=i.data("action");if("close"===n)return void this.onCloseClicked();else return void this.fire(n,{target:i[0]})},onCloseClicked:function(){var t=this.fire("hide");if(!t.isDefaultPrevented())this.hide()},repaint:require("./painter").createRepaint(i.prototype.repaint,{name:["width","height"],paint:function(i,n,s){var a=t(this.main);n=this.width=parseInt(n,10)||a.width(),s=this.height=parseInt(s,10)||a.height(),t(this.main).css({width:n+"px",marginLeft:-n/2+"px",marginTop:-s/2+"px"}),e.fixed(this.main,{top:"50%",left:"50%"})}},{name:["title"],paint:function(t,e){var i=this.getChild("header");if(i)i.set("content",e)}},{name:["content"],paint:function(t,e){this.getChild("content").set("content",e)}},{name:["footer","buttons"],paint:function(t,i,n){var s=this.getChild("footer");if(s){var a="";if(i)a=i;else if(n&&n.length){a=e.map(n,function(t){var e=t.part,i=this.helper.getPartId("button-"+t.part);return this.helper.getPartHTML("button-"+e,"button",t.text,{"data-action":e,"data-ui-id":i})},this).join("");var r=e.reduce(n,function(t,i){var n=i.part,s=this.helper.getPartId("button-"+n);return t[s]=e.extend({type:"Button"},i),t},{},this);this.context.fill(r)}s.set("content",a)}}},{name:["visible"],paint:function(t,e){if(e)this.addState("visible"),this.set({width:0,height:0}),this.mask&&this.mask.show();else this.removeState("visible"),this.mask&&this.mask.hide()}}),setWidth:function(t){return this.set("width",t),this},setHeight:function(t){return this.set("height",t),this},setTitle:function(t){return this.set("title",t),this},getTitle:function(){return this.helper.getPart("title")},setContent:function(t){return this.set("content",t),this},getContent:function(){return this.helper.getPart("body")},setFooter:function(t){return this.set("footer",t),this},getFooter:function(){return this.helper.getPart("footer")},show:function(){return this.set("visible",!0),this},hide:function(){if(this.set("visible",!1),this.hideDispose)this.dispose();return this},addFooterButton:function(t,e){var i=this.buttons||[];return this.set("buttons",i.concat({part:t,text:e})),this},getFooterButton:function(t){return this.helper.getPart(t)},dispose:function(){if(this.$parent("dispose"),this.undelegate(this.main,"click",this.onMainClicked),t(this.main).remove(),this.mask)this.mask.dispose()}});return a.Mask=s,a.DEFAULT_ALERT_OPTIONS={title:"警告",close:!1,skin:"alert",buttons:[{part:"confirm",text:"确认"}],hideDispose:!0,maskClickClose:!1},a.alert=function(i){var n=new a(e.extend({},a.DEFAULT_ALERT_OPTIONS,i)),s=new t.Deferred;return n.render().on("confirm",function(t){s.resolve(),this.hide()}).show(),s.promise()},a.DEFAULT_CONFIRM_OPTIONS={title:"请确认",close:!1,skin:"confirm",buttons:[{text:"确认",part:"confirm"},{text:"取消",part:"cancel"}],hideDispose:!0,maskClickClose:!1},a.confirm=function(i){var n=new a(e.extend({},a.DEFAULT_CONFIRM_OPTIONS,i)),s=new t.Deferred;return n.render().on("confirm",function(t){s.resolve(),this.hide()}).on("cancel",function(t){s.reject(),this.hide()}).show(),s.promise()},a});