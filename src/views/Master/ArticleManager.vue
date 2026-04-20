<template>
  <div class="article-manager">
    <n-card :title="t('navigation.articleManagement')" class="shadow-sm rounded-lg border-none">
      <template #header-extra>
        <n-button type="info" @click="openDrawer()">{{ t('common.add') }}</n-button>
      </template>

      <n-space vertical size="large">
        <!-- Access Operation Button -->
        <div class="flex gap-2">
          <n-button 
            type="warning" 
            :disabled="pendingChanges.length === 0" 
            @click="handleBatchSave"
            :loading="loading"
          >
            {{ t('game.list.accessOperation') }}
            <span v-if="pendingChanges.length" class="ml-1">({{ pendingChanges.length }})</span>
          </n-button>
        </div>

        <!-- Search Filters -->
        <n-card embedded :bordered="false" size="small">
          <n-form inline :model="searchParams" label-placement="left">
            <n-form-item :label="t('article.category')">
              <n-select
                v-model:value="searchParams.categories"
                multiple
                clearable
                :options="categoryOptions"
                placeholder="篩選類別"
                style="width: 260px"
              />
            </n-form-item>
            <n-form-item :label="t('article.timeRange')">
              <n-date-picker
                v-model:value="timeRange"
                type="datetimerange"
                clearable
                @update:value="handleTimeChange"
              />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" @click="handleSearch">
                {{ t('common.search') }}
              </n-button>
            </n-form-item>
          </n-form>
        </n-card>

        <!-- Article List -->
        <n-data-table
          remote
          :columns="columns"
          :data="articles"
          :loading="loading"
          :pagination="pagination"
          @update:page="handlePageChange"
        />
      </n-space>
    </n-card>

    <!-- Edit/Add Drawer -->
    <n-drawer v-model:show="showDrawer" width="850" placement="right">
      <n-drawer-content :title="editingId ? '編輯文章' : '新增文章'" closable>
        <n-form
          ref="formRef"
          :model="formModel"
          :rules="rules"
          label-placement="top"
        >
          <n-grid :cols="2" :x-gap="20">
            <n-gi>
              <n-form-item label="文章語系" path="language">
                <n-select v-model:value="formModel.language" :options="languageOptions" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="文章類別" path="category">
                <n-select v-model:value="formModel.category" :options="categoryOptions" />
              </n-form-item>
            </n-gi>
          </n-grid>

          <n-form-item label="文章標題" path="title">
            <n-input v-model:value="formModel.title" placeholder="建議 30 字內" count-text-style="true" maxlength="50" show-count />
          </n-form-item>

          <n-form-item label="封面縮圖" path="cover_url">
            <n-upload
              action="#"
              list-type="image-card"
              :max="1"
              :default-file-list="fileList"
              @change="handleUploadChange"
            >
              點擊上傳
            </n-upload>
          </n-form-item>

          <n-tabs type="line" animated>
            <n-tab-pane name="content" tab="內容編輯">
              <n-form-item label="富文本內容" path="content" :show-label="false">
                <TinymceEditor v-model="formModel.content" placeholder="請輸入文章內容" :height="500" />
              </n-form-item>
            </n-tab-pane>
            <n-tab-pane name="seo" tab="SEO 優化">
               <n-form-item label="Meta Title" path="seo.meta_title">
                <n-input v-model:value="formModel.seo.meta_title" :placeholder="formModel.title || '留空則取用標題'" />
              </n-form-item>
              <n-form-item label="Meta Description" path="seo.meta_description">
                <n-input
                  v-model:value="formModel.seo.meta_description"
                  type="textarea"
                  placeholder="建議 150 字內"
                  :rows="3"
                />
              </n-form-item>
            </n-tab-pane>
            <n-tab-pane name="publish" tab="發佈設定">
               <n-grid :cols="2" :x-gap="20">
                    <n-gi>
                        <n-form-item label="發佈開始時間" path="publish_start">
                            <n-date-picker v-model:value="publishStartTimestamp" type="datetime" />
                        </n-form-item>
                    </n-gi>
                    <n-gi>
                        <n-form-item label="發佈結束時間 (永不下架則不填)" path="publish_end">
                            <n-date-picker v-model:value="publishEndTimestamp" type="datetime" clearable />
                        </n-form-item>
                    </n-gi>
               </n-grid>
            </n-tab-pane>
          </n-tabs>
        </n-form>

        <template #footer>
          <n-space justify="end">
            <n-button @click="showDrawer = false">取消</n-button>
            <n-button type="primary" :loading="saving" @click="handleSave">提交發佈</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  NCard, NSpace, NForm, NFormItem, NSelect, NButton, NIcon, NDataTable, NTag,
  NDrawer, NDrawerContent, NInput, NGrid, NGi, NTabs, NTabPane, NDatePicker,
  NSwitch, NAvatar, NUpload, useMessage, useDialog 
} from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import { CreateOutline, TrashOutline } from '@vicons/ionicons5'
import { articleApi } from '@/api/article'
import { Article, ArticleCategory } from '@/types/article'
import TinymceEditor from '@/components/TinymceEditor.vue'
import type { DataTableColumns } from 'naive-ui'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

// Search
const searchParams = reactive({
  categories: [] as ArticleCategory[],
  start_time: undefined as string | undefined,
  end_time: undefined as string | undefined
})
const timeRange = ref<[number, number] | null>(null)

const categoryOptions = [
  { label: '優惠活動', value: 'PROMOTION' },
  { label: '系統公告', value: 'SYSTEM' },
  { label: '遊戲百科', value: 'ENCYCLOPEDIA' },
  { label: 'SEO 專欄', value: 'SEO' },
  { label: '服務條款', value: 'TERMS' }
]

const languageOptions = [
  { label: '繁體中文 (zh-TW)', value: 'zh-TW' },
  { label: '簡體中文 (zh-CN)', value: 'zh-CN' },
  { label: 'English (en)', value: 'en' }
]

// Date Format helper
const formatDate = (isoStr: string | undefined) => {
  if (!isoStr) return '-'
  const date = new Date(isoStr)
  return date.toLocaleString('zh-TW', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', hour12: false 
  }).replace(/\//g, '-')
}

// List Data
const loading = ref(false)
const articles = ref<Article[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50]
})

const pendingChanges = ref<{ id: string, site: 'test' | 'live', status: boolean }[]>([])

const columns: DataTableColumns<Article> = [
  { title: '文章類別', key: 'category', render: (row) => {
    const cat = categoryOptions.find(o => o.value === row.category)
    return h(NTag, { type: 'info', size: 'small' }, { default: () => cat?.label || row.category })
  }},
  { title: '文章標題', key: 'title', ellipsis: { tooltip: true }, width: 200 },
  { title: '封面', key: 'cover_url', render: (row) => h(NAvatar, { src: row.cover_url, size: 'small', fallbackSrc: 'https://placehold.co/40x30' }) },
  { title: '發佈區間', key: 'publish_start', render: (row) => h('div', { style: 'font-size: 12px' }, [
    h('div', `起: ${formatDate(row.publish_start)}`),
    h('div', `止: ${row.publish_end ? formatDate(row.publish_end) : '永久上架'}`)
  ])},
  { title: '操作人', key: 'last_modified_by' },
  { title: '狀態 (測試)', key: 'status_test', render: (row) => h(NSwitch, { 
    value: row.status_test, 
    onUpdateValue: (v: boolean) => recordChange(row.id, 'test', v) 
  }) },
  { title: '狀態 (正式)', key: 'status_live', render: (row) => h(NSwitch, { 
    value: row.status_live, 
    onUpdateValue: (v: boolean) => recordChange(row.id, 'live', v) 
  }) },
  {
    title: '操作',
    key: 'actions',
    render: (row) => h(NSpace, {}, {
        default: () => [
            h(NButton, { size: 'tiny', onClick: () => openDrawer(row.id) }, { icon: () => h(NIcon, null, { default: () => h(CreateOutline) }) }),
            h(NButton, { size: 'tiny', type: 'error', onClick: () => handleDelete(row.id) }, { icon: () => h(NIcon, null, { default: () => h(TrashOutline) }) })
        ]
    })
  }
]

const fetchData = async () => {
  loading.value = true
  try {
    const res = await articleApi.list({
      ...searchParams,
      page: pagination.page,
      pageSize: pagination.pageSize
    })
    if (res.code === 0 && res.data) {
      articles.value = res.data.items
      pagination.itemCount = res.data.total
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  fetchData()
}

const handleTimeChange = (val: [number, number] | null) => {
  if (val) {
    searchParams.start_time = new Date(val[0]).toISOString()
    searchParams.end_time = new Date(val[1]).toISOString()
  } else {
    searchParams.start_time = undefined
    searchParams.end_time = undefined
  }
}

// Drawer & Form
const showDrawer = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)
const formRef = ref<any>(null)

const formModel = reactive({
  title: '',
  category: 'PROMOTION' as ArticleCategory,
  language: 'zh-TW',
  cover_url: '',
  content: '',
  publish_start: '',
  publish_end: '',
  seo: {
    meta_title: '',
    meta_description: ''
  }
})

const publishStartTimestamp = ref<number>(Date.now())
const publishEndTimestamp = ref<number | null>(null)

const rules = {
  title: { required: true, message: '請輸入標題', trigger: 'blur' },
  category: { required: true, message: '請選擇類別', trigger: 'change' },
  language: { required: true, message: '請選擇語系', trigger: 'change' }
}

const fileList = computed(() => {
  if (!formModel.cover_url) return []
  return [{
    id: 'cover',
    name: 'cover.png',
    status: 'finished',
    url: formModel.cover_url
  }] as UploadFileInfo[]
})

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  if (data.fileList.length > 0) {
    const file = data.fileList[0]
    // 模擬上傳成功並設置 URL
    if (file.file) {
      formModel.cover_url = URL.createObjectURL(file.file)
    } else if (file.url) {
      formModel.cover_url = file.url
    }
  } else {
    formModel.cover_url = ''
  }
}

const openDrawer = async (id?: string) => {
  editingId.value = id || null
  if (id) {
    const res = await articleApi.get(id)
    if (res.code === 0 && res.data) {
       Object.assign(formModel, JSON.parse(JSON.stringify(res.data)))
       publishStartTimestamp.value = new Date(res.data.publish_start).getTime()
       publishEndTimestamp.value = res.data.publish_end ? new Date(res.data.publish_end).getTime() : null
    }
  } else {
    Object.assign(formModel, {
      title: '',
      category: 'PROMOTION',
      language: 'zh-TW',
      cover_url: '',
      content: '',
      publish_start: new Date().toISOString(),
      publish_end: '',
      seo: { meta_title: '', meta_description: '' }
    })
    publishStartTimestamp.value = Date.now()
    publishEndTimestamp.value = null
  }
  showDrawer.value = true
}

const handleSave = async () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      saving.value = true
      try {
        formModel.publish_start = new Date(publishStartTimestamp.value).toISOString()
        formModel.publish_end = publishEndTimestamp.value ? new Date(publishEndTimestamp.value).toISOString() : ''
        
        const payload = { ...formModel, id: editingId.value || undefined }
        const res = await articleApi.save(payload)
        if (res.code === 0) {
          message.success('文章已儲存並發佈')
          showDrawer.value = false
          fetchData()
        }
      } finally {
        saving.value = false
      }
    }
  })
}

const handleDelete = (id: string) => {
  dialog.warning({
    title: '確認刪除',
    content: '確定要刪除這篇文章嗎？此操作不可恢復。',
    positiveText: '確認刪除',
    negativeText: '取消',
    onPositiveClick: async () => {
      await articleApi.delete(id)
      message.success('文章已刪除')
      fetchData()
    }
  })
}

const recordChange = (id: string, site: 'test' | 'live', status: boolean) => {
    // Immediate UI update for responsiveness in mock
    const idx = articles.value.findIndex(a => a.id === id)
    if (idx !== -1) {
        if (site === 'test') articles.value[idx].status_test = status
        else articles.value[idx].status_live = status
    }

    const existing = pendingChanges.value.findIndex(c => c.id === id && c.site === site)
    if (existing !== -1) {
        pendingChanges.value.splice(existing, 1)
    } else {
        pendingChanges.value.push({ id, site, status })
    }
}

const handleBatchSave = async () => {
    loading.value = true
    try {
        for (const change of pendingChanges.value) {
            await articleApi.toggleStatus(change.id, change.site, change.status)
        }
        message.success('變更已套用')
        pendingChanges.value = []
        fetchData()
    } finally {
        loading.value = false
    }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.article-manager {
  padding: 24px;
}
.ml-2 { margin-left: 8px; }
.ml-auto { margin-left: auto; }
</style>
