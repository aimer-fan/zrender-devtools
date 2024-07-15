import { Circle, Group } from 'zrender'
import type {
  Arc, BezierCurve, Displayable, Droplet, Ellipse, Heart, Isogon,
  Polygon, Rose, Sector, Star, Trochoid,
} from 'zrender'
import type { TreeItem } from '../types'
import {
  MaskArc, MaskBezierCurve, MaskCircle, MaskDroplet, MaskEllipse, MaskHeart, MaskIsogon,
  MaskPolygon, MaskRect, MaskRose, MaskSector,
  MaskStar,
  MaskTrochoid,
} from './shapes'

/** Mask Background Color */
const MASK_BG_COLOR = 'rgba(66, 184, 131, 0.4)'
const MASK_STROKE_COLOR = 'transparent'
const defaultMaskStyle = {
  fill: MASK_BG_COLOR,
  stroke: MASK_STROKE_COLOR,
}

function genPointsGroup (points: number[][], scale: number) {
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
      style: defaultMaskStyle,
    }))
  },

  'bezier-curve': (group: Group, id: number, curve: BezierCurve) => {
    const shape = curve.shape
    const [x1, y1] = curve.transformCoordToGlobal(shape.x1, shape.y1)
    const [x2, y2] = curve.transformCoordToGlobal(shape.x2, shape.y2)
    const [cpx1, cpy1] = curve.transformCoordToGlobal(shape.cpx1, shape.cpy1)

    group.add(new MaskBezierCurve(id, {
      shape: {
        x1,
        y1,
        x2,
        y2,
        cpx1,
        cpy1,
      },
      style: defaultMaskStyle,
    }))
  },

  circle: (group: Group, id: number, circle: Circle) => {
    const [cx, cy] = circle.transformCoordToGlobal(circle.shape.cx, circle.shape.cy)
    const r = circle.shape.r * circle.getGlobalScale()[0]

    group.add(new MaskCircle(id, {
      shape: { cx, cy, r },
      style: defaultMaskStyle,
    }))
  },

  droplet: (group: Group, id: number, droplet: Droplet) => {
    const [cx, cy] = droplet.transformCoordToGlobal(droplet.shape.cx, droplet.shape.cy)
    const [scaleX, scaleY] = droplet.getGlobalScale()
    const width = droplet.shape.width * scaleX
    const height = droplet.shape.height * scaleY
    group.add(new MaskDroplet(id, {
      shape: { cx, cy, width, height },
      style: defaultMaskStyle,
    }))
  },

  ellipse: (group: Group, id: number, ellipse: Ellipse) => {
    const [cx, cy] = ellipse.transformCoordToGlobal(ellipse.shape.cx, ellipse.shape.cy)
    const [scaleX, scaleY] = ellipse.getGlobalScale()
    const rx = ellipse.shape.rx * scaleX
    const ry = ellipse.shape.ry * scaleY

    group.add(new MaskEllipse(id, {
      shape: { cx, cy, rx, ry },
      style: defaultMaskStyle,
    }))
  },

  heart: (group: Group, id: number, heart: Heart) => {
    const [cx, cy] = heart.transformCoordToGlobal(heart.shape.cx, heart.shape.cy)
    const [scaleX, scaleY] = heart.getGlobalScale()
    const width = heart.shape.width * scaleX
    const height = heart.shape.height * scaleY
    group.add(new MaskHeart(id, {
      shape: { cx, cy, width, height },
      style: defaultMaskStyle,
    }))
  },

  isogon: (group: Group, id: number, isogon: Isogon) => {
    const [x, y] = isogon.transformCoordToGlobal(isogon.shape.x, isogon.shape.y)
    const [scaleX] = isogon.getGlobalScale()
    const r = isogon.shape.r * scaleX
    const n = isogon.shape.n
    group.add(new MaskIsogon(id, {
      shape: { x, y, r, n },
      style: defaultMaskStyle,
    }))
  },

  polygon: (group: Group, id: number, polygon: Polygon) => {
    const [scaleX] = polygon.getGlobalScale()
    const points = polygon.shape.points
      .map(([x, y]) => polygon.transformCoordToGlobal(x, y))

    group.add(new MaskPolygon(id, {
      shape: { points },
      style: defaultMaskStyle,
    }))
    group.add(genPointsGroup(points, scaleX))
  },

  rose: (group: Group, id: number, rose: Rose) => {
    const [cx, cy] = rose.transformCoordToGlobal(rose.shape.cx, rose.shape.cy)
    const [scaleX] = rose.getGlobalScale()
    const r = rose.shape.r.map(r => r * scaleX)
    const k = rose.shape.k
    const n = rose.shape.n
    group.add(new MaskRose(id, {
      shape: { cx, cy, r, k, n },
      style: defaultMaskStyle,
    }))
  },

  sector: (group: Group, id: number, sector: Sector) => {
    const [cx, cy] = sector.transformCoordToGlobal(sector.shape.cx, sector.shape.cy)
    const [scaleX] = sector.getGlobalScale()
    const r = sector.shape.r * scaleX
    const r0 = sector.shape.r0 * scaleX
    const startAngle = sector.shape.startAngle
    const endAngle = sector.shape.endAngle
    const clockwise = sector.shape.clockwise
    group.add(new MaskSector(id, {
      shape: { cx, cy, r, r0, startAngle, endAngle, clockwise },
      style: defaultMaskStyle,
    }))
  },

  star: (group: Group, id: number, star: Star) => {
    const [cx, cy] = star.transformCoordToGlobal(star.shape.cx, star.shape.cy)
    const [scaleX] = star.getGlobalScale()
    const r = star.shape.r * scaleX
    const r0 = star.shape.r0 * scaleX
    const n = star.shape.n
    group.add(new MaskStar(id, {
      shape: { cx, cy, r, r0, n },
      style: defaultMaskStyle,
    }))
  },

  trochoid: (group: Group, id: number, trochoid: Trochoid) => {
    const [cx, cy] = trochoid.transformCoordToGlobal(trochoid.shape.cx, trochoid.shape.cy)
    const [scaleX] = trochoid.getGlobalScale()
    const r = trochoid.shape.r * scaleX
    const r0 = trochoid.shape.r0 * scaleX
    const d = trochoid.shape.d
    group.add(new MaskTrochoid(id, {
      shape: { cx, cy, r, r0, d },
      style: defaultMaskStyle,
    }))
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
      style: defaultMaskStyle,
    }))
  },
}

export const maskHandler = (group: Group, item: TreeItem) => {
  const boundingRect = item.target.getBoundingRect()
  if (boundingRect) {
    const { target, type } = item
    const { id } = target

    if (type in handler) {
      handler[type](group, id, target)
      return
    }

    if (type === 'polyline') {
      handler.polygon(group, id, target)
      return
    }

    handler.default(group, id, (target as Displayable))
  }
}
