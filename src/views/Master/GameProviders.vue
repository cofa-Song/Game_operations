<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { NCard, NDataTable, NTag, NButton, NModal, NForm, NFormItem, NSelect, NInputNumber, NInput, useMessage, DataTableColumns } from 'naive-ui'
import { RefreshOutline, CreateOutline } from '@vicons/ionicons5'
import { providerApi } from '@/api/provider'
import type { GameProvider, ProviderStatus, ProviderUpdateRequest } from '@/types/game'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const message = useMessage()
const authStore = useAuthStore()

const loading = ref(false)
const providers = ref<GameProvider[]>([])

// Edit Modal State
const showEditModal = ref(false)
const selectedProvider = ref<GameProvider | null>(null)
const editForm = ref<ProviderUpdateRequest>({
    status: undefined,
    sort_order: undefined,
    reason: ''
})

const statusOptions = [
    { label: t('common.enable'), value: 'ACTIVE' as ProviderStatus },
    { label: t('common.disable'), value: 'DISABLED' as ProviderStatus },
    { label: t('game.provider.maintenance'), value: 'MAINTENANCE' as ProviderStatus }
]

const columns: DataTableColumns<GameProvider> = [
    { title: t('game.provider.id'), key: 'id', width: 100 },
    { title: t('game.provider.code'), key: 'code', width: 80 },
    { title: t('game.provider.name'), key: 'name', width: 180 },
    {
        title: t('game.provider.type'),
        key: 'type',
        width: 100,
        render: (row) => {
            return t(`game.provider.types.${row.type}`) || row.type
        }
    },
    {
        title: t('game.provider.status'),
        key: 'status',
        width: 100,
        render: (row) => {
            const typeMap: Record<string, 'success' | 'warning' | 'error'> = {
                'ACTIVE': 'success',
                'MAINTENANCE': 'warning',
                'DISABLED': 'error'
            }
            const labelMap: Record<string, string> = {
                'ACTIVE': t('common.enable'),
                'MAINTENANCE': t('game.provider.maintenance'),
                'DISABLED': t('common.disable')
            }
            return h(NTag, { type: typeMap[row.status], bordered: false }, { default: () => labelMap[row.status] })
        }
    },
    {
        title: t('game.provider.sortOrder'),
        key: 'sort_order',
        width: 80,
        render: (row) => h('span', { class: 'font-mono' }, row.sort_order)
    },
    {
        title: t('game.provider.walletSupport'),
        key: 'wallet_support',
        width: 120,
        render: (row) => {
            return h(NTag, { size: 'small', type: row.wallet_support === 'DUAL' ? 'info' : 'default' }, { default: () => t(`game.provider.wallets.${row.wallet_support}`) })
        }
    },
    { title: t('game.provider.lastOperator'), key: 'last_operator', width: 120 },
    { title: t('game.provider.updatedAt'), key: 'updated_at', width: 160, render: (row) => row.updated_at.replace('T', ' ').replace('Z', '').slice(0, 19) },
    {
        title: t('common.action'),
        key: 'actions',
        width: 80,
        fixed: 'right',
        render: (row) => {
            return h(NButton, { size: 'small', secondary: true, onClick: () => handleEdit(row) }, { icon: () => h(CreateOutline) })
        }
    }
]

const fetchData = async () => {
    loading.value = true
    try {
        const res = await providerApi.getProviders()
        if (res.code === 0) {
            providers.value = res.data
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

const handleEdit = (provider: GameProvider) => {
    selectedProvider.value = provider
    editForm.value = {
        status: provider.status,
        sort_order: provider.sort_order,
        reason: ''
    }
    showEditModal.value = true
}

const handleSubmit = async () => {
    if (!selectedProvider.value) return
    
    if (!editForm.value.reason) {
        message.warning(t('game.provider.reasonPlaceholder'))
        return
    }

    try {
        const res = await providerApi.updateProvider(
            selectedProvider.value.id,
            editForm.value,
            authStore.user?.user_id || 'admin'
        )
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
        <NCard :title="t('game.provider.title')">
            <template #header-extra>
                <NButton secondary @click="fetchData" :loading="loading">
                    <template #icon><RefreshOutline /></template>
                    {{ t('common.search') }}
                </NButton>
            </template>

            <NDataTable
                :columns="columns"
                :data="providers"
                :loading="loading"
                :pagination="false"
                :bordered="false"
                :scroll-x="1200"
            />
        </NCard>

        <!-- Edit Modal -->
        <NModal v-model:show="showEditModal" preset="card" :title="t('game.provider.editStatus')" style="width: 500px">
            <div v-if="selectedProvider" class="mb-4 p-3 bg-gray-50 rounded">
                <div class="font-semibold">{{ selectedProvider.name }}</div>
                <div class="text-xs text-gray-500">{{ selectedProvider.code }} | {{ selectedProvider.id }}</div>
            </div>

            <NForm :model="editForm" label-placement="left" label-width="80">
                <NFormItem :label="t('common.status')" required>
                    <NSelect v-model:value="editForm.status" :options="statusOptions" />
                </NFormItem>
                <NFormItem :label="t('game.provider.sortOrder')" required>
                    <NInputNumber v-model:value="editForm.sort_order" :min="1" :max="100" style="width: 100%" />
                </NFormItem>
                <NFormItem :label="t('game.provider.reason')" required>
                    <NInput type="textarea" v-model:value="editForm.reason" :placeholder="t('game.provider.reasonPlaceholder')" :rows="3" />
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
