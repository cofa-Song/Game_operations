<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NMenu } from 'naive-ui'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { computed, ref, watch, nextTick, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  HomeOutline,
  BusinessOutline,
  PeopleOutline,
  PersonOutline,
  GameControllerOutline,
  WalletOutline,
  DocumentTextOutline,
  CashOutline,
  GiftOutline,
  ExtensionPuzzleOutline,
  LayersOutline,
  ListOutline,
  OptionsOutline,
  PricetagsOutline,
  LockClosedOutline,
  PersonCircleOutline,
  PeopleCircleOutline,
  ShieldCheckmarkOutline,
  ReaderOutline
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

const selectedKey = ref<string>('admin-dashboard')

// 根据当前路由更新选中的菜单项
watch(() => route.path, (newPath) => {
  const pathMap: Record<string, string> = {
    '/admin/dashboard': 'admin-dashboard',
    '/admin/merchants': 'merchant-management',
    '/admin/account': 'personal-account',
    '/admin/groups': 'group-management',
    '/admin/accounts': 'account-management',
    '/admin/players': 'player-list',
    '/admin/game-logs': 'game-logs',
    '/admin/asset-logs': 'asset-logs',
    '/admin/player-logs': 'operation-log',
    '/admin/logs': 'admin-operation-log',
    '/admin/bonus-history': 'bonus-history',
    '/admin/game-providers': 'game-providers',
    '/admin/game-list': 'game-list',
    '/admin/game-type-config': 'game-type-config',
    '/admin/marketing-tag-config': 'marketing-tag-config'
  }
  if (pathMap[newPath]) {
    selectedKey.value = pathMap[newPath]
  }
}, { immediate: true })

const menuOptions = computed(() => [
  {
    label: t('navigation.dashboard'),
    key: 'admin-dashboard',
    icon: renderIcon(HomeOutline)
  },
  {
    label: t('navigation.merchants'),
    key: 'merchant-management',
    icon: renderIcon(BusinessOutline)
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
        label: t('navigation.gameLogs'),
        key: 'game-logs',
        icon: renderIcon(GameControllerOutline)
      },
      {
        label: t('navigation.assetLogs'),
        key: 'asset-logs',
        icon: renderIcon(WalletOutline)
      },
      {
        label: t('navigation.playerOperationLog'),
        key: 'operation-log',
        icon: renderIcon(DocumentTextOutline)
      }
    ]
  },
  {
    label: t('navigation.financeManagement'),
    key: 'finance-management',
    icon: renderIcon(CashOutline),
    children: [
      {
        label: t('navigation.bonusHistory'),
        key: 'bonus-history',
        icon: renderIcon(GiftOutline)
      }
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
    icon: renderIcon(LockClosedOutline),
    children: [
      {
        label: t('navigation.personalAccount'),
        key: 'personal-account',
        icon: renderIcon(PersonCircleOutline)
      },
      {
        label: t('navigation.groupManagement'),
        key: 'group-management',
        icon: renderIcon(PeopleCircleOutline)
      },
      {
        label: t('navigation.accountManagement'),
        key: 'account-management',
        icon: renderIcon(ShieldCheckmarkOutline)
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
  'merchant-management': '/admin/merchants',
  'personal-account': '/admin/account',
  'group-management': '/admin/groups',
  'account-management': '/admin/accounts',
  'player-list': '/admin/players',
  'game-logs': '/admin/game-logs',
  'asset-logs': '/admin/asset-logs',
  'operation-log': '/admin/player-logs', // Changed from '/admin/logs'
  'admin-operation-log': '/admin/logs',
  'bonus-history': '/admin/bonus-history',
  'game-providers': '/admin/game-providers',
  'game-list': '/admin/game-list',
  'game-type-config': '/admin/game-type-config',
  'marketing-tag-config': '/admin/marketing-tag-config'
}

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
  <NLayout has-sider>
    <NLayoutSider collapse-mode="width" :width="240" :collapsed-width="0" show-trigger="bar">
      <NMenu 
        :options="menuOptions"
        :value="selectedKey"
        @update:value="handleMenuSelect"
      />
    </NLayoutSider>

    <NLayout>
      <NLayoutHeader class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ t('navigation.dashboard') }}</h1>
        <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-700">
          {{ t('auth.logout') }}
        </button>
      </NLayoutHeader>

      <NLayoutContent class="p-6">
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
