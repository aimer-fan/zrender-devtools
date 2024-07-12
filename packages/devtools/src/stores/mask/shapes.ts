import type { BezierCurveProps, GroupProps, PolygonProps, RectProps } from 'zrender'
import type { ArcProps } from 'zrender'
import type { CircleProps } from 'zrender'
import { Arc, BezierCurve, Circle, Group, Polygon, Rect } from 'zrender'

interface CustomMask { target_id: number }

export class MaskGroup extends Group {
  __skip_zr_devtool = true
  constructor (public target_id: number, props?: GroupProps) {
    super(props)
  }
}

// Arc
export class MaskArc extends Arc {
  constructor (public target_id: number, props?: ArcProps) {
    super(props)
  }
}

// BezierCurve
export class MaskBezierCurve extends BezierCurve {
  constructor (public target_id: number, props?: BezierCurveProps) {
    super(props)
  }
}

export class MaskRect extends Rect {
  constructor (public target_id: number, props?: RectProps) {
    super(props)
  }
}

export class MaskPolygon extends Polygon {
  constructor (public target_id: number, props?: PolygonProps) {
    super(props)
  }
}

export class MaskCircle extends Circle {
  constructor (public target_id: number, props?: CircleProps) {
    super(props)
  }
}

export function isMask<T> (target: T): target is T & CustomMask {
  return 'target_id' in (target as CustomMask)
}
