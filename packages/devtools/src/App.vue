<script setup lang="ts">
import { ref } from 'vue'

import ContentPane from './components/ContentPane.vue'
import { options } from './stores/options'

defineProps<{ flush: () => void }>()

const showPane = ref(options.defaultShowPane)
</script>

<template>
  <main class="zr_devtools-main">
    <img
      src="./assets/logo.png"
      class="zr_devtools-trigger"
      @click="showPane = true"
    >
    <ContentPane
      v-model:show="showPane"
      @flush="flush"
    />
  </main>
</template>

<style lang="less">
.zr_devtools-main {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
}
.zr_devtools-trigger {
  position: absolute;
  right: 50px;
  bottom: 150px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
