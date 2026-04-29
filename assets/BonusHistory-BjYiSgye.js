import{B as k}from"./bonus-WzX8Tgz6.js";import{m as te,aD as ie,aE as ne,c as g,b as I,a as A,d as x,e as B,u as J,f as Q,h as y,k as ae,p as re,av as L,q as U,n as le,aq as oe,g as se,j as O,af as D,aF as de,v as N,w as n,s as b,P as ce,o as me,a9 as ue,E as c,D as p,F as d,Y as pe,Z as R,$ as H,J as f,K as M,V,Q as j,G as C,W,I as ge,H as ve,a1 as fe,r as T,a0 as K,C as ye}from"./index-DDEM1Wk5.js";import{S as _e}from"./SearchOutline-BIRl4sIZ.js";import{N as xe}from"./RadioGroup-Dc-PiNWe.js";import{N as Z}from"./Radio-9QV3ps-m.js";import{N as Ce}from"./Select-Cj6us5jq.js";import{N as he}from"./DatePicker-B6cdQlqJ.js";import{N as we}from"./DataTable-JsPiNdwV.js";import{N as q}from"./Tag-D6AEgEqA.js";import"./Popover-CHZPiV12.js";import"./use-compitable-NPVKFD5S.js";import"./create-DCTBrPNP.js";import"./Empty-BcbzJmQD.js";import"./use-keyboard-cPqpelpS.js";import"./Forward-BuAWTqyO.js";import"./Tooltip-CQ7EAPYQ.js";import"./Dropdown-CFF__f48.js";import"./Icon-Bzg3F7F-.js";import"./create-ref-setter-C4J8sofl.js";import"./Pagination-Q0oIblFn.js";let G=!1;function Te(){if(te&&window.CSS&&!G&&(G=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}function be(i){const{textColor3:a,infoColor:s,errorColor:u,successColor:l,warningColor:r,textColor1:v,textColor2:_,railColor:w,fontWeightStrong:h,fontSize:z}=i;return Object.assign(Object.assign({},ne),{contentFontSize:z,titleFontWeight:h,circleBorder:`2px solid ${a}`,circleBorderInfo:`2px solid ${s}`,circleBorderError:`2px solid ${u}`,circleBorderSuccess:`2px solid ${l}`,circleBorderWarning:`2px solid ${r}`,iconColor:a,iconColorInfo:s,iconColorError:u,iconColorSuccess:l,iconColorWarning:r,titleTextColor:v,contentTextColor:_,metaTextColor:a,lineColor:w})}const ze={common:ie,self:be},X=1.25,Se=g("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${X};
`,[I("horizontal",`
 flex-direction: row;
 `,[A(">",[g("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[I("dashed-line-type",[A(">",[g("timeline-item-timeline",[x("line",`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),A(">",[g("timeline-item-content",`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[A(">",[x("meta",`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),g("timeline-item-timeline",`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[x("line",`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),I("right-placement",[g("timeline-item",[g("timeline-item-content",`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),g("timeline-item-timeline",`
 width: var(--n-icon-size);
 right: 0;
 `)])]),I("left-placement",[g("timeline-item",[g("timeline-item-content",`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),g("timeline-item-timeline",`
 left: 0;
 `)])]),g("timeline-item",`
 position: relative;
 `,[A("&:last-child",[g("timeline-item-timeline",[x("line",`
 display: none;
 `)]),g("timeline-item-content",[x("meta",`
 margin-bottom: 0;
 `)])]),g("timeline-item-content",[x("title",`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),x("content",`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),x("meta",`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),I("dashed-line-type",[g("timeline-item-timeline",[x("line",`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),g("timeline-item-timeline",`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${X} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[x("circle",`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),x("icon",`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),x("line",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),Ee=Object.assign(Object.assign({},Q.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),Y=ae("n-timeline"),ke=B({name:"Timeline",props:Ee,setup(i,{slots:a}){const{mergedClsPrefixRef:s}=J(i),u=Q("Timeline","-timeline",Se,ze,i,s);return re(Y,{props:i,mergedThemeRef:u,mergedClsPrefixRef:s}),()=>{const{value:l}=s;return y("div",{class:[`${l}-timeline`,i.horizontal&&`${l}-timeline--horizontal`,`${l}-timeline--${i.size}-size`,!i.horizontal&&`${l}-timeline--${i.itemPlacement}-placement`]},a)}}}),Ie={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},Ae=B({name:"TimelineItem",props:Ie,slots:Object,setup(i){const a=le(Y);a||oe("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),Te();const{inlineThemeDisabled:s}=J(),u=O(()=>{const{props:{size:r,iconSize:v},mergedThemeRef:_}=a,{type:w}=i,{self:{titleTextColor:h,contentTextColor:z,metaTextColor:S,lineColor:m,titleFontWeight:F,contentFontSize:E,[D("iconSize",r)]:P,[D("titleMargin",r)]:t,[D("titleFontSize",r)]:e,[D("circleBorder",w)]:o,[D("iconColor",w)]:$},common:{cubicBezierEaseInOut:ee}}=_.value;return{"--n-bezier":ee,"--n-circle-border":o,"--n-icon-color":$,"--n-content-font-size":E,"--n-content-text-color":z,"--n-line-color":m,"--n-meta-text-color":S,"--n-title-font-size":e,"--n-title-font-weight":F,"--n-title-margin":t,"--n-title-text-color":h,"--n-icon-size":de(v)||P}}),l=s?se("timeline-item",O(()=>{const{props:{size:r,iconSize:v}}=a,{type:_}=i;return`${r[0]}${v||"a"}${_[0]}`}),u,a.props):void 0;return{mergedClsPrefix:a.mergedClsPrefixRef,cssVars:s?void 0:u,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){const{mergedClsPrefix:i,color:a,onRender:s,$slots:u}=this;return s==null||s(),y("div",{class:[`${i}-timeline-item`,this.themeClass,`${i}-timeline-item--${this.type}-type`,`${i}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},y("div",{class:`${i}-timeline-item-timeline`},y("div",{class:`${i}-timeline-item-timeline__line`}),L(u.icon,l=>l?y("div",{class:`${i}-timeline-item-timeline__icon`,style:{color:a}},l):y("div",{class:`${i}-timeline-item-timeline__circle`,style:{borderColor:a}}))),y("div",{class:`${i}-timeline-item-content`},L(u.header,l=>l||this.title?y("div",{class:`${i}-timeline-item-content__title`},l||this.title):null),y("div",{class:`${i}-timeline-item-content__content`},U(u.default,()=>[this.content])),y("div",{class:`${i}-timeline-item-content__meta`},U(u.footer,()=>[this.time]))))}}),De={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Re=B({name:"DocumentTextOutline",render:function(a,s){return b(),N("svg",De,s[0]||(s[0]=[n("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),n("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),n("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),n("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1)]))}}),Ne=i=>new Promise(a=>setTimeout(a,i)),Pe=[{id:"HIST_001",card_id:"CARD_SUCCESS_001",player_id:"P10001",type:"RECHARGE_BONUS",start_amount:500,current_wagering:2500,target_wagering:2500,cap:500,lave_balance:700,realized_amount:500,status:"SUCCESS",create_time:"2026-01-25T10:00:00Z",settle_time:"2026-01-25T14:30:00Z",currency:k.SILVER,events:[{time:"2026-01-25T10:00:00Z",action:"CREATED",detail:"Card generated from recharge bonus"},{time:"2026-01-25T10:05:00Z",action:"ACTIVATED",detail:"Player claimed and activated"},{time:"2026-01-25T14:30:00Z",action:"SETTLED",detail:"Wagering completed: 2500/2500. Transferred 500 (Cap limit), Burned overflow: 200"}]},{id:"HIST_002",card_id:"CARD_EXPIRE_001",player_id:"P10002",type:"GIFT_CODE",start_amount:200,current_wagering:0,target_wagering:1e3,cap:200,lave_balance:200,realized_amount:0,status:"FAIL",fail_reason:"已過期 (Expired)",create_time:"2026-01-20T08:00:00Z",settle_time:"2026-01-27T08:00:00Z",currency:k.SILVER,events:[{time:"2026-01-20T08:00:00Z",action:"CREATED",detail:"Card generated from gift code redemption"},{time:"2026-01-27T08:00:00Z",action:"EXPIRED",detail:"Card expired in queue without being claimed"}]},{id:"HIST_003",card_id:"CARD_ABANDON_001",player_id:"P10003",type:"MANUAL",start_amount:300,current_wagering:450,target_wagering:1500,cap:300,lave_balance:180,realized_amount:0,status:"FAIL",fail_reason:"玩家手動放棄 (Player Abandoned)",create_time:"2026-01-28T12:00:00Z",settle_time:"2026-01-28T18:00:00Z",currency:k.SILVER,events:[{time:"2026-01-28T12:00:00Z",action:"CREATED",detail:"Manually issued by admin"},{time:"2026-01-28T12:10:00Z",action:"ACTIVATED",detail:"Player claimed"},{time:"2026-01-28T18:00:00Z",action:"ABANDONED",detail:"Player manually abandoned the card. Wagering progress: 450/1500"}]},{id:"HIST_004",card_id:"CARD_BANKRUPT_001",player_id:"P10004",type:"RECHARGE_BONUS",start_amount:100,current_wagering:120,target_wagering:500,cap:100,lave_balance:0,realized_amount:0,status:"FAIL",fail_reason:"餘額不足/破產歸零 (Bankruptcy)",create_time:"2026-01-29T09:00:00Z",settle_time:"2026-01-29T10:30:00Z",currency:k.SILVER,events:[{time:"2026-01-29T09:00:00Z",action:"CREATED",detail:"Card generated"},{time:"2026-01-29T09:05:00Z",action:"ACTIVATED",detail:"Player claimed"},{time:"2026-01-29T10:30:00Z",action:"BANKRUPTED",detail:"Bonus wallet balance dropped below 1. Wagering: 120/500. Protection triggered."}]},{id:"HIST_005",card_id:"CARD_ACTIVE_001",player_id:"P10005",type:"RECHARGE_BONUS",start_amount:400,current_wagering:800,target_wagering:2e3,cap:400,lave_balance:350,realized_amount:0,status:"ACTIVE",create_time:"2026-01-29T14:00:00Z",currency:k.SILVER,events:[{time:"2026-01-29T14:00:00Z",action:"CREATED",detail:"Card generated"},{time:"2026-01-29T14:05:00Z",action:"ACTIVATED",detail:"Player claimed and started wagering"}]}],Be={getHistory:async i=>{await Ne(300);let a=[...Pe];if(i.card_id&&(a=a.filter(v=>v.card_id.includes(i.card_id))),i.player_id&&(a=a.filter(v=>v.player_id.includes(i.player_id))),i.status&&(a=a.filter(v=>v.status===i.status)),i.date_start&&i.date_end){const v=new Date(i.date_start).getTime(),_=new Date(i.date_end).getTime();a=a.filter(w=>{const h=new Date(w.create_time).getTime();return h>=v&&h<=_})}const s=a.length,u=(i.page-1)*i.page_size,l=u+i.page_size;return{code:0,msg:"success",data:{list:a.slice(u,l),total:s}}}},Fe={class:"p-6 flex flex-col gap-4"},$e={class:"relative"},Ve={class:"p-4"},Ze={key:0},Le={class:"grid grid-cols-2 gap-3 text-sm mb-4"},Ue={class:"font-mono"},Oe={key:0,class:"col-span-2"},He={class:"text-red-600"},Me={class:"mt-6"},mt=B({__name:"BonusHistory",setup(i){const a=ce(),s=T(!1),u=T([]),l=T(null),r=K({card_id:"",search_type:"id",q:"",status:void 0,date_start:void 0,date_end:void 0,page:1,page_size:10}),v=[{label:"進行中",value:"ACTIVE"},{label:"成功",value:"SUCCESS"},{label:"失敗",value:"FAIL"}],_=K({page:1,pageSize:10,itemCount:0,showSizePicker:!0,pageSizes:[10,20,50],onChange:t=>{_.page=t,r.page=t,h()},onUpdatePageSize:t=>{_.pageSize=t,_.page=1,r.page_size=t,r.page=1,h()}}),w=[{title:"Card ID",key:"card_id",width:160,ellipsis:{tooltip:!0}},{title:"玩家 ID",key:"player_id",width:100},{title:"獎勵類型",key:"type",width:120},{title:"初始金額",key:"start_amount",width:100,render:t=>t.start_amount.toFixed(2)},{title:"剩餘金額",key:"lave_balance",width:100,render:t=>t.lave_balance.toFixed(2)},{title:"目標流水",key:"target_wagering",width:100,render:t=>t.target_wagering.toFixed(2)},{title:"達成流水",key:"current_wagering",width:100,render:t=>t.current_wagering.toFixed(2)},{title:"Cap 上限",key:"cap",width:100,render:t=>t.cap.toFixed(2)},{title:"實際轉換",key:"realized_amount",width:100,render:t=>{const e=t.realized_amount.toFixed(2);return t.status==="SUCCESS"?y("span",{class:"text-green-600 font-semibold"},e):y("span",{class:"text-gray-400"},e)}},{title:"狀態",key:"status",width:100,render(t){const e={SUCCESS:"success",ACTIVE:"warning",FAIL:"error"},o={SUCCESS:"成功",ACTIVE:"進行中",FAIL:"失敗"};return y(q,{type:e[t.status]||"default",bordered:!1},{default:()=>o[t.status]||t.status})}},{title:"失敗原因",key:"fail_reason",width:150,ellipsis:{tooltip:!0},render:t=>t.fail_reason||"-"},{title:"建立時間",key:"create_time",width:160,render:t=>t.create_time.replace("T"," ").replace("Z","")},{title:"結算時間",key:"settle_time",width:160,render:t=>t.settle_time?t.settle_time.replace("T"," ").replace("Z",""):"-"},{title:"操作",key:"actions",width:80,fixed:"right",render(t){return y(M,{size:"small",secondary:!0,onClick:()=>F(t)},{icon:()=>y(Re)})}}],h=async()=>{s.value=!0;try{const t=await Be.getHistory(r);t.code===0?(u.value=t.data.list,_.itemCount=t.data.total):a.error(t.msg)}catch{a.error("載入失敗")}finally{s.value=!1}},z=()=>{l.value?(r.date_start=new Date(l.value[0]).toISOString().split("T")[0],r.date_end=new Date(l.value[1]).toISOString().split("T")[0]):(r.date_start=void 0,r.date_end=void 0),r.page=1,_.page=1,h()},S=T(!1),m=T(null),F=t=>{m.value=t,S.value=!0},E=T(!1),P=t=>{const e=t.target;E.value=e.scrollTop>20};return me(()=>{h();const t=document.getElementById("main-scroll-container");t&&t.addEventListener("scroll",P)}),ue(()=>{const t=document.getElementById("main-scroll-container");t&&t.removeEventListener("scroll",P)}),(t,e)=>(b(),N("div",Fe,[n("div",{class:V(["sticky top-0 z-30 transition-all duration-300",{"pt-2":E.value}])},[c(d(j),{title:"獎勵卡歷史紀錄",class:V(["rounded-xl shadow-sm border-0 premium-card transition-all duration-300",{"premium-glass shadow-xl mx-2":E.value}]),size:"small"},{default:p(()=>[c(d(pe),{inline:"",model:r,"label-placement":"left",class:"flex-wrap gap-4 mb-4"},{default:p(()=>[c(d(R),{label:"Card ID"},{default:p(()=>[c(d(H),{value:r.card_id,"onUpdate:value":e[0]||(e[0]=o=>r.card_id=o),placeholder:"精確搜尋",clearable:"",style:{width:"200px"}},null,8,["value"])]),_:1}),c(d(R),{label:"玩家搜尋"},{default:p(()=>[n("div",$e,[c(d(xe),{value:r.search_type,"onUpdate:value":e[1]||(e[1]=o=>r.search_type=o),size:"small",class:"absolute -top-7 left-0 whitespace-nowrap"},{default:p(()=>[c(d(Z),{value:"id"},{default:p(()=>[...e[6]||(e[6]=[f("ID",-1)])]),_:1}),c(d(Z),{value:"username"},{default:p(()=>[...e[7]||(e[7]=[f("使用者名稱",-1)])]),_:1}),c(d(Z),{value:"phone"},{default:p(()=>[...e[8]||(e[8]=[f("手機",-1)])]),_:1})]),_:1},8,["value"]),c(d(H),{value:r.q,"onUpdate:value":e[2]||(e[2]=o=>r.q=o),placeholder:"請輸入搜尋關鍵字",clearable:"",style:{width:"200px"}},null,8,["value"])])]),_:1}),c(d(R),{label:"狀態"},{default:p(()=>[c(d(Ce),{value:r.status,"onUpdate:value":e[3]||(e[3]=o=>r.status=o),options:v,placeholder:"全部",clearable:"",style:{width:"140px"}},null,8,["value"])]),_:1}),c(d(R),{label:"建立時間"},{default:p(()=>[c(d(he),{value:l.value,"onUpdate:value":e[4]||(e[4]=o=>l.value=o),type:"daterange",clearable:"",style:{width:"280px"}},null,8,["value"])]),_:1}),c(d(R),null,{default:p(()=>[c(d(M),{type:"primary",onClick:z,loading:s.value},{icon:p(()=>[c(d(_e))]),default:p(()=>[e[9]||(e[9]=f(" 查詢 ",-1))]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1},8,["class"])],2),c(d(j),{class:"rounded-xl shadow-sm border-0 premium-card overflow-hidden","content-class":"p-0"},{default:p(()=>[e[10]||(e[10]=n("div",{class:"p-4 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-200"}," 紀錄列表 ",-1)),n("div",Ve,[c(d(we),{columns:w,data:u.value,loading:s.value,pagination:_,"scroll-x":1600},null,8,["data","loading","pagination"])])]),_:1}),c(d(fe),{show:S.value,"onUpdate:show":e[5]||(e[5]=o=>S.value=o),preset:"card",title:"獎勵卡詳細資訊",style:{width:"700px"}},{default:p(()=>[m.value?(b(),N("div",Ze,[n("div",Le,[n("div",null,[e[11]||(e[11]=n("span",{class:"text-gray-500"},"Card ID:",-1)),e[12]||(e[12]=f()),n("span",Ue,C(m.value.card_id),1)]),n("div",null,[e[13]||(e[13]=n("span",{class:"text-gray-500"},"玩家 ID:",-1)),f(" "+C(m.value.player_id),1)]),n("div",null,[e[14]||(e[14]=n("span",{class:"text-gray-500"},"獎勵類型:",-1)),f(" "+C(m.value.type),1)]),n("div",null,[e[15]||(e[15]=n("span",{class:"text-gray-500"},"狀態:",-1)),c(d(q),{type:m.value.status==="SUCCESS"?"success":m.value.status==="FAIL"?"error":"warning",size:"small"},{default:p(()=>[f(C(m.value.status),1)]),_:1},8,["type"])]),n("div",null,[e[16]||(e[16]=n("span",{class:"text-gray-500"},"初始金額:",-1)),f(" "+C(m.value.start_amount.toFixed(2)),1)]),n("div",null,[e[17]||(e[17]=n("span",{class:"text-gray-500"},"剩餘餘額:",-1)),f(" "+C(m.value.lave_balance.toFixed(2)),1)]),n("div",null,[e[18]||(e[18]=n("span",{class:"text-gray-500"},"目標流水:",-1)),f(" "+C(m.value.target_wagering.toFixed(2)),1)]),n("div",null,[e[19]||(e[19]=n("span",{class:"text-gray-500"},"達成流水:",-1)),f(" "+C(m.value.current_wagering.toFixed(2)),1)]),n("div",null,[e[20]||(e[20]=n("span",{class:"text-gray-500"},"Cap 上限:",-1)),f(" "+C(m.value.cap.toFixed(2)),1)]),n("div",null,[e[21]||(e[21]=n("span",{class:"text-gray-500"},"實際轉換:",-1)),n("span",{class:V(m.value.realized_amount>0?"text-green-600 font-semibold":"text-gray-400")},C(m.value.realized_amount.toFixed(2)),3)]),m.value.fail_reason?(b(),N("div",Oe,[e[22]||(e[22]=n("span",{class:"text-gray-500"},"失敗原因:",-1)),e[23]||(e[23]=f()),n("span",He,C(m.value.fail_reason),1)])):W("",!0)]),n("div",Me,[e[24]||(e[24]=n("h4",{class:"font-semibold mb-3 text-base"},"異動日誌 (Timeline)",-1)),c(d(ke),null,{default:p(()=>[(b(!0),N(ge,null,ve(m.value.events,(o,$)=>(b(),ye(d(Ae),{key:$,type:o.action==="SETTLED"||o.action==="CREATED"?"success":o.action.includes("FAIL")||o.action.includes("ABANDON")||o.action.includes("EXPIRE")||o.action.includes("BANKRUPT")?"error":"info",title:o.action,time:o.time.replace("T"," ").replace("Z","")},{default:p(()=>[f(C(o.detail),1)]),_:2},1032,["type","title","time"]))),128))]),_:1})])])):W("",!0)]),_:1},8,["show"])]))}});export{mt as default};
