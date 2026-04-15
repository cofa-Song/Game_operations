const e=[{rank:0,name:"鐵牌",promotion_desc:"新註冊",retention_desc:"-",promo_deposit:0,promo_turnover:0,is_perpetual:!0,retain_deposit:0,retain_turnover:0,retain_active_days:0,gift_fee_rate:0,rebate_rate:0},{rank:1,name:"銅牌",promotion_desc:`1. 儲值1,000
2. 流水1,000,000金幣`,retention_desc:"-",promo_deposit:1e3,promo_turnover:1e6,is_perpetual:!0,retain_deposit:0,retain_turnover:0,retain_active_days:0,gift_fee_rate:0,rebate_rate:.1},{rank:2,name:"銀牌",promotion_desc:"綁定手機號碼",retention_desc:"-",promo_deposit:0,promo_turnover:0,promo_special:"綁定手機號碼",is_perpetual:!0,retain_deposit:0,retain_turnover:0,retain_active_days:0,gift_fee_rate:2,rebate_rate:.2},{rank:3,name:"金牌",promotion_desc:`1. 儲值5,000
2. 流水5,000,000金幣`,retention_desc:`1. 儲值2,500
2. 流水2,500,000金幣
3. 每月活躍天數8天`,promo_deposit:5e3,promo_turnover:5e6,is_perpetual:!1,retain_deposit:2500,retain_turnover:25e5,retain_active_days:8,gift_fee_rate:1.8,rebate_rate:.3},{rank:4,name:"白金",promotion_desc:`1. 儲值10,000
2. 流水10,000,000金幣`,retention_desc:`1. 儲值5,000
2. 流水5,000,000金幣
3. 每月活躍天數12天`,promo_deposit:1e4,promo_turnover:1e7,is_perpetual:!1,retain_deposit:5e3,retain_turnover:5e6,retain_active_days:12,gift_fee_rate:1.6,rebate_rate:.4},{rank:5,name:"琥珀",promotion_desc:`1. 儲值20,000
2. 流水20,000,000金幣`,retention_desc:`1. 儲值10,000
2. 流水10,000,000金幣
3. 每月活躍天數16天`,promo_deposit:2e4,promo_turnover:2e7,is_perpetual:!1,retain_deposit:1e4,retain_turnover:1e7,retain_active_days:16,gift_fee_rate:1.3,rebate_rate:.4},{rank:6,name:"翡翠",promotion_desc:`1. 儲值35,000
2. 流水35,000,000金幣`,retention_desc:`1. 儲值18,000
2. 流水18,000,000金幣
3. 每月活躍天數16天`,promo_deposit:35e3,promo_turnover:35e6,is_perpetual:!1,retain_deposit:18e3,retain_turnover:18e6,retain_active_days:16,gift_fee_rate:1,rebate_rate:.5},{rank:7,name:"藍寶石",promotion_desc:`1. 儲值55,000
2. 流水55,000,000金幣`,retention_desc:`1. 儲值28,000
2. 流水28,500,000金幣
3. 每月活躍天數20天`,promo_deposit:55e3,promo_turnover:55e6,is_perpetual:!1,retain_deposit:28e3,retain_turnover:285e5,retain_active_days:20,gift_fee_rate:.8,rebate_rate:.6},{rank:8,name:"紅寶石",promotion_desc:`1. 儲值80,000
2. 流水80,000,000金幣`,retention_desc:`1. 儲值40,000
2. 流水40,000,000金幣
3. 每月活躍天數20天`,promo_deposit:8e4,promo_turnover:8e7,is_perpetual:!1,retain_deposit:4e4,retain_turnover:4e7,retain_active_days:20,gift_fee_rate:.6,rebate_rate:.7},{rank:9,name:"鑽石",promotion_desc:`1. 儲值100,000
2. 流水100,000,000金幣`,retention_desc:`1. 儲值50,000
2. 流水50,000,000金幣
3. 每月活躍天數24天`,promo_deposit:1e5,promo_turnover:1e8,is_perpetual:!1,retain_deposit:5e4,retain_turnover:5e7,retain_active_days:24,gift_fee_rate:.3,rebate_rate:.7},{rank:10,name:"黑耀",promotion_desc:`1. 儲值100,000
2. 流水200,000,000金幣`,retention_desc:`1. 儲值50,000
2. 流水100,000,000金幣
3. 每月活躍天數24天`,promo_deposit:1e5,promo_turnover:2e8,is_perpetual:!1,retain_deposit:5e4,retain_turnover:1e8,retain_active_days:24,gift_fee_rate:0,rebate_rate:.8}],o={getVIPLevels:async()=>({code:0,data:e,msg:"success"}),updateVIPLevel:async t=>{const r=e.findIndex(n=>n.rank===t.rank);return r!==-1&&(e[r]={...t}),{code:0,msg:"success"}}};export{o as v};
