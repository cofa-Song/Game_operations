<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NMenu } from 'naive-ui'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { computed, ref, watch, nextTick, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  HomeOutline,
  PeopleOutline,
  PersonOutline,
  GameControllerOutline,
  WalletOutline,
  GiftOutline,
  ExtensionPuzzleOutline,
  LayersOutline,
  ListOutline,
  OptionsOutline,
  PricetagsOutline,
  LockClosedOutline,
  SettingsOutline,
  PeopleCircleOutline,
  ShieldCheckmarkOutline,
  ReaderOutline
} from '@vicons/ionicons5'
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

const selectedKey = ref<string>('admin-dashboard')

// 菜單結構類型定義
interface MenuOption {
  label: string
  key: string
  icon?: any
  children?: MenuOption[]
}

// 遞迴查找選單路徑
const findMenuPath = (menus: MenuOption[], targetKey: string): { label: string; key: string }[] | null => {
  for (const menu of menus) {
    if (menu.key === targetKey) {
      return [{ label: menu.label, key: menu.key }]
    }
    if (menu.children) {
      const childPath = findMenuPath(menu.children, targetKey)
      if (childPath) {
        return [{ label: menu.label, key: menu.key }, ...childPath]
      }
    }
  }
  return null
}

// 根據當前路由更新選中的菜單項
watch(() => route.path, (newPath) => {
  // 優先檢查是否有完全匹配的路由
  const exactMatch = Object.entries(menuKeyToRoute).find(([_, path]) => path === newPath)
  if (exactMatch) {
    selectedKey.value = exactMatch[0]
    return
  }

  // 模糊匹配：如果當前路徑包含某個基礎路徑（處理詳情頁）
  // 例如 /admin/players/123 應該選中 /admin/players (player-list)
  const partialMatch = Object.entries(menuKeyToRoute).find(([_, path]) => {
    // 忽略 dashboard 避免誤判
    if (path === '/admin/dashboard') return false
    return newPath.startsWith(path + '/')
  })
  
  if (partialMatch) {
    selectedKey.value = partialMatch[0]
  }
}, { immediate: true })

const menuOptions = computed(() => [
  {
    label: t('navigation.homepage'),
    key: 'admin-dashboard',
    icon: renderIcon(HomeOutline)
  },

  {
    label: t('navigation.playerManagement'),
    key: 'player-management-group',
    icon: renderIcon(PeopleOutline),
    children: [
      {
        label: t('navigation.playerList'),
        key: 'player-list',
        icon: renderIcon(PersonOutline)
      },
      {
        label: t('navigation.bonusHistory'),
        key: 'bonus-history',
        icon: renderIcon(GiftOutline)
      },
      {
        label: t('navigation.gameLogs'),
        key: 'game-logs',
        icon: renderIcon(GameControllerOutline)
      },
      {
        label: t('navigation.assetLogs'),
        key: 'asset-logs',
        icon: renderIcon(WalletOutline)
      },
    ]
  },
  {
    label: t('navigation.gameManagement'),
    key: 'game-management',
    icon: renderIcon(ExtensionPuzzleOutline),
    children: [
      {
        label: t('navigation.gameProviders'),
        key: 'game-providers',
        icon: renderIcon(LayersOutline)
      },
      {
        label: t('navigation.gameList'),
        key: 'game-list',
        icon: renderIcon(ListOutline)
      },
      {
        label: t('navigation.gameTypeConfig'),
        key: 'game-type-config',
        icon: renderIcon(OptionsOutline)
      },
      {
        label: t('navigation.marketingTagConfig'),
        key: 'marketing-tag-config',
        icon: renderIcon(PricetagsOutline)
      }
    ]
  },
  {
    label: t('navigation.permissionManagement'),
    key: 'permission-management',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: t('navigation.accountManagement'),
        key: 'account-management',
        icon: renderIcon(PeopleCircleOutline)
      },
      {
        label: t('navigation.groupManagement'),
        key: 'group-management',
        icon: renderIcon(ShieldCheckmarkOutline)
      },
      {
        label: t('navigation.personalAccount'),
        key: 'personal-account',
        icon: renderIcon(LockClosedOutline)
      },
      {
        label: t('navigation.operationLog'),
        key: 'admin-operation-log',
        icon: renderIcon(ReaderOutline)
      }
    ]
  }
])

const menuKeyToRoute: Record<string, string> = {
  'admin-dashboard': '/admin/dashboard',
  'personal-account': '/admin/account',
  'group-management': '/admin/groups',
  'account-management': '/admin/accounts',
  'player-list': '/admin/players',
  'game-logs': '/admin/game-logs',
  'asset-logs': '/admin/asset-logs',
  'admin-operation-log': '/admin/logs',
  'bonus-history': '/admin/bonus-history',
  'game-providers': '/admin/game-providers',
  'game-list': '/admin/game-list',
  'game-type-config': '/admin/game-type-config',
  'marketing-tag-config': '/admin/marketing-tag-config'
}

// 計算麵包屑項目
const breadcrumbItems = computed(() => {
  const pathItems: { label: string, to?: string }[] = []
  
  // 1. 查找選單路徑
  const menuPath = findMenuPath(menuOptions.value, selectedKey.value)
  
  if (menuPath) {
    menuPath.forEach(item => {
      // 檢查該選單項是否有對應的路由連接
      const routePath = menuKeyToRoute[item.key]
      pathItems.push({
        label: item.label,
        to: routePath // 如果有的話就加上連結
      })
    })
  }

  // 2. 處理詳情頁等動態子頁面
  // 如果當前路由有 breadcrumb meta 且當前路徑不等於選中菜單的路徑
  if (route.meta.breadcrumb && menuKeyToRoute[selectedKey.value] !== route.path) {
    pathItems.push({
      label: route.meta.breadcrumb as string
    })
  }

  return pathItems
})

const handleMenuSelect = (key: string) => {
  const route = menuKeyToRoute[key]
  if (route) {
    selectedKey.value = key
    nextTick(() => {
      router.push(route)
    })
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <NLayout has-sider class="h-screen">
    <NLayoutSider collapse-mode="width" :width="240" :collapsed-width="0" show-trigger="bar" class="border-r border-gray-200">
      <NMenu 
        :options="menuOptions"
        :value="selectedKey"
        @update:value="handleMenuSelect"
      />
    </NLayoutSider>

    <NLayout class="h-screen">
      <NLayoutHeader class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ t('navigation.dashboard') }}</h1>
        <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-700">
          {{ t('auth.logout') }}
        </button>
      </NLayoutHeader>

      <NLayoutContent class="p-6">
        <!-- 麵包屑導覽 -->
        <NBreadcrumb class="mb-4">
          <NBreadcrumbItem v-for="(item, index) in breadcrumbItems" :key="index">
            <RouterLink v-if="item.to && index !== breadcrumbItems.length - 1" :to="item.to">
              {{ item.label }}
            </RouterLink>
            <span v-else>{{ item.label }}</span>
          </NBreadcrumbItem>
        </NBreadcrumb>

        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
