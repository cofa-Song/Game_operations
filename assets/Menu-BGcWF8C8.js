import{f as k,h as s,a8 as Ie,at as Ue,d as ze,aQ as be,be as te,k as Y,c as v,b as w,aw as we,u as Z,g as K,bJ as Se,i as ee,j as b,r as F,p as U,e as d,a as I,aa as He,aN as re,aK as le,n as j,ag as $,t as Q,aU as q,bK as Ge,b5 as D,ad as se,bs as ae,H as qe,ae as ne,al as Ye,aT as We,ay as Ce,bE as Xe,av as Je}from"./index-IWOp6Bpn.js";import{d as Qe,t as Ze,C as eo,N as oo,a as to}from"./Dropdown-BxswUyT5.js";import{V as ro,c as ie}from"./create-CdyI-x2p.js";import{u as no}from"./use-compitable-CKz3cMxL.js";const io=k({name:"ChevronDownFilled",render(){return s("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},s("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}});function lo(e){const{baseColor:t,textColor2:o,bodyColor:n,cardColor:a,dividerColor:l,actionColor:m,scrollbarColor:h,scrollbarColorHover:c,invertedColor:f}=e;return{textColor:o,textColorInverted:"#FFF",color:n,colorEmbedded:m,headerColor:a,headerColorInverted:f,footerColor:m,footerColorInverted:f,headerBorderColor:l,headerBorderColorInverted:f,footerBorderColor:l,footerBorderColorInverted:f,siderBorderColor:l,siderBorderColorInverted:f,siderColor:a,siderColorInverted:f,siderToggleButtonBorder:`1px solid ${l}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:be(n,h),siderToggleBarColorHover:be(n,c),__invertScrollbar:"true"}}const ve=Ie({name:"Layout",common:ze,peers:{Scrollbar:Ue},self:lo});function ao(e,t,o,n){return{itemColorHoverInverted:"#0000",itemColorActiveInverted:t,itemColorActiveHoverInverted:t,itemColorActiveCollapsedInverted:t,itemTextColorInverted:e,itemTextColorHoverInverted:o,itemTextColorChildActiveInverted:o,itemTextColorChildActiveHoverInverted:o,itemTextColorActiveInverted:o,itemTextColorActiveHoverInverted:o,itemTextColorHorizontalInverted:e,itemTextColorHoverHorizontalInverted:o,itemTextColorChildActiveHorizontalInverted:o,itemTextColorChildActiveHoverHorizontalInverted:o,itemTextColorActiveHorizontalInverted:o,itemTextColorActiveHoverHorizontalInverted:o,itemIconColorInverted:e,itemIconColorHoverInverted:o,itemIconColorActiveInverted:o,itemIconColorActiveHoverInverted:o,itemIconColorChildActiveInverted:o,itemIconColorChildActiveHoverInverted:o,itemIconColorCollapsedInverted:e,itemIconColorHorizontalInverted:e,itemIconColorHoverHorizontalInverted:o,itemIconColorActiveHorizontalInverted:o,itemIconColorActiveHoverHorizontalInverted:o,itemIconColorChildActiveHorizontalInverted:o,itemIconColorChildActiveHoverHorizontalInverted:o,arrowColorInverted:e,arrowColorHoverInverted:o,arrowColorActiveInverted:o,arrowColorActiveHoverInverted:o,arrowColorChildActiveInverted:o,arrowColorChildActiveHoverInverted:o,groupTextColorInverted:n}}function co(e){const{borderRadius:t,textColor3:o,primaryColor:n,textColor2:a,textColor1:l,fontSize:m,dividerColor:h,hoverColor:c,primaryColorHover:f}=e;return Object.assign({borderRadius:t,color:"#0000",groupTextColor:o,itemColorHover:c,itemColorActive:te(n,{alpha:.1}),itemColorActiveHover:te(n,{alpha:.1}),itemColorActiveCollapsed:te(n,{alpha:.1}),itemTextColor:a,itemTextColorHover:a,itemTextColorActive:n,itemTextColorActiveHover:n,itemTextColorChildActive:n,itemTextColorChildActiveHover:n,itemTextColorHorizontal:a,itemTextColorHoverHorizontal:f,itemTextColorActiveHorizontal:n,itemTextColorActiveHoverHorizontal:n,itemTextColorChildActiveHorizontal:n,itemTextColorChildActiveHoverHorizontal:n,itemIconColor:l,itemIconColorHover:l,itemIconColorActive:n,itemIconColorActiveHover:n,itemIconColorChildActive:n,itemIconColorChildActiveHover:n,itemIconColorCollapsed:l,itemIconColorHorizontal:l,itemIconColorHoverHorizontal:f,itemIconColorActiveHorizontal:n,itemIconColorActiveHoverHorizontal:n,itemIconColorChildActiveHorizontal:n,itemIconColorChildActiveHoverHorizontal:n,itemHeight:"42px",arrowColor:a,arrowColorHover:a,arrowColorActive:n,arrowColorActiveHover:n,arrowColorChildActive:n,arrowColorChildActiveHover:n,colorInverted:"#0000",borderColorHorizontal:"#0000",fontSize:m,dividerColor:h},ao("#BBB",n,"#FFF","#AAA"))}const so=Ie({name:"Menu",common:ze,peers:{Tooltip:Ze,Dropdown:Qe},self:co}),Ae=Y("n-layout-sider"),ue={type:String,default:"static"},vo=v("layout",`
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
`,[v("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),w("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),uo={embedded:Boolean,position:ue,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Re=Y("n-layout");function Pe(e){return k({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},K.props),uo),setup(t){const o=F(null),n=F(null),{mergedClsPrefixRef:a,inlineThemeDisabled:l}=Z(t),m=K("Layout","-layout",vo,ve,t,a);function h(z,S){if(t.nativeScrollbar){const{value:P}=o;P&&(S===void 0?P.scrollTo(z):P.scrollTo(z,S))}else{const{value:P}=n;P&&P.scrollTo(z,S)}}U(Re,t);let c=0,f=0;const B=z=>{var S;const P=z.target;c=P.scrollLeft,f=P.scrollTop,(S=t.onScroll)===null||S===void 0||S.call(t,z)};Se(()=>{if(t.nativeScrollbar){const z=o.value;z&&(z.scrollTop=f,z.scrollLeft=c)}});const N={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},g={scrollTo:h},T=b(()=>{const{common:{cubicBezierEaseInOut:z},self:S}=m.value;return{"--n-bezier":z,"--n-color":t.embedded?S.colorEmbedded:S.color,"--n-text-color":S.textColor}}),R=l?ee("layout",b(()=>t.embedded?"e":""),T,t):void 0;return Object.assign({mergedClsPrefix:a,scrollableElRef:o,scrollbarInstRef:n,hasSiderStyle:N,mergedTheme:m,handleNativeElScroll:B,cssVars:l?void 0:T,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender},g)},render(){var t;const{mergedClsPrefix:o,hasSider:n}=this;(t=this.onRender)===null||t===void 0||t.call(this);const a=n?this.hasSiderStyle:void 0,l=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return s("div",{class:l,style:this.cssVars},this.nativeScrollbar?s("div",{ref:"scrollableElRef",class:[`${o}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,a],onScroll:this.handleNativeElScroll},this.$slots):s(we,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,a]}),this.$slots))}})}const Bo=Pe(!1),Oo=Pe(!0),mo=v("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[w("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),w("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),ho={position:ue,inverted:Boolean,bordered:{type:Boolean,default:!1}},ko=k({name:"LayoutHeader",props:Object.assign(Object.assign({},K.props),ho),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Z(e),n=K("Layout","-layout-header",mo,ve,e,t),a=b(()=>{const{common:{cubicBezierEaseInOut:m},self:h}=n.value,c={"--n-bezier":m};return e.inverted?(c["--n-color"]=h.headerColorInverted,c["--n-text-color"]=h.textColorInverted,c["--n-border-color"]=h.headerBorderColorInverted):(c["--n-color"]=h.headerColor,c["--n-text-color"]=h.textColor,c["--n-border-color"]=h.headerBorderColor),c}),l=o?ee("layout-header",b(()=>e.inverted?"a":"b"),a,e):void 0;return{mergedClsPrefix:t,cssVars:o?void 0:a,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),s("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),fo=v("layout-sider",`
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
`,[w("bordered",[d("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),d("left-placement",[w("bordered",[d("border",`
 right: 0;
 `)])]),w("right-placement",`
 justify-content: flex-start;
 `,[w("bordered",[d("border",`
 left: 0;
 `)]),w("collapsed",[v("layout-toggle-button",[v("base-icon",`
 transform: rotate(180deg);
 `)]),v("layout-toggle-bar",[I("&:hover",[d("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),v("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[v("base-icon",`
 transform: rotate(0);
 `)]),v("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[I("&:hover",[d("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),w("collapsed",[v("layout-toggle-bar",[I("&:hover",[d("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),v("layout-toggle-button",[v("base-icon",`
 transform: rotate(0);
 `)])]),v("layout-toggle-button",`
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
 `,[v("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),v("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[d("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),d("bottom",`
 position: absolute;
 top: 34px;
 `),I("&:hover",[d("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),d("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),I("&:hover",[d("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),d("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),v("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),w("show-content",[v("layout-sider-scroll-container",{opacity:1})]),w("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),go=k({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},s("div",{class:`${e}-layout-toggle-bar__top`}),s("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),po=k({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},s(He,{clsPrefix:e},{default:()=>s(eo,null)}))}}),bo={position:ue,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},Eo=k({name:"LayoutSider",props:Object.assign(Object.assign({},K.props),bo),setup(e){const t=j(Re),o=F(null),n=F(null),a=F(e.defaultCollapsed),l=le(Q(e,"collapsed"),a),m=b(()=>re(l.value?e.collapsedWidth:e.width)),h=b(()=>e.collapseMode!=="transform"?{}:{minWidth:re(e.width)}),c=b(()=>t?t.siderPlacement:"left");function f(A,x){if(e.nativeScrollbar){const{value:y}=o;y&&(x===void 0?y.scrollTo(A):y.scrollTo(A,x))}else{const{value:y}=n;y&&y.scrollTo(A,x)}}function B(){const{"onUpdate:collapsed":A,onUpdateCollapsed:x,onExpand:y,onCollapse:M}=e,{value:L}=l;x&&$(x,!L),A&&$(A,!L),a.value=!L,L?y&&$(y):M&&$(M)}let N=0,g=0;const T=A=>{var x;const y=A.target;N=y.scrollLeft,g=y.scrollTop,(x=e.onScroll)===null||x===void 0||x.call(e,A)};Se(()=>{if(e.nativeScrollbar){const A=o.value;A&&(A.scrollTop=g,A.scrollLeft=N)}}),U(Ae,{collapsedRef:l,collapseModeRef:Q(e,"collapseMode")});const{mergedClsPrefixRef:R,inlineThemeDisabled:z}=Z(e),S=K("Layout","-layout-sider",fo,ve,e,R);function P(A){var x,y;A.propertyName==="max-width"&&(l.value?(x=e.onAfterLeave)===null||x===void 0||x.call(e):(y=e.onAfterEnter)===null||y===void 0||y.call(e))}const G={scrollTo:f},_=b(()=>{const{common:{cubicBezierEaseInOut:A},self:x}=S.value,{siderToggleButtonColor:y,siderToggleButtonBorder:M,siderToggleBarColor:L,siderToggleBarColorHover:oe}=x,O={"--n-bezier":A,"--n-toggle-button-color":y,"--n-toggle-button-border":M,"--n-toggle-bar-color":L,"--n-toggle-bar-color-hover":oe};return e.inverted?(O["--n-color"]=x.siderColorInverted,O["--n-text-color"]=x.textColorInverted,O["--n-border-color"]=x.siderBorderColorInverted,O["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColorInverted,O.__invertScrollbar=x.__invertScrollbar):(O["--n-color"]=x.siderColor,O["--n-text-color"]=x.textColor,O["--n-border-color"]=x.siderBorderColor,O["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColor),O}),E=z?ee("layout-sider",b(()=>e.inverted?"a":"b"),_,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:n,mergedClsPrefix:R,mergedTheme:S,styleMaxWidth:m,mergedCollapsed:l,scrollContainerStyle:h,siderPlacement:c,handleNativeElScroll:T,handleTransitionend:P,handleTriggerClick:B,inlineThemeDisabled:z,cssVars:_,themeClass:E==null?void 0:E.themeClass,onRender:E==null?void 0:E.onRender},G)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),s("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:re(this.width)}]},this.nativeScrollbar?s("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):s(we,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),n?n==="bar"?s(go,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):s(po,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?s("div",{class:`${t}-layout-sider__border`}):null)}}),W=Y("n-menu"),Te=Y("n-submenu"),me=Y("n-menu-item-group"),xe=[I("&::before","background-color: var(--n-item-color-hover);"),d("arrow",`
 color: var(--n-arrow-color-hover);
 `),d("icon",`
 color: var(--n-item-icon-color-hover);
 `),v("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[I("a",`
 color: var(--n-item-text-color-hover);
 `),d("extra",`
 color: var(--n-item-text-color-hover);
 `)])],ye=[d("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),v("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[I("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),d("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],Co=I([v("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[w("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[v("submenu","margin: 0;"),v("menu-item","margin: 0;"),v("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[I("&::before","display: none;"),w("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),v("menu-item-content",[w("selected",[d("icon","color: var(--n-item-icon-color-active-horizontal);"),v("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[I("a","color: var(--n-item-text-color-active-horizontal);"),d("extra","color: var(--n-item-text-color-active-horizontal);")])]),w("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[v("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[I("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),d("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),d("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),q("disabled",[q("selected, child-active",[I("&:focus-within",ye)]),w("selected",[V(null,[d("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),v("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[I("a","color: var(--n-item-text-color-active-hover-horizontal);"),d("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),w("child-active",[V(null,[d("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),v("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[I("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),d("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),V("border-bottom: 2px solid var(--n-border-color-horizontal);",ye)]),v("menu-item-content-header",[I("a","color: var(--n-item-text-color-horizontal);")])])]),q("responsive",[v("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),w("collapsed",[v("menu-item-content",[w("selected",[I("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),v("menu-item-content-header","opacity: 0;"),d("arrow","opacity: 0;"),d("icon","color: var(--n-item-icon-color-collapsed);")])]),v("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),v("menu-item-content",`
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
 `,[I("> *","z-index: 1;"),I("&::before",`
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
 `),w("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),w("collapsed",[d("arrow","transform: rotate(0);")]),w("selected",[I("&::before","background-color: var(--n-item-color-active);"),d("arrow","color: var(--n-arrow-color-active);"),d("icon","color: var(--n-item-icon-color-active);"),v("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[I("a","color: var(--n-item-text-color-active);"),d("extra","color: var(--n-item-text-color-active);")])]),w("child-active",[v("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[I("a",`
 color: var(--n-item-text-color-child-active);
 `),d("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),d("arrow",`
 color: var(--n-arrow-color-child-active);
 `),d("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),q("disabled",[q("selected, child-active",[I("&:focus-within",xe)]),w("selected",[V(null,[d("arrow","color: var(--n-arrow-color-active-hover);"),d("icon","color: var(--n-item-icon-color-active-hover);"),v("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[I("a","color: var(--n-item-text-color-active-hover);"),d("extra","color: var(--n-item-text-color-active-hover);")])])]),w("child-active",[V(null,[d("arrow","color: var(--n-arrow-color-child-active-hover);"),d("icon","color: var(--n-item-icon-color-child-active-hover);"),v("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[I("a","color: var(--n-item-text-color-child-active-hover);"),d("extra","color: var(--n-item-text-color-child-active-hover);")])])]),w("selected",[V(null,[I("&::before","background-color: var(--n-item-color-active-hover);")])]),V(null,xe)]),d("icon",`
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
 `),d("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),v("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[I("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[I("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),d("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),v("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[v("menu-item-content",`
 height: var(--n-item-height);
 `),v("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[Ge({duration:".2s"})])]),v("menu-item-group",[v("menu-item-group-title",`
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
 `)])]),v("menu-tooltip",[I("a",`
 color: inherit;
 text-decoration: none;
 `)]),v("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function V(e,t){return[w("hover",e,t),I("&:hover",e,t)]}const Ne=k({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=j(W);return{menuProps:t,style:b(()=>{const{paddingLeft:o}=e;return{paddingLeft:o&&`${o}px`}}),iconStyle:b(()=>{const{maxIconSize:o,activeIconSize:n,iconMarginRight:a}=e;return{width:`${o}px`,height:`${o}px`,fontSize:`${n}px`,marginRight:`${a}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:o,renderLabel:n,renderExtra:a,expandIcon:l}}=this,m=o?o(t.rawNode):D(this.icon);return s("div",{onClick:h=>{var c;(c=this.onClick)===null||c===void 0||c.call(this,h)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},m&&s("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[m]),s("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:n?n(t.rawNode):D(this.title),this.extra||a?s("span",{class:`${e}-menu-item-content-header__extra`}," ",a?a(t.rawNode):D(this.extra)):null),this.showArrow?s(He,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>l?l(t.rawNode):s(io,null)}):null)}}),J=8;function he(e){const t=j(W),{props:o,mergedCollapsedRef:n}=t,a=j(Te,null),l=j(me,null),m=b(()=>o.mode==="horizontal"),h=b(()=>m.value?o.dropdownPlacement:"tmNodes"in e?"right-start":"right"),c=b(()=>{var g;return Math.max((g=o.collapsedIconSize)!==null&&g!==void 0?g:o.iconSize,o.iconSize)}),f=b(()=>{var g;return!m.value&&e.root&&n.value&&(g=o.collapsedIconSize)!==null&&g!==void 0?g:o.iconSize}),B=b(()=>{if(m.value)return;const{collapsedWidth:g,indent:T,rootIndent:R}=o,{root:z,isGroup:S}=e,P=R===void 0?T:R;return z?n.value?g/2-c.value/2:P:l&&typeof l.paddingLeftRef.value=="number"?T/2+l.paddingLeftRef.value:a&&typeof a.paddingLeftRef.value=="number"?(S?T/2:T)+a.paddingLeftRef.value:0}),N=b(()=>{const{collapsedWidth:g,indent:T,rootIndent:R}=o,{value:z}=c,{root:S}=e;return m.value||!S||!n.value?J:(R===void 0?T:R)+z+J-(g+z)/2});return{dropdownPlacement:h,activeIconSize:f,maxIconSize:c,paddingLeft:B,iconMarginRight:N,NMenu:t,NSubmenu:a,NMenuOptionGroup:l}}const fe={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},xo=k({name:"MenuDivider",setup(){const e=j(W),{mergedClsPrefixRef:t,isHorizontalRef:o}=e;return()=>o.value?null:s("div",{class:`${t.value}-menu-divider`})}}),Be=Object.assign(Object.assign({},fe),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),yo=se(Be),Io=k({name:"MenuOption",props:Be,setup(e){const t=he(e),{NSubmenu:o,NMenu:n,NMenuOptionGroup:a}=t,{props:l,mergedClsPrefixRef:m,mergedCollapsedRef:h}=n,c=o?o.mergedDisabledRef:a?a.mergedDisabledRef:{value:!1},f=b(()=>c.value||e.disabled);function B(g){const{onClick:T}=e;T&&T(g)}function N(g){f.value||(n.doSelect(e.internalKey,e.tmNode.rawNode),B(g))}return{mergedClsPrefix:m,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:n.mergedThemeRef,menuProps:l,dropdownEnabled:ae(()=>e.root&&h.value&&l.mode!=="horizontal"&&!f.value),selected:ae(()=>n.mergedValueRef.value===e.internalKey),mergedDisabled:f,handleClick:N}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:o,menuProps:{renderLabel:n,nodeProps:a}}=this,l=a==null?void 0:a(o.rawNode);return s("div",Object.assign({},l,{role:"menuitem",class:[`${e}-menu-item`,l==null?void 0:l.class]}),s(oo,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>n?n(o.rawNode):D(this.title),trigger:()=>s(Ne,{tmNode:o,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Oe=Object.assign(Object.assign({},fe),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),zo=se(Oe),wo=k({name:"MenuOptionGroup",props:Oe,setup(e){const t=he(e),{NSubmenu:o}=t,n=b(()=>o!=null&&o.mergedDisabledRef.value?!0:e.tmNode.disabled);U(me,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:n});const{mergedClsPrefixRef:a,props:l}=j(W);return function(){const{value:m}=a,h=t.paddingLeft.value,{nodeProps:c}=l,f=c==null?void 0:c(e.tmNode.rawNode);return s("div",{class:`${m}-menu-item-group`,role:"group"},s("div",Object.assign({},f,{class:[`${m}-menu-item-group-title`,f==null?void 0:f.class],style:[(f==null?void 0:f.style)||"",h!==void 0?`padding-left: ${h}px;`:""]}),D(e.title),e.extra?s(qe,null," ",D(e.extra)):null),s("div",null,e.tmNodes.map(B=>ge(B,l))))}}});function ce(e){return e.type==="divider"||e.type==="render"}function So(e){return e.type==="divider"}function ge(e,t){const{rawNode:o}=e,{show:n}=o;if(n===!1)return null;if(ce(o))return So(o)?s(xo,Object.assign({key:e.key},o.props)):null;const{labelField:a}=t,{key:l,level:m,isGroup:h}=e,c=Object.assign(Object.assign({},o),{title:o.title||o[a],extra:o.titleExtra||o.extra,key:l,internalKey:l,level:m,root:m===0,isGroup:h});return e.children?e.isGroup?s(wo,ne(c,zo,{tmNode:e,tmNodes:e.children,key:l})):s(de,ne(c,Ho,{key:l,rawNodes:o[t.childrenField],tmNodes:e.children,tmNode:e})):s(Io,ne(c,yo,{key:l,tmNode:e}))}const ke=Object.assign(Object.assign({},fe),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),Ho=se(ke),de=k({name:"Submenu",props:ke,setup(e){const t=he(e),{NMenu:o,NSubmenu:n}=t,{props:a,mergedCollapsedRef:l,mergedThemeRef:m}=o,h=b(()=>{const{disabled:g}=e;return n!=null&&n.mergedDisabledRef.value||a.disabled?!0:g}),c=F(!1);U(Te,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:h}),U(me,null);function f(){const{onClick:g}=e;g&&g()}function B(){h.value||(l.value||o.toggleExpand(e.internalKey),f())}function N(g){c.value=g}return{menuProps:a,mergedTheme:m,doSelect:o.doSelect,inverted:o.invertedRef,isHorizontal:o.isHorizontalRef,mergedClsPrefix:o.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:h,mergedValue:o.mergedValueRef,childActive:ae(()=>{var g;return(g=e.virtualChildActive)!==null&&g!==void 0?g:o.activePathRef.value.includes(e.internalKey)}),collapsed:b(()=>a.mode==="horizontal"?!1:l.value?!0:!o.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:b(()=>!h.value&&(a.mode==="horizontal"||l.value)),handlePopoverShowChange:N,handleClick:B}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:o,renderLabel:n}}=this,a=()=>{const{isHorizontal:m,paddingLeft:h,collapsed:c,mergedDisabled:f,maxIconSize:B,activeIconSize:N,title:g,childActive:T,icon:R,handleClick:z,menuProps:{nodeProps:S},dropdownShow:P,iconMarginRight:G,tmNode:_,mergedClsPrefix:E,isEllipsisPlaceholder:A,extra:x}=this,y=S==null?void 0:S(_.rawNode);return s("div",Object.assign({},y,{class:[`${E}-menu-item`,y==null?void 0:y.class],role:"menuitem"}),s(Ne,{tmNode:_,paddingLeft:h,collapsed:c,disabled:f,iconMarginRight:G,maxIconSize:B,activeIconSize:N,title:g,extra:x,showArrow:!m,childActive:T,clsPrefix:E,icon:R,hover:P,onClick:z,isEllipsisPlaceholder:A}))},l=()=>s(Ye,null,{default:()=>{const{tmNodes:m,collapsed:h}=this;return h?null:s("div",{class:`${t}-submenu-children`,role:"menu"},m.map(c=>ge(c,this.menuProps)))}});return this.root?s(to,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:o,renderLabel:n}),{default:()=>s("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},a(),this.isHorizontal?null:l())}):s("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},a(),l())}}),Ao=Object.assign(Object.assign({},K.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),$o=k({name:"Menu",inheritAttrs:!1,props:Ao,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Z(e),n=K("Menu","-menu",Co,so,e,t),a=j(Ae,null),l=b(()=>{var u;const{collapsed:C}=e;if(C!==void 0)return C;if(a){const{collapseModeRef:r,collapsedRef:p}=a;if(r.value==="width")return(u=p.value)!==null&&u!==void 0?u:!1}return!1}),m=b(()=>{const{keyField:u,childrenField:C,disabledField:r}=e;return ie(e.items||e.options,{getIgnored(p){return ce(p)},getChildren(p){return p[C]},getDisabled(p){return p[r]},getKey(p){var H;return(H=p[u])!==null&&H!==void 0?H:p.name}})}),h=b(()=>new Set(m.value.treeNodes.map(u=>u.key))),{watchProps:c}=e,f=F(null);c!=null&&c.includes("defaultValue")?Ce(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;const B=Q(e,"value"),N=le(B,f),g=F([]),T=()=>{g.value=e.defaultExpandAll?m.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||m.value.getPath(N.value,{includeSelf:!1}).keyPath};c!=null&&c.includes("defaultExpandedKeys")?Ce(T):T();const R=no(e,["expandedNames","expandedKeys"]),z=le(R,g),S=b(()=>m.value.treeNodes),P=b(()=>m.value.getPath(N.value).keyPath);U(W,{props:e,mergedCollapsedRef:l,mergedThemeRef:n,mergedValueRef:N,mergedExpandedKeysRef:z,activePathRef:P,mergedClsPrefixRef:t,isHorizontalRef:b(()=>e.mode==="horizontal"),invertedRef:Q(e,"inverted"),doSelect:G,toggleExpand:E});function G(u,C){const{"onUpdate:value":r,onUpdateValue:p,onSelect:H}=e;p&&$(p,u,C),r&&$(r,u,C),H&&$(H,u,C),f.value=u}function _(u){const{"onUpdate:expandedKeys":C,onUpdateExpandedKeys:r,onExpandedNamesChange:p,onOpenNamesChange:H}=e;C&&$(C,u),r&&$(r,u),p&&$(p,u),H&&$(H,u),g.value=u}function E(u){const C=Array.from(z.value),r=C.findIndex(p=>p===u);if(~r)C.splice(r,1);else{if(e.accordion&&h.value.has(u)){const p=C.findIndex(H=>h.value.has(H));p>-1&&C.splice(p,1)}C.push(u)}_(C)}const A=u=>{const C=m.value.getPath(u??N.value,{includeSelf:!1}).keyPath;if(!C.length)return;const r=Array.from(z.value),p=new Set([...r,...C]);e.accordion&&h.value.forEach(H=>{p.has(H)&&!C.includes(H)&&p.delete(H)}),_(Array.from(p))},x=b(()=>{const{inverted:u}=e,{common:{cubicBezierEaseInOut:C},self:r}=n.value,{borderRadius:p,borderColorHorizontal:H,fontSize:Ke,itemHeight:Ve,dividerColor:De}=r,i={"--n-divider-color":De,"--n-bezier":C,"--n-font-size":Ke,"--n-border-color-horizontal":H,"--n-border-radius":p,"--n-item-height":Ve};return u?(i["--n-group-text-color"]=r.groupTextColorInverted,i["--n-color"]=r.colorInverted,i["--n-item-text-color"]=r.itemTextColorInverted,i["--n-item-text-color-hover"]=r.itemTextColorHoverInverted,i["--n-item-text-color-active"]=r.itemTextColorActiveInverted,i["--n-item-text-color-child-active"]=r.itemTextColorChildActiveInverted,i["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveInverted,i["--n-item-text-color-active-hover"]=r.itemTextColorActiveHoverInverted,i["--n-item-icon-color"]=r.itemIconColorInverted,i["--n-item-icon-color-hover"]=r.itemIconColorHoverInverted,i["--n-item-icon-color-active"]=r.itemIconColorActiveInverted,i["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHoverInverted,i["--n-item-icon-color-child-active"]=r.itemIconColorChildActiveInverted,i["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHoverInverted,i["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsedInverted,i["--n-item-text-color-horizontal"]=r.itemTextColorHorizontalInverted,i["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontalInverted,i["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontalInverted,i["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontalInverted,i["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontalInverted,i["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontalInverted,i["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontalInverted,i["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontalInverted,i["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontalInverted,i["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontalInverted,i["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontalInverted,i["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontalInverted,i["--n-arrow-color"]=r.arrowColorInverted,i["--n-arrow-color-hover"]=r.arrowColorHoverInverted,i["--n-arrow-color-active"]=r.arrowColorActiveInverted,i["--n-arrow-color-active-hover"]=r.arrowColorActiveHoverInverted,i["--n-arrow-color-child-active"]=r.arrowColorChildActiveInverted,i["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHoverInverted,i["--n-item-color-hover"]=r.itemColorHoverInverted,i["--n-item-color-active"]=r.itemColorActiveInverted,i["--n-item-color-active-hover"]=r.itemColorActiveHoverInverted,i["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsedInverted):(i["--n-group-text-color"]=r.groupTextColor,i["--n-color"]=r.color,i["--n-item-text-color"]=r.itemTextColor,i["--n-item-text-color-hover"]=r.itemTextColorHover,i["--n-item-text-color-active"]=r.itemTextColorActive,i["--n-item-text-color-child-active"]=r.itemTextColorChildActive,i["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveHover,i["--n-item-text-color-active-hover"]=r.itemTextColorActiveHover,i["--n-item-icon-color"]=r.itemIconColor,i["--n-item-icon-color-hover"]=r.itemIconColorHover,i["--n-item-icon-color-active"]=r.itemIconColorActive,i["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHover,i["--n-item-icon-color-child-active"]=r.itemIconColorChildActive,i["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHover,i["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsed,i["--n-item-text-color-horizontal"]=r.itemTextColorHorizontal,i["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontal,i["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontal,i["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontal,i["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontal,i["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontal,i["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontal,i["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontal,i["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontal,i["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontal,i["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontal,i["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontal,i["--n-arrow-color"]=r.arrowColor,i["--n-arrow-color-hover"]=r.arrowColorHover,i["--n-arrow-color-active"]=r.arrowColorActive,i["--n-arrow-color-active-hover"]=r.arrowColorActiveHover,i["--n-arrow-color-child-active"]=r.arrowColorChildActive,i["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHover,i["--n-item-color-hover"]=r.itemColorHover,i["--n-item-color-active"]=r.itemColorActive,i["--n-item-color-active-hover"]=r.itemColorActiveHover,i["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsed),i}),y=o?ee("menu",b(()=>e.inverted?"a":"b"),x,e):void 0,M=Xe(),L=F(null),oe=F(null);let O=!0;const pe=()=>{var u;O?O=!1:(u=L.value)===null||u===void 0||u.sync({showAllItemsBeforeCalculate:!0})};function Ee(){return document.getElementById(M)}const X=F(-1);function $e(u){X.value=e.options.length-u}function Fe(u){u||(X.value=-1)}const Le=b(()=>{const u=X.value;return{children:u===-1?[]:e.options.slice(u)}}),_e=b(()=>{const{childrenField:u,disabledField:C,keyField:r}=e;return ie([Le.value],{getIgnored(p){return ce(p)},getChildren(p){return p[u]},getDisabled(p){return p[C]},getKey(p){var H;return(H=p[r])!==null&&H!==void 0?H:p.name}})}),Me=b(()=>ie([{}]).treeNodes[0]);function je(){var u;if(X.value===-1)return s(de,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:Me.value,domId:M,isEllipsisPlaceholder:!0});const C=_e.value.treeNodes[0],r=P.value,p=!!(!((u=C.children)===null||u===void 0)&&u.some(H=>r.includes(H.key)));return s(de,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:p,tmNode:C,domId:M,rawNodes:C.rawNode.children||[],tmNodes:C.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:R,uncontrolledExpanededKeys:g,mergedExpandedKeys:z,uncontrolledValue:f,mergedValue:N,activePath:P,tmNodes:S,mergedTheme:n,mergedCollapsed:l,cssVars:o?void 0:x,themeClass:y==null?void 0:y.themeClass,overflowRef:L,counterRef:oe,updateCounter:()=>{},onResize:pe,onUpdateOverflow:Fe,onUpdateCount:$e,renderCounter:je,getCounter:Ee,onRender:y==null?void 0:y.onRender,showOption:A,deriveResponsiveState:pe}},render(){const{mergedClsPrefix:e,mode:t,themeClass:o,onRender:n}=this;n==null||n();const a=()=>this.tmNodes.map(c=>ge(c,this.$props)),m=t==="horizontal"&&this.responsive,h=()=>s("div",Je(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,o,`${e}-menu--${t}`,m&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),m?s(ro,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:a,counter:this.renderCounter}):a());return m?s(We,{onResize:this.onResize},{default:h}):h()}});export{$o as N,Eo as a,ko as b,Oo as c,Bo as d};
