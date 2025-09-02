<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout as authLogout } from '../../utils/auth'
import useSession from '../../store/session'
import useUserProfile from '../../store/userProfile'

defineProps({
  title: {
    type: String,
    required: false,
  },
  headerComponent: {
    type: Object,
    required: false,
  },
})

const router = useRouter()
const sessionStore = useSession()
const userStore = useUserProfile()
const menuOpen = ref(false)
const windowWidth = window.innerWidth < 768

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const logout = async () => {
  try {
    console.log('開始登出流程...')
    
    // 使用應用的登出 API
    await authLogout()
    
    // 重置 stores
    userStore.resetUserProfile()
    sessionStore.reset()
    
    console.log('登出成功，跳轉到首頁')
    
    // 跳轉到首頁
    router.push('/')
  } catch (error) {
    console.error('登出失敗:', error)
    // 即使 API 失敗，也嘗試清理本地狀態並跳轉
    userStore.resetUserProfile()
    sessionStore.reset()
    router.push('/')
  }
}
</script>
<template>
  <div
    class="w-full top-0 px-5 fixed flex flex-row bg-bg-secondary justify-between items-center"
  >
    <div class="flex flex-row items-center" :class="{ hidden: menuOpen }">
      <RouterLink
        to="/"
        id="GameTitle"
        class="text-text-primary inline-block font-bold whitespace-nowrap pt-1 transition ease-in-out hover:scale-110 duration-300"
        style="font-size: 2vh"
      >
        NTUT PROGRAMMING CLUB
      </RouterLink>
    </div>
    <div class="absolute left-1/2 transform -translate-x-1/2" :class="{ hidden: menuOpen }">
      <p
        id="QuestTitle"
        class="text-text inline-block font-bold whitespace-nowrap"
        style="font-size: 2vh"
      >
        {{ title }}
      </p>
    </div>
    <div
      class="w-full flex flex-col items-center justify-end sm:w-auto sm:block"
      :class="{ hidden: !menuOpen }"
    >
      <component :is="headerComponent" />
    </div>
    
    <!-- 登出按鈕 -->
    <div class="flex items-center space-x-2">
      <button
        title="登出"
        @click="logout"
        class="flex items-center space-x-2 px-1.5 py-1"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-right-from-bracket']"
          class="text-green-500 h-4 w-4"
        />
        <span class="text-green-500 text-sm">登出</span>
      </button>
    </div>
    
    <div
      v-if="windowWidth"
      :class="{ 'w-full flex justify-end pb-3': menuOpen }"
    >
      <button
        type="button"
        class="flex items-center h-5 w-5 rounded-md sm:hidden"
        aria-controls="mobile-menu"
        aria-expanded="false"
        @click="toggleMenu"
      >
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="text-text-primary h-full w-full"
        />
      </button>
    </div>
  </div>
</template>