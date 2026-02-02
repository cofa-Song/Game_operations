import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import Login from '@/views/Login.vue'

const masterRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('@/views/Master/Layout.vue'),
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] },
    children: [
      {
        path: 'dashboard',
        name: 'AdminHome',
        component: () => import('@/views/Master/PersonalAccount.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'], breadcrumb: '首頁' }
      },

      {
        path: 'account',
        name: 'PersonalAccount',
        component: () => import('@/views/Master/PersonalAccount.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'] }
      },
      {
        path: 'groups',
        name: 'GroupManagement',
        component: () => import('@/views/Master/GroupManagement.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'accounts',
        name: 'AccountManagement',
        component: () => import('@/views/Master/AccountManagement.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'players',
        name: 'PlayerList',
        component: () => import('@/views/Master/PlayerList.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'] }
      },
      {
        path: 'players/:id',
        name: 'PlayerDetail',
        component: () => import('@/views/Master/PlayerDetail.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'], breadcrumb: '詳情' }
      },
      {
        path: 'logs',
        name: 'OperationLog',
        component: () => import('@/views/Master/OperationLog.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'] }
      },
      {
        path: 'asset-logs',
        name: 'AssetLogs',
        component: () => import('@/views/Master/AssetLogs.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'] }
      },
      {
        path: 'game-logs',
        name: 'GameLogs',
        component: () => import('@/views/Master/GameLogs.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'] }
      },
      {
        path: 'bonus-history',
        name: 'BonusHistory',
        component: () => import('@/views/Master/BonusHistory.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER', 'USER'] }
      },
      {
        path: 'game-providers',
        name: 'GameProviders',
        component: () => import('@/views/Master/GameProviders.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'game-list',
        name: 'GameList',
        component: () => import('@/views/Master/GameList.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'game-type-config',
        name: 'GameTypeConfig',
        component: () => import('@/views/Master/GameTypeConfig.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'marketing-tag-config',
        name: 'MarketingTagConfig',
        component: () => import('@/views/Master/MarketingTagConfig.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      }
      ,
      {
        path: 'thirdparty-keys',
        name: 'ThirdPartyKeys',
        component: () => import('@/views/Master/ThirdPartyKeys.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      }
      ,
      {
        path: 'app-versions',
        name: 'AppVersionManager',
        component: () => import('@/views/Master/AppVersionManager.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      }
      ,
      {
        path: 'admin-whitelist',
        name: 'AdminWhitelist',
        component: () => import('@/views/Master/AdminWhitelist.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      }
      ,
      {
        path: 'operation-config',
        name: 'OperationConfig',
        component: () => import('@/views/Master/OperationConfig.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'announcements',
        name: 'AnnouncementManager',
        component: () => import('@/views/Master/Announcement.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'image-config',
        name: 'ImageConfig',
        component: () => import('@/views/Master/ImageConfig.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'guilds',
        name: 'GuildManagement',
        component: () => import('@/views/Master/GuildManagement.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      },
      {
        path: 'articles',
        name: 'ArticleManager',
        component: () => import('@/views/Master/ArticleManager.vue'),
        meta: { requiresAuth: true, roles: ['DEVELOPER', 'MANAGER'] }
      }
    ]
  }
]

const merchantRoutes: RouteRecordRaw[] = [
  {
    path: '/merchant',
    name: 'MerchantLayout',
    component: () => import('@/views/Merchant/Layout.vue'),
    meta: { requiresAuth: true, role: 'MERCHANT' },
    children: [
      {
        path: 'dashboard',
        name: 'MerchantDashboard',
        component: () => import('@/views/Merchant/Dashboard.vue'),
        meta: { requiresAuth: true, role: 'MERCHANT' }
      }
    ]
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  ...masterRoutes,
  ...merchantRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // Load user from storage if not already loaded
  if (!authStore.user && authStore.token) {
    authStore.loadUserFromStorage()
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }

    // 檢查角色權限
    if (to.meta.roles) {
      const roles = Array.isArray(to.meta.roles) ? to.meta.roles : [to.meta.roles]
      if (!roles.includes(authStore.user?.role || '')) {
        // 重定向到仪表板
        next('/admin/dashboard')
        return
      }
    } else if (to.meta.role && authStore.user?.role !== to.meta.role) {
      next('/')
      return
    }
  }

  next()
})

// 清理 Teleport 元素
router.afterEach(() => {
  // 使用 setTimeout 延迟清理，给 Vue 充足的时间更新 DOM
  setTimeout(() => {
    try {
      // 安全地移除所有 Naive UI 生成的遮罩层
      const masks = document.querySelectorAll('.n-modal-mask, .n-drawer-mask')
      masks.forEach((mask) => {
        if (mask && mask.parentNode) {
          mask.parentNode.removeChild(mask)
        }
      })
    } catch (error) {
      // 静默处理任何 DOM 操作错误
      console.debug('Cleanup error:', error)
    }
  }, 0)
})

export default router
