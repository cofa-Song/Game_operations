<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  NCard, NTabs, NTabPane, NGrid, NGridItem, NDescriptions, NDescriptionsItem,
  NTag, NButton, NSpace, NAvatar, NStatistic, NList, NListItem, NThing,
  NModal, NForm, NFormItem, NInput, NSelect, NSwitch, useMessage,
  NProgress, NDivider, NDatePicker, NInputNumber
} from 'naive-ui'
import { 
  WalletOutline, AlertCircleOutline
} from '@vicons/ionicons5'
import { playerApi } from '@/api/player'
import { Player, PlayerAuditLog, UpdatePlayerRequest, PlayerStatus } from '@/types/player'
import { RolloverEngine } from '@/mocks/engine'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { t } = useI18n()
import { computed } from 'vue' // Ensure computed is imported if not already

const playerId = route.params.id as string
const player = ref<Player | null>(null)
// ... existing refs ...

const auditLogs = ref<PlayerAuditLog[]>([])
const loading = ref(false)

// Edit State
const showEditModal = ref(false)
const editModel = reactive<UpdatePlayerRequest>({})

// Status Change State
const showStatusModal = ref(false)
const statusModel = reactive({
  status: 'ACTIVE' as PlayerStatus,
  reason: '',
  forceKick: false
})
const statusOptions = [
  { label: '正常', value: 'ACTIVE' },
  { label: '鎖定', value: 'LOCKED' },
  { label: '凍結', value: 'FROZEN' },
  { label: '停權', value: 'SUSPENDED' }
]

const genderOptions = computed(() => [
    { label: t('player.gender.MALE'), value: 'MALE' },
    { label: t('player.gender.FEMALE'), value: 'FEMALE' },
    { label: t('player.gender.UNKNOWN'), value: 'UNKNOWN' }
])

// Abandon Bonus State
const showAbandonModal = ref(false)
const abandonReason = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const res = await playerApi.getPlayerDetail(playerId)
    if (res.code === 0 && res.data) {
      player.value = res.data
    } else {
      message.error(res.msg)
      router.push('/admin/players')
    }
    
    // Fetch Audit Logs
    const logRes = await playerApi.getAuditLogs(playerId)
    if (logRes.code === 0 && logRes.data) {
        auditLogs.value = logRes.data
    }
  } catch (err) {
    message.error('載入失敗')
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
    if (!player.value) return
    editModel.display_name = player.value.display_name
    editModel.phone = player.value.phone
    editModel.is_muted = player.value.is_muted
    editModel.is_gift_disabled = player.value.is_gift_disabled
    editModel.gender = player.value.gender
    editModel.birthday = player.value.birthday
    editModel.email = player.value.email
    editModel.vip_level = player.value.vip_level
    editModel.is_retention_active = player.value.is_retention_active
    showEditModal.value = true
}

const submitEdit = async () => {
    try {
        const res = await playerApi.updatePlayer(playerId, editModel, 'Admin Edit')
        if (res.code === 0) {
            message.success('更新成功')
            showEditModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('更新失敗')
    }
}

const handleStatusChange = () => {
    if (!player.value) return
    statusModel.status = player.value.status
    statusModel.reason = ''
    statusModel.forceKick = false
    showStatusModal.value = true
}

const submitStatusChange = async () => {
    if (!statusModel.reason) {
        message.warning('請填寫異動原因')
        return
    }
    try {
        const res = await playerApi.updatePlayerStatus(playerId, statusModel.status, statusModel.reason, statusModel.forceKick)
        if (res.code === 0) {
            message.success('狀態更新成功')
            showStatusModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('狀態更新失敗')
    }
}

const handleAbandonBonus = () => {
    abandonReason.value = ''
    showAbandonModal.value = true
}

const submitAbandonBonus = async () => {
    if (!abandonReason.value) {
        message.warning('請填寫原因')
        return
    }
    try {
        const res = await playerApi.abandonBonus(playerId, abandonReason.value)
         if (res.code === 0) {
            message.success('已放棄獎勵')
            RolloverEngine.abandonBonus(player.value!) // Sync Mock Logic
            showAbandonModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('操作失敗')
    }
}

const getWalletBalance = (type: string, currency?: string) => {
    if (!player.value) return 0
    const wallet = player.value.wallets.find(w => w.type === type && (!currency || w.currency === currency))
    return wallet ? wallet.balance : 0
}

const formatAmount = (val: number) => {
    return val.toLocaleString()
}


onMounted(() => {
  if (!playerId) {
    router.push('/admin/players')
    return
  }
  fetchData()
})
</script>

<template>
  <div class="p-6" v-if="player">
    <NGrid :x-gap="12" :y-gap="12" cols="1 240:1 800:3">
      <!-- Left Column: Basic Info -->
      <NGridItem span="1">
        <NCard :title="t('player.list.basicInfo')" class="mb-4">
          <div class="flex flex-col items-center mb-6">
            <NAvatar round :size="80" class="mb-2">{{ player.username.substring(0, 1).toUpperCase() }}</NAvatar>
            <div class="text-xl font-bold">{{ player.display_name }}</div>
            <div class="text-gray-500">ID: {{ player.id }}</div>
            <NSpace class="mt-2">
                <NTag :type="player.status === 'ACTIVE' ? 'success' : 'error'">{{ player.status }}</NTag>
                <NTag v-if="player.is_online" type="success" bordered>ONLINE</NTag>
                <NTag v-else type="default" bordered>OFFLINE</NTag>
            </NSpace>
          </div>
          
          <NDescriptions :column="1" label-placement="left" bordered>
            <NDescriptionsItem label="帳號">{{ player.username }}</NDescriptionsItem>
            <NDescriptionsItem label="手機號碼">{{ player.phone || '-' }}</NDescriptionsItem>
            <NDescriptionsItem label="VIP 等級">LV.{{ player.vip_level }}</NDescriptionsItem>
            <NDescriptionsItem label="推薦人">{{ player.referrer_id || '-' }}</NDescriptionsItem>
            <NDescriptionsItem label="註冊來源">{{ player.register_source }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.gender')">{{ player.gender ? t(`player.gender.${player.gender}`) : '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.birthday')">{{ player.birthday || '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.email')">{{ player.email || '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.registerDate')">{{ player.register_at.split('T')[0] }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.registerIp')">{{ player.register_ip }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.lastLoginDate')">{{ player.last_login_at?.split('T')[0] || '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.lastLoginIp')">{{ player.last_login_ip || '-' }}</NDescriptionsItem>
          </NDescriptions>
          
          <div class="mt-4 flex flex-wrap gap-2">
            <NButton block class="flex-1 min-w-[120px]" type="primary" @click="handleEdit">{{ t('common.editInfo') }}</NButton>
            <NButton block class="flex-1 min-w-[120px]" type="warning" @click="handleStatusChange">{{ t('player.list.statusManagement') }}</NButton>
          </div>
        </NCard>
        
        <NCard title="帳號權限" size="small">
             <NDescriptions :column="1" label-placement="left">
                <NDescriptionsItem label="全服禁言">
                    <NTag :type="player.is_muted ? 'error' : 'success'">{{ player.is_muted ? '開啟' : '關閉' }}</NTag>
                </NDescriptionsItem>
                <NDescriptionsItem label="禁止贈禮">
                    <NTag :type="player.is_gift_disabled ? 'error' : 'success'">{{ player.is_gift_disabled ? '開啟' : '關閉' }}</NTag>
                </NDescriptionsItem>
             </NDescriptions>
        </NCard>
      </NGridItem>
      
      <!-- Right Column: Details Tabs -->
      <NGridItem span="2">
        <NCard content-style="padding: 0;">
          <NTabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
            <NTabPane name="wallet" :tab="t('player.list.walletMonitor')">
              <NGrid cols="2" :x-gap="12" :y-gap="12">
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.depositWallet')">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-blue-500" /></template>
                        <NSpace vertical size="small">
                            <NStatistic :label="t('common.goldBalance')" :value="formatAmount(getWalletBalance('CASH', 'GOLD'))">
                                <template #prefix>$ </template>
                            </NStatistic>
                            <NStatistic :label="t('common.silverBalance')" :value="formatAmount(getWalletBalance('CASH', 'SILVER'))">
                                <template #prefix>$ </template>
                            </NStatistic>
                        </NSpace>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.activityWallet')">
                         <template #header-extra><WalletOutline class="w-5 h-5 text-orange-400" /></template>
                         <NStatistic :label="t('common.silverBalance')" :value="formatAmount(getWalletBalance('BONUS', 'SILVER'))">
                            <template #prefix>$ </template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.gameWallet')">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-yellow-800" /></template>
                        <NStatistic :label="t('common.bronzeBalance')" :value="formatAmount(getWalletBalance('GAME', 'BRONZE'))">
                            <template #prefix>$ </template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.safeWallet')">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-yellow-500" /></template>
                        <NStatistic :label="t('common.balance')" :value="formatAmount(getWalletBalance('SAFE', 'GOLD'))">
                            <template #prefix>$ </template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem class="col-span-2">
                    <NCard size="small" :title="t('player.list.rolloverMonitor')" class="mt-2">
                        <template #header-extra>
                            <NButton size="tiny" type="error" ghost @click="handleAbandonBonus">放棄獎勵</NButton>
                        </template>
                        
                        <div v-if="player.rollover_container?.status === 'ACTIVE'" class="mb-4">
                            <div class="flex justify-between text-xs text-gray-500 mb-1">
                                <span>流水監控 ({{ player.rollover_container.active_card_id }})</span>
                                <span>{{ player.rollover_container.current_wagering }} / {{ player.rollover_container.target_wagering }}</span>
                            </div>
                            <NProgress 
                                type="line" 
                                :percentage="Math.min(100, Math.round((player.rollover_container.current_wagering / player.rollover_container.target_wagering) * 100))" 
                                :color="player.rollover_container.current_wagering >= player.rollover_container.target_wagering ? '#18a058' : '#f0a020'"
                            />
                            <NGrid cols="3" class="mt-3 text-center">
                                <NGridItem>
                                    <div class="text-xs text-gray-400">當前餘額</div>
                                    <div class="text-lg font-bold">$ {{ formatAmount(player.rollover_container.lave_balance) }}</div>
                                </NGridItem>
                                <NGridItem>
                                    <div class="text-xs text-gray-400">初始金額</div>
                                    <div class="text-md">$ {{ formatAmount(player.rollover_container.start_balance) }}</div>
                                </NGridItem>
                                <NGridItem>
                                    <div class="text-xs text-gray-400">轉出上限</div>
                                    <div class="text-md">$ {{ formatAmount(player.rollover_container.cap) }}</div>
                                </NGridItem>
                            </NGrid>
                        </div>
                        <div v-else class="py-8 text-center text-gray-400">
                            <AlertCircleOutline class="w-8 h-8 mb-2 mx-auto op-50" />
                            <div>當前無進行中活動</div>
                        </div>

                        <NDivider class="my-2" />
                        
                        <div class="text-xs font-bold mb-2">待領取列表 (Queue)</div>
                        <NList size="small">
                             <NListItem v-for="card in player.bonus_queue" :key="card.id">
                                 <div class="flex justify-between items-center">
                                     <div>
                                         <NTag size="small" type="warning" class="mr-2">{{ t(`common.${card.currency.toLowerCase()}`) }}</NTag>
                                         <span class="text-xs">{{ card.id }}</span>
                                         <div class="text-xs text-gray-400">
                                            Roll: {{ card.multiplier }}x | Cap: $ {{ formatAmount(card.cap) }} | Exp: {{ card.end_time.split('T')[0] }}
                                         </div>
                                     </div>
                                     <div class="font-bold">$ +{{ formatAmount(card.lave_amount) }}</div>
                                 </div>
                             </NListItem>
                             <NListItem v-if="!player.bonus_queue?.length">
                                 <div class="text-center text-gray-400 text-xs">列表為空</div>
                             </NListItem>
                        </NList>
                    </NCard>
                 </NGridItem>
              </NGrid>
            </NTabPane>
            
            <NTabPane name="audit" tab="異動紀錄">
                <NList>
                    <NListItem v-for="log in auditLogs" :key="log.id">
                        <NThing :title="log.action" :content-style="{ marginTop: '10px' }">
                            <template #description>
                                <NSpace size="small" style="margin-top: 4px">
                                    <NTag size="small" :bordered="false" type="info">{{ log.operator }}</NTag>
                                    <span class="text-xs text-gray-500">{{ log.created_at }}</span>
                                </NSpace>
                            </template>
                            <div v-if="log.old_value || log.new_value" class="text-xs text-gray-500 mb-2">
                                {{ log.old_value }} -> {{ log.new_value }}
                            </div>
                            <div>原因: {{ log.reason }}</div>
                        </NThing>
                    </NListItem>
                </NList>
            </NTabPane>
          </NTabs>
        </NCard>
      </NGridItem>
    </NGrid>
    
    <!-- Modals -->
    <NModal v-model:show="showEditModal" preset="card" title="編輯玩家資料" style="width: 500px">
        <NForm :model="editModel" label-placement="left" label-width="80">
            <NFormItem label="顯示名稱">
                <NInput v-model:value="editModel.display_name" />
            </NFormItem>
            <NFormItem label="手機號碼">
                <NInput v-model:value="editModel.phone" />
            </NFormItem>
            <NFormItem :label="t('player.list.gender')">
                <NSelect v-model:value="editModel.gender" :options="genderOptions" />
            </NFormItem>
            <NFormItem :label="t('player.list.birthday')">
                <NDatePicker v-model:formatted-value="editModel.birthday" value-format="yyyy-MM-dd" type="date" clearable />
            </NFormItem>
            <NFormItem :label="t('player.list.email')">
                 <NInput v-model:value="editModel.email" />
            </NFormItem>
            <NFormItem label="密碼">
                 <NInput v-model:value="editModel.password" type="password" show-password-on="click" placeholder="留空表示不修改密碼" clearable />
            </NFormItem>
            <NFormItem :label="t('player.list.vipLevel')">
                 <NInputNumber v-model:value="editModel.vip_level" :min="0" style="width: 100%" />
            </NFormItem>
             <NFormItem label="全服禁言">
                <NSwitch v-model:value="editModel.is_muted" />
            </NFormItem>
            <NFormItem label="禁止贈禮">
                <NSwitch v-model:value="editModel.is_gift_disabled" />
            </NFormItem>
            <NFormItem :label="t('player.list.retentionCheck')">
                <NSwitch v-model:value="editModel.is_retention_active" />
            </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showEditModal = false">取消</NButton>
                <NButton type="primary" @click="submitEdit">儲存</NButton>
            </div>
        </template>
    </NModal>
    
    <NModal v-model:show="showStatusModal" preset="card" title="變更帳戶狀態" style="width: 400px">
        <NForm :model="statusModel">
             <NFormItem label="狀態" required>
                 <NSelect v-model:value="statusModel.status" :options="statusOptions" />
             </NFormItem>
             <NFormItem label="強制踢線">
                <NSwitch v-model:value="statusModel.forceKick" />
                <span class="ml-2 text-xs text-gray-500">若勾選，玩家將被強制登出</span>
             </NFormItem>
             <NFormItem label="異動原因" required>
                 <NInput type="textarea" v-model:value="statusModel.reason" placeholder="請詳細說明原因..." />
             </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showStatusModal = false">取消</NButton>
                <NButton type="primary" @click="submitStatusChange">確認變更</NButton>
            </div>
        </template>
    </NModal>

    <NModal v-model:show="showAbandonModal" preset="card" title="放棄當前獎勵" style="width: 400px">
        <div class="text-red-500 mb-4 bg-red-50 p-3 rounded">
            <AlertCircleOutline class="w-4 h-4 inline mr-1"/>
            警告：此操作將清空玩家當前活動進度與餘額，且無法復原。
        </div>
        <NInput type="textarea" v-model:value="abandonReason" placeholder="請填寫放棄原因..." />
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showAbandonModal = false">取消</NButton>
                <NButton type="error" @click="submitAbandonBonus">確認放棄</NButton>
            </div>
        </template>
    </NModal>
  </div>
</template>
