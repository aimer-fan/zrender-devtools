import type { Ref } from 'vue'
import { computed, nextTick, ref } from 'vue'

import { dfs } from '../shared/dfs'
import { getNodeChain } from '../shared'
import type { TreeItem } from './types'

export const tree: Ref<TreeItem[]> = ref([])

export const activeTreeId = ref<number>(undefined)
export const activeTreeItem = computed(() => dfs(tree.value, activeTreeId.value))
export const openKeys = ref([])

export function triggerOpenKey (id: number) {
  const index = openKeys.value.findIndex(key => key === id)
  if (index === -1) {
    openKeys.value.push(id)
  } else {
    openKeys.value.splice(index, 1)
  }
}

export function setActiveTreeId (id: number, scroll = false) {
  if (scroll) {
    const item = dfs(tree.value, id)
    if (item?.target) {
      openKeys.value = getNodeChain(item.target)

      nextTick(() => {
        const t = document.getElementById(`zr_devtools-tree_item-${item.id}`)
        t?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }

  activeTreeId.value = id
}

export function resetActiveTree () {
  activeTreeId.value = undefined
  openKeys.value = []
  tree.value = []
}
