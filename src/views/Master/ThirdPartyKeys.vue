<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { thirdpartyApi } from '@/api/thirdparty'
import { ThirdPartyKey, CreateThirdPartyKeyRequest } from '@/types/thirdparty'
import { NCard, NDataTable, NButton, NModal, NForm, NFormItem, NInput, NSelect, NSwitch, NRadioGroup, NRadio, useMessage, DataTableColumns, NSpace, NTag } from 'naive-ui'

const { t } = useI18n()
const message = useMessage()

const items = ref<ThirdPartyKey[]>([])
const loading = ref(false)

const showModal = ref(false)
const editing = ref<ThirdPartyKey | null>(null)

const formModel = reactive<CreateThirdPartyKeyRequest>({
  category: 'GAME',
  provider: '',
  endpoint: '',
  merchant_id: '',
  api_key: '',
  secret_key: undefined,
  ip_whitelist: undefined,
  environment: 'STAGING',
  enabled: true
})

const categories = [
  { label: '遊戲', value: 'GAME' },
  { label: '金流', value: 'PAYMENT' },
  { label: '簡訊', value: 'SMS' },
  { label: '驗證', value: 'AUTH' }
]

const load = async () => {
  loading.value = true
  const res = await thirdpartyApi.list()
  if (res.code === 0) items.value = res.data || []
  loading.value = false
}

const columns = computed<DataTableColumns<ThirdPartyKey>>(() => [
  {
    title: '供應商',
    key: 'provider',
    width: 150,
    render: (row) => row.provider
  },
  {
    title: '類別',
    key: 'category',
    width: 100,
    render: (row) => h(NTag, { type: 'info' }, { default: () => row.category })
  },
  {
    title: '環境',
    key: 'environment',
    width: 120,
    render: (row) => h(NTag, { type: row.environment === 'PRODUCTION' ? 'error' : 'warning' }, { default: () => row.environment })
  },
  {
    title: '端點',
    key: 'endpoint',
    width: 250,
    render: (row) => h('span', { class: 'text-xs text-gray-600' }, row.endpoint)
  },
  {
    title: 'Merchant ID',
    key: 'merchant_id',
    width: 150,
    render: (row) => row.merchant_id
  },
  {
    title: '狀態',
    key: 'enabled',
    width: 100,
    render: (row) => h(NTag, { type: row.enabled ? 'success' : 'error' }, { default: () => row.enabled ? '啟用' : '停用' })
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    align: 'center',
    render: (row) => h(NSpace, {}, {
      default: () => [
        h(NButton, { size: 'small', type: 'primary', onClick: () => testConnection(row) }, { default: () => '測試連線' }),
        h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => '編輯' })
      ]
    })
  }
])

const openCreate = () => {
  editing.value = null
  Object.assign(formModel, {
    category: 'GAME', provider: '', endpoint: '', merchant_id: '', api_key: '', secret_key: undefined, ip_whitelist: undefined, environment: 'STAGING', enabled: true
  })
  showModal.value = true
}

const openEdit = (row: ThirdPartyKey) => {
  editing.value = row
  Object.assign(formModel, {
    category: row.category, provider: row.provider, endpoint: row.endpoint, merchant_id: row.merchant_id,
    api_key: row.api_key, secret_key: undefined, ip_whitelist: row.ip_whitelist, environment: row.environment, enabled: row.enabled
  })
  showModal.value = true
}

const save = async () => {
  if (!formModel.provider || !formModel.endpoint || !formModel.merchant_id || !formModel.api_key) {
    message.warning('請填寫必要欄位')
    return
  }
  if (editing.value) {
    await thirdpartyApi.update(editing.value.id, formModel)
    message.success('已更新')
  } else {
    await thirdpartyApi.create(formModel)
    message.success('已新增')
  }
  showModal.value = false
  load()
}

const testConnection = async (row?: ThirdPartyKey) => {
  message.info('測試中...')
  const res = row ? await thirdpartyApi.testConnection(row.id) : await thirdpartyApi.testConnection(formModel as any)
  if (res.code === 0 && res.data?.ok) message.success('驗證成功')
  else if (res.code === 401) message.error('Unauthorized (401)')
  else if (res.code === 408) message.error('連線逾時，請檢查端點或 IP 白名單')
  else message.error(res.msg || '驗證失敗')
}

onMounted(load)
</script>

<template>
  <div class="p-6">
    <NCard title="第三方 Key 管理" class="mb-4">
      <template #header-extra>
        <div class="flex gap-2">
          <NButton type="primary" @click="openCreate">新增金鑰</NButton>
        </div>
      </template>

      <NDataTable :columns="columns" :data="items" :loading="loading" :bordered="false" :single-line="false" />
    </NCard>

    <NModal v-model:show="showModal" title="金鑰設定" preset="card" style="width:640px">
      <NForm :model="formModel">
        <NFormItem label="對接類別">
          <NSelect v-model:value="formModel.category" :options="categories" />
        </NFormItem>

        <NFormItem label="供應商名稱">
          <NInput v-model:value="formModel.provider" />
        </NFormItem>

        <NFormItem label="API 端點 (Endpoint)">
          <NInput v-model:value="formModel.endpoint" />
        </NFormItem>

        <NFormItem label="Merchant ID">
          <NInput v-model:value="formModel.merchant_id" />
        </NFormItem>

        <NFormItem label="API Key / App ID">
          <NInput v-model:value="formModel.api_key" />
        </NFormItem>

        <NFormItem label="Secret Key">
          <NInput v-model:value="formModel.secret_key" type="password" show-password-on="click" />
        </NFormItem>

        <NFormItem label="IP 白名單">
          <NInput v-model:value="formModel.ip_whitelist" type="textarea" placeholder="以逗號分隔" />
        </NFormItem>

        <NFormItem label="連線環境">
          <NRadioGroup v-model:value="formModel.environment">
            <NRadio value="STAGING">測試 (Staging)</NRadio>
            <NRadio value="PRODUCTION">正式 (Production)</NRadio>
          </NRadioGroup>
        </NFormItem>

        <NFormItem label="當前狀態">
          <NSwitch v-model:value="formModel.enabled" />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showModal = false">取消</NButton>
          <NButton @click="() => testConnection()">測試連線</NButton>
          <NButton type="primary" @click="save">儲存</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
