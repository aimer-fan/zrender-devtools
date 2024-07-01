import type { GroupProps, RectProps, ZRenderType } from 'zrender'
import { Group, Rect } from 'zrender'
import { dfs } from '../shared/dfs'
import { tree } from './tree'
import { ref } from 'vue'

/** Mask Background Color */
const MASK_BG_COLOR = 'rgba(66, 184, 131, 0.4)'

let selectGroup: Group
let selectedId: number | undefined
let zr: ZRenderType

export const showGroup = ref(true)
export const selecting = ref(false)

interface SelectGroupProps extends GroupProps {}
export class SelectGroup extends Group {

  __skip_zr_devtool = true
  constructor (props?: SelectGroupProps) {
    super(props)
  }

}

interface SelectRectProps extends RectProps { target_id: number }
export class SelectRect extends Rect {

  __is_zr_devtool_select_rect = true
  target_id: number

  constructor (props?: SelectRectProps) {
    super(props)
    if (props?.target_id) {
      this.target_id = props.target_id
    }
  }

}

export function setup (ins: ZRenderType) {
  zr = ins
  selectGroup = new SelectGroup({ silent: false })
  zr.add(selectGroup)
}

export function setActiveItemStyle (id: number) {
  if (id === selectedId) return

  if (selectedId) {
    resetActiveItemStyle(selectedId)
  }

  selectedId = id
  const item = dfs(tree.value, id)
  if (item) {
    if (item.target instanceof Group && !showGroup.value) {
      return
    }

    const target = item.target
    const boundingRect = target.getBoundingRect()
    const [scaleX, scaleY] = target.getGlobalScale()
    if (boundingRect) {
      const [x, y] = target.transformCoordToGlobal(boundingRect.x, boundingRect.y)
      selectGroup.add(new SelectRect({
        target_id: target.id,
        shape: {
          x,
          y,
          width: boundingRect.width * scaleX,
          height: boundingRect.height * scaleY,
        },
        style: { fill: MASK_BG_COLOR },
      }))
    }
  }
}

export function resetActiveItemStyle (_id?: number) {
  selectGroup.removeAll()
  selectGroup.dirty()
  selectedId = undefined
}

// function onMousemove (e) {}
