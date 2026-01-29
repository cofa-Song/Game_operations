<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { 
  NCard, NInput, NSelect, NDatePicker, NButton, NDataTable, NSpace, NTag,
  NBadge, NModal, NForm, NFormItem, useMessage, DataTableColumns 
} from 'naive-ui'
import { 
  SearchOutline, AddOutline, EyeOutline, ListOutline, GameControllerOutline, PricetagOutline 
} from '@vicons/ionicons5'
import { playerApi } from '@/api/player'
import { tagApi } from '@/api/tag'
import { Player, PlayerSearchParams, PlayerStatus, PlayerTag } from '@/types/player'
import { SelectOption } from 'naive-ui'
import TagManagementDrawer from './TagManagementDrawer.vue'

const router = useRouter()
const message = useMessage()

// Search State
const searchForm = reactive<PlayerSearchParams>({
  q: '',
  status: undefined,
  tags: undefined,
  register_date_start: undefined,
  register_date_end: undefined,
  page: 1,
  page_size: 10
})

const statusOptions = [
  { label: '正常', value: 'ACTIVE' },
  { label: '鎖定', value: 'LOCKED' },
  { label: '凍結', value: 'FROZEN' },
  { label: '停權', value: 'SUSPENDED' }
]

const tagOptions = ref<SelectOption[]>([])
const showTagDrawer = ref(false)

// Function to fetch tags for dropdowns
const fetchTagOptions = async () => {
    try {
        const res = await tagApi.getTags()
        if (res.code === 0) {
            // Only show ACTIVE tags in dropdowns
            tagOptions.value = res.data
                .filter(t => t.status === 'ACTIVE')
                .map(t => ({ label: t.name, value: t.name }))
        }
    } catch (e) {
        console.error('Failed to load tags')
    }
}

// Data Table
const loading = ref(false)
const players = ref<Player[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page
    searchForm.page = page
    fetchData()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    searchForm.page_size = pageSize
    searchForm.page = 1
    fetchData()
  }
})

const columns: DataTableColumns<Player> = [
  { title: '玩家 ID', key: 'id', width: 120 },
  { title: '帳號', key: 'username', width: 150 },
  { title: '顯示名稱', key: 'display_name', width: 150 },
  { 
    title: '標籤', 
    key: 'tags',
    render(row) {
      return row.tags.map(tag => {
        return h(NTag, { style: { marginRight: '6px' }, type: tag === 'TEST' ? 'warning' : 'default' }, { default: () => tag })
      })
    }
  },
  { 
    title: '帳戶狀態', 
    key: 'status',
    width: 100,
    render(row) {
      const typeMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
        'ACTIVE': 'success',
        'LOCKED': 'warning',
        'FROZEN': 'info',
        'SUSPENDED': 'error'
      }
      return h(NTag, { type: typeMap[row.status] || 'default', bordered: false }, { default: () => row.status })
    }
  },
  {
    title: '在線狀態',
    key: 'is_online',
    width: 100,
    render(row) {
      return h(NBadge, { dot: true, type: row.is_online ? 'success' : 'default', style: { marginRight: '5px' } }, 
        () => h('span', row.is_online ? '在線' : '離線')
      )
    }
  },
  { title: '註冊時間', key: 'register_at', width: 180 },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    fixed: 'right',
    render(row) {
      return h(NSpace, {}, { default: () => [
        h(NButton, { size: 'small', secondary: true, onClick: () => router.push(`/admin/players/${row.id}`) }, 
          { icon: () => h(EyeOutline) }),
        h(NButton, { size: 'small', secondary: true, onClick: () => message.info('跳轉到資產紀錄') }, 
          { icon: () => h(ListOutline) }),
        h(NButton, { size: 'small', secondary: true, onClick: () => message.info('跳轉到遊戲紀錄') }, 
          { icon: () => h(GameControllerOutline) })
      ]})
    }
  }
]

const fetchData = async () => {
  loading.value = true
  try {
    const res = await playerApi.getPlayers(searchForm)
    if (res.code === 0 && res.data) {
      players.value = res.data.items
      pagination.itemCount = res.data.total
    } else {
      message.error(res.msg)
    }
  } catch (err) {
    message.error('載入失敗')
  } finally {
    loading.value = false
  }
}

// Create Player Modal
const showCreateModal = ref(false)
const createFormRef = ref(null)
const createModel = reactive({
  username: '',
  display_name: '',
  tags: ['測試帳號'] // Default to Test Account name if exists, relying on strings now
})

const handleCreate = async () => {
    if(!createModel.username || !createModel.display_name) {
        message.warning('請填寫必填欄位')
        return
    }
    
    try {
        const res = await playerApi.createPlayer({
            username: createModel.username,
            display_name: createModel.display_name,
            tags: createModel.tags
        })
        if(res.code === 0) {
            message.success('玩家建立成功')
            showCreateModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('建立失敗')
    }
}

onMounted(() => {
  fetchTagOptions()
  fetchData()
})
</script>

<template>
  <div class="p-6">
    <NCard title="玩家管理" class="mb-6">
      <template #header-extra>
        <div class="flex gap-2">
            <NButton secondary @click="showTagDrawer = true">
                <template #icon><PricetagOutline /></template>
                標籤管理
            </NButton>
            <NButton type="primary" @click="showCreateModal = true">
                <template #icon><AddOutline /></template>
                新增玩家 (測試)
            </NButton>
        </div>
      </template>
      
      <NForm inline :model="searchForm" label-placement="left" class="flex-wrap gap-4">
        <NFormItem label="搜尋">
          <NInput v-model:value="searchForm.q" placeholder="ID / 帳號 / 手機" />
        </NFormItem>
        <NFormItem label="狀態">
          <NSelect v-model:value="searchForm.status" :options="statusOptions" placeholder="全部" clearable style="width: 120px" />
        </NFormItem>
        <NFormItem label="標籤">
          <NSelect v-model:value="searchForm.tags" :options="tagOptions" multiple placeholder="全部" clearable style="width: 180px" />
        </NFormItem>
        <NFormItem>
          <NButton type="primary" attr-type="button" @click="fetchData">
            <template #icon><SearchOutline /></template>
            搜尋
          </NButton>
        </NFormItem>
      </NForm>
    </NCard>

    <NDataTable
        remote
        :loading="loading"
        :columns="columns"
        :data="players"
        :pagination="pagination"
        :bordered="false"
        :single-line="false"
    />
    
    <!-- Create Modal -->
    <NModal v-model:show="showCreateModal" preset="card" title="新增測試帳號" style="width: 500px">
        <NForm ref="createFormRef" :model="createModel" label-placement="left" label-width="80">
            <NFormItem label="帳號" path="username" required>
                <NInput v-model:value="createModel.username" placeholder="請輸入帳號" />
            </NFormItem>
            <NFormItem label="顯示名稱" path="display_name" required>
                <NInput v-model:value="createModel.display_name" placeholder="請輸入暱稱" />
            </NFormItem>
            <NFormItem label="標籤">
                <NSelect v-model:value="createModel.tags" multiple :options="tagOptions" />
            </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showCreateModal = false">取消</NButton>
                <NButton type="primary" @click="handleCreate">建立</NButton>
            </div>
        </template>
    </NModal>

    <!-- Tag Drawer -->
    <TagManagementDrawer v-model:show="showTagDrawer" @change="fetchTagOptions" />
  </div>
</template>
