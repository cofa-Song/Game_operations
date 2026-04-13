<template>
  <div class="mt-4 flex flex-col h-[600px]">
    <div class="flex flex-wrap gap-4 mb-4 items-center">
      <div class="w-full md:w-60">
        <n-input v-model:value="searchQuery" :placeholder="t('chatManagement.roomManagement.searchCsPlaceholder')" clearable>
          <template #prefix>
            <div class="i-heroicons-magnifying-glass-20-solid" />
          </template>
        </n-input>
      </div>
      <div class="w-full md:w-32">
        <n-select v-model:value="searchStatus" :options="statusOptions" placeholder="工單狀態" clearable />
      </div>
      <div class="w-full md:w-64">
        <n-date-picker v-model:value="searchDateRange" type="daterange" clearable placeholder="建單日期範圍" />
      </div>
      <n-button type="primary" @click="handleSearch">
        {{ t('chatManagement.roomManagement.search') }}
      </n-button>
    </div>

    <div class="flex flex-1 min-h-0 gap-4">
      <!-- 客服單列表 -->
      <div class="w-1/4 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <span class="font-bold text-xs text-gray-500 uppercase tracking-wider">待處理工單</span>
          <n-badge :value="mockTickets.filter(t => t.status === 'pending').length" type="error" />
        </div>
        <n-scrollbar class="flex-1">
          <n-list hoverable clickable :bordered="false" class="bg-transparent">
            <n-list-item
              v-for="ticket in mockTickets"
              :key="ticket.id"
              :class="{ 'bg-sky-50 dark:bg-sky-900/10': selectedTicketId === ticket.id }"
              @click="selectedTicketId = ticket.id"
              class="!px-3 !py-4"
            >
              <div class="flex flex-col gap-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-sm truncate pr-2">{{ ticket.user }}</span>
                  <n-tag :type="getStatusType(ticket.status)" size="tiny" round>{{ ticket.statusText }}</n-tag>
                </div>
                <div class="text-xs text-gray-500 truncate">{{ ticket.subject }}</div>
                <div class="text-[10px] text-gray-400 font-mono mt-1">{{ ticket.time }}</div>
              </div>
            </n-list-item>
          </n-list>
        </n-scrollbar>
      </div>
      
      <!-- 工單處理區 -->
      <div class="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        <div v-if="selectedTicket" class="flex-1 flex flex-col min-h-0">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-800 dark:text-slate-100">工單 #{{ selectedTicket.id }} - {{ selectedTicket.user }}</span>
                <n-tag size="small" :type="getStatusType(selectedTicket.status)">{{ selectedTicket.statusText }}</n-tag>
              </div>
              <span class="text-xs text-gray-500 mt-0.5">問題類型: {{ selectedTicket.subject }}</span>
            </div>
            <div class="flex gap-2">
              <n-button 
                v-if="selectedTicket.status !== 'closed'"
                size="small" 
                :type="selectedTicket.status === 'pending' ? 'info' : 'success'"
                @click="handleStatusAction"
              >
                {{ selectedTicket.status === 'pending' ? '接案' : '結案' }}
              </n-button>
              <n-button text size="small" type="warning" @click="showTransferModal = true">轉交專員</n-button>
              <n-button text size="small">詳細資料</n-button>
            </div>
          </div>

          <n-scrollbar ref="csScrollbarInst" class="flex-1 p-4">
            <div v-for="msg in mockCsHistory" :key="msg.id" class="flex flex-col mb-6" :class="msg.sender === 'agent' ? 'items-end' : 'items-start'">
              <div class="flex items-center gap-2 mb-1" :class="msg.sender === 'agent' ? 'flex-row-reverse' : 'flex-row'">
                <span class="text-xs font-bold text-gray-600 dark:text-gray-400">{{ msg.senderName }}</span>
                <span class="text-[9px] text-gray-400 font-mono">{{ msg.time }}</span>
              </div>
              <div class="max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm" 
                   :class="msg.sender === 'agent' ? 'bg-sky-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-200 rounded-tl-none border border-gray-100 dark:border-gray-600'">
                {{ msg.content }}
              </div>
            </div>
          </n-scrollbar>

          <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <n-input
              v-model:value="csInput"
              type="textarea"
              :rows="3"
              :placeholder="t('chatManagement.roomManagement.replyPlaceholder')"
              class="mb-2"
            />
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <n-button size="small" quaternary>上傳附件</n-button>
              </div>
              <n-button type="primary" @click="handleSend">
                {{ t('chatManagement.roomManagement.send') }}
              </n-button>
            </div>
          </div>
        </div>
        <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
          <div class="i-heroicons-wrench-screwdriver-20-solid text-4xl mb-2 opacity-20" />
          請選擇客服工單開始處理
        </div>
      </div>
    </div>

    <!-- 轉交專員彈窗 -->
    <n-modal
      v-model:show="showTransferModal"
      preset="card"
      title="轉交專員"
      class="w-[400px]"
      :segmented="{ content: 'soft', footer: 'soft' }"
    >
      <n-form :model="transferForm" label-placement="left" label-width="80">
        <n-form-item label="管理員 ID">
          <n-input v-model:value="transferForm.adminId" placeholder="請輸入欲轉交的管理員 ID" />
        </n-form-item>
        <n-form-item label="交接內容">
          <n-input
            v-model:value="transferForm.content"
            type="textarea"
            placeholder="請輸入交接說明或備註"
            :rows="4"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <n-button @click="showTransferModal = false">取消</n-button>
          <n-button type="primary" @click="handleTransfer">確認轉交</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { NInput, NButton, NList, NListItem, NScrollbar, NBadge, NTag, NSelect, NDatePicker, NModal, NForm, NFormItem, useDialog } from 'naive-ui'

const { t } = useI18n()
const dialog = useDialog()
const searchQuery = ref('')
const searchStatus = ref(null)
const searchDateRange = ref<[number, number] | null>(null)
const selectedTicketId = ref<number | null>(10024)
const csInput = ref('')
const csScrollbarInst = ref<any>(null)

// 轉交專員相關
const showTransferModal = ref(false)
const transferForm = ref({
  adminId: '',
  content: ''
})

const statusOptions = [
  { label: '全部狀態', value: 'all' },
  { label: '待處理', value: 'pending' },
  { label: '處理中', value: 'processing' },
  { label: '已結案', value: 'closed' }
]

interface Ticket {
  id: number
  user: string
  subject: string
  status: 'pending' | 'processing' | 'closed'
  statusText: string
  time: string
}

interface CsMsg {
  id: number
  sender: 'agent' | 'user'
  senderName: string
  content: string
  time: string
}

const mockTickets = ref<Ticket[]>([
  { id: 10024, user: 'User_9921', subject: '金流加值未到帳', status: 'pending', statusText: '待處理', time: '16:45' },
  { id: 10023, user: 'Ace_Gamer', subject: '遊戲異常閃退', status: 'processing', statusText: '處理中', time: '16:30' },
  { id: 10022, user: 'Lucky_Luke', subject: 'VIP等級晉升問題', status: 'closed', statusText: '已結案', time: '15:20' },
  { id: 10021, user: 'Star_Lord', subject: '密碼重設請求', status: 'closed', statusText: '已結案', time: '14:10' },
])

const mockCsHistory = ref<CsMsg[]>([
  { id: 1, sender: 'user', senderName: 'User_9921', content: '您好，我剛才使用超商代碼儲值了 3000 元，但帳戶已經過了 20 分鐘還沒入帳。', time: '16:45:05' },
  { id: 2, sender: 'agent', senderName: 'CS_Support_03', content: '您好，很抱歉讓您久等了。我現在立即幫您查詢該筆訂單的狀態。', time: '16:46:20' },
  { id: 3, sender: 'agent', senderName: 'CS_Support_03', content: '請問您方便提供一下超商繳費收據的照片或是繳費代碼嗎？', time: '16:46:45' },
  { id: 4, sender: 'user', senderName: 'User_9921', content: '我的繳費代碼是 NW20260407123456，收據我剛才丟在超商了...', time: '16:48:10' },
])

const selectedTicket = computed(() => mockTickets.value.find(t => t.id === selectedTicketId.value))

const getStatusType = (status: string) => {
  switch (status) {
    case 'pending': return 'error'
    case 'processing': return 'warning'
    case 'closed': return 'success'
    default: return 'default'
  }
}

const handleSearch = () => {
  console.log('Search Filters:', {
    query: searchQuery.value,
    status: searchStatus.value,
    dateRange: searchDateRange.value
  })
}

const handleTransfer = () => {
  console.log('Transfer ticket:', selectedTicket.value?.id, transferForm.value)
  showTransferModal.value = false
  // Reset form
  transferForm.value = { adminId: '', content: '' }
}

const handleStatusAction = () => {
  if (!selectedTicket.value) return
  
  const isPending = selectedTicket.value.status === 'pending'
  const actionText = isPending ? '接案' : '結案'
  
  dialog.warning({
    title: '二次確認',
    content: `確定要將此工單轉為「${isPending ? '處理中' : '已結案'}」嗎？`,
    positiveText: `確認${actionText}`,
    negativeText: '取消',
    onPositiveClick: () => {
      if (!selectedTicket.value) return
      if (selectedTicket.value.status === 'pending') {
        selectedTicket.value.status = 'processing'
        selectedTicket.value.statusText = '處理中'
      } else if (selectedTicket.value.status === 'processing') {
        selectedTicket.value.status = 'closed'
        selectedTicket.value.statusText = '已結案'
      }
    }
  })
}

const handleSend = () => {
  if (!csInput.value.trim()) return
  
  mockCsHistory.value.push({
    id: Date.now(),
    sender: 'agent',
    senderName: 'Admin',
    content: csInput.value,
    time: new Date().toTimeString().split(' ')[0]
  })
  
  csInput.value = ''
  setTimeout(() => {
    csScrollbarInst.value?.scrollTo({ position: 'bottom', silent: true })
  }, 100)
}

onMounted(() => {
  setTimeout(() => {
    csScrollbarInst.value?.scrollTo({ position: 'bottom', silent: true })
  }, 100)
})
</script>

<style scoped>
:deep(.n-list-item) {
  border-radius: 8px;
  margin: 4px 8px;
  cursor: pointer;
}
</style>
