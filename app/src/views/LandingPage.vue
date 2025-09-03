<script setup lang="ts">
import ContactButton from '../components/ContactButton.vue'
import DynamicBackground from '../components/DynamicBackground.vue'
import LandingHeaderComponents from '../components/header/LandingHeaderComponents.vue'
import HeaderPart from '../components/header/HeaderPart.vue'

import { facebookUrl, githubUrl } from '../config'

import { RouterLink, useRouter } from 'vue-router'
import { isLoggedIn } from '../utils/auth'


const router = useRouter()

const startGame = async () => {
  const loggedIn = await isLoggedIn()
  if (loggedIn) {
    console.log('Already logged in, redirecting to map...')
    router.push({ name: 'map' })
    return
  }
  console.log('Not logged in, redirecting to student login...')
  router.push({ name: 'student-login' })
}
</script>
<template>
  <div class="w-screen h-screen bg-scroll bg-bg">
    <DynamicBackground class="w-full h-full" />
    <div class="h-screen w-screen absolute top-0 left-0">
      <!-- game header -->
      <!--<HeaderPart :headerComponent="LandingHeaderComponents" class="z-50" />-->
      <!-- main content -->
      <main class="w-full h-full overflow-y-auto">
        <div class="w-full flex flex-col items-center">

          <!-- 迎新介紹 -->
          <div class="w-full md:w-2/3 px-5">
            <section id="intro" class="text-text grid grid-cols-1 gap-6 justify-items-center pt-8 pb-6">
              <h1 class="text-text-primary text-5xl md:text-6xl font-extrabold font-mono text-center my-8">
                🎓 北科程式設計研究社新生體驗
              </h1>
              <div class="text-text bg-bg-primary p-8 rounded-xl opacity-90 text-center" style="font-size: 2.5vh">
                <p class="mb-4">
                  歡迎來到北科程式設計研究社！🚀
                </p>


                <p class="mb-4">
                  透過完成各種社團任務，像是整理活動資料、尋找重要檔案等，你將學會基本的命令行操作，同時了解社團的日常運作。
                </p>
                <p class="mb-4">
                  在這個數位時代，掌握程式設計不僅僅是寫程式碼，更重要的是學會如何與電腦有效互動。
                </p>
                <p class="mb-4">
                  大部分真實的開發環境都運行在 Linux 系統上，而這正是許多初學者感到困惑的地方。
                </p>
                <p class="text-text-secondary font-bold">
                  準備好開始你的 Linux 冒險了嗎？🗡️
                </p>
              </div>
            </section>

            <!-- 開始遊戲按鈕 -->
            <section id="start" class="text-text flex flex-col items-center gap-5 mt-10">
              <button @click="startGame"
                class="bg-green-600 hover:bg-green-700 border-4 border-green-400 rounded-2xl transition ease-in-out hover:scale-110 duration-300 px-16 py-8 text-4xl font-bold text-white shadow-2xl hover:shadow-green-500/50">
                🎮 開始冒險旅程
              </button>
              <p class="text-text-secondary text-lg">
                無需安裝任何軟體，立即體驗真實的 Linux 環境
              </p>
            </section>





            <!-- 社團介紹 -->
            <section id="club-info" class="text-text flex flex-col items-center mt-10 gap-6">
              <div class="w-full flex flex-col items-center gap-4 bg-bg-primary p-8 rounded-xl opacity-90">
                <h1 class="text-text-primary text-3xl font-extrabold font-mono">
                  📚 關於我們的社團
                </h1>
                <p class="text-lg text-center max-w-3xl">
                  北科程式設計研究社是一個歡迎所有程度同學參與的學習社群，無論你是初學者還是有經驗的開發者，都能在這裡找到志同道合的夥伴。我們定期舉辦社課、專案分享和交流活動，鼓勵大家動手實作、互相學習，讓程式設計變得有趣又有成就感！
                </p>
                <div class="flex flex-col md:flex-row gap-4 mt-4">
                  <div class="flex flex-col md:flex-row gap-4 mt-4">
                    <div class="bg-bg-secondary p-4 rounded-lg">
                      <h3 class="font-bold text-text-primary">💻 專案分享</h3>
                      <p>分享個人或團隊專案作品與開發經驗</p>
                    </div>
                    <div class="bg-bg-secondary p-4 rounded-lg">
                      <h3 class="font-bold text-text-primary">📖 社課</h3>
                      <p>定期舉辦程式語言與技術主題教學</p>
                    </div>
                    <div class="bg-bg-secondary p-4 rounded-lg">
                      <h3 class="font-bold text-text-primary">🍕 社團活動</h3>
                      <p>吃 Pizza、拓展人脈，認識厲害的大佬</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 呼籲行動 -->
            <section id="call-to-action"
              class="text-text bg-gradient-to-r from-green-600 to-blue-600 border-4 border-green-400 rounded-xl transition ease-in-out duration-300 mt-10 mb-10">
              <div class="text-white text-xl p-8 w-full text-center">
                <h2 class="text-2xl font-bold mb-4">🌟 準備好加入我們了嗎？</h2>
                <p class="mb-4">體驗 Linux ，感受程式學習的樂趣！</p>
                <p class="text-lg">完成遊戲後，歡迎與我們分享心得並了解更多社團活動 🎉</p>
              </div>
            </section>

            <!-- 技術支持感謝 -->
            <section id="credits" class="text-text flex flex-col items-center mb-10">
              <div class="w-full bg-bg-primary p-6 rounded-lg opacity-80 text-center">
                <p class="text-text-secondary text-sm">
                  🙏 感謝 <span class="font-bold text-text-primary">Linux Odyssey</span> 專案提供技術支持
                </p>
                <p class="text-text-secondary text-xs mt-2">
                  本體驗活動基於開源專案改造而成
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
