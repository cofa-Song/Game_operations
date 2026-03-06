<template>
  <div class="p-6">
    <NCard :title="t('gameLogs.title')">
      <!-- Advanced Filters -->
      <NForm inline label-placement="left" class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NFormItem :label="t('gameLogs.playerId')">
              <NInput v-model:value="searchForm.player_id" :placeholder="t('gameLogs.playerIdPlaceholder')" clearable />
          </NFormItem>
          <NFormItem :label="t('gameLogs.provider')">
              <NSelect 
                v-model:value="searchForm.provider" 
                :options="providerOptions" 
                :placeholder="t('gameLogs.providerAll')" 
                clearable 
                style="width: 140px"
              />
          </NFormItem>
          <NFormItem :label="t('gameLogs.gameName')">
               <NInput v-model:value="searchForm.game_name" :placeholder="t('gameLogs.gameNamePlaceholder')" clearable />
          </NFormItem>
          <NFormItem :label="t('gameLogs.roundId')">
               <NInput v-model:value="searchForm.round_id" :placeholder="t('gameLogs.roundIdPlaceholder')" clearable />
          </NFormItem>
          <NFormItem class="col-span-2">
             <NButton type="primary" @click="handleSearch" :loading="loading">{{ t('gameLogs.search') }}</NButton>
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
      :title="t('gameLogs.detailTitle')"
      style="width: 600px"
    >
      <div v-if="selectedLog">
          <div class="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div><span class="text-gray-500">{{ t('gameLogs.detail.uid') }}</span> {{ selectedLog.id }}</div>
              <div><span class="text-gray-500">{{ t('gameLogs.detail.provider') }}</span> {{ selectedLog.provider_id }}</div>
              <div><span class="text-gray-500">{{ t('gameLogs.detail.roundId') }}</span> {{ selectedLog.provider_round_id }}</div>
              <div><span class="text-gray-500">{{ t('gameLogs.detail.settleTime') }}</span> {{ selectedLog.settle_time.replace('T', ' ').split('.')[0] }}</div>
          </div>
          <NDivider />
          <pre class="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-h-[400px]">{{ formatJson(selectedLog.raw_json) }}</pre>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import { NCard, NForm, NFormItem, NInput, NSelect, NButton, NDataTable, NTag, NModal, NDivider, useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { gameApi } from '@/api/game'
import { GameLog, GameSearchParams } from '@/types/game'

const { t } = useI18n()
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

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
}

const handleDetail = (row: GameLog) => {
    selectedLog.value = row
    showDetail.value = true
}

const columns = computed(() => [
    { title: t('gameLogs.columns.uid'), key: 'id', width: 100, ellipsis: true },
    { 
        title: t('gameLogs.columns.time'), 
        key: 'settle_time', 
        width: 160,
        render: (row: GameLog) => row.settle_time.replace('T', ' ').slice(5, 16) // mm-dd HH:MM
    },
    { title: t('gameLogs.columns.player'), key: 'player_id', width: 100 },
    { 
        title: t('gameLogs.columns.game'), 
        key: 'game_name',
        width: 200,
        render: (row: GameLog) => h('div', [
             h(NTag, { size: 'small', class: 'mr-1' }, { default: () => row.provider_id }),
             h('span', row.game_name)
        ])
    },
    { 
        title: t('gameLogs.columns.bet'), 
        key: 'bet_amount', 
        align: 'right' as const,
        render: (row: GameLog) => formatNumber(row.bet_amount)
    },
    { 
        title: t('gameLogs.columns.win'), 
        key: 'win_amount', 
        align: 'right' as const,
        render: (row: GameLog) => formatNumber(row.win_amount) 
    },
    { 
        title: t('gameLogs.columns.net'), 
        key: 'net_amount', 
        align: 'right' as const,
        render: (row: GameLog) => {
            const color = row.net_amount >= 0 ? 'text-green-600' : 'text-red-600'
            const prefix = row.net_amount > 0 ? '+' : ''
            return h('span', { class: ['font-bold', color] }, prefix + formatNumber(row.net_amount))
        }
    },
    { 
        title: t('gameLogs.columns.validTurnover'), 
        key: 'valid_turnover', 
        align: 'right' as const,
        render: (row: GameLog) => {
           if (row.status === 'void') return h('span', { class: 'text-gray-400 line-through' }, formatNumber(row.valid_turnover))
           return formatNumber(row.valid_turnover)
        }
    },
    { 
        title: t('gameLogs.columns.status'), 
        key: 'status', 
        width: 80,
        render: (row: GameLog) => {
            if (row.status === 'void') return h(NTag, { type: 'error', size: 'small', bordered: false }, { default: () => t('gameLogs.statusText.void') })
            return h(NTag, { type: 'success', size: 'small', bordered: false }, { default: () => t('gameLogs.statusText.settle') })
        }
    },
    {
        title: t('gameLogs.columns.action'),
        key: 'action',
        width: 80,
        render: (row: GameLog) => h(NButton, { 
            size: 'tiny', 
            onClick: () => handleDetail(row)
        }, { default: () => t('gameLogs.actionText.detail') })
    }
])

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
        message.error(t('gameLogs.loadFailed'))
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
