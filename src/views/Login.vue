<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { authApi } from '@/api/auth'
import { NForm, NFormItem, NInput, NButton, NCard, NCheckbox, NAlert, NGrid, NGridItem, NTag } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const loading = ref(false)
const errorMessage = ref('')

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false
})


// 預設身份列表
interface QuickLoginOption {
  id: string
  name: string
  tagLabel: string
  tagType: 'default' | 'info' | 'success' | 'warning' | 'error' | 'primary'
  description: string
  username: string
  password: string
}

const quickLoginOptions: QuickLoginOption[] = [
  {
    id: 'boss',
    name: '老闆',
    tagLabel: 'BOSS',
    tagType: 'warning',
    description: '全覽所有功能模組',
    username: 'boss',
    password: '123456'
  },
  {
    id: 'pm',
    name: 'PM',
    tagLabel: 'PM',
    tagType: 'primary',
    description: '產品策略・全功能（不含風控）',
    username: 'pm',
    password: '123456'
  },
  {
    id: 'operator',
    name: '營運',
    tagLabel: 'OPERATOR',
    tagType: 'success',
    description: '會員・優惠・任務・內容管理',
    username: 'operator',
    password: '123456'
  },
  {
    id: 'devops',
    name: '運維',
    tagLabel: 'DEVOPS',
    tagType: 'info',
    description: '系統管理・風控・統計報表',
    username: 'devops',
    password: '123456'
  },
  {
    id: 'finance',
    name: '財務',
    tagLabel: 'FINANCE',
    tagType: 'warning',
    description: '財務管理・統計報表',
    username: 'finance',
    password: '123456'
  },
  {
    id: 'cs',
    name: '客服',
    tagLabel: 'CS',
    tagType: 'default',
    description: '會員管理・通訊管理',
    username: 'cs',
    password: '123456'
  },
  {
    id: 'tech',
    name: '技術',
    tagLabel: 'TECH',
    tagType: 'error',
    description: '遊戲管理・系統管理・統計報表',
    username: 'tech',
    password: '123456'
  }
]

const ADMIN_ROLES = ['DEVELOPER', 'MANAGER', 'USER', 'BOSS', 'PM', 'OPERATOR', 'DEVOPS', 'FINANCE', 'CS', 'TECH']

const redirectAfterLogin = async (role: string) => {
  if (ADMIN_ROLES.includes(role)) {
    await router.push('/admin/dashboard')
  } else if (role === 'MERCHANT') {
    await router.push('/merchant/dashboard')
  }
}

const handleLogin = async () => {
  try {
    errorMessage.value = ''
    loading.value = true
    const response = await authApi.login(formData.username, formData.password)
    authStore.setAuth(response.token, response.user)
    await redirectAfterLogin(response.user.role)
  } catch (error) {
    errorMessage.value = t('auth.invalidCredentials')
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

const handleQuickLogin = async (option: QuickLoginOption) => {
  try {
    errorMessage.value = ''
    loading.value = true
    formData.username = option.username
    formData.password = option.password
    const response = await authApi.login(option.username, option.password)
    authStore.setAuth(response.token, response.user)
    await redirectAfterLogin(response.user.role)
  } catch (error) {
    errorMessage.value = t('auth.invalidCredentials')
    console.error('Quick login error:', error)
  } finally {
    loading.value = false
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <NCard class="w-full max-w-md" :bordered="false" :segmented="false">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900">{{ t('auth.login') }}</h1>
          <p class="text-gray-600 text-sm mt-1">Aggregator Platform</p>
        </div>
      </template>

      <NAlert v-if="errorMessage" type="error" class="mb-4" closable>
        {{ errorMessage }}
      </NAlert>

      <NForm ref="formRef" :model="formData" size="large">
        <NFormItem :label="t('auth.username')" path="username" label-placement="top">
          <NInput
            v-model:value="formData.username"
            :placeholder="t('auth.username')"
            clearable
            @keydown="handleKeyDown"
          />
        </NFormItem>

        <NFormItem :label="t('auth.password')" path="password" label-placement="top">
          <NInput
            v-model:value="formData.password"
            type="password"
            :placeholder="t('auth.password')"
            clearable
            show-password-on="click"
            @keydown="handleKeyDown"
          />
        </NFormItem>

        <NFormItem path="rememberMe">
          <NCheckbox v-model:checked="formData.rememberMe">
            {{ t('auth.rememberMe') }}
          </NCheckbox>
        </NFormItem>

        <NButton
          type="primary"
          block
          size="large"
          :loading="loading"
          @click="handleLogin"
          class="mt-4"
        >
          {{ t('auth.login') }}
        </NButton>
      </NForm>

      <!-- 快速登入身份列表 -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-center text-sm font-semibold text-gray-700 mb-3">
          快速切換身份
        </p>
        <NGrid :cols="2" :x-gap="10" :y-gap="10">
          <NGridItem v-for="option in quickLoginOptions" :key="option.id">
            <NButton
              block
              type="default"
              :loading="loading"
              @click="handleQuickLogin(option)"
              class="quick-login-btn"
              style="height: auto; padding: 10px 12px;"
            >
              <template #default>
                <div class="text-left w-full">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-semibold text-gray-800">{{ option.name }}</span>
                    <NTag :type="option.tagType" size="tiny" :bordered="false">{{ option.tagLabel }}</NTag>
                  </div>
                  <div class="text-xs text-gray-400 leading-tight">
                    {{ option.description }}
                  </div>
                </div>
              </template>
            </NButton>
          </NGridItem>
        </NGrid>
      </div>

      <div class="mt-4 text-center">
        <a href="#" class="text-sm text-blue-600 hover:text-blue-700">
          {{ t('auth.forgotPassword') }}
        </a>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
:deep(.n-card) {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.quick-login-btn {
  transition: all 0.3s ease;
}

.quick-login-btn:hover {
  border-color: #1890ff;
  background-color: #f0f7ff;
}
</style>
