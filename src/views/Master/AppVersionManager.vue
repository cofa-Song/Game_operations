<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import { versionApi } from '@/api/version'
import { VersionRecord, CreateVersionRequest } from '@/types/version'
import { NCard, NDataTable, NButton, NModal, NForm, NFormItem, NInput, NSelect, NSwitch, useMessage, NInputNumber, DataTableColumns, NSpace, NTag } from 'naive-ui'

const message = useMessage()

const items = ref<VersionRecord[]>([])
const loading = ref(false)

const showModal = ref(false)
const editing = ref<VersionRecord | null>(null)

const formModel = reactive<CreateVersionRequest>({
  platforms: ['IOS'],
  version: '1.0.0',
  build: 100,
  update_type: 'OPTION',
  download_link: '',
  title: '',
  changelog: { zh: '' },
  enabled: true
})

const platformOptions = [
  { label: 'iOS', value: 'IOS' },
  { label: 'Android', value: 'ANDROID' },
  { label: 'H5', value: 'H5' }
]

const updateTypeOptions = [
  { label: '不提示', value: 'NONE' },
  { label: '建議更新', value: 'OPTION' },
  { label: '強制更新', value: 'FORCE' }
]


const columns = computed<DataTableColumns<VersionRecord>>(() => [
  {
    title: '版本',
    key: 'version',
    width: 120,
    render: (row) => h('div', {}, [
      h('div', { class: 'font-bold' }, `v${row.version}`),
      h('div', { class: 'text-xs text-gray-500' }, `build ${row.build}`)
    ])
  },
  {
    title: '平台',
    key: 'platforms',
    width: 150,
    render: (row) => row.platforms.map(p => h(NTag, { size: 'small', class: 'mr-1' }, { default: () => p }))
  },
  {
    title: '更新類型',
    key: 'update_type',
    width: 120,
    render: (row) => h(NTag, { type: row.update_type === 'FORCE' ? 'error' : row.update_type === 'OPTION' ? 'warning' : 'default' }, { default: () => row.update_type })
  },
  {
    title: '狀態',
    key: 'enabled',
    width: 100,
    render: (row) => h(NTag, { type: row.enabled ? 'success' : 'error' }, { default: () => row.enabled ? '啟用' : '停用' })
  },
  {
    title: '標題',
    key: 'title',
    width: 200,
    render: (row) => row.title
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    align: 'center',
    render: (row) => h(NSpace, {}, {
      default: () => [
        h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => '編輯' }),
        h(NButton, { size: 'small', type: 'error', onClick: () => remove(row.id) }, { default: () => '刪除' })
      ]
    })
  }
])

const load = async () => {
  loading.value = true
  const res = await versionApi.list()
  if (res.code === 0) items.value = res.data || []
  loading.value = false
}

const openCreate = () => {
  editing.value = null
  Object.assign(formModel, { platforms: ['IOS'], version: '1.0.0', build: 100, update_type: 'OPTION', download_link: '', title: '', changelog: { zh: '' }, enabled: true })
  showModal.value = true
}

const openEdit = (row: VersionRecord) => {
  editing.value = row
  Object.assign(formModel, { platforms: [...row.platforms], version: row.version, build: row.build, update_type: row.update_type, download_link: row.download_link, title: row.title, changelog: row.changelog, enabled: row.enabled })
  showModal.value = true
}

const save = async () => {
  if (!formModel.version || !formModel.build || !formModel.download_link) {
    message.warning('請填寫必要欄位')
    return
  }
  if (editing.value) {
    await versionApi.update(editing.value.id, formModel)
    message.success('已更新')
  } else {
    await versionApi.create(formModel)
    message.success('已新增')
  }
  showModal.value = false
  load()
}

const remove = async (id: string) => {
  if (!confirm('確定刪除？')) return
  await versionApi.remove(id)
  message.success('已刪除')
  load()
}

onMounted(load)
</script>

<template>
  <div class="p-6">
    <NCard title="版本管理" class="mb-4">
      <template #header-extra>
        <div class="flex gap-2">
          <NButton type="primary" @click="openCreate">新增版本</NButton>
        </div>
      </template>

      <NDataTable :columns="columns" :data="items" :loading="loading" :bordered="false" :single-line="false" />
    </NCard>

    <NModal v-model:show="showModal" title="版本設定" preset="card" style="width:720px">
      <NForm :model="formModel">
        <NFormItem label="裝置平台">
          <NSelect v-model:value="formModel.platforms" multiple :options="platformOptions" />
        </NFormItem>

        <NFormItem label="版本號 (Version)">
          <NInput v-model:value="formModel.version" />
        </NFormItem>

        <NFormItem label="版本代碼 (Build)">
          <NInputNumber v-model:value="formModel.build" :min="1" style="width:120px" />
        </NFormItem>

        <NFormItem label="更新類型">
          <NSelect v-model:value="formModel.update_type" :options="updateTypeOptions" />
        </NFormItem>


        <NFormItem label="下載連結">
          <NInput v-model:value="formModel.download_link" />
        </NFormItem>

        <NFormItem label="更新標題">
          <NInput v-model:value="formModel.title" />
        </NFormItem>

        <NFormItem label="更新日誌 (ZH)">
          <NInput v-model:value="formModel.changelog.zh" type="textarea" rows="6" />
        </NFormItem>

        <NFormItem label="發佈狀態">
          <NSwitch v-model:value="formModel.enabled" />
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
