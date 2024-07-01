<script setup lang="ts">
import { ref } from 'vue'

import ContentPane from './components/ContentPane.vue'
import DevtoolSVG from './components/svg/devtool.vue'

defineProps<{ flush: () => void }>()

const showPane = ref(true)
</script>

<template>
  <main class="zr_devtools-main">
    <DevtoolSVG
      class="zr_devtools-trigger"
      @click="showPane = true"
    />
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
  font-size: 42px;
  padding: 4px;
  line-height: 0;
  border-radius: 4px;
  background-color: #10B9BC;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #078d82;
  }
}
</style>
