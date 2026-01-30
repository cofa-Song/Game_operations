import{p as ue,N as ce,a as re,B as Re,V as Ie,d as ke,r as Oe}from"./Popover-C60ATd9D.js";import{r as F,A as pe,f as T,h as d,a8 as fe,d as he,be as Ke,aQ as Te,u as ve,g as Q,j as m,k as ie,b5 as G,n as H,av as be,an as Ae,bs as V,aE as me,p as W,H as _e,bk as ze,bL as Fe,aF as Be,aD as je,c as I,am as De,a as M,aU as le,b as O,e as z,ae as He,aK as $e,i as Le,ag as ne,t as K,as as D}from"./index-IWOp6Bpn.js";import{N as Me}from"./Icon-DZ24gLrW.js";import{h as ae,c as We}from"./create-CdyI-x2p.js";import{u as Ee}from"./use-keyboard-B2ZP_AGf.js";import{c as Ue}from"./create-ref-setter-C4J8sofl.js";function qe(e,o,i){const n=F(e.value);let r=null;return pe(e,t=>{r!==null&&window.clearTimeout(r),t===!0?i&&!i.value?n.value=!0:r=window.setTimeout(()=>{n.value=!0},o):n.value=!1}),n}const Ve=T({name:"ChevronRight",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",fill:"currentColor"}))}}),Ge={padding:"4px 0",optionIconSizeSmall:"14px",optionIconSizeMedium:"16px",optionIconSizeLarge:"16px",optionIconSizeHuge:"18px",optionSuffixWidthSmall:"14px",optionSuffixWidthMedium:"14px",optionSuffixWidthLarge:"16px",optionSuffixWidthHuge:"16px",optionIconSuffixWidthSmall:"32px",optionIconSuffixWidthMedium:"32px",optionIconSuffixWidthLarge:"36px",optionIconSuffixWidthHuge:"36px",optionPrefixWidthSmall:"14px",optionPrefixWidthMedium:"14px",optionPrefixWidthLarge:"16px",optionPrefixWidthHuge:"16px",optionIconPrefixWidthSmall:"36px",optionIconPrefixWidthMedium:"36px",optionIconPrefixWidthLarge:"40px",optionIconPrefixWidthHuge:"40px"};function Qe(e){const{primaryColor:o,textColor2:i,dividerColor:n,hoverColor:r,popoverColor:t,invertedColor:p,borderRadius:f,fontSizeSmall:c,fontSizeMedium:y,fontSizeLarge:g,fontSizeHuge:S,heightSmall:C,heightMedium:P,heightLarge:N,heightHuge:A,textColor3:w,opacityDisabled:R}=e;return Object.assign(Object.assign({},Ge),{optionHeightSmall:C,optionHeightMedium:P,optionHeightLarge:N,optionHeightHuge:A,borderRadius:f,fontSizeSmall:c,fontSizeMedium:y,fontSizeLarge:g,fontSizeHuge:S,optionTextColor:i,optionTextColorHover:i,optionTextColorActive:o,optionTextColorChildActive:o,color:t,dividerColor:n,suffixColor:i,prefixColor:i,optionColorHover:r,optionColorActive:Ke(o,{alpha:.1}),groupHeaderTextColor:w,optionTextColorInverted:"#BBB",optionTextColorHoverInverted:"#FFF",optionTextColorActiveInverted:"#FFF",optionTextColorChildActiveInverted:"#FFF",colorInverted:p,dividerColorInverted:"#BBB",suffixColorInverted:"#BBB",prefixColorInverted:"#BBB",optionColorHoverInverted:o,optionColorActiveInverted:o,groupHeaderTextColorInverted:"#AAA",optionOpacityDisabled:R})}const Xe=fe({name:"Dropdown",common:he,peers:{Popover:ue},self:Qe}),Ze={padding:"8px 14px"};function Je(e){const{borderRadius:o,boxShadow2:i,baseColor:n}=e;return Object.assign(Object.assign({},Ze),{borderRadius:o,boxShadow:i,color:Te(n,"rgba(0, 0, 0, .85)"),textColor:n})}const Ye=fe({name:"Tooltip",common:he,peers:{Popover:ue},self:Je}),eo=Object.assign(Object.assign({},re),Q.props),mo=T({name:"Tooltip",props:eo,slots:Object,__popover__:!0,setup(e){const{mergedClsPrefixRef:o}=ve(e),i=Q("Tooltip","-tooltip",void 0,Ye,e,o),n=F(null);return Object.assign(Object.assign({},{syncPosition(){n.value.syncPosition()},setShow(t){n.value.setShow(t)}}),{popoverRef:n,mergedTheme:i,popoverThemeOverrides:m(()=>i.value.self)})},render(){const{mergedTheme:e,internalExtraClass:o}=this;return d(ce,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:o.concat("tooltip"),ref:"popoverRef"}),this.$slots)}}),de=ie("n-dropdown-menu"),X=ie("n-dropdown"),se=ie("n-dropdown-option"),we=T({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return d("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),oo=T({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:o}=H(de),{renderLabelRef:i,labelFieldRef:n,nodePropsRef:r,renderOptionRef:t}=H(X);return{labelField:n,showIcon:e,hasSubmenu:o,renderLabel:i,nodeProps:r,renderOption:t}},render(){var e;const{clsPrefix:o,hasSubmenu:i,showIcon:n,nodeProps:r,renderLabel:t,renderOption:p}=this,{rawNode:f}=this.tmNode,c=d("div",Object.assign({class:`${o}-dropdown-option`},r==null?void 0:r(f)),d("div",{class:`${o}-dropdown-option-body ${o}-dropdown-option-body--group`},d("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__prefix`,n&&`${o}-dropdown-option-body__prefix--show-icon`]},G(f.icon)),d("div",{class:`${o}-dropdown-option-body__label`,"data-dropdown-option":!0},t?t(f):G((e=f.title)!==null&&e!==void 0?e:f[this.labelField])),d("div",{class:[`${o}-dropdown-option-body__suffix`,i&&`${o}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return p?p({node:c,option:f}):c}});function te(e,o){return e.type==="submenu"||e.type===void 0&&e[o]!==void 0}function no(e){return e.type==="group"}function ge(e){return e.type==="divider"}function to(e){return e.type==="render"}const xe=T({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const o=H(X),{hoverKeyRef:i,keyboardKeyRef:n,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:t,activeKeyPathRef:p,animatedRef:f,mergedShowRef:c,renderLabelRef:y,renderIconRef:g,labelFieldRef:S,childrenFieldRef:C,renderOptionRef:P,nodePropsRef:N,menuPropsRef:A}=o,w=H(se,null),R=H(de),E=H(me),Z=m(()=>e.tmNode.rawNode),U=m(()=>{const{value:a}=C;return te(e.tmNode.rawNode,a)}),J=m(()=>{const{disabled:a}=e.tmNode;return a}),Y=m(()=>{if(!U.value)return!1;const{key:a,disabled:b}=e.tmNode;if(b)return!1;const{value:k}=i,{value:B}=n,{value:oe}=r,{value:j}=t;return k!==null?j.includes(a):B!==null?j.includes(a)&&j[j.length-1]!==a:oe!==null?j.includes(a):!1}),ee=m(()=>n.value===null&&!f.value),q=qe(Y,300,ee),$=m(()=>!!(w!=null&&w.enteringSubmenuRef.value)),L=F(!1);W(se,{enteringSubmenuRef:L});function _(){L.value=!0}function l(){L.value=!1}function v(){const{parentKey:a,tmNode:b}=e;b.disabled||c.value&&(r.value=a,n.value=null,i.value=b.key)}function u(){const{tmNode:a}=e;a.disabled||c.value&&i.value!==a.key&&v()}function s(a){if(e.tmNode.disabled||!c.value)return;const{relatedTarget:b}=a;b&&!ae({target:b},"dropdownOption")&&!ae({target:b},"scrollbarRail")&&(i.value=null)}function x(){const{value:a}=U,{tmNode:b}=e;c.value&&!a&&!b.disabled&&(o.doSelect(b.key,b.rawNode),o.doUpdateShow(!1))}return{labelField:S,renderLabel:y,renderIcon:g,siblingHasIcon:R.showIconRef,siblingHasSubmenu:R.hasSubmenuRef,menuProps:A,popoverBody:E,animated:f,mergedShowSubmenu:m(()=>q.value&&!$.value),rawNode:Z,hasSubmenu:U,pending:V(()=>{const{value:a}=t,{key:b}=e.tmNode;return a.includes(b)}),childActive:V(()=>{const{value:a}=p,{key:b}=e.tmNode,k=a.findIndex(B=>b===B);return k===-1?!1:k<a.length-1}),active:V(()=>{const{value:a}=p,{key:b}=e.tmNode,k=a.findIndex(B=>b===B);return k===-1?!1:k===a.length-1}),mergedDisabled:J,renderOption:P,nodeProps:N,handleClick:x,handleMouseMove:u,handleMouseEnter:v,handleMouseLeave:s,handleSubmenuBeforeEnter:_,handleSubmenuAfterEnter:l}},render(){var e,o;const{animated:i,rawNode:n,mergedShowSubmenu:r,clsPrefix:t,siblingHasIcon:p,siblingHasSubmenu:f,renderLabel:c,renderIcon:y,renderOption:g,nodeProps:S,props:C,scrollable:P}=this;let N=null;if(r){const E=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,n,n.children);N=d(ye,Object.assign({},E,{clsPrefix:t,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const A={class:[`${t}-dropdown-option-body`,this.pending&&`${t}-dropdown-option-body--pending`,this.active&&`${t}-dropdown-option-body--active`,this.childActive&&`${t}-dropdown-option-body--child-active`,this.mergedDisabled&&`${t}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},w=S==null?void 0:S(n),R=d("div",Object.assign({class:[`${t}-dropdown-option`,w==null?void 0:w.class],"data-dropdown-option":!0},w),d("div",be(A,C),[d("div",{class:[`${t}-dropdown-option-body__prefix`,p&&`${t}-dropdown-option-body__prefix--show-icon`]},[y?y(n):G(n.icon)]),d("div",{"data-dropdown-option":!0,class:`${t}-dropdown-option-body__label`},c?c(n):G((o=n[this.labelField])!==null&&o!==void 0?o:n.title)),d("div",{"data-dropdown-option":!0,class:[`${t}-dropdown-option-body__suffix`,f&&`${t}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?d(Me,null,{default:()=>d(Ve,null)}):null)]),this.hasSubmenu?d(Re,null,{default:()=>[d(Ie,null,{default:()=>d("div",{class:`${t}-dropdown-offset-container`},d(ke,{show:this.mergedShowSubmenu,placement:this.placement,to:P&&this.popoverBody||void 0,teleportDisabled:!P},{default:()=>d("div",{class:`${t}-dropdown-menu-wrapper`},i?d(Ae,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>N}):N)}))})]}):null);return g?g({node:R,option:n}):R}}),ro=T({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:o,clsPrefix:i}=this,{children:n}=e;return d(_e,null,d(oo,{clsPrefix:i,tmNode:e,key:e.key}),n==null?void 0:n.map(r=>{const{rawNode:t}=r;return t.show===!1?null:ge(t)?d(we,{clsPrefix:i,key:r.key}):r.isGroup?(ze("dropdown","`group` node is not allowed to be put in `group` node."),null):d(xe,{clsPrefix:i,tmNode:r,parentKey:o,key:r.key})}))}}),io=T({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:o}}=this.tmNode;return d("div",o,[e==null?void 0:e()])}}),ye=T({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:o,childrenFieldRef:i}=H(X);W(de,{showIconRef:m(()=>{const r=o.value;return e.tmNodes.some(t=>{var p;if(t.isGroup)return(p=t.children)===null||p===void 0?void 0:p.some(({rawNode:c})=>r?r(c):c.icon);const{rawNode:f}=t;return r?r(f):f.icon})}),hasSubmenuRef:m(()=>{const{value:r}=i;return e.tmNodes.some(t=>{var p;if(t.isGroup)return(p=t.children)===null||p===void 0?void 0:p.some(({rawNode:c})=>te(c,r));const{rawNode:f}=t;return te(f,r)})})});const n=F(null);return W(Be,null),W(je,null),W(me,n),{bodyRef:n}},render(){const{parentKey:e,clsPrefix:o,scrollable:i}=this,n=this.tmNodes.map(r=>{const{rawNode:t}=r;return t.show===!1?null:to(t)?d(io,{tmNode:r,key:r.key}):ge(t)?d(we,{clsPrefix:o,key:r.key}):no(t)?d(ro,{clsPrefix:o,tmNode:r,parentKey:e,key:r.key}):d(xe,{clsPrefix:o,tmNode:r,parentKey:e,key:r.key,props:t.props,scrollable:i})});return d("div",{class:[`${o}-dropdown-menu`,i&&`${o}-dropdown-menu--scrollable`],ref:"bodyRef"},i?d(Fe,{contentClass:`${o}-dropdown-menu__content`},{default:()=>n}):n,this.showArrow?Oe({clsPrefix:o,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),lo=I("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[De(),I("dropdown-option",`
 position: relative;
 `,[M("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[M("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),I("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[M("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),le("disabled",[O("pending",`
 color: var(--n-option-text-color-hover);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),M("&::before","background-color: var(--n-option-color-hover);")]),O("active",`
 color: var(--n-option-text-color-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),M("&::before","background-color: var(--n-option-color-active);")]),O("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),O("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),O("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[z("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[O("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),z("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[O("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),I("icon",`
 font-size: var(--n-option-icon-size);
 `)]),z("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),z("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[O("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),I("icon",`
 font-size: var(--n-option-icon-size);
 `)]),I("dropdown-menu","pointer-events: all;")]),I("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),I("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),I("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),M(">",[I("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),le("scrollable",`
 padding: var(--n-padding);
 `),O("scrollable",[z("content",`
 padding: var(--n-padding);
 `)])]),ao={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},so=Object.keys(re),uo=Object.assign(Object.assign(Object.assign({},re),ao),Q.props),wo=T({name:"Dropdown",inheritAttrs:!1,props:uo,setup(e){const o=F(!1),i=$e(K(e,"show"),o),n=m(()=>{const{keyField:l,childrenField:v}=e;return We(e.options,{getKey(u){return u[l]},getDisabled(u){return u.disabled===!0},getIgnored(u){return u.type==="divider"||u.type==="render"},getChildren(u){return u[v]}})}),r=m(()=>n.value.treeNodes),t=F(null),p=F(null),f=F(null),c=m(()=>{var l,v,u;return(u=(v=(l=t.value)!==null&&l!==void 0?l:p.value)!==null&&v!==void 0?v:f.value)!==null&&u!==void 0?u:null}),y=m(()=>n.value.getPath(c.value).keyPath),g=m(()=>n.value.getPath(e.value).keyPath),S=V(()=>e.keyboard&&i.value);Ee({keydown:{ArrowUp:{prevent:!0,handler:J},ArrowRight:{prevent:!0,handler:U},ArrowDown:{prevent:!0,handler:Y},ArrowLeft:{prevent:!0,handler:Z},Enter:{prevent:!0,handler:ee},Escape:E}},S);const{mergedClsPrefixRef:C,inlineThemeDisabled:P}=ve(e),N=Q("Dropdown","-dropdown",lo,Xe,e,C);W(X,{labelFieldRef:K(e,"labelField"),childrenFieldRef:K(e,"childrenField"),renderLabelRef:K(e,"renderLabel"),renderIconRef:K(e,"renderIcon"),hoverKeyRef:t,keyboardKeyRef:p,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:y,activeKeyPathRef:g,animatedRef:K(e,"animated"),mergedShowRef:i,nodePropsRef:K(e,"nodeProps"),renderOptionRef:K(e,"renderOption"),menuPropsRef:K(e,"menuProps"),doSelect:A,doUpdateShow:w}),pe(i,l=>{!e.animated&&!l&&R()});function A(l,v){const{onSelect:u}=e;u&&ne(u,l,v)}function w(l){const{"onUpdate:show":v,onUpdateShow:u}=e;v&&ne(v,l),u&&ne(u,l),o.value=l}function R(){t.value=null,p.value=null,f.value=null}function E(){w(!1)}function Z(){$("left")}function U(){$("right")}function J(){$("up")}function Y(){$("down")}function ee(){const l=q();l!=null&&l.isLeaf&&i.value&&(A(l.key,l.rawNode),w(!1))}function q(){var l;const{value:v}=n,{value:u}=c;return!v||u===null?null:(l=v.getNode(u))!==null&&l!==void 0?l:null}function $(l){const{value:v}=c,{value:{getFirstAvailableNode:u}}=n;let s=null;if(v===null){const x=u();x!==null&&(s=x.key)}else{const x=q();if(x){let a;switch(l){case"down":a=x.getNext();break;case"up":a=x.getPrev();break;case"right":a=x.getChild();break;case"left":a=x.getParent();break}a&&(s=a.key)}}s!==null&&(t.value=null,p.value=s)}const L=m(()=>{const{size:l,inverted:v}=e,{common:{cubicBezierEaseInOut:u},self:s}=N.value,{padding:x,dividerColor:a,borderRadius:b,optionOpacityDisabled:k,[D("optionIconSuffixWidth",l)]:B,[D("optionSuffixWidth",l)]:oe,[D("optionIconPrefixWidth",l)]:j,[D("optionPrefixWidth",l)]:Se,[D("fontSize",l)]:Pe,[D("optionHeight",l)]:Ce,[D("optionIconSize",l)]:Ne}=s,h={"--n-bezier":u,"--n-font-size":Pe,"--n-padding":x,"--n-border-radius":b,"--n-option-height":Ce,"--n-option-prefix-width":Se,"--n-option-icon-prefix-width":j,"--n-option-suffix-width":oe,"--n-option-icon-suffix-width":B,"--n-option-icon-size":Ne,"--n-divider-color":a,"--n-option-opacity-disabled":k};return v?(h["--n-color"]=s.colorInverted,h["--n-option-color-hover"]=s.optionColorHoverInverted,h["--n-option-color-active"]=s.optionColorActiveInverted,h["--n-option-text-color"]=s.optionTextColorInverted,h["--n-option-text-color-hover"]=s.optionTextColorHoverInverted,h["--n-option-text-color-active"]=s.optionTextColorActiveInverted,h["--n-option-text-color-child-active"]=s.optionTextColorChildActiveInverted,h["--n-prefix-color"]=s.prefixColorInverted,h["--n-suffix-color"]=s.suffixColorInverted,h["--n-group-header-text-color"]=s.groupHeaderTextColorInverted):(h["--n-color"]=s.color,h["--n-option-color-hover"]=s.optionColorHover,h["--n-option-color-active"]=s.optionColorActive,h["--n-option-text-color"]=s.optionTextColor,h["--n-option-text-color-hover"]=s.optionTextColorHover,h["--n-option-text-color-active"]=s.optionTextColorActive,h["--n-option-text-color-child-active"]=s.optionTextColorChildActive,h["--n-prefix-color"]=s.prefixColor,h["--n-suffix-color"]=s.suffixColor,h["--n-group-header-text-color"]=s.groupHeaderTextColor),h}),_=P?Le("dropdown",m(()=>`${e.size[0]}${e.inverted?"i":""}`),L,e):void 0;return{mergedClsPrefix:C,mergedTheme:N,tmNodes:r,mergedShow:i,handleAfterLeave:()=>{e.animated&&R()},doUpdateShow:w,cssVars:P?void 0:L,themeClass:_==null?void 0:_.themeClass,onRender:_==null?void 0:_.onRender}},render(){const e=(n,r,t,p,f)=>{var c;const{mergedClsPrefix:y,menuProps:g}=this;(c=this.onRender)===null||c===void 0||c.call(this);const S=(g==null?void 0:g(void 0,this.tmNodes.map(P=>P.rawNode)))||{},C={ref:Ue(r),class:[n,`${y}-dropdown`,this.themeClass],clsPrefix:y,tmNodes:this.tmNodes,style:[...t,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:p,onMouseleave:f};return d(ye,be(this.$attrs,C,S))},{mergedTheme:o}=this,i={show:this.mergedShow,theme:o.peers.Popover,themeOverrides:o.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(ce,Object.assign({},He(this.$props,so),i),{trigger:()=>{var n,r;return(r=(n=this.$slots).default)===null||r===void 0?void 0:r.call(n)}})}});export{Ve as C,mo as N,wo as a,Xe as d,Ye as t};
