<script setup lang="ts">
import { computed } from 'vue'
import { TreeItem } from '../../stores/tree'
import DataInspactor from './DataInspactor.vue'

const props = defineProps<{ data?: TreeItem }>()

const d = computed(() => {
  const target = props.data?.target

  if (!target) {
    return
  }

  const boundingRect = target.getBoundingRect()
  const globalPoint = target.transformCoordToGlobal(boundingRect.x, boundingRect.y)
  const [scaleX, scaleY] = target.getGlobalScale()
  const globalBoundingRect = {
    x: globalPoint[0],
    y: globalPoint[1],
    width: boundingRect.width * scaleX,
    height: boundingRect.height * scaleY,
  }

  return {
    ...props.data,
    globalBoundingRect,
  }
})
</script>

<template>
  <div class="zr_devtools-details">
    <div v-if="!data">No Data</div>
    <div v-else>
      <DataInspactor v-if="d?.target" :title="d.type?.toUpperCase()" :data="d.target" />
      <DataInspactor
        v-if="d?.globalBoundingRect"
        title="Global Bounding Rect"
        :data="d.globalBoundingRect"
        style="margin-top: 24px;"
      />
    </div>
  </div>
</template>

<style lang="less">
.zr_devtools-details {
  padding: 12px;
  overflow: auto;
}
</style>
