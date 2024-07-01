<script setup lang="ts">
import { resetActiveItemStyle, setActiveItemStyle } from '../../stores/select'
import {
  type TreeItem,
  activeTreeId,
  setActiveTreeId,
  triggerOpenKey,
} from '../../stores/tree'
import IconRight from '../svg/right.vue'

const props = withDefaults(
  defineProps<{
    item: TreeItem;
    depth: number;
    type: 'leaf' | 'group';
    open?: boolean;
  }>(),
  { type: 'leaf' },
)

function toggleOpenIcon (item: TreeItem) {
  if (item.isGroup) {
    triggerOpenKey(item.id)
  }
}
function handleClick (item: TreeItem) {
  setActiveTreeId(item.id)
}

function handleMouseEnter () {
  setActiveItemStyle(props.item.id)
}
</script>

<template>
  <div
    :id="`zr_devtools-tree_item-${item.id}`"
    class="zr_devtools-tree_item"
    :class="{ active: activeTreeId && activeTreeId === item.id }"
    :style="`margin-left: ${depth * 24}px;`"
    @click="handleClick(item)"
    @mouseenter="handleMouseEnter"
    @mouseleave="resetActiveItemStyle()"
  >
    <IconRight
      v-if="type === 'group'"
      class="zr_devtools-tree_item_group-icon"
      :class="{ open }"
      @click.stop="toggleOpenIcon(item)"
    />
    <div class="zr_devtools-tree_item-content">
      <div>{{ item.type.toUpperCase() }}</div>
    </div>
  </div>
</template>

<style lang="less">
.zr_devtools-tree_item {
  display: flex;
  align-items: center;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    background-color: rgba(66, 184, 131, 0.6);
  }

  &.active {
    background-color: rgba(66, 184, 131, 1);
  }
  .zr_devtools-tree_item_group-icon {
    line-height: 1;
    font-size: 18px;
    padding: 4px;
    transition: transform 0.3s;
    &.open {
      transform: rotate(90deg);
      transform-origin: center;
    }
  }
  .zr_devtools-tree_item-content {
    padding: 4px 8px;
    display: flex;
    align-items: baseline;

    .zr_devtools-item_id {
      margin-left: 8px;
      font-size: 12px;
      line-height: 1;
      color: #999;
    }
  }
}
</style>
