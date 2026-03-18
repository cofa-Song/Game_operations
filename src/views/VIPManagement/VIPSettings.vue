<script setup lang="ts">
import { ref, onMounted, reactive, h } from 'vue'
import { 
    NCard, NDataTable, NButton, NModal, NForm, NFormItem, NInput, 
    NInputNumber, NUpload, NSwitch, NTag, NIcon, useMessage, 
    DataTableColumns, NGrid, NGridItem, NDivider, NUploadDragger, NText
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { 
    CreateOutline, CloudUploadOutline, StarOutline
} from '@vicons/ionicons5'
import { VIPLevel } from '@/types/vip'
import { vipApi } from '@/api/vip'

const { t } = useI18n()
const message = useMessage()

// List Data
const loading = ref(false)
const vipLevels = ref<VIPLevel[]>([])

const fetchVIPData = async () => {
    loading.value = true
    try {
        const res = await vipApi.getVIPLevels()
        if (res.code === 0) {
            vipLevels.value = res.data
        }
    } catch (e) {
        message.error(t('common.loadFailed'))
    } finally {
        loading.value = false
    }
}

// Table Columns
const columns: DataTableColumns<VIPLevel> = [
    { 
        title: t('vip.tableRank'), 
        key: 'rank', 
        width: 80, 
        align: 'center',
        render(row) {
            return h(NTag, { type: 'info', bordered: false, round: true }, { default: () => `VIP ${row.rank}` })
        }
    },
    { title: t('vip.tableName'), key: 'name', width: 120 },
    { 
        title: t('vip.tablePromo'), 
        key: 'promotion_desc', 
        minWidth: 200,
        render(row) {
            return h('div', { class: 'text-xs text-gray-500 whitespace-pre-wrap' }, row.promotion_desc)
        }
    },
    { 
        title: t('vip.tableRetain'), 
        key: 'retention_desc', 
        minWidth: 200,
        render(row) {
            return h('div', { class: 'text-xs text-gray-500 whitespace-pre-wrap' }, row.retention_desc)
        }
    },
    { 
        title: t('vip.tableFee'), 
        key: 'gift_fee_rate', 
        width: 100,
        render: (row) => row.gift_fee_rate > 0 ? `${row.gift_fee_rate}%` : '-'
    },
    { 
        title: t('vip.tableRebate'), 
        key: 'rebate_rate', 
        width: 100,
        render: (row) => `${row.rebate_rate}%`
    },
    {
        title: t('common.action'),
        key: 'actions',
        width: 100,
        fixed: 'right',
        render(row) {
            return h(NButton, {
                size: 'small',
                quaternary: true,
                type: 'primary',
                onClick: () => handleEdit(row)
            }, { 
                default: () => [h(NIcon, { class: 'mr-1' }, { default: () => h(CreateOutline) }), t('common.edit')]
            })
        }
    }
]

// Modal State
const showEditModal = ref(false)
const editingLevel = reactive<VIPLevel>({
    rank: 0,
    name: '',
    promotion_desc: '',
    retention_desc: '',
    promo_deposit: 0,
    promo_turnover: 0,
    is_perpetual: false,
    retain_deposit: 0,
    retain_turnover: 0,
    retain_active_days: 0,
    gift_fee_rate: 0,
    rebate_rate: 0
})

const handleEdit = (row: VIPLevel) => {
    Object.assign(editingLevel, JSON.parse(JSON.stringify(row)))
    showEditModal.value = true
}

const handleSave = async () => {
    try {
        const res = await vipApi.updateVIPLevel(editingLevel as VIPLevel)
        if (res.code === 0) {
            message.success(t('common.success'))
            showEditModal.value = false
            fetchVIPData()
        }
    } catch (e) {
        message.error(t('common.error'))
    }
}

onMounted(fetchVIPData)
</script>

<template>
    <div class="p-6">
        <!-- Header Section -->
        <NCard class="premium-glass mb-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <NIcon size="24" color="white"><StarOutline /></NIcon>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-800 dark:text-white">{{ t('vip.title') }}</h2>
                        <p class="text-xs text-slate-500">管理遊戲內會員各等級的晉升門檻、保級條件與特殊優惠權限。</p>
                    </div>
                </div>
            </div>
        </NCard>

        <!-- Main Content (Table) -->
        <NCard class="premium-glass overflow-hidden" :content-style="{ padding: 0 }">
            <NDataTable 
                :loading="loading"
                :columns="columns"
                :data="vipLevels"
                :bordered="false"
                class="premium-table"
                :pagination="false"
            />
        </NCard>

        <!-- Edit Modal -->
        <NModal v-model:show="showEditModal" preset="card" :title="t('vip.editTitle', { rank: editingLevel.rank })" style="width: 800px">
            <div class="max-h-[70vh] overflow-y-auto pr-2 px-1">
                <NForm label-placement="left" label-width="120" label-align="right">
                    
                    <NDivider title-placement="left">{{ t('vip.basicInfo') }}</NDivider>
                    <NGrid :cols="2" :x-gap="24">
                        <NGridItem>
                            <NFormItem :label="t('vip.levelName')" required>
                                <NInput v-model:value="editingLevel.name" :placeholder="t('vip.levelName')" />
                            </NFormItem>
                        </NGridItem>
                        <NGridItem>
                            <NFormItem :label="t('vip.levelRank')">
                                <NInputNumber v-model:value="editingLevel.rank" disabled style="width: 100%" />
                            </NFormItem>
                        </NGridItem>
                    </NGrid>

                    <NDivider title-placement="left">{{ t('vip.visuals') }}</NDivider>
                    <NGrid :cols="2" :x-gap="24">
                        <NGridItem>
                            <NFormItem :label="t('vip.icon')">
                                <NUpload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="1">
                                    <NUploadDragger>
                                        <div class="mb-2"><NIcon size="32" :depth="3"><CloudUploadOutline /></NIcon></div>
                                        <NText style="font-size: 13px">{{ t('vip.uploadHint') }}{{ t('vip.icon') }}</NText>
                                    </NUploadDragger>
                                </NUpload>
                            </NFormItem>
                        </NGridItem>
                        <NGridItem>
                            <NFormItem :label="t('vip.avatarFrame')">
                                <NUpload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="1">
                                    <NUploadDragger>
                                        <div class="mb-2"><NIcon size="32" :depth="3"><CloudUploadOutline /></NIcon></div>
                                        <NText style="font-size: 13px">{{ t('vip.uploadHint') }}{{ t('vip.avatarFrame') }}</NText>
                                    </NUploadDragger>
                                </NUpload>
                            </NFormItem>
                        </NGridItem>
                    </NGrid>

                    <NFormItem :label="t('vip.desc')">
                        <NInput v-model:value="editingLevel.promotion_desc" type="textarea" :placeholder="t('vip.desc')" />
                    </NFormItem>
                    <!-- V1: Hide numeric promotion criteria to keep them hardcoded -->
                    <!-- 
                    <NGrid :cols="3" :x-gap="12">
                        <NGridItem>
                            <NFormItem :label="t('vip.promoDeposit')">
                                <NInputNumber v-model:value="editingLevel.promo_deposit" :min="0" style="width: 100%" />
                            </NFormItem>
                        </NGridItem>
                        <NGridItem>
                            <NFormItem :label="t('vip.promoTurnover')">
                                <NInputNumber v-model:value="editingLevel.promo_turnover" :min="0" style="width: 100%" />
                            </NFormItem>
                        </NGridItem>
                        <NGridItem>
                            <NFormItem :label="t('vip.promoSpecial')">
                                <NInput v-model:value="editingLevel.promo_special" :placeholder="t('vip.promoSpecial')" />
                            </NFormItem>
                        </NGridItem>
                    </NGrid>
                    -->

                    <NDivider title-placement="left">{{ t('vip.retainCriteria') }}</NDivider>
                    <NFormItem :label="t('vip.isPerpetual')">
                        <NSwitch v-model:value="editingLevel.is_perpetual" />
                        <span class="ml-3 text-xs text-gray-400">{{ t('vip.perpetualDesc') }}</span>
                    </NFormItem>
                    
                    <template v-if="!editingLevel.is_perpetual">
                        <NFormItem :label="t('vip.desc')">
                            <NInput v-model:value="editingLevel.retention_desc" type="textarea" :placeholder="t('vip.desc')" />
                        </NFormItem>
                        <NGrid :cols="3" :x-gap="12">
                            <NGridItem>
                                <NFormItem :label="t('vip.retainDeposit')">
                                    <NInputNumber v-model:value="editingLevel.retain_deposit" :min="0" style="width: 100%" />
                                </NFormItem>
                            </NGridItem>
                            <NGridItem>
                                <NFormItem :label="t('vip.retainTurnover')">
                                    <NInputNumber v-model:value="editingLevel.retain_turnover" :min="0" style="width: 100%" />
                                </NFormItem>
                            </NGridItem>
                            <NGridItem>
                                <NFormItem :label="t('vip.retainActiveDays')">
                                    <NInputNumber v-model:value="editingLevel.retain_active_days" :min="0" style="width: 100%" />
                                </NFormItem>
                            </NGridItem>
                        </NGrid>
                    </template>

                    <!-- V1: Hide reward settings to keep them hardcoded -->
                    <!--
                    <NDivider title-placement="left">{{ t('vip.rewards') }}</NDivider>
                    <NGrid :cols="2" :x-gap="24">
                        <NGridItem>
                            <NFormItem :label="t('vip.feeRate')">
                                <NInputNumber v-model:value="editingLevel.gift_fee_rate" :min="0" :max="100" />
                            </NFormItem>
                        </NGridItem>
                        <NGridItem>
                            <NFormItem :label="t('vip.rebateRate')">
                                <NInputNumber v-model:value="editingLevel.rebate_rate" :min="0" :max="100" />
                            </NFormItem>
                        </NGridItem>
                    </NGrid>
                    -->
                    
                </NForm>
            </div>
            <template #footer>
                <div class="flex justify-end gap-3">
                    <NButton @click="showEditModal = false">{{ t('common.cancel') }}</NButton>
                    <NButton type="primary" @click="handleSave" rounded>{{ t('common.save') }}配置</NButton>
                </div>
            </template>
        </NModal>
    </div>
</template>

<style scoped>
.premium-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    border-radius: 16px;
}

:deep(.premium-table .n-data-table-th) {
    background-color: rgba(248, 250, 252, 0.8);
    font-weight: 800;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: #64748b;
}

:deep(.premium-table .n-data-table-td) {
    padding: 16px;
}

:deep(.n-divider .n-divider__title) {
    font-weight: 700;
    color: #f59e0b;
}

:deep(.n-modal.n-card) {
    border-radius: 20px !important;
}
</style>
