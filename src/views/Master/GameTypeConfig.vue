<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { NCard, NDataTable, NButton, NModal, NForm, NFormItem, NInputNumber, useMessage, DataTableColumns } from 'naive-ui'
import { RefreshOutline, CreateOutline } from '@vicons/ionicons5'
import { configApi } from '@/api/config'
import type { GameType, GameTypeUpdateRequest } from '@/types/game'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const message = useMessage()
const loading = ref(false)
const gameTypes = ref<GameType[]>([])

// Edit Modal
const showEditModal = ref(false)
const selectedType = ref<GameType | null>(null)
const editForm = ref<GameTypeUpdateRequest>({ rate: 100 })

const columns: DataTableColumns<GameType> = [
    { title: 'ID', key: 'id', width: 80 },
    { title: t('game.config.typeName'), key: 'name', width: 150 },
    { title: t('game.config.typeCode'), key: 'code', width: 120 },
    {
        title: t('game.config.rate'),
        key: 'rate',
        width: 150,
        render: (row) => h('span', { class: 'font-mono font-semibold' }, `${row.rate}%`)
    },
    { title: t('game.provider.updatedAt'), key: 'updated_at', width: 180, render: (row) => row.updated_at.replace('T', ' ').replace('Z', '').slice(0, 19) },
    {
        title: t('common.action'),
        key: 'actions',
        width: 100,
        fixed: 'right',
        render: (row) => h(NButton, { size: 'small', secondary: true, onClick: () => handleEdit(row) }, { default: () => t('common.edit'), icon: () => h(CreateOutline) })
    }
]

const fetchData = async () => {
    loading.value = true
    try {
        const res = await configApi.getGameTypes()
        if (res.code === 0) {
            gameTypes.value = res.data
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

const handleEdit = (type: GameType) => {
    selectedType.value = type
    editForm.value = { rate: type.rate }
    showEditModal.value = true
}

const handleSubmit = async () => {
    if (!selectedType.value) return

    try {
        const res = await configApi.updateGameType(selectedType.value.id, editForm.value)
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
    fetchData()
})
</script>

<template>
    <div class="p-6">
        <NCard :title="t('game.config.typeTitle')">
            <template #header-extra>
                <NButton secondary @click="fetchData" :loading="loading">
                    <template #icon><RefreshOutline /></template>
                    {{ t('common.search') }}
                </NButton>
            </template>

            <div class="mb-4 p-4 bg-blue-50 rounded text-sm text-gray-700">
                <strong>{{ t('common.info') }}：</strong>{{ t('game.config.typeRateDesc') }}
            </div>

            <NDataTable
                :columns="columns"
                :data="gameTypes"
                :loading="loading"
                :pagination="false"
                :bordered="false"
            />
        </NCard>

        <!-- Edit Modal -->
        <NModal v-model:show="showEditModal" preset="card" :title="t('game.config.rate')" style="width: 450px">
            <div v-if="selectedType" class="mb-4 p-3 bg-gray-50 rounded">
                <div class="font-semibold">{{ selectedType.name }}</div>
                <div class="text-xs text-gray-500">{{ selectedType.code }} | {{ selectedType.id }}</div>
            </div>

            <NForm :model="editForm" label-placement="left" label-width="120">
                <NFormItem :label="t('game.config.rate')" required>
                    <NInputNumber v-model:value="editForm.rate" :min="0" :max="1000" :step="10" style="width: 100%" suffix="%" />
                </NFormItem>
                <div class="text-xs text-gray-500 mt-2">
                    {{ t('game.config.typeRateDesc').split('。')[1] }} <!-- Just a bit of reuse -->
                </div>
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
