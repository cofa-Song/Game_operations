<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  NCard, NInput, NButton, NTag, NAvatar, NBadge, NEmpty,
  NScrollbar, NIcon, NDivider, NSpace, NSelect, NTooltip
} from 'naive-ui'
import {
  SearchOutline, SendOutline, PersonOutline, TimeOutline,
  ChatbubblesOutline, CheckmarkDoneOutline, EllipsisHorizontalOutline
} from '@vicons/ionicons5'

// ── Types ─────────────────────────────────────────────────
type ConvStatus = 'QUEUED' | 'ACTIVE' | 'CLOSED'

interface Conversation {
  id: string
  player_id: string
  player_name: string
  avatar_color: string
  status: ConvStatus
  last_message: string
  last_message_time: string
  unread: number
  assigned_to: string | null
}

interface Message {
  id: string
  conv_id: string
  sender_type: 'PLAYER' | 'CS' | 'SYSTEM'
  sender_name: string
  content: string
  timestamp: string
}

// ── Mock conversations ────────────────────────────────────
const mockConversations: Conversation[] = [
  { id: 'C001', player_id: 'U-10045', player_name: '陳大文', avatar_color: '#6366f1', status: 'QUEUED',  last_message: '你好，我的儲值沒有入帳',       last_message_time: '2026-04-23T10:15:00Z', unread: 3, assigned_to: null },
  { id: 'C002', player_id: 'U-20891', player_name: '林小美', avatar_color: '#f59e0b', status: 'ACTIVE',  last_message: '好的，我再確認一下訂單號碼',    last_message_time: '2026-04-23T10:08:00Z', unread: 0, assigned_to: 'CS-01' },
  { id: 'C003', player_id: 'U-33412', player_name: '張志成', avatar_color: '#10b981', status: 'ACTIVE',  last_message: '謝謝你的協助！',               last_message_time: '2026-04-23T09:55:00Z', unread: 1, assigned_to: 'CS-01' },
  { id: 'C004', player_id: 'U-55678', player_name: '黃建宏', avatar_color: '#ef4444', status: 'QUEUED',  last_message: '帳號登不進去，密碼忘了',       last_message_time: '2026-04-23T09:40:00Z', unread: 2, assigned_to: null },
  { id: 'C005', player_id: 'U-88231', player_name: '吳淑芬', avatar_color: '#8b5cf6', status: 'CLOSED',  last_message: '問題已解決，感謝',             last_message_time: '2026-04-23T08:30:00Z', unread: 0, assigned_to: 'CS-01' },
  { id: 'C006', player_id: 'U-29041', player_name: '鄭雅玲', avatar_color: '#0ea5e9', status: 'QUEUED',  last_message: '我要申請退款，之前買的點數想退', last_message_time: '2026-04-23T10:20:00Z', unread: 1, assigned_to: null }
]

const mockMessages: Record<string, Message[]> = {
  C001: [
    { id: 'm1', conv_id: 'C001', sender_type: 'PLAYER', sender_name: '陳大文',   content: '你好，我剛才充值了990元但遊戲幣沒有增加',  timestamp: '2026-04-23T10:10:00Z' },
    { id: 'm2', conv_id: 'C001', sender_type: 'PLAYER', sender_name: '陳大文',   content: '訂單號是 ORD-20260423-00512',           timestamp: '2026-04-23T10:12:00Z' },
    { id: 'm3', conv_id: 'C001', sender_type: 'PLAYER', sender_name: '陳大文',   content: '你好，我的儲值沒有入帳',                  timestamp: '2026-04-23T10:15:00Z' }
  ],
  C002: [
    { id: 'm4', conv_id: 'C002', sender_type: 'PLAYER', sender_name: '林小美',   content: '請問我可以修改綁定的手機號碼嗎？',         timestamp: '2026-04-23T10:00:00Z' },
    { id: 'm5', conv_id: 'C002', sender_type: 'CS',     sender_name: '客服',     content: '您好！可以的，請提供您的玩家 ID 和新手機號碼，我協助您處理。', timestamp: '2026-04-23T10:03:00Z' },
    { id: 'm6', conv_id: 'C002', sender_type: 'PLAYER', sender_name: '林小美',   content: '好的，我再確認一下訂單號碼',               timestamp: '2026-04-23T10:08:00Z' }
  ],
  C003: [
    { id: 'm7', conv_id: 'C003', sender_type: 'PLAYER', sender_name: '張志成',   content: '帳號被鎖了，我沒有違規操作啊',             timestamp: '2026-04-23T09:40:00Z' },
    { id: 'm8', conv_id: 'C003', sender_type: 'CS',     sender_name: '客服',     content: '您好，已幫您確認，帳號因為異地登入觸發安全鎖定，我現在幫您解鎖。', timestamp: '2026-04-23T09:50:00Z' },
    { id: 'm9', conv_id: 'C003', sender_type: 'CS',     sender_name: '客服',     content: '已解鎖完成，您可以試著重新登入。',          timestamp: '2026-04-23T09:53:00Z' },
    { id: 'm10',conv_id: 'C003', sender_type: 'PLAYER', sender_name: '張志成',   content: '謝謝你的協助！',                          timestamp: '2026-04-23T09:55:00Z' }
  ],
  C004: [
    { id: 'm11',conv_id: 'C004', sender_type: 'PLAYER', sender_name: '黃建宏',   content: '帳號登不進去，密碼忘了',                  timestamp: '2026-04-23T09:40:00Z' },
    { id: 'm12',conv_id: 'C004', sender_type: 'PLAYER', sender_name: '黃建宏',   content: '我的 ID 是 U-55678',                     timestamp: '2026-04-23T09:42:00Z' }
  ],
  C005: [
    { id: 'm13',conv_id: 'C005', sender_type: 'PLAYER', sender_name: '吳淑芬',   content: '我的遊戲幣不見了',                        timestamp: '2026-04-23T08:10:00Z' },
    { id: 'm14',conv_id: 'C005', sender_type: 'CS',     sender_name: '客服',     content: '您好，已查詢您的記錄，是因為活動到期自動扣除，感謝您的理解。', timestamp: '2026-04-23T08:20:00Z' },
    { id: 'm15',conv_id: 'C005', sender_type: 'PLAYER', sender_name: '吳淑芬',   content: '問題已解決，感謝',                        timestamp: '2026-04-23T08:30:00Z' },
    { id: 'm16',conv_id: 'C005', sender_type: 'SYSTEM', sender_name: 'SYSTEM',   content: '對話已結束',                             timestamp: '2026-04-23T08:30:00Z' }
  ],
  C006: [
    { id: 'm17',conv_id: 'C006', sender_type: 'PLAYER', sender_name: '鄭雅玲',   content: '我要申請退款，之前買的點數想退',            timestamp: '2026-04-23T10:20:00Z' }
  ]
}

// ── State ─────────────────────────────────────────────────
const filterStatus = ref<ConvStatus | 'ALL'>('ALL')
const searchQ      = ref('')
const activeConv   = ref<Conversation | null>(null)
const messages     = ref<Message[]>([])
const inputMsg     = ref('')

const statusOptions = [
  { label: '全部', value: 'ALL' },
  { label: '排隊中', value: 'QUEUED' },
  { label: '處理中', value: 'ACTIVE' },
  { label: '已結束', value: 'CLOSED' }
]

const filteredConvs = computed(() => {
  let list = [...mockConversations]
  if (filterStatus.value !== 'ALL') list = list.filter(c => c.status === filterStatus.value)
  if (searchQ.value) {
    const q = searchQ.value.toLowerCase()
    list = list.filter(c => c.player_name.includes(q) || c.player_id.toLowerCase().includes(q))
  }
  return list.sort((a, b) => {
    const order: Record<ConvStatus, number> = { QUEUED: 0, ACTIVE: 1, CLOSED: 2 }
    return order[a.status] - order[b.status] || new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
  })
})

const statusTagType = (s: ConvStatus) =>
  ({ QUEUED: 'warning', ACTIVE: 'success', CLOSED: 'default' } as const)[s]
const statusLabel = (s: ConvStatus) =>
  ({ QUEUED: '排隊中', ACTIVE: '處理中', CLOSED: '已結束' })[s]

const selectConv = (conv: Conversation) => {
  activeConv.value = conv
  messages.value = mockMessages[conv.id] ?? []
  conv.unread = 0
}

const sendMessage = () => {
  const text = inputMsg.value.trim()
  if (!text || !activeConv.value) return
  messages.value.push({
    id: `m_${Date.now()}`,
    conv_id: activeConv.value.id,
    sender_type: 'CS',
    sender_name: '客服',
    content: text,
    timestamp: new Date().toISOString()
  })
  activeConv.value.last_message = text
  inputMsg.value = ''
}

const closeConv = () => {
  if (!activeConv.value) return
  activeConv.value.status = 'CLOSED'
  messages.value.push({
    id: `m_sys_${Date.now()}`,
    conv_id: activeConv.value.id,
    sender_type: 'SYSTEM',
    sender_name: 'SYSTEM',
    content: '對話已結束',
    timestamp: new Date().toISOString()
  })
}

const acceptConv = () => {
  if (!activeConv.value) return
  activeConv.value.status = 'ACTIVE'
  activeConv.value.assigned_to = 'CS-01'
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  return isToday
    ? d.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  selectConv(mockConversations[0])
})
</script>

<template>
  <div class="flex h-[calc(100vh-120px)] gap-0 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white mx-6 my-4">

    <!-- ── Left: Conversation List ───────────────────────── -->
    <div class="w-80 flex-shrink-0 border-r border-gray-100 flex flex-col">
      <div class="p-4 border-b border-gray-100">
        <p class="font-bold text-gray-800 mb-3">客服工作台</p>
        <NInput v-model:value="searchQ" placeholder="搜尋玩家名稱或 ID" clearable size="small">
          <template #prefix><NIcon :component="SearchOutline" /></template>
        </NInput>
        <NSelect v-model:value="filterStatus" :options="statusOptions" size="small" class="mt-2" />
      </div>

      <NScrollbar class="flex-1">
        <div
          v-for="conv in filteredConvs"
          :key="conv.id"
          @click="selectConv(conv)"
          :class="[
            'flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50',
            activeConv?.id === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'
          ]"
        >
          <NBadge :value="conv.unread" :show="conv.unread > 0">
            <NAvatar round size="medium" :style="{ backgroundColor: conv.avatar_color }">
              {{ conv.player_name[0] }}
            </NAvatar>
          </NBadge>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-0.5">
              <span class="font-semibold text-sm text-gray-800 truncate">{{ conv.player_name }}</span>
              <span class="text-xs text-gray-400 flex-shrink-0 ml-2">{{ formatTime(conv.last_message_time) }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <NTag :type="statusTagType(conv.status)" size="tiny" :bordered="false">{{ statusLabel(conv.status) }}</NTag>
              <span class="text-xs text-gray-400 truncate">{{ conv.last_message }}</span>
            </div>
          </div>
        </div>
        <NEmpty v-if="filteredConvs.length === 0" description="無符合條件的對話" class="py-8" />
      </NScrollbar>
    </div>

    <!-- ── Right: Chat Panel ──────────────────────────────── -->
    <div class="flex-1 flex flex-col min-w-0">
      <template v-if="activeConv">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
          <div class="flex items-center gap-3">
            <NAvatar round size="medium" :style="{ backgroundColor: activeConv.avatar_color }">
              {{ activeConv.player_name[0] }}
            </NAvatar>
            <div>
              <p class="font-bold text-gray-800">{{ activeConv.player_name }}</p>
              <p class="text-xs text-gray-400">{{ activeConv.player_id }}</p>
            </div>
            <NTag :type="statusTagType(activeConv.status)" size="small" :bordered="false">
              {{ statusLabel(activeConv.status) }}
            </NTag>
          </div>
          <NSpace>
            <NButton
              v-if="activeConv.status === 'QUEUED'"
              type="primary" size="small"
              @click="acceptConv"
            >接受對話</NButton>
            <NButton
              v-if="activeConv.status === 'ACTIVE'"
              size="small" type="error" quaternary
              @click="closeConv"
            >結束對話</NButton>
          </NSpace>
        </div>

        <!-- Messages -->
        <NScrollbar class="flex-1 px-5 py-4">
          <div class="space-y-4">
            <div
              v-for="msg in messages"
              :key="msg.id"
              :class="['flex', msg.sender_type === 'CS' ? 'justify-end' : msg.sender_type === 'SYSTEM' ? 'justify-center' : 'justify-start']"
            >
              <!-- System message -->
              <span v-if="msg.sender_type === 'SYSTEM'" class="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                {{ msg.content }}
              </span>

              <!-- Player message -->
              <div v-else-if="msg.sender_type === 'PLAYER'" class="flex items-end gap-2 max-w-[70%]">
                <NAvatar round size="small" :style="{ backgroundColor: activeConv.avatar_color }">
                  {{ activeConv.player_name[0] }}
                </NAvatar>
                <div>
                  <div class="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                    <p class="text-sm text-gray-800">{{ msg.content }}</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-1 ml-1">{{ formatTime(msg.timestamp) }}</p>
                </div>
              </div>

              <!-- CS message -->
              <div v-else class="flex items-end gap-2 max-w-[70%]">
                <div>
                  <div class="bg-blue-500 rounded-2xl rounded-br-sm px-4 py-2 shadow-sm">
                    <p class="text-sm text-white">{{ msg.content }}</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-1 text-right mr-1">{{ formatTime(msg.timestamp) }}</p>
                </div>
                <NAvatar round size="small" color="#3b82f6">
                  <NIcon :component="PersonOutline" />
                </NAvatar>
              </div>
            </div>
          </div>
        </NScrollbar>

        <!-- Input -->
        <div class="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div v-if="activeConv.status === 'QUEUED'" class="text-center py-2">
            <span class="text-sm text-gray-400">請先「接受對話」才能回覆</span>
          </div>
          <div v-else-if="activeConv.status === 'CLOSED'" class="text-center py-2">
            <span class="text-sm text-gray-400">此對話已結束</span>
          </div>
          <div v-else class="flex gap-2">
            <NInput
              v-model:value="inputMsg"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4 }"
              placeholder="輸入回覆訊息..."
              @keydown.ctrl.enter="sendMessage"
              class="flex-1"
            />
            <NTooltip>
              <template #trigger>
                <NButton type="primary" @click="sendMessage" :disabled="!inputMsg.trim()" style="height: auto; align-self: flex-end;">
                  <template #icon><NIcon :component="SendOutline" /></template>
                </NButton>
              </template>
              Ctrl + Enter 送出
            </NTooltip>
          </div>
        </div>
      </template>

      <div v-else class="flex-1 flex items-center justify-center text-gray-300">
        <div class="text-center">
          <NIcon :component="ChatbubblesOutline" size="64" />
          <p class="mt-3 text-sm">請選擇一個對話</p>
        </div>
      </div>
    </div>

  </div>
</template>
