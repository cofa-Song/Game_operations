import{B as S}from"./bonus-WzX8Tgz6.js";import{m as Y,an as ee,aK as te,c as p,b as E,a as k,d as x,e as N,u as K,f as G,h as _,k as ie,p as ne,a9 as $,q as V,n as ae,aJ as re,g as le,j as Z,au as I,aL as oe,v as R,w as n,s as T,P as se,o as de,E as c,D as g,F as d,Y as ce,Z as A,$ as L,J as f,K as U,Q as me,G as C,V as ue,W as O,I as pe,H as ge,a1 as ve,r as D,a0 as H,C as fe}from"./index-BsKuKuBe.js";import{S as _e}from"./SearchOutline-tjJoWZeT.js";import{N as ye}from"./RadioGroup-CgIVku-C.js";import{N as F}from"./Radio-C5fS5KPL.js";import{N as xe}from"./Select-CCDzjsmj.js";import{N as Ce}from"./DatePicker-CVYfnur-.js";import{N as he}from"./DataTable-D5mRR0cm.js";import{N as M}from"./Tag-I3_cH6qL.js";import"./Popover-CfBNgOAF.js";import"./use-compitable-BjMNwQgq.js";import"./create-Bj8PAPmY.js";import"./Empty-DtuLCoXR.js";import"./use-keyboard-kkRvbDTj.js";import"./Forward-CBwL8ab_.js";import"./Tooltip-XZFA5Owl.js";import"./Dropdown-CcmdnIk3.js";import"./Icon-CbayTH31.js";import"./create-ref-setter-C4J8sofl.js";import"./Pagination-BLbp2o8H.js";let j=!1;function we(){if(Y&&window.CSS&&!j&&(j=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}function Te(t){const{textColor3:a,infoColor:s,errorColor:u,successColor:l,warningColor:r,textColor1:v,textColor2:y,railColor:w,fontWeightStrong:h,fontSize:z}=t;return Object.assign(Object.assign({},te),{contentFontSize:z,titleFontWeight:h,circleBorder:`2px solid ${a}`,circleBorderInfo:`2px solid ${s}`,circleBorderError:`2px solid ${u}`,circleBorderSuccess:`2px solid ${l}`,circleBorderWarning:`2px solid ${r}`,iconColor:a,iconColorInfo:s,iconColorError:u,iconColorSuccess:l,iconColorWarning:r,titleTextColor:v,contentTextColor:y,metaTextColor:a,lineColor:w})}const ze={common:ee,self:Te},W=1.25,be=p("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${W};
`,[E("horizontal",`
 flex-direction: row;
 `,[k(">",[p("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[E("dashed-line-type",[k(">",[p("timeline-item-timeline",[x("line",`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),k(">",[p("timeline-item-content",`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[k(">",[x("meta",`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),p("timeline-item-timeline",`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[x("line",`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),E("right-placement",[p("timeline-item",[p("timeline-item-content",`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),p("timeline-item-timeline",`
 width: var(--n-icon-size);
 right: 0;
 `)])]),E("left-placement",[p("timeline-item",[p("timeline-item-content",`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),p("timeline-item-timeline",`
 left: 0;
 `)])]),p("timeline-item",`
 position: relative;
 `,[k("&:last-child",[p("timeline-item-timeline",[x("line",`
 display: none;
 `)]),p("timeline-item-content",[x("meta",`
 margin-bottom: 0;
 `)])]),p("timeline-item-content",[x("title",`
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
 `)]),E("dashed-line-type",[p("timeline-item-timeline",[x("line",`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),p("timeline-item-timeline",`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${W} / 2 - var(--n-icon-size) / 2);
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
 `)])])]),Se=Object.assign(Object.assign({},G.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),q=ie("n-timeline"),Ee=N({name:"Timeline",props:Se,setup(t,{slots:a}){const{mergedClsPrefixRef:s}=K(t),u=G("Timeline","-timeline",be,ze,t,s);return ne(q,{props:t,mergedThemeRef:u,mergedClsPrefixRef:s}),()=>{const{value:l}=s;return _("div",{class:[`${l}-timeline`,t.horizontal&&`${l}-timeline--horizontal`,`${l}-timeline--${t.size}-size`,!t.horizontal&&`${l}-timeline--${t.itemPlacement}-placement`]},a)}}}),ke={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},Ie=N({name:"TimelineItem",props:ke,slots:Object,setup(t){const a=ae(q);a||re("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),we();const{inlineThemeDisabled:s}=K(),u=Z(()=>{const{props:{size:r,iconSize:v},mergedThemeRef:y}=a,{type:w}=t,{self:{titleTextColor:h,contentTextColor:z,metaTextColor:b,lineColor:m,titleFontWeight:P,contentFontSize:i,[I("iconSize",r)]:e,[I("titleMargin",r)]:o,[I("titleFontSize",r)]:B,[I("circleBorder",w)]:X,[I("iconColor",w)]:J},common:{cubicBezierEaseInOut:Q}}=y.value;return{"--n-bezier":Q,"--n-circle-border":X,"--n-icon-color":J,"--n-content-font-size":i,"--n-content-text-color":z,"--n-line-color":m,"--n-meta-text-color":b,"--n-title-font-size":B,"--n-title-font-weight":P,"--n-title-margin":o,"--n-title-text-color":h,"--n-icon-size":oe(v)||e}}),l=s?le("timeline-item",Z(()=>{const{props:{size:r,iconSize:v}}=a,{type:y}=t;return`${r[0]}${v||"a"}${y[0]}`}),u,a.props):void 0;return{mergedClsPrefix:a.mergedClsPrefixRef,cssVars:s?void 0:u,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){const{mergedClsPrefix:t,color:a,onRender:s,$slots:u}=this;return s==null||s(),_("div",{class:[`${t}-timeline-item`,this.themeClass,`${t}-timeline-item--${this.type}-type`,`${t}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},_("div",{class:`${t}-timeline-item-timeline`},_("div",{class:`${t}-timeline-item-timeline__line`}),$(u.icon,l=>l?_("div",{class:`${t}-timeline-item-timeline__icon`,style:{color:a}},l):_("div",{class:`${t}-timeline-item-timeline__circle`,style:{borderColor:a}}))),_("div",{class:`${t}-timeline-item-content`},$(u.header,l=>l||this.title?_("div",{class:`${t}-timeline-item-content__title`},l||this.title):null),_("div",{class:`${t}-timeline-item-content__content`},V(u.default,()=>[this.content])),_("div",{class:`${t}-timeline-item-content__meta`},V(u.footer,()=>[this.time]))))}}),Ae={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},De=N({name:"DocumentTextOutline",render:function(a,s){return T(),R("svg",Ae,s[0]||(s[0]=[n("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),n("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),n("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),n("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1)]))}}),Re=t=>new Promise(a=>setTimeout(a,t)),Ne=[{id:"HIST_001",card_id:"CARD_SUCCESS_001",player_id:"P10001",type:"RECHARGE_BONUS",start_amount:500,current_wagering:2500,target_wagering:2500,cap:500,lave_balance:700,realized_amount:500,status:"SUCCESS",create_time:"2026-01-25T10:00:00Z",settle_time:"2026-01-25T14:30:00Z",currency:S.SILVER,events:[{time:"2026-01-25T10:00:00Z",action:"CREATED",detail:"Card generated from recharge bonus"},{time:"2026-01-25T10:05:00Z",action:"ACTIVATED",detail:"Player claimed and activated"},{time:"2026-01-25T14:30:00Z",action:"SETTLED",detail:"Wagering completed: 2500/2500. Transferred 500 (Cap limit), Burned overflow: 200"}]},{id:"HIST_002",card_id:"CARD_EXPIRE_001",player_id:"P10002",type:"GIFT_CODE",start_amount:200,current_wagering:0,target_wagering:1e3,cap:200,lave_balance:200,realized_amount:0,status:"FAIL",fail_reason:"已過期 (Expired)",create_time:"2026-01-20T08:00:00Z",settle_time:"2026-01-27T08:00:00Z",currency:S.SILVER,events:[{time:"2026-01-20T08:00:00Z",action:"CREATED",detail:"Card generated from gift code redemption"},{time:"2026-01-27T08:00:00Z",action:"EXPIRED",detail:"Card expired in queue without being claimed"}]},{id:"HIST_003",card_id:"CARD_ABANDON_001",player_id:"P10003",type:"MANUAL",start_amount:300,current_wagering:450,target_wagering:1500,cap:300,lave_balance:180,realized_amount:0,status:"FAIL",fail_reason:"玩家手動放棄 (Player Abandoned)",create_time:"2026-01-28T12:00:00Z",settle_time:"2026-01-28T18:00:00Z",currency:S.SILVER,events:[{time:"2026-01-28T12:00:00Z",action:"CREATED",detail:"Manually issued by admin"},{time:"2026-01-28T12:10:00Z",action:"ACTIVATED",detail:"Player claimed"},{time:"2026-01-28T18:00:00Z",action:"ABANDONED",detail:"Player manually abandoned the card. Wagering progress: 450/1500"}]},{id:"HIST_004",card_id:"CARD_BANKRUPT_001",player_id:"P10004",type:"RECHARGE_BONUS",start_amount:100,current_wagering:120,target_wagering:500,cap:100,lave_balance:0,realized_amount:0,status:"FAIL",fail_reason:"餘額不足/破產歸零 (Bankruptcy)",create_time:"2026-01-29T09:00:00Z",settle_time:"2026-01-29T10:30:00Z",currency:S.SILVER,events:[{time:"2026-01-29T09:00:00Z",action:"CREATED",detail:"Card generated"},{time:"2026-01-29T09:05:00Z",action:"ACTIVATED",detail:"Player claimed"},{time:"2026-01-29T10:30:00Z",action:"BANKRUPTED",detail:"Bonus wallet balance dropped below 1. Wagering: 120/500. Protection triggered."}]},{id:"HIST_005",card_id:"CARD_ACTIVE_001",player_id:"P10005",type:"RECHARGE_BONUS",start_amount:400,current_wagering:800,target_wagering:2e3,cap:400,lave_balance:350,realized_amount:0,status:"ACTIVE",create_time:"2026-01-29T14:00:00Z",currency:S.SILVER,events:[{time:"2026-01-29T14:00:00Z",action:"CREATED",detail:"Card generated"},{time:"2026-01-29T14:05:00Z",action:"ACTIVATED",detail:"Player claimed and started wagering"}]}],Pe={getHistory:async t=>{await Re(300);let a=[...Ne];if(t.card_id&&(a=a.filter(v=>v.card_id.includes(t.card_id))),t.player_id&&(a=a.filter(v=>v.player_id.includes(t.player_id))),t.status&&(a=a.filter(v=>v.status===t.status)),t.date_start&&t.date_end){const v=new Date(t.date_start).getTime(),y=new Date(t.date_end).getTime();a=a.filter(w=>{const h=new Date(w.create_time).getTime();return h>=v&&h<=y})}const s=a.length,u=(t.page-1)*t.page_size,l=u+t.page_size;return{code:0,msg:"success",data:{list:a.slice(u,l),total:s}}}},Be={class:"p-6"},Fe={class:"relative"},$e={key:0},Ve={class:"grid grid-cols-2 gap-3 text-sm mb-4"},Ze={class:"font-mono"},Le={key:0,class:"col-span-2"},Ue={class:"text-red-600"},Oe={class:"mt-6"},dt=N({__name:"BonusHistory",setup(t){const a=se(),s=D(!1),u=D([]),l=D(null),r=H({card_id:"",search_type:"id",q:"",status:void 0,date_start:void 0,date_end:void 0,page:1,page_size:10}),v=[{label:"進行中",value:"ACTIVE"},{label:"成功",value:"SUCCESS"},{label:"失敗",value:"FAIL"}],y=H({page:1,pageSize:10,itemCount:0,showSizePicker:!0,pageSizes:[10,20,50],onChange:i=>{y.page=i,r.page=i,h()},onUpdatePageSize:i=>{y.pageSize=i,y.page=1,r.page_size=i,r.page=1,h()}}),w=[{title:"Card ID",key:"card_id",width:160,ellipsis:{tooltip:!0}},{title:"玩家 ID",key:"player_id",width:100},{title:"獎勵類型",key:"type",width:120},{title:"初始金額",key:"start_amount",width:100,render:i=>i.start_amount.toFixed(2)},{title:"剩餘金額",key:"lave_balance",width:100,render:i=>i.lave_balance.toFixed(2)},{title:"目標流水",key:"target_wagering",width:100,render:i=>i.target_wagering.toFixed(2)},{title:"達成流水",key:"current_wagering",width:100,render:i=>i.current_wagering.toFixed(2)},{title:"Cap 上限",key:"cap",width:100,render:i=>i.cap.toFixed(2)},{title:"實際轉換",key:"realized_amount",width:100,render:i=>{const e=i.realized_amount.toFixed(2);return i.status==="SUCCESS"?_("span",{class:"text-green-600 font-semibold"},e):_("span",{class:"text-gray-400"},e)}},{title:"狀態",key:"status",width:100,render(i){const e={SUCCESS:"success",ACTIVE:"warning",FAIL:"error"},o={SUCCESS:"成功",ACTIVE:"進行中",FAIL:"失敗"};return _(M,{type:e[i.status]||"default",bordered:!1},{default:()=>o[i.status]||i.status})}},{title:"失敗原因",key:"fail_reason",width:150,ellipsis:{tooltip:!0},render:i=>i.fail_reason||"-"},{title:"建立時間",key:"create_time",width:160,render:i=>i.create_time.replace("T"," ").replace("Z","")},{title:"結算時間",key:"settle_time",width:160,render:i=>i.settle_time?i.settle_time.replace("T"," ").replace("Z",""):"-"},{title:"操作",key:"actions",width:80,fixed:"right",render(i){return _(U,{size:"small",secondary:!0,onClick:()=>P(i)},{icon:()=>_(De)})}}],h=async()=>{s.value=!0;try{const i=await Pe.getHistory(r);i.code===0?(u.value=i.data.list,y.itemCount=i.data.total):a.error(i.msg)}catch{a.error("載入失敗")}finally{s.value=!1}},z=()=>{l.value?(r.date_start=new Date(l.value[0]).toISOString().split("T")[0],r.date_end=new Date(l.value[1]).toISOString().split("T")[0]):(r.date_start=void 0,r.date_end=void 0),r.page=1,y.page=1,h()},b=D(!1),m=D(null),P=i=>{m.value=i,b.value=!0};return de(()=>{h()}),(i,e)=>(T(),R("div",Be,[c(d(me),{title:"獎勵卡歷史紀錄"},{default:g(()=>[c(d(ce),{inline:"",model:r,"label-placement":"left",class:"flex-wrap gap-4 mb-4"},{default:g(()=>[c(d(A),{label:"Card ID"},{default:g(()=>[c(d(L),{value:r.card_id,"onUpdate:value":e[0]||(e[0]=o=>r.card_id=o),placeholder:"精確搜尋",clearable:"",style:{width:"200px"}},null,8,["value"])]),_:1}),c(d(A),{label:"玩家搜尋"},{default:g(()=>[n("div",Fe,[c(d(ye),{value:r.search_type,"onUpdate:value":e[1]||(e[1]=o=>r.search_type=o),size:"small",class:"absolute -top-7 left-0 whitespace-nowrap"},{default:g(()=>[c(d(F),{value:"id"},{default:g(()=>[...e[6]||(e[6]=[f("ID",-1)])]),_:1}),c(d(F),{value:"username"},{default:g(()=>[...e[7]||(e[7]=[f("使用者名稱",-1)])]),_:1}),c(d(F),{value:"phone"},{default:g(()=>[...e[8]||(e[8]=[f("手機",-1)])]),_:1})]),_:1},8,["value"]),c(d(L),{value:r.q,"onUpdate:value":e[2]||(e[2]=o=>r.q=o),placeholder:"請輸入搜尋關鍵字",clearable:"",style:{width:"200px"}},null,8,["value"])])]),_:1}),c(d(A),{label:"狀態"},{default:g(()=>[c(d(xe),{value:r.status,"onUpdate:value":e[3]||(e[3]=o=>r.status=o),options:v,placeholder:"全部",clearable:"",style:{width:"140px"}},null,8,["value"])]),_:1}),c(d(A),{label:"建立時間"},{default:g(()=>[c(d(Ce),{value:l.value,"onUpdate:value":e[4]||(e[4]=o=>l.value=o),type:"daterange",clearable:"",style:{width:"280px"}},null,8,["value"])]),_:1}),c(d(A),null,{default:g(()=>[c(d(U),{type:"primary",onClick:z,loading:s.value},{icon:g(()=>[c(d(_e))]),default:g(()=>[e[9]||(e[9]=f(" 查詢 ",-1))]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"]),c(d(he),{columns:w,data:u.value,loading:s.value,pagination:y,"scroll-x":1600},null,8,["data","loading","pagination"])]),_:1}),c(d(ve),{show:b.value,"onUpdate:show":e[5]||(e[5]=o=>b.value=o),preset:"card",title:"獎勵卡詳細資訊",style:{width:"700px"}},{default:g(()=>[m.value?(T(),R("div",$e,[n("div",Ve,[n("div",null,[e[10]||(e[10]=n("span",{class:"text-gray-500"},"Card ID:",-1)),e[11]||(e[11]=f()),n("span",Ze,C(m.value.card_id),1)]),n("div",null,[e[12]||(e[12]=n("span",{class:"text-gray-500"},"玩家 ID:",-1)),f(" "+C(m.value.player_id),1)]),n("div",null,[e[13]||(e[13]=n("span",{class:"text-gray-500"},"獎勵類型:",-1)),f(" "+C(m.value.type),1)]),n("div",null,[e[14]||(e[14]=n("span",{class:"text-gray-500"},"狀態:",-1)),c(d(M),{type:m.value.status==="SUCCESS"?"success":m.value.status==="FAIL"?"error":"warning",size:"small"},{default:g(()=>[f(C(m.value.status),1)]),_:1},8,["type"])]),n("div",null,[e[15]||(e[15]=n("span",{class:"text-gray-500"},"初始金額:",-1)),f(" "+C(m.value.start_amount.toFixed(2)),1)]),n("div",null,[e[16]||(e[16]=n("span",{class:"text-gray-500"},"剩餘餘額:",-1)),f(" "+C(m.value.lave_balance.toFixed(2)),1)]),n("div",null,[e[17]||(e[17]=n("span",{class:"text-gray-500"},"目標流水:",-1)),f(" "+C(m.value.target_wagering.toFixed(2)),1)]),n("div",null,[e[18]||(e[18]=n("span",{class:"text-gray-500"},"達成流水:",-1)),f(" "+C(m.value.current_wagering.toFixed(2)),1)]),n("div",null,[e[19]||(e[19]=n("span",{class:"text-gray-500"},"Cap 上限:",-1)),f(" "+C(m.value.cap.toFixed(2)),1)]),n("div",null,[e[20]||(e[20]=n("span",{class:"text-gray-500"},"實際轉換:",-1)),n("span",{class:ue(m.value.realized_amount>0?"text-green-600 font-semibold":"text-gray-400")},C(m.value.realized_amount.toFixed(2)),3)]),m.value.fail_reason?(T(),R("div",Le,[e[21]||(e[21]=n("span",{class:"text-gray-500"},"失敗原因:",-1)),e[22]||(e[22]=f()),n("span",Ue,C(m.value.fail_reason),1)])):O("",!0)]),n("div",Oe,[e[23]||(e[23]=n("h4",{class:"font-semibold mb-3 text-base"},"異動日誌 (Timeline)",-1)),c(d(Ee),null,{default:g(()=>[(T(!0),R(pe,null,ge(m.value.events,(o,B)=>(T(),fe(d(Ie),{key:B,type:o.action==="SETTLED"||o.action==="CREATED"?"success":o.action.includes("FAIL")||o.action.includes("ABANDON")||o.action.includes("EXPIRE")||o.action.includes("BANKRUPT")?"error":"info",title:o.action,time:o.time.replace("T"," ").replace("Z","")},{default:g(()=>[f(C(o.detail),1)]),_:2},1032,["type","title","time"]))),128))]),_:1})])])):O("",!0)]),_:1},8,["show"])]))}});export{dt as default};
