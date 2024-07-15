<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useZrender } from './composables/useZrender'
import 'zrender-devtools/styles.css'
import { ZrenderDevtools, createDevtools } from 'zrender-devtools'

const rootRef = ref<HTMLElement>()
const devtoolRef = ref<HTMLElement>()
const { zr } = useZrender(rootRef)

let devtool: ZrenderDevtools
onMounted(() => {
  devtool = createDevtools(zr.value)
  devtool.mount(devtoolRef.value)
})
onUnmounted(() => {
  devtool.unmount()
})
</script>

<template>
  <div>
    <div ref="rootRef" style="height: 100vh"></div>

    <div ref="devtoolRef"></div>
  </div>
</template>
