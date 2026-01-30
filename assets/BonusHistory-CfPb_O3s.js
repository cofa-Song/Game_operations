import{B as S}from"./bonus-WzX8Tgz6.js";import{m as J,d as Q,c as m,b,a as E,e as f,f as R,u as j,g as W,h as p,k as ee,p as te,Z as B,q as F,n as ie,aP as ne,i as ae,j as $,as as k,aN as re,v as A,x as r,s as w,N as le,o as oe,D as g,C as _,E as u,T as se,U as I,V,W as Z,M as y,S as de,F as x,b9 as ce,P as L,H as me,G as ue,$ as ge,r as D,Y as M,B as pe}from"./index-IWOp6Bpn.js";import{S as ve}from"./SearchOutline-gSv0gcQV.js";import{N as fe}from"./Select-CIGOcuFJ.js";import{N as _e}from"./DataTable-AAHJUiWM.js";import{N as U}from"./Tag-Cwsgnh-C.js";import"./Popover-C60ATd9D.js";import"./use-compitable-CKz3cMxL.js";import"./create-CdyI-x2p.js";import"./Empty-D0gKbZyq.js";import"./RadioGroup-BeeyVwhQ.js";import"./Dropdown-BxswUyT5.js";import"./Icon-DZ24gLrW.js";import"./use-keyboard-B2ZP_AGf.js";import"./create-ref-setter-C4J8sofl.js";import"./Pagination-17N-IN0B.js";let H=!1;function ye(){if(J&&window.CSS&&!H&&(H=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}const xe={titleMarginMedium:"0 0 6px 0",titleMarginLarge:"-2px 0 6px 0",titleFontSizeMedium:"14px",titleFontSizeLarge:"16px",iconSizeMedium:"14px",iconSizeLarge:"14px"};function Ce(t){const{textColor3:a,infoColor:l,errorColor:c,successColor:n,warningColor:v,textColor1:s,textColor2:h,railColor:C,fontWeightStrong:T,fontSize:z}=t;return Object.assign(Object.assign({},xe),{contentFontSize:z,titleFontWeight:T,circleBorder:`2px solid ${a}`,circleBorderInfo:`2px solid ${l}`,circleBorderError:`2px solid ${c}`,circleBorderSuccess:`2px solid ${n}`,circleBorderWarning:`2px solid ${v}`,iconColor:a,iconColorInfo:l,iconColorError:c,iconColorSuccess:n,iconColorWarning:v,titleTextColor:s,contentTextColor:h,metaTextColor:a,lineColor:C})}const he={common:Q,self:Ce},O=1.25,Te=m("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${O};
`,[b("horizontal",`
 flex-direction: row;
 `,[E(">",[m("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[b("dashed-line-type",[E(">",[m("timeline-item-timeline",[f("line",`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),E(">",[m("timeline-item-content",`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[E(">",[f("meta",`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),m("timeline-item-timeline",`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[f("line",`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),b("right-placement",[m("timeline-item",[m("timeline-item-content",`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),m("timeline-item-timeline",`
 width: var(--n-icon-size);
 right: 0;
 `)])]),b("left-placement",[m("timeline-item",[m("timeline-item-content",`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),m("timeline-item-timeline",`
 left: 0;
 `)])]),m("timeline-item",`
 position: relative;
 `,[E("&:last-child",[m("timeline-item-timeline",[f("line",`
 display: none;
 `)]),m("timeline-item-content",[f("meta",`
 margin-bottom: 0;
 `)])]),m("timeline-item-content",[f("title",`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),f("content",`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),f("meta",`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),b("dashed-line-type",[m("timeline-item-timeline",[f("line",`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),m("timeline-item-timeline",`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${O} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[f("circle",`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),f("icon",`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),f("line",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),ze=Object.assign(Object.assign({},W.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),K=ee("n-timeline"),we=R({name:"Timeline",props:ze,setup(t,{slots:a}){const{mergedClsPrefixRef:l}=j(t),c=W("Timeline","-timeline",Te,he,t,l);return te(K,{props:t,mergedThemeRef:c,mergedClsPrefixRef:l}),()=>{const{value:n}=l;return p("div",{class:[`${n}-timeline`,t.horizontal&&`${n}-timeline--horizontal`,`${n}-timeline--${t.size}-size`,!t.horizontal&&`${n}-timeline--${t.itemPlacement}-placement`]},a)}}}),Se={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},be=R({name:"TimelineItem",props:Se,slots:Object,setup(t){const a=ie(K);a||ne("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),ye();const{inlineThemeDisabled:l}=j(),c=$(()=>{const{props:{size:v,iconSize:s},mergedThemeRef:h}=a,{type:C}=t,{self:{titleTextColor:T,contentTextColor:z,metaTextColor:d,lineColor:P,titleFontWeight:i,contentFontSize:e,[k("iconSize",v)]:o,[k("titleMargin",v)]:N,[k("titleFontSize",v)]:G,[k("circleBorder",C)]:X,[k("iconColor",C)]:q},common:{cubicBezierEaseInOut:Y}}=h.value;return{"--n-bezier":Y,"--n-circle-border":X,"--n-icon-color":q,"--n-content-font-size":e,"--n-content-text-color":z,"--n-line-color":P,"--n-meta-text-color":d,"--n-title-font-size":G,"--n-title-font-weight":i,"--n-title-margin":N,"--n-title-text-color":T,"--n-icon-size":re(s)||o}}),n=l?ae("timeline-item",$(()=>{const{props:{size:v,iconSize:s}}=a,{type:h}=t;return`${v[0]}${s||"a"}${h[0]}`}),c,a.props):void 0;return{mergedClsPrefix:a.mergedClsPrefixRef,cssVars:l?void 0:c,themeClass:n==null?void 0:n.themeClass,onRender:n==null?void 0:n.onRender}},render(){const{mergedClsPrefix:t,color:a,onRender:l,$slots:c}=this;return l==null||l(),p("div",{class:[`${t}-timeline-item`,this.themeClass,`${t}-timeline-item--${this.type}-type`,`${t}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},p("div",{class:`${t}-timeline-item-timeline`},p("div",{class:`${t}-timeline-item-timeline__line`}),B(c.icon,n=>n?p("div",{class:`${t}-timeline-item-timeline__icon`,style:{color:a}},n):p("div",{class:`${t}-timeline-item-timeline__circle`,style:{borderColor:a}}))),p("div",{class:`${t}-timeline-item-content`},B(c.header,n=>n||this.title?p("div",{class:`${t}-timeline-item-content__title`},n||this.title):null),p("div",{class:`${t}-timeline-item-content__content`},F(c.default,()=>[this.content])),p("div",{class:`${t}-timeline-item-content__meta`},F(c.footer,()=>[this.time]))))}}),Ee={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},ke=R({name:"DocumentTextOutline",render:function(a,l){return w(),A("svg",Ee,l[0]||(l[0]=[r("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),r("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),r("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),r("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1)]))}}),Ae=t=>new Promise(a=>setTimeout(a,t)),Ie=[{id:"HIST_001",card_id:"CARD_SUCCESS_001",player_id:"P10001",type:"RECHARGE_BONUS",start_amount:500,current_wagering:2500,target_wagering:2500,cap:500,lave_balance:700,realized_amount:500,status:"SUCCESS",create_time:"2026-01-25T10:00:00Z",settle_time:"2026-01-25T14:30:00Z",currency:S.SILVER,events:[{time:"2026-01-25T10:00:00Z",action:"CREATED",detail:"Card generated from recharge bonus"},{time:"2026-01-25T10:05:00Z",action:"ACTIVATED",detail:"Player claimed and activated"},{time:"2026-01-25T14:30:00Z",action:"SETTLED",detail:"Wagering completed: 2500/2500. Transferred 500 (Cap limit), Burned overflow: 200"}]},{id:"HIST_002",card_id:"CARD_EXPIRE_001",player_id:"P10002",type:"GIFT_CODE",start_amount:200,current_wagering:0,target_wagering:1e3,cap:200,lave_balance:200,realized_amount:0,status:"FAIL",fail_reason:"已過期 (Expired)",create_time:"2026-01-20T08:00:00Z",settle_time:"2026-01-27T08:00:00Z",currency:S.SILVER,events:[{time:"2026-01-20T08:00:00Z",action:"CREATED",detail:"Card generated from gift code redemption"},{time:"2026-01-27T08:00:00Z",action:"EXPIRED",detail:"Card expired in queue without being claimed"}]},{id:"HIST_003",card_id:"CARD_ABANDON_001",player_id:"P10003",type:"MANUAL",start_amount:300,current_wagering:450,target_wagering:1500,cap:300,lave_balance:180,realized_amount:0,status:"FAIL",fail_reason:"玩家手動放棄 (Player Abandoned)",create_time:"2026-01-28T12:00:00Z",settle_time:"2026-01-28T18:00:00Z",currency:S.SILVER,events:[{time:"2026-01-28T12:00:00Z",action:"CREATED",detail:"Manually issued by admin"},{time:"2026-01-28T12:10:00Z",action:"ACTIVATED",detail:"Player claimed"},{time:"2026-01-28T18:00:00Z",action:"ABANDONED",detail:"Player manually abandoned the card. Wagering progress: 450/1500"}]},{id:"HIST_004",card_id:"CARD_BANKRUPT_001",player_id:"P10004",type:"RECHARGE_BONUS",start_amount:100,current_wagering:120,target_wagering:500,cap:100,lave_balance:0,realized_amount:0,status:"FAIL",fail_reason:"餘額不足/破產歸零 (Bankruptcy)",create_time:"2026-01-29T09:00:00Z",settle_time:"2026-01-29T10:30:00Z",currency:S.SILVER,events:[{time:"2026-01-29T09:00:00Z",action:"CREATED",detail:"Card generated"},{time:"2026-01-29T09:05:00Z",action:"ACTIVATED",detail:"Player claimed"},{time:"2026-01-29T10:30:00Z",action:"BANKRUPTED",detail:"Bonus wallet balance dropped below 1. Wagering: 120/500. Protection triggered."}]},{id:"HIST_005",card_id:"CARD_ACTIVE_001",player_id:"P10005",type:"RECHARGE_BONUS",start_amount:400,current_wagering:800,target_wagering:2e3,cap:400,lave_balance:350,realized_amount:0,status:"ACTIVE",create_time:"2026-01-29T14:00:00Z",currency:S.SILVER,events:[{time:"2026-01-29T14:00:00Z",action:"CREATED",detail:"Card generated"},{time:"2026-01-29T14:05:00Z",action:"ACTIVATED",detail:"Player claimed and started wagering"}]}],De={getHistory:async t=>{await Ae(300);let a=[...Ie];if(t.card_id&&(a=a.filter(s=>s.card_id.includes(t.card_id))),t.player_id&&(a=a.filter(s=>s.player_id.includes(t.player_id))),t.status&&(a=a.filter(s=>s.status===t.status)),t.date_start&&t.date_end){const s=new Date(t.date_start).getTime(),h=new Date(t.date_end).getTime();a=a.filter(C=>{const T=new Date(C.create_time).getTime();return T>=s&&T<=h})}const l=a.length,c=(t.page-1)*t.page_size,n=c+t.page_size;return{code:0,msg:"success",data:{list:a.slice(c,n),total:l}}}},Re={class:"p-6"},Pe={key:0},Ne={class:"grid grid-cols-2 gap-3 text-sm mb-4"},Be={class:"font-mono"},Fe={key:0,class:"col-span-2"},$e={class:"text-red-600"},Ve={class:"mt-6"},tt=R({__name:"BonusHistory",setup(t){const a=le(),l=D(!1),c=D([]),n=M({card_id:"",player_id:"",status:void 0,date_start:void 0,date_end:void 0,page:1,page_size:10}),v=[{label:"進行中",value:"ACTIVE"},{label:"成功",value:"SUCCESS"},{label:"失敗",value:"FAIL"}],s=M({page:1,pageSize:10,itemCount:0,showSizePicker:!0,pageSizes:[10,20,50],onChange:i=>{s.page=i,n.page=i,C()},onUpdatePageSize:i=>{s.pageSize=i,s.page=1,n.page_size=i,n.page=1,C()}}),h=[{title:"Card ID",key:"card_id",width:160,ellipsis:{tooltip:!0}},{title:"玩家 ID",key:"player_id",width:100},{title:"獎勵類型",key:"type",width:120},{title:"初始金額",key:"start_amount",width:100,render:i=>i.start_amount.toFixed(2)},{title:"目標流水",key:"target_wagering",width:100,render:i=>i.target_wagering.toFixed(2)},{title:"達成流水",key:"current_wagering",width:100,render:i=>i.current_wagering.toFixed(2)},{title:"Cap 上限",key:"cap",width:100,render:i=>i.cap.toFixed(2)},{title:"實際轉換",key:"realized_amount",width:100,render:i=>{const e=i.realized_amount.toFixed(2);return i.status==="SUCCESS"?p("span",{class:"text-green-600 font-semibold"},e):p("span",{class:"text-gray-400"},e)}},{title:"狀態",key:"status",width:100,render(i){const e={SUCCESS:"success",ACTIVE:"warning",FAIL:"error"},o={SUCCESS:"成功",ACTIVE:"進行中",FAIL:"失敗"};return p(U,{type:e[i.status]||"default",bordered:!1},{default:()=>o[i.status]||i.status})}},{title:"失敗原因",key:"fail_reason",width:150,ellipsis:{tooltip:!0},render:i=>i.fail_reason||"-"},{title:"建立時間",key:"create_time",width:160,render:i=>i.create_time.replace("T"," ").replace("Z","")},{title:"結算時間",key:"settle_time",width:160,render:i=>i.settle_time?i.settle_time.replace("T"," ").replace("Z",""):"-"},{title:"操作",key:"actions",width:80,fixed:"right",render(i){return p(Z,{size:"small",secondary:!0,onClick:()=>P(i)},{icon:()=>p(ke)})}}],C=async()=>{l.value=!0;try{const i=await De.getHistory(n);i.code===0?(c.value=i.data.list,s.itemCount=i.data.total):a.error(i.msg)}catch{a.error("載入失敗")}finally{l.value=!1}},T=()=>{n.page=1,s.page=1,C()},z=D(!1),d=D(null),P=i=>{d.value=i,z.value=!0};return oe(()=>{C()}),(i,e)=>(w(),A("div",Re,[g(u(de),{title:"獎勵卡歷史紀錄"},{default:_(()=>[g(u(se),{inline:"",model:n,"label-placement":"left",class:"mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"},{default:_(()=>[g(u(I),{label:"Card ID"},{default:_(()=>[g(u(V),{value:n.card_id,"onUpdate:value":e[0]||(e[0]=o=>n.card_id=o),placeholder:"精確搜尋",clearable:""},null,8,["value"])]),_:1}),g(u(I),{label:"玩家 ID"},{default:_(()=>[g(u(V),{value:n.player_id,"onUpdate:value":e[1]||(e[1]=o=>n.player_id=o),placeholder:"玩家帳號/UID",clearable:""},null,8,["value"])]),_:1}),g(u(I),{label:"狀態"},{default:_(()=>[g(u(fe),{value:n.status,"onUpdate:value":e[2]||(e[2]=o=>n.status=o),options:v,placeholder:"全部",clearable:"",style:{width:"140px"}},null,8,["value"])]),_:1}),g(u(I),null,{default:_(()=>[g(u(Z),{type:"primary",onClick:T,loading:l.value},{icon:_(()=>[g(u(ve))]),default:_(()=>[e[4]||(e[4]=y(" 查詢 ",-1))]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"]),g(u(_e),{columns:h,data:c.value,loading:l.value,pagination:s,"scroll-x":1600},null,8,["data","loading","pagination"])]),_:1}),g(u(ge),{show:z.value,"onUpdate:show":e[3]||(e[3]=o=>z.value=o),preset:"card",title:"獎勵卡詳細資訊",style:{width:"700px"}},{default:_(()=>[d.value?(w(),A("div",Pe,[r("div",Ne,[r("div",null,[e[5]||(e[5]=r("span",{class:"text-gray-500"},"Card ID:",-1)),e[6]||(e[6]=y()),r("span",Be,x(d.value.card_id),1)]),r("div",null,[e[7]||(e[7]=r("span",{class:"text-gray-500"},"玩家 ID:",-1)),y(" "+x(d.value.player_id),1)]),r("div",null,[e[8]||(e[8]=r("span",{class:"text-gray-500"},"獎勵類型:",-1)),y(" "+x(d.value.type),1)]),r("div",null,[e[9]||(e[9]=r("span",{class:"text-gray-500"},"狀態:",-1)),g(u(U),{type:d.value.status==="SUCCESS"?"success":d.value.status==="FAIL"?"error":"warning",size:"small"},{default:_(()=>[y(x(d.value.status),1)]),_:1},8,["type"])]),r("div",null,[e[10]||(e[10]=r("span",{class:"text-gray-500"},"初始金額:",-1)),y(" "+x(d.value.start_amount.toFixed(2)),1)]),r("div",null,[e[11]||(e[11]=r("span",{class:"text-gray-500"},"剩餘餘額:",-1)),y(" "+x(d.value.lave_balance.toFixed(2)),1)]),r("div",null,[e[12]||(e[12]=r("span",{class:"text-gray-500"},"目標流水:",-1)),y(" "+x(d.value.target_wagering.toFixed(2)),1)]),r("div",null,[e[13]||(e[13]=r("span",{class:"text-gray-500"},"達成流水:",-1)),y(" "+x(d.value.current_wagering.toFixed(2)),1)]),r("div",null,[e[14]||(e[14]=r("span",{class:"text-gray-500"},"Cap 上限:",-1)),y(" "+x(d.value.cap.toFixed(2)),1)]),r("div",null,[e[15]||(e[15]=r("span",{class:"text-gray-500"},"實際轉換:",-1)),r("span",{class:ce(d.value.realized_amount>0?"text-green-600 font-semibold":"text-gray-400")},x(d.value.realized_amount.toFixed(2)),3)]),d.value.fail_reason?(w(),A("div",Fe,[e[16]||(e[16]=r("span",{class:"text-gray-500"},"失敗原因:",-1)),e[17]||(e[17]=y()),r("span",$e,x(d.value.fail_reason),1)])):L("",!0)]),r("div",Ve,[e[18]||(e[18]=r("h4",{class:"font-semibold mb-3 text-base"},"異動日誌 (Timeline)",-1)),g(u(we),null,{default:_(()=>[(w(!0),A(me,null,ue(d.value.events,(o,N)=>(w(),pe(u(be),{key:N,type:o.action==="SETTLED"||o.action==="CREATED"?"success":o.action.includes("FAIL")||o.action.includes("ABANDON")||o.action.includes("EXPIRE")||o.action.includes("BANKRUPT")?"error":"info",title:o.action,time:o.time.replace("T"," ").replace("Z","")},{default:_(()=>[y(x(o.detail),1)]),_:2},1032,["type","title","time"]))),128))]),_:1})])])):L("",!0)]),_:1},8,["show"])]))}});export{tt as default};
