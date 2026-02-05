import{c,b as t,d as r,a as n,aw as I,e as N,h as l,a9 as O,f,c7 as H,u as T,ar as V,g as L,j as h,au as u}from"./index-BsKuKuBe.js";import{s as M,r as W}from"./RadioGroup-CgIVku-C.js";function J(a,e){if(!a)return;const o=document.createElement("a");o.href=a,e!==void 0&&(o.download=e),document.body.appendChild(o),o.click(),document.body.removeChild(o)}const K=c("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[t("checked",[r("dot",`
 background-color: var(--n-color-active);
 `)]),r("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),c("radio-input",`
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `),r("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[n("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),t("checked",{boxShadow:"var(--n-box-shadow-active)"},[n("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),r("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),I("disabled",`
 cursor: pointer;
 `,[n("&:hover",[r("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),t("focus",[n("&:not(:active)",[r("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),t("disabled",`
 cursor: not-allowed;
 `,[r("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[n("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),t("checked",`
 opacity: 1;
 `)]),r("label",{color:"var(--n-text-color-disabled)"}),c("radio-input",`
 cursor: not-allowed;
 `)])]),Y=Object.assign(Object.assign({},f.props),W),Q=N({name:"Radio",props:Y,setup(a){const e=M(a),o=f("Radio","-radio",K,H,a,e.mergedClsPrefix),d=h(()=>{const{mergedSize:{value:b}}=e,{common:{cubicBezierEaseInOut:w},self:{boxShadow:x,boxShadowActive:m,boxShadowDisabled:C,boxShadowFocus:k,boxShadowHover:z,color:R,colorDisabled:S,colorActive:y,textColor:$,textColorDisabled:_,dotColorActive:D,dotColorDisabled:E,labelPadding:P,labelLineHeight:B,labelFontWeight:j,[u("fontSize",b)]:A,[u("radioSize",b)]:F}}=o.value;return{"--n-bezier":w,"--n-label-line-height":B,"--n-label-font-weight":j,"--n-box-shadow":x,"--n-box-shadow-active":m,"--n-box-shadow-disabled":C,"--n-box-shadow-focus":k,"--n-box-shadow-hover":z,"--n-color":R,"--n-color-active":y,"--n-color-disabled":S,"--n-dot-color-active":D,"--n-dot-color-disabled":E,"--n-font-size":A,"--n-radio-size":F,"--n-text-color":$,"--n-text-color-disabled":_,"--n-label-padding":P}}),{inlineThemeDisabled:s,mergedClsPrefixRef:v,mergedRtlRef:p}=T(a),g=V("Radio",p,v),i=s?L("radio",h(()=>e.mergedSize.value[0]),d,a):void 0;return Object.assign(e,{rtlEnabled:g,cssVars:s?void 0:d,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender})},render(){const{$slots:a,mergedClsPrefix:e,onRender:o,label:d}=this;return o==null||o(),l("label",{class:[`${e}-radio`,this.themeClass,this.rtlEnabled&&`${e}-radio--rtl`,this.mergedDisabled&&`${e}-radio--disabled`,this.renderSafeChecked&&`${e}-radio--checked`,this.focus&&`${e}-radio--focus`],style:this.cssVars},l("div",{class:`${e}-radio__dot-wrapper`}," ",l("div",{class:[`${e}-radio__dot`,this.renderSafeChecked&&`${e}-radio__dot--checked`]}),l("input",{ref:"inputRef",type:"radio",class:`${e}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur})),O(a.default,s=>!s&&!d?null:l("div",{ref:"labelRef",class:`${e}-radio__label`},s||d)))}});export{Q as N,J as d};
