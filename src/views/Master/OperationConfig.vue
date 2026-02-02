<template>
  <div class="operation-config">
    <n-card :title="t('navigation.operationConfig')" :segmented="{ content: true, footer: 'soft' }">
      <!-- Access Operation Button -->
      <div class="mb-4 flex gap-2" v-if="!loading">
        <n-button 
          type="warning" 
          :disabled="pendingChangesCount === 0" 
          @click="handleSave"
          :loading="isSaving"
        >
          存取操作
          <span v-if="pendingChangesCount > 0" class="ml-1">({{ pendingChangesCount }})</span>
        </n-button>
      </div>

      <!-- Loading state -->
      <n-spin v-if="loading" />

      <template v-else>
        <n-form
          ref="formRef"
          :model="formModel"
          :rules="rules"
          label-placement="left"
          label-width="180px"
        >
          <n-grid :cols="24" :x-gap="24">
            <!-- 營運與維護 -->
            <n-form-item-gi :span="24">
              <n-divider title-placement="left">營運與維護</n-divider>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="全站維護開關" path="maintenance_enabled">
              <n-switch v-model:value="formModel.maintenance_enabled" />
              <n-text v-if="formModel.maintenance_enabled" type="warning" class="ml-2">
                維護中 (禁止訪問)
              </n-text>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="強制踢線 (秒)" path="maintenance_kickout_delay_seconds">
              <n-input-number v-model:value="formModel.maintenance_kickout_delay_seconds" :min="0" />
            </n-form-item-gi>

            <n-form-item-gi :span="24" label="維護公告內容" path="maintenance_message.zh">
              <n-input
                v-model:value="formModel.maintenance_message.zh"
                type="textarea"
                placeholder="維護時前端顯示的自定義文字"
                :rows="2"
              />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="允許測試登入" path="allow_test_login">
              <n-switch v-model:value="formModel.allow_test_login" />
              <n-text depth="3" class="ml-2">管理員與測試帳號</n-text>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="註冊功能開關" path="registration_enabled">
              <n-switch v-model:value="formModel.registration_enabled" />
              <n-text :type="formModel.registration_enabled ? 'success' : 'error'" class="ml-2">
                {{ formModel.registration_enabled ? '開放註冊' : '關閉註冊' }}
              </n-text>
            </n-form-item-gi>

            <!-- 網站基礎設定 -->
            <n-form-item-gi :span="24">
              <n-divider title-placement="left">網站基礎設定</n-divider>
            </n-form-item-gi>

            <n-form-item-gi :span="24" label="網站標題" path="site_title">
              <n-input v-model:value="formModel.site_title" placeholder="瀏覽器分頁與標題" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="預設語系" path="default_language">
              <n-select v-model:value="formModel.default_language" :options="languageOptions" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="時區設定" path="timezone">
              <n-select v-model:value="formModel.timezone" :options="timezoneOptions" />
            </n-form-item-gi>

            <!-- 推廣與財務參數 -->
            <n-form-item-gi :span="24">
              <n-divider title-placement="left">推廣與財務參數</n-divider>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="P2P 交易手續費 (%)" path="p2p_transaction_fee">
              <n-input-number v-model:value="formModel.p2p_transaction_fee" :precision="2" :min="0" :max="100" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="活動錢包流水倍數 (M)" path="bonus_rollover_multiplier">
              <n-input-number v-model:value="formModel.bonus_rollover_multiplier" :precision="1" :min="0" />
              <template #feedback>
                <n-text type="info" v-if="formModel.bonus_rollover_multiplier === 0">
                  💡 設為 0 代表無需流水直接轉化
                </n-text>
              </template>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="註冊贈點金額" path="registration_bonus_amount">
              <n-input-number v-model:value="formModel.registration_bonus_amount" :min="0" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="流水結算極小值" path="rollover_settlement_threshold">
              <n-input-number v-model:value="formModel.rollover_settlement_threshold" :min="0" :step="0.01" />
            </n-form-item-gi>

            <!-- 安全性設定 -->
            <n-form-item-gi :span="24">
              <n-divider title-placement="left">安全性設定</n-divider>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="登入錯誤上限" path="login_error_limit">
              <n-input-number v-model:value="formModel.login_error_limit" :min="1" :max="20" />
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="驗證碼開關" path="captcha_enabled">
              <n-switch v-model:value="formModel.captcha_enabled" />
              <n-text depth="3" class="ml-2">登入與註冊頁面</n-text>
            </n-form-item-gi>

            <n-form-item-gi :span="12" label="強制手機綁定" path="force_phone_binding">
              <n-switch v-model:value="formModel.force_phone_binding" />
            </n-form-item-gi>

            <n-form-item-gi :span="24" label="白名單 IP" path="whitelist_ips">
              <n-input
                v-model:value="formModel.whitelist_ips"
                type="textarea"
                placeholder="輸入允許跳過維護限制的 IP 範圍（每行一個）"
                :rows="3"
              />
            </n-form-item-gi>
          </n-grid>
        </n-form>

        <!-- Audit Info -->
        <n-divider />
        <n-space justify="space-between" style="margin-top: 16px;">
          <n-text type="hint" v-if="config">
            最後更新：{{ formatDate(config.updated_at) }} by {{ config.updated_by }}
          </n-text>
          <n-button text type="primary" @click="showChangeReasonModal = true">
            查看變更歷史
          </n-button>
        </n-space>
      </template>
    </n-card>

    <!-- Change Reason Modal -->
    <n-modal
      v-model:show="showChangeReasonModal"
      title="編輯變更原因"
      preset="dialog"
      positive-text="確認"
      negative-text="取消"
      @positive-click="confirmSave"
      @negative-click="showChangeReasonModal = false"
    >
      <n-form-item label="變更原因">
        <n-input
          v-model:value="changeReason"
          type="textarea"
          placeholder="請填寫此次變更的原因（供審計日誌使用）"
          :rows="4"
          clearable
        />
      </n-form-item>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NCard, NButton, NSpin, NForm, NFormItem,
  NDivider, NSwitch, NText, NInput, NInputNumber, NSpace, NModal,
  NSelect, NGrid, NFormItemGi,
  useMessage, useDialog
} from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { operationConfigApi } from '@/api/operationConfig'
import type { OperationConfig } from '@/types/operationConfig'

const message = useMessage()
const dialog = useDialog()
const { t } = useI18n()
const formRef = ref<FormInst>()

const loading = ref(false)
const isSaving = ref(false)
const showChangeReasonModal = ref(false)
const changeReason = ref('')

const config = ref<OperationConfig | null>(null)

// 選項數據
const languageOptions = [
  { label: '繁體中文', value: 'zh-TW' },
  { label: '簡體中文', value: 'zh-CN' },
  { label: 'English', value: 'en' }
]

const timezoneOptions = [
  { label: '(UTC+08:00) 台北', value: 'Asia/Taipei' },
  { label: '(UTC+08:00) 北京', value: 'Asia/Shanghai' },
  { label: '(UTC+00:00) 倫敦', value: 'UTC' }
]

// Calculate pending changes dynamically
const pendingChanges = computed(() => {
  const changes: any = {}
  if (!config.value) return changes
  
  for (const key of Object.keys(formModel)) {
    const newVal = (formModel as any)[key]
    const oldVal = (config.value as any)[key]
    
    // Deep comparison for nested objects (maintenance_message)
    if (typeof newVal === 'object' && newVal !== null) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        changes[key] = newVal
      }
    } else if (newVal !== oldVal) {
      changes[key] = newVal
    }
  }
  return changes
})

const pendingChangesCount = computed(() => Object.keys(pendingChanges.value).length)

const formModel = reactive({
  // 營運與維護
  maintenance_enabled: false,
  maintenance_message: { zh: '', 'zh-CN': '' },
  maintenance_kickout_delay_seconds: 30,
  allow_test_login: true,
  registration_enabled: true,

  // 網站基礎設定
  site_title: '',
  default_language: 'zh-TW',
  timezone: 'Asia/Taipei',

  // 推廣與財務參數
  p2p_transaction_fee: 5.0,
  bonus_rollover_multiplier: 20.0,
  registration_bonus_amount: 100,
  rollover_settlement_threshold: 0.99,

  // 安全性設定
  login_error_limit: 5,
  captcha_enabled: true,
  force_phone_binding: false,
  whitelist_ips: ''
})

const rules: FormRules = {
  maintenance_kickout_delay_seconds: { type: 'number', min: 0, message: '請輸入有效的整數', trigger: ['blur', 'change'] },
  site_title: { required: true, message: '請輸入網站標題', trigger: 'blur' },
  p2p_transaction_fee: { type: 'number', min: 0, max: 100, message: '手續費應在 0-100% 之間', trigger: ['blur', 'change'] },
  bonus_rollover_multiplier: { type: 'number', min: 0, max: 100, message: '流水倍數應在 0-100 之間', trigger: ['blur', 'change'] },
  registration_bonus_amount: { type: 'number', min: 0, message: '金額不正確', trigger: ['blur', 'change'] },
  login_error_limit: { type: 'number', min: 1, max: 20, message: '錯誤上限應在 1-20 之間', trigger: ['blur', 'change'] }
}

const loadConfig = async () => {
  try {
    loading.value = true
    const res = await operationConfigApi.get()
    if (res.code === 0 && res.data) {
      config.value = res.data
      Object.assign(formModel, res.data)
    } else {
      message.error(res.msg || '載入設定失敗')
    }
  } catch (e) {
    message.error('載入設定異常')
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  try {
    await formRef.value?.validate()
    
    // Check if bonus_rollover_multiplier is 0
    if (formModel.bonus_rollover_multiplier === 0 && config.value?.bonus_rollover_multiplier !== 0) {
      const shouldProceed = await new Promise<boolean>((resolve) => {
        dialog.warning({
          title: '確認',
          content: '您正在將流水倍數設為 0，這將使所有贈點預設無流水限制，確定要繼續嗎？',
          positiveText: '確認',
          negativeText: '取消',
          onPositiveClick: () => resolve(true),
          onNegativeClick: () => resolve(false),
          onClose: () => resolve(false)
        })
      })
      if (!shouldProceed) return
    }

    if (pendingChangesCount.value === 0) {
      message.info('沒有任何變更')
      return
    }

    changeReason.value = ''
    showChangeReasonModal.value = true
  } catch (e) {
    message.error('表單驗證失敗')
  }
}

const confirmSave = async () => {
  if (!changeReason.value.trim()) {
    message.warning('請填寫變更原因')
    return
  }

  if (!pendingChanges.value) return

  try {
    isSaving.value = true
    const res = await operationConfigApi.update(pendingChanges.value, changeReason.value)
    
    if (res.code === 0) {
      message.success('設定已更新')
      showChangeReasonModal.value = false
      await loadConfig()
    } else {
      message.error(res.msg || '更新失敗')
    }
  } catch (e) {
    message.error('更新異常')
    console.error(e)
  } finally {
    isSaving.value = false
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleString('zh-TW')
}

loadConfig()
</script>

<style scoped>
.operation-config {
  padding: 20px;
}

:deep(.n-form) {
  max-width: 800px;
}

:deep(.n-divider__title) {
  font-weight: 600;
  font-size: 14px;
}
</style>
