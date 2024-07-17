<script setup lang="ts">
import { ref } from 'vue'
import IconRight from '../svg/right.vue'
import { isArray, isBoolean, isNumber, isObject, isString, isFunction } from '../../shared/types'

const props = withDefaults(
  defineProps<{
    title?: string;
    data: Record<string, any> | Function;
    depth?: number;
    defaultOpenDepth?: number;
  }>(),

  { depth: 1, title: '', defaultOpenDepth: 1 },
)

const collapse = ref(props.depth > props.defaultOpenDepth)
function toggleCollapse () {
  collapse.value = !collapse.value
}
function showData (data: unknown) {
  return isBoolean(data) || isNumber(data) || isString(data) || data === undefined || data === null
}

function formatValue (value: unknown) {
  if (showData(value)) {
    if (isString(value)) {
      return `"${value}"`
    }
    if (value === undefined) {
      return 'undefined'
    }
    return value
  }

  if (isArray(value)) {
    return `Array[${value.length}]`
  }
  if (isFunction(value)) {
    return 'Function'
  }
  if (isObject(value)) {
    const keys = Object.keys(value)
    if (keys.length === 0) {
      return 'Object (empty)'
    }
    return 'Object'
  }
}

function sendDataToConsole () {
  console.log(props.data)
}
</script>

<template>
  <div class="zr_devtools-inspector">
    <div class="zr_devtools-inspector-item" @click="toggleCollapse">
      <IconRight class="zr_devtools-inspector-icon" :class="{ open: !collapse }" />
      <div class="zr_devtools-inspector-title">
        <slot name="title">
          <div class="zr_devtools-inspector-root_title">
            <span>{{ title }}</span>

            <span class="zr_devtools-inspector-to_console" @click.stop="sendDataToConsole">To Console</span>
          </div>
        </slot>
      </div>
    </div>
    <div v-if="!collapse" :style="`margin-left: ${8 * depth}px;`">
      <template v-for="(value, key) in data" :key="key">
        <div v-if="showData(value)" class="zr_devtools-inspector-item">
          <div class="zr_devtools-inspector-title">
            <span class="zr_devtools-inspector-prop_name" style="margin-left: 24px;">{{ key }}</span>
            <span class="zr_devtools-inspector-split">:</span>
            <span class="zr_devtools-inspector-value" :class="(typeof value)">{{ formatValue(value) }}</span>
          </div>
        </div>
        <div v-else-if="isFunction(value)" class="zr_devtools-inspector-item">
          <div class="zr_devtools-inspector-title">
            <span class="zr_devtools-inspector-prop_name" style="margin-left: 24px;">{{ key }}</span>
            <span class="zr_devtools-inspector-split">:</span>
            <span class="zr_devtools-inspector-value">Function</span>
          </div>
        </div>
        <DataInspactor v-else :data="value" :depth="depth + 1">
          <template #title>
            <div class="zr_devtools-inspector-item">
              <span class="zr_devtools-inspector-prop_name">{{ key }}</span>
              <span class="zr_devtools-inspector-split">:</span>
              <span class="zr_devtools-inspector-value" :class="(typeof value)">{{ formatValue(value) }}</span>
            </div>
          </template>
        </DataInspactor>
      </template>
    </div>
  </div>
</template>

<style lang="less">

.zr_devtools-inspector {
  font-family: monospace;
  font-size: 14px;
  color: #525252;
  .zr_devtools-inspector-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    .zr_devtools-inspector-icon {
      font-size: 20px;
      height: 20px;
      transition: transform 0.3s;
      &.open {
        transform-origin: center;
        transform: rotate(90deg);
      }
    }
    .zr_devtools-inspector-title {
      flex: 1;
      display: flex;
      align-items: center;
      margin-top: 4px;
    }
  }

  .zr_devtools-inspector-root_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    .zr_devtools-inspector-to_console {
      text-align: right;
      font-size: 12px;
    }
  }

  .zr_devtools-inspector-prop_name {
    color: rgb(129, 40, 232)
  }
  .zr_devtools-inspector-split {
    margin-right: 8px;
  }
  .zr_devtools-inspector-value {
    white-space: nowrap;
    &.number {
      color: #03c;
    }
    &.undefined {
      color: #999;
    }
  }
}
</style>
