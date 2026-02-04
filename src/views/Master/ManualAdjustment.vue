<template>
    <div class="manual-adjustment-container">
        <n-card title="人工存提管理 (Manual Adjustment)" size="large">
            <n-grid x-gap="24" :cols="1">
                <!-- 1. Player Search -->
                <n-gi>
                    <n-form-item label="玩家 ID (Player ID)" required>
                        <n-input-group>
                            <n-input v-model:value="searchId" placeholder="輸入玩家 ID" @keydown.enter="handleSearch" />
                            <n-button type="primary" @click="handleSearch" :loading="searching">
                                鎖定對象
                            </n-button>
                        </n-input-group>
                    </n-form-item>
                </n-gi>
            
                <!-- Player Info Display -->
                <n-gi v-if="player">
                    <n-alert type="info" title="當前鎖定玩家" class="mb-4">
                        <template #icon>
                            <n-icon>
                                <person-icon />
                            </n-icon>
                        </template>
                        <div class="player-info-grid">
                            <div class="info-item">
                                <span class="label">ID:</span>
                                <span class="value">{{ player.id }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">帳號:</span>
                                <span class="value">{{ player.username }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">暱稱:</span>
                                <span class="value">{{ player.display_name }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">標籤:</span>
                                <n-tag v-for="tag in player.tags" :key="tag" size="small" type="warning" class="mr-1">
                                    {{ tag }}
                                </n-tag>
                            </div>
                        </div>
                        <n-divider />
                        <div class="wallet-info">
                            <n-statistic label="Cash 餘額" :value="cashBalance">
                                <template #prefix>$</template>
                            </n-statistic>
                            <n-statistic label="Bonus 餘額" :value="bonusBalance" class="ml-8">
                                <template #prefix>$</template>
                            </n-statistic>
                        </div>
                    </n-alert>
                </n-gi>

                <!-- 2. Operation Form -->
                <n-gi v-if="player">
                    <n-form ref="formRef" :model="formModel" :rules="rules" label-placement="left" label-width="120" require-mark-placement="right-hanging">
                        
                        <n-form-item label="操作類型" path="type">
                            <n-radio-group v-model:value="formModel.type" name="type">
                                <n-space>
                                    <n-radio value="DEPOSIT">人工存款 (加點)</n-radio>
                                    <n-radio value="WITHDRAW">人工提款 (扣點)</n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>

                        <n-form-item label="目標錢包" path="walletType">
                            <n-select v-model:value="formModel.walletType" :options="walletOptions" />
                        </n-form-item>

                        <n-form-item label="調整金額" path="amount">
                            <n-input-number v-model:value="formModel.amount" :min="1" :precision="2" placeholder="輸入金額" style="width: 100%">
                                <template #prefix>$</template>
                            </n-input-number>
                        </n-form-item>

                        <n-form-item label="調整原因" path="reason">
                            <n-select v-model:value="formModel.reason" :options="reasonOptions" placeholder="請選擇原因" />
                        </n-form-item>

                        <n-form-item label="詳細備註" path="note">
                            <n-input v-model:value="formModel.note" type="textarea" placeholder="請輸入詳細說明 (至少 5 字)" />
                        </n-form-item>

                        <!-- Dynamic Fields -->
                        <n-form-item label="相關憑證" path="evidence" v-if="formModel.reason === 'OFFLINE_DEPOSIT'">
                            <n-upload
                                list-type="image-card"
                                :max="1"
                                accept="image/png, image/jpeg"
                                @change="handleUploadChange"
                                :default-file-list="fileList"
                            >
                                <div>上傳圖片</div>
                            </n-upload>
                        </n-form-item>

                        <n-form-item label="計入流水" path="isRollover" v-if="formModel.walletType === 'BONUS' && formModel.type === 'DEPOSIT'">
                            <n-switch v-model:value="formModel.isRollover" />
                        </n-form-item>

                        <n-form-item label="流水倍率" path="rolloverMultiplier" v-if="formModel.isRollover && formModel.walletType === 'BONUS' && formModel.type === 'DEPOSIT'">
                            <n-input-number v-model:value="formModel.rolloverMultiplier" :min="0" :step="1" placeholder="倍率" />
                        </n-form-item>

                        <n-form-item>
                            <n-button type="primary" @click="handleSubmit" :loading="submitting" size="large" block>
                                提交申請
                            </n-button>
                        </n-form-item>

                    </n-form>
                </n-gi>
            </n-grid>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useMessage, FormInst, FormRules, NCard, NGrid, NGi, NFormItem, NInputGroup, NInput, NButton, NAlert, NIcon, NTag, NDivider, NStatistic, NForm, NRadioGroup, NSpace, NRadio, NSelect, NInputNumber, NUpload, NSwitch } from 'naive-ui'
import { PersonOutline as PersonIcon } from '@vicons/ionicons5'
import { playerApi } from '@/api/player'
import { adjustmentApi, ADJUSTMENT_REASONS } from '@/api/adjustment'
import type { Player } from '@/types/player'
import type { UploadFileInfo } from 'naive-ui'

const message = useMessage()

// Search State
const searchId = ref('')
const searching = ref(false)
const player = ref<Player | null>(null)

// Form State
const formRef = ref<FormInst | null>(null)
const submitting = ref(false)
const fileList = ref<UploadFileInfo[]>([])

const formModel = reactive({
    type: 'DEPOSIT',
    walletType: 'CASH',
    amount: null as number | null,
    reason: null as string | null,
    note: '',
    evidence: null as File | null,
    isRollover: false,
    rolloverMultiplier: 1
})

// Options
const walletOptions = [
    { label: '儲值錢包 (Cash)', value: 'CASH' },
    { label: '活動錢包 (Bonus)', value: 'BONUS' }
]

const reasonOptions = ADJUSTMENT_REASONS

// Computed
const cashBalance = computed(() => {
    return player.value?.wallets.find(w => w.type === 'CASH')?.balance || 0
})

const bonusBalance = computed(() => {
    return player.value?.wallets.find(w => w.type === 'BONUS')?.balance || 0
})

// Validation Rules
const rules: FormRules = {
    type: { required: true, message: '請選擇操作類型', trigger: 'change' },
    walletType: { required: true, message: '請選擇目標錢包', trigger: 'change' },
    amount: [
        { required: true, message: '請輸入金額', trigger: 'blur', type: 'number' as any },
        { 
            validator: (_rule: any, value: number) => {
                if (value <= 0) return new Error('金額必須大於 0')
                // Withdrawal check
                if (formModel.type === 'WITHDRAW' && player.value) {
                    const currentBalance = formModel.walletType === 'CASH' ? cashBalance.value : bonusBalance.value
                    if (value > currentBalance) return new Error('餘額不足以扣除')
                }
                return true
            },
            trigger: 'blur'
        }
    ],
    reason: { required: true, message: '請選擇調整原因', trigger: 'change' },
    note: [
        { required: true, message: '請輸入備註', trigger: 'blur' },
        { min: 5, message: '備註至少需要 5 個字', trigger: 'blur' }
    ],
    // Custom logic for evidence is handled in handleSubmit or via custom validator if needed more strictly
}

// Methods
const handleSearch = async () => {
    if (!searchId.value) return
    searching.value = true
    player.value = null
    try {
        const res = await playerApi.getPlayerDetail(searchId.value)
        if (res.code === 0 && res.data) {
            player.value = res.data
            message.success('已鎖定玩家')
        } else {
            message.error('找不到該玩家')
        }
    } catch (e) {
        message.error('搜尋失敗')
    } finally {
        searching.value = false
    }
}

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
    fileList.value = data.fileList
    if (data.fileList.length > 0 && data.fileList[0].file) {
        formModel.evidence = data.fileList[0].file
    } else {
        formModel.evidence = null
    }
}

const handleSubmit = async () => {
    if (!formRef.value || !player.value) return

    // Offline deposit proof check
    if (formModel.reason === 'OFFLINE_DEPOSIT' && !formModel.evidence) {
        message.error('線下充值必須上傳憑證')
        return
    }

    formRef.value.validate(async (errors) => {
        if (!errors) {
            
            // Warning for Test Account
            const isTestAccount = player.value?.tags.includes('測試帳號') || false
            if(isTestAccount) {
                 // Non-blocking warning via notification
                message.warning('注意：此為測試帳號操作')
            }

            submitting.value = true
            try {
                const res = await adjustmentApi.createAdjustment({
                    playerId: player.value!.id,
                    type: formModel.type as 'DEPOSIT' | 'WITHDRAW',
                    walletType: formModel.walletType as 'CASH' | 'BONUS',
                    amount: formModel.amount!,
                    reason: formModel.reason!,
                    note: formModel.note,
                    evidence: formModel.evidence,
                    isRollover: formModel.isRollover,
                    rolloverMultiplier: formModel.rolloverMultiplier
                })

                if (res.code === 0) {
                    message.success('操作成功')
                    // Refresh player data to update balance
                    handleSearch()
                    // Reset form partially
                    formModel.amount = null
                    formModel.note = ''
                    formModel.evidence = null
                    fileList.value = []
                } else {
                    message.error(res.msg || '操作失敗')
                }
            } catch (e) {
                message.error('系統錯誤')
            } finally {
                submitting.value = false
            }
        } else {
            message.error('請檢查表單欄位')
        }
    })
}
</script>

<style scoped>
.manual-adjustment-container {
    padding: 24px;
}
.player-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}
.info-item {
    display: flex;
    align-items: center;
}
.label {
    font-weight: bold;
    color: #666;
    margin-right: 8px;
}
.value {
    font-weight: 500;
}
.wallet-info {
    display: flex;
    margin-top: 12px;
}
.mb-4 {
    margin-bottom: 16px;
}
.mr-1 {
    margin-right: 4px;
}
.ml-8 {
    margin-left: 32px;
}
</style>
