import './styles/index.less'

import { createApp, markRaw } from 'vue'
import type { Group } from 'zrender'
import { type ZRenderType } from 'zrender'

import App from './App.vue'
import type { TreeItem } from './stores/tree'
import {
  activeTreeId,
  openKeys,
  resetActiveTree,
  setActiveTreeId,
  tree,
} from './stores/tree'
import { SelectRect, resetActiveItemStyle, selecting, setActiveItemStyle, setup } from './stores/select'
import type { ElementType } from './stores/types'
import resizeDirective from './directives/resize'

type Elements = ReturnType<ZRenderType['storage']['getRoots']>

export function createDevtools (ins: ZRenderType) {
  function mapElement (elements: Elements): TreeItem[] {
    return elements.filter(ele => !(ele as any).__skip_zr_devtool).map(ele => {
      if (ele.isGroup) {
        return {
          id: ele.id,
          type: 'group',
          isGroup: true,
          children: mapElement((ele as Group).children()),
          target: markRaw(ele),
        }
      }
      return {
        id: ele.id,
        type: ele.type as ElementType,
        target: markRaw(ele),
      }
    }) as TreeItem[]
  }

  function flush () {
    const _activeTreeId = activeTreeId.value
    const _openKeys = openKeys.value
    resetActiveTree()

    tree.value = mapElement(ins.storage.getRoots())
    openKeys.value = _openKeys
    setActiveTreeId(_activeTreeId)
  }

  function getTargetId (target: Elements[0]) {
    // HACK for text
    if (target.parent && target.parent.type === 'text') {
      return target.parent.id
    }
    return target.id
  }

  const mount = (id: any) => {
    tree.value = mapElement(ins.storage.getRoots())

    ins.on('click', e => {
      if (selecting.value) {
        selecting.value = false
        resetActiveItemStyle()
        // if click on mask
        if (e.target instanceof SelectRect) {
          setActiveTreeId(e.target.target_id, true)
          return
        }
      }

      // if (e.target && e.target.id) {
      //   setActiveTreeId(getTargetId(e.target), true)
      // }
    })

    ins.on('mousemove', e => {
      if (e.target && e.target.id) {
        if (selecting.value) {
          if (e.target instanceof SelectRect) {
            return
          }
          setActiveItemStyle(getTargetId(e.target))
        }
      }
    })

    setup(ins)

    createApp(App, { flush })
      .directive('resize', resizeDirective)
      .mount(id)
  }
  return { mount }
}
