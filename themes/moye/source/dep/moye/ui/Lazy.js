/*! 2015 Baidu Inc. All Rights Reserved */
define("moye/Lazy",["require","jquery","./lib"],function(require){var t=require("jquery"),e=require("./lib"),i=function(n,s){var r=0;if(n=t(n),"none"===n.css("display"))return r;var a="offset"+e.capitalize(s||"Height");return n.children().each(function(t,e){var n=e[a];if(!n)n=i(e,s);r+=n}),r},n={compute:function(){var n={x:e.getScrollLeft(),y:e.getScrollTop()},s=this.lastScroll,r={left:n.x<s.x,top:n.y<s.y};this.lastScroll=n;var a={x:e.getViewWidth(),y:e.getViewHeight()},h=this.els;for(var o in h)if(h.hasOwnProperty(o)){var u=h[o],l=t(u[0]),c=l.offset(),p=u[2]||{};if(p.x=p.x||10,p.y=p.y||10,c.width=l.width(),c.height=l.height(),c.width>0&&0===c.height)c.height=i(u[0]);else if(0===c.width&&c.height>0)c.width=i(u[0],"Width");var d=!1,f=c.left-p.x>=n.x+a.x,g=c.top-p.y>=n.y+a.y,m=c.left+c.width+p.x<=n.x,v=c.top+p.y+c.height<=n.y;if(!(f||g||m||v)){if(!p.trigger)u[1](n,a,c,r,u[0]);d=!0}if(p.trigger)u[1](d,n,a,c,r,u)}else;},onScroll:function(){clearTimeout(this._timer),this._timer=setTimeout(this._bound.compute,this.delay),this.scrolled=!0}},s=e.newClass({type:"Lazy",tag:"data-lazy-id",initialize:function(){this.els={},this.count=0,this.delay=100,this.lastScroll={x:e.getScrollLeft(),y:e.getScrollTop()},this._bound={onScroll:t.proxy(n.onScroll,this),compute:t.proxy(n.compute,this)}},add:function(i,n,s){var r=i.getAttribute(this.tag)||e.guid();if(!this.els[r]){if(i.setAttribute(this.tag,r),this.els[r]=[i,n,s],!this.count)t(window).on("scroll",this._bound.onScroll),t(window).on("resize",this._bound.onScroll);this.count++}if(!this.scrolled)this._bound.onScroll();return this},remove:function(e){var i=e.getAttribute(this.tag);if(i in this.els)if(delete this.els[i],this.count--,!this.count)t(window).off("scroll",this.onScroll),t(window).off("resize",this.onScroll);return this}});return function(t){var e,i=function(){return e||(e=new t)};t.add=function(){return i().add.apply(e,arguments)},t.remove=function(){return i().remove.apply(e,arguments)}}(s),s});