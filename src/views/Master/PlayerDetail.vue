<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  NCard, NTabs, NTabPane, NGrid, NGridItem, NDescriptions, NDescriptionsItem,
  NTag, NButton, NSpace, NAvatar, NStatistic, NList, NListItem, NThing,
  NModal, NForm, NFormItem, NInput, NSelect, NSwitch, useMessage, useDialog,
  NProgress, NPopconfirm, NDivider
} from 'naive-ui'
import { 
  PersonOutline, WalletOutline, TimeOutline, AlertCircleOutline, CheckmarkCircleOutline,
  PlayOutline, RefreshOutline
} from '@vicons/ionicons5'
import { playerApi } from '@/api/player'
import { Player, PlayerAuditLog, UpdatePlayerRequest, PlayerStatus } from '@/types/player'
import { RolloverEngine } from '@/mocks/engine'
import { mockPlayers } from '@/mocks/player' // For P2P Simulation

const route = useRoute()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()

const playerId = route.params.id as string
const player = ref<Player | null>(null)
// ... existing refs ...

const simulateExchange = (type: 'GOLD_TO_SILVER' | 'SILVER_TO_GOLD', amount: number) => {
    if (!player.value) return
    try {
        if (type === 'GOLD_TO_SILVER') {
             RolloverEngine.exchangeCurrency(player.value, 'GOLD', 'SILVER', amount)
             message.success(`模擬金轉銀 ${amount}G -> ${amount*100}S 成功`)
        } else {
             RolloverEngine.exchangeCurrency(player.value, 'SILVER', 'GOLD', amount)
             message.success(`模擬銀轉金 ${amount}S -> ${amount/100}G 成功`)
        }
    } catch (e: any) {
        message.error(e.message || '兌換失敗')
    }
}

const simulateP2P = (amount: number) => {
    if (!player.value) return
    // Find a receiver (first one that isn't me)
    const receiver = mockPlayers.find(p => p.id !== player.value!.id)
    if (!receiver) {
        message.error('找不到轉帳對象')
        return
    }
    
    try {
        RolloverEngine.p2pTransfer(player.value, receiver, amount)
        message.success(`模擬 P2P 轉出 ${amount} 給 ${receiver.id} 成功 (-${amount * 1.08})`)
    } catch (e: any) {
        message.error(e.message || '轉帳失敗')
    }
}

const auditLogs = ref<PlayerAuditLog[]>([])
const loading = ref(false)

// Edit State
const showEditModal = ref(false)
const editFormRef = ref(null)
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

const getWalletBalance = (type: string) => {
    if (!player.value) return 0
    const wallet = player.value.wallets.find(w => w.type === type)
    return wallet ? wallet.balance : 0
}

// OPE-202 Simulation
const simulateBet = (amount: number, type: 'CASH' | 'BONUS') => {
    if (!player.value) return
    try {
        RolloverEngine.processBet(player.value, type, amount)
        message.success(`模擬投注 ${amount} (${type}) 成功`)
    } catch (e: any) {
        message.error(e.message || '投注失敗')
    }
}

const simulateWin = (amount: number, type: 'CASH' | 'BONUS') => {
    if (!player.value) return
    RolloverEngine.processWin(player.value, type, amount)
    message.success(`模擬派彩 ${amount} (${type}) 成功`)
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
        <NCard title="基本資料" class="mb-4">
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
            <NDescriptionsItem label="註冊時間">{{ player.register_at.split('T')[0] }}</NDescriptionsItem>
             <NDescriptionsItem label="最後登入">{{ player.last_login_at?.split('T')[0] || '-' }}</NDescriptionsItem>
          </NDescriptions>
          
          <div class="mt-4 flex gap-2">
            <NButton block type="primary" @click="handleEdit">編輯資料</NButton>
            <NButton block type="warning" @click="handleStatusChange">狀態管理</NButton>
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
            <NTabPane name="wallet" tab="錢包監控">
              <NGrid cols="2" :x-gap="12" :y-gap="12">
                 <NGridItem>
                    <NCard size="small" title="儲值錢包 (金幣)">
                        <template #header-extra><WalletOutline class="w-5 h-5" /></template>
                        <NStatistic label="餘額" :value="getWalletBalance('CASH')">
                            <template #suffix>G</template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" title="保險箱 (金幣)">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-yellow-500" /></template>
                        <NStatistic label="餘額" :value="getWalletBalance('SAFE')">
                            <template #suffix>G</template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" title="通用錢包 (銀幣)">
                         <template #header-extra><WalletOutline class="w-5 h-5 text-gray-400" /></template>
                         <NStatistic label="餘額" :value="getWalletBalance('BONUS')">
                            <template #suffix>S</template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" title="流水活動錢包" class="col-span-2">
                        <template #header-extra>
                            <NSpace>
                                <NPopconfirm @positive-click="simulateBet(10, 'BONUS')">
                                    <template #trigger><NButton size="tiny" tertiary type="warning">模擬投注(10)</NButton></template>
                                    確認模擬投注 10 銀幣?
                                </NPopconfirm>
                                <NPopconfirm @positive-click="simulateWin(20, 'BONUS')">
                                    <template #trigger><NButton size="tiny" tertiary type="success">模擬派彩(20)</NButton></template>
                                    確認模擬派彩 20 銀幣?
                                </NPopconfirm>
                                <NPopconfirm @positive-click="simulateExchange('GOLD_TO_SILVER', 1)">
                                    <template #trigger><NButton size="tiny" tertiary type="info">金轉銀(1)</NButton></template>
                                    確認將 1 金幣 兌換為 100 銀幣?
                                </NPopconfirm>
                                <NPopconfirm @positive-click="simulateP2P(100)">
                                    <template #trigger><NButton size="tiny" tertiary type="error">P2P轉出(100)</NButton></template>
                                    確認 P2P 轉出 100 金幣 (手續費 8%)?
                                </NPopconfirm>
                                <NButton size="tiny" type="error" ghost @click="handleAbandonBonus">放棄獎勵</NButton>
                            </NSpace>
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
                                    <div class="text-lg font-bold">{{ player.rollover_container.lave_balance }} S</div>
                                </NGridItem>
                                <NGridItem>
                                    <div class="text-xs text-gray-400">初始金額</div>
                                    <div class="text-md">{{ player.rollover_container.start_balance }} S</div>
                                </NGridItem>
                                <NGridItem>
                                    <div class="text-xs text-gray-400">轉出上限</div>
                                    <div class="text-md">{{ player.rollover_container.cap }} G</div>
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
                                         <NTag size="small" type="warning" class="mr-2">{{ card.currency }}</NTag>
                                         <span class="text-xs">{{ card.id }}</span>
                                         <div class="text-xs text-gray-400">
                                            Roll: {{ card.multiplier }}x | Cap: {{ card.cap }} | Exp: {{ card.end_time.split('T')[0] }}
                                         </div>
                                     </div>
                                     <div class="font-bold">+{{ card.lave_amount }}</div>
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
             <NFormItem label="全服禁言">
                <NSwitch v-model:value="editModel.is_muted" />
            </NFormItem>
            <NFormItem label="禁止贈禮">
                <NSwitch v-model:value="editModel.is_gift_disabled" />
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
