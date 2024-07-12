import { Circle, Group } from 'zrender'
import type { Arc, Displayable, Polygon } from 'zrender'
import type { TreeItem } from '../types'
import { MaskArc, MaskPolygon, MaskRect } from './shapes'

/** Mask Background Color */
const MASK_BG_COLOR = 'rgba(66, 184, 131, 0.4)'

function getPointsGroup (points: number[][], scale: number) {
  const pointsGroup = new Group()
  points.forEach(([cx, cy]) => {
    pointsGroup.add(new Circle({
      shape: { cx, cy, r: 2 * scale },
      style: { fill: 'red' },
    }))
  })
  return pointsGroup
}

export const handler = {
  arc: (group: Group, id: number, arc: Arc) => {
    const shape = arc.shape
    const [cx, cy] = arc.transformCoordToGlobal(shape.cx, shape.cy)
    const scaleX = arc.getGlobalScale()[0]

    group.add(new MaskArc(id, {
      shape: {
        cx,
        cy,
        r: shape.r * scaleX,
        startAngle: shape.startAngle,
        endAngle: shape.endAngle,
      },
      style: { fill: MASK_BG_COLOR },
    }))
  },

  polygon: (group: Group, id: number, polygon: Polygon) => {
    const [scaleX] = polygon.getGlobalScale()
    const points = polygon.shape.points
      .map(([x, y]) => polygon.transformCoordToGlobal(x, y))

    group.add(new MaskPolygon(id, {
      shape: { points },
      style: { fill: MASK_BG_COLOR },
    }))
    group.add(getPointsGroup(points, scaleX))
  },

  default: (group: Group, id: number, shape: Displayable) => {
    const boundingRect = shape.getBoundingRect()
    const [x, y] = shape.transformCoordToGlobal(boundingRect.x, boundingRect.y)
    const [scaleX, scaleY] = shape.getGlobalScale()

    group.add(new MaskRect(id, {
      shape: {
        x,
        y,
        width: boundingRect.width * scaleX,
        height: boundingRect.height * scaleY,
      },
      style: { fill: MASK_BG_COLOR },
    }))
  },
}

export const maskHandler = (group: Group, item: TreeItem) => {
  const boundingRect = item.target.getBoundingRect()
  if (boundingRect) {
    const { target, type } = item
    const { id } = target

    switch (type) {
      case 'arc':
        handler.arc(group, id, target)
        break

      case 'polygon':
      case 'polyline': {
        handler.polygon(group, id, target)
        break
      }

      case 'rect':
      default: {
        handler.default(group, id, target as Displayable)
        break
      }
    }
  }
}
