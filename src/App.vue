<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useConfigStore } from '@/stores/useConfigStore'
import { onMounted } from 'vue'
import { 
  NMessageProvider, 
  NDialogProvider, 
  NNotificationProvider,
  NConfigProvider,
  zhTW,
  dateZhTW
} from 'naive-ui'

const authStore = useAuthStore()
const configStore = useConfigStore()

onMounted(() => {
  authStore.loadUserFromStorage()
  configStore.loadFromStorage()
})
</script>

<template>
  <NConfigProvider :locale="zhTW" :date-locale="dateZhTW">
    <NMessageProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <RouterView />
        </NNotificationProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
</style>
