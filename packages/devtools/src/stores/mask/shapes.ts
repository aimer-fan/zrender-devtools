import type {
  BezierCurveProps, EllipseProps, GroupProps, IsogonProps,
  PolygonProps, RectProps, SectorProps,
} from 'zrender'
import type { ArcProps } from 'zrender'
import type { CircleProps } from 'zrender'
import type { DropletProps } from 'zrender'
import type { HeartProps } from 'zrender'
import type { RoseProps } from 'zrender'
import type { StarProps } from 'zrender'
import type { TrochoidProps } from 'zrender'
import {
  Arc, BezierCurve, Circle, Droplet, Ellipse, Group, Heart, Isogon,
  Polygon, Rect, Rose, Sector, Star, Trochoid,
} from 'zrender'

interface CustomMask { target_id: number }

export class MaskGroup extends Group {
  __skip_zr_devtool = true
  constructor (public target_id: number, props?: GroupProps) {
    super(props)
  }
}
export class MaskArc extends Arc {
  constructor (public target_id: number, props?: ArcProps) {
    super(props)
  }
}
export class MaskBezierCurve extends BezierCurve {
  constructor (public target_id: number, props?: BezierCurveProps) {
    super(props)
  }
}
export class MaskCircle extends Circle {
  constructor (public target_id: number, props?: CircleProps) {
    super(props)
  }
}
export class MaskDroplet extends Droplet {
  constructor (public target_id: number, props?: DropletProps) {
    super(props)
  }
}
export class MaskEllipse extends Ellipse {
  constructor (public target_id: number, props?: EllipseProps) {
    super(props)
  }
}
export class MaskHeart extends Heart {
  constructor (public target_id: number, props?: HeartProps) {
    super(props)
  }
}
export class MaskIsogon extends Isogon {
  constructor (public target_id: number, props?: IsogonProps) {
    super(props)
  }
}
export class MaskRose extends Rose {
  constructor (public target_id: number, props?: RoseProps) {
    super(props)
  }
}
export class MaskSector extends Sector {
  constructor (public target_id: number, props?: SectorProps) {
    super(props)
  }
}
export class MaskStar extends Star {
  constructor (public target_id: number, props?: StarProps) {
    super(props)
  }
}
export class MaskTrochoid extends Trochoid {
  constructor (public target_id: number, props?: TrochoidProps) {
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

export function isMask<T> (target: T): target is T & CustomMask {
  return 'target_id' in (target as CustomMask)
}
