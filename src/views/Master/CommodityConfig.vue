<template>
    <div class="commodity-config-container">
        <n-card title="商品配置管理 (Commodity Configuration)">
            <template #header-extra>
                <n-space>
                    <n-button @click="openBadgeModal">管理行銷角標</n-button>
                    <n-button type="primary" @click="openEditDrawer(null)">
                        <template #icon><n-icon><add-icon /></n-icon></template>
                        新增商品
                    </n-button>
                </n-space>
            </template>

            <n-data-table
                :columns="columns"
                :data="commodities"
                :loading="loading"
                :pagination="{ pageSize: 10 }"
            />
        </n-card>

        <!-- Marketing Badge Modal -->
        <n-modal v-model:show="showBadgeModal" preset="card" title="行銷角標管理" style="width: 700px">
            <n-space vertical>
                <n-card size="small" title="新增角標">
                    <n-form inline :model="badgeForm" ref="badgeFormRef">
                        <n-form-item label="名稱" path="name">
                            <n-input v-model:value="badgeForm.name" placeholder="輸入名稱 (如: HOT)" />
                        </n-form-item>
                        <n-form-item label="圖片 URL" path="imageUrl">
                            <n-input v-model:value="badgeForm.imageUrl" placeholder="輸入圖片 URL" />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" @click="handleCreateBadge" :loading="badgeSubmitting">新增</n-button>
                        </n-form-item>
                    </n-form>
                </n-card>

                <n-data-table
                    :columns="badgeColumns"
                    :data="badges"
                    :loading="badgeLoading"
                    size="small"
                />
            </n-space>
        </n-modal>

        <!-- Commodity Edit Drawer -->
        <n-drawer v-model:show="showDrawer" width="720" :mask-closable="false">
            <n-drawer-content :title="isEdit ? '編輯商品' : '新增商品'">
                <n-form ref="formRef" :model="formModel" :rules="rules" label-placement="left" label-width="120">
                    <n-tabs type="line" animated>
                        <!-- 1. Visual Settings -->
                        <n-tab-pane name="basic" tab="基礎視覺">
                           <n-form-item label="商品 ID" path="id">
                               <n-input v-model:value="formModel.id" :disabled="isEdit" placeholder="系統唯一碼 (如 SKU_001)" />
                           </n-form-item>
                            
                           <n-form-item label="顯示名稱" path="name">
                               <n-input v-model:value="formModel.name" placeholder="前台顯示名稱" />
                           </n-form-item>

                           <n-form-item label="主圖 URL" path="imageUrl">
                               <n-input v-model:value="formModel.imageUrl" placeholder="輸入圖片 URL" />
                               <div class="preview-box" v-if="formModel.imageUrl">
                                   <img :src="formModel.imageUrl" class="preview-img" />
                                   <img v-if="selectedBadgeUrl" :src="selectedBadgeUrl" class="badge-overlay" />
                               </div>
                           </n-form-item>

                           <n-form-item label="行銷角標" path="badgeId">
                               <n-select 
                                    v-model:value="formModel.badgeId" 
                                    :options="badgeOptions" 
                                    clearable 
                                    placeholder="選擇角標" 
                               />
                           </n-form-item>

                            <n-form-item label="商品類型" path="type">
                               <n-radio-group v-model:value="formModel.type">
                                   <n-radio-button value="REGULAR">一般儲值</n-radio-button>
                                   <n-radio-button value="MONTHLY">月卡</n-radio-button>
                                   <n-radio-button value="LIMITED">限時禮包</n-radio-button>
                                   <n-radio-button value="FIRST_DEPOSIT">首儲專屬</n-radio-button>
                               </n-radio-group>
                           </n-form-item>

                           <n-form-item label="排序權重" path="sortOrder">
                               <n-input-number v-model:value="formModel.sortOrder" />
                           </n-form-item>
                        </n-tab-pane>

                        <!-- 2. Content Configuration -->
                        <n-tab-pane name="content" tab="內容配置">
                            <n-form-item label="有償幣 (Cash)" path="paidCoins">
                                <n-input-number v-model:value="formModel.paidCoins" :min="0" />
                            </n-form-item>
                             <n-form-item label="無償幣 (Free)" path="freeCoins">
                                <n-input-number v-model:value="formModel.freeCoins" :min="0" />
                            </n-form-item>
                             <n-form-item label="贈送道具">
                                <n-dynamic-tags v-model:value="tempItems" />
                                <n-text depth="3" class="tip">暫以標籤輸入道具 ID，後續對接道具系統</n-text>
                            </n-form-item>
                        </n-tab-pane>

                        <!-- 3. Pricing -->
                        <n-tab-pane name="pricing" tab="平台定價">
                            <n-card size="small" title="Web 端" class="mb-2">
                                <n-space align="center">
                                    <n-switch v-model:value="formModel.web.isEnabled" />
                                    <n-input-number v-model:value="formModel.web.price" placeholder="TWD 價格" :disabled="!formModel.web.isEnabled">
                                        <template #prefix>$</template>
                                    </n-input-number>
                                </n-space>
                            </n-card>

                            <n-card size="small" title="iOS 端" class="mb-2">
                                <n-space vertical>
                                    <n-space align="center">
                                        <n-switch v-model:value="formModel.ios.isEnabled" />
                                        <n-input-number v-model:value="formModel.ios.price" placeholder="Tier 價格" :disabled="!formModel.ios.isEnabled" @blur="validateIosTier">
                                            <template #prefix>$</template>
                                        </n-input-number>
                                        <n-input v-model:value="formModel.ios.productId" placeholder="Apple Product ID" :disabled="!formModel.ios.isEnabled" />
                                    </n-space>
                                    <n-alert type="warning" v-if="iosTierWarning" title="價格提示" closable>
                                        iOS 價格建議設為 Apple Tier 標準 (如 33, 70, 100...)
                                    </n-alert>
                                </n-space>
                            </n-card>

                            <n-card size="small" title="Android 端" class="mb-2">
                                <n-space align="center">
                                    <n-switch v-model:value="formModel.android.isEnabled" />
                                    <n-input-number v-model:value="formModel.android.price" placeholder="價格" :disabled="!formModel.android.isEnabled">
                                        <template #prefix>$</template>
                                    </n-input-number>
                                    <n-input v-model:value="formModel.android.productId" placeholder="Google Product ID" :disabled="!formModel.android.isEnabled" />
                                </n-space>
                            </n-card>
                        </n-tab-pane>

                        <!-- 4. Rules -->
                        <n-tab-pane name="rules" tab="限制與排程">
                             <n-form-item label="限購規則" path="limitRule">
                               <n-radio-group v-model:value="formModel.limitRule">
                                   <n-space>
                                       <n-radio value="NONE">不限</n-radio>
                                       <n-radio value="LIFETIME_ONCE">終身一次</n-radio>
                                       <n-radio value="DAILY_ONCE">每日一次</n-radio>
                                       <n-radio value="WEEKLY_ONCE">每週一次</n-radio>
                                   </n-space>
                               </n-radio-group>
                           </n-form-item>

                           <n-form-item label="上架時間">
                               <n-date-picker 
                                    type="datetimerange" 
                                    v-model:value="dateRange" 
                                    clearable 
                               />
                           </n-form-item>

                           <n-form-item label="可見 VIP 等級">
                               <n-checkbox-group v-model:value="formModel.vipLevels">
                                   <n-space>
                                       <n-checkbox :value="0" label="VIP 0" />
                                       <n-checkbox :value="1" label="VIP 1" />
                                       <n-checkbox :value="2" label="VIP 2" />
                                       <n-checkbox :value="3" label="VIP 3" />
                                       <n-checkbox :value="4" label="VIP 4" />
                                       <n-checkbox :value="5" label="VIP 5" />
                                   </n-space>
                               </n-checkbox-group>
                           </n-form-item>
                        </n-tab-pane>
                    </n-tabs>
                </n-form>

                <template #footer>
                    <n-space justify="end">
                        <n-button @click="showDrawer = false">取消</n-button>
                        <n-button type="primary" @click="handleSubmit" :loading="submitting">儲存</n-button>
                    </n-space>
                </template>
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, h } from 'vue'
import { useMessage, useDialog, NTag, NButton, NSpace, NSwitch, FormInst, FormRules, NCard, NDataTable, NModal, NForm, NFormItem, NInput, NDrawer, NDrawerContent, NTabs, NTabPane, NRadioGroup, NRadioButton, NRadio, NInputNumber, NDatePicker, NCheckboxGroup, NCheckbox, NDynamicTags, NText, NAlert, NSelect, NIcon } from 'naive-ui'
import { Add as AddIcon } from '@vicons/ionicons5'
import { commodityApi, Commodity } from '@/api/commodity'
import { badgeApi, MarketingBadge } from '@/api/badge'

const message = useMessage()
const dialog = useDialog()

// --- State ---
const loading = ref(false)
const commodities = ref<Commodity[]>([])
const badges = ref<MarketingBadge[]>([])

// --- Badge Modal ---
const showBadgeModal = ref(false)
const badgeLoading = ref(false)
const badgeSubmitting = ref(false)
const badgeForm = reactive({ name: '', imageUrl: '' })

// --- Commodity Drawer ---
const showDrawer = ref(false)
const submitting = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInst | null>(null)
const dateRange = ref<[number, number] | null>(null)
const tempItems = ref<string[]>([]) // Mock for item IDs
const iosTierWarning = ref(false)

const formModel = reactive<Commodity>({
    id: '',
    name: '',
    imageUrl: '',
    badgeId: null,
    type: 'REGULAR',
    sortOrder: 0,
    paidCoins: 0,
    freeCoins: 0,
    items: [],
    rolloverMultiplier: 1,
    web: { isEnabled: true, price: 0 },
    ios: { isEnabled: false, price: 0, productId: '' },
    android: { isEnabled: false, price: 0, productId: '' },
    limitRule: 'NONE',
    vipLevels: [0, 1, 2, 3]
})

// --- columns ---
const columns = [
    {
        title: '圖片',
        key: 'imageUrl',
        width: 80,
        render(row: Commodity) {
            return h('img', { src: row.imageUrl, style: 'width: 40px; height: 40px; object-fit: cover; border-radius: 4px;' })
        }
    },
    { title: '商品 ID', key: 'id', width: 120 },
    { title: '名稱', key: 'name' },
    { 
        title: '類型', 
        key: 'type',
        render(row: Commodity) {
            const map: Record<string, string> = { 'REGULAR': '一般', 'MONTHLY': '月卡', 'LIMITED': '限時', 'FIRST_DEPOSIT': '首儲' }
            return h(NTag, { type: 'info', bordered: false }, { default: () => map[row.type] || row.type })
        }
    },
    {
        title: 'Web 價格',
        key: 'web.price',
        render: (row: Commodity) => row.web.isEnabled ? `$${row.web.price}` : '-'
    },
    {
        title: 'iOS / Android ID',
        key: 'platform',
        render(row: Commodity) {
            return [
                row.ios.isEnabled ? h('div', { class: 'text-xs' }, `iOS: ${row.ios.productId}`) : null,
                row.android.isEnabled ? h('div', { class: 'text-xs' }, `And: ${row.android.productId}`) : null
            ]
        }
    },
    {
        title: '操作',
        key: 'actions',
        width: 150,
        render(row: Commodity) {
            return h(NSpace, null, {
                default: () => [
                    h(NButton, { size: 'small', onClick: () => openEditDrawer(row) }, { default: () => '編輯' }),
                    h(NButton, { size: 'small', type: 'error', onClick: () => handleDeleteCommodity(row) }, { default: () => '刪除' })
                ]
            })
        }
    }
]

const badgeColumns = [
    { title: '名稱', key: 'name' },
    { 
        title: '預覽', 
        key: 'imageUrl',
        render(row: MarketingBadge) {
             return h('img', { src: row.imageUrl, style: 'width: 30px; height: 30px;' })
        }
    },
    {
        title: '操作',
        key: 'actions',
        render(row: MarketingBadge) {
             return h(NButton, { size: 'tiny', type: 'error', onClick: () => handleDeleteBadge(row) }, { default: () => '刪除' })
        }
    }
]

// --- Computed ---
const badgeOptions = computed(() => {
    return badges.value.map(b => ({ label: b.name, value: b.id }))
})

const selectedBadgeUrl = computed(() => {
    const b = badges.value.find(x => x.id === formModel.badgeId)
    return b ? b.imageUrl : null
})

// --- Rules ---
const rules: FormRules = {
    id: { required: true, message: '請輸入商品 ID', trigger: 'blur' },
    name: { required: true, message: '請輸入名稱', trigger: 'blur' },
    imageUrl: { required: true, message: '請輸入圖片 URL', trigger: 'blur' },
    paidCoins: { required: true, type: 'number' as any, message: '請輸入數量', trigger: 'blur' }
}

// --- Methods ---
const fetchData = async () => {
    loading.value = true
    try {
        const [cRes, bRes] = await Promise.all([
            commodityApi.list(),
            badgeApi.getBadges()
        ])
        if (cRes.code === 0) commodities.value = cRes.data || []
        if (bRes.code === 0) badges.value = bRes.data || []
    } catch (e) {
        message.error('數據載入失敗')
    } finally {
        loading.value = false
    }
}

// Badge Methods
const openBadgeModal = () => {
    showBadgeModal.value = true
}

const handleCreateBadge = async () => {
    if (!badgeForm.name || !badgeForm.imageUrl) {
        message.warning('請填寫完整')
        return
    }
    badgeSubmitting.value = true
    try {
        const res = await badgeApi.createBadge({ ...badgeForm, isActive: true })
        if (res.code === 0 && res.data) {
            badges.value.push(res.data)
            badgeForm.name = ''
            badgeForm.imageUrl = ''
            message.success('新增成功')
        }
    } finally {
        badgeSubmitting.value = false
    }
}

const handleDeleteBadge = async (row: MarketingBadge) => {
    // Check local if used locally (just UI check)
    // Real check in API
    try {
        const res = await badgeApi.deleteBadge(row.id)
        if (res.code === 0) {
            badges.value = badges.value.filter(b => b.id !== row.id)
            message.success('已刪除')
        } else {
            message.error(res.msg || '刪除失敗')
        }
    } catch(e) { message.error('API Error') }
}

// Commodity Methods
const openEditDrawer = (row: Commodity | null) => {
    isEdit.value = !!row
    iosTierWarning.value = false
    if (row) {
        Object.assign(formModel, JSON.parse(JSON.stringify(row)))
        tempItems.value = row.items?.map(i => i.id) || []
        // Convert date strings to timestamps for DatePicker
        if (row.startTime && row.endTime) {
            dateRange.value = [new Date(row.startTime).getTime(), new Date(row.endTime).getTime()]
        } else {
            dateRange.value = null
        }
    } else {
        // Reset
        formModel.id = ''
        formModel.name = ''
        formModel.imageUrl = ''
        formModel.badgeId = null
        formModel.type = 'REGULAR'
        formModel.sortOrder = 0
        formModel.paidCoins = 0
        formModel.freeCoins = 0
        formModel.items = []
        formModel.web = { isEnabled: true, price: 0 }
        formModel.ios = { isEnabled: false, price: 0, productId: '' }
        formModel.android = { isEnabled: false, price: 0, productId: '' }
        formModel.limitRule = 'NONE' // Default
        formModel.vipLevels = [0, 1, 2, 3]
        tempItems.value = []
        dateRange.value = null
    }
    showDrawer.value = true
}

const validateIosTier = () => {
    const price = formModel.ios.price
    // Simple check: Apple tiers usually aren't random integers like 35
    const commonTiers = [33, 70, 100, 130, 170, 330] // Example TWD tiers
    if (formModel.ios.isEnabled && price > 0 && !commonTiers.includes(price)) {
        iosTierWarning.value = true
    } else {
        iosTierWarning.value = false
    }
}

const handleSubmit = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            // Processing Date
            if (dateRange.value) {
                formModel.startTime = new Date(dateRange.value[0]).toISOString()
                formModel.endTime = new Date(dateRange.value[1]).toISOString()
            } else {
                formModel.startTime = undefined
                formModel.endTime = undefined
            }
            // Processing Items (Mock)
            formModel.items = tempItems.value.map(tid => ({ id: tid, name: 'Item'+tid, count: 1 }))

            submitting.value = true
            try {
                let res
                if (isEdit.value) {
                    res = await commodityApi.update(formModel.id, formModel)
                } else {
                    res = await commodityApi.create(formModel)
                }

                if (res.code === 0) {
                    message.success('儲存成功')
                    showDrawer.value = false
                    fetchData()
                } else {
                    message.error(res.msg || '儲存失敗')
                }
            } catch(e) {
                message.error('系統錯誤')
            } finally {
                submitting.value = false
            }
        } else {
            message.error('請檢查必填欄位')
        }
    })
}

const handleDeleteCommodity = (row: Commodity) => {
    dialog.warning({
        title: '確認刪除',
        content: `確定要刪除商品 ${row.name} 嗎？`,
        positiveText: '確認',
        negativeText: '取消',
        onPositiveClick: async () => {
            try {
                const res = await commodityApi.delete(row.id)
                if (res.code === 0) {
                    message.success('已刪除')
                    fetchData()
                } else {
                    message.error(res.msg)
                }
            } catch(e) { message.error('錯誤') }
        }
    })
}

onMounted(() => {
    fetchData()
})

</script>

<style scoped>
.commodity-config-container {
    padding: 24px;
}
.preview-box {
    position: relative;
    width: 60px;
    height: 60px;
    margin-top: 8px;
    border: 1px solid #eee;
}
.preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.badge-overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
}
.tip {
    font-size: 12px;
}
.mb-2 {
    margin-bottom: 8px;
}
.text-xs {
    font-size: 10px;
    color: #888;
}
</style>
