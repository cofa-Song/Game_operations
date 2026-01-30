import{f as Y,r as b,A as ee,I as te,t as H,h as c,j as I,a as _,ah as pe,c as D,ai as ve,b as P,e as ge,aj as ye,ak as be,al as he,d as we,am as ne,an as xe,q as ke,ao as Ce,u as _e,g as oe,o as ie,ap as Te,i as Se,aq as Ne,ar as $e,as as Ee,s as G,v as ae,x as z,N as ue,B as Oe,C as u,D as s,E as e,W as $,M as N,$ as de,T as J,U as E,V,Y as X,z as Ie,F as M,S as ze,J as Ae}from"./index-IWOp6Bpn.js";import{p as le}from"./player-DXkt_g0s.js";import{N as me,a as j}from"./DataTable-AAHJUiWM.js";import{A as ce,T as Me}from"./TrashOutline-C0zuhoJ7.js";import{C as Re}from"./CreateOutline-DZcdm70R.js";import{u as Pe}from"./composables-DT7IJogh.js";import{N as De,a as Be}from"./DrawerContent-B6fgalEm.js";import{N as Q}from"./Tag-Cwsgnh-C.js";import{N as Ue}from"./Switch-Bw-rwzpM.js";import{N as fe}from"./Space-B1iJ_rNU.js";import{N as Ve}from"./DatePicker-D5-LH6T_.js";import{S as Ye}from"./SearchOutline-gSv0gcQV.js";import{g as Fe,N as K}from"./Select-CIGOcuFJ.js";import{L as qe,G as Le}from"./ListOutline-BLBZ6xnn.js";import{N as se}from"./RadioGroup-BeeyVwhQ.js";import"./bonus-WzX8Tgz6.js";import"./assetLogs-Dslkok5U.js";import"./Dropdown-BxswUyT5.js";import"./Popover-C60ATd9D.js";import"./use-compitable-CKz3cMxL.js";import"./Icon-DZ24gLrW.js";import"./create-CdyI-x2p.js";import"./use-keyboard-B2ZP_AGf.js";import"./create-ref-setter-C4J8sofl.js";import"./Empty-D0gKbZyq.js";import"./Pagination-17N-IN0B.js";const re=Y({name:"SlotMachineNumber",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(t){const i=b(null),r=b(t.value),a=b(t.value),n=b("up"),f=b(!1),T=I(()=>f.value?`${t.clsPrefix}-base-slot-machine-current-number--${n.value}-scroll`:null),S=I(()=>f.value?`${t.clsPrefix}-base-slot-machine-old-number--${n.value}-scroll`:null);ee(H(t,"value"),(p,y)=>{r.value=y,a.value=p,te(A)});function A(){const p=t.newOriginalNumber,y=t.oldOriginalNumber;y===void 0||p===void 0||(p>y?C("up"):y>p&&C("down"))}function C(p){n.value=p,f.value=!1,te(()=>{var y;(y=i.value)===null||y===void 0||y.offsetWidth,f.value=!0})}return()=>{const{clsPrefix:p}=t;return c("span",{ref:i,class:`${p}-base-slot-machine-number`},r.value!==null?c("span",{class:[`${p}-base-slot-machine-old-number ${p}-base-slot-machine-old-number--top`,S.value]},r.value):null,c("span",{class:[`${p}-base-slot-machine-current-number`,T.value]},c("span",{ref:"numberWrapper",class:[`${p}-base-slot-machine-current-number__inner`,typeof t.value!="number"&&`${p}-base-slot-machine-current-number__inner--not-number`]},a.value)),r.value!==null?c("span",{class:[`${p}-base-slot-machine-old-number ${p}-base-slot-machine-old-number--bottom`,S.value]},r.value):null)}}}),{cubicBezierEaseOut:q}=pe;function je({duration:t=".2s"}={}){return[_("&.fade-up-width-expand-transition-leave-active",{transition:`
 opacity ${t} ${q},
 max-width ${t} ${q},
 transform ${t} ${q}
 `}),_("&.fade-up-width-expand-transition-enter-active",{transition:`
 opacity ${t} ${q},
 max-width ${t} ${q},
 transform ${t} ${q}
 `}),_("&.fade-up-width-expand-transition-enter-to",{opacity:1,transform:"translateX(0) translateY(0)"}),_("&.fade-up-width-expand-transition-enter-from",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"}),_("&.fade-up-width-expand-transition-leave-from",{opacity:1,transform:"translateY(0)"}),_("&.fade-up-width-expand-transition-leave-to",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"})]}const We=_([_("@keyframes n-base-slot-machine-fade-up-in",`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),_("@keyframes n-base-slot-machine-fade-down-in",`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),_("@keyframes n-base-slot-machine-fade-up-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),_("@keyframes n-base-slot-machine-fade-down-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),D("base-slot-machine",`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[D("base-slot-machine-number",`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[je({duration:".2s"}),ve({duration:".2s",delay:"0s"}),D("base-slot-machine-old-number",`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[P("top",{transform:"translateY(-100%)"}),P("bottom",{transform:"translateY(100%)"}),P("down-scroll",{animation:"n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),P("up-scroll",{animation:"n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1})]),D("base-slot-machine-current-number",`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[P("down-scroll",{animation:"n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),P("up-scroll",{animation:"n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),ge("inner",`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[P("not-number",`
 right: unset;
 left: 0;
 `)])])])])]),Xe=Y({name:"BaseSlotMachine",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(t){ye("-base-slot-machine",We,H(t,"clsPrefix"));const i=b(),r=b(),a=I(()=>{if(typeof t.value=="string")return[];if(t.value<1)return[0];const n=[];let f=t.value;for(t.max!==void 0&&(f=Math.min(t.max,f));f>=1;)n.push(f%10),f/=10,f=Math.floor(f);return n.reverse(),n});return ee(H(t,"value"),(n,f)=>{typeof n=="string"?(r.value=void 0,i.value=void 0):typeof f=="string"?(r.value=n,i.value=void 0):(r.value=n,i.value=f)}),()=>{const{value:n,clsPrefix:f}=t;return typeof n=="number"?c("span",{class:`${f}-base-slot-machine`},c(be,{name:"fade-up-width-expand-transition",tag:"span"},{default:()=>a.value.map((T,S)=>c(re,{clsPrefix:f,key:a.value.length-S-1,oldOriginalNumber:i.value,newOriginalNumber:r.value,value:T}))}),c(he,{key:"+",width:!0},{default:()=>t.max!==void 0&&t.max<n?c(re,{clsPrefix:f,value:"+"}):null})):c("span",{class:`${f}-base-slot-machine`},n)}}});function Ge(t){const{errorColor:i,infoColor:r,successColor:a,warningColor:n,fontFamily:f}=t;return{color:i,colorInfo:r,colorSuccess:a,colorError:i,colorWarning:n,fontSize:"12px",fontFamily:f}}const Ze={common:we,self:Ge},Ke=_([_("@keyframes badge-wave-spread",{from:{boxShadow:"0 0 0.5px 0px var(--n-ripple-color)",opacity:.6},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)",opacity:0}}),D("badge",`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[P("as-is",[D("badge-sup",{position:"static",transform:"translateX(0)"},[ne({transformOrigin:"left bottom",originalTransform:"translateX(0)"})])]),P("dot",[D("badge-sup",`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[_("::before","border-radius: 4px;")])]),D("badge-sup",`
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 2;
 display: flex;
 align-items: center;
 `,[ne({transformOrigin:"left bottom",originalTransform:"translateX(-50%)"}),D("base-wave",{zIndex:1,animationDuration:"2s",animationIterationCount:"infinite",animationDelay:"1s",animationTimingFunction:"var(--n-ripple-bezier)",animationName:"badge-wave-spread"}),_("&::before",`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),He=Object.assign(Object.assign({},oe.props),{value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:"default"},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array}),Je=Y({name:"Badge",props:He,setup(t,{slots:i}){const{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:n}=_e(t),f=oe("Badge","-badge",Ke,Ze,t,r),T=b(!1),S=()=>{T.value=!0},A=()=>{T.value=!1},C=I(()=>t.show&&(t.dot||t.value!==void 0&&!(!t.showZero&&Number(t.value)<=0)||!$e(i.value)));ie(()=>{C.value&&(T.value=!0)});const p=Te("Badge",n,r),y=I(()=>{const{type:g,color:x}=t,{common:{cubicBezierEaseInOut:k,cubicBezierEaseOut:h},self:{[Ee("color",g)]:B,fontFamily:o,fontSize:l}}=f.value;return{"--n-font-size":l,"--n-font-family":o,"--n-color":x||B,"--n-ripple-color":x||B,"--n-bezier":k,"--n-ripple-bezier":h}}),w=a?Se("badge",I(()=>{let g="";const{type:x,color:k}=t;return x&&(g+=x[0]),k&&(g+=Ne(k)),g}),y,t):void 0,U=I(()=>{const{offset:g}=t;if(!g)return;const[x,k]=g,h=typeof x=="number"?`${x}px`:x,B=typeof k=="number"?`${k}px`:k;return{transform:`translate(calc(${p!=null&&p.value?"50%":"-50%"} + ${h}), ${B})`}});return{rtlEnabled:p,mergedClsPrefix:r,appeared:T,showBadge:C,handleAfterEnter:S,handleAfterLeave:A,cssVars:a?void 0:y,themeClass:w==null?void 0:w.themeClass,onRender:w==null?void 0:w.onRender,offsetStyle:U}},render(){var t;const{mergedClsPrefix:i,onRender:r,themeClass:a,$slots:n}=this;r==null||r();const f=(t=n.default)===null||t===void 0?void 0:t.call(n);return c("div",{class:[`${i}-badge`,this.rtlEnabled&&`${i}-badge--rtl`,a,{[`${i}-badge--dot`]:this.dot,[`${i}-badge--as-is`]:!f}],style:this.cssVars},f,c(xe,{name:"fade-in-scale-up-transition",onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?c("sup",{class:`${i}-badge-sup`,title:Fe(this.value),style:this.offsetStyle},ke(n.value,()=>[this.dot?null:c(Xe,{clsPrefix:i,appeared:this.appeared,max:this.max,value:this.value})]),this.processing?c(Ce,{clsPrefix:i}):null):null}))}}),Qe={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},ea=Y({name:"EyeOutline",render:function(i,r){return G(),ae("svg",Qe,r[0]||(r[0]=[z("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1)]))}}),aa={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},ta=Y({name:"PricetagOutline",render:function(i,r){return G(),ae("svg",aa,r[0]||(r[0]=[z("path",{d:"M435.25 48h-122.9a14.46 14.46 0 0 0-10.2 4.2L56.45 297.9a28.85 28.85 0 0 0 0 40.7l117 117a28.85 28.85 0 0 0 40.7 0L459.75 210a14.46 14.46 0 0 0 4.2-10.2v-123a28.66 28.66 0 0 0-28.7-28.8z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{d:"M384 160a32 32 0 1 1 32-32a32 32 0 0 1-32 32z",fill:"currentColor"},null,-1)]))}}),W=t=>new Promise(i=>setTimeout(i,t));let R=[{id:1,name:"一般玩家",type:"SYSTEM",remark:"系統預設，一般註冊會員",status:"ACTIVE",member_count:1200,is_system_default:!0},{id:2,name:"測試帳號",type:"SYSTEM",remark:"系統預設，內部測試使用",status:"ACTIVE",member_count:5,is_system_default:!0},{id:3,name:"幣商帳號",type:"SYSTEM",remark:"系統預設，代理或幣商",status:"ACTIVE",member_count:12,is_system_default:!0},{id:4,name:"VIP",type:"CUSTOM",remark:"高價值客戶",status:"ACTIVE",member_count:50},{id:5,name:"高風險",type:"CUSTOM",remark:"疑似套利或作弊",status:"ACTIVE",member_count:2},{id:6,name:"廣告號",type:"CUSTOM",remark:"發送垃圾訊息",status:"INACTIVE",member_count:0}];const L={getTags:async()=>(await W(300),{code:0,msg:"success",data:[...R]}),createTag:async(t,i)=>{if(await W(300),R.some(a=>a.name===t))return{code:400,msg:"標籤名稱已存在"};const r={id:Math.max(...R.map(a=>a.id))+1,name:t,type:"CUSTOM",remark:i,status:"ACTIVE",member_count:0};return R.push(r),{code:0,msg:"success",data:r}},updateTag:async(t,i)=>{await W(300);const r=R.find(a=>a.id===t);if(!r)return{code:404,msg:"標籤不存在"};if(r.is_system_default){if(i.name&&i.name!==r.name)return{code:403,msg:"系統預設標籤不可修改名稱"}}else if(i.name&&i.name!==r.name&&R.some(a=>a.name===i.name))return{code:400,msg:"標籤名稱已存在"};return i.status==="INACTIVE"&&r.member_count>0?{code:400,msg:"此標籤仍有玩家關聯，無法停用"}:(Object.assign(r,i),{code:0,msg:"success"})},deleteTag:async t=>{await W(300);const i=R.find(r=>r.id===t);return i?i.is_system_default?{code:403,msg:"系統預設標籤不可刪除"}:i.status==="ACTIVE"?{code:400,msg:"僅可刪除停用狀態的標籤"}:i.member_count>0?{code:400,msg:"尚有玩家使用此標籤，無法刪除"}:(R=R.filter(r=>r.id!==t),{code:0,msg:"success"}):{code:404,msg:"標籤不存在"}}},na={class:"flex justify-between items-center w-full pr-8"},la={class:"flex justify-end gap-2"},sa=Y({__name:"TagManagementDrawer",props:{show:{type:Boolean}},emits:["update:show","change"],setup(t,{emit:i}){const r=t,a=i,n=ue(),f=Pe(),T=I({get:()=>r.show,set:m=>a("update:show",m)}),S=b(!1),A=b([]),C=b(!1),p=b(!1),y=b(!1),w=b(null),U=b(!1),g=X({name:"",remark:""}),x=I(()=>y.value?"編輯標籤":"新增標籤"),k=[{title:"類型",key:"type",width:100,render:m=>c(Q,{type:m.type==="SYSTEM"?"info":"success",bordered:!1},{default:()=>m.type==="SYSTEM"?"系統預設":"自定義"})},{title:"名稱",key:"name",width:120},{title:"備註",key:"remark",ellipsis:{tooltip:!0}},{title:"啟用",key:"status",width:80,render:m=>c(Ue,{value:m.status==="ACTIVE",onUpdateValue:v=>B(m,v)})},{title:"操作",key:"actions",width:120,render(m){return c(fe,{},{default:()=>[c($,{size:"tiny",secondary:!0,onClick:()=>l(m)},{icon:()=>c(Re)}),c($,{size:"tiny",type:"error",secondary:!0,disabled:m.type==="SYSTEM"||m.status==="ACTIVE",onClick:()=>F(m)},{icon:()=>c(Me)})]})}}],h=async()=>{S.value=!0;try{const m=await L.getTags();m.code===0&&(A.value=m.data)}finally{S.value=!1}},B=async(m,v)=>{const O=v?"ACTIVE":"INACTIVE";if(!v&&m.member_count>0){n.error(`此標籤仍有 ${m.member_count} 位玩家使用，無法停用`);return}try{const Z=await L.updateTag(m.id,{status:O});Z.code===0?(m.status=O,n.success("狀態已更新"),a("change")):n.error(Z.msg)}catch{n.error("更新失敗")}},o=()=>{y.value=!1,U.value=!1,w.value=null,g.name="",g.remark="",C.value=!0},l=m=>{y.value=!0,U.value=m.type==="SYSTEM",w.value=m.id,g.name=m.name,g.remark=m.remark,C.value=!0},d=async()=>{if(!g.name){n.warning("請輸入名稱");return}p.value=!0;try{let m;y.value&&w.value?m=await L.updateTag(w.value,{name:g.name,remark:g.remark}):m=await L.createTag(g.name,g.remark),m.code===0?(n.success(y.value?"已儲存":"已新增"),C.value=!1,h(),a("change")):n.error(m.msg)}catch{n.error("操作失敗")}finally{p.value=!1}},F=m=>{f.warning({title:"確認刪除",content:`確定要刪除標籤「${m.name}」嗎？`,positiveText:"刪除",negativeText:"取消",onPositiveClick:async()=>{try{const v=await L.deleteTag(m.id);v.code===0?(n.success("刪除成功"),h(),a("change")):n.error(v.msg)}catch{n.error("刪除失敗")}}})};return ee(T,m=>{m&&h()}),(m,v)=>(G(),Oe(e(Be),{show:T.value,"onUpdate:show":v[4]||(v[4]=O=>T.value=O),width:600,placement:"right"},{default:u(()=>[s(e(De),{title:"會員標籤管理",closable:""},{header:u(()=>[z("div",na,[v[6]||(v[6]=z("span",{class:"text-lg font-bold"},"會員標籤管理",-1)),s(e($),{type:"primary",size:"small",onClick:o},{icon:u(()=>[s(e(ce))]),default:u(()=>[v[5]||(v[5]=N(" 新增標籤 ",-1))]),_:1})])]),default:u(()=>[s(e(me),{columns:k,data:A.value,loading:S.value,pagination:!1,class:"mb-4"},null,8,["data","loading"])]),_:1}),s(e(de),{show:C.value,"onUpdate:show":v[3]||(v[3]=O=>C.value=O),preset:"card",title:x.value,style:{width:"400px"}},{footer:u(()=>[z("div",la,[s(e($),{onClick:v[2]||(v[2]=O=>C.value=!1)},{default:u(()=>[...v[7]||(v[7]=[N("取消",-1)])]),_:1}),s(e($),{type:"primary",loading:p.value,onClick:d},{default:u(()=>[...v[8]||(v[8]=[N("儲存",-1)])]),_:1},8,["loading"])])]),default:u(()=>[s(e(J),{ref:"formRef",model:g,"label-placement":"left","label-width":"60"},{default:u(()=>[s(e(E),{label:"名稱",path:"name",required:""},{default:u(()=>[s(e(V),{value:g.name,"onUpdate:value":v[0]||(v[0]=O=>g.name=O),placeholder:"請輸入標籤名稱",disabled:U.value&&y.value},null,8,["value","disabled"])]),_:1}),s(e(E),{label:"備註",path:"remark"},{default:u(()=>[s(e(V),{value:g.remark,"onUpdate:value":v[1]||(v[1]=O=>g.remark=O),type:"textarea",placeholder:"請輸入備註"},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show","title"])]),_:1},8,["show"]))}}),ra={class:"p-6"},oa={class:"flex gap-2"},ia={class:"relative"},ua={class:"relative"},da={class:"flex justify-end gap-2"},Da=Y({__name:"PlayerList",setup(t){const i=Ae(),r=ue(),{t:a}=Ie(),n=X({q:"",search_type:"id",affiliation_type:"invite_code",affiliation_query:"",status:void 0,tags:void 0,register_date_start:void 0,register_date_end:void 0,page:1,page_size:10}),f=b(null),T=I(()=>[{label:a("player.status.ACTIVE"),value:"ACTIVE"},{label:a("player.status.LOCKED"),value:"LOCKED"},{label:a("player.status.FROZEN"),value:"FROZEN"},{label:a("player.status.SUSPENDED"),value:"SUSPENDED"}]),S=b([]),A=b(!1),C=async()=>{try{const o=await L.getTags();o.code===0&&(S.value=o.data.filter(l=>l.status==="ACTIVE").map(l=>({label:a(`player.tags.${l.name}`,l.name),value:l.name})))}catch{console.error("Failed to load tags")}},p=b(!1),y=b([]),w=X({page:1,pageSize:10,itemCount:0,showSizePicker:!0,pageSizes:[10,20,50],onChange:o=>{w.page=o,n.page=o,x()},onUpdatePageSize:o=>{w.pageSize=o,w.page=1,n.page_size=o,n.page=1,x()}}),U=o=>{if(!o)return"-";const l=new Date(o),d=F=>F.toString().padStart(2,"0");return`${l.getFullYear()}-${d(l.getMonth()+1)}-${d(l.getDate())} ${d(l.getHours())}:${d(l.getMinutes())}:${d(l.getSeconds())}`},g=I(()=>[{title:a("player.list.id"),key:"id",width:120},{title:a("player.list.username"),key:"username",width:150},{title:a("player.list.displayName"),key:"display_name",width:150},{title:a("player.list.tags"),key:"tags",render(o){return o.tags.map(l=>{const d=a(`player.tags.${l}`,l);return c(Q,{style:{marginRight:"6px"},type:l==="TEST"?"warning":"default"},{default:()=>d})})}},{title:a("navigation.rtp"),key:"rtp",width:100,render(o){return o.rtp===void 0?"-":c("span",{class:o.rtp<100?"text-green-600":"text-red-600"},`${o.rtp}%`)}},{title:a("navigation.vipLevel"),key:"vip_level",width:100},{title:a("player.list.accountStatus"),key:"status",width:100,render(o){return c(Q,{type:{ACTIVE:"success",LOCKED:"warning",FROZEN:"info",SUSPENDED:"error"}[o.status]||"default",bordered:!1},{default:()=>a(`player.status.${o.status}`)})}},{title:a("player.list.onlineStatus"),key:"is_online",width:100,render(o){return c(Je,{dot:!0,type:o.is_online?"success":"default",style:{marginRight:"5px"}},()=>c("span",o.is_online?a("common.online"):a("common.offline")))}},{title:a("player.list.registerAt"),key:"register_at",width:180,render(o){return U(o.register_at)}},{title:a("common.action"),key:"actions",width:200,fixed:"right",render(o){return c(fe,{},{default:()=>[c($,{size:"small",secondary:!0,onClick:()=>i.push(`/admin/players/${o.id}`)},{icon:()=>c(ea)}),c($,{size:"small",secondary:!0,onClick:()=>r.info(a("player.list.jumpToAssetLog"))},{icon:()=>c(qe)}),c($,{size:"small",secondary:!0,onClick:()=>r.info(a("player.list.jumpToGameLog"))},{icon:()=>c(Le)})]})}}]),x=async()=>{p.value=!0;try{const o=await le.getPlayers(n);o.code===0&&o.data?(y.value=o.data.items,w.itemCount=o.data.total):r.error(o.msg)}catch{r.error(a("common.loadFailed"))}finally{p.value=!1}},k=b(!1),h=X({username:"",display_name:"",tags:["測試帳號"]}),B=async()=>{if(!h.username||!h.display_name){r.warning(a("common.fillRequired"));return}try{const o=await le.createPlayer({username:h.username,display_name:h.display_name,tags:h.tags});o.code===0?(r.success(a("player.list.createSuccess")),k.value=!1,x()):r.error(o.msg)}catch{r.error(a("player.list.createFailed"))}};return ie(()=>{C(),x()}),(o,l)=>(G(),ae("div",ra,[s(e(ze),{title:e(a)("navigation.playerManagement"),class:"mb-6"},{"header-extra":u(()=>[z("div",oa,[s(e($),{secondary:"",onClick:l[0]||(l[0]=d=>A.value=!0)},{icon:u(()=>[s(e(ta))]),default:u(()=>[N(" "+M(e(a)("player.list.tagManagement")),1)]),_:1}),s(e($),{type:"primary",onClick:l[1]||(l[1]=d=>k.value=!0)},{icon:u(()=>[s(e(ce))]),default:u(()=>[N(" "+M(e(a)("player.list.addTestPlayer")),1)]),_:1})])]),default:u(()=>[s(e(J),{inline:"",model:n,"label-placement":"left",class:"flex-wrap gap-4 mt-4"},{default:u(()=>[s(e(E),{label:e(a)("common.search")},{default:u(()=>[z("div",ia,[s(e(se),{value:n.search_type,"onUpdate:value":l[2]||(l[2]=d=>n.search_type=d),name:"searchType",size:"small",class:"absolute -top-7 left-0 whitespace-nowrap"},{default:u(()=>[s(e(j),{value:"id"},{default:u(()=>[N(M(e(a)("common.id")),1)]),_:1}),s(e(j),{value:"username"},{default:u(()=>[N(M(e(a)("auth.username")),1)]),_:1}),s(e(j),{value:"phone"},{default:u(()=>[N(M(e(a)("common.phone")),1)]),_:1})]),_:1},8,["value"]),s(e(V),{value:n.q,"onUpdate:value":l[3]||(l[3]=d=>n.q=d),placeholder:e(a)("common.keywordPlaceholder")},null,8,["value","placeholder"])])]),_:1},8,["label"]),s(e(E),{label:e(a)("navigation.affiliation")},{default:u(()=>[z("div",ua,[s(e(se),{value:n.affiliation_type,"onUpdate:value":l[4]||(l[4]=d=>n.affiliation_type=d),name:"affiliationType",size:"small",class:"absolute -top-7 left-0 whitespace-nowrap"},{default:u(()=>[s(e(j),{value:"invite_code"},{default:u(()=>[N(M(e(a)("navigation.inviteCode")),1)]),_:1}),s(e(j),{value:"referrer_id"},{default:u(()=>[N(M(e(a)("navigation.referrerId")),1)]),_:1})]),_:1},8,["value"]),s(e(V),{value:n.affiliation_query,"onUpdate:value":l[5]||(l[5]=d=>n.affiliation_query=d),placeholder:e(a)("common.inputPlaceholder")},null,8,["value","placeholder"])])]),_:1},8,["label"]),s(e(E),{label:e(a)("common.status")},{default:u(()=>[s(e(K),{value:n.status,"onUpdate:value":l[6]||(l[6]=d=>n.status=d),options:T.value,placeholder:e(a)("common.all"),clearable:"",style:{width:"120px"}},null,8,["value","options","placeholder"])]),_:1},8,["label"]),s(e(E),{label:e(a)("player.list.tags")},{default:u(()=>[s(e(K),{value:n.tags,"onUpdate:value":l[7]||(l[7]=d=>n.tags=d),options:S.value,multiple:"",placeholder:e(a)("common.all"),clearable:"",style:{width:"180px"}},null,8,["value","options","placeholder"])]),_:1},8,["label"]),s(e(E),{label:e(a)("player.list.registerIp")},{default:u(()=>[s(e(V),{value:n.register_ip,"onUpdate:value":l[8]||(l[8]=d=>n.register_ip=d),placeholder:e(a)("common.keywordPlaceholder"),style:{width:"150px"}},null,8,["value","placeholder"])]),_:1},8,["label"]),s(e(E),{label:e(a)("player.list.registerDate")},{default:u(()=>[s(e(Ve),{value:f.value,"onUpdate:value":[l[9]||(l[9]=d=>f.value=d),l[10]||(l[10]=([d,F])=>{n.register_date_start=d?new Date(d).toISOString():void 0,n.register_date_end=F?new Date(F).toISOString():void 0})],type:"daterange",clearable:""},null,8,["value"])]),_:1},8,["label"]),s(e(E),null,{default:u(()=>[s(e($),{type:"primary","attr-type":"button",onClick:x},{icon:u(()=>[s(e(Ye))]),default:u(()=>[N(" "+M(e(a)("common.search")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["title"]),s(e(me),{remote:"",loading:p.value,columns:g.value,data:y.value,pagination:w,bordered:!1,"single-line":!1},null,8,["loading","columns","data","pagination"]),s(e(de),{show:k.value,"onUpdate:show":l[15]||(l[15]=d=>k.value=d),preset:"card",title:e(a)("player.list.addTestAccount"),style:{width:"500px"}},{footer:u(()=>[z("div",da,[s(e($),{onClick:l[14]||(l[14]=d=>k.value=!1)},{default:u(()=>[N(M(e(a)("common.cancel")),1)]),_:1}),s(e($),{type:"primary",onClick:B},{default:u(()=>[N(M(e(a)("common.create")),1)]),_:1})])]),default:u(()=>[s(e(J),{ref:"createFormRef",model:h,"label-placement":"left","label-width":"80"},{default:u(()=>[s(e(E),{label:e(a)("auth.username"),path:"username",required:""},{default:u(()=>[s(e(V),{value:h.username,"onUpdate:value":l[11]||(l[11]=d=>h.username=d),placeholder:e(a)("auth.username")},null,8,["value","placeholder"])]),_:1},8,["label"]),s(e(E),{label:e(a)("player.list.displayName"),path:"display_name",required:""},{default:u(()=>[s(e(V),{value:h.display_name,"onUpdate:value":l[12]||(l[12]=d=>h.display_name=d),placeholder:e(a)("player.list.nicknamePlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label"]),s(e(E),{label:e(a)("player.list.tags")},{default:u(()=>[s(e(K),{value:h.tags,"onUpdate:value":l[13]||(l[13]=d=>h.tags=d),multiple:"",options:S.value},null,8,["value","options"])]),_:1},8,["label"])]),_:1},8,["model"])]),_:1},8,["show","title"]),s(sa,{show:A.value,"onUpdate:show":l[16]||(l[16]=d=>A.value=d),onChange:C},null,8,["show"])]))}});export{Da as default};
