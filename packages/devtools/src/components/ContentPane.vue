<script setup lang="ts">
import { selecting, showGroup } from '../stores/mask/mask'
import {
  TreeItem,
  activeTreeItem,
  tree,
} from '../stores/tree'
import Details from './details/Details.vue'
import IconClose from './svg/close.vue'
import IconReload from './svg/reload.vue'
import IconSearch from './svg/search.vue'
import IconCheckboxBadge from './svg/checkbox-badge.vue'
import Tree from './tree/Tree.vue'
import { ref } from 'vue'

defineProps<{ show: boolean }>()

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void;
  (e: 'flush'): void;
}>()

function toggleShowGroup () {
  showGroup.value = !showGroup.value
}
const flushing = ref(false)
function emitFlush () {
  flushing.value = true
  emit('flush')
}
</script>

<template>
  <div v-show="show" v-resize="{ direction: 'left' }" class="zr_devtools-pane">
    <div class="zr_devtools-pane-header">
      <div class="title">Zrender Devtools</div>

      <div style="display: flex; align-items: center;">
        <IconSearch class="icon-search" :class="{ active: selecting }" @click="selecting = !selecting" />
        <IconCheckboxBadge class="icon-checkbox-badge" :class="{ active: showGroup }" @click="toggleShowGroup" />
        <IconReload
          class="icon-reload"
          :class="{ flushing }"
          @click="emitFlush"
          @animationend="flushing = false"
        />
        <IconClose
          class="icon-close"
          @click="$emit('update:show', false)"
        />
      </div>
    </div>

    <div class="zr_devtools-pane-content">
      <div v-resize="{ direction: 'bottom' }" class="zr_devtools-content-resizeable" style="height: 300px;">
        <div class="zr_devtools-content-tree">
          <Tree :data="(tree as TreeItem[])" />
        </div>
      </div>
      <div class="zr_devtools-content-properties">
        <Details :data="(activeTreeItem as TreeItem)" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.zr_devtools-pane {
  width: max(25%, 400px);
  height: 100%;
  background-color: #fff;
  border-left: 1px solid #eee;

  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;

  .zr_devtools-pane-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 58px;
    padding: 0 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    font-size: 24px;
    .title {
      font-weight: 700;
    }
    .icon-search {
      font-size: 18px;
      cursor: pointer;
      margin-right: 4px;
      &.active {
        color: rgba(66, 184, 131, 1);
      }
    }
    .icon-checkbox-badge {
      font-size: 20px;
      cursor: pointer;
      margin-right: 4px;
      &.active {
        color: rgba(66, 184, 131, 1);
      }
    }
    .icon-reload {
      font-size: 20px;
      cursor: pointer;
      margin-right: 4px;
      &.flushing {
        animation: rotate 300ms ease-out;
      }
    }
    .icon-close {
      cursor: pointer;
    }
  }

  .zr_devtools-pane-content {
    flex: 1;
    overflow: hidden;

    display: grid;
    grid-template-rows: auto 1fr;
    .zr_devtools-content-resizeable {
      position: relative;
    }

    .zr_devtools-content-tree {
      height: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      overflow: auto;
      padding: 4px;
    }

    .zr_devtools-content-properties {
      overflow: auto;
      padding: 4px;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
