<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useZrender } from './composables/useZrender'
import { createDevtools } from 'zrender-devtools'

const rootRef = ref<HTMLElement>()
const devtoolRef = ref<HTMLElement>()
const { zr } = useZrender(rootRef)


onMounted(() => {
  createDevtools(zr.value).mount(devtoolRef.value)
})
</script>

<template>
  <div>
    <div ref="rootRef" style="height: 100vh"></div>

    <div ref="devtoolRef"></div>
  </div>
</template>
