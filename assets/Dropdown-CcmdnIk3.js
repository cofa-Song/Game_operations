import{B as xe,V as Se,b as Ne,r as Re,N as Pe,p as ae}from"./Popover-CfBNgOAF.js";import{r as B,B as se,e as D,h as d,k as re,bG as V,n as T,bt as ue,ap as ke,b1 as G,j as w,by as ce,p as H,I as Ke,b2 as Ie,co as Ce,bz as Oe,bx as _e,c as x,ao as ze,a as E,aw as ie,b as k,d as z,ae as De,b5 as $e,u as Ae,f as pe,g as Fe,cp as Be,ah as oe,t as K,au as F}from"./index-BsKuKuBe.js";import{N as Te}from"./Icon-CbayTH31.js";import{h as de,c as je}from"./create-Bj8PAPmY.js";import{u as Le}from"./use-keyboard-kkRvbDTj.js";import{c as Me}from"./create-ref-setter-C4J8sofl.js";function Ee(e,t,a){const r=B(e.value);let n=null;return se(e,o=>{n!==null&&window.clearTimeout(n),o===!0?a&&!a.value?r.value=!0:n=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}const He=D({name:"ChevronRight",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",fill:"currentColor"}))}}),te=re("n-dropdown-menu"),X=re("n-dropdown"),le=re("n-dropdown-option"),fe=D({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return d("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),Ue=D({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:t}=T(te),{renderLabelRef:a,labelFieldRef:r,nodePropsRef:n,renderOptionRef:o}=T(X);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:a,nodeProps:n,renderOption:o}},render(){var e;const{clsPrefix:t,hasSubmenu:a,showIcon:r,nodeProps:n,renderLabel:o,renderOption:p}=this,{rawNode:f}=this.tmNode,c=d("div",Object.assign({class:`${t}-dropdown-option`},n==null?void 0:n(f)),d("div",{class:`${t}-dropdown-option-body ${t}-dropdown-option-body--group`},d("div",{"data-dropdown-option":!0,class:[`${t}-dropdown-option-body__prefix`,r&&`${t}-dropdown-option-body__prefix--show-icon`]},V(f.icon)),d("div",{class:`${t}-dropdown-option-body__label`,"data-dropdown-option":!0},o?o(f):V((e=f.title)!==null&&e!==void 0?e:f[this.labelField])),d("div",{class:[`${t}-dropdown-option-body__suffix`,a&&`${t}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return p?p({node:c,option:f}):c}});function ne(e,t){return e.type==="submenu"||e.type===void 0&&e[t]!==void 0}function We(e){return e.type==="group"}function ve(e){return e.type==="divider"}function qe(e){return e.type==="render"}const he=D({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const t=T(X),{hoverKeyRef:a,keyboardKeyRef:r,lastToggledSubmenuKeyRef:n,pendingKeyPathRef:o,activeKeyPathRef:p,animatedRef:f,mergedShowRef:c,renderLabelRef:S,renderIconRef:g,labelFieldRef:N,childrenFieldRef:I,renderOptionRef:R,nodePropsRef:C,menuPropsRef:j}=t,m=T(le,null),O=T(te),U=T(ce),Z=w(()=>e.tmNode.rawNode),W=w(()=>{const{value:l}=I;return ne(e.tmNode.rawNode,l)}),J=w(()=>{const{disabled:l}=e.tmNode;return l}),Q=w(()=>{if(!W.value)return!1;const{key:l,disabled:b}=e.tmNode;if(b)return!1;const{value:P}=a,{value:$}=r,{value:ee}=n,{value:A}=o;return P!==null?A.includes(l):$!==null?A.includes(l)&&A[A.length-1]!==l:ee!==null?A.includes(l):!1}),Y=w(()=>r.value===null&&!f.value),q=Ee(Q,300,Y),L=w(()=>!!(m!=null&&m.enteringSubmenuRef.value)),M=B(!1);H(le,{enteringSubmenuRef:M});function _(){M.value=!0}function i(){M.value=!1}function h(){const{parentKey:l,tmNode:b}=e;b.disabled||c.value&&(n.value=l,r.value=null,a.value=b.key)}function u(){const{tmNode:l}=e;l.disabled||c.value&&a.value!==l.key&&h()}function s(l){if(e.tmNode.disabled||!c.value)return;const{relatedTarget:b}=l;b&&!de({target:b},"dropdownOption")&&!de({target:b},"scrollbarRail")&&(a.value=null)}function y(){const{value:l}=W,{tmNode:b}=e;c.value&&!l&&!b.disabled&&(t.doSelect(b.key,b.rawNode),t.doUpdateShow(!1))}return{labelField:N,renderLabel:S,renderIcon:g,siblingHasIcon:O.showIconRef,siblingHasSubmenu:O.hasSubmenuRef,menuProps:j,popoverBody:U,animated:f,mergedShowSubmenu:w(()=>q.value&&!L.value),rawNode:Z,hasSubmenu:W,pending:G(()=>{const{value:l}=o,{key:b}=e.tmNode;return l.includes(b)}),childActive:G(()=>{const{value:l}=p,{key:b}=e.tmNode,P=l.findIndex($=>b===$);return P===-1?!1:P<l.length-1}),active:G(()=>{const{value:l}=p,{key:b}=e.tmNode,P=l.findIndex($=>b===$);return P===-1?!1:P===l.length-1}),mergedDisabled:J,renderOption:R,nodeProps:C,handleClick:y,handleMouseMove:u,handleMouseEnter:h,handleMouseLeave:s,handleSubmenuBeforeEnter:_,handleSubmenuAfterEnter:i}},render(){var e,t;const{animated:a,rawNode:r,mergedShowSubmenu:n,clsPrefix:o,siblingHasIcon:p,siblingHasSubmenu:f,renderLabel:c,renderIcon:S,renderOption:g,nodeProps:N,props:I,scrollable:R}=this;let C=null;if(n){const U=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,r,r.children);C=d(be,Object.assign({},U,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const j={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},m=N==null?void 0:N(r),O=d("div",Object.assign({class:[`${o}-dropdown-option`,m==null?void 0:m.class],"data-dropdown-option":!0},m),d("div",ue(j,I),[d("div",{class:[`${o}-dropdown-option-body__prefix`,p&&`${o}-dropdown-option-body__prefix--show-icon`]},[S?S(r):V(r.icon)]),d("div",{"data-dropdown-option":!0,class:`${o}-dropdown-option-body__label`},c?c(r):V((t=r[this.labelField])!==null&&t!==void 0?t:r.title)),d("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__suffix`,f&&`${o}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?d(Te,null,{default:()=>d(He,null)}):null)]),this.hasSubmenu?d(xe,null,{default:()=>[d(Se,null,{default:()=>d("div",{class:`${o}-dropdown-offset-container`},d(Ne,{show:this.mergedShowSubmenu,placement:this.placement,to:R&&this.popoverBody||void 0,teleportDisabled:!R},{default:()=>d("div",{class:`${o}-dropdown-menu-wrapper`},a?d(ke,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>C}):C)}))})]}):null);return g?g({node:O,option:r}):O}}),Ge=D({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:t,clsPrefix:a}=this,{children:r}=e;return d(Ke,null,d(Ue,{clsPrefix:a,tmNode:e,key:e.key}),r==null?void 0:r.map(n=>{const{rawNode:o}=n;return o.show===!1?null:ve(o)?d(fe,{clsPrefix:a,key:n.key}):n.isGroup?(Ie("dropdown","`group` node is not allowed to be put in `group` node."),null):d(he,{clsPrefix:a,tmNode:n,parentKey:t,key:n.key})}))}}),Ve=D({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:t}}=this.tmNode;return d("div",t,[e==null?void 0:e()])}}),be=D({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:t,childrenFieldRef:a}=T(X);H(te,{showIconRef:w(()=>{const n=t.value;return e.tmNodes.some(o=>{var p;if(o.isGroup)return(p=o.children)===null||p===void 0?void 0:p.some(({rawNode:c})=>n?n(c):c.icon);const{rawNode:f}=o;return n?n(f):f.icon})}),hasSubmenuRef:w(()=>{const{value:n}=a;return e.tmNodes.some(o=>{var p;if(o.isGroup)return(p=o.children)===null||p===void 0?void 0:p.some(({rawNode:c})=>ne(c,n));const{rawNode:f}=o;return ne(f,n)})})});const r=B(null);return H(Oe,null),H(_e,null),H(ce,r),{bodyRef:r}},render(){const{parentKey:e,clsPrefix:t,scrollable:a}=this,r=this.tmNodes.map(n=>{const{rawNode:o}=n;return o.show===!1?null:qe(o)?d(Ve,{tmNode:n,key:n.key}):ve(o)?d(fe,{clsPrefix:t,key:n.key}):We(o)?d(Ge,{clsPrefix:t,tmNode:n,parentKey:e,key:n.key}):d(he,{clsPrefix:t,tmNode:n,parentKey:e,key:n.key,props:o.props,scrollable:a})});return d("div",{class:[`${t}-dropdown-menu`,a&&`${t}-dropdown-menu--scrollable`],ref:"bodyRef"},a?d(Ce,{contentClass:`${t}-dropdown-menu__content`},{default:()=>r}):r,this.showArrow?Re({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),Xe=x("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ze(),x("dropdown-option",`
 position: relative;
 `,[E("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[E("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),x("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[E("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),ie("disabled",[k("pending",`
 color: var(--n-option-text-color-hover);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),E("&::before","background-color: var(--n-option-color-hover);")]),k("active",`
 color: var(--n-option-text-color-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),E("&::before","background-color: var(--n-option-color-active);")]),k("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),k("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),k("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[z("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[k("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),z("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[k("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),x("icon",`
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
 `,[k("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),x("icon",`
 font-size: var(--n-option-icon-size);
 `)]),x("dropdown-menu","pointer-events: all;")]),x("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),x("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),x("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),E(">",[x("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ie("scrollable",`
 padding: var(--n-padding);
 `),k("scrollable",[z("content",`
 padding: var(--n-padding);
 `)])]),Ze={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},Je=Object.keys(ae),Qe=Object.assign(Object.assign(Object.assign({},ae),Ze),pe.props),io=D({name:"Dropdown",inheritAttrs:!1,props:Qe,setup(e){const t=B(!1),a=$e(K(e,"show"),t),r=w(()=>{const{keyField:i,childrenField:h}=e;return je(e.options,{getKey(u){return u[i]},getDisabled(u){return u.disabled===!0},getIgnored(u){return u.type==="divider"||u.type==="render"},getChildren(u){return u[h]}})}),n=w(()=>r.value.treeNodes),o=B(null),p=B(null),f=B(null),c=w(()=>{var i,h,u;return(u=(h=(i=o.value)!==null&&i!==void 0?i:p.value)!==null&&h!==void 0?h:f.value)!==null&&u!==void 0?u:null}),S=w(()=>r.value.getPath(c.value).keyPath),g=w(()=>r.value.getPath(e.value).keyPath),N=G(()=>e.keyboard&&a.value);Le({keydown:{ArrowUp:{prevent:!0,handler:J},ArrowRight:{prevent:!0,handler:W},ArrowDown:{prevent:!0,handler:Q},ArrowLeft:{prevent:!0,handler:Z},Enter:{prevent:!0,handler:Y},Escape:U}},N);const{mergedClsPrefixRef:I,inlineThemeDisabled:R}=Ae(e),C=pe("Dropdown","-dropdown",Xe,Be,e,I);H(X,{labelFieldRef:K(e,"labelField"),childrenFieldRef:K(e,"childrenField"),renderLabelRef:K(e,"renderLabel"),renderIconRef:K(e,"renderIcon"),hoverKeyRef:o,keyboardKeyRef:p,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:S,activeKeyPathRef:g,animatedRef:K(e,"animated"),mergedShowRef:a,nodePropsRef:K(e,"nodeProps"),renderOptionRef:K(e,"renderOption"),menuPropsRef:K(e,"menuProps"),doSelect:j,doUpdateShow:m}),se(a,i=>{!e.animated&&!i&&O()});function j(i,h){const{onSelect:u}=e;u&&oe(u,i,h)}function m(i){const{"onUpdate:show":h,onUpdateShow:u}=e;h&&oe(h,i),u&&oe(u,i),t.value=i}function O(){o.value=null,p.value=null,f.value=null}function U(){m(!1)}function Z(){L("left")}function W(){L("right")}function J(){L("up")}function Q(){L("down")}function Y(){const i=q();i!=null&&i.isLeaf&&a.value&&(j(i.key,i.rawNode),m(!1))}function q(){var i;const{value:h}=r,{value:u}=c;return!h||u===null?null:(i=h.getNode(u))!==null&&i!==void 0?i:null}function L(i){const{value:h}=c,{value:{getFirstAvailableNode:u}}=r;let s=null;if(h===null){const y=u();y!==null&&(s=y.key)}else{const y=q();if(y){let l;switch(i){case"down":l=y.getNext();break;case"up":l=y.getPrev();break;case"right":l=y.getChild();break;case"left":l=y.getParent();break}l&&(s=l.key)}}s!==null&&(o.value=null,p.value=s)}const M=w(()=>{const{size:i,inverted:h}=e,{common:{cubicBezierEaseInOut:u},self:s}=C.value,{padding:y,dividerColor:l,borderRadius:b,optionOpacityDisabled:P,[F("optionIconSuffixWidth",i)]:$,[F("optionSuffixWidth",i)]:ee,[F("optionIconPrefixWidth",i)]:A,[F("optionPrefixWidth",i)]:we,[F("fontSize",i)]:me,[F("optionHeight",i)]:ye,[F("optionIconSize",i)]:ge}=s,v={"--n-bezier":u,"--n-font-size":me,"--n-padding":y,"--n-border-radius":b,"--n-option-height":ye,"--n-option-prefix-width":we,"--n-option-icon-prefix-width":A,"--n-option-suffix-width":ee,"--n-option-icon-suffix-width":$,"--n-option-icon-size":ge,"--n-divider-color":l,"--n-option-opacity-disabled":P};return h?(v["--n-color"]=s.colorInverted,v["--n-option-color-hover"]=s.optionColorHoverInverted,v["--n-option-color-active"]=s.optionColorActiveInverted,v["--n-option-text-color"]=s.optionTextColorInverted,v["--n-option-text-color-hover"]=s.optionTextColorHoverInverted,v["--n-option-text-color-active"]=s.optionTextColorActiveInverted,v["--n-option-text-color-child-active"]=s.optionTextColorChildActiveInverted,v["--n-prefix-color"]=s.prefixColorInverted,v["--n-suffix-color"]=s.suffixColorInverted,v["--n-group-header-text-color"]=s.groupHeaderTextColorInverted):(v["--n-color"]=s.color,v["--n-option-color-hover"]=s.optionColorHover,v["--n-option-color-active"]=s.optionColorActive,v["--n-option-text-color"]=s.optionTextColor,v["--n-option-text-color-hover"]=s.optionTextColorHover,v["--n-option-text-color-active"]=s.optionTextColorActive,v["--n-option-text-color-child-active"]=s.optionTextColorChildActive,v["--n-prefix-color"]=s.prefixColor,v["--n-suffix-color"]=s.suffixColor,v["--n-group-header-text-color"]=s.groupHeaderTextColor),v}),_=R?Fe("dropdown",w(()=>`${e.size[0]}${e.inverted?"i":""}`),M,e):void 0;return{mergedClsPrefix:I,mergedTheme:C,tmNodes:n,mergedShow:a,handleAfterLeave:()=>{e.animated&&O()},doUpdateShow:m,cssVars:R?void 0:M,themeClass:_==null?void 0:_.themeClass,onRender:_==null?void 0:_.onRender}},render(){const e=(r,n,o,p,f)=>{var c;const{mergedClsPrefix:S,menuProps:g}=this;(c=this.onRender)===null||c===void 0||c.call(this);const N=(g==null?void 0:g(void 0,this.tmNodes.map(R=>R.rawNode)))||{},I={ref:Me(n),class:[r,`${S}-dropdown`,this.themeClass],clsPrefix:S,tmNodes:this.tmNodes,style:[...o,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:p,onMouseleave:f};return d(be,ue(this.$attrs,I,N))},{mergedTheme:t}=this,a={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(Pe,Object.assign({},De(this.$props,Je),a),{trigger:()=>{var r,n;return(n=(r=this.$slots).default)===null||n===void 0?void 0:n.call(r)}})}});export{He as C,io as N};
