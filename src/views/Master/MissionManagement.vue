<script setup lang="ts">
import { ref, computed, onMounted, h, reactive, watch } from 'vue'
import {
  NCard, NDataTable, NButton, NSelect, NTag, NIcon, NSpace,
  NDrawer, NDrawerContent, NForm, NFormItem, NInput, NSwitch,
  NDatePicker, NInputNumber, NGrid, NGridItem, NStatistic,
  NPopconfirm, NDivider, NAlert, NTabs, NTabPane,
  useMessage, DataTableColumns
} from 'naive-ui'
import { AddOutline, TrashOutline, SendOutline, CreateOutline } from '@vicons/ionicons5'
import { missionApi } from '@/api/mission'
import type {
  Mission, MissionStatus, ConditionType, RewardType,
  MissionReward, CheckinMilestone, CheckinConfig
} from '@/types/mission'
import {
  MISSION_STATUS_CONFIG, CONDITION_TYPE_CONFIG, REWARD_TYPE_CONFIG
} from '@/types/mission'

const message = useMessage()

// ── Cost helpers ──────────────────────────────────────────────
const SILVER_TO_NTD = 10000

const calcRewardCost = (rewards: MissionReward[]) => {
  let silver = 0; let hasPhysical = false
  rewards.forEach(r => { if (r.type === 'SILVER') silver += r.silver_amount ?? 0; else hasPhysical = true })
  return { ntd: silver / SILVER_TO_NTD, hasPhysical }
}
const formatNtd = (ntd: number) =>
  ntd === 0 ? '0 元' : ntd < 1 ? `${ntd.toFixed(2)} 元` : `${ntd.toFixed(0)} 元`
const formatCostLabel = (rewards: MissionReward[]) => {
  const { ntd, hasPhysical } = calcRewardCost(rewards)
  const base = ntd > 0 ? `≈ ${formatNtd(ntd)}` : ''
  return hasPhysical ? `${base}${base ? ' + ' : ''}實物` : (base || '—')
}

// ── Tab ───────────────────────────────────────────────────────
const activeTab = ref('daily')

// ── Data ──────────────────────────────────────────────────────
const dailyMissions = ref<Mission[]>([])
const eventMissions = ref<Mission[]>([])
const dailyLoading  = ref(false)
const eventLoading  = ref(false)

const loadAll = async () => {
  dailyLoading.value = eventLoading.value = true
  const [dr, er] = await Promise.all([
    missionApi.getMissions({ type: 'DAILY' }),
    missionApi.getMissions({ type: 'EVENT' })
  ])
  if (dr.code === 0) dailyMissions.value = dr.data ?? []
  if (er.code === 0) eventMissions.value = er.data ?? []
  dailyLoading.value = eventLoading.value = false
}

// ── KPI ───────────────────────────────────────────────────────
const kpiActive  = computed(() => [...dailyMissions.value, ...eventMissions.value].filter(m => m.status === 'ACTIVE').length)
const kpiPending = computed(() => [...dailyMissions.value, ...eventMissions.value].filter(m => m.status === 'PENDING').length)

// ── Event filter ──────────────────────────────────────────────
const eventFilterStatus = ref<MissionStatus | undefined>(undefined)
const eventFilterKw     = ref('')
const filteredEvent = computed(() => eventMissions.value.filter(r => {
  if (eventFilterStatus.value && r.status !== eventFilterStatus.value) return false
  if (eventFilterKw.value && !r.name.includes(eventFilterKw.value)) return false
  return true
}))
const statusOptions = [
  { label: '全部狀態', value: undefined },
  { label: '草稿',    value: 'DRAFT'     as MissionStatus },
  { label: '待審核',  value: 'PENDING'   as MissionStatus },
  { label: '已拒絕',  value: 'REJECTED'  as MissionStatus },
  { label: '上線中',  value: 'ACTIVE'    as MissionStatus },
  { label: '排程中',  value: 'SCHEDULED' as MissionStatus },
  { label: '已過期',  value: 'EXPIRED'   as MissionStatus }
]

// ── Checkin config ────────────────────────────────────────────
const checkinStatus       = ref<MissionStatus>('ACTIVE')
const checkinRejectReason = ref('')
const checkinSaving       = ref(false)
const checkinForm = reactive<{ cycle_days: number; daily_silver: number; milestones: CheckinMilestone[] }>({
  cycle_days: 30, daily_silver: 100, milestones: []
})

const loadCheckin = async () => {
  const res = await missionApi.getCheckinConfig()
  if (res.code === 0 && res.data) {
    checkinForm.cycle_days   = res.data.cycle_days
    checkinForm.daily_silver = res.data.daily_silver
    checkinForm.milestones   = res.data.milestones.map(m => ({ ...m, rewards: m.rewards.map(r => ({ ...r })) }))
    checkinStatus.value       = res.data.status
    checkinRejectReason.value = res.data.reject_reason ?? ''
  }
}

onMounted(() => { loadAll(); loadCheckin() })

// Calendar
const calendarDays = computed(() => {
  return Array.from({ length: checkinForm.cycle_days }, (_, i) => {
    const day = i + 1
    const ms  = checkinForm.milestones.find(m => m.day === day)
    let extraSilver = 0; let hasPhysical = false
    ms?.rewards.forEach(r => { if (r.type === 'SILVER') extraSilver += r.silver_amount ?? 0; else hasPhysical = true })
    return { day, isMilestone: !!ms, ms, extraSilver, hasPhysical, costNtd: (checkinForm.daily_silver + extraSilver) / SILVER_TO_NTD }
  })
})

const totalCheckinCost = computed(() => {
  let s = checkinForm.daily_silver * checkinForm.cycle_days
  checkinForm.milestones.forEach(m => m.rewards.forEach(r => { if (r.type === 'SILVER') s += r.silver_amount ?? 0 }))
  return s / SILVER_TO_NTD
})
const milestoneTotalCost = computed(() => totalCheckinCost.value - (checkinForm.daily_silver * checkinForm.cycle_days / SILVER_TO_NTD))

// Milestone helpers
const addMilestone = () => checkinForm.milestones.push({ id: `ml${Date.now()}`, day: 7, rewards: [{ id: `r${Date.now()}`, type: 'SILVER', silver_amount: 500 }] })
const removeMilestone = (idx: number) => checkinForm.milestones.splice(idx, 1)
const addMsReward = (ms: CheckinMilestone) => ms.rewards.push({ id: `r${Date.now()}`, type: 'SILVER', silver_amount: 100 })
const removeMsReward = (ms: CheckinMilestone, idx: number) => ms.rewards.splice(idx, 1)

const milestoneExtraCost = (ms: CheckinMilestone) => {
  let s = 0; let hp = false
  ms.rewards.forEach(r => { if (r.type === 'SILVER') s += r.silver_amount ?? 0; else hp = true })
  return `≈ ${formatNtd(s / SILVER_TO_NTD)}${hp ? ' + 實物' : ''}`
}

const saveCheckinDraft = async () => {
  checkinSaving.value = true
  const res = await missionApi.saveCheckinConfig({ ...checkinForm, status: 'DRAFT' })
  checkinSaving.value = false
  if (res.code === 0) { message.success('已儲存草稿'); await loadCheckin() }
}
const submitCheckin = async () => {
  checkinSaving.value = true
  await missionApi.saveCheckinConfig({ ...checkinForm, status: 'DRAFT' })
  const res = await missionApi.submitCheckinForReview('operator')
  checkinSaving.value = false
  if (res.code === 0) { message.success('已送出審核'); await loadCheckin() }
}

// ── Drawer (shared DAILY / EVENT) ────────────────────────────
const showDrawer         = ref(false)
const drawerType         = ref<'DAILY' | 'EVENT'>('DAILY')
const drawerMode         = ref<'create' | 'edit'>('create')
const saving             = ref(false)
const editId             = ref<string | undefined>(undefined)
const startTs            = ref<number | null>(null)
const endTs              = ref<number | null>(null)

type DForm = {
  name: string; description: string
  condition_type: ConditionType; condition_target: number; condition_desc: string
  rewards: MissionReward[]
  is_limited: boolean; scheduled_start?: string; scheduled_end?: string
}
const emptyDForm = (): DForm => ({
  name: '', description: '',
  condition_type: 'LOGIN', condition_target: 1, condition_desc: '',
  rewards: [{ id: `r${Date.now()}`, type: 'SILVER', silver_amount: 100 }],
  is_limited: false
})
const dform = reactive<DForm>(emptyDForm())

watch(startTs, v => { dform.scheduled_start = v ? new Date(v).toISOString() : undefined })
watch(endTs,   v => { dform.scheduled_end   = v ? new Date(v).toISOString() : undefined })

const openCreate = (type: 'DAILY' | 'EVENT') => {
  Object.assign(dform, emptyDForm()); startTs.value = null; endTs.value = null
  drawerType.value = type; editId.value = undefined; drawerMode.value = 'create'; showDrawer.value = true
}
const openEdit = (row: Mission) => {
  Object.assign(dform, {
    name: row.name, description: row.description ?? '',
    condition_type: row.condition_type ?? 'LOGIN',
    condition_target: row.condition_target ?? 1,
    condition_desc: row.condition_desc ?? '',
    rewards: (row.rewards ?? []).map(r => ({ ...r })),
    is_limited: row.is_limited,
    scheduled_start: row.scheduled_start,
    scheduled_end: row.scheduled_end
  })
  startTs.value = row.scheduled_start ? new Date(row.scheduled_start).getTime() : null
  endTs.value   = row.scheduled_end   ? new Date(row.scheduled_end).getTime()   : null
  drawerType.value = row.type as 'DAILY' | 'EVENT'; editId.value = row.id; drawerMode.value = 'edit'; showDrawer.value = true
}

// Condition
const conditionOptions = Object.entries(CONDITION_TYPE_CONFIG).map(([k, v]) => ({ label: v.label, value: k as ConditionType }))
const onConditionChange = () => {
  if (dform.condition_type !== 'CUSTOM') {
    const c = CONDITION_TYPE_CONFIG[dform.condition_type]
    dform.condition_desc = `${c.label} ${dform.condition_target} ${c.unit}`
  }
}

// Reward
const rewardTypeOptions = Object.entries(REWARD_TYPE_CONFIG).map(([k, v]) => ({ label: `${v.icon} ${v.label}`, value: k as RewardType }))
const addReward = () => dform.rewards.push({ id: `r${Date.now()}`, type: 'SILVER', silver_amount: 100 })
const removeReward = (idx: number) => dform.rewards.splice(idx, 1)
const drawerCost = computed(() => {
  const { ntd, hasPhysical } = calcRewardCost(dform.rewards)
  return `≈ ${formatNtd(ntd)}${hasPhysical ? ' + 實物獎勵' : ''}`
})

// Save
const saveDraft = async () => {
  if (!dform.name.trim()) { message.warning('請填寫任務名稱'); return }
  saving.value = true
  const res = await missionApi.saveMission({ id: editId.value, type: drawerType.value, ...dform, created_by: 'operator' })
  saving.value = false
  if (res.code === 0) { message.success('已儲存草稿'); showDrawer.value = false; loadAll() }
}
const saveAndSubmit = async () => {
  if (!dform.name.trim()) { message.warning('請填寫任務名稱'); return }
  saving.value = true
  const sr = await missionApi.saveMission({ id: editId.value, type: drawerType.value, ...dform, created_by: 'operator' })
  if (sr.code !== 0) { saving.value = false; return }
  const res = await missionApi.submitForReview(sr.data!.id, 'operator')
  saving.value = false
  if (res.code === 0) { message.success('已送出審核'); showDrawer.value = false; loadAll() }
}

// Actions
const submitItem    = async (r: Mission) => { const res = await missionApi.submitForReview(r.id, 'operator'); if (res.code === 0) { message.success('已送出審核'); loadAll() } }
const handleToggle  = async (r: Mission, a: boolean) => { const res = await missionApi.toggleStatus(r.id, a); if (res.code === 0) { message.success(a ? '已上線' : '已下架'); loadAll() } }
const handleDelete  = async (r: Mission) => { const res = await missionApi.deleteMission(r.id); if (res.code === 0) { message.success('已刪除'); loadAll() } }

// Helpers
const fmtDate  = (iso?: string) => iso ? new Date(iso).toLocaleDateString('zh-TW') : '—'
const fmtNum   = (n: number) => n.toLocaleString()
const canEdit  = (s: MissionStatus) => s === 'DRAFT' || s === 'REJECTED'

// ── Column factory ────────────────────────────────────────────
const makeActionBtns = (row: Mission) => {
  const btns: ReturnType<typeof h>[] = []
  if (canEdit(row.status)) {
    btns.push(h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => openEdit(row) }, { default: () => [h(NIcon, null, { default: () => h(CreateOutline) }), ' 編輯'] }))
    btns.push(h(NButton, { size: 'small', type: 'warning', quaternary: true, onClick: () => submitItem(row) }, { default: () => [h(NIcon, null, { default: () => h(SendOutline) }), ' 送審'] }))
  }
  if (row.status === 'ACTIVE')
    btns.push(h(NPopconfirm, { onPositiveClick: () => handleToggle(row, false) }, {
      trigger: () => h(NButton, { size: 'small', quaternary: true }, { default: () => '下架' }),
      default: () => '確認下架此任務？'
    }))
  if (row.status === 'APPROVED' || row.status === 'SCHEDULED')
    btns.push(h(NButton, { size: 'small', type: 'success', quaternary: true, onClick: () => handleToggle(row, true) }, { default: () => '上線' }))
  if (row.status === 'DRAFT')
    btns.push(h(NPopconfirm, { onPositiveClick: () => handleDelete(row) }, {
      trigger: () => h(NButton, { size: 'small', type: 'error', quaternary: true }, { default: () => h(NIcon, null, { default: () => h(TrashOutline) }) }),
      default: () => '確認刪除？'
    }))
  return btns.length ? h(NSpace, { size: 4 }, { default: () => btns }) : h('span', { class: 'text-xs text-gray-400' }, '—')
}

const baseColumns: DataTableColumns<Mission> = [
  {
    title: '任務名稱', key: 'name', minWidth: 150,
    render: (row) => h('div', [
      h('div', { class: 'font-semibold text-sm text-gray-800' }, row.name),
      row.description ? h('div', { class: 'text-xs text-gray-400 mt-0.5 truncate max-w-xs' }, row.description) : null
    ])
  },
  {
    title: '完成條件', key: 'condition', width: 160,
    render: (row) => h('div', { class: 'text-xs text-gray-600' }, row.condition_desc ?? '—')
  },
  {
    title: '獎勵', key: 'rewards', minWidth: 130,
    render: (row) => h('span', { class: 'text-xs text-gray-700' }, formatCostLabel(row.rewards ?? []))
  },
  {
    title: '成本/次', key: 'cost', width: 100,
    render: (row) => {
      const { ntd, hasPhysical } = calcRewardCost(row.rewards ?? [])
      return h('span', { class: 'text-xs font-medium text-blue-600' },
        ntd > 0 ? `≈ ${formatNtd(ntd)}${hasPhysical ? ' +' : ''}` : (hasPhysical ? '實物' : '—'))
    }
  },
  {
    title: '狀態', key: 'status', width: 85,
    render: (row) => h(NTag, { size: 'small', bordered: false, type: MISSION_STATUS_CONFIG[row.status].type },
      { default: () => MISSION_STATUS_CONFIG[row.status].label })
  }
]

const dailyColumns = computed<DataTableColumns<Mission>>(() => [
  ...baseColumns,
  { title: '操作', key: 'actions', width: 185, fixed: 'right' as const, render: makeActionBtns }
])

const eventColumns = computed<DataTableColumns<Mission>>(() => [
  ...baseColumns,
  {
    title: '活動期間', key: 'schedule', width: 135,
    render: (row) => !row.is_limited
      ? h('span', { class: 'text-xs text-gray-400' }, '長期')
      : h('div', { class: 'text-xs text-gray-500' }, [h('div', fmtDate(row.scheduled_start)), h('div', `~ ${fmtDate(row.scheduled_end)}`)])
  },
  {
    title: '領取數', key: 'claim_count', width: 75,
    render: (row) => h('span', { class: 'text-sm text-gray-600' }, fmtNum(row.claim_count))
  },
  { title: '操作', key: 'actions', width: 185, fixed: 'right' as const, render: makeActionBtns }
])
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-start justify-between mb-5">
      <div>
        <h2 class="text-xl font-bold text-gray-800">任務管理</h2>
        <p class="text-sm text-gray-400 mt-1">管理每日任務、每日簽到與活動任務 &nbsp;·&nbsp; 成本換算：10,000 銀幣 = 1 元</p>
      </div>
      <div class="flex gap-6 text-center">
        <div><div class="text-2xl font-bold text-green-600">{{ kpiActive }}</div><div class="text-xs text-gray-400 mt-0.5">上線中</div></div>
        <div><div class="text-2xl font-bold text-yellow-500">{{ kpiPending }}</div><div class="text-xs text-gray-400 mt-0.5">待審核</div></div>
      </div>
    </div>

    <NTabs v-model:value="activeTab" type="line" animated>

      <!-- ── Tab 1: 每日任務與簽到 ── -->
      <NTabPane name="daily" tab="每日任務與簽到">

        <!-- Daily missions -->
        <NCard :bordered="false" class="rounded-2xl shadow-sm mb-5">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-700">每日任務</span>
              <NButton size="small" type="primary" @click="openCreate('DAILY')">
                <template #icon><NIcon :component="AddOutline" /></template>
                新增每日任務
              </NButton>
            </div>
          </template>
          <NDataTable :columns="dailyColumns" :data="dailyMissions" :loading="dailyLoading"
            :bordered="false" size="small" scroll-x="900" />
        </NCard>

        <!-- Checkin config -->
        <NCard :bordered="false" class="rounded-2xl shadow-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-700">每日簽到設定</span>
              <NTag :type="MISSION_STATUS_CONFIG[checkinStatus].type" size="small">
                {{ MISSION_STATUS_CONFIG[checkinStatus].label }}
              </NTag>
            </div>
          </template>

          <NAlert v-if="checkinStatus === 'REJECTED'" type="error" class="mb-4">
            審核未通過：{{ checkinRejectReason }}
          </NAlert>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <!-- Left: Form -->
            <div>
              <NForm label-placement="left" :label-width="90" size="medium">
                <NFormItem label="循環天數">
                  <NInputNumber v-model:value="checkinForm.cycle_days" :min="7" :max="365" style="width:110px" />
                  <span class="ml-2 text-xs text-gray-400">天</span>
                </NFormItem>
                <NFormItem label="每日銀幣">
                  <NInputNumber v-model:value="checkinForm.daily_silver" :min="1" style="width:110px" />
                  <span class="ml-2 text-xs text-blue-500">≈ {{ formatNtd(checkinForm.daily_silver / SILVER_TO_NTD) }}/天</span>
                </NFormItem>
              </NForm>

              <NDivider>里程碑設定</NDivider>

              <div class="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                <div v-for="(ms, mIdx) in checkinForm.milestones" :key="ms.id"
                  class="border border-gray-200 rounded-xl p-3 bg-gray-50/50">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-1.5 text-xs text-gray-500">
                      第
                      <NInputNumber v-model:value="ms.day" :min="1" :max="checkinForm.cycle_days" style="width:74px" />
                      天 — 額外獎勵
                    </div>
                    <NButton size="tiny" quaternary type="error" @click="removeMilestone(mIdx as number)">
                      <NIcon :component="TrashOutline" />
                    </NButton>
                  </div>
                  <div class="space-y-1.5">
                    <div v-for="(rw, rIdx) in ms.rewards" :key="rw.id" class="flex gap-1.5 items-center">
                      <NSelect v-model:value="rw.type" :options="rewardTypeOptions" style="width:115px; flex-shrink:0" size="small" />
                      <NInputNumber v-if="rw.type === 'SILVER'" v-model:value="rw.silver_amount" :min="1" style="flex:1" size="small" />
                      <template v-else>
                        <NInput v-model:value="rw.item_name" placeholder="名稱" style="flex:1" size="small" />
                        <NInput v-if="rw.type === 'GIFT_CARD'" v-model:value="rw.item_desc" placeholder="禮物卡描述" style="flex:1" size="small" />
                      </template>
                      <NButton size="tiny" quaternary type="error" @click="removeMsReward(ms, rIdx as number)" :disabled="ms.rewards.length <= 1">
                        <NIcon :component="TrashOutline" />
                      </NButton>
                    </div>
                    <NButton dashed size="small" class="w-full" @click="addMsReward(ms)">
                      <template #icon><NIcon :component="AddOutline" /></template>
                      新增獎勵
                    </NButton>
                  </div>
                  <div class="text-xs text-blue-500 text-right mt-1.5">里程碑成本：{{ milestoneExtraCost(ms) }}</div>
                </div>
                <NButton dashed class="w-full" @click="addMilestone">
                  <template #icon><NIcon :component="AddOutline" /></template>
                  新增里程碑
                </NButton>
              </div>

              <div class="flex justify-end gap-3 mt-4">
                <NButton :loading="checkinSaving" @click="saveCheckinDraft">儲存草稿</NButton>
                <NButton type="primary" :loading="checkinSaving" @click="submitCheckin">
                  <template #icon><NIcon :component="SendOutline" /></template>
                  送出審核
                </NButton>
              </div>
            </div>

            <!-- Right: Calendar preview -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-semibold text-gray-600">
                  📅 {{ checkinForm.cycle_days }} 天簽到預覽
                </span>
                <span class="text-xs text-blue-600 font-medium">
                  總成本 ≈ {{ formatNtd(totalCheckinCost) }} / 人
                </span>
              </div>

              <!-- Calendar grid -->
              <div class="grid grid-cols-7 gap-1">
                <div v-for="cell in calendarDays" :key="cell.day"
                  :class="['rounded-lg p-1.5 text-center border', cell.isMilestone ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200']">
                  <div :class="['text-xs font-bold leading-tight', cell.isMilestone ? 'text-amber-600' : 'text-gray-500']">
                    {{ cell.day }}
                  </div>
                  <div class="text-[10px] text-gray-400 leading-tight">{{ fmtNum(checkinForm.daily_silver) }}銀</div>
                  <template v-if="cell.isMilestone">
                    <div class="text-[10px] leading-tight">🎁</div>
                    <div v-if="cell.extraSilver" class="text-[10px] text-amber-500 leading-tight font-medium">
                      +{{ fmtNum(cell.extraSilver) }}
                    </div>
                    <div v-if="cell.hasPhysical" class="text-[10px] leading-tight">🎀</div>
                  </template>
                  <div class="text-[10px] text-blue-400 leading-tight mt-0.5">{{ formatNtd(cell.costNtd) }}</div>
                </div>
              </div>

              <!-- Cost summary -->
              <div class="mt-3 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 space-y-1">
                <div class="flex justify-between">
                  <span>每日基礎（{{ checkinForm.cycle_days }} 天）</span>
                  <span>{{ formatNtd(checkinForm.daily_silver * checkinForm.cycle_days / SILVER_TO_NTD) }} / 人</span>
                </div>
                <div class="flex justify-between">
                  <span>里程碑額外</span>
                  <span>{{ formatNtd(milestoneTotalCost) }} / 人</span>
                </div>
                <div class="flex justify-between font-semibold border-t border-blue-200 pt-1">
                  <span>{{ checkinForm.cycle_days }} 天總成本</span>
                  <span>{{ formatNtd(totalCheckinCost) }} / 人</span>
                </div>
              </div>
            </div>
          </div>
        </NCard>
      </NTabPane>

      <!-- ── Tab 2: 活動任務 ── -->
      <NTabPane name="event" tab="活動任務">
        <NCard :bordered="false" class="rounded-2xl shadow-sm mb-4">
          <div class="flex flex-wrap items-center gap-3">
            <NInput v-model:value="eventFilterKw" placeholder="搜尋任務名稱" clearable style="width:200px" />
            <NSelect v-model:value="eventFilterStatus" :options="statusOptions" placeholder="狀態" clearable style="width:130px" />
            <div class="ml-auto">
              <NButton type="primary" @click="openCreate('EVENT')">
                <template #icon><NIcon :component="AddOutline" /></template>
                新增活動任務
              </NButton>
            </div>
          </div>
        </NCard>
        <NCard :bordered="false" class="rounded-2xl shadow-sm">
          <NDataTable :columns="eventColumns" :data="filteredEvent" :loading="eventLoading"
            :bordered="false" striped size="small" scroll-x="1100" />
        </NCard>
      </NTabPane>
    </NTabs>

    <!-- Shared Drawer -->
    <NDrawer v-model:show="showDrawer" :width="520" placement="right">
      <NDrawerContent
        :title="drawerMode === 'create' ? (drawerType === 'DAILY' ? '新增每日任務' : '新增活動任務') : '編輯任務'"
        closable
      >
        <NForm label-placement="top" size="medium">
          <NFormItem label="任務名稱" required>
            <NInput v-model:value="dform.name" placeholder="任務名稱" />
          </NFormItem>
          <NFormItem label="任務說明">
            <NInput v-model:value="dform.description" type="textarea" :rows="2" placeholder="選填" />
          </NFormItem>

          <NDivider />

          <NFormItem label="完成條件">
            <div class="flex gap-2 w-full">
              <NSelect v-model:value="dform.condition_type" :options="conditionOptions" style="flex:1" @update:value="onConditionChange" />
              <NInputNumber v-if="dform.condition_type !== 'CUSTOM'" v-model:value="dform.condition_target" :min="1" style="width:100px" @update:value="onConditionChange" />
            </div>
          </NFormItem>
          <NFormItem v-if="dform.condition_type === 'CUSTOM'" label="條件說明">
            <NInput v-model:value="dform.condition_desc" placeholder="自行描述完成條件" />
          </NFormItem>

          <NFormItem label="完成獎勵">
            <div class="w-full space-y-2">
              <div v-for="(rw, idx) in dform.rewards" :key="rw.id" class="flex gap-2 items-start">
                <NSelect v-model:value="rw.type" :options="rewardTypeOptions" style="width:120px; flex-shrink:0" />
                <NInputNumber v-if="rw.type === 'SILVER'" v-model:value="rw.silver_amount" :min="1" style="flex:1" placeholder="銀幣數量" />
                <template v-else>
                  <NInput v-model:value="rw.item_name" placeholder="名稱" style="flex:1" />
                  <NInput v-if="rw.type === 'GIFT_CARD'" v-model:value="rw.item_desc" placeholder="禮物卡描述" style="flex:1" />
                </template>
                <NButton size="small" quaternary type="error" @click="removeReward(idx as number)" :disabled="dform.rewards.length <= 1">
                  <NIcon :component="TrashOutline" />
                </NButton>
              </div>
              <NButton dashed size="small" class="w-full" @click="addReward">
                <template #icon><NIcon :component="AddOutline" /></template>
                新增獎勵
              </NButton>
              <div class="text-xs text-blue-600 text-right">完成一次成本：{{ drawerCost }}</div>
            </div>
          </NFormItem>

          <template v-if="drawerType === 'EVENT'">
            <NDivider />
            <NFormItem label="時間限定">
              <NSwitch v-model:value="dform.is_limited" />
              <span class="ml-3 text-sm text-gray-500">{{ dform.is_limited ? '指定起訖時間' : '長期有效' }}</span>
            </NFormItem>
            <template v-if="dform.is_limited">
              <NGrid :cols="2" :x-gap="12">
                <NGridItem>
                  <NFormItem label="開始時間">
                    <NDatePicker v-model:value="startTs" type="datetime" clearable class="w-full" />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem label="結束時間">
                    <NDatePicker v-model:value="endTs" type="datetime" clearable class="w-full" />
                  </NFormItem>
                </NGridItem>
              </NGrid>
            </template>
          </template>
        </NForm>

        <template #footer>
          <div class="flex justify-end gap-3">
            <NButton quaternary @click="showDrawer = false">取消</NButton>
            <NButton :loading="saving" @click="saveDraft">儲存草稿</NButton>
            <NButton type="primary" :loading="saving" @click="saveAndSubmit">
              <template #icon><NIcon :component="SendOutline" /></template>
              送出審核
            </NButton>
          </div>
        </template>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
