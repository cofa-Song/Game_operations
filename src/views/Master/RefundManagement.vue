<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import {
  NCard, NDataTable, NButton, NSelect, NDatePicker, NInput, NSpace,
  NTag, NGrid, NGridItem, NStatistic, NIcon, NModal, NForm, NFormItem,
  NInputNumber, NDescriptions, NDescriptionsItem, useMessage, DataTableColumns
} from 'naive-ui'
import { SearchOutline, RefreshOutline, CheckmarkCircleOutline } from '@vicons/ionicons5'

const message = useMessage()

// ── Filter ────────────────────────────────────────────────
const filterForm = reactive({
  q: '',
  search_type: 'order_id' as 'order_id' | 'player_id',
  status: undefined as string | undefined,
  date: null as [number, number] | null
})

const searchTypeOptions = [
  { label: '訂單號', value: 'order_id' },
  { label: '玩家 ID', value: 'player_id' }
]

const statusOptions = [
  { label: '待處理', value: 'PENDING' },
  { label: '已退款', value: 'REFUNDED' },
  { label: '已拒絕', value: 'REJECTED' },
  { label: '爭議款項', value: 'CHARGEBACK' }
]

// ── Mock data ─────────────────────────────────────────────
type RefundStatus = 'PENDING' | 'REFUNDED' | 'REJECTED' | 'CHARGEBACK'
type RefundType   = 'PLAYER_REQUEST' | 'CHARGEBACK' | 'ERROR' | 'BONUS_ABUSE'

interface RefundRecord {
  id: string
  order_id: string
  player_id: string
  player_name: string
  amount: number
  currency: 'TWD' | 'USD'
  channel: string
  refund_type: RefundType
  status: RefundStatus
  reason: string
  created_at: string
  processed_at: string | null
  processed_by: string | null
}

const mockRefunds: RefundRecord[] = [
  { id: 'RF001', order_id: 'ORD-20260401-00123', player_id: 'U-10045', player_name: '陳大文', amount: 990,  currency: 'TWD', channel: '藍新信用卡', refund_type: 'PLAYER_REQUEST', status: 'PENDING',    reason: '玩家誤操作重複購買',      created_at: '2026-04-10T14:22:00Z', processed_at: null,                 processed_by: null },
  { id: 'RF002', order_id: 'ORD-20260402-00456', player_id: 'U-20891', player_name: '林小美', amount: 2200, currency: 'TWD', channel: 'Apple Pay',  refund_type: 'CHARGEBACK',     status: 'CHARGEBACK', reason: '玩家向銀行申訴，爭議款項', created_at: '2026-04-08T09:10:00Z', processed_at: null,                 processed_by: null },
  { id: 'RF003', order_id: 'ORD-20260330-00789', player_id: 'U-33412', player_name: '張志成', amount: 480,  currency: 'TWD', channel: 'Stripe Web', refund_type: 'ERROR',          status: 'REFUNDED',   reason: '系統錯誤未正確入帳',      created_at: '2026-03-30T16:05:00Z', processed_at: '2026-03-31T10:00:00Z', processed_by: 'admin' },
  { id: 'RF004', order_id: 'ORD-20260325-00201', player_id: 'U-10045', player_name: '陳大文', amount: 1680, currency: 'TWD', channel: '藍新信用卡', refund_type: 'BONUS_ABUSE',    status: 'REJECTED',   reason: '違反活動規則，退款申請拒絕',created_at: '2026-03-25T11:30:00Z', processed_at: '2026-03-26T09:00:00Z', processed_by: 'admin' },
  { id: 'RF005', order_id: 'ORD-20260320-00034', player_id: 'U-88231', player_name: '吳淑芬', amount: 330,  currency: 'TWD', channel: 'Google Pay', refund_type: 'PLAYER_REQUEST', status: 'REFUNDED',   reason: '購買後立即申請退款',      created_at: '2026-03-20T08:45:00Z', processed_at: '2026-03-20T15:00:00Z', processed_by: 'admin' },
  { id: 'RF006', order_id: 'ORD-20260415-00512', player_id: 'U-55678', player_name: '黃建宏', amount: 4500, currency: 'TWD', channel: 'Stripe Web', refund_type: 'CHARGEBACK',     status: 'CHARGEBACK', reason: '信用卡遭盜刷申訴',        created_at: '2026-04-15T10:00:00Z', processed_at: null,                 processed_by: null },
  { id: 'RF007', order_id: 'ORD-20260412-00322', player_id: 'U-29041', player_name: '鄭雅玲', amount: 990,  currency: 'TWD', channel: 'Apple Pay',  refund_type: 'PLAYER_REQUEST', status: 'PENDING',    reason: '家長發現未成年消費',      created_at: '2026-04-12T20:15:00Z', processed_at: null,                 processed_by: null }
]

// ── Data state ────────────────────────────────────────────
const loading = ref(false)
const rows    = ref<RefundRecord[]>([...mockRefunds])

// ── Summary ───────────────────────────────────────────────
const summary = computed(() => {
  const pending    = rows.value.filter(r => r.status === 'PENDING').length
  const chargeback = rows.value.filter(r => r.status === 'CHARGEBACK').length
  const refunded   = rows.value.filter(r => r.status === 'REFUNDED').reduce((s, r) => s + r.amount, 0)
  const total      = rows.value.reduce((s, r) => s + r.amount, 0)
  return { pending, chargeback, refunded, total }
})

// ── Process modal ─────────────────────────────────────────
const showProcess  = ref(false)
const activeRecord = ref<RefundRecord | null>(null)
const processForm  = reactive({ action: 'approve' as 'approve' | 'reject', note: '' })

const openProcess = (row: RefundRecord) => {
  activeRecord.value = row
  processForm.action = 'approve'
  processForm.note   = ''
  showProcess.value  = true
}

const handleProcess = () => {
  if (!activeRecord.value) return
  const idx = rows.value.findIndex(r => r.id === activeRecord.value!.id)
  if (idx !== -1) {
    rows.value[idx] = {
      ...rows.value[idx],
      status:       processForm.action === 'approve' ? 'REFUNDED' : 'REJECTED',
      processed_at: new Date().toISOString(),
      processed_by: 'admin'
    }
  }
  message.success(processForm.action === 'approve' ? '退款已核准' : '退款已拒絕')
  showProcess.value = false
}

const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    let result = [...mockRefunds]
    if (filterForm.q) {
      const q = filterForm.q.toLowerCase()
      result = result.filter(r =>
        filterForm.search_type === 'order_id'
          ? r.order_id.toLowerCase().includes(q)
          : r.player_id.toLowerCase().includes(q)
      )
    }
    if (filterForm.status) {
      result = result.filter(r => r.status === filterForm.status)
    }
    rows.value = result
    loading.value = false
  }, 400)
}

const handleReset = () => {
  filterForm.q      = ''
  filterForm.status = undefined
  filterForm.date   = null
  rows.value = [...mockRefunds]
}

// ── Table columns ─────────────────────────────────────────
const statusMap: Record<RefundStatus, { type: 'warning' | 'error' | 'success' | 'info' | 'default', label: string }> = {
  PENDING:    { type: 'warning', label: '待處理' },
  REFUNDED:   { type: 'success', label: '已退款' },
  REJECTED:   { type: 'error',   label: '已拒絕' },
  CHARGEBACK: { type: 'error',   label: '爭議款項' }
}

const refundTypeMap: Record<RefundType, string> = {
  PLAYER_REQUEST: '玩家申請',
  CHARGEBACK:     '銀行爭議',
  ERROR:          '系統錯誤',
  BONUS_ABUSE:    '活動違規'
}

const columns = computed<DataTableColumns<RefundRecord>>(() => [
  { title: '退款單號', key: 'id', width: 90 },
  {
    title: '訂單號', key: 'order_id', width: 200,
    render: (row) => h('span', { class: 'text-xs text-gray-500 font-mono' }, row.order_id)
  },
  {
    title: '玩家', key: 'player', width: 140,
    render: (row) => h('div', [
      h('div', { class: 'font-bold text-sm' }, row.player_name),
      h('div', { class: 'text-xs text-gray-400' }, row.player_id)
    ])
  },
  {
    title: '金額', key: 'amount', width: 100, align: 'right' as const,
    render: (row) => h('span', { class: 'font-bold text-orange-500' }, `$ ${row.amount.toLocaleString()}`)
  },
  { title: '通道', key: 'channel', width: 120 },
  {
    title: '類型', key: 'refund_type', width: 100,
    render: (row) => h(NTag, { size: 'small', bordered: false }, { default: () => refundTypeMap[row.refund_type] })
  },
  {
    title: '狀態', key: 'status', width: 100,
    render: (row) => {
      const s = statusMap[row.status]
      return h(NTag, { type: s.type, size: 'small', bordered: false }, { default: () => s.label })
    }
  },
  {
    title: '申請時間', key: 'created_at', width: 160,
    render: (row) => new Date(row.created_at).toLocaleString()
  },
  {
    title: '原因', key: 'reason', minWidth: 180,
    ellipsis: { tooltip: true }
  },
  {
    title: '操作', key: 'actions', width: 100, fixed: 'right' as const,
    render: (row) => {
      if (row.status !== 'PENDING' && row.status !== 'CHARGEBACK') {
        return h('span', { class: 'text-xs text-gray-400' }, '—')
      }
      return h(NButton, {
        size: 'small', type: 'primary', quaternary: true,
        onClick: () => openProcess(row)
      }, { default: () => '處理' })
    }
  }
])

onMounted(handleSearch)
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">退款管理</h2>
      <p class="text-sm text-gray-400 mt-1">管理玩家退款申請與信用卡爭議款項</p>
    </div>

    <!-- Summary cards -->
    <NGrid :cols="4" :x-gap="16" :y-gap="16" class="mb-6">
      <NGridItem>
        <NCard size="small" embedded class="border-l-4 border-yellow-400">
          <NStatistic label="待處理退款" :value="summary.pending" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard size="small" embedded class="border-l-4 border-red-400">
          <NStatistic label="爭議款項 (Chargeback)" :value="summary.chargeback" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard size="small" embedded>
          <NStatistic label="已退款金額" :value="`$ ${summary.refunded.toLocaleString()}`" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard size="small" embedded>
          <NStatistic label="申請總金額" :value="`$ ${summary.total.toLocaleString()}`" />
        </NCard>
      </NGridItem>
    </NGrid>

    <!-- Filter -->
    <NCard :bordered="false" class="rounded-2xl shadow-sm mb-5">
      <NSpace wrap align="center">
        <NSelect v-model:value="filterForm.search_type" :options="searchTypeOptions" style="width: 110px" />
        <NInput v-model:value="filterForm.q" placeholder="輸入關鍵字搜尋" clearable style="width: 240px" />
        <NSelect v-model:value="filterForm.status" :options="statusOptions" placeholder="退款狀態" clearable style="width: 140px" />
        <NDatePicker v-model:value="filterForm.date" type="daterange" clearable placeholder="申請日期範圍" style="width: 280px" />
        <NButton type="primary" @click="handleSearch">
          <template #icon><NIcon :component="SearchOutline" /></template>
          查詢
        </NButton>
        <NButton quaternary @click="handleReset">
          <template #icon><NIcon :component="RefreshOutline" /></template>
          重置
        </NButton>
      </NSpace>
    </NCard>

    <!-- Table -->
    <NCard :bordered="false" class="rounded-2xl shadow-sm">
      <NDataTable
        :columns="columns"
        :data="rows"
        :loading="loading"
        :bordered="false"
        striped
        size="small"
        scroll-x="1200"
      />
    </NCard>

    <!-- Process modal -->
    <NModal v-model:show="showProcess" preset="card" title="處理退款申請" style="width: 520px">
      <div v-if="activeRecord">
        <NDescriptions :columns="2" bordered size="small" label-placement="left" class="mb-4">
          <NDescriptionsItem label="退款單號">{{ activeRecord.id }}</NDescriptionsItem>
          <NDescriptionsItem label="玩家">{{ activeRecord.player_name }} ({{ activeRecord.player_id }})</NDescriptionsItem>
          <NDescriptionsItem label="金額">
            <span class="font-bold text-orange-500">$ {{ activeRecord.amount.toLocaleString() }}</span>
          </NDescriptionsItem>
          <NDescriptionsItem label="通道">{{ activeRecord.channel }}</NDescriptionsItem>
          <NDescriptionsItem label="原因" :span="2">{{ activeRecord.reason }}</NDescriptionsItem>
        </NDescriptions>

        <NForm label-placement="left" label-width="80">
          <NFormItem label="處理方式" required>
            <NSelect
              v-model:value="processForm.action"
              :options="[
                { label: '✅ 核准退款', value: 'approve' },
                { label: '❌ 拒絕退款', value: 'reject' }
              ]"
              style="width: 200px"
            />
          </NFormItem>
          <NFormItem label="備註">
            <NInput v-model:value="processForm.note" type="textarea" :rows="2" placeholder="選填，處理說明" />
          </NFormItem>
        </NForm>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton quaternary @click="showProcess = false">取消</NButton>
          <NButton
            :type="processForm.action === 'approve' ? 'primary' : 'error'"
            @click="handleProcess"
          >
            <template #icon><NIcon :component="CheckmarkCircleOutline" /></template>
            確認{{ processForm.action === 'approve' ? '核准' : '拒絕' }}
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
