import type { App as VueApp } from 'vue'
import { createApp, markRaw, nextTick } from 'vue'
import type { Group } from 'zrender'
import { type ZRenderType } from 'zrender'

import App from './App.vue'
import { activeTreeId, openKeys, resetActiveTree, setActiveTreeId, tree } from './stores/tree'
import { resetActiveItemStyle, selecting, setActiveItemStyle, setup } from './stores/mask/mask'
import resizeDirective from './directives/resize'
import { isMask } from './stores/mask/shapes'
import type { TreeItem } from './stores/types'

type Elements = ReturnType<ZRenderType['storage']['getRoots']>

export interface ZrenderDevtools {
  mount: (id: any) => void;
  unmount: () => void;
}

export function createDevtools (ins: ZRenderType): ZrenderDevtools {
  function mapElement (elements: Elements): TreeItem[] {
    return elements
      .filter(ele => {
        if ('__skip_zr_devtool' in ele) {
          return !ele.__skip_zr_devtool
        } else {
          return true
        }
      })
      .map(ele => {
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
          type: ele.type,
          target: markRaw(ele),
        }
      }) as TreeItem[]
  }

  function flush () {
    const _activeTreeId = activeTreeId.value
    const _openKeys = openKeys.value
    resetActiveTree()

    nextTick(() => {
      tree.value = mapElement(ins.storage.getRoots())
      openKeys.value = _openKeys
      setActiveTreeId(_activeTreeId)
    })
  }

  function getTargetId (target: Elements[0]) {
    // HACK for text
    if (target.parent && target.parent.type === 'text') {
      return target.parent.id
    }
    return target.id
  }

  let vm: VueApp

  const mount = (id: any) => {
    tree.value = mapElement(ins.storage.getRoots())

    ins.on('click', e => {
      if (selecting.value) {
        selecting.value = false
        resetActiveItemStyle()
        if (isMask(e.target)) {
          setActiveTreeId(e.target.target_id, true)
          return
        }
      }
    })

    ins.on('mousemove', e => {
      if (e.target && e.target.id) {
        if (selecting.value) {
          if (isMask(e.target)) {
            return
          }
          setActiveItemStyle(getTargetId(e.target))
        }
      }
    })

    setup(ins)

    vm = createApp(App, { flush }).directive('resize', resizeDirective)
    vm.mount(id)
  }

  function unmount () {
    vm?.unmount()
  }

  return { mount, unmount }
}
