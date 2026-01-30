```
<script setup lang="ts">
import { ref, reactive, onMounted, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  NCard, NInput, NSelect, NDatePicker, NButton, NDataTable, NSpace, NTag,
  NBadge, NModal, NForm, NFormItem, useMessage, DataTableColumns, NRadioGroup, NRadio 
} from 'naive-ui'
import { 
  SearchOutline, AddOutline, EyeOutline, ListOutline, GameControllerOutline, PricetagOutline 
} from '@vicons/ionicons5'
import { playerApi } from '@/api/player'
import { tagApi } from '@/api/tag'
import { Player, PlayerSearchParams } from '@/types/player'
import { SelectOption } from 'naive-ui'
import TagManagementDrawer from './TagManagementDrawer.vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const message = useMessage()
const { t } = useI18n()

// Search State
const searchForm = reactive<PlayerSearchParams>({
  q: '',
  search_type: 'id',
  affiliation_type: 'invite_code', // Default to invite_code
  affiliation_query: '',
  status: undefined,
  tags: undefined,
  register_date_start: undefined,
  register_date_end: undefined,
  page: 1,
  page_size: 10
})

const registerDateRange = ref<[number, number] | null>(null)

const statusOptions = computed(() => [
  { label: t('player.status.ACTIVE'), value: 'ACTIVE' },
  { label: t('player.status.LOCKED'), value: 'LOCKED' },
  { label: t('player.status.FROZEN'), value: 'FROZEN' },
  { label: t('player.status.SUSPENDED'), value: 'SUSPENDED' }
])

const tagOptions = ref<SelectOption[]>([])
const showTagDrawer = ref(false)

// Function to fetch tags for dropdowns
const fetchTagOptions = async () => {
    try {
        const res = await tagApi.getTags()
        if (res.code === 0) {
            // Only show ACTIVE tags in dropdowns, formatted with translation if available
            tagOptions.value = res.data
                .filter(t => t.status === 'ACTIVE')
                .map(tag => ({ 
                    label: t(`player.tags.${tag.name}`, tag.name), // Try translate, fallback to name
                    value: tag.name 
                }))
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

const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const columns = computed<DataTableColumns<Player>>(() => [
  { title: t('player.list.id'), key: 'id', width: 120 },
  { title: t('player.list.username'), key: 'username', width: 150 },
  { title: t('player.list.displayName'), key: 'display_name', width: 150 },
  { 
    title: t('player.list.tags'), 
    key: 'tags',
    render(row) {
      return row.tags.map(tag => {
        const translatedTag = t(`player.tags.${tag}`, tag)
        return h(NTag, { style: { marginRight: '6px' }, type: tag === 'TEST' ? 'warning' : 'default' }, { default: () => translatedTag })
      })
    }
  },
  { 
    title: t('navigation.rtp'),
    key: 'rtp',
    width: 100,
    render(row) {
      if (row.rtp === undefined) return '-'
      return h(
        'span', 
        { class: row.rtp < 100 ? 'text-green-600' : 'text-red-600' }, 
        `${row.rtp}%`
      )
    }
  },
  { 
    title: t('navigation.vipLevel'),
    key: 'vip_level',
    width: 100
  },
  { 
    title: t('player.list.accountStatus'), 
    key: 'status',
    width: 100,
    render(row) {
      const typeMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
        'ACTIVE': 'success',
        'LOCKED': 'warning',
        'FROZEN': 'info',
        'SUSPENDED': 'error'
      }
      return h(NTag, { type: typeMap[row.status] || 'default', bordered: false }, { default: () => t(`player.status.${row.status}`) })
    }
  },
  {
    title: t('player.list.onlineStatus'),
    key: 'is_online',
    width: 100,
    render(row) {
      return h(NBadge, { dot: true, type: row.is_online ? 'success' : 'default', style: { marginRight: '5px' } }, 
        () => h('span', row.is_online ? t('common.online') : t('common.offline'))
      )
    }
  },
  { 
    title: t('player.list.registerAt'), 
    key: 'register_at', 
    width: 180,
    render(row) {
      return formatDate(row.register_at)
    }
  },
  {
    title: t('common.action'),
    key: 'actions',
    width: 200,
    fixed: 'right',
    render(row) {
      return h(NSpace, {}, { default: () => [
        h(NButton, { size: 'small', secondary: true, onClick: () => router.push(`/admin/players/${row.id}`) }, 
          { icon: () => h(EyeOutline) }),
        h(NButton, { size: 'small', secondary: true, onClick: () => message.info(t('player.list.jumpToAssetLog')) }, 
          { icon: () => h(ListOutline) }),
        h(NButton, { size: 'small', secondary: true, onClick: () => message.info(t('player.list.jumpToGameLog')) }, 
          { icon: () => h(GameControllerOutline) })
      ]})
    }
  }
])

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
    message.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// Create Player Modal
const showCreateModal = ref(false)
const createModel = reactive({
  username: '',
  display_name: '',
  tags: ['測試帳號'] // Default to Test Account name if exists, relying on strings now
})

const handleCreate = async () => {
    if(!createModel.username || !createModel.display_name) {
        message.warning(t('common.fillRequired'))
        return
    }
    
    try {
        const res = await playerApi.createPlayer({
            username: createModel.username,
            display_name: createModel.display_name,
            tags: createModel.tags
        })
        if(res.code === 0) {
            message.success(t('player.list.createSuccess'))
            showCreateModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error(t('player.list.createFailed'))
    }
}

onMounted(() => {
  fetchTagOptions()
  fetchData()
})
</script>

<template>
  <div class="p-6">
    <NCard :title="t('navigation.playerManagement')" class="mb-6">
      <template #header-extra>
        <div class="flex gap-2">
            <NButton secondary @click="showTagDrawer = true">
                <template #icon><PricetagOutline /></template>
                {{ t('player.list.tagManagement') }}
            </NButton>
            <NButton type="primary" @click="showCreateModal = true">
                <template #icon><AddOutline /></template>
                {{ t('player.list.addTestPlayer') }}
            </NButton>
        </div>
      </template>
      
      <NForm inline :model="searchForm" label-placement="left" class="flex-wrap gap-4 mt-4">
        <NFormItem :label="t('common.search')">
            <div class="relative">
                <NRadioGroup v-model:value="searchForm.search_type" name="searchType" size="small" class="absolute -top-7 left-0 whitespace-nowrap">
                    <NRadio value="id">{{ t('common.id') }}</NRadio>
                    <NRadio value="username">{{ t('auth.username') }}</NRadio>
                    <NRadio value="phone">{{ t('common.phone') }}</NRadio>
                </NRadioGroup>
                <NInput v-model:value="searchForm.q" :placeholder="t('common.keywordPlaceholder')" />
            </div>
        </NFormItem>
        <NFormItem :label="t('navigation.affiliation')">
            <div class="relative">
                <NRadioGroup v-model:value="searchForm.affiliation_type" name="affiliationType" size="small" class="absolute -top-7 left-0 whitespace-nowrap">
                    <NRadio value="invite_code">{{ t('navigation.inviteCode') }}</NRadio>
                    <NRadio value="referrer_id">{{ t('navigation.referrerId') }}</NRadio>
                </NRadioGroup>
                <NInput v-model:value="searchForm.affiliation_query" :placeholder="t('common.inputPlaceholder')" />
            </div>
        </NFormItem>
        <NFormItem :label="t('common.status')">
          <NSelect v-model:value="searchForm.status" :options="statusOptions" :placeholder="t('common.all')" clearable style="width: 120px" />
        </NFormItem>
        <NFormItem :label="t('player.list.tags')">
          <NSelect v-model:value="searchForm.tags" :options="tagOptions" multiple :placeholder="t('common.all')" clearable style="width: 180px" />
        </NFormItem>
        <NFormItem :label="t('player.list.registerIp')">
            <NInput v-model:value="searchForm.register_ip" :placeholder="t('common.keywordPlaceholder')" style="width: 150px" />
        </NFormItem>
        <NFormItem :label="t('player.list.registerDate')">
            <NDatePicker 
                v-model:value="registerDateRange" 
                type="daterange" 
                clearable 
                @update:value="([start, end]: [number, number]) => {
                    searchForm.register_date_start = start ? new Date(start).toISOString() : undefined
                    searchForm.register_date_end = end ? new Date(end).toISOString() : undefined
                }"
            />
        </NFormItem>
        <NFormItem>
          <NButton type="primary" attr-type="button" @click="fetchData">
            <template #icon><SearchOutline /></template>
            {{ t('common.search') }}
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
    <NModal v-model:show="showCreateModal" preset="card" :title="t('player.list.addTestAccount')" style="width: 500px">
        <NForm ref="createFormRef" :model="createModel" label-placement="left" label-width="80">
            <NFormItem :label="t('auth.username')" path="username" required>
                <NInput v-model:value="createModel.username" :placeholder="t('auth.username')" />
            </NFormItem>
            <NFormItem :label="t('player.list.displayName')" path="display_name" required>
                <NInput v-model:value="createModel.display_name" :placeholder="t('player.list.nicknamePlaceholder')" />
            </NFormItem>
            <NFormItem :label="t('player.list.tags')">
                <NSelect v-model:value="createModel.tags" multiple :options="tagOptions" />
            </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showCreateModal = false">{{ t('common.cancel') }}</NButton>
                <NButton type="primary" @click="handleCreate">{{ t('common.create') }}</NButton>
            </div>
        </template>
    </NModal>

    <!-- Tag Drawer -->
    <TagManagementDrawer v-model:show="showTagDrawer" @change="fetchTagOptions" />
  </div>
</template>
