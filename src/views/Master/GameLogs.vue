<template>
  <div class="p-6">
    <NCard title="遊戲對局紀錄">
      <!-- Advanced Filters -->
      <NForm inline label-placement="left" class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NFormItem label="玩家 ID">
              <NInput v-model:value="searchForm.player_id" placeholder="ID / 帳號" clearable />
          </NFormItem>
          <NFormItem label="供應商">
              <NSelect 
                v-model:value="searchForm.provider" 
                :options="providerOptions" 
                placeholder="全部" 
                clearable 
                style="width: 140px"
              />
          </NFormItem>
          <NFormItem label="遊戲名稱">
               <NInput v-model:value="searchForm.game_name" placeholder="模糊搜尋" clearable />
          </NFormItem>
          <NFormItem label="局號">
               <NInput v-model:value="searchForm.round_id" placeholder="供應商局號" clearable />
          </NFormItem>
          <NFormItem class="col-span-2">
             <NButton type="primary" @click="handleSearch" :loading="loading">查詢</NButton>
          </NFormItem>
      </NForm>

      <NDataTable
        :columns="columns"
        :data="logs"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </NCard>

    <!-- Detail Modal -->
    <NModal
      v-model:show="showDetail"
      preset="card"
      title="對局詳情 (原始數據)"
      style="width: 600px"
    >
      <div v-if="selectedLog">
          <div class="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div><span class="text-gray-500">UID:</span> {{ selectedLog.id }}</div>
              <div><span class="text-gray-500">Provider:</span> {{ selectedLog.provider_id }}</div>
              <div><span class="text-gray-500">Round ID:</span> {{ selectedLog.provider_round_id }}</div>
              <div><span class="text-gray-500">Settle Time:</span> {{ selectedLog.settle_time.replace('T', ' ').split('.')[0] }}</div>
          </div>
          <NDivider />
          <pre class="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-h-[400px]">{{ formatJson(selectedLog.raw_json) }}</pre>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NCard, NForm, NFormItem, NInput, NSelect, NButton, NDataTable, NTag, NModal, NDivider, useMessage } from 'naive-ui'
import { gameApi } from '@/api/game'
import { GameLog, GameSearchParams } from '@/types/game'

const message = useMessage()
const loading = ref(false)
const logs = ref<GameLog[]>([])
const showDetail = ref(false)
const selectedLog = ref<GameLog | null>(null)

const searchForm = reactive({
    player_id: '',
    provider: null as string | null,
    game_name: '',
    round_id: ''
})

const pagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50]
})

const providerOptions = [
    { label: 'PG Soft', value: 'PG' },
    { label: 'JILI', value: 'JILI' },
    { label: 'Evolution', value: 'EVOLUTION' },
    { label: 'Pragmatic Play', value: 'PP' },
    { label: 'JDB', value: 'JDB' }
]

const formatJson = (jsonStr: string) => {
    try {
        return JSON.stringify(JSON.parse(jsonStr), null, 2)
    } catch (e) {
        return jsonStr
    }
}

const handleDetail = (row: GameLog) => {
    selectedLog.value = row
    showDetail.value = true
}

const columns = [
    { title: 'UID', key: 'id', width: 100, ellipsis: true },
    { 
        title: '時間', 
        key: 'settle_time', 
        width: 160,
        render: (row: GameLog) => row.settle_time.replace('T', ' ').slice(5, 16) // mm-dd HH:MM
    },
    { title: '玩家', key: 'player_id', width: 100 },
    { 
        title: '遊戲', 
        key: 'game_name',
        width: 200,
        render: (row: GameLog) => h('div', [
             h(NTag, { size: 'small', class: 'mr-1' }, { default: () => row.provider_id }),
             h('span', row.game_name)
        ])
    },
    { 
        title: '投注', 
        key: 'bet_amount', 
        align: 'right',
        render: (row: GameLog) => row.bet_amount 
    },
    { 
        title: '中獎', 
        key: 'win_amount', 
        align: 'right',
        render: (row: GameLog) => row.win_amount 
    },
    { 
        title: '輸贏', 
        key: 'net_amount', 
        align: 'right',
        render: (row: GameLog) => {
            const color = row.net_amount >= 0 ? 'text-green-600' : 'text-red-600'
            const prefix = row.net_amount > 0 ? '+' : ''
            return h('span', { class: ['font-bold', color] }, prefix + row.net_amount)
        }
    },
    { 
        title: '有效流水', 
        key: 'valid_turnover', 
        align: 'right',
        render: (row: GameLog) => {
           if (row.status === 'void') return h('span', { class: 'text-gray-400 line-through' }, row.valid_turnover)
           return row.valid_turnover
        }
    },
    { 
        title: '狀態', 
        key: 'status', 
        width: 80,
        render: (row: GameLog) => {
            if (row.status === 'void') return h(NTag, { type: 'error', size: 'small', bordered: false }, { default: () => '註銷' })
            return h(NTag, { type: 'success', size: 'small', bordered: false }, { default: () => '結算' })
        }
    },
    {
        title: '操作',
        key: 'action',
        width: 80,
        render: (row: GameLog) => h(NButton, { 
            size: 'tiny', 
            onClick: () => handleDetail(row)
        }, { default: () => '詳情' })
    }
]

const fetchData = async () => {
    loading.value = true
    try {
        const params: GameSearchParams = {
            page: pagination.page,
            page_size: pagination.pageSize,
            player_id: searchForm.player_id || undefined,
            provider: searchForm.provider || undefined,
            game_name: searchForm.game_name || undefined,
            round_id: searchForm.round_id || undefined
        }
        const res = await gameApi.getLogs(params)
        if (res.code === 0) {
            logs.value = res.data.list
            pagination.itemCount = res.data.total
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('載入失敗')
    } finally {
        loading.value = false
    }
}

const handleSearch = () => {
    pagination.page = 1
    fetchData()
}

const handlePageChange = (page: number) => {
    pagination.page = page
    fetchData()
}

onMounted(() => {
    fetchData()
})
</script>
