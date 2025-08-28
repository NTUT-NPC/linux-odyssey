<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { logout } from '../../utils/auth'
import { trpc } from '../../utils/trpc'
import { openBugReport } from '../../utils/formbricks'
import useSession from '../../store/session'
import useUserProfile from '../../store/userProfile'

const userStore = useUserProfile()
const sessionStore = useSession()
const router = useRouter()

const toast = useToast()

const handleLogout = async () => {
  try {
    await logout()
    userStore.resetUserProfile()
    sessionStore.reset()
    router.push({ name: 'login' })
  } catch (err) {
    toast.error('登出失敗')
    console.error(err)
  }
}

const openSurvey = async () => {
  const surveyUrl = await trpc.links.surveyLink.query()
  window.open(surveyUrl, '_blank')
}

onMounted(async () => {
  try {
    await userStore.loadUserProfile()
  } catch (err) {
    toast.error('無法讀取使用者資料')
    console.error(err)
  }
})
</script>
<template>
  <!-- <button id="warning" class="flex items-center h-5 w-5">
          <font-awesome-icon
            :icon="['fas', 'triangle-exclamation']"
            class="text-text-primary h-full w-full"
          />
        </button>
        <button id="setting" class="flex items-center h-5 w-5">
          <font-awesome-icon
            :icon="['fas', 'gear']"
            class="text-text-primary h-full w-full"
          />
        </button>
        <button id="fullscreen" class="flex items-center h-5 w-5">
          <font-awesome-icon
            :icon="['fas', 'expand']"
            class="text-text-primary h-full w-full"
          />
        </button> -->


</template>
