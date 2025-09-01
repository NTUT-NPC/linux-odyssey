<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../utils/api'

const router = useRouter()
const toast = useToast()

const studentId = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const usernameInput = ref()

onMounted(() => {
  usernameInput.value?.focus()
})

const clearError = () => {
  errorMessage.value = ''
}

const handleSubmit = async () => {
  if (isLoading.value) return

  clearError()

  if (!studentId.value.trim()) {
    errorMessage.value = '請輸入學號'
    return
  }

  isLoading.value = true

  try {
    // 嘗試登入，如果帳號不存在後端會自動註冊
    await api.post('/auth/student-login', {
      studentId: studentId.value.trim()
    })

    toast.success('登入成功！')
    router.push({ name: 'map' })
  } catch (err: any) {
    console.error(err)
    if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message
    } else {
      errorMessage.value = '登入失敗，請再試一次'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-bg border-8 border-bg-primary flex flex-1 flex-col items-center justify-center rounded-3xl p-10">
    <div class="w-full flex items-center justify-center mb-6 gap-3">
      <img src="/icon_totem.svg" class="h-10" />
      <h1 class="text-text-primary text-3xl font-black">
        北科程式社團登入
      </h1>
    </div>

    <div class="text-error inline-flex justify-center items-center md:hidden mb-4">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="px-1 text-sm" />
      <span>建議使用電腦全螢幕執行</span>
    </div>

    <form @submit.prevent="handleSubmit()" class="w-full max-w-sm">
      <div class="mb-6">
        <input type="text" id="studentId" ref="usernameInput"
          class="my-4 bg-bg-primary text-text-primary rounded-md block w-full px-3 h-12 shadow-sm focus:outline-none placeholder:text-text-line focus:ring-2 focus:ring-text-primary ring-1 ring-bg-secondary text-center text-lg"
          placeholder="請輸入學號 (例: 114123456)" v-model="studentId" required @input="clearError()" autocomplete="username"
          :disabled="isLoading" />
        <label class="text-sm font-normal text-text-secondary block text-center">
          輸入你的學號即可開始遊戲
        </label>
      </div>

      <p id="ErrorDisplay" class="text-error flex justify-center mb-4" v-if="errorMessage">
        {{ errorMessage }}
      </p>

      <button
        class="inline-flex justify-center items-center rounded-lg font-black py-3 bg-text-primary text-bg w-full text-lg hover:bg-opacity-90 transition-colors"
        type="submit" :disabled="isLoading">
        <span v-if="isLoading">登入中...</span>
        <span v-else>🎮 開始冒險</span>
      </button>

      <p class="text-text-secondary text-center mt-4 text-sm">
        第一次使用？輸入學號將自動為你建立帳號
      </p>
    </form>
  </div>
</template>
