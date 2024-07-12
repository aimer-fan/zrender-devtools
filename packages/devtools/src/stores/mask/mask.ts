import type { ZRenderType } from 'zrender'
import { Group } from 'zrender'
import { dfs } from '../../shared/dfs'
import { tree } from '../tree'
import { ref } from 'vue'
import { MaskGroup } from './shapes'
import type { TreeItem } from '../types'
import { maskHandler } from './handler'

let maskGroup: Group
let selectedId: number | undefined

export const showGroup = ref(true)
export const selecting = ref(false)


export function setup (ins: ZRenderType) {
  maskGroup = new MaskGroup(0, { silent: false })
  ins.add(maskGroup)
}

export function setActiveItemStyle (id: number) {
  if (id === selectedId) return

  if (selectedId) {
    resetActiveItemStyle(selectedId)
  }

  selectedId = id
  const item = dfs<TreeItem>(tree.value, id)
  if (item) {
    if (item.target instanceof Group && !showGroup.value) {
      return
    }

    maskHandler(maskGroup, item)
  }
}

export function resetActiveItemStyle (_id?: number) {
  maskGroup.removeAll()
  maskGroup.dirty()
  selectedId = undefined
}
