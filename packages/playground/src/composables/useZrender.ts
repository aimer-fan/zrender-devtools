import type { Ref } from 'vue'
import { onMounted, shallowRef } from 'vue'
import { Group, init, type ZRenderType } from 'zrender'
import {
  arc, bezierCurve, circle, compoundPath, droplet,
  ellipse, heart, image, isogon, line, path, polygon,
  polyline, rect, rose, sector, star, text, trochoid,
} from './shapes'


function dragable (zr: ZRenderType, group: Group) {
  let dragging = false
  let lastX
  let lastY
  zr.on('mousedown', (e) => {
    dragging = true
    lastX = e.offsetX
    lastY = e.offsetY
  })
  zr.on('mousemove', (e) => {
    if (dragging) {
      const deltaX = e.offsetX - lastX
      const deltaY = e.offsetY - lastY
      group.setPosition([group.x + deltaX, group.y + deltaY])
      group.dirty()
      lastX = e.offsetX
      lastY = e.offsetY
    }
  })
  zr.on('mouseup', () => {
    dragging = false
  })
}

function resizeable (zr: ZRenderType, group: Group) {
  const MIN_SCALE = 0.1
  zr.on('mousewheel', (e) => {
    const delta = e.wheelDelta / 10
    const scaleX = group.scaleX + delta > MIN_SCALE ? group.scaleX + delta : MIN_SCALE
    const scaleY = group.scaleY + delta > MIN_SCALE ? group.scaleY + delta : MIN_SCALE
    group.setOrigin([e.offsetX, e.offsetY])
    group.setScale([scaleX, scaleY])
    group.dirty()
  })
}

export function useZrender (ref: Ref<HTMLElement>) {
  const zr = shallowRef<ZRenderType>()
  const rootGroup = new Group({
    x: 24,
    y: 24,
  })


  const initZrender = () => {
    zr.value = init(ref.value)

    zr.value.on('click', (e) => {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      window.t = e.target
    })

    ;[
      text(0, 0),
      rect(0, 200),
      arc(0, 400),
      bezierCurve(0, 600),
      circle(0, 800),

      compoundPath(400, 0),
      droplet(400, 200),
      ellipse(400, 400),
      heart(400, 600),
      image(400, 800),

      isogon(800, 0),
      line(800, 200),
      path(800, 400),
      polygon(800, 600),
      polyline(800, 800),

      rose(1200, 0),
      sector(1200, 200),
      star(1200, 400),
      trochoid(1200, 600),
    ].forEach(ele => rootGroup.add(ele))


    dragable(zr.value, rootGroup)
    resizeable(zr.value, rootGroup)
    zr.value.add(rootGroup)
  }

  onMounted(initZrender)

  return { zr }
}
