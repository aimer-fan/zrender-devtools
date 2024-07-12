import type { ElementProps, Element } from 'zrender'
import {
  Arc, BezierCurve, Circle, CompoundPath, Droplet,
  Ellipse, Group, Heart, Image, Isogon, Line, Polygon,
  Polyline, Rect, Rose, Sector, Star, Text,
  Trochoid,
} from 'zrender'
import { createFromString } from 'zrender/lib/tool/path.js'

function createShape (
  shapeName: string,
  element: Element<ElementProps>,
  pos: { x: number; y: number },
) {
  const group = new Group({
    x: pos.x,
    y: pos.y,
  })
  const text = new Text({
    style: {
      text: 'Shape: ' + shapeName,
      fontSize: 24,
    },
  })

  group.add(text)
  group.add(element)

  return group
}

export function text (x: number, y: number) {
  const g = new Group({
    x: 0,
    y: 32,
  })
  const t = new Text({
    rectHover: true,
    style: {
      text: 'the quick brown fox jumped',
      x: 0,
      y: 32,
      width: 100,
      fontSize: 24,
      borderWidth: 0.3,
      borderColor: '#000',
    },
  })
  const t2 = new Text({
    rectHover: true,
    style: {
      text: 'over the lazy dog',
      x: 0,
      y: 64,
      width: 100,
      fontSize: 24,
    },
  })

  g.add(t)
  g.add(t2)

  return createShape('Text', g, { x, y })
}

export function rect (x: number, y: number) {
  const r = new Rect({
    shape: {
      x: 0,
      y: 32,
      width: 100,
      height: 100,
    },
  })

  // r.animate('shape', true)
  //   .when(500, { x: 200 })
  //   .when(1000, { x: 0 })
  //   .start()
  return createShape('Rect', r, { x, y })
}

export function arc (x: number, y: number) {
  const r = new Arc({
    shape: {
      cx: 50,
      cy: 82,
      r: 50,
      startAngle: 0,
      endAngle: Math.PI * 1.5,
    },
  })
  return createShape('Arc', r, { x, y })
}

export function bezierCurve (x: number, y: number) {
  const b = new BezierCurve({
    shape: {
      x1: 0,
      y1: 82,
      x2: 80,
      y2: 82,
    },
  })

  return createShape('BezierCurve', b, { x, y })
}

export function circle (x: number, y: number) {
  const c = new Circle({
    shape: {
      cx: 50,
      cy: 82,
      r: 50,
    },
  })
  return createShape('Circle', c, { x, y })
}

// CompoundPath
export function compoundPath (x: number, y: number) {
  const c = new CompoundPath({
    shape: {
      paths: [
        createFromString('M 50 50 L 200 50 L 100 100 z'),
      ],
    },
  })

  return createShape('CompoundPath', c, { x, y })
}

// Droplet
export function droplet (x: number, y: number) {
  const c = new Droplet({
    shape: {
      cx: 50,
      cy: 82,
      width: 50,
      height: 50,
    },
  })
  return createShape('Droplet', c, { x, y })
}

// Ellipse
export function ellipse (x: number, y: number) {
  const e = new Ellipse({
    shape: {
      cx: 100,
      cy: 82,
      rx: 100,
      ry: 50,
    },
  })

  return createShape('Ellipse', e, { x, y })
}

// Heart
export function heart (x: number, y: number) {
  const h = new Heart({
    shape: {
      cx: 80,
      cy: 82,
      width: 60,
      height: 80,
    },
  })

  return createShape('Heart', h, { x, y })
}

// Image
export function image (x: number, y: number) {
  const img = new Image({
    style: {
      image: '/logo.png',
      x: 0,
      y: 32,
      width: 80,
      height: 80,
    },
  })
  return createShape('Image', img, { x, y })
}

// Isogon
export function isogon (x: number, y: number) {
  const i = new Isogon({
    shape: {
      x: 50,
      y: 82,
      r: 50,
      n: 6,
    },
  })
  return createShape('Isogon', i, { x, y })
}

// Line
export function line (x: number, y: number) {
  const l = new Line({
    shape: {
      x1: 0,
      y1: 82,
      x2: 100,
      y2: 82,
    },
  })
  return createShape('Line', l, { x, y })
}

// Path
export function path (x: number, y: number) {
  const p = createFromString('M 50 50 L 200 50 L 100 100 z')
  return createShape('Path', p, { x, y })
}

// Polygon
export function polygon (x: number, y: number) {
  const p = new Polygon({
    shape: {
      points: [
        [0, 72],
        [100, 52],
        [120, 100],
        [100, 152],
      ],
    },
  })
  return createShape('Polygon', p, { x, y })
}

// Polyline
export function polyline (x: number, y: number) {
  const p = new Polyline({
    shape: {
      points: [
        [0, 72],
        [100, 52],
        [120, 100],
        [100, 152],
      ],
    },
  })
  return createShape('Polyline', p, { x, y })
}

// Rose
export function rose (x: number, y: number) {
  const r = new Rose({
    shape: {
      cx: 50,
      cy: 82,
      r: [50],
      k: 7,
      n: 4,
    },
  })
  return createShape('Rose', r, { x, y })
}


// Sector
export function sector (x: number, y: number) {
  const s = new Sector({
    shape: {
      cx: 50,
      cy: 102,
      r: 50,
      r0: 10,
      startAngle: 0,
      endAngle: Math.PI * 1.5,
      clockwise: false,
    },
  })
  return createShape('Sector', s, { x, y })
}

// Star
export function star (x: number, y: number) {
  const s = new Star({
    shape: {
      cx: 50,
      cy: 82,
      r: 50,
      r0: 30,
      n: 5,
    },
  })
  return createShape('Star', s, { x, y })
}

// Trochoid
export function trochoid (x: number, y: number) {
  const t = new Trochoid({
    shape: {
      cx: 50,
      cy: 82,
      r: 20,
      r0: 10,
      d: 3,
    },
  })
  return createShape('Trochoid', t, { x, y })
}
