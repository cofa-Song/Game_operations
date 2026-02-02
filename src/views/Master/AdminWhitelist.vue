<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { whitelistApi } from '@/api/whitelist'
import { WhitelistEntry, CreateWhitelistRequest } from '@/types/whitelist'
import { NCard, NDataTable, NButton, NModal, NForm, NFormItem, NInput, NSwitch, useMessage, DataTableColumns, NSpace, NTag } from 'naive-ui'

const { t } = useI18n()
const message = useMessage()

const items = ref<WhitelistEntry[]>([])
const loading = ref(false)

const currentIp = ref<string | null>(null)

const showModal = ref(false)
const editing = ref<WhitelistEntry | null>(null)

const formModel = reactive<CreateWhitelistRequest>({ cidr: '', remark: '', enabled: true })
const twoFa = ref('')

const columns = computed<DataTableColumns<WhitelistEntry>>(() => [
  {
    title: 'IP / 網段',
    key: 'cidr',
    width: 180,
    render: (row) => h('div', { class: 'font-mono' }, row.cidr)
  },
  {
    title: '備註',
    key: 'remark',
    width: 200,
    render: (row) => row.remark
  },
  {
    title: '建立者',
    key: 'creator',
    width: 120,
    render: (row) => row.creator || '-'
  },
  {
    title: '狀態',
    key: 'enabled',
    width: 100,
    render: (row) => h(NTag, { type: row.enabled ? 'success' : 'error' }, { default: () => row.enabled ? '啟用' : '停用' })
  },
  {
    title: '最後訪問',
    key: 'last_access',
    width: 180,
    render: (row) => h('div', { class: 'text-xs text-gray-600' }, row.last_access ? new Date(row.last_access).toLocaleString('zh-TW') : '-')
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    align: 'center',
    render: (row) => h(NSpace, {}, {
      default: () => [
        h(NSwitch, { value: row.enabled, onUpdate: () => toggleEnabled(row) }),
        h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => '編輯' }),
        h(NButton, { size: 'small', type: 'error', onClick: () => remove(row.id) }, { default: () => '刪除' })
      ]
    })
  }
])

const load = async () => {
  loading.value = true
  const res = await whitelistApi.list()
  if (res.code === 0) items.value = res.data || []
  loading.value = false
}

// Try to detect client IP via ipify; fallback to null
const detectIp = async () => {
  try {
    const r = await fetch('https://api.ipify.org?format=json')
    const j = await r.json()
    currentIp.value = j.ip
  } catch (e) {
    currentIp.value = null
  }
}

const openCreate = () => {
  editing.value = null
  Object.assign(formModel, { cidr: '', remark: '', enabled: true })
  twoFa.value = ''
  showModal.value = true
}

const openEdit = (row: WhitelistEntry) => {
  editing.value = row
  Object.assign(formModel, { cidr: row.cidr, remark: row.remark, enabled: row.enabled })
  twoFa.value = ''
  showModal.value = true
}

const save = async () => {
  if (!formModel.cidr || !formModel.remark) {
    message.warning('請填寫 IP / 網段 與 備註')
    return
  }

  // mock 2FA: require non-empty
  if (!twoFa.value) {
    message.warning('請輸入二階驗證')
    return
  }

  if (editing.value) {
    const res = await whitelistApi.update(editing.value.id, formModel, currentIp || undefined)
    if (res.code === 0) message.success('已更新')
    else message.error(res.msg)
  } else {
    const res = await whitelistApi.create(formModel)
    if (res.code === 0) message.success('已新增')
    else message.error(res.msg)
  }
  showModal.value = false
  load()
}

const remove = async (id: string) => {
  if (!confirm('確定刪除？')) return
  const res = await whitelistApi.remove(id, currentIp || undefined)
  if (res.code === 0) {
    message.success('已刪除')
    load()
  } else {
    message.error(res.msg)
  }
}

const toggleEnabled = async (row: WhitelistEntry) => {
  const res = await whitelistApi.update(row.id, { enabled: !row.enabled }, currentIp || undefined)
  if (res.code === 0) {
    message.success('已更新狀態')
    load()
  } else {
    message.error(res.msg)
  }
}

onMounted(() => {
  detectIp()
  load()
})
</script>

<template>
  <div class="p-6">
    <NCard title="後台白名單管理" class="mb-4">
      <template #header-extra>
        <div class="flex gap-2">
          <NButton type="primary" @click="openCreate">新增白名單</NButton>
          <NButton @click="() => { if (currentIp) { formModel.cidr = currentIp; formModel.remark = 'Add my IP'; openCreate() } else { alert('無法取得本機 IP') } }">加入當前 IP</NButton>
        </div>
      </template>

      <div class="mb-3">當前偵測 IP: <strong>{{ currentIp || '無法取得' }}</strong></div>

      <NDataTable :columns="columns" :data="items" :loading="loading" :bordered="false" :single-line="false" />
    </NCard>

    <NModal v-model:show="showModal" title="白名單設定" preset="card" style="width:640px">
      <NForm :model="formModel">
        <NFormItem label="IP / 網段">
          <NInput v-model:value="formModel.cidr" placeholder="例如 1.2.3.4 或 1.2.3.0/24" />
        </NFormItem>
        <NFormItem label="備註">
          <NInput v-model:value="formModel.remark" />
        </NFormItem>
        <NFormItem label="啟用狀態">
          <NSwitch v-model:value="formModel.enabled" />
        </NFormItem>
        <NFormItem label="二階驗證 (模擬)">
          <NInput v-model:value="twoFa" placeholder="輸入二階驗證碼或密碼" />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showModal = false">取消</NButton>
          <NButton type="primary" @click="save">儲存</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
