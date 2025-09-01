<script setup lang="ts">
import StudentLoginForm from '../components/StudentLoginForm.vue'
import DynamicBackground from '../components/DynamicBackground.vue'
</script>

<template>
  <div class="w-screen h-screen">
    <DynamicBackground class="w-full h-full" />
    <div class="w-screen h-screen absolute top-0 left-0 flex flex-wrap justify-center content-center">
      <div class="w-fit">
        <StudentLoginForm />
      </div>
    </div>
  </div>
</template>
