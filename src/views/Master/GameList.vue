<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NForm, NFormItem, NInput, NSelect, NButton, NDataTable, NTag, NSwitch, NModal, NCheckboxGroup, NCheckbox,NInputNumber, useMessage, DataTableColumns } from 'naive-ui'
import { SearchOutline, RefreshOutline, CreateOutline } from '@vicons/ionicons5'
import { gameListApi } from '@/api/game'
import { providerApi } from '@/api/provider'
import type { Game, GameListSearchParams, GameUpdateRequest, MarketingTag, GameStatus } from '@/types/game'
import type { GameProvider } from '@/types/game'

const { t } = useI18n()
const message = useMessage()
const loading = ref(false)
const games = ref<Game[]>([])
const providers = ref<GameProvider[]>([])

const searchForm = reactive<GameListSearchParams>({
    provider_id: undefined,
    type_id: undefined,
    game_id: '',
    name: '',
    status: undefined,
    page: 1,
    page_size: 20
})

const pagination = reactive({
    page: 1,
    pageSize: 20,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page: number) => {
        pagination.page = page
        searchForm.page = page
        fetchData()
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
        searchForm.page_size = pageSize
        searchForm.page = 1
        fetchData()
    }
})

// Edit Modal
const showEditModal = ref(false)
const selectedGame = ref<Game | null>(null)
const editForm = ref<GameUpdateRequest>({
    marketing_tag: undefined,
    allowed_currencies: [],
    min_vip_level: 0,
    sort_order: 999
})

const tagOptions = computed(() => [
    { label: t('game.list.tagOptions.none'), value: null },
    { label: t('game.list.tagOptions.hot'), value: 'HOT' as MarketingTag },
    { label: t('game.list.tagOptions.recommended'), value: 'RECOMMENDED' as MarketingTag },
    { label: t('game.list.tagOptions.double'), value: 'DOUBLE_TURNOVER' as MarketingTag }
])

const currencyOptions = [
    { label: '金幣', value: 'GOLD' },
    { label: '銀幣', value: 'SILVER' }
]

const providerOptions = computed(() => providers.value.map(p => ({ label: p.name, value: p.id })))
const statusFilterOptions = [
    { label: t('common.search'), value: undefined }, // Fallback for "All"
    { label: t('common.enable'), value: 'ACTIVE' as GameStatus },
    { label: t('common.disable'), value: 'DISABLED' as GameStatus }
]

const columns: DataTableColumns<Game> = [
    { title: 'ID', key: 'id', width: 80, fixed: 'left' },
    { title: t('game.provider.title'), key: 'provider_id', width: 100 },
    { title: t('game.list.gameName'), key: 'name', width: 150, ellipsis: { tooltip: true } },
    { 
        title: t('game.list.turnover'), 
        key: 'monthly_turnover', 
        width: 120,
        render: (row) => h('span', { class: 'font-mono text-blue-600 font-semibold' }, row.monthly_turnover.toLocaleString())
    },
    {
        title: t('game.list.tag'),
        key: 'marketing_tag',
        width: 140,
        render: (row) => {
            if (!row.marketing_tag) return '-'
            const tagMap: Record<string, { label: string; type: 'success' | 'warning' | 'error' }> = {
                'HOT': { label: t('game.list.tagOptions.hot').split(' ')[0], type: 'error' },
                'RECOMMENDED': { label: t('game.list.tagOptions.recommended').split(' ')[0], type: 'warning' },
                'DOUBLE_TURNOVER': { label: t('game.list.tagOptions.double').split(' ')[0], type: 'success' }
            }
            const tag = tagMap[row.marketing_tag]
            return h(NTag, { type: tag.type, size: 'small' }, { default: () => tag.label })
        }
    },
    {
        title: t('game.list.tagSource'),
        key: 'tag_source',
        width: 100,
        render: (row) => {
            const isManual = row.tag_source === 'MANUAL'
            return h(NTag, { size: 'small', type: isManual ? 'info' : 'default', bordered: false }, { default: () => isManual ? '手動' : '系統' })
        }
    },
    {
        title: t('game.list.finalRate'),
        key: 'final_rate',
        width: 100,
        render: (row) => h('span', { class: row.final_rate > 100 ? 'text-green-600 font-bold' : 'font-mono' }, `${row.final_rate}%`)
    },
    {
        title: t('game.list.currency'),
        key: 'allowed_currencies',
        width: 100,
        render: (row) => row.allowed_currencies.join(', ')
    },
    { title: t('game.list.vip'), key: 'min_vip_level', width: 60 },
    { title: t('game.provider.sortOrder'), key: 'sort_order', width: 70 },
    {
        title: t('common.status'),
        key: 'status',
        width: 80,
        render: (row) => h(NSwitch, {
            value: row.status === 'ACTIVE',
            onUpdateValue: (val: boolean) => handleQuickToggle(row, val ? 'ACTIVE' : 'DISABLED')
        })
    },
    {
        title: t('common.action'),
        key: 'actions',
        width: 80,
        fixed: 'right',
        render: (row) => h(NButton, { size: 'small', secondary: true, onClick: () => handleEdit(row) }, { icon: () => h(CreateOutline) })
    }
]

const fetchData = async () => {
    loading.value = true
    try {
        const res = await gameListApi.getGames(searchForm)
        if (res.code === 0) {
            games.value = res.data.list
            pagination.itemCount = res.data.total
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

const fetchProviders = async () => {
    const res = await providerApi.getProviders()
    if (res.code === 0) {
        providers.value = res.data
    }
}

const handleSearch = () => {
    searchForm.page = 1
    pagination.page = 1
    fetchData()
}

const handleEdit = (game: Game) => {
    selectedGame.value = game
    editForm.value = {
        marketing_tag: game.marketing_tag,
        allowed_currencies: game.allowed_currencies,
        min_vip_level: game.min_vip_level,
        sort_order: game.sort_order
    }
    showEditModal.value = true
}

const handleQuickToggle = async (game: Game, newStatus: GameStatus) => {
    try {
        const res = await gameListApi.updateGame(game.id, { status: newStatus })
        if (res.code === 0) {
            message.success(t('common.success'))
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    }
}

const handleSubmit = async () => {
    if (!selectedGame.value) return
    
    try {
        const res = await gameListApi.updateGame(selectedGame.value.id, editForm.value)
        if (res.code === 0) {
            message.success(t('common.success'))
            showEditModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    }
}

onMounted(() => {
    fetchProviders()
    fetchData()
})
</script>

<template>
    <div class="p-6">
        <NCard :title="t('game.list.title')">
            <NForm inline :model="searchForm" label-placement="left" class="mb-4">
                <NFormItem :label="t('game.provider.title')">
                    <NSelect v-model:value="searchForm.provider_id" :options="providerOptions" :placeholder="t('common.search')" clearable style="width: 160px" />
                </NFormItem>
                <NFormItem :label="t('game.list.gameId')">
                    <NInput v-model:value="searchForm.game_id" :placeholder="t('common.search')" clearable style="width: 140px" />
                </NFormItem>
                <NFormItem :label="t('game.list.gameName')">
                    <NInput v-model:value="searchForm.name" :placeholder="t('common.search')" clearable style="width: 140px" />
                </NFormItem>
                <NFormItem :label="t('common.status')">
                    <NSelect v-model:value="searchForm.status" :options="statusFilterOptions" :placeholder="t('common.search')" clearable style="width: 120px" />
                </NFormItem>
                <NFormItem>
                    <NButton type="primary" @click="handleSearch" :loading="loading">
                        <template #icon><SearchOutline /></template>
                        {{ t('common.search') }}
                    </NButton>
                    <NButton secondary @click="fetchData" :loading="loading" class="ml-2">
                        <template #icon><RefreshOutline /></template>
                    </NButton>
                </NFormItem>
            </NForm>

            <NDataTable
                :columns="columns"
                :data="games"
                :loading="loading"
                :pagination="pagination"
                :scroll-x="1400"
            />
        </NCard>

        <!-- Edit Modal -->
        <NModal v-model:show="showEditModal" preset="card" :title="t('game.list.editTitle')" style="width: 500px">
            <div v-if="selectedGame" class="mb-4 p-3 bg-gray-50 rounded">
                <div class="font-semibold">{{ selectedGame.name }} ({{ selectedGame.name_en }})</div>
                <div class="text-xs text-gray-500">{{ selectedGame.id }} | {{ selectedGame.provider_id }}</div>
            </div>

            <NForm :model="editForm" label-placement="left" label-width="100">
                <NFormItem :label="t('game.list.tag')">
                    <NSelect v-model:value="editForm.marketing_tag" :options="tagOptions" />
                </NFormItem>
                <NFormItem :label="t('game.list.currency')">
                    <NCheckboxGroup v-model:value="editForm.allowed_currencies">
                        <NCheckbox value="GOLD" :label="t('game.list.currency')" /> <!-- Simplified -->
                        <NCheckbox value="SILVER" :label="t('game.list.currency')" />
                    </NCheckboxGroup>
                </NFormItem>
                <NFormItem :label="t('game.list.vip')">
                    <NInputNumber v-model:value="editForm.min_vip_level" :min="0" :max="10" style="width: 100%" />
                </NFormItem>
                <NFormItem :label="t('game.provider.sortOrder')">
                    <NInputNumber v-model:value="editForm.sort_order" :min="1" :max="999" style="width: 100%" />
                </NFormItem>
            </NForm>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton @click="showEditModal = false">{{ t('common.cancel') }}</NButton>
                    <NButton type="primary" @click="handleSubmit">{{ t('common.save') }}</NButton>
                </div>
            </template>
        </NModal>
    </div>
</template>
