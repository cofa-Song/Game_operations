import{c as p,a as m,d as h,e as L,h as z,u as K,ak as J,P as Y,v as D,E as a,D as l,F as t,T as Q,U as C,Z as f,$ as x,aN as X,K as P,J as v,C as c,X as Z,w as u,G as w,I as ee,H as te,W as y,Y as re,Q as ae,r as g,a0 as le,j as k,s as b,_ as oe}from"./index-BsKuKuBe.js";import{p as se}from"./player-DBNXbDlS.js";import{P as ie}from"./PersonOutline-mWqrqeav.js";import{N as ne}from"./Divider-DILe50Hg.js";import{N as U}from"./Statistic-C8A6-kum.js";import{N as ue}from"./Icon-CbayTH31.js";import{N as de}from"./RadioGroup-CgIVku-C.js";import{N as pe}from"./Space-Cf9Hs1lp.js";import{N as B}from"./Radio-C5fS5KPL.js";import{N as M}from"./Select-CCDzjsmj.js";import{N as F}from"./InputNumber-BMu_ZOnr.js";import{N as me}from"./Upload-BfkJi9Os.js";import{N as fe}from"./Switch-DXNn_bI_.js";import{N as ve}from"./Tag-I3_cH6qL.js";import"./bonus-WzX8Tgz6.js";import"./assetLogs-Dslkok5U.js";import"./Popover-CfBNgOAF.js";import"./use-compitable-BjMNwQgq.js";import"./create-Bj8PAPmY.js";import"./Empty-DtuLCoXR.js";import"./Add-BJRbFrfV.js";import"./Progress-DbyywU95.js";import"./Image--btsxYxc.js";import"./utils-pxpSiB-j.js";import"./Tooltip-XZFA5Owl.js";const be=p("input-group",`
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
 `,[h("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),m("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[h("state-border, border",`
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
 `),h("box-shadow, border, state-border",`
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
 `),h("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),ce={},ge=L({name:"InputGroup",props:ce,setup(d){const{mergedClsPrefixRef:i}=K(d);return J("-input-group",be,i),{mergedClsPrefix:i}},render(){const{mergedClsPrefix:d}=this;return z("div",{class:`${d}-input-group`},this.$slots)}}),H=[{label:"活動獎勵 (Event Reward)",value:"EVENT_REWARD"},{label:"系統補償 (System Compensation)",value:"SYSTEM_COMPENSATION"},{label:"線下充值 (Offline Deposit)",value:"OFFLINE_DEPOSIT"},{label:"錯誤扣回 (Correction/Rollback)",value:"CORRECTION"},{label:"其他 (Other)",value:"OTHER"}],j=d=>new Promise(i=>setTimeout(i,d)),ye={async createAdjustment(d){return await j(800),d.amount<=0?{code:400,msg:"金額必須大於 0"}:d.reason==="OFFLINE_DEPOSIT"&&!d.evidence?{code:400,msg:"線下充值必須上傳憑證"}:(console.log("[API] Create Adjustment:",d),{code:0,msg:"success"})},async getReasons(){return await j(200),{code:0,msg:"success",data:H}}},Ne={class:"manual-adjustment-container"},he={class:"player-info-grid"},we={class:"info-item"},Te={class:"value"},_e={class:"info-item"},Ie={class:"value"},Se={class:"info-item"},Ee={class:"value"},Oe={class:"info-item"},Ce={class:"wallet-info"},Re=L({__name:"ManualAdjustment",setup(d){const i=Y(),N=g(""),T=g(!1),n=g(null),_=g(null),I=g(!1),S=g([]),r=le({type:"DEPOSIT",walletType:"CASH",amount:null,reason:null,note:"",evidence:null,isRollover:!1,rolloverMultiplier:1}),q=[{label:"儲值錢包 (Cash)",value:"CASH"},{label:"活動錢包 (Bonus)",value:"BONUS"}],G=H,R=k(()=>{var s,e;return((e=(s=n.value)==null?void 0:s.wallets.find(o=>o.type==="CASH"))==null?void 0:e.balance)||0}),A=k(()=>{var s,e;return((e=(s=n.value)==null?void 0:s.wallets.find(o=>o.type==="BONUS"))==null?void 0:e.balance)||0}),W={type:{required:!0,message:"請選擇操作類型",trigger:"change"},walletType:{required:!0,message:"請選擇目標錢包",trigger:"change"},amount:[{required:!0,message:"請輸入金額",trigger:"blur",type:"number"},{validator:(s,e)=>{if(e<=0)return new Error("金額必須大於 0");if(r.type==="WITHDRAW"&&n.value){const o=r.walletType==="CASH"?R.value:A.value;if(e>o)return new Error("餘額不足以扣除")}return!0},trigger:"blur"}],reason:{required:!0,message:"請選擇調整原因",trigger:"change"},note:[{required:!0,message:"請輸入備註",trigger:"blur"},{min:5,message:"備註至少需要 5 個字",trigger:"blur"}]},E=async()=>{if(N.value){T.value=!0,n.value=null;try{const s=await se.getPlayerDetail(N.value);s.code===0&&s.data?(n.value=s.data,i.success("已鎖定玩家")):i.error("找不到該玩家")}catch{i.error("搜尋失敗")}finally{T.value=!1}}},$=s=>{S.value=s.fileList,s.fileList.length>0&&s.fileList[0].file?r.evidence=s.fileList[0].file:r.evidence=null},V=async()=>{if(!(!_.value||!n.value)){if(r.reason==="OFFLINE_DEPOSIT"&&!r.evidence){i.error("線下充值必須上傳憑證");return}_.value.validate(async s=>{var e;if(s)i.error("請檢查表單欄位");else{(((e=n.value)==null?void 0:e.tags.includes("測試帳號"))||!1)&&i.warning("注意：此為測試帳號操作"),I.value=!0;try{const O=await ye.createAdjustment({playerId:n.value.id,type:r.type,walletType:r.walletType,amount:r.amount,reason:r.reason,note:r.note,evidence:r.evidence,isRollover:r.isRollover,rolloverMultiplier:r.rolloverMultiplier});O.code===0?(i.success("操作成功"),E(),r.amount=null,r.note="",r.evidence=null,S.value=[]):i.error(O.msg||"操作失敗")}catch{i.error("系統錯誤")}finally{I.value=!1}}})}};return(s,e)=>(b(),D("div",Ne,[a(t(ae),{title:"人工存提 (Manual Adjustment)",size:"large"},{default:l(()=>[a(t(Q),{"x-gap":"24",cols:1},{default:l(()=>[a(t(C),null,{default:l(()=>[a(t(f),{label:"玩家 ID (Player ID)",required:""},{default:l(()=>[a(t(ge),null,{default:l(()=>[a(t(x),{value:N.value,"onUpdate:value":e[0]||(e[0]=o=>N.value=o),placeholder:"輸入玩家 ID",onKeydown:X(E,["enter"])},null,8,["value"]),a(t(P),{type:"primary",onClick:E,loading:T.value},{default:l(()=>[...e[8]||(e[8]=[v(" 鎖定對象 ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1}),n.value?(b(),c(t(C),{key:0},{default:l(()=>[a(t(Z),{type:"info",title:"當前鎖定玩家",class:"mb-4"},{icon:l(()=>[a(t(ue),null,{default:l(()=>[a(t(ie))]),_:1})]),default:l(()=>[u("div",he,[u("div",we,[e[9]||(e[9]=u("span",{class:"label"},"ID:",-1)),u("span",Te,w(n.value.id),1)]),u("div",_e,[e[10]||(e[10]=u("span",{class:"label"},"帳號:",-1)),u("span",Ie,w(n.value.username),1)]),u("div",Se,[e[11]||(e[11]=u("span",{class:"label"},"暱稱:",-1)),u("span",Ee,w(n.value.display_name),1)]),u("div",Oe,[e[12]||(e[12]=u("span",{class:"label"},"標籤:",-1)),(b(!0),D(ee,null,te(n.value.tags,o=>(b(),c(t(ve),{key:o,size:"small",type:"warning",class:"mr-1"},{default:l(()=>[v(w(o),1)]),_:2},1024))),128))])]),a(t(ne)),u("div",Ce,[a(t(U),{label:"Cash 餘額",value:R.value},{prefix:l(()=>[...e[13]||(e[13]=[v("$",-1)])]),_:1},8,["value"]),a(t(U),{label:"Bonus 餘額",value:A.value,class:"ml-8"},{prefix:l(()=>[...e[14]||(e[14]=[v("$",-1)])]),_:1},8,["value"])])]),_:1})]),_:1})):y("",!0),n.value?(b(),c(t(C),{key:1},{default:l(()=>[a(t(re),{ref_key:"formRef",ref:_,model:r,rules:W,"label-placement":"left","label-width":"120","require-mark-placement":"right-hanging"},{default:l(()=>[a(t(f),{label:"操作類型",path:"type"},{default:l(()=>[a(t(de),{value:r.type,"onUpdate:value":e[1]||(e[1]=o=>r.type=o),name:"type"},{default:l(()=>[a(t(pe),null,{default:l(()=>[a(t(B),{value:"DEPOSIT"},{default:l(()=>[...e[15]||(e[15]=[v("人工存款 (加點)",-1)])]),_:1}),a(t(B),{value:"WITHDRAW"},{default:l(()=>[...e[16]||(e[16]=[v("人工提款 (扣點)",-1)])]),_:1})]),_:1})]),_:1},8,["value"])]),_:1}),a(t(f),{label:"目標錢包",path:"walletType"},{default:l(()=>[a(t(M),{value:r.walletType,"onUpdate:value":e[2]||(e[2]=o=>r.walletType=o),options:q},null,8,["value"])]),_:1}),a(t(f),{label:"調整金額",path:"amount"},{default:l(()=>[a(t(F),{value:r.amount,"onUpdate:value":e[3]||(e[3]=o=>r.amount=o),min:1,precision:2,placeholder:"輸入金額",style:{width:"100%"}},{prefix:l(()=>[...e[17]||(e[17]=[v("$",-1)])]),_:1},8,["value"])]),_:1}),a(t(f),{label:"調整原因",path:"reason"},{default:l(()=>[a(t(M),{value:r.reason,"onUpdate:value":e[4]||(e[4]=o=>r.reason=o),options:t(G),placeholder:"請選擇原因"},null,8,["value","options"])]),_:1}),a(t(f),{label:"詳細備註",path:"note"},{default:l(()=>[a(t(x),{value:r.note,"onUpdate:value":e[5]||(e[5]=o=>r.note=o),type:"textarea",placeholder:"請輸入詳細說明 (至少 5 字)"},null,8,["value"])]),_:1}),r.reason==="OFFLINE_DEPOSIT"?(b(),c(t(f),{key:0,label:"相關憑證",path:"evidence"},{default:l(()=>[a(t(me),{"list-type":"image-card",max:1,accept:"image/png, image/jpeg",onChange:$,"default-file-list":S.value},{default:l(()=>[...e[18]||(e[18]=[u("div",null,"上傳圖片",-1)])]),_:1},8,["default-file-list"])]),_:1})):y("",!0),r.walletType==="BONUS"&&r.type==="DEPOSIT"?(b(),c(t(f),{key:1,label:"計入流水",path:"isRollover"},{default:l(()=>[a(t(fe),{value:r.isRollover,"onUpdate:value":e[6]||(e[6]=o=>r.isRollover=o)},null,8,["value"])]),_:1})):y("",!0),r.isRollover&&r.walletType==="BONUS"&&r.type==="DEPOSIT"?(b(),c(t(f),{key:2,label:"流水倍率",path:"rolloverMultiplier"},{default:l(()=>[a(t(F),{value:r.rolloverMultiplier,"onUpdate:value":e[7]||(e[7]=o=>r.rolloverMultiplier=o),min:0,step:1,placeholder:"倍率"},null,8,["value"])]),_:1})):y("",!0),a(t(f),null,{default:l(()=>[a(t(P),{type:"primary",onClick:V,loading:I.value,size:"large",block:""},{default:l(()=>[...e[19]||(e[19]=[v(" 提交申請 ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})):y("",!0)]),_:1})]),_:1})]))}}),tt=oe(Re,[["__scopeId","data-v-6cf0b1d5"]]);export{tt as default};
