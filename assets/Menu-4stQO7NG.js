import{e as B,h as d,b8 as Ke,ck as Ve,an as De,cl as pe,k as Y,c as u,b as S,aM as ye,u as Q,f as K,cm as ze,g as ee,j as b,r as F,p as U,d as s,a as z,aa as Ie,aL as te,b5 as ie,n as j,ah as $,t as J,aw as q,aY as Ue,bG as D,ad as se,b1 as le,I as Ge,ae as re,am as qe,aT as Ye,aD as be,b7 as We,bt as Xe,cn as Ze}from"./index-BsKuKuBe.js";import{C as Je,N as Qe}from"./Dropdown-CcmdnIk3.js";import{N as eo}from"./Tooltip-XZFA5Owl.js";import{V as oo,c as ne}from"./create-Bj8PAPmY.js";import{u as to}from"./use-compitable-BjMNwQgq.js";const ro=B({name:"ChevronDownFilled",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}});function no(e){const{baseColor:t,textColor2:r,bodyColor:l,cardColor:a,dividerColor:i,actionColor:h,scrollbarColor:m,scrollbarColorHover:c,invertedColor:p}=e;return{textColor:r,textColorInverted:"#FFF",color:l,colorEmbedded:h,headerColor:a,headerColorInverted:p,footerColor:h,footerColorInverted:p,headerBorderColor:i,headerBorderColorInverted:p,footerBorderColor:i,footerBorderColorInverted:p,siderBorderColor:i,siderBorderColorInverted:p,siderColor:a,siderColorInverted:p,siderToggleButtonBorder:`1px solid ${i}`,siderToggleButtonColor:t,siderToggleButtonIconColor:r,siderToggleButtonIconColorInverted:r,siderToggleBarColor:pe(l,m),siderToggleBarColorHover:pe(l,c),__invertScrollbar:"true"}}const de=Ke({name:"Layout",common:De,peers:{Scrollbar:Ve},self:no}),Se=Y("n-layout-sider"),ue={type:String,default:"static"},io=u("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[u("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),S("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),lo={embedded:Boolean,position:ue,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},we=Y("n-layout");function Re(e){return B({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},K.props),lo),setup(t){const r=F(null),l=F(null),{mergedClsPrefixRef:a,inlineThemeDisabled:i}=Q(t),h=K("Layout","-layout",io,de,t,a);function m(I,w){if(t.nativeScrollbar){const{value:N}=r;N&&(w===void 0?N.scrollTo(I):N.scrollTo(I,w))}else{const{value:N}=l;N&&N.scrollTo(I,w)}}U(we,t);let c=0,p=0;const O=I=>{var w;const N=I.target;c=N.scrollLeft,p=N.scrollTop,(w=t.onScroll)===null||w===void 0||w.call(t,I)};ze(()=>{if(t.nativeScrollbar){const I=r.value;I&&(I.scrollTop=p,I.scrollLeft=c)}});const H={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},f={scrollTo:m},A=b(()=>{const{common:{cubicBezierEaseInOut:I},self:w}=h.value;return{"--n-bezier":I,"--n-color":t.embedded?w.colorEmbedded:w.color,"--n-text-color":w.textColor}}),T=i?ee("layout",b(()=>t.embedded?"e":""),A,t):void 0;return Object.assign({mergedClsPrefix:a,scrollableElRef:r,scrollbarInstRef:l,hasSiderStyle:H,mergedTheme:h,handleNativeElScroll:O,cssVars:i?void 0:A,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender},f)},render(){var t;const{mergedClsPrefix:r,hasSider:l}=this;(t=this.onRender)===null||t===void 0||t.call(this);const a=l?this.hasSiderStyle:void 0,i=[this.themeClass,e&&`${r}-layout-content`,`${r}-layout`,`${r}-layout--${this.position}-positioned`];return d("div",{class:i,style:this.cssVars},this.nativeScrollbar?d("div",{ref:"scrollableElRef",class:[`${r}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,a],onScroll:this.handleNativeElScroll},this.$slots):d(ye,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,a]}),this.$slots))}})}const To=Re(!1),No=Re(!0),ao=u("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[S("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),S("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),co={position:ue,inverted:Boolean,bordered:{type:Boolean,default:!1}},Ao=B({name:"LayoutHeader",props:Object.assign(Object.assign({},K.props),co),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:r}=Q(e),l=K("Layout","-layout-header",ao,de,e,t),a=b(()=>{const{common:{cubicBezierEaseInOut:h},self:m}=l.value,c={"--n-bezier":h};return e.inverted?(c["--n-color"]=m.headerColorInverted,c["--n-text-color"]=m.textColorInverted,c["--n-border-color"]=m.headerBorderColorInverted):(c["--n-color"]=m.headerColor,c["--n-text-color"]=m.textColor,c["--n-border-color"]=m.headerBorderColor),c}),i=r?ee("layout-header",b(()=>e.inverted?"a":"b"),a,e):void 0;return{mergedClsPrefix:t,cssVars:r?void 0:a,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),so=u("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[S("bordered",[s("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),s("left-placement",[S("bordered",[s("border",`
 right: 0;
 `)])]),S("right-placement",`
 justify-content: flex-start;
 `,[S("bordered",[s("border",`
 left: 0;
 `)]),S("collapsed",[u("layout-toggle-button",[u("base-icon",`
 transform: rotate(180deg);
 `)]),u("layout-toggle-bar",[z("&:hover",[s("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),s("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),u("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[u("base-icon",`
 transform: rotate(0);
 `)]),u("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[z("&:hover",[s("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),s("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),S("collapsed",[u("layout-toggle-bar",[z("&:hover",[s("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),s("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),u("layout-toggle-button",[u("base-icon",`
 transform: rotate(0);
 `)])]),u("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[u("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),u("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[s("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),s("bottom",`
 position: absolute;
 top: 34px;
 `),z("&:hover",[s("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),s("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),s("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),z("&:hover",[s("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),s("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),u("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),S("show-content",[u("layout-sider-scroll-container",{opacity:1})]),S("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),uo=B({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},d("div",{class:`${e}-layout-toggle-bar__top`}),d("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),vo=B({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},d(Ie,{clsPrefix:e},{default:()=>d(Je,null)}))}}),ho={position:ue,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},Ho=B({name:"LayoutSider",props:Object.assign(Object.assign({},K.props),ho),setup(e){const t=j(we),r=F(null),l=F(null),a=F(e.defaultCollapsed),i=ie(J(e,"collapsed"),a),h=b(()=>te(i.value?e.collapsedWidth:e.width)),m=b(()=>e.collapseMode!=="transform"?{}:{minWidth:te(e.width)}),c=b(()=>t?t.siderPlacement:"left");function p(P,C){if(e.nativeScrollbar){const{value:y}=r;y&&(C===void 0?y.scrollTo(P):y.scrollTo(P,C))}else{const{value:y}=l;y&&y.scrollTo(P,C)}}function O(){const{"onUpdate:collapsed":P,onUpdateCollapsed:C,onExpand:y,onCollapse:M}=e,{value:L}=i;C&&$(C,!L),P&&$(P,!L),a.value=!L,L?y&&$(y):M&&$(M)}let H=0,f=0;const A=P=>{var C;const y=P.target;H=y.scrollLeft,f=y.scrollTop,(C=e.onScroll)===null||C===void 0||C.call(e,P)};ze(()=>{if(e.nativeScrollbar){const P=r.value;P&&(P.scrollTop=f,P.scrollLeft=H)}}),U(Se,{collapsedRef:i,collapseModeRef:J(e,"collapseMode")});const{mergedClsPrefixRef:T,inlineThemeDisabled:I}=Q(e),w=K("Layout","-layout-sider",so,de,e,T);function N(P){var C,y;P.propertyName==="max-width"&&(i.value?(C=e.onAfterLeave)===null||C===void 0||C.call(e):(y=e.onAfterEnter)===null||y===void 0||y.call(e))}const G={scrollTo:p},_=b(()=>{const{common:{cubicBezierEaseInOut:P},self:C}=w.value,{siderToggleButtonColor:y,siderToggleButtonBorder:M,siderToggleBarColor:L,siderToggleBarColorHover:oe}=C,k={"--n-bezier":P,"--n-toggle-button-color":y,"--n-toggle-button-border":M,"--n-toggle-bar-color":L,"--n-toggle-bar-color-hover":oe};return e.inverted?(k["--n-color"]=C.siderColorInverted,k["--n-text-color"]=C.textColorInverted,k["--n-border-color"]=C.siderBorderColorInverted,k["--n-toggle-button-icon-color"]=C.siderToggleButtonIconColorInverted,k.__invertScrollbar=C.__invertScrollbar):(k["--n-color"]=C.siderColor,k["--n-text-color"]=C.textColor,k["--n-border-color"]=C.siderBorderColor,k["--n-toggle-button-icon-color"]=C.siderToggleButtonIconColor),k}),E=I?ee("layout-sider",b(()=>e.inverted?"a":"b"),_,e):void 0;return Object.assign({scrollableElRef:r,scrollbarInstRef:l,mergedClsPrefix:T,mergedTheme:w,styleMaxWidth:h,mergedCollapsed:i,scrollContainerStyle:m,siderPlacement:c,handleNativeElScroll:A,handleTransitionend:N,handleTriggerClick:O,inlineThemeDisabled:I,cssVars:_,themeClass:E==null?void 0:E.themeClass,onRender:E==null?void 0:E.onRender},G)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:r,showTrigger:l}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,r&&`${t}-layout-sider--collapsed`,(!r||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:te(this.width)}]},this.nativeScrollbar?d("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):d(ye,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),l?l==="bar"?d(uo,{clsPrefix:t,class:r?this.collapsedTriggerClass:this.triggerClass,style:r?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):d(vo,{clsPrefix:t,class:r?this.collapsedTriggerClass:this.triggerClass,style:r?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?d("div",{class:`${t}-layout-sider__border`}):null)}}),W=Y("n-menu"),Pe=Y("n-submenu"),ve=Y("n-menu-item-group"),xe=[z("&::before","background-color: var(--n-item-color-hover);"),s("arrow",`
 color: var(--n-arrow-color-hover);
 `),s("icon",`
 color: var(--n-item-icon-color-hover);
 `),u("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[z("a",`
 color: var(--n-item-text-color-hover);
 `),s("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Ce=[s("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),u("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[z("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),s("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],mo=z([u("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[S("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[u("submenu","margin: 0;"),u("menu-item","margin: 0;"),u("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[z("&::before","display: none;"),S("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),u("menu-item-content",[S("selected",[s("icon","color: var(--n-item-icon-color-active-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[z("a","color: var(--n-item-text-color-active-horizontal);"),s("extra","color: var(--n-item-text-color-active-horizontal);")])]),S("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[z("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),s("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),s("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),q("disabled",[q("selected, child-active",[z("&:focus-within",Ce)]),S("selected",[V(null,[s("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[z("a","color: var(--n-item-text-color-active-hover-horizontal);"),s("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),S("child-active",[V(null,[s("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[z("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),s("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),V("border-bottom: 2px solid var(--n-border-color-horizontal);",Ce)]),u("menu-item-content-header",[z("a","color: var(--n-item-text-color-horizontal);")])])]),q("responsive",[u("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),S("collapsed",[u("menu-item-content",[S("selected",[z("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),u("menu-item-content-header","opacity: 0;"),s("arrow","opacity: 0;"),s("icon","color: var(--n-item-icon-color-collapsed);")])]),u("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),u("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z("> *","z-index: 1;"),z("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),S("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),S("collapsed",[s("arrow","transform: rotate(0);")]),S("selected",[z("&::before","background-color: var(--n-item-color-active);"),s("arrow","color: var(--n-arrow-color-active);"),s("icon","color: var(--n-item-icon-color-active);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[z("a","color: var(--n-item-text-color-active);"),s("extra","color: var(--n-item-text-color-active);")])]),S("child-active",[u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[z("a",`
 color: var(--n-item-text-color-child-active);
 `),s("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),s("arrow",`
 color: var(--n-arrow-color-child-active);
 `),s("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),q("disabled",[q("selected, child-active",[z("&:focus-within",xe)]),S("selected",[V(null,[s("arrow","color: var(--n-arrow-color-active-hover);"),s("icon","color: var(--n-item-icon-color-active-hover);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[z("a","color: var(--n-item-text-color-active-hover);"),s("extra","color: var(--n-item-text-color-active-hover);")])])]),S("child-active",[V(null,[s("arrow","color: var(--n-arrow-color-child-active-hover);"),s("icon","color: var(--n-item-icon-color-child-active-hover);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[z("a","color: var(--n-item-text-color-child-active-hover);"),s("extra","color: var(--n-item-text-color-child-active-hover);")])])]),S("selected",[V(null,[z("&::before","background-color: var(--n-item-color-active-hover);")])]),V(null,xe)]),s("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),s("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),u("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[z("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[z("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),s("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),u("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[u("menu-item-content",`
 height: var(--n-item-height);
 `),u("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[Ue({duration:".2s"})])]),u("menu-item-group",[u("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),u("menu-tooltip",[z("a",`
 color: inherit;
 text-decoration: none;
 `)]),u("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function V(e,t){return[S("hover",e,t),z("&:hover",e,t)]}const Te=B({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=j(W);return{menuProps:t,style:b(()=>{const{paddingLeft:r}=e;return{paddingLeft:r&&`${r}px`}}),iconStyle:b(()=>{const{maxIconSize:r,activeIconSize:l,iconMarginRight:a}=e;return{width:`${r}px`,height:`${r}px`,fontSize:`${l}px`,marginRight:`${a}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:r,renderLabel:l,renderExtra:a,expandIcon:i}}=this,h=r?r(t.rawNode):D(this.icon);return d("div",{onClick:m=>{var c;(c=this.onClick)===null||c===void 0||c.call(this,m)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},h&&d("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[h]),d("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:l?l(t.rawNode):D(this.title),this.extra||a?d("span",{class:`${e}-menu-item-content-header__extra`}," ",a?a(t.rawNode):D(this.extra)):null),this.showArrow?d(Ie,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>i?i(t.rawNode):d(ro,null)}):null)}}),Z=8;function he(e){const t=j(W),{props:r,mergedCollapsedRef:l}=t,a=j(Pe,null),i=j(ve,null),h=b(()=>r.mode==="horizontal"),m=b(()=>h.value?r.dropdownPlacement:"tmNodes"in e?"right-start":"right"),c=b(()=>{var f;return Math.max((f=r.collapsedIconSize)!==null&&f!==void 0?f:r.iconSize,r.iconSize)}),p=b(()=>{var f;return!h.value&&e.root&&l.value&&(f=r.collapsedIconSize)!==null&&f!==void 0?f:r.iconSize}),O=b(()=>{if(h.value)return;const{collapsedWidth:f,indent:A,rootIndent:T}=r,{root:I,isGroup:w}=e,N=T===void 0?A:T;return I?l.value?f/2-c.value/2:N:i&&typeof i.paddingLeftRef.value=="number"?A/2+i.paddingLeftRef.value:a&&typeof a.paddingLeftRef.value=="number"?(w?A/2:A)+a.paddingLeftRef.value:0}),H=b(()=>{const{collapsedWidth:f,indent:A,rootIndent:T}=r,{value:I}=c,{root:w}=e;return h.value||!w||!l.value?Z:(T===void 0?A:T)+I+Z-(f+I)/2});return{dropdownPlacement:m,activeIconSize:p,maxIconSize:c,paddingLeft:O,iconMarginRight:H,NMenu:t,NSubmenu:a,NMenuOptionGroup:i}}const me={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},fo=B({name:"MenuDivider",setup(){const e=j(W),{mergedClsPrefixRef:t,isHorizontalRef:r}=e;return()=>r.value?null:d("div",{class:`${t.value}-menu-divider`})}}),Ne=Object.assign(Object.assign({},me),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),go=se(Ne),po=B({name:"MenuOption",props:Ne,setup(e){const t=he(e),{NSubmenu:r,NMenu:l,NMenuOptionGroup:a}=t,{props:i,mergedClsPrefixRef:h,mergedCollapsedRef:m}=l,c=r?r.mergedDisabledRef:a?a.mergedDisabledRef:{value:!1},p=b(()=>c.value||e.disabled);function O(f){const{onClick:A}=e;A&&A(f)}function H(f){p.value||(l.doSelect(e.internalKey,e.tmNode.rawNode),O(f))}return{mergedClsPrefix:h,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:l.mergedThemeRef,menuProps:i,dropdownEnabled:le(()=>e.root&&m.value&&i.mode!=="horizontal"&&!p.value),selected:le(()=>l.mergedValueRef.value===e.internalKey),mergedDisabled:p,handleClick:H}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:r,menuProps:{renderLabel:l,nodeProps:a}}=this,i=a==null?void 0:a(r.rawNode);return d("div",Object.assign({},i,{role:"menuitem",class:[`${e}-menu-item`,i==null?void 0:i.class]}),d(eo,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>l?l(r.rawNode):D(this.title),trigger:()=>d(Te,{tmNode:r,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Ae=Object.assign(Object.assign({},me),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),bo=se(Ae),xo=B({name:"MenuOptionGroup",props:Ae,setup(e){const t=he(e),{NSubmenu:r}=t,l=b(()=>r!=null&&r.mergedDisabledRef.value?!0:e.tmNode.disabled);U(ve,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:l});const{mergedClsPrefixRef:a,props:i}=j(W);return function(){const{value:h}=a,m=t.paddingLeft.value,{nodeProps:c}=i,p=c==null?void 0:c(e.tmNode.rawNode);return d("div",{class:`${h}-menu-item-group`,role:"group"},d("div",Object.assign({},p,{class:[`${h}-menu-item-group-title`,p==null?void 0:p.class],style:[(p==null?void 0:p.style)||"",m!==void 0?`padding-left: ${m}px;`:""]}),D(e.title),e.extra?d(Ge,null," ",D(e.extra)):null),d("div",null,e.tmNodes.map(O=>fe(O,i))))}}});function ae(e){return e.type==="divider"||e.type==="render"}function Co(e){return e.type==="divider"}function fe(e,t){const{rawNode:r}=e,{show:l}=r;if(l===!1)return null;if(ae(r))return Co(r)?d(fo,Object.assign({key:e.key},r.props)):null;const{labelField:a}=t,{key:i,level:h,isGroup:m}=e,c=Object.assign(Object.assign({},r),{title:r.title||r[a],extra:r.titleExtra||r.extra,key:i,internalKey:i,level:h,root:h===0,isGroup:m});return e.children?e.isGroup?d(xo,re(c,bo,{tmNode:e,tmNodes:e.children,key:i})):d(ce,re(c,yo,{key:i,rawNodes:r[t.childrenField],tmNodes:e.children,tmNode:e})):d(po,re(c,go,{key:i,tmNode:e}))}const He=Object.assign(Object.assign({},me),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),yo=se(He),ce=B({name:"Submenu",props:He,setup(e){const t=he(e),{NMenu:r,NSubmenu:l}=t,{props:a,mergedCollapsedRef:i,mergedThemeRef:h}=r,m=b(()=>{const{disabled:f}=e;return l!=null&&l.mergedDisabledRef.value||a.disabled?!0:f}),c=F(!1);U(Pe,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:m}),U(ve,null);function p(){const{onClick:f}=e;f&&f()}function O(){m.value||(i.value||r.toggleExpand(e.internalKey),p())}function H(f){c.value=f}return{menuProps:a,mergedTheme:h,doSelect:r.doSelect,inverted:r.invertedRef,isHorizontal:r.isHorizontalRef,mergedClsPrefix:r.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:m,mergedValue:r.mergedValueRef,childActive:le(()=>{var f;return(f=e.virtualChildActive)!==null&&f!==void 0?f:r.activePathRef.value.includes(e.internalKey)}),collapsed:b(()=>a.mode==="horizontal"?!1:i.value?!0:!r.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:b(()=>!m.value&&(a.mode==="horizontal"||i.value)),handlePopoverShowChange:H,handleClick:O}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:r,renderLabel:l}}=this,a=()=>{const{isHorizontal:h,paddingLeft:m,collapsed:c,mergedDisabled:p,maxIconSize:O,activeIconSize:H,title:f,childActive:A,icon:T,handleClick:I,menuProps:{nodeProps:w},dropdownShow:N,iconMarginRight:G,tmNode:_,mergedClsPrefix:E,isEllipsisPlaceholder:P,extra:C}=this,y=w==null?void 0:w(_.rawNode);return d("div",Object.assign({},y,{class:[`${E}-menu-item`,y==null?void 0:y.class],role:"menuitem"}),d(Te,{tmNode:_,paddingLeft:m,collapsed:c,disabled:p,iconMarginRight:G,maxIconSize:O,activeIconSize:H,title:f,extra:C,showArrow:!h,childActive:A,clsPrefix:E,icon:T,hover:N,onClick:I,isEllipsisPlaceholder:P}))},i=()=>d(qe,null,{default:()=>{const{tmNodes:h,collapsed:m}=this;return m?null:d("div",{class:`${t}-submenu-children`,role:"menu"},h.map(c=>fe(c,this.menuProps)))}});return this.root?d(Qe,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:r,renderLabel:l}),{default:()=>d("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},a(),this.isHorizontal?null:i())}):d("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},a(),i())}}),zo=Object.assign(Object.assign({},K.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),Oo=B({name:"Menu",inheritAttrs:!1,props:zo,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:r}=Q(e),l=K("Menu","-menu",mo,Ze,e,t),a=j(Se,null),i=b(()=>{var v;const{collapsed:x}=e;if(x!==void 0)return x;if(a){const{collapseModeRef:o,collapsedRef:g}=a;if(o.value==="width")return(v=g.value)!==null&&v!==void 0?v:!1}return!1}),h=b(()=>{const{keyField:v,childrenField:x,disabledField:o}=e;return ne(e.items||e.options,{getIgnored(g){return ae(g)},getChildren(g){return g[x]},getDisabled(g){return g[o]},getKey(g){var R;return(R=g[v])!==null&&R!==void 0?R:g.name}})}),m=b(()=>new Set(h.value.treeNodes.map(v=>v.key))),{watchProps:c}=e,p=F(null);c!=null&&c.includes("defaultValue")?be(()=>{p.value=e.defaultValue}):p.value=e.defaultValue;const O=J(e,"value"),H=ie(O,p),f=F([]),A=()=>{f.value=e.defaultExpandAll?h.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||h.value.getPath(H.value,{includeSelf:!1}).keyPath};c!=null&&c.includes("defaultExpandedKeys")?be(A):A();const T=to(e,["expandedNames","expandedKeys"]),I=ie(T,f),w=b(()=>h.value.treeNodes),N=b(()=>h.value.getPath(H.value).keyPath);U(W,{props:e,mergedCollapsedRef:i,mergedThemeRef:l,mergedValueRef:H,mergedExpandedKeysRef:I,activePathRef:N,mergedClsPrefixRef:t,isHorizontalRef:b(()=>e.mode==="horizontal"),invertedRef:J(e,"inverted"),doSelect:G,toggleExpand:E});function G(v,x){const{"onUpdate:value":o,onUpdateValue:g,onSelect:R}=e;g&&$(g,v,x),o&&$(o,v,x),R&&$(R,v,x),p.value=v}function _(v){const{"onUpdate:expandedKeys":x,onUpdateExpandedKeys:o,onExpandedNamesChange:g,onOpenNamesChange:R}=e;x&&$(x,v),o&&$(o,v),g&&$(g,v),R&&$(R,v),f.value=v}function E(v){const x=Array.from(I.value),o=x.findIndex(g=>g===v);if(~o)x.splice(o,1);else{if(e.accordion&&m.value.has(v)){const g=x.findIndex(R=>m.value.has(R));g>-1&&x.splice(g,1)}x.push(v)}_(x)}const P=v=>{const x=h.value.getPath(v??H.value,{includeSelf:!1}).keyPath;if(!x.length)return;const o=Array.from(I.value),g=new Set([...o,...x]);e.accordion&&m.value.forEach(R=>{g.has(R)&&!x.includes(R)&&g.delete(R)}),_(Array.from(g))},C=b(()=>{const{inverted:v}=e,{common:{cubicBezierEaseInOut:x},self:o}=l.value,{borderRadius:g,borderColorHorizontal:R,fontSize:_e,itemHeight:Me,dividerColor:je}=o,n={"--n-divider-color":je,"--n-bezier":x,"--n-font-size":_e,"--n-border-color-horizontal":R,"--n-border-radius":g,"--n-item-height":Me};return v?(n["--n-group-text-color"]=o.groupTextColorInverted,n["--n-color"]=o.colorInverted,n["--n-item-text-color"]=o.itemTextColorInverted,n["--n-item-text-color-hover"]=o.itemTextColorHoverInverted,n["--n-item-text-color-active"]=o.itemTextColorActiveInverted,n["--n-item-text-color-child-active"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHoverInverted,n["--n-item-icon-color"]=o.itemIconColorInverted,n["--n-item-icon-color-hover"]=o.itemIconColorHoverInverted,n["--n-item-icon-color-active"]=o.itemIconColorActiveInverted,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHoverInverted,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActiveInverted,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHoverInverted,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsedInverted,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontalInverted,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontalInverted,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontalInverted,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontalInverted,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontalInverted,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontalInverted,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontalInverted,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontalInverted,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontalInverted,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontalInverted,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontalInverted,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontalInverted,n["--n-arrow-color"]=o.arrowColorInverted,n["--n-arrow-color-hover"]=o.arrowColorHoverInverted,n["--n-arrow-color-active"]=o.arrowColorActiveInverted,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHoverInverted,n["--n-arrow-color-child-active"]=o.arrowColorChildActiveInverted,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHoverInverted,n["--n-item-color-hover"]=o.itemColorHoverInverted,n["--n-item-color-active"]=o.itemColorActiveInverted,n["--n-item-color-active-hover"]=o.itemColorActiveHoverInverted,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsedInverted):(n["--n-group-text-color"]=o.groupTextColor,n["--n-color"]=o.color,n["--n-item-text-color"]=o.itemTextColor,n["--n-item-text-color-hover"]=o.itemTextColorHover,n["--n-item-text-color-active"]=o.itemTextColorActive,n["--n-item-text-color-child-active"]=o.itemTextColorChildActive,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveHover,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHover,n["--n-item-icon-color"]=o.itemIconColor,n["--n-item-icon-color-hover"]=o.itemIconColorHover,n["--n-item-icon-color-active"]=o.itemIconColorActive,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHover,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActive,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHover,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsed,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontal,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontal,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontal,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontal,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontal,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontal,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontal,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontal,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontal,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontal,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontal,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontal,n["--n-arrow-color"]=o.arrowColor,n["--n-arrow-color-hover"]=o.arrowColorHover,n["--n-arrow-color-active"]=o.arrowColorActive,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHover,n["--n-arrow-color-child-active"]=o.arrowColorChildActive,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHover,n["--n-item-color-hover"]=o.itemColorHover,n["--n-item-color-active"]=o.itemColorActive,n["--n-item-color-active-hover"]=o.itemColorActiveHover,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsed),n}),y=r?ee("menu",b(()=>e.inverted?"a":"b"),C,e):void 0,M=We(),L=F(null),oe=F(null);let k=!0;const ge=()=>{var v;k?k=!1:(v=L.value)===null||v===void 0||v.sync({showAllItemsBeforeCalculate:!0})};function Oe(){return document.getElementById(M)}const X=F(-1);function ke(v){X.value=e.options.length-v}function Be(v){v||(X.value=-1)}const Ee=b(()=>{const v=X.value;return{children:v===-1?[]:e.options.slice(v)}}),$e=b(()=>{const{childrenField:v,disabledField:x,keyField:o}=e;return ne([Ee.value],{getIgnored(g){return ae(g)},getChildren(g){return g[v]},getDisabled(g){return g[x]},getKey(g){var R;return(R=g[o])!==null&&R!==void 0?R:g.name}})}),Fe=b(()=>ne([{}]).treeNodes[0]);function Le(){var v;if(X.value===-1)return d(ce,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:Fe.value,domId:M,isEllipsisPlaceholder:!0});const x=$e.value.treeNodes[0],o=N.value,g=!!(!((v=x.children)===null||v===void 0)&&v.some(R=>o.includes(R.key)));return d(ce,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:g,tmNode:x,domId:M,rawNodes:x.rawNode.children||[],tmNodes:x.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:T,uncontrolledExpanededKeys:f,mergedExpandedKeys:I,uncontrolledValue:p,mergedValue:H,activePath:N,tmNodes:w,mergedTheme:l,mergedCollapsed:i,cssVars:r?void 0:C,themeClass:y==null?void 0:y.themeClass,overflowRef:L,counterRef:oe,updateCounter:()=>{},onResize:ge,onUpdateOverflow:Be,onUpdateCount:ke,renderCounter:Le,getCounter:Oe,onRender:y==null?void 0:y.onRender,showOption:P,deriveResponsiveState:ge}},render(){const{mergedClsPrefix:e,mode:t,themeClass:r,onRender:l}=this;l==null||l();const a=()=>this.tmNodes.map(c=>fe(c,this.$props)),h=t==="horizontal"&&this.responsive,m=()=>d("div",Xe(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,r,`${e}-menu--${t}`,h&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),h?d(oo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:a,counter:this.renderCounter}):a());return h?d(Ye,{onResize:this.onResize},{default:m}):m()}});export{Oo as N,Ho as a,Ao as b,No as c,To as d};
