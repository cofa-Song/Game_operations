<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { NCard, NDataTable, NButton, NTag, NSwitch, NModal, NForm, NFormItem, NInput, NInputNumber, NCheckbox, useMessage, useDialog, DataTableColumns, NSpace, NSelect } from 'naive-ui'
import { RefreshOutline, AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import { configApi } from '@/api/config'
import type { MarketingTagConfig, MarketingTagCreateRequest, MarketingTagUpdateRequest, TagConfigStatus } from '@/types/game'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()
const loading = ref(false)
const marketingTags = ref<MarketingTagConfig[]>([])

// Modal State
const showModal = ref(false)
const isEdit = ref(false)
const selectedTagId = ref<string | null>(null)
const formModel = ref<MarketingTagCreateRequest>({
    name: '',
    has_rate: true,
    rate: 100,
    status: 'ACTIVE',
    description: ''
})

const columns: DataTableColumns<MarketingTagConfig> = [
    { title: 'ID', key: 'id', width: 80 },
    { title: t('game.list.tag'), key: 'name', width: 120 },
    {
        title: t('game.provider.type'),
        key: 'tag_type',
        width: 100,
        render: (row) => h(NTag, { size: 'small', bordered: false, type: row.tag_type === 'SYSTEM' ? 'info' : 'success' }, { default: () => row.tag_type === 'SYSTEM' ? '系統' : '自定義' })
    },
    {
        title: t('game.config.rate'),
        key: 'rate',
        width: 120,
        render: (row) => row.has_rate ? h('span', { class: 'font-mono font-semibold' }, `${row.rate}%`) : h('span', { class: 'text-gray-400' }, '不調整')
    },
    {
        title: t('common.status'),
        key: 'status',
        width: 100,
        render: (row) => h(NTag, { size: 'small', type: row.status === 'ACTIVE' ? 'success' : 'error' }, { default: () => row.status === 'ACTIVE' ? t('common.enable') : t('common.disable') })
    },
    { title: t('permission.groupManagement.groupDesc'), key: 'description', width: 200, ellipsis: { tooltip: true } },
    { title: '使用中遊戲', key: 'games_using', width: 100 },
    {
        title: t('common.action'),
        key: 'actions',
        width: 140,
        fixed: 'right',
        render: (row) => h('div', { class: 'flex gap-1' }, [
            h(NButton, { size: 'small', secondary: true, onClick: () => handleEdit(row) }, { icon: () => h(CreateOutline), default: () => t('common.edit') }),
            row.tag_type === 'CUSTOM' ? h(NButton, { size: 'small', type: 'error', secondary: true, onClick: () => handleDelete(row) }, { icon: () => h(TrashOutline) }) : null
        ])
    }
]

const fetchData = async () => {
    loading.value = true
    try {
        const res = await configApi.getMarketingTags()
        if (res.code === 0) {
            marketingTags.value = res.data
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

const handleAdd = () => {
    isEdit.value = false
    selectedTagId.value = null
    formModel.value = {
        name: '',
        has_rate: true,
        rate: 100,
        status: 'ACTIVE',
        description: ''
    }
    showModal.value = true
}

const handleEdit = (tag: MarketingTagConfig) => {
    isEdit.value = true
    selectedTagId.value = tag.id
    formModel.value = {
        name: tag.name,
        has_rate: tag.has_rate,
        rate: tag.rate,
        status: tag.status,
        description: tag.description
    }
    showModal.value = true
}

const handleQuickToggle = async (tag: MarketingTagConfig, newStatus: TagConfigStatus) => {
    try {
        const res = await configApi.updateMarketingTag(tag.id, { status: newStatus })
        if (res.code === 0) {
            message.success('狀態已更新')
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error('更新失敗')
    }
}

const handleDelete = (tag: MarketingTagConfig) => {
    if (tag.games_using > 0) {
        message.error('該標籤尚有遊戲正在使用中，無法刪除')
        return
    }

    dialog.warning({
        title: t('common.delete'),
        content: `確定要刪除標籤「${tag.name}」嗎？`,
        positiveText: t('common.confirm'),
        negativeText: t('common.cancel'),
        onPositiveClick: async () => {
            try {
                const res = await configApi.deleteMarketingTag(tag.id)
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
    })
}

const handleSubmit = async () => {
    if (!formModel.value.name) {
        message.warning('請輸入標籤名稱')
        return
    }

    try {
        let res
        if (isEdit.value && selectedTagId.value) {
            res = await configApi.updateMarketingTag(selectedTagId.value, formModel.value)
        } else {
            res = await configApi.createMarketingTag(formModel.value)
        }

        if (res.code === 0) {
            message.success(t('common.success'))
            showModal.value = false
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
        <NCard :title="t('game.config.tagTitle')">
            <template #header-extra>
                <NSpace>
                    <NButton secondary @click="fetchData" :loading="loading">
                        <template #icon><RefreshOutline /></template>
                        {{ t('common.search') }}
                    </NButton>
                    <NButton type="primary" @click="handleAdd">
                        <template #icon><AddOutline /></template>
                        {{ t('common.add') }}
                    </NButton>
                </NSpace>
            </template>

            <NDataTable
                :columns="columns"
                :data="marketingTags"
                :loading="loading"
                :pagination="false"
                :bordered="false"
            />
        </NCard>

        <!-- Upsert Modal -->
        <NModal v-model:show="showModal" preset="card" :title="isEdit ? t('common.edit') : t('common.add')" style="width: 500px">
            <NForm :model="formModel" label-placement="left" label-width="100">
                <NFormItem :label="t('game.list.tag')" required>
                    <NInput v-model:value="formModel.name" :placeholder="t('game.list.tag')" />
                </NFormItem>
                
                <NFormItem :label="t('game.config.rate')">
                    <NSpace vertical class="w-full">
                        <NSwitch v-model:value="formModel.has_rate">
                            <template #checked>開啟比例設定</template>
                            <template #unchecked>不調整比例</template>
                        </NSwitch>
                        <NInputNumber 
                            v-if="formModel.has_rate" 
                            v-model:value="formModel.rate" 
                            :min="0" :max="1000" :step="5" 
                            style="width: 100%" 
                            suffix="%" 
                        />
                    </NSpace>
                </NFormItem>

                <NFormItem :label="t('common.status')" required>
                    <NSelect 
                        v-model:value="formModel.status" 
                        :options="[
                            { label: t('common.enable'), value: 'ACTIVE' },
                            { label: t('common.disable'), value: 'DISABLED' }
                        ]" 
                    />
                </NFormItem>

                <NFormItem :label="t('permission.groupManagement.groupDesc')">
                    <NInput type="textarea" v-model:value="formModel.description" :placeholder="t('permission.groupManagement.groupDesc')" :rows="3" />
                </NFormItem>
            </NForm>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton @click="showModal = false">{{ t('common.cancel') }}</NButton>
                    <NButton type="primary" @click="handleSubmit">{{ t('common.save') }}</NButton>
                </div>
            </template>
        </NModal>
    </div>
</template>
