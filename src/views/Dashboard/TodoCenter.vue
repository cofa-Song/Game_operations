<template>
    <div class="todo-center-container">
        <n-space vertical size="large">
            <!-- Header -->
            <n-card>
                <n-space justify="space-between" align="center">
                    <n-text h2 style="margin: 0">
                        <n-icon><speedometer-icon /></n-icon>
                        待辦審核中心 (Todo Center)
                    </n-text>

                    <n-space align="center">
                        <n-text depth="3">最後更新: {{ lastUpdated }}</n-text>
                        <n-button 
                            type="primary" 
                            secondary 
                            circle 
                            :loading="loading" 
                            :disabled="isInCooldown"
                            @click="handleManualRefresh"
                        >
                            <template #icon><n-icon><refresh-icon /></n-icon></template>
                        </n-button>
                    </n-space>
                </n-space>
            </n-card>

            <!-- Todo Cards Grid -->
            <n-grid x-gap="16" y-gap="16" :cols="4" item-responsive>
                
                <!-- Finance Section -->
                <n-gi v-if="hasFinancePermission">
                    <n-card 
                        class="todo-card" 
                        :class="{ 'status-warn': stats.pendingDeposits > 0 }"
                        hoverable 
                        @click="navigateTo('/finance/deposit-orders', { status: 'pending' })"
                    >
                        <n-statistic label="儲值待補單">
                            <template #prefix>
                                <n-icon><card-icon /></n-icon>
                            </template>
                            {{ stats.pendingDeposits }}
                        </n-statistic>
                        <div class="card-action">
                            <n-text depth="3" class="text-xs">點擊前往處理 >></n-text>
                        </div>
                    </n-card>
                </n-gi>

                <n-gi v-if="hasFinancePermission">
                    <n-card 
                        class="todo-card" 
                        :class="{ 'status-warn': stats.pendingWithdrawals > 0 }"
                        hoverable
                        @click="navigateTo('/finance/withdraw-audit', { status: 'pending' })"
                    >
                        <n-statistic label="提款待審核">
                            <template #prefix>
                                <n-icon><cash-icon /></n-icon>
                            </template>
                            {{ stats.pendingWithdrawals }}
                        </n-statistic>
                        <div class="card-action">
                            <n-text depth="3" class="text-xs">點擊前往處理 >></n-text>
                        </div>
                    </n-card>
                </n-gi>

                <!-- Risk Section -->
                <n-gi v-if="hasRiskPermission">
                    <n-card 
                        class="todo-card" 
                        :class="{ 'status-danger': stats.riskAlerts > 0 }"
                        hoverable
                        @click="navigateTo('/risk/alerts', { status: 'unresolved' })"
                    >
                        <n-statistic label="異常行為預警" label-class="risk-alert-label">
                            <template #prefix>
                                <n-icon><alert-circle-icon /></n-icon>
                            </template>
                            {{ stats.riskAlerts }}
                        </n-statistic>
                        <div class="card-action">
                            <n-tag type="error" size="small" v-if="stats.riskAlerts > 0">High Risk</n-tag>
                            <n-text depth="3" class="text-xs" v-else>系統監控中</n-text>
                        </div>
                    </n-card>
                </n-gi>

                <!-- System Health -->
                <n-gi>
                    <n-card 
                        class="todo-card"
                        :class="{ 'status-danger': stats.apiHealth.status !== 'healthy' }"
                    >
                        <n-statistic label="系統健康度">
                            <template #prefix>
                                <n-icon><pulse-icon /></n-icon>
                            </template>
                            <span :class="healthClass">{{ healthText }}</span>
                        </n-statistic>
                        <div class="card-action">
                             <n-popover trigger="hover" v-if="stats.apiHealth.failedServices.length > 0">
                                <template #trigger>
                                    <n-tag type="error" size="small">異常檢測</n-tag>
                                </template>
                                <span>{{ stats.apiHealth.failedServices.join(', ') }}</span>
                            </n-popover>
                            <n-text depth="3" class="text-xs" v-else>All Systems Operational</n-text>
                        </div>
                    </n-card>
                </n-gi>

                 <!-- CCU -->
                <n-gi>
                     <n-card class="todo-card status-neutral">
                        <n-statistic label="即時在線 (CCU)">
                            <template #prefix>
                                <n-icon><people-icon /></n-icon>
                            </template>
                            {{ stats.ccu.toLocaleString() }}
                        </n-statistic>
                         <div class="card-action">
                            <n-text depth="3" class="text-xs">實時更新</n-text>
                        </div>
                    </n-card>
                </n-gi>

            </n-grid>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, NSpace, NCard, NGrid, NGi, NStatistic, NIcon, NButton, NText, NTag, NPopover } from 'naive-ui'
import { 
    SpeedometerOutline as SpeedometerIcon,
    Refresh as RefreshIcon,
    CardOutline as CardIcon,
    CashOutline as CashIcon,
    AlertCircleOutline as AlertCircleIcon,
    PulseOutline as PulseIcon,
    PeopleOutline as PeopleIcon
} from '@vicons/ionicons5'
import { dashboardApi, TodoStats } from '@/api/dashboard'
import { useAuthStore } from '@/stores/useAuthStore'

const updateInterval = 30000 // 30s
const cooldownTime = 5000 // 5s

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

// State
const loading = ref(false)
const isInCooldown = ref(false)
const lastUpdated = ref('')
const stats = ref<TodoStats>({
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    riskAlerts: 0,
    apiHealth: { status: 'healthy', failedServices: [] },
    ccu: 0
})

let timer: number | null = null

// Permissions
const hasFinancePermission = computed(() => {
    const role = authStore.user?.role
    return ['DEVELOPER', 'MANAGER', 'FINANCE'].includes(role || '')
})

const hasRiskPermission = computed(() => {
    const role = authStore.user?.role
    // Assuming RISK role or Manager
    return ['DEVELOPER', 'MANAGER', 'RISK'].includes(role || '')
})

// Visual Helpers
const healthText = computed(() => {
    if (stats.value.apiHealth.status === 'healthy') return '正常'
    if (stats.value.apiHealth.status === 'degraded') return '部分異常'
    return '服務中斷'
})

const healthClass = computed(() => {
    if (stats.value.apiHealth.status === 'healthy') return 'text-success'
    return 'text-danger'
})

// Methods
const fetchData = async (isAuto = false) => {
    if (!isAuto) loading.value = true
    try {
        const res = await dashboardApi.getTodoStats()
        if (res.code === 0 && res.data) {
            stats.value = res.data
            lastUpdated.value = new Date().toLocaleTimeString()
        }
    } catch (e) {
        message.error('數據更新失敗')
    } finally {
        if (!isAuto) loading.value = false
    }
}

const handleManualRefresh = () => {
    if (isInCooldown.value) return
    
    fetchData()
    isInCooldown.value = true
    setTimeout(() => {
        isInCooldown.value = false
    }, cooldownTime)
}

const navigateTo = (path: string, query?: Record<string, string>) => {
    router.push({ path, query })
}

// Lifecycle
onMounted(() => {
    fetchData()
    timer = window.setInterval(() => fetchData(true), updateInterval)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})

</script>

<style scoped>
.todo-center-container {
    padding: 24px;
}
.todo-card {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-left: 4px solid #e0e0e0;
}
.todo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.status-warn {
    border-left-color: #f0a020;
}
.status-danger {
    border-left-color: #d03050;
    background-color: #fff0f0;
}
.status-neutral {
    border-left-color: #2080f0;
}

.card-action {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
}

.text-xs {
    font-size: 12px;
}
.text-success { color: #18a058; }
.text-danger { color: #d03050; }

/* Dark mode styling for risk alert label and value */
.dark :deep(.risk-alert-label) {
    color: #dc2626 !important;
    font-weight: 600;
}

.dark :deep(.n-statistic .risk-alert-label) {
    color: #dc2626 !important;
}

.dark .status-danger :deep(.n-statistic__label),
.dark .status-danger :deep(.n-statistic-value__content) {
    color: #dc2626 !important;
    font-weight: 600;
}

.dark .status-danger :deep(.n-statistic-value i),
.dark .status-danger :deep(.n-statistic-value .n-icon) {
    color: #dc2626 !important;
}
</style>
