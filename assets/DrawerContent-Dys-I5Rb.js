import{e as A,a6 as W,h as s,bs as me,ap as V,bt as ge,aM as q,bd as L,r as E,u as K,ar as ve,aD as we,B as pe,aS as ye,bu as Se,j as $,n as J,bv as U,bw as $e,p as D,bx as ze,by as Ce,bz as xe,a as i,ai as P,c as h,b as y,d as B,ba as Be,bc as ke,bb as Ee,bg as Re,f as G,b5 as _,bA as Oe,g as Te,bB as Fe,bC as Me,ah as k,t as X,aL as Y,bD as He,aJ as De}from"./index-BsKuKuBe.js";const Pe=A({name:"NDrawerContent",inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){const t=E(!!e.show),r=E(null),g=J(U);let b=0,S="",c=null;const v=E(!1),w=E(!1),z=$(()=>e.placement==="top"||e.placement==="bottom"),{mergedClsPrefixRef:R,mergedRtlRef:O}=K(e),T=ve("Drawer",O,R),C=o,f=n=>{w.value=!0,b=z.value?n.clientY:n.clientX,S=document.body.style.cursor,document.body.style.cursor=z.value?"ns-resize":"ew-resize",document.body.addEventListener("mousemove",p),document.body.addEventListener("mouseleave",C),document.body.addEventListener("mouseup",o)},M=()=>{c!==null&&(window.clearTimeout(c),c=null),w.value?v.value=!0:c=window.setTimeout(()=>{v.value=!0},300)},I=()=>{c!==null&&(window.clearTimeout(c),c=null),v.value=!1},{doUpdateHeight:j,doUpdateWidth:N}=g,F=n=>{const{maxWidth:l}=e;if(l&&n>l)return l;const{minWidth:u}=e;return u&&n<u?u:n},H=n=>{const{maxHeight:l}=e;if(l&&n>l)return l;const{minHeight:u}=e;return u&&n<u?u:n};function p(n){var l,u;if(w.value)if(z.value){let m=((l=r.value)===null||l===void 0?void 0:l.offsetHeight)||0;const x=b-n.clientY;m+=e.placement==="bottom"?x:-x,m=H(m),j(m),b=n.clientY}else{let m=((u=r.value)===null||u===void 0?void 0:u.offsetWidth)||0;const x=b-n.clientX;m+=e.placement==="right"?x:-x,m=F(m),N(m),b=n.clientX}}function o(){w.value&&(b=0,w.value=!1,document.body.style.cursor=S,document.body.removeEventListener("mousemove",p),document.body.removeEventListener("mouseup",o),document.body.removeEventListener("mouseleave",C))}we(()=>{e.show&&(t.value=!0)}),pe(()=>e.show,n=>{n||o()}),ye(()=>{o()});const a=$(()=>{const{show:n}=e,l=[[L,n]];return e.showMask||l.push([$e,e.onClickoutside,void 0,{capture:!0}]),l});function d(){var n;t.value=!1,(n=e.onAfterLeave)===null||n===void 0||n.call(e)}return Se($(()=>e.blockScroll&&t.value)),D(ze,r),D(Ce,null),D(xe,null),{bodyRef:r,rtlEnabled:T,mergedClsPrefix:g.mergedClsPrefixRef,isMounted:g.isMountedRef,mergedTheme:g.mergedThemeRef,displayed:t,transitionName:$(()=>({right:"slide-in-from-right-transition",left:"slide-in-from-left-transition",top:"slide-in-from-top-transition",bottom:"slide-in-from-bottom-transition"})[e.placement]),handleAfterLeave:d,bodyDirectives:a,handleMousedownResizeTrigger:f,handleMouseenterResizeTrigger:M,handleMouseleaveResizeTrigger:I,isDragging:w,isHoverOnResizeTrigger:v}},render(){const{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective==="show"||this.displayed||this.show?W(s("div",{role:"none"},s(me,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>s(V,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>W(s("div",ge(this.$attrs,{role:"dialog",ref:"bodyRef","aria-modal":"true",class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?s("div",{class:[`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?s("div",{class:[`${t}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:"none"},e):s(q,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),e)]),this.bodyDirectives)})})),[[L,this.displayDirective==="if"||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:Ie,cubicBezierEaseOut:je}=P;function Ne({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-bottom"}={}){return[i(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${Ie}`}),i(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${je}`}),i(`&.${r}-transition-enter-to`,{transform:"translateY(0)"}),i(`&.${r}-transition-enter-from`,{transform:"translateY(100%)"}),i(`&.${r}-transition-leave-from`,{transform:"translateY(0)"}),i(`&.${r}-transition-leave-to`,{transform:"translateY(100%)"})]}const{cubicBezierEaseIn:We,cubicBezierEaseOut:Ae}=P;function Ue({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-left"}={}){return[i(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${We}`}),i(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${Ae}`}),i(`&.${r}-transition-enter-to`,{transform:"translateX(0)"}),i(`&.${r}-transition-enter-from`,{transform:"translateX(-100%)"}),i(`&.${r}-transition-leave-from`,{transform:"translateX(0)"}),i(`&.${r}-transition-leave-to`,{transform:"translateX(-100%)"})]}const{cubicBezierEaseIn:Le,cubicBezierEaseOut:_e}=P;function Xe({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-right"}={}){return[i(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${Le}`}),i(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${_e}`}),i(`&.${r}-transition-enter-to`,{transform:"translateX(0)"}),i(`&.${r}-transition-enter-from`,{transform:"translateX(100%)"}),i(`&.${r}-transition-leave-from`,{transform:"translateX(0)"}),i(`&.${r}-transition-leave-to`,{transform:"translateX(100%)"})]}const{cubicBezierEaseIn:Ye,cubicBezierEaseOut:Ve}=P;function qe({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-top"}={}){return[i(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${Ye}`}),i(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${Ve}`}),i(`&.${r}-transition-enter-to`,{transform:"translateY(0)"}),i(`&.${r}-transition-enter-from`,{transform:"translateY(-100%)"}),i(`&.${r}-transition-leave-from`,{transform:"translateY(0)"}),i(`&.${r}-transition-leave-to`,{transform:"translateY(-100%)"})]}const Ke=i([h("drawer",`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[Xe(),Ue(),qe(),Ne(),y("unselectable",`
 user-select: none; 
 -webkit-user-select: none;
 `),y("native-scrollbar",[h("drawer-content-wrapper",`
 overflow: auto;
 height: 100%;
 `)]),B("resize-trigger",`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[y("hover",`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),h("drawer-content-wrapper",`
 box-sizing: border-box;
 `),h("drawer-content",`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[y("native-scrollbar",[h("drawer-body-content-wrapper",`
 height: 100%;
 overflow: auto;
 `)]),h("drawer-body",`
 flex: 1 0 0;
 overflow: hidden;
 `),h("drawer-body-content-wrapper",`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),h("drawer-header",`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[B("main",`
 flex: 1;
 `),B("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),h("drawer-footer",`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),y("right-placement",`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[B("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),y("left-placement",`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[B("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),y("top-placement",`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[B("resize-trigger",`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),y("bottom-placement",`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[B("resize-trigger",`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),i("body",[i(">",[h("drawer-container",`
 position: fixed;
 `)])]),h("drawer-container",`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[i("> *",`
 pointer-events: all;
 `)]),h("drawer-mask",`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[y("invisible",`
 background-color: rgba(0, 0, 0, 0)
 `),Be({enterDuration:"0.2s",leaveDuration:"0.2s",enterCubicBezier:"var(--n-bezier-in)",leaveCubicBezier:"var(--n-bezier-out)"})])]),Je=Object.assign(Object.assign({},G.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:"right"},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:"if"},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),Ze=A({name:"Drawer",inheritAttrs:!1,props:Je,setup(e){const{mergedClsPrefixRef:t,namespaceRef:r,inlineThemeDisabled:g}=K(e),b=Re(),S=G("Drawer","-drawer",Ke,Fe,e,t),c=E(e.defaultWidth),v=E(e.defaultHeight),w=_(X(e,"width"),c),z=_(X(e,"height"),v),R=$(()=>{const{placement:o}=e;return o==="top"||o==="bottom"?"":Y(w.value)}),O=$(()=>{const{placement:o}=e;return o==="left"||o==="right"?"":Y(z.value)}),T=o=>{const{onUpdateWidth:a,"onUpdate:width":d}=e;a&&k(a,o),d&&k(d,o),c.value=o},C=o=>{const{onUpdateHeight:a,"onUpdate:width":d}=e;a&&k(a,o),d&&k(d,o),v.value=o},f=$(()=>[{width:R.value,height:O.value},e.drawerStyle||""]);function M(o){const{onMaskClick:a,maskClosable:d}=e;d&&F(!1),a&&a(o)}function I(o){M(o)}const j=Oe();function N(o){var a;(a=e.onEsc)===null||a===void 0||a.call(e),e.show&&e.closeOnEsc&&Me(o)&&(j.value||F(!1))}function F(o){const{onHide:a,onUpdateShow:d,"onUpdate:show":n}=e;d&&k(d,o),n&&k(n,o),a&&!o&&k(a,o)}D(U,{isMountedRef:b,mergedThemeRef:S,mergedClsPrefixRef:t,doUpdateShow:F,doUpdateHeight:C,doUpdateWidth:T});const H=$(()=>{const{common:{cubicBezierEaseInOut:o,cubicBezierEaseIn:a,cubicBezierEaseOut:d},self:{color:n,textColor:l,boxShadow:u,lineHeight:m,headerPadding:x,footerPadding:Q,borderRadius:Z,bodyPadding:ee,titleFontSize:te,titleTextColor:re,titleFontWeight:oe,headerBorderBottom:ne,footerBorderTop:ie,closeIconColor:se,closeIconColorHover:ae,closeIconColorPressed:le,closeColorHover:de,closeColorPressed:ce,closeIconSize:ue,closeSize:he,closeBorderRadius:be,resizableTriggerColorHover:fe}}=S.value;return{"--n-line-height":m,"--n-color":n,"--n-border-radius":Z,"--n-text-color":l,"--n-box-shadow":u,"--n-bezier":o,"--n-bezier-out":d,"--n-bezier-in":a,"--n-header-padding":x,"--n-body-padding":ee,"--n-footer-padding":Q,"--n-title-text-color":re,"--n-title-font-size":te,"--n-title-font-weight":oe,"--n-header-border-bottom":ne,"--n-footer-border-top":ie,"--n-close-icon-color":se,"--n-close-icon-color-hover":ae,"--n-close-icon-color-pressed":le,"--n-close-size":he,"--n-close-color-hover":de,"--n-close-color-pressed":ce,"--n-close-icon-size":ue,"--n-close-border-radius":be,"--n-resize-trigger-color-hover":fe}}),p=g?Te("drawer",void 0,H,e):void 0;return{mergedClsPrefix:t,namespace:r,mergedBodyStyle:f,handleOutsideClick:I,handleMaskClick:M,handleEsc:N,mergedTheme:S,cssVars:g?void 0:H,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender,isMounted:b}},render(){const{mergedClsPrefix:e}=this;return s(Ee,{to:this.to,show:this.show},{default:()=>{var t;return(t=this.onRender)===null||t===void 0||t.call(this),W(s("div",{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:"none"},this.showMask?s(V,{name:"fade-in-transition",appear:this.isMounted},{default:()=>this.show?s("div",{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask==="transparent"&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,s(Pe,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[ke,{zIndex:this.zIndex,enabled:this.show}]])}})}}),Ge={title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},et=A({name:"DrawerContent",props:Ge,slots:Object,setup(){const e=J(U,null);e||De("drawer-content","`n-drawer-content` must be placed inside `n-drawer`.");const{doUpdateShow:t}=e;function r(){t(!1)}return{handleCloseClick:r,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{title:e,mergedClsPrefix:t,nativeScrollbar:r,mergedTheme:g,bodyClass:b,bodyStyle:S,bodyContentClass:c,bodyContentStyle:v,headerClass:w,headerStyle:z,footerClass:R,footerStyle:O,scrollbarProps:T,closable:C,$slots:f}=this;return s("div",{role:"none",class:[`${t}-drawer-content`,r&&`${t}-drawer-content--native-scrollbar`]},f.header||e||C?s("div",{class:[`${t}-drawer-header`,w],style:z,role:"none"},s("div",{class:`${t}-drawer-header__main`,role:"heading","aria-level":"1"},f.header!==void 0?f.header():e),C&&s(He,{onClick:this.handleCloseClick,clsPrefix:t,class:`${t}-drawer-header__close`,absolute:!0})):null,r?s("div",{class:[`${t}-drawer-body`,b],style:S,role:"none"},s("div",{class:[`${t}-drawer-body-content-wrapper`,c],style:v,role:"none"},f)):s(q,Object.assign({themeOverrides:g.peerOverrides.Scrollbar,theme:g.peers.Scrollbar},T,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,c],contentStyle:v}),f),f.footer?s("div",{class:[`${t}-drawer-footer`,R],style:O,role:"none"},f.footer()):null)}});export{et as N,Ze as a};
