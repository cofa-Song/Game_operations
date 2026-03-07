<template>
  <div class="p-6">
    <NCard title="資產與流水變動日誌">
      <NForm inline label-placement="left" class="mb-4">
        <NFormItem label="玩家 ID">
           <NInput v-model:value="searchForm.player_id" placeholder="ID / 帳號" clearable />
        </NFormItem>
        <NFormItem label="幣別">
           <NSelect 
             v-model:value="searchForm.currency" 
             :options="currencyOptions" 
             placeholder="全部" 
             clearable 
             style="width: 120px"
           />
        </NFormItem>
        <NFormItem label="變動類型">
           <NSelect 
             v-model:value="searchForm.change_type" 
             :options="typeOptions" 
             placeholder="全部" 
             clearable 
             style="width: 150px"
           />
        </NFormItem>
        <NFormItem>
           <NButton type="primary" @click="handleSearch">查詢</NButton>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NCard, NForm, NFormItem, NInput, NSelect, NButton, NDataTable, NTag, useMessage } from 'naive-ui'
import { logApi } from '@/api/log'
import { AssetLog, LogSearchParams } from '@/types/log'

const message = useMessage()
const loading = ref(false)
const logs = ref<AssetLog[]>([])

const searchForm = reactive({
    player_id: '',
    currency: null as string | null,
    change_type: null as string | null,
})

const pagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50]
})

const currencyOptions = [
    { label: '金幣 (Gold)', value: 'GOLD' },
    { label: '銀幣 (Silver)', value: 'SILVER' },
    { label: '銅幣 (Bronze)', value: 'BRONZE' }
]

const typeOptions = [
    { label: '投注 (BET)', value: 'BET' },
    { label: '派彩 (WIN)', value: 'WIN' },
    { label: '領取 (CLAIM)', value: 'CLAIM' },
    { label: '解鎖 (UNLOCK)', value: 'UNLOCK' },
    { label: '清零 (WIPE)', value: 'WIPE' },
    { label: '互換 (EXCHANGE)', value: 'EXCHANGE' },
    { label: 'P2P 轉出', value: 'P2P_OUT' },
    { label: 'P2P 轉入', value: 'P2P_IN' }
]

const columns = [
    { title: 'Log ID', key: 'log_id', width: 150, ellipsis: true },
    { 
        title: '時間', 
        key: 'timestamp', 
        width: 180,
        render: (row: AssetLog) => row.timestamp.replace('T', ' ').split('.')[0]
    },
    { 
        title: '玩家', 
        key: 'username',
        render: (row: AssetLog) => h('div', [
            h('div', { class: 'font-bold' }, row.username),
            h('div', { class: 'text-xs text-gray-500' }, row.player_id)
        ])
    },
    { 
        title: '幣別/錢包', 
        key: 'currency',
        render: (row: AssetLog) => h('div', [
             h(NTag, { size: 'small', type: row.currency === 'GOLD' ? 'warning' : row.currency === 'SILVER' ? 'info' : 'default', class: 'mr-1' }, { default: () => row.currency }),
             h('span', { class: 'text-xs' }, row.wallet_type)
        ])
    },
    { 
        title: '類型', 
        key: 'change_type',
        render: (row: AssetLog) => {
            let type = 'default'
            if (['WIN', 'CLAIM', 'UNLOCK', 'P2P_IN'].includes(row.change_type)) type = 'success'
            if (['BET', 'WIPE', 'P2P_OUT'].includes(row.change_type)) type = 'error'
            return h(NTag, { type: type as any, bordered: false }, { default: () => row.change_type })
        }
    },
    { 
        title: '變動金額', 
        key: 'amount', 
        align: 'right' as const,
        render: (row: AssetLog) => {
            const isPos = row.amount > 0
            return h('span', { class: isPos ? 'text-green-600 font-bold' : 'text-red-600 font-bold' }, (isPos ? '+' : '') + row.amount)
        }
    },
    { title: '變更後餘額', key: 'post_balance', align: 'right' as const },
    { 
        title: '有效流水', 
        key: 'valid_turnover', 
        align: 'right' as const,
        render: (row: AssetLog) => {
            if (row.valid_turnover > 0) {
                return h('span', { class: 'text-blue-600 font-bold' }, row.valid_turnover)
            }
            return '-'
        }
    },
    { title: '關聯單號', key: 'related_id', ellipsis: true }
]

const fetchData = async () => {
    loading.value = true
    try {
        const params: LogSearchParams = {
            page: pagination.page,
            page_size: pagination.pageSize,
            player_id: searchForm.player_id || undefined,
            currency: searchForm.currency || undefined,
            change_type: searchForm.change_type || undefined
        }
        const res = await logApi.getLogs(params)
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
