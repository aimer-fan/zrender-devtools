<script setup lang="ts">
import { TreeItem, openKeys } from '../../stores/tree'
import Item from './TreeItem.vue'

withDefaults(defineProps<{
  data: TreeItem[];
  depth?: number;
}>(), { depth: 0 })
function isOpen (item: TreeItem) {
  return openKeys.value.indexOf(item.id) !== -1
}
</script>

<template>
  <template v-for="item in data" :key="item.id">
    <template v-if="item.children && item.children.length">
      <div class="zr_devtools-group__wrap">
        <Item
          type="group"
          :item="item"
          :depth="depth"
          :open="isOpen(item)"
        />
        <div class="zr_devtools-group_content" :style="!isOpen(item) ? 'height: 0;' : 'height: auto;'">
          <Tree :data="item.children" :depth="depth+1" />
        </div>
      </div>
    </template>
    <Item
      v-else
      type="leaf"
      :item="item"
      :depth="depth"
    />
  </template>
</template>

<style lang="less">
.zr_devtools-group_content {
  overflow: hidden;
}
</style>
