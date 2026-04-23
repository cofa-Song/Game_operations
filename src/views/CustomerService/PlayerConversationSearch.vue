<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  NCard, NInput, NButton, NTag, NEmpty, NAvatar, NScrollbar,
  NIcon, NAlert, NDivider, NDescriptions, NDescriptionsItem, NSpin
} from 'naive-ui'
import { SearchOutline, PersonOutline, ChatbubblesOutline, TimeOutline } from '@vicons/ionicons5'

// ── Types ─────────────────────────────────────────────────
type MsgType = 'PLAYER' | 'CS' | 'SYSTEM'

interface ConvThread {
  id: string
  started_at: string
  ended_at: string | null
  status: 'ACTIVE' | 'CLOSED'
  cs_agent: string
  message_count: number
  messages: { id: string; sender_type: MsgType; sender_name: string; content: string; timestamp: string }[]
}

interface PlayerProfile {
  player_id: string
  player_name: string
  avatar_color: string
  registered_at: string
  last_login: string
  status: string
}

// ── Mock data ─────────────────────────────────────────────
const mockPlayerDB: Record<string, { profile: PlayerProfile; threads: ConvThread[] }> = {
  'U-10045': {
    profile: { player_id: 'U-10045', player_name: '陳大文', avatar_color: '#6366f1', registered_at: '2025-06-15', last_login: '2026-04-23', status: '正常' },
    threads: [
      {
        id: 'T001', started_at: '2026-04-23T10:10:00Z', ended_at: null, status: 'ACTIVE', cs_agent: 'CS-01', message_count: 3,
        messages: [
          { id: 'm1', sender_type: 'PLAYER', sender_name: '陳大文', content: '你好，我剛才充值了990元但遊戲幣沒有增加', timestamp: '2026-04-23T10:10:00Z' },
          { id: 'm2', sender_type: 'PLAYER', sender_name: '陳大文', content: '訂單號是 ORD-20260423-00512', timestamp: '2026-04-23T10:12:00Z' },
          { id: 'm3', sender_type: 'PLAYER', sender_name: '陳大文', content: '你好，我的儲值沒有入帳', timestamp: '2026-04-23T10:15:00Z' }
        ]
      },
      {
        id: 'T002', started_at: '2026-03-10T14:00:00Z', ended_at: '2026-03-10T14:30:00Z', status: 'CLOSED', cs_agent: 'CS-02', message_count: 4,
        messages: [
          { id: 'm4', sender_type: 'PLAYER', sender_name: '陳大文',  content: '請問活動獎勵什麼時候發放？',                  timestamp: '2026-03-10T14:00:00Z' },
          { id: 'm5', sender_type: 'CS',     sender_name: '客服',    content: '您好，活動獎勵將於活動結束後 24 小時內發放。', timestamp: '2026-03-10T14:05:00Z' },
          { id: 'm6', sender_type: 'PLAYER', sender_name: '陳大文',  content: '好的，謝謝',                                  timestamp: '2026-03-10T14:08:00Z' },
          { id: 'm7', sender_type: 'SYSTEM', sender_name: 'SYSTEM',  content: '對話已結束',                                  timestamp: '2026-03-10T14:30:00Z' }
        ]
      }
    ]
  },
  'U-20891': {
    profile: { player_id: 'U-20891', player_name: '林小美', avatar_color: '#f59e0b', registered_at: '2025-08-20', last_login: '2026-04-22', status: '正常' },
    threads: [
      {
        id: 'T003', started_at: '2026-04-23T10:00:00Z', ended_at: null, status: 'ACTIVE', cs_agent: 'CS-01', message_count: 3,
        messages: [
          { id: 'm8',  sender_type: 'PLAYER', sender_name: '林小美', content: '請問我可以修改綁定的手機號碼嗎？',           timestamp: '2026-04-23T10:00:00Z' },
          { id: 'm9',  sender_type: 'CS',     sender_name: '客服',   content: '您好！可以的，請提供玩家 ID 和新手機號碼。', timestamp: '2026-04-23T10:03:00Z' },
          { id: 'm10', sender_type: 'PLAYER', sender_name: '林小美', content: '好的，我再確認一下',                        timestamp: '2026-04-23T10:08:00Z' }
        ]
      }
    ]
  },
  'U-55678': {
    profile: { player_id: 'U-55678', player_name: '黃建宏', avatar_color: '#ef4444', registered_at: '2026-01-05', last_login: '2026-04-21', status: '正常' },
    threads: [
      {
        id: 'T004', started_at: '2026-04-23T09:40:00Z', ended_at: null, status: 'ACTIVE', cs_agent: null as any, message_count: 2,
        messages: [
          { id: 'm11', sender_type: 'PLAYER', sender_name: '黃建宏', content: '帳號登不進去，密碼忘了',   timestamp: '2026-04-23T09:40:00Z' },
          { id: 'm12', sender_type: 'PLAYER', sender_name: '黃建宏', content: '我的 ID 是 U-55678', timestamp: '2026-04-23T09:42:00Z' }
        ]
      },
      {
        id: 'T005', started_at: '2026-02-14T16:00:00Z', ended_at: '2026-02-14T16:45:00Z', status: 'CLOSED', cs_agent: 'CS-01', message_count: 5,
        messages: [
          { id: 'm13', sender_type: 'PLAYER', sender_name: '黃建宏', content: '我的退款申請什麼時候處理？', timestamp: '2026-02-14T16:00:00Z' },
          { id: 'm14', sender_type: 'CS',     sender_name: '客服',   content: '您好，退款需要 3-5 個工作天。', timestamp: '2026-02-14T16:10:00Z' },
          { id: 'm15', sender_type: 'PLAYER', sender_name: '黃建宏', content: '好，我知道了', timestamp: '2026-02-14T16:12:00Z' },
          { id: 'm16', sender_type: 'SYSTEM', sender_name: 'SYSTEM', content: '對話已結束', timestamp: '2026-02-14T16:45:00Z' }
        ]
      }
    ]
  }
}

// ── State ─────────────────────────────────────────────────
const searchInput  = ref('')
const searching    = ref(false)
const notFound     = ref(false)
const playerData   = ref<{ profile: PlayerProfile; threads: ConvThread[] } | null>(null)
const activeThread = ref<ConvThread | null>(null)

const totalMessages = computed(() =>
  playerData.value?.threads.reduce((s, t) => s + t.message_count, 0) ?? 0
)

const handleSearch = () => {
  const q = searchInput.value.trim()
  if (!q) return
  searching.value  = true
  notFound.value   = false
  playerData.value = null
  activeThread.value = null
  setTimeout(() => {
    const result = mockPlayerDB[q.toUpperCase()] ?? Object.values(mockPlayerDB).find(d => d.profile.player_name === q)
    if (result) {
      playerData.value = result
      notFound.value = false
    } else {
      notFound.value = true
    }
    searching.value = false
  }, 500)
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">玩家對話查詢</h2>
      <p class="text-sm text-gray-400 mt-1">輸入玩家 ID 或名稱，查閱該玩家的所有客服對話紀錄</p>
    </div>

    <!-- Search bar -->
    <NCard :bordered="false" class="rounded-2xl shadow-sm mb-5">
      <div class="flex gap-3">
        <NInput
          v-model:value="searchInput"
          placeholder="輸入玩家 ID（如 U-10045）或玩家名稱"
          clearable
          size="large"
          style="max-width: 480px"
          @keydown.enter="handleSearch"
        >
          <template #prefix><NIcon :component="PersonOutline" /></template>
        </NInput>
        <NButton type="primary" size="large" :loading="searching" @click="handleSearch">
          <template #icon><NIcon :component="SearchOutline" /></template>
          查詢
        </NButton>
      </div>
      <p class="text-xs text-gray-400 mt-2">可輸入：U-10045、U-20891、U-55678 進行測試</p>
    </NCard>

    <NSpin :show="searching">
      <!-- Not found -->
      <NAlert v-if="notFound" type="warning" class="mb-5">
        找不到玩家「{{ searchInput }}」，請確認 ID 或名稱是否正確。
      </NAlert>

      <!-- Results -->
      <div v-if="playerData" class="flex gap-5">

        <!-- Left: player profile + thread list -->
        <div class="w-80 flex-shrink-0 space-y-4">
          <!-- Player card -->
          <NCard size="small" :bordered="false" class="rounded-xl shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <NAvatar round size="large" :style="{ backgroundColor: playerData.profile.avatar_color }">
                {{ playerData.profile.player_name[0] }}
              </NAvatar>
              <div>
                <p class="font-bold text-gray-800">{{ playerData.profile.player_name }}</p>
                <p class="text-xs text-gray-400">{{ playerData.profile.player_id }}</p>
              </div>
            </div>
            <NDescriptions :columns="1" size="small" label-style="color:#94a3b8;font-size:12px">
              <NDescriptionsItem label="狀態">
                <NTag type="success" size="tiny" :bordered="false">{{ playerData.profile.status }}</NTag>
              </NDescriptionsItem>
              <NDescriptionsItem label="註冊日期">{{ playerData.profile.registered_at }}</NDescriptionsItem>
              <NDescriptionsItem label="最後登入">{{ playerData.profile.last_login }}</NDescriptionsItem>
              <NDescriptionsItem label="對話總次數">{{ playerData.threads.length }} 次</NDescriptionsItem>
              <NDescriptionsItem label="訊息總則數">{{ totalMessages }} 則</NDescriptionsItem>
            </NDescriptions>
          </NCard>

          <!-- Thread list -->
          <NCard size="small" :bordered="false" class="rounded-xl shadow-sm">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">對話紀錄</p>
            <div class="space-y-2">
              <div
                v-for="thread in playerData.threads"
                :key="thread.id"
                @click="activeThread = thread"
                :class="[
                  'p-3 rounded-xl cursor-pointer transition-colors border',
                  activeThread?.id === thread.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-transparent hover:border-gray-200'
                ]"
              >
                <div class="flex items-center justify-between mb-1">
                  <NTag :type="thread.status === 'ACTIVE' ? 'success' : 'default'" size="tiny" :bordered="false">
                    {{ thread.status === 'ACTIVE' ? '進行中' : '已結束' }}
                  </NTag>
                  <span class="text-xs text-gray-400">{{ thread.message_count }} 則</span>
                </div>
                <p class="text-xs text-gray-600">{{ formatTime(thread.started_at) }}</p>
                <p class="text-xs text-gray-400 mt-0.5">負責：{{ thread.cs_agent ?? '未指派' }}</p>
              </div>
            </div>
          </NCard>
        </div>

        <!-- Right: message thread -->
        <NCard
          :bordered="false"
          class="flex-1 rounded-2xl shadow-sm"
          style="min-height: 500px"
        >
          <NEmpty v-if="!activeThread" description="請選擇左側對話紀錄" class="py-16" />

          <div v-else>
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="font-bold text-gray-800">對話 #{{ activeThread.id }}</p>
                <p class="text-xs text-gray-400 mt-0.5">
                  {{ formatTime(activeThread.started_at) }}
                  {{ activeThread.ended_at ? ` — ${formatTime(activeThread.ended_at)}` : '（進行中）' }}
                  　負責客服：{{ activeThread.cs_agent ?? '未指派' }}
                </p>
              </div>
              <NTag :type="activeThread.status === 'ACTIVE' ? 'success' : 'default'" :bordered="false">
                {{ activeThread.status === 'ACTIVE' ? '進行中' : '已結束' }}
              </NTag>
            </div>

            <NDivider class="!my-3" />

            <div class="space-y-4">
              <div
                v-for="msg in activeThread.messages"
                :key="msg.id"
                :class="['flex', msg.sender_type === 'CS' ? 'justify-end' : msg.sender_type === 'SYSTEM' ? 'justify-center' : 'justify-start']"
              >
                <span v-if="msg.sender_type === 'SYSTEM'" class="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {{ msg.content }}
                </span>
                <div v-else-if="msg.sender_type === 'PLAYER'" class="max-w-[70%]">
                  <div class="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                    <p class="text-sm text-gray-800">{{ msg.content }}</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-1 ml-1">{{ formatTime(msg.timestamp) }}</p>
                </div>
                <div v-else class="max-w-[70%] text-right">
                  <div class="bg-blue-500 rounded-2xl rounded-br-sm px-4 py-2 shadow-sm inline-block">
                    <p class="text-sm text-white">{{ msg.content }}</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-1 mr-1">{{ formatTime(msg.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </NCard>
      </div>
    </NSpin>
  </div>
</template>
