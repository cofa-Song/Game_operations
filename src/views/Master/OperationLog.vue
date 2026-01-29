<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  NCard,
  NButton,
  NTable,
  NTag,
  NSelect,
  NDatePicker,
  NIcon,
  NModal,
  NTabs,
  NTabPane,
  NSpin,
  NAlert,
  NPagination
} from 'naive-ui'
import { VisibilityOutlined as EyeIcon } from '@vicons/material'
import { useAuthStore } from '@/stores/useAuthStore'
import { mockOperationLogs } from '@/mocks/admin'
import type { OperationLog } from '@/types'

const EyeOutline = EyeIcon

const authStore = useAuthStore()

// 數據狀態
const logs = ref<OperationLog[]>([...mockOperationLogs].reverse()) // 最新的在前
const loading = ref(false)

// 篩選條件
const filters = reactive({
  startDate: null as number | null,
  endDate: null as number | null,
  operatorUsername: '',
  module: '',
  operationType: ''
})

// 彈窗狀態
const showDetailModal = ref(false)
const selectedLog = ref<OperationLog | null>(null)
const detailTab = ref('json')

// 分頁
const pagination = reactive({
  page: 1,
  pageSize: 20
})

// 操作類型選項
const operationTypeOptions = [
  { label: '全部', value: '' },
  { label: '新增 (Create)', value: 'CREATE' },
  { label: '修改 (Update)', value: 'UPDATE' },
  { label: '刪除 (Delete)', value: 'DELETE' },
  { label: '登入', value: 'LOGIN' },
  { label: '登出', value: 'LOGOUT' }
]

// 模組選項
const moduleOptions = computed(() => {
  const modules = new Set(logs.value.map(l => l.module))
  return [
    { label: '全部', value: '' },
    ...Array.from(modules)
      .sort()
      .map(m => ({ label: m, value: m }))
  ]
})

// 操作人選項
const operatorOptions = computed(() => {
  const operators = new Set(logs.value.map(l => l.operator_username))
  return [
    { label: '全部', value: '' },
    ...Array.from(operators)
      .sort()
      .map(op => ({ label: op, value: op }))
  ]
})

// 過濾後的日誌列表
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    // 日期篩選
    if (filters.startDate) {
      const logDate = new Date(log.timestamp).getTime()
      if (logDate < filters.startDate) return false
    }
    if (filters.endDate) {
      const logDate = new Date(log.timestamp).getTime()
      if (logDate > filters.endDate) return false
    }

    // 操作人篩選
    if (filters.operatorUsername && log.operator_username !== filters.operatorUsername) {
      return false
    }

    // 模組篩選
    if (filters.module && log.module !== filters.module) {
      return false
    }

    // 操作類型篩選
    if (filters.operationType && log.operation_type !== filters.operationType) {
      return false
    }

    // 權限過濾：一般使用者只能看自己權限內的日誌
    if (authStore.user?.role === 'USER') {
      // 簡化：一般使用者只能看自己的日誌
      if (log.operator_id !== authStore.user.user_id) {
        return false
      }
    }

    return true
  })
})

// 分頁後的數據
const paginatedLogs = computed(() => {
  const start = (pagination.page - 1) * pagination.pageSize
  return filteredLogs.value.slice(start, start + pagination.pageSize)
})

// 取得操作類型的顏色
const getOperationTypeColor = (type: string) => {
  switch (type) {
    case 'CREATE':
      return 'success'
    case 'UPDATE':
      return 'warning'
    case 'DELETE':
      return 'error'
    case 'LOGIN':
      return 'info'
    case 'LOGOUT':
      return 'default'
    default:
      return 'default'
  }
}

// 取得操作結果的顏色
const getResultColor = (result: string) => {
  return result === 'SUCCESS' ? 'success' : 'error'
}

// 取得角色的顏色
const getRoleColor = (role: string) => {
  switch (role) {
    case 'DEVELOPER':
      return 'error'
    case 'MANAGER':
      return 'warning'
    case 'USER':
      return 'default'
    default:
      return 'default'
  }
}

// 打開詳情彈窗
const handleViewDetail = (log: OperationLog) => {
  selectedLog.value = log
  showDetailModal.value = true
  detailTab.value = 'json'
}

// 格式化日誌數據為表格
const formatLogAsTable = (log: OperationLog): Array<{ field: string; oldValue: string; newValue: string }> => {
  const rows: Array<{ field: string; oldValue: string; newValue: string }> = []

  if (log.old_value) {
    Object.entries(log.old_value).forEach(([key, value]) => {
      rows.push({
        field: key,
        oldValue: JSON.stringify(value),
        newValue: log.new_value?.[key] ? JSON.stringify(log.new_value[key]) : '-'
      })
    })
  }

  if (log.new_value && log.operation_type === 'CREATE') {
    Object.entries(log.new_value).forEach(([key, value]) => {
      if (!log.old_value || !(key in log.old_value)) {
        rows.push({
          field: key,
          oldValue: '-',
          newValue: JSON.stringify(value)
        })
      }
    })
  }

  return rows
}

// 重置篩選
const handleResetFilters = () => {
  filters.startDate = null
  filters.endDate = null
  filters.operatorUsername = ''
  filters.module = ''
  filters.operationType = ''
  pagination.page = 1
}
</script>

<template>
  <div class="p-6 space-y-4">
    <!-- 頁面標題 -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">後台操作日誌</h1>
      <p class="text-gray-600 mt-1">查詢和審計所有管理員操作記錄</p>
    </div>

    <!-- 權限提示 -->
    <NAlert
      v-if="authStore.user?.role === 'USER'"
      type="info"
    >
      您作為一般使用者，只能查看自己的操作日誌。
    </NAlert>

    <!-- 篩選區 -->
    <NCard title="篩選條件" :bordered="false">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-2">
            開始日期
          </label>
          <NDatePicker
            v-model:value="filters.startDate"
            type="datetime"
            clearable
            placeholder="選擇開始日期"
          />
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-2">
            結束日期
          </label>
          <NDatePicker
            v-model:value="filters.endDate"
            type="datetime"
            clearable
            placeholder="選擇結束日期"
          />
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-2">
            操作人員
          </label>
          <NSelect
            v-model:value="filters.operatorUsername"
            :options="operatorOptions"
            filterable
          />
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-2">
            功能模組
          </label>
          <NSelect
            v-model:value="filters.module"
            :options="moduleOptions"
            filterable
          />
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-2">
            操作類型
          </label>
          <NSelect
            v-model:value="filters.operationType"
            :options="operationTypeOptions"
          />
        </div>
      </div>

      <div class="flex gap-3 mt-4">
        <NButton type="primary" ghost @click="handleResetFilters">
          重置篩選
        </NButton>
        <p class="text-sm text-gray-600 leading-10">
          找到 <span class="font-semibold">{{ filteredLogs.length }}</span> 筆操作記錄
        </p>
      </div>
    </NCard>

    <!-- 日誌列表 -->
    <NCard :bordered="false">
      <NSpin :show="loading">
        <table class="min-w-full border-collapse border border-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th class="border border-gray-300 px-4 py-2 text-left w-20">日誌編號</th>
              <th class="border border-gray-300 px-4 py-2 text-left w-40">操作時間</th>
              <th class="border border-gray-300 px-4 py-2 text-left w-28">操作者</th>
              <th class="border border-gray-300 px-4 py-2 text-left w-24">身份</th>
              <th class="border border-gray-300 px-4 py-2 text-left w-28">功能模組</th>
              <th class="border border-gray-300 px-4 py-2 text-left w-24">操作類型</th>
              <th class="border border-gray-300 px-4 py-2 text-left w-20">執行結果</th>
              <th class="border border-gray-300 px-4 py-2 text-center w-16">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in paginatedLogs" :key="row.id" class="border border-gray-300 hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">
                <span class="font-mono text-sm">{{ row.id }}</span>
              </td>
              <td class="border border-gray-300 px-4 py-2">{{ row.timestamp }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <span class="font-semibold">{{ row.operator_username }}</span>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <NTag :type="getRoleColor(row.operator_role)">
                  {{
                    row.operator_role === 'DEVELOPER'
                      ? '技術開發'
                      : row.operator_role === 'MANAGER'
                        ? '營運總監'
                        : '一般使用者'
                  }}
                </NTag>
              </td>
              <td class="border border-gray-300 px-4 py-2">{{ row.module }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <NTag :type="getOperationTypeColor(row.operation_type)">
                  {{
                    row.operation_type === 'CREATE'
                      ? '新增'
                      : row.operation_type === 'UPDATE'
                        ? '修改'
                        : row.operation_type === 'DELETE'
                          ? '刪除'
                          : row.operation_type === 'LOGIN'
                            ? '登入'
                            : row.operation_type === 'LOGOUT'
                              ? '登出'
                              : row.operation_type
                  }}
                </NTag>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <NTag :type="getResultColor(row.result)">
                  {{ row.result === 'SUCCESS' ? '成功' : '失敗' }}
                </NTag>
              </td>
              <td class="border border-gray-300 px-4 py-2 text-center">
                <NButton
                  text
                  type="primary"
                  size="small"
                  @click="handleViewDetail(row)"
                >
                  <template #icon>
                    <NIcon size="18">
                      <EyeOutline />
                    </NIcon>
                  </template>
                </NButton>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 分頁 -->
        <div class="flex justify-end mt-4">
          <NPagination
            v-model:page="pagination.page"
            :page-size="pagination.pageSize"
            :page-count="Math.ceil(filteredLogs.length / pagination.pageSize)"
          />
        </div>
      </NSpin>
    </NCard>

    <!-- 詳情彈窗 -->
    <NModal
      v-model:show="showDetailModal"
      title="操作詳情"
      preset="dialog"
      size="large"
      class="max-h-[90vh]"
    >
      <NSpin v-if="selectedLog" :show="loading">
        <NTabs v-model:value="detailTab" type="line">
          <!-- JSON 格式 -->
          <NTabPane name="json" tab="JSON 格式">
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <p class="text-sm font-semibold text-gray-700 mb-2">操作時間：</p>
                <p>{{ selectedLog.timestamp }}</p>
              </div>

              <div>
                <p class="text-sm font-semibold text-gray-700 mb-2">
                  操作者資訊：
                </p>
                <div class="bg-gray-100 p-3 rounded text-sm font-mono">
                  {{ JSON.stringify({
                    operator_id: selectedLog.operator_id,
                    operator_username: selectedLog.operator_username,
                    operator_role: selectedLog.operator_role,
                    source_ip: selectedLog.source_ip
                  }, null, 2) }}
                </div>
              </div>

              <div v-if="selectedLog.old_value">
                <p class="text-sm font-semibold text-gray-700 mb-2">修改前：</p>
                <div class="bg-red-50 p-3 rounded text-sm font-mono whitespace-pre-wrap break-words">
                  {{ JSON.stringify(selectedLog.old_value, null, 2) }}
                </div>
              </div>

              <div v-if="selectedLog.new_value">
                <p class="text-sm font-semibold text-gray-700 mb-2">修改後：</p>
                <div class="bg-green-50 p-3 rounded text-sm font-mono whitespace-pre-wrap break-words">
                  {{ JSON.stringify(selectedLog.new_value, null, 2) }}
                </div>
              </div>

              <div v-if="selectedLog.error_reason">
                <p class="text-sm font-semibold text-gray-700 mb-2">
                  錯誤原因：
                </p>
                <div class="bg-red-100 p-3 rounded text-sm text-red-800">
                  {{ selectedLog.error_reason }}
                </div>
              </div>
            </div>
          </NTabPane>

          <!-- 對照表格式 -->
          <NTabPane name="table" tab="對照表格式">
            <NTable
              :columns="[
                { title: '欄位', key: 'field' },
                { title: '修改前', key: 'oldValue' },
                { title: '修改後', key: 'newValue' }
              ]"
              :data="formatLogAsTable(selectedLog)"
              size="small"
            />
          </NTabPane>

          <!-- 基本資訊 -->
          <NTabPane name="info" tab="基本資訊">
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-700">日誌編號：</span>
                <span class="font-mono">{{ selectedLog.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">操作模組：</span>
                <span>{{ selectedLog.module }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">操作類型：</span>
                <NTag :type="getOperationTypeColor(selectedLog.operation_type)">
                  {{
                    selectedLog.operation_type === 'CREATE'
                      ? '新增'
                      : selectedLog.operation_type === 'UPDATE'
                        ? '修改'
                        : selectedLog.operation_type === 'DELETE'
                          ? '刪除'
                          : selectedLog.operation_type
                  }}
                </NTag>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">執行結果：</span>
                <NTag :type="getResultColor(selectedLog.result)">
                  {{ selectedLog.result === 'SUCCESS' ? '成功' : '失敗' }}
                </NTag>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">來源 IP：</span>
                <span class="font-mono">{{ selectedLog.source_ip }}</span>
              </div>
              <div v-if="selectedLog.user_agent" class="flex justify-between">
                <span class="text-gray-700">User-Agent：</span>
                <span class="text-xs">{{ selectedLog.user_agent }}</span>
              </div>
            </div>
          </NTabPane>
        </NTabs>
      </NSpin>
    </NModal>
  </div>
</template>

<style scoped>
:deep(.n-card) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

:deep(.n-modal) {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}
</style>
