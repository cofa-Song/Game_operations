import{m as He,d as re,aQ as A,k as Ee,c as v,aR as we,a as I,aS as Se,e as j,f as F,q as Ve,Z as se,h as l,aT as qe,u as oe,g as q,i as le,j as L,r as V,o as je,ay as Ge,az as Ue,A as Ke,n as ye,as as te,aq as Xe,aU as Ye,b as D,aV as Ze,aW as Qe,aX as Je,ap as _e,p as et,t as tt,aP as rt,aa as Le,aY as Te,ab as Me,aZ as De,a_ as We,a$ as ot,aN as ee,H as Ce,v as J,x as P,s as H,N as lt,z as it,D as i,C as s,E as o,Q as U,S as Y,M as R,F as z,B as ie,W as K,X as ue,G as $e,P as fe,T as ze,U as Z,V as de,$ as ge,K as nt,J as at,Y as Pe}from"./index-IWOp6Bpn.js";import{p as ne,R as st}from"./player-DXkt_g0s.js";import{t as dt,N as Q}from"./Tag-Cwsgnh-C.js";import{u as ct}from"./use-compitable-CKz3cMxL.js";import{N as ut,a as ke}from"./Tabs-De20sYT8.js";import{W as ce}from"./WalletOutline-DmzTmFM4.js";import{N as pe}from"./Space-B1iJ_rNU.js";import{N as ft}from"./Divider-DCl1Xivw.js";import{N as ve}from"./Switch-Bw-rwzpM.js";import{N as gt}from"./Select-CIGOcuFJ.js";import"./bonus-WzX8Tgz6.js";import"./assetLogs-Dslkok5U.js";import"./Add-C-LghUKw.js";import"./Popover-C60ATd9D.js";import"./create-CdyI-x2p.js";import"./Empty-D0gKbZyq.js";function Re(e,r="default",u=[]){const{children:c}=e;if(c!==null&&typeof c=="object"&&!Array.isArray(c)){const d=c[r];if(typeof d=="function")return d()}return u}const pt=He&&"loading"in document.createElement("img");function vt(e={}){var r;const{root:u=null}=e;return{hash:`${e.rootMargin||"0px 0px 0px 0px"}-${Array.isArray(e.threshold)?e.threshold.join(","):(r=e.threshold)!==null&&r!==void 0?r:"0"}`,options:Object.assign(Object.assign({},e),{root:(typeof u=="string"?document.querySelector(u):u)||document.documentElement})}}const he=new WeakMap,be=new WeakMap,me=new WeakMap,ht=(e,r,u)=>{if(!e)return()=>{};const c=vt(r),{root:d}=c.options;let n;const t=he.get(d);t?n=t:(n=new Map,he.set(d,n));let g,h;n.has(c.hash)?(h=n.get(c.hash),h[1].has(e)||(g=h[0],h[1].add(e),g.observe(e))):(g=new IntersectionObserver(m=>{m.forEach(b=>{if(b.isIntersecting){const _=be.get(b.target),w=me.get(b.target);_&&_(),w&&(w.value=!0)}})},c.options),g.observe(e),h=[g,new Set([e])],n.set(c.hash,h));let y=!1;const p=()=>{y||(be.delete(e),me.delete(e),y=!0,h[1].has(e)&&(h[0].unobserve(e),h[1].delete(e)),h[1].size<=0&&n.delete(c.hash),n.size||he.delete(d))};return be.set(e,p),me.set(e,u),p};function bt(e){const{borderRadius:r,avatarColor:u,cardColor:c,fontSize:d,heightTiny:n,heightSmall:t,heightMedium:g,heightLarge:h,heightHuge:y,modalColor:p,popoverColor:m}=e;return{borderRadius:r,fontSize:d,border:`2px solid ${c}`,heightTiny:n,heightSmall:t,heightMedium:g,heightLarge:h,heightHuge:y,color:A(c,u),colorModal:A(p,u),colorPopover:A(m,u)}}const mt={common:re,self:bt},xt=Ee("n-avatar-group"),yt=v("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[we(I("&","--n-merged-color: var(--n-color-modal);")),Se(I("&","--n-merged-color: var(--n-color-popover);")),I("img",`
 width: 100%;
 height: 100%;
 `),j("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),v("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),j("text","line-height: 1.25")]),Ct=Object.assign(Object.assign({},q.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),wt=F({name:"Avatar",props:Ct,slots:Object,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:u}=oe(e),c=V(!1);let d=null;const n=V(null),t=V(null),g=()=>{const{value:f}=n;if(f&&(d===null||d!==f.innerHTML)){d=f.innerHTML;const{value:S}=t;if(S){const{offsetWidth:k,offsetHeight:N}=S,{offsetWidth:O,offsetHeight:M}=f,E=.9,$=Math.min(k/O*E,N/M*E,1);f.style.transform=`translateX(-50%) translateY(-50%) scale(${$})`}}},h=ye(xt,null),y=L(()=>{const{size:f}=e;if(f)return f;const{size:S}=h||{};return S||"medium"}),p=q("Avatar","-avatar",yt,mt,e,r),m=ye(dt,null),b=L(()=>{if(h)return!0;const{round:f,circle:S}=e;return f!==void 0||S!==void 0?f||S:m?m.roundRef.value:!1}),_=L(()=>h?!0:e.bordered||!1),w=L(()=>{const f=y.value,S=b.value,k=_.value,{color:N}=e,{self:{borderRadius:O,fontSize:M,color:E,border:$,colorModal:a,colorPopover:C},common:{cubicBezierEaseInOut:G}}=p.value;let W;return typeof f=="number"?W=`${f}px`:W=p.value.self[te("height",f)],{"--n-font-size":M,"--n-border":k?$:"none","--n-border-radius":S?"50%":O,"--n-color":N||E,"--n-color-modal":N||a,"--n-color-popover":N||C,"--n-bezier":G,"--n-merged-size":`var(--n-avatar-size-override, ${W})`}}),x=u?le("avatar",L(()=>{const f=y.value,S=b.value,k=_.value,{color:N}=e;let O="";return f&&(typeof f=="number"?O+=`a${f}`:O+=f[0]),S&&(O+="b"),k&&(O+="c"),N&&(O+=Xe(N)),O}),w,e):void 0,B=V(!e.lazy);je(()=>{if(e.lazy&&e.intersectionObserverOptions){let f;const S=Ge(()=>{f==null||f(),f=void 0,e.lazy&&(f=ht(t.value,e.intersectionObserverOptions,B))});Ue(()=>{S(),f==null||f()})}}),Ke(()=>{var f;return e.src||((f=e.imgProps)===null||f===void 0?void 0:f.src)},()=>{c.value=!1});const T=V(!e.lazy);return{textRef:n,selfRef:t,mergedRoundRef:b,mergedClsPrefix:r,fitTextTransform:g,cssVars:u?void 0:w,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender,hasLoadError:c,shouldStartLoading:B,loaded:T,mergedOnError:f=>{if(!B.value)return;c.value=!0;const{onError:S,imgProps:{onError:k}={}}=e;S==null||S(f),k==null||k(f)},mergedOnLoad:f=>{const{onLoad:S,imgProps:{onLoad:k}={}}=e;S==null||S(f),k==null||k(f),T.value=!0}}},render(){var e,r;const{$slots:u,src:c,mergedClsPrefix:d,lazy:n,onRender:t,loaded:g,hasLoadError:h,imgProps:y={}}=this;t==null||t();let p;const m=!g&&!h&&(this.renderPlaceholder?this.renderPlaceholder():(r=(e=this.$slots).placeholder)===null||r===void 0?void 0:r.call(e));return this.hasLoadError?p=this.renderFallback?this.renderFallback():Ve(u.fallback,()=>[l("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):p=se(u.default,b=>{if(b)return l(qe,{onResize:this.fitTextTransform},{default:()=>l("span",{ref:"textRef",class:`${d}-avatar__text`},b)});if(c||y.src){const _=this.src||y.src;return l("img",Object.assign(Object.assign({},y),{loading:pt&&!this.intersectionObserverOptions&&n?"lazy":"eager",src:n&&this.intersectionObserverOptions?this.shouldStartLoading?_:void 0:_,"data-image-src":_,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[y.style||"",{objectFit:this.objectFit},m?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),l("span",{ref:"selfRef",class:[`${d}-avatar`,this.themeClass],style:this.cssVars},p,n&&m)}}),St={thPaddingBorderedSmall:"8px 12px",thPaddingBorderedMedium:"12px 16px",thPaddingBorderedLarge:"16px 24px",thPaddingSmall:"0",thPaddingMedium:"0",thPaddingLarge:"0",tdPaddingBorderedSmall:"8px 12px",tdPaddingBorderedMedium:"12px 16px",tdPaddingBorderedLarge:"16px 24px",tdPaddingSmall:"0 0 8px 0",tdPaddingMedium:"0 0 12px 0",tdPaddingLarge:"0 0 16px 0"};function _t(e){const{tableHeaderColor:r,textColor2:u,textColor1:c,cardColor:d,modalColor:n,popoverColor:t,dividerColor:g,borderRadius:h,fontWeightStrong:y,lineHeight:p,fontSizeSmall:m,fontSizeMedium:b,fontSizeLarge:_}=e;return Object.assign(Object.assign({},St),{lineHeight:p,fontSizeSmall:m,fontSizeMedium:b,fontSizeLarge:_,titleTextColor:c,thColor:A(d,r),thColorModal:A(n,r),thColorPopover:A(t,r),thTextColor:c,thFontWeight:y,tdTextColor:u,tdColor:d,tdColorModal:n,tdColorPopover:t,borderColor:A(d,g),borderColorModal:A(n,g),borderColorPopover:A(t,g),borderRadius:h})}const $t={common:re,self:_t},zt=I([v("descriptions",{fontSize:"var(--n-font-size)"},[v("descriptions-separator",`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),v("descriptions-table-wrapper",[v("descriptions-table",[v("descriptions-table-row",[v("descriptions-table-header",{padding:"var(--n-th-padding)"}),v("descriptions-table-content",{padding:"var(--n-td-padding)"})])])]),Ye("bordered",[v("descriptions-table-wrapper",[v("descriptions-table",[v("descriptions-table-row",[I("&:last-child",[v("descriptions-table-content",{paddingBottom:0})])])])])]),D("left-label-placement",[v("descriptions-table-content",[I("> *",{verticalAlign:"top"})])]),D("left-label-align",[I("th",{textAlign:"left"})]),D("center-label-align",[I("th",{textAlign:"center"})]),D("right-label-align",[I("th",{textAlign:"right"})]),D("bordered",[v("descriptions-table-wrapper",`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[v("descriptions-table",[v("descriptions-table-row",[I("&:not(:last-child)",[v("descriptions-table-content",{borderBottom:"1px solid var(--n-merged-border-color)"}),v("descriptions-table-header",{borderBottom:"1px solid var(--n-merged-border-color)"})]),v("descriptions-table-header",`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[I("&:not(:last-child)",{borderRight:"1px solid var(--n-merged-border-color)"})]),v("descriptions-table-content",[I("&:not(:last-child)",{borderRight:"1px solid var(--n-merged-border-color)"})])])])])]),v("descriptions-header",`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),v("descriptions-table-wrapper",`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[v("descriptions-table",`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[v("descriptions-table-row",`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[v("descriptions-table-header",`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),v("descriptions-table-content",`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[j("content",`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),j("label",`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),v("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),we(v("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),Se(v("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Ae="DESCRIPTION_ITEM_FLAG";function Pt(e){return typeof e=="object"&&e&&!Array.isArray(e)?e.type&&e.type[Ae]:!1}const kt=Object.assign(Object.assign({},q.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:"top"},labelAlign:{type:String,default:"left"},separator:{type:String,default:":"},size:{type:String,default:"medium"},bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Oe=F({name:"Descriptions",props:kt,slots:Object,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:u}=oe(e),c=q("Descriptions","-descriptions",zt,$t,e,r),d=L(()=>{const{size:t,bordered:g}=e,{common:{cubicBezierEaseInOut:h},self:{titleTextColor:y,thColor:p,thColorModal:m,thColorPopover:b,thTextColor:_,thFontWeight:w,tdTextColor:x,tdColor:B,tdColorModal:T,tdColorPopover:f,borderColor:S,borderColorModal:k,borderColorPopover:N,borderRadius:O,lineHeight:M,[te("fontSize",t)]:E,[te(g?"thPaddingBordered":"thPadding",t)]:$,[te(g?"tdPaddingBordered":"tdPadding",t)]:a}}=c.value;return{"--n-title-text-color":y,"--n-th-padding":$,"--n-td-padding":a,"--n-font-size":E,"--n-bezier":h,"--n-th-font-weight":w,"--n-line-height":M,"--n-th-text-color":_,"--n-td-text-color":x,"--n-th-color":p,"--n-th-color-modal":m,"--n-th-color-popover":b,"--n-td-color":B,"--n-td-color-modal":T,"--n-td-color-popover":f,"--n-border-radius":O,"--n-border-color":S,"--n-border-color-modal":k,"--n-border-color-popover":N}}),n=u?le("descriptions",L(()=>{let t="";const{size:g,bordered:h}=e;return h&&(t+="a"),t+=g[0],t}),d,e):void 0;return{mergedClsPrefix:r,cssVars:u?void 0:d,themeClass:n==null?void 0:n.themeClass,onRender:n==null?void 0:n.onRender,compitableColumn:ct(e,["columns","column"]),inlineThemeDisabled:u}},render(){const e=this.$slots.default,r=e?Ze(e()):[];r.length;const{contentClass:u,labelClass:c,compitableColumn:d,labelPlacement:n,labelAlign:t,size:g,bordered:h,title:y,cssVars:p,mergedClsPrefix:m,separator:b,onRender:_}=this;_==null||_();const w=r.filter(f=>Pt(f)),x={span:0,row:[],secondRow:[],rows:[]},T=w.reduce((f,S,k)=>{const N=S.props||{},O=w.length-1===k,M=["label"in N?N.label:Re(S,"label")],E=[Re(S)],$=N.span||1,a=f.span;f.span+=$;const C=N.labelStyle||N["label-style"]||this.labelStyle,G=N.contentStyle||N["content-style"]||this.contentStyle;if(n==="left")h?f.row.push(l("th",{class:[`${m}-descriptions-table-header`,c],colspan:1,style:C},M),l("td",{class:[`${m}-descriptions-table-content`,u],colspan:O?(d-a)*2+1:$*2-1,style:G},E)):f.row.push(l("td",{class:`${m}-descriptions-table-content`,colspan:O?(d-a)*2:$*2},l("span",{class:[`${m}-descriptions-table-content__label`,c],style:C},[...M,b&&l("span",{class:`${m}-descriptions-separator`},b)]),l("span",{class:[`${m}-descriptions-table-content__content`,u],style:G},E)));else{const W=O?(d-a)*2:$*2;f.row.push(l("th",{class:[`${m}-descriptions-table-header`,c],colspan:W,style:C},M)),f.secondRow.push(l("td",{class:[`${m}-descriptions-table-content`,u],colspan:W,style:G},E))}return(f.span>=d||O)&&(f.span=0,f.row.length&&(f.rows.push(f.row),f.row=[]),n!=="left"&&f.secondRow.length&&(f.rows.push(f.secondRow),f.secondRow=[])),f},x).rows.map(f=>l("tr",{class:`${m}-descriptions-table-row`},f));return l("div",{style:p,class:[`${m}-descriptions`,this.themeClass,`${m}-descriptions--${n}-label-placement`,`${m}-descriptions--${t}-label-align`,`${m}-descriptions--${g}-size`,h&&`${m}-descriptions--bordered`]},y||this.$slots.header?l("div",{class:`${m}-descriptions-header`},y||Je(this,"header")):null,l("div",{class:`${m}-descriptions-table-wrapper`},l("table",{class:`${m}-descriptions-table`},l("tbody",null,n==="top"&&l("tr",{class:`${m}-descriptions-table-row`,style:{visibility:"collapse"}},Qe(d*2,l("td",null))),T))))}}),Rt={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},X=F({name:"DescriptionsItem",[Ae]:!0,props:Rt,slots:Object,render(){return null}});function Ot(e){const{textColor2:r,cardColor:u,modalColor:c,popoverColor:d,dividerColor:n,borderRadius:t,fontSize:g,hoverColor:h}=e;return{textColor:r,color:u,colorHover:h,colorModal:c,colorHoverModal:A(c,h),colorPopover:d,colorHoverPopover:A(d,h),borderColor:n,borderColorModal:A(c,n),borderColorPopover:A(d,n),borderRadius:t,fontSize:g}}const Bt={common:re,self:Ot};function Nt(e){const{infoColor:r,successColor:u,warningColor:c,errorColor:d,textColor2:n,progressRailColor:t,fontSize:g,fontWeight:h}=e;return{fontSize:g,fontSizeCircle:"28px",fontWeightCircle:h,railColor:t,railHeight:"8px",iconSizeCircle:"36px",iconSizeLine:"18px",iconColor:r,iconColorInfo:r,iconColorSuccess:u,iconColorWarning:c,iconColorError:d,textColorCircle:n,textColorLineInner:"rgb(255, 255, 255)",textColorLineOuter:n,fillColor:r,fillColorInfo:r,fillColorSuccess:u,fillColorWarning:c,fillColorError:d,lineBgProcessing:"linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"}}const It={common:re,self:Nt};function Et(e){const{textColor2:r,textColor3:u,fontSize:c,fontWeight:d}=e;return{labelFontSize:c,labelFontWeight:d,valueFontWeight:d,valueFontSize:"24px",labelTextColor:u,valuePrefixTextColor:r,valueSuffixTextColor:r,valueTextColor:r}}const jt={common:re,self:Et};function Lt(e){const{textColor1:r,textColor2:u,fontWeightStrong:c,fontSize:d}=e;return{fontSize:d,titleTextColor:r,textColor:u,titleFontWeight:c}}const Tt={common:re,self:Lt},Mt=I([v("list",`
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `,[D("show-divider",[v("list-item",[I("&:not(:last-child)",[j("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),D("clickable",[v("list-item",`
 cursor: pointer;
 `)]),D("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),D("hoverable",[v("list-item",`
 border-radius: var(--n-border-radius);
 `,[I("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[j("divider",`
 background-color: transparent;
 `)])])]),D("bordered, hoverable",[v("list-item",`
 padding: 12px 20px;
 `),j("header, footer",`
 padding: 12px 20px;
 `)]),j("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[I("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),v("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[j("prefix",`
 margin-right: 20px;
 flex: 0;
 `),j("suffix",`
 margin-left: 20px;
 flex: 0;
 `),j("main",`
 flex: 1;
 `),j("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),we(v("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),Se(v("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Dt=Object.assign(Object.assign({},q.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),Fe=Ee("n-list"),Be=F({name:"List",props:Dt,slots:Object,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:u,mergedRtlRef:c}=oe(e),d=_e("List",c,r),n=q("List","-list",Mt,Bt,e,r);et(Fe,{showDividerRef:tt(e,"showDivider"),mergedClsPrefixRef:r});const t=L(()=>{const{common:{cubicBezierEaseInOut:h},self:{fontSize:y,textColor:p,color:m,colorModal:b,colorPopover:_,borderColor:w,borderColorModal:x,borderColorPopover:B,borderRadius:T,colorHover:f,colorHoverModal:S,colorHoverPopover:k}}=n.value;return{"--n-font-size":y,"--n-bezier":h,"--n-text-color":p,"--n-color":m,"--n-border-radius":T,"--n-border-color":w,"--n-border-color-modal":x,"--n-border-color-popover":B,"--n-color-modal":b,"--n-color-popover":_,"--n-color-hover":f,"--n-color-hover-modal":S,"--n-color-hover-popover":k}}),g=u?le("list",void 0,t,e):void 0;return{mergedClsPrefix:r,rtlEnabled:d,cssVars:u?void 0:t,themeClass:g==null?void 0:g.themeClass,onRender:g==null?void 0:g.onRender}},render(){var e;const{$slots:r,mergedClsPrefix:u,onRender:c}=this;return c==null||c(),l("ul",{class:[`${u}-list`,this.rtlEnabled&&`${u}-list--rtl`,this.bordered&&`${u}-list--bordered`,this.showDivider&&`${u}-list--show-divider`,this.hoverable&&`${u}-list--hoverable`,this.clickable&&`${u}-list--clickable`,this.themeClass],style:this.cssVars},r.header?l("div",{class:`${u}-list__header`},r.header()):null,(e=r.default)===null||e===void 0?void 0:e.call(r),r.footer?l("div",{class:`${u}-list__footer`},r.footer()):null)}}),xe=F({name:"ListItem",slots:Object,setup(){const e=ye(Fe,null);return e||rt("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:e.showDividerRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{$slots:e,mergedClsPrefix:r}=this;return l("li",{class:`${r}-list-item`},e.prefix?l("div",{class:`${r}-list-item__prefix`},e.prefix()):null,e.default?l("div",{class:`${r}-list-item__main`},e):null,e.suffix?l("div",{class:`${r}-list-item__suffix`},e.suffix()):null,this.showDivider&&l("div",{class:`${r}-list-item__divider`}))}}),Wt={success:l(We,null),error:l(De,null),warning:l(Me,null),info:l(Te,null)},At=F({name:"ProgressCircle",props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:[String,Object],railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:r}){const u=L(()=>{const n="gradient",{fillColor:t}=e;return typeof t=="object"?`${n}-${ot(JSON.stringify(t))}`:n});function c(n,t,g,h){const{gapDegree:y,viewBoxWidth:p,strokeWidth:m}=e,b=50,_=0,w=b,x=0,B=2*b,T=50+m/2,f=`M ${T},${T} m ${_},${w}
      a ${b},${b} 0 1 1 ${x},${-B}
      a ${b},${b} 0 1 1 ${-x},${B}`,S=Math.PI*2*b,k={stroke:h==="rail"?g:typeof e.fillColor=="object"?`url(#${u.value})`:g,strokeDasharray:`${Math.min(n,100)/100*(S-y)}px ${p*8}px`,strokeDashoffset:`-${y/2}px`,transformOrigin:t?"center":void 0,transform:t?`rotate(${t}deg)`:void 0};return{pathString:f,pathStyle:k}}const d=()=>{const n=typeof e.fillColor=="object",t=n?e.fillColor.stops[0]:"",g=n?e.fillColor.stops[1]:"";return n&&l("defs",null,l("linearGradient",{id:u.value,x1:"0%",y1:"100%",x2:"100%",y2:"0%"},l("stop",{offset:"0%","stop-color":t}),l("stop",{offset:"100%","stop-color":g})))};return()=>{const{fillColor:n,railColor:t,strokeWidth:g,offsetDegree:h,status:y,percentage:p,showIndicator:m,indicatorTextColor:b,unit:_,gapOffsetDegree:w,clsPrefix:x}=e,{pathString:B,pathStyle:T}=c(100,0,t,"rail"),{pathString:f,pathStyle:S}=c(p,h,n,"fill"),k=100+g;return l("div",{class:`${x}-progress-content`,role:"none"},l("div",{class:`${x}-progress-graph`,"aria-hidden":!0},l("div",{class:`${x}-progress-graph-circle`,style:{transform:w?`rotate(${w}deg)`:void 0}},l("svg",{viewBox:`0 0 ${k} ${k}`},d(),l("g",null,l("path",{class:`${x}-progress-graph-circle-rail`,d:B,"stroke-width":g,"stroke-linecap":"round",fill:"none",style:T})),l("g",null,l("path",{class:[`${x}-progress-graph-circle-fill`,p===0&&`${x}-progress-graph-circle-fill--empty`],d:f,"stroke-width":g,"stroke-linecap":"round",fill:"none",style:S}))))),m?l("div",null,r.default?l("div",{class:`${x}-progress-custom-content`,role:"none"},r.default()):y!=="default"?l("div",{class:`${x}-progress-icon`,"aria-hidden":!0},l(Le,{clsPrefix:x},{default:()=>Wt[y]})):l("div",{class:`${x}-progress-text`,style:{color:b},role:"none"},l("span",{class:`${x}-progress-text__percentage`},p),l("span",{class:`${x}-progress-text__unit`},_))):null)}}}),Ft={success:l(We,null),error:l(De,null),warning:l(Me,null),info:l(Te,null)},Ht=F({name:"ProgressLine",props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:[String,Object],status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:"%"},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:r}){const u=L(()=>ee(e.height)),c=L(()=>{var t,g;return typeof e.fillColor=="object"?`linear-gradient(to right, ${(t=e.fillColor)===null||t===void 0?void 0:t.stops[0]} , ${(g=e.fillColor)===null||g===void 0?void 0:g.stops[1]})`:e.fillColor}),d=L(()=>e.railBorderRadius!==void 0?ee(e.railBorderRadius):e.height!==void 0?ee(e.height,{c:.5}):""),n=L(()=>e.fillBorderRadius!==void 0?ee(e.fillBorderRadius):e.railBorderRadius!==void 0?ee(e.railBorderRadius):e.height!==void 0?ee(e.height,{c:.5}):"");return()=>{const{indicatorPlacement:t,railColor:g,railStyle:h,percentage:y,unit:p,indicatorTextColor:m,status:b,showIndicator:_,processing:w,clsPrefix:x}=e;return l("div",{class:`${x}-progress-content`,role:"none"},l("div",{class:`${x}-progress-graph`,"aria-hidden":!0},l("div",{class:[`${x}-progress-graph-line`,{[`${x}-progress-graph-line--indicator-${t}`]:!0}]},l("div",{class:`${x}-progress-graph-line-rail`,style:[{backgroundColor:g,height:u.value,borderRadius:d.value},h]},l("div",{class:[`${x}-progress-graph-line-fill`,w&&`${x}-progress-graph-line-fill--processing`],style:{maxWidth:`${e.percentage}%`,background:c.value,height:u.value,lineHeight:u.value,borderRadius:n.value}},t==="inside"?l("div",{class:`${x}-progress-graph-line-indicator`,style:{color:m}},r.default?r.default():`${y}${p}`):null)))),_&&t==="outside"?l("div",null,r.default?l("div",{class:`${x}-progress-custom-content`,style:{color:m},role:"none"},r.default()):b==="default"?l("div",{role:"none",class:`${x}-progress-icon ${x}-progress-icon--as-text`,style:{color:m}},y,p):l("div",{class:`${x}-progress-icon`,"aria-hidden":!0},l(Le,{clsPrefix:x},{default:()=>Ft[b]}))):null)}}});function Ne(e,r,u=100){return`m ${u/2} ${u/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}const Vt=F({name:"ProgressMultipleCircle",props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:r}){const u=L(()=>e.percentage.map((n,t)=>`${Math.PI*n/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*t)-e.circleGap*t)*2}, ${e.viewBoxWidth*8}`)),c=(d,n)=>{const t=e.fillColor[n],g=typeof t=="object"?t.stops[0]:"",h=typeof t=="object"?t.stops[1]:"";return typeof e.fillColor[n]=="object"&&l("linearGradient",{id:`gradient-${n}`,x1:"100%",y1:"0%",x2:"0%",y2:"100%"},l("stop",{offset:"0%","stop-color":g}),l("stop",{offset:"100%","stop-color":h}))};return()=>{const{viewBoxWidth:d,strokeWidth:n,circleGap:t,showIndicator:g,fillColor:h,railColor:y,railStyle:p,percentage:m,clsPrefix:b}=e;return l("div",{class:`${b}-progress-content`,role:"none"},l("div",{class:`${b}-progress-graph`,"aria-hidden":!0},l("div",{class:`${b}-progress-graph-circle`},l("svg",{viewBox:`0 0 ${d} ${d}`},l("defs",null,m.map((_,w)=>c(_,w))),m.map((_,w)=>l("g",{key:w},l("path",{class:`${b}-progress-graph-circle-rail`,d:Ne(d/2-n/2*(1+2*w)-t*w,n,d),"stroke-width":n,"stroke-linecap":"round",fill:"none",style:[{strokeDashoffset:0,stroke:y[w]},p[w]]}),l("path",{class:[`${b}-progress-graph-circle-fill`,_===0&&`${b}-progress-graph-circle-fill--empty`],d:Ne(d/2-n/2*(1+2*w)-t*w,n,d),"stroke-width":n,"stroke-linecap":"round",fill:"none",style:{strokeDasharray:u.value[w],strokeDashoffset:0,stroke:typeof h[w]=="object"?`url(#gradient-${w})`:h[w]}})))))),g&&r.default?l("div",null,l("div",{class:`${b}-progress-text`},r.default())):null)}}}),qt=I([v("progress",{display:"inline-block"},[v("progress-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),D("line",`
 width: 100%;
 display: block;
 `,[v("progress-content",`
 display: flex;
 align-items: center;
 `,[v("progress-graph",{flex:1})]),v("progress-custom-content",{marginLeft:"14px"}),v("progress-icon",`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[D("as-text",`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),D("circle, dashboard",{width:"120px"},[v("progress-custom-content",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),v("progress-text",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),v("progress-icon",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),D("multiple-circle",`
 width: 200px;
 color: inherit;
 `,[v("progress-text",`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),v("progress-content",{position:"relative"}),v("progress-graph",{position:"relative"},[v("progress-graph-circle",[I("svg",{verticalAlign:"bottom"}),v("progress-graph-circle-fill",`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[D("empty",{opacity:0})]),v("progress-graph-circle-rail",`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),v("progress-graph-line",[D("indicator-inside",[v("progress-graph-line-rail",`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[v("progress-graph-line-fill",`
 height: inherit;
 border-radius: 10px;
 `),v("progress-graph-line-indicator",`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),D("indicator-inside-label",`
 height: 16px;
 display: flex;
 align-items: center;
 `,[v("progress-graph-line-rail",`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),v("progress-graph-line-indicator",`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),v("progress-graph-line-rail",`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[v("progress-graph-line-fill",`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[D("processing",[I("&::after",`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),I("@keyframes progress-processing-animation",`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]),Gt=Object.assign(Object.assign({},q.props),{processing:Boolean,type:{type:String,default:"line"},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:"default"},railColor:[String,Array],railStyle:[String,Array],color:[String,Array,Object],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:"%"},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:"outside"},indicatorPlacement:{type:String,default:"outside"},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number}),Ut=F({name:"Progress",props:Gt,setup(e){const r=L(()=>e.indicatorPlacement||e.indicatorPosition),u=L(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),{mergedClsPrefixRef:c,inlineThemeDisabled:d}=oe(e),n=q("Progress","-progress",qt,It,e,c),t=L(()=>{const{status:h}=e,{common:{cubicBezierEaseInOut:y},self:{fontSize:p,fontSizeCircle:m,railColor:b,railHeight:_,iconSizeCircle:w,iconSizeLine:x,textColorCircle:B,textColorLineInner:T,textColorLineOuter:f,lineBgProcessing:S,fontWeightCircle:k,[te("iconColor",h)]:N,[te("fillColor",h)]:O}}=n.value;return{"--n-bezier":y,"--n-fill-color":O,"--n-font-size":p,"--n-font-size-circle":m,"--n-font-weight-circle":k,"--n-icon-color":N,"--n-icon-size-circle":w,"--n-icon-size-line":x,"--n-line-bg-processing":S,"--n-rail-color":b,"--n-rail-height":_,"--n-text-color-circle":B,"--n-text-color-line-inner":T,"--n-text-color-line-outer":f}}),g=d?le("progress",L(()=>e.status[0]),t,e):void 0;return{mergedClsPrefix:c,mergedIndicatorPlacement:r,gapDeg:u,cssVars:d?void 0:t,themeClass:g==null?void 0:g.themeClass,onRender:g==null?void 0:g.onRender}},render(){const{type:e,cssVars:r,indicatorTextColor:u,showIndicator:c,status:d,railColor:n,railStyle:t,color:g,percentage:h,viewBoxWidth:y,strokeWidth:p,mergedIndicatorPlacement:m,unit:b,borderRadius:_,fillBorderRadius:w,height:x,processing:B,circleGap:T,mergedClsPrefix:f,gapDeg:S,gapOffsetDegree:k,themeClass:N,$slots:O,onRender:M}=this;return M==null||M(),l("div",{class:[N,`${f}-progress`,`${f}-progress--${e}`,`${f}-progress--${d}`],style:r,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":h,role:e==="circle"||e==="line"||e==="dashboard"?"progressbar":"none"},e==="circle"||e==="dashboard"?l(At,{clsPrefix:f,status:d,showIndicator:c,indicatorTextColor:u,railColor:n,fillColor:g,railStyle:t,offsetDegree:this.offsetDegree,percentage:h,viewBoxWidth:y,strokeWidth:p,gapDegree:S===void 0?e==="dashboard"?75:0:S,gapOffsetDegree:k,unit:b},O):e==="line"?l(Ht,{clsPrefix:f,status:d,showIndicator:c,indicatorTextColor:u,railColor:n,fillColor:g,railStyle:t,percentage:h,processing:B,indicatorPlacement:m,unit:b,fillBorderRadius:w,railBorderRadius:_,height:x},O):e==="multiple-circle"?l(Vt,{clsPrefix:f,strokeWidth:p,railColor:n,fillColor:g,railStyle:t,viewBoxWidth:y,percentage:h,showIndicator:c,circleGap:T},O):null)}}),Kt=v("statistic",[j("label",`
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `),v("statistic-value",`
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `,[j("prefix",`
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `,[v("icon",{verticalAlign:"-0.125em"})]),j("content",`
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `),j("suffix",`
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `,[v("icon",{verticalAlign:"-0.125em"})])])]),Xt=Object.assign(Object.assign({},q.props),{tabularNums:Boolean,label:String,value:[String,Number]}),ae=F({name:"Statistic",props:Xt,slots:Object,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:u,mergedRtlRef:c}=oe(e),d=q("Statistic","-statistic",Kt,jt,e,r),n=_e("Statistic",c,r),t=L(()=>{const{self:{labelFontWeight:h,valueFontSize:y,valueFontWeight:p,valuePrefixTextColor:m,labelTextColor:b,valueSuffixTextColor:_,valueTextColor:w,labelFontSize:x},common:{cubicBezierEaseInOut:B}}=d.value;return{"--n-bezier":B,"--n-label-font-size":x,"--n-label-font-weight":h,"--n-label-text-color":b,"--n-value-font-weight":p,"--n-value-font-size":y,"--n-value-prefix-text-color":m,"--n-value-suffix-text-color":_,"--n-value-text-color":w}}),g=u?le("statistic",void 0,t,e):void 0;return{rtlEnabled:n,mergedClsPrefix:r,cssVars:u?void 0:t,themeClass:g==null?void 0:g.themeClass,onRender:g==null?void 0:g.onRender}},render(){var e;const{mergedClsPrefix:r,$slots:{default:u,label:c,prefix:d,suffix:n}}=this;return(e=this.onRender)===null||e===void 0||e.call(this),l("div",{class:[`${r}-statistic`,this.themeClass,this.rtlEnabled&&`${r}-statistic--rtl`],style:this.cssVars},se(c,t=>l("div",{class:`${r}-statistic__label`},this.label||t)),l("div",{class:`${r}-statistic-value`,style:{fontVariantNumeric:this.tabularNums?"tabular-nums":""}},se(d,t=>t&&l("span",{class:`${r}-statistic-value__prefix`},t)),this.value!==void 0?l("span",{class:`${r}-statistic-value__content`},this.value):se(u,t=>t&&l("span",{class:`${r}-statistic-value__content`},t)),se(n,t=>t&&l("span",{class:`${r}-statistic-value__suffix`},t))))}}),Yt=v("thing",`
 display: flex;
 transition: color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 color: var(--n-text-color);
`,[v("thing-avatar",`
 margin-right: 12px;
 margin-top: 2px;
 `),v("thing-avatar-header-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 `,[v("thing-header-wrapper",`
 flex: 1;
 `)]),v("thing-main",`
 flex-grow: 1;
 `,[v("thing-header",`
 display: flex;
 margin-bottom: 4px;
 justify-content: space-between;
 align-items: center;
 `,[j("title",`
 font-size: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-title-text-color);
 `)]),j("description",[I("&:not(:last-child)",`
 margin-bottom: 4px;
 `)]),j("content",[I("&:not(:first-child)",`
 margin-top: 12px;
 `)]),j("footer",[I("&:not(:first-child)",`
 margin-top: 12px;
 `)]),j("action",[I("&:not(:first-child)",`
 margin-top: 12px;
 `)])])]),Zt=Object.assign(Object.assign({},q.props),{title:String,titleExtra:String,description:String,descriptionClass:String,descriptionStyle:[String,Object],content:String,contentClass:String,contentStyle:[String,Object],contentIndented:Boolean}),Qt=F({name:"Thing",props:Zt,slots:Object,setup(e,{slots:r}){const{mergedClsPrefixRef:u,inlineThemeDisabled:c,mergedRtlRef:d}=oe(e),n=q("Thing","-thing",Yt,Tt,e,u),t=_e("Thing",d,u),g=L(()=>{const{self:{titleTextColor:y,textColor:p,titleFontWeight:m,fontSize:b},common:{cubicBezierEaseInOut:_}}=n.value;return{"--n-bezier":_,"--n-font-size":b,"--n-text-color":p,"--n-title-font-weight":m,"--n-title-text-color":y}}),h=c?le("thing",void 0,g,e):void 0;return()=>{var y;const{value:p}=u,m=t?t.value:!1;return(y=h==null?void 0:h.onRender)===null||y===void 0||y.call(h),l("div",{class:[`${p}-thing`,h==null?void 0:h.themeClass,m&&`${p}-thing--rtl`],style:c?void 0:g.value},r.avatar&&e.contentIndented?l("div",{class:`${p}-thing-avatar`},r.avatar()):null,l("div",{class:`${p}-thing-main`},!e.contentIndented&&(r.header||e.title||r["header-extra"]||e.titleExtra||r.avatar)?l("div",{class:`${p}-thing-avatar-header-wrapper`},r.avatar?l("div",{class:`${p}-thing-avatar`},r.avatar()):null,r.header||e.title||r["header-extra"]||e.titleExtra?l("div",{class:`${p}-thing-header-wrapper`},l("div",{class:`${p}-thing-header`},r.header||e.title?l("div",{class:`${p}-thing-header__title`},r.header?r.header():e.title):null,r["header-extra"]||e.titleExtra?l("div",{class:`${p}-thing-header__extra`},r["header-extra"]?r["header-extra"]():e.titleExtra):null),r.description||e.description?l("div",{class:[`${p}-thing-main__description`,e.descriptionClass],style:e.descriptionStyle},r.description?r.description():e.description):null):null):l(Ce,null,r.header||e.title||r["header-extra"]||e.titleExtra?l("div",{class:`${p}-thing-header`},r.header||e.title?l("div",{class:`${p}-thing-header__title`},r.header?r.header():e.title):null,r["header-extra"]||e.titleExtra?l("div",{class:`${p}-thing-header__extra`},r["header-extra"]?r["header-extra"]():e.titleExtra):null):null,r.description||e.description?l("div",{class:[`${p}-thing-main__description`,e.descriptionClass],style:e.descriptionStyle},r.description?r.description():e.description):null),r.default||e.content?l("div",{class:[`${p}-thing-main__content`,e.contentClass],style:e.contentStyle},r.default?r.default():e.content):null,r.footer?l("div",{class:`${p}-thing-main__footer`},r.footer()):null,r.action?l("div",{class:`${p}-thing-main__action`},r.action()):null))}}}),Jt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ie=F({name:"AlertCircleOutline",render:function(r,u){return H(),J("svg",Jt,u[0]||(u[0]=[P("path",{d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),P("path",{d:"M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),P("path",{d:"M256 367.91a20 20 0 1 1 20-20a20 20 0 0 1-20 20z",fill:"currentColor"},null,-1)]))}}),er={key:0,class:"p-6"},tr={class:"flex flex-col items-center mb-6"},rr={class:"text-xl font-bold"},or={class:"text-gray-500"},lr={class:"mt-4 flex flex-wrap gap-2"},ir={key:0,class:"mb-4"},nr={class:"flex justify-between text-xs text-gray-500 mb-1"},ar={class:"text-lg font-bold"},sr={class:"text-md"},dr={class:"text-md"},cr={key:1,class:"py-8 text-center text-gray-400"},ur={class:"flex justify-between items-center"},fr={class:"text-xs"},gr={class:"text-xs text-gray-400"},pr={class:"font-bold"},vr={class:"text-xs text-gray-500"},hr={key:0,class:"text-xs text-gray-500 mb-2"},br={class:"flex justify-end gap-2"},mr={class:"flex justify-end gap-2"},xr={class:"text-red-500 mb-4 bg-red-50 p-3 rounded"},yr={class:"flex justify-end gap-2"},Tr=F({__name:"PlayerDetail",setup(e){const r=nt(),u=at(),c=lt(),{t:d}=it(),n=r.params.id,t=V(null),g=V([]),h=V(!1),y=V(!1),p=Pe({}),m=V(!1),b=Pe({status:"ACTIVE",reason:"",forceKick:!1}),_=[{label:"正常",value:"ACTIVE"},{label:"鎖定",value:"LOCKED"},{label:"凍結",value:"FROZEN"},{label:"停權",value:"SUSPENDED"}],w=V(!1),x=V(""),B=async()=>{h.value=!0;try{const $=await ne.getPlayerDetail(n);$.code===0&&$.data?t.value=$.data:(c.error($.msg),u.push("/admin/players"));const a=await ne.getAuditLogs(n);a.code===0&&a.data&&(g.value=a.data)}catch{c.error("載入失敗")}finally{h.value=!1}},T=()=>{t.value&&(p.display_name=t.value.display_name,p.phone=t.value.phone,p.is_muted=t.value.is_muted,p.is_gift_disabled=t.value.is_gift_disabled,y.value=!0)},f=async()=>{try{const $=await ne.updatePlayer(n,p,"Admin Edit");$.code===0?(c.success("更新成功"),y.value=!1,B()):c.error($.msg)}catch{c.error("更新失敗")}},S=()=>{t.value&&(b.status=t.value.status,b.reason="",b.forceKick=!1,m.value=!0)},k=async()=>{if(!b.reason){c.warning("請填寫異動原因");return}try{const $=await ne.updatePlayerStatus(n,b.status,b.reason,b.forceKick);$.code===0?(c.success("狀態更新成功"),m.value=!1,B()):c.error($.msg)}catch{c.error("狀態更新失敗")}},N=()=>{x.value="",w.value=!0},O=async()=>{if(!x.value){c.warning("請填寫原因");return}try{const $=await ne.abandonBonus(n,x.value);$.code===0?(c.success("已放棄獎勵"),st.abandonBonus(t.value),w.value=!1,B()):c.error($.msg)}catch{c.error("操作失敗")}},M=($,a)=>{if(!t.value)return 0;const C=t.value.wallets.find(G=>G.type===$&&(!a||G.currency===a));return C?C.balance:0},E=$=>$.toLocaleString();return je(()=>{if(!n){u.push("/admin/players");return}B()}),($,a)=>t.value?(H(),J("div",er,[i(o(ue),{"x-gap":12,"y-gap":12,cols:"1 240:1 800:3"},{default:s(()=>[i(o(U),{span:"1"},{default:s(()=>[i(o(Y),{title:o(d)("player.list.basicInfo"),class:"mb-4"},{default:s(()=>[P("div",tr,[i(o(wt),{round:"",size:80,class:"mb-2"},{default:s(()=>[R(z(t.value.username.substring(0,1).toUpperCase()),1)]),_:1}),P("div",rr,z(t.value.display_name),1),P("div",or,"ID: "+z(t.value.id),1),i(o(pe),{class:"mt-2"},{default:s(()=>[i(o(Q),{type:t.value.status==="ACTIVE"?"success":"error"},{default:s(()=>[R(z(t.value.status),1)]),_:1},8,["type"]),t.value.is_online?(H(),ie(o(Q),{key:0,type:"success",bordered:""},{default:s(()=>[...a[14]||(a[14]=[R("ONLINE",-1)])]),_:1})):(H(),ie(o(Q),{key:1,type:"default",bordered:""},{default:s(()=>[...a[15]||(a[15]=[R("OFFLINE",-1)])]),_:1}))]),_:1})]),i(o(Oe),{column:1,"label-placement":"left",bordered:""},{default:s(()=>[i(o(X),{label:"帳號"},{default:s(()=>[R(z(t.value.username),1)]),_:1}),i(o(X),{label:"手機號碼"},{default:s(()=>[R(z(t.value.phone||"-"),1)]),_:1}),i(o(X),{label:"VIP 等級"},{default:s(()=>[R("LV."+z(t.value.vip_level),1)]),_:1}),i(o(X),{label:"推薦人"},{default:s(()=>[R(z(t.value.referrer_id||"-"),1)]),_:1}),i(o(X),{label:"註冊來源"},{default:s(()=>[R(z(t.value.register_source),1)]),_:1}),i(o(X),{label:"註冊時間"},{default:s(()=>[R(z(t.value.register_at.split("T")[0]),1)]),_:1}),i(o(X),{label:"最後登入"},{default:s(()=>{var C;return[R(z(((C=t.value.last_login_at)==null?void 0:C.split("T")[0])||"-"),1)]}),_:1})]),_:1}),P("div",lr,[i(o(K),{block:"",class:"flex-1 min-w-[120px]",type:"primary",onClick:T},{default:s(()=>[R(z(o(d)("common.editInfo")),1)]),_:1}),i(o(K),{block:"",class:"flex-1 min-w-[120px]",type:"warning",onClick:S},{default:s(()=>[R(z(o(d)("player.list.statusManagement")),1)]),_:1})])]),_:1},8,["title"]),i(o(Y),{title:"帳號權限",size:"small"},{default:s(()=>[i(o(Oe),{column:1,"label-placement":"left"},{default:s(()=>[i(o(X),{label:"全服禁言"},{default:s(()=>[i(o(Q),{type:t.value.is_muted?"error":"success"},{default:s(()=>[R(z(t.value.is_muted?"開啟":"關閉"),1)]),_:1},8,["type"])]),_:1}),i(o(X),{label:"禁止贈禮"},{default:s(()=>[i(o(Q),{type:t.value.is_gift_disabled?"error":"success"},{default:s(()=>[R(z(t.value.is_gift_disabled?"開啟":"關閉"),1)]),_:1},8,["type"])]),_:1})]),_:1})]),_:1})]),_:1}),i(o(U),{span:"2"},{default:s(()=>[i(o(Y),{"content-style":"padding: 0;"},{default:s(()=>[i(o(ut),{type:"line",size:"large","tabs-padding":20,"pane-style":"padding: 20px;"},{default:s(()=>[i(o(ke),{name:"wallet",tab:o(d)("player.list.walletMonitor")},{default:s(()=>[i(o(ue),{cols:"2","x-gap":12,"y-gap":12},{default:s(()=>[i(o(U),null,{default:s(()=>[i(o(Y),{size:"small",title:o(d)("player.list.depositWallet")},{"header-extra":s(()=>[i(o(ce),{class:"w-5 h-5 text-blue-500"})]),default:s(()=>[i(o(pe),{vertical:"",size:"small"},{default:s(()=>[i(o(ae),{label:o(d)("common.goldBalance"),value:E(M("CASH","GOLD"))},{prefix:s(()=>[...a[16]||(a[16]=[R("$ ",-1)])]),_:1},8,["label","value"]),i(o(ae),{label:o(d)("common.silverBalance"),value:E(M("CASH","SILVER"))},{prefix:s(()=>[...a[17]||(a[17]=[R("$ ",-1)])]),_:1},8,["label","value"])]),_:1})]),_:1},8,["title"])]),_:1}),i(o(U),null,{default:s(()=>[i(o(Y),{size:"small",title:o(d)("player.list.activityWallet")},{"header-extra":s(()=>[i(o(ce),{class:"w-5 h-5 text-orange-400"})]),default:s(()=>[i(o(ae),{label:o(d)("common.silverBalance"),value:E(M("BONUS","SILVER"))},{prefix:s(()=>[...a[18]||(a[18]=[R("$ ",-1)])]),_:1},8,["label","value"])]),_:1},8,["title"])]),_:1}),i(o(U),null,{default:s(()=>[i(o(Y),{size:"small",title:o(d)("player.list.gameWallet")},{"header-extra":s(()=>[i(o(ce),{class:"w-5 h-5 text-yellow-800"})]),default:s(()=>[i(o(ae),{label:o(d)("common.bronzeBalance"),value:E(M("GAME","BRONZE"))},{prefix:s(()=>[...a[19]||(a[19]=[R("$ ",-1)])]),_:1},8,["label","value"])]),_:1},8,["title"])]),_:1}),i(o(U),null,{default:s(()=>[i(o(Y),{size:"small",title:o(d)("player.list.safeWallet")},{"header-extra":s(()=>[i(o(ce),{class:"w-5 h-5 text-yellow-500"})]),default:s(()=>[i(o(ae),{label:o(d)("common.balance"),value:E(M("SAFE","GOLD"))},{prefix:s(()=>[...a[20]||(a[20]=[R("$ ",-1)])]),_:1},8,["label","value"])]),_:1},8,["title"])]),_:1}),i(o(U),{class:"col-span-2"},{default:s(()=>[i(o(Y),{size:"small",title:o(d)("player.list.rolloverMonitor"),class:"mt-2"},{"header-extra":s(()=>[i(o(K),{size:"tiny",type:"error",ghost:"",onClick:N},{default:s(()=>[...a[21]||(a[21]=[R("放棄獎勵",-1)])]),_:1})]),default:s(()=>{var C;return[((C=t.value.rollover_container)==null?void 0:C.status)==="ACTIVE"?(H(),J("div",ir,[P("div",nr,[P("span",null,"流水監控 ("+z(t.value.rollover_container.active_card_id)+")",1),P("span",null,z(t.value.rollover_container.current_wagering)+" / "+z(t.value.rollover_container.target_wagering),1)]),i(o(Ut),{type:"line",percentage:Math.min(100,Math.round(t.value.rollover_container.current_wagering/t.value.rollover_container.target_wagering*100)),color:t.value.rollover_container.current_wagering>=t.value.rollover_container.target_wagering?"#18a058":"#f0a020"},null,8,["percentage","color"]),i(o(ue),{cols:"3",class:"mt-3 text-center"},{default:s(()=>[i(o(U),null,{default:s(()=>[a[22]||(a[22]=P("div",{class:"text-xs text-gray-400"},"當前餘額",-1)),P("div",ar,"$ "+z(E(t.value.rollover_container.lave_balance)),1)]),_:1}),i(o(U),null,{default:s(()=>[a[23]||(a[23]=P("div",{class:"text-xs text-gray-400"},"初始金額",-1)),P("div",sr,"$ "+z(E(t.value.rollover_container.start_balance)),1)]),_:1}),i(o(U),null,{default:s(()=>[a[24]||(a[24]=P("div",{class:"text-xs text-gray-400"},"轉出上限",-1)),P("div",dr,"$ "+z(E(t.value.rollover_container.cap)),1)]),_:1})]),_:1})])):(H(),J("div",cr,[i(o(Ie),{class:"w-8 h-8 mb-2 mx-auto op-50"}),a[25]||(a[25]=P("div",null,"當前無進行中活動",-1))])),i(o(ft),{class:"my-2"}),a[27]||(a[27]=P("div",{class:"text-xs font-bold mb-2"},"待領取列表 (Queue)",-1)),i(o(Be),{size:"small"},{default:s(()=>{var G;return[(H(!0),J(Ce,null,$e(t.value.bonus_queue,W=>(H(),ie(o(xe),{key:W.id},{default:s(()=>[P("div",ur,[P("div",null,[i(o(Q),{size:"small",type:"warning",class:"mr-2"},{default:s(()=>[R(z(o(d)(`common.${W.currency.toLowerCase()}`)),1)]),_:2},1024),P("span",fr,z(W.id),1),P("div",gr," Roll: "+z(W.multiplier)+"x | Cap: $ "+z(E(W.cap))+" | Exp: "+z(W.end_time.split("T")[0]),1)]),P("div",pr,"$ +"+z(E(W.lave_amount)),1)])]),_:2},1024))),128)),(G=t.value.bonus_queue)!=null&&G.length?fe("",!0):(H(),ie(o(xe),{key:0},{default:s(()=>[...a[26]||(a[26]=[P("div",{class:"text-center text-gray-400 text-xs"},"列表為空",-1)])]),_:1}))]}),_:1})]}),_:1},8,["title"])]),_:1})]),_:1})]),_:1},8,["tab"]),i(o(ke),{name:"audit",tab:"異動紀錄"},{default:s(()=>[i(o(Be),null,{default:s(()=>[(H(!0),J(Ce,null,$e(g.value,C=>(H(),ie(o(xe),{key:C.id},{default:s(()=>[i(o(Qt),{title:C.action,"content-style":{marginTop:"10px"}},{description:s(()=>[i(o(pe),{size:"small",style:{"margin-top":"4px"}},{default:s(()=>[i(o(Q),{size:"small",bordered:!1,type:"info"},{default:s(()=>[R(z(C.operator),1)]),_:2},1024),P("span",vr,z(C.created_at),1)]),_:2},1024)]),default:s(()=>[C.old_value||C.new_value?(H(),J("div",hr,z(C.old_value)+" -> "+z(C.new_value),1)):fe("",!0),P("div",null,"原因: "+z(C.reason),1)]),_:2},1032,["title"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),i(o(ge),{show:y.value,"onUpdate:show":a[5]||(a[5]=C=>y.value=C),preset:"card",title:"編輯玩家資料",style:{width:"500px"}},{footer:s(()=>[P("div",br,[i(o(K),{onClick:a[4]||(a[4]=C=>y.value=!1)},{default:s(()=>[...a[28]||(a[28]=[R("取消",-1)])]),_:1}),i(o(K),{type:"primary",onClick:f},{default:s(()=>[...a[29]||(a[29]=[R("儲存",-1)])]),_:1})])]),default:s(()=>[i(o(ze),{model:p,"label-placement":"left","label-width":"80"},{default:s(()=>[i(o(Z),{label:"顯示名稱"},{default:s(()=>[i(o(de),{value:p.display_name,"onUpdate:value":a[0]||(a[0]=C=>p.display_name=C)},null,8,["value"])]),_:1}),i(o(Z),{label:"手機號碼"},{default:s(()=>[i(o(de),{value:p.phone,"onUpdate:value":a[1]||(a[1]=C=>p.phone=C)},null,8,["value"])]),_:1}),i(o(Z),{label:"全服禁言"},{default:s(()=>[i(o(ve),{value:p.is_muted,"onUpdate:value":a[2]||(a[2]=C=>p.is_muted=C)},null,8,["value"])]),_:1}),i(o(Z),{label:"禁止贈禮"},{default:s(()=>[i(o(ve),{value:p.is_gift_disabled,"onUpdate:value":a[3]||(a[3]=C=>p.is_gift_disabled=C)},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show"]),i(o(ge),{show:m.value,"onUpdate:show":a[10]||(a[10]=C=>m.value=C),preset:"card",title:"變更帳戶狀態",style:{width:"400px"}},{footer:s(()=>[P("div",mr,[i(o(K),{onClick:a[9]||(a[9]=C=>m.value=!1)},{default:s(()=>[...a[31]||(a[31]=[R("取消",-1)])]),_:1}),i(o(K),{type:"primary",onClick:k},{default:s(()=>[...a[32]||(a[32]=[R("確認變更",-1)])]),_:1})])]),default:s(()=>[i(o(ze),{model:b},{default:s(()=>[i(o(Z),{label:"狀態",required:""},{default:s(()=>[i(o(gt),{value:b.status,"onUpdate:value":a[6]||(a[6]=C=>b.status=C),options:_},null,8,["value"])]),_:1}),i(o(Z),{label:"強制踢線"},{default:s(()=>[i(o(ve),{value:b.forceKick,"onUpdate:value":a[7]||(a[7]=C=>b.forceKick=C)},null,8,["value"]),a[30]||(a[30]=P("span",{class:"ml-2 text-xs text-gray-500"},"若勾選，玩家將被強制登出",-1))]),_:1}),i(o(Z),{label:"異動原因",required:""},{default:s(()=>[i(o(de),{type:"textarea",value:b.reason,"onUpdate:value":a[8]||(a[8]=C=>b.reason=C),placeholder:"請詳細說明原因..."},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show"]),i(o(ge),{show:w.value,"onUpdate:show":a[13]||(a[13]=C=>w.value=C),preset:"card",title:"放棄當前獎勵",style:{width:"400px"}},{footer:s(()=>[P("div",yr,[i(o(K),{onClick:a[12]||(a[12]=C=>w.value=!1)},{default:s(()=>[...a[34]||(a[34]=[R("取消",-1)])]),_:1}),i(o(K),{type:"error",onClick:O},{default:s(()=>[...a[35]||(a[35]=[R("確認放棄",-1)])]),_:1})])]),default:s(()=>[P("div",xr,[i(o(Ie),{class:"w-4 h-4 inline mr-1"}),a[33]||(a[33]=R(" 警告：此操作將清空玩家當前活動進度與餘額，且無法復原。 ",-1))]),i(o(de),{type:"textarea",value:x.value,"onUpdate:value":a[11]||(a[11]=C=>x.value=C),placeholder:"請填寫放棄原因..."},null,8,["value"])]),_:1},8,["show"])])):fe("",!0)}});export{Tr as default};
