import{c as p,a as m,d as w,e as $,h as Z,u as ee,cI as te,P as ae,o as re,a9 as le,v as D,w as i,E as r,D as l,F as t,Z as f,$ as P,an as oe,K as k,J as c,C as g,G as y,W as h,V as B,Q as U,I as se,H as ie,X as ne,Y as ue,r as b,a0 as de,j as M,s as v,_ as pe}from"./index-SaeBVZ4H.js";import{p as me}from"./player-ztEq2tUp.js";import{P as F}from"./PersonOutline-QwCdkS8z.js";import{N as L}from"./Icon-hobedRy7.js";import{N as j}from"./Tag-TsAZjJus.js";import{N as fe}from"./Divider-BT8tIYyP.js";import{N as H}from"./Statistic-BT79DRN3.js";import{N as ce}from"./RadioGroup-B-bzus1A.js";import{N as ve}from"./Space-T8EbEcNl.js";import{N as z}from"./Radio-BA7MPEuH.js";import{N as q}from"./Select-rIShgKRW.js";import{N as V}from"./InputNumber-B_MoDgOf.js";import{N as be}from"./Upload-CabyjwYp.js";import{N as ge}from"./Switch-Ceuk9Dzw.js";import"./bonus-WzX8Tgz6.js";import"./assetLogs-Dslkok5U.js";import"./Popover-Dy9EfgzZ.js";import"./use-compitable-DsM1eTrz.js";import"./create-LI9JRsZf.js";import"./Empty-Cp6q7VN8.js";import"./Add-DjaKIXSB.js";import"./Progress-wMBAyewH.js";import"./Image-8k4jVCJP.js";import"./utils-CPDf0EvT.js";import"./Tooltip-DUQSKY3I.js";import"./download-C2161hUv.js";const ye=p("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[m(">",[p("input",[m("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),m("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),p("button",[m("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[w("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),m("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[w("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),m("*",[m("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[m(">",[p("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),p("base-selection",[p("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),p("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),w("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),m("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[m(">",[p("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),p("base-selection",[p("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),p("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),w("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),he={},Ne=$({name:"InputGroup",props:he,setup(d){const{mergedClsPrefixRef:u}=ee(d);return te("-input-group",ye,u),{mergedClsPrefix:u}},render(){const{mergedClsPrefix:d}=this;return Z("div",{class:`${d}-input-group`},this.$slots)}}),G=[{label:"活動獎勵 (Event Reward)",value:"EVENT_REWARD"},{label:"系統補償 (System Compensation)",value:"SYSTEM_COMPENSATION"},{label:"線下充值 (Offline Deposit)",value:"OFFLINE_DEPOSIT"},{label:"錯誤扣回 (Correction/Rollback)",value:"CORRECTION"},{label:"其他 (Other)",value:"OTHER"}],W=d=>new Promise(u=>setTimeout(u,d)),we={async createAdjustment(d){return await W(800),d.amount<=0?{code:400,msg:"金額必須大於 0"}:d.reason==="OFFLINE_DEPOSIT"&&!d.evidence?{code:400,msg:"線下充值必須上傳憑證"}:(console.log("[API] Create Adjustment:",d),{code:0,msg:"success"})},async getReasons(){return await W(200),{code:0,msg:"success",data:G}}},_e={class:"manual-adjustment-container flex flex-col gap-6"},Ie={class:"flex items-center gap-2"},Se={class:"flex flex-col gap-6 relative z-10"},Te={class:"player-info-grid"},Ee={class:"info-item"},xe={class:"value"},Ce={class:"info-item"},Oe={class:"value"},Re={class:"info-item"},Ae={class:"value"},De={class:"info-item"},Pe={class:"wallet-info"},ke=$({__name:"ManualAdjustment",setup(d){const u=ae(),_=b(!1),O=o=>{const e=o.target;_.value=e.scrollTop>20};re(()=>{const o=document.getElementById("main-scroll-container");o&&o.addEventListener("scroll",O)}),le(()=>{const o=document.getElementById("main-scroll-container");o&&o.removeEventListener("scroll",O)});const N=b(""),I=b(!1),n=b(null),S=b(null),T=b(!1),E=b([]),a=de({type:"DEPOSIT",walletType:"CASH",amount:null,reason:null,note:"",evidence:null,isRollover:!1,rolloverMultiplier:1}),K=[{label:"儲值錢包 (Cash)",value:"CASH"},{label:"活動錢包 (Bonus)",value:"BONUS"}],J=G,R=M(()=>{var o,e;return((e=(o=n.value)==null?void 0:o.wallets.find(s=>s.type==="CASH"))==null?void 0:e.balance)||0}),A=M(()=>{var o,e;return((e=(o=n.value)==null?void 0:o.wallets.find(s=>s.type==="BONUS"))==null?void 0:e.balance)||0}),Y={type:{required:!0,message:"請選擇操作類型",trigger:"change"},walletType:{required:!0,message:"請選擇目標錢包",trigger:"change"},amount:[{required:!0,message:"請輸入金額",trigger:"blur",type:"number"},{validator:(o,e)=>{if(e<=0)return new Error("金額必須大於 0");if(a.type==="WITHDRAW"&&n.value){const s=a.walletType==="CASH"?R.value:A.value;if(e>s)return new Error("餘額不足以扣除")}return!0},trigger:"blur"}],reason:{required:!0,message:"請選擇調整原因",trigger:"change"},note:[{required:!0,message:"請輸入備註",trigger:"blur"},{min:5,message:"備註至少需要 5 個字",trigger:"blur"}]},x=async()=>{if(N.value){I.value=!0,n.value=null;try{const o=await me.getPlayerDetail(N.value);o.code===0&&o.data?(n.value=o.data,u.success("已鎖定玩家")):u.error("找不到該玩家")}catch{u.error("搜尋失敗")}finally{I.value=!1}}},Q=o=>{E.value=o.fileList,o.fileList.length>0&&o.fileList[0].file?a.evidence=o.fileList[0].file:a.evidence=null},X=async()=>{if(!(!S.value||!n.value)){if(a.reason==="OFFLINE_DEPOSIT"&&!a.evidence){u.error("線下充值必須上傳憑證");return}S.value.validate(async o=>{var e;if(o)u.error("請檢查表單欄位");else{(((e=n.value)==null?void 0:e.tags.includes("測試帳號"))||!1)&&u.warning("注意：此為測試帳號操作"),T.value=!0;try{const C=await we.createAdjustment({playerId:n.value.id,type:a.type,walletType:a.walletType,amount:a.amount,reason:a.reason,note:a.note,evidence:a.evidence,isRollover:a.isRollover,rolloverMultiplier:a.rolloverMultiplier});C.code===0?(u.success("操作成功"),x(),a.amount=null,a.note="",a.evidence=null,E.value=[]):u.error(C.msg||"操作失敗")}catch{u.error("系統錯誤")}finally{T.value=!1}}})}};return(o,e)=>(v(),D("div",_e,[i("div",{class:B(["sticky top-0 z-30 transition-all duration-300",{"pt-2":_.value}])},[r(t(U),{title:"人工存提 (Manual Adjustment)",size:"small",class:B(["rounded-xl shadow-sm border-0 premium-card transition-all duration-300",{"premium-glass shadow-xl mx-2":_.value}])},{"header-extra":l(()=>[i("div",Ie,[n.value?(v(),g(t(j),{key:0,type:"success",size:"small",round:""},{icon:l(()=>[r(t(L),{component:t(F)},null,8,["component"])]),default:l(()=>[c(" 已鎖定: "+y(n.value.username),1)]),_:1})):h("",!0)])]),default:l(()=>[r(t(f),{"show-label":!1,"show-feedback":!1},{default:l(()=>[r(t(Ne),null,{default:l(()=>[r(t(P),{value:N.value,"onUpdate:value":e[0]||(e[0]=s=>N.value=s),placeholder:"輸入玩家 ID",onKeydown:oe(x,["enter"]),class:"tech-input-light"},null,8,["value"]),r(t(k),{type:"primary",onClick:x,loading:I.value},{default:l(()=>[...e[8]||(e[8]=[c(" 鎖定對象 ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["class"])],2),i("div",Se,[n.value?(v(),g(t(U),{key:0,class:"rounded-xl shadow-sm border-0 premium-card"},{default:l(()=>[r(t(ne),{type:"info",title:"當前鎖定玩家",class:"mb-4"},{icon:l(()=>[r(t(L),null,{default:l(()=>[r(t(F))]),_:1})]),default:l(()=>[i("div",Te,[i("div",Ee,[e[9]||(e[9]=i("span",{class:"label"},"ID:",-1)),i("span",xe,y(n.value.id),1)]),i("div",Ce,[e[10]||(e[10]=i("span",{class:"label"},"帳號:",-1)),i("span",Oe,y(n.value.username),1)]),i("div",Re,[e[11]||(e[11]=i("span",{class:"label"},"暱稱:",-1)),i("span",Ae,y(n.value.display_name),1)]),i("div",De,[e[12]||(e[12]=i("span",{class:"label"},"標籤:",-1)),(v(!0),D(se,null,ie(n.value.tags,s=>(v(),g(t(j),{key:s,size:"small",type:"warning",class:"mr-1"},{default:l(()=>[c(y(s),1)]),_:2},1024))),128))])]),r(t(fe)),i("div",Pe,[r(t(H),{label:"Cash 餘額",value:R.value},{prefix:l(()=>[...e[13]||(e[13]=[c("$",-1)])]),_:1},8,["value"]),r(t(H),{label:"Bonus 餘額",value:A.value,class:"ml-8"},{prefix:l(()=>[...e[14]||(e[14]=[c("$",-1)])]),_:1},8,["value"])])]),_:1}),r(t(ue),{ref_key:"formRef",ref:S,model:a,rules:Y,"label-placement":"left","label-width":"120","require-mark-placement":"right-hanging"},{default:l(()=>[r(t(f),{label:"操作類型",path:"type"},{default:l(()=>[r(t(ce),{value:a.type,"onUpdate:value":e[1]||(e[1]=s=>a.type=s),name:"type"},{default:l(()=>[r(t(ve),null,{default:l(()=>[r(t(z),{value:"DEPOSIT"},{default:l(()=>[...e[15]||(e[15]=[c("人工存款 (加點)",-1)])]),_:1}),r(t(z),{value:"WITHDRAW"},{default:l(()=>[...e[16]||(e[16]=[c("人工提款 (扣點)",-1)])]),_:1})]),_:1})]),_:1},8,["value"])]),_:1}),r(t(f),{label:"目標錢包",path:"walletType"},{default:l(()=>[r(t(q),{value:a.walletType,"onUpdate:value":e[2]||(e[2]=s=>a.walletType=s),options:K},null,8,["value"])]),_:1}),r(t(f),{label:"調整金額",path:"amount"},{default:l(()=>[r(t(V),{value:a.amount,"onUpdate:value":e[3]||(e[3]=s=>a.amount=s),min:1,precision:2,placeholder:"輸入金額",style:{width:"100%"}},{prefix:l(()=>[...e[17]||(e[17]=[c("$",-1)])]),_:1},8,["value"])]),_:1}),r(t(f),{label:"調整原因",path:"reason"},{default:l(()=>[r(t(q),{value:a.reason,"onUpdate:value":e[4]||(e[4]=s=>a.reason=s),options:t(J),placeholder:"請選擇原因"},null,8,["value","options"])]),_:1}),r(t(f),{label:"詳細備註",path:"note"},{default:l(()=>[r(t(P),{value:a.note,"onUpdate:value":e[5]||(e[5]=s=>a.note=s),type:"textarea",placeholder:"請輸入詳細說明 (至少 5 字)"},null,8,["value"])]),_:1}),a.reason==="OFFLINE_DEPOSIT"?(v(),g(t(f),{key:0,label:"相關憑證",path:"evidence"},{default:l(()=>[r(t(be),{"list-type":"image-card",max:1,accept:"image/png, image/jpeg",onChange:Q,"default-file-list":E.value},{default:l(()=>[...e[18]||(e[18]=[i("div",null,"上傳圖片",-1)])]),_:1},8,["default-file-list"])]),_:1})):h("",!0),a.walletType==="BONUS"&&a.type==="DEPOSIT"?(v(),g(t(f),{key:1,label:"計入流水",path:"isRollover"},{default:l(()=>[r(t(ge),{value:a.isRollover,"onUpdate:value":e[6]||(e[6]=s=>a.isRollover=s)},null,8,["value"])]),_:1})):h("",!0),a.isRollover&&a.walletType==="BONUS"&&a.type==="DEPOSIT"?(v(),g(t(f),{key:2,label:"流水倍率",path:"rolloverMultiplier"},{default:l(()=>[r(t(V),{value:a.rolloverMultiplier,"onUpdate:value":e[7]||(e[7]=s=>a.rolloverMultiplier=s),min:0,step:1,placeholder:"倍率"},null,8,["value"])]),_:1})):h("",!0),r(t(f),null,{default:l(()=>[r(t(k),{type:"primary",onClick:X,loading:T.value,size:"large",block:""},{default:l(()=>[...e[19]||(e[19]=[c(" 提交申請 ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})):h("",!0)])]))}}),it=pe(ke,[["__scopeId","data-v-4645dee9"]]);export{it as default};
