import Stats from 'stats.js'
import { onMounted, onUnmounted, ref } from 'vue'

export function useStats () {
  let stats: Stats
  let frameId = 0
  const wrapper = ref<HTMLElement>()

  function setup () {
    stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom

    wrapper.value.appendChild(stats.dom)
    stats.dom.style.position = 'absolute'
    stats.dom.style.left = 'auto'
    stats.dom.style.right = '0'

    // document.body.appendChild(stats.dom)
    function animate () {
      stats.begin()
      stats.end()
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)
  }

  function dispose () {
    stats.dom.remove()
    frameId && cancelAnimationFrame(frameId)
    stats = null
    frameId = 0
  }

  onMounted(setup)
  onUnmounted(dispose)

  return { wrapper }
}
