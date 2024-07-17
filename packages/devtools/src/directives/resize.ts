import type { Directive } from 'vue'

type PixelType = number | string

type DirectionType = 'top' | 'right' | 'bottom' | 'left'

interface IOptions {
  direction?: DirectionType;
  limit?: [PixelType, PixelType];
  onResize?: (e: MouseEvent) => void;
  onResizeEnd?: () => void;
}

interface ResizerOptions extends IOptions {
  direction: DirectionType;
  limit: [PixelType, PixelType];
}

const defaultOptions: ResizerOptions = {
  direction: 'right',
  limit: [0, Infinity],
}

class Resizer {

  el: HTMLElement | null

  parentEl: HTMLElement | null

  parentResizeObserver: ResizeObserver

  resizeController: HTMLElement | null = null

  resizeLine: HTMLElement | null = null

  options: ResizerOptions = { ...defaultOptions }
  limit: [number, number]

  isResizing = false

  mouse = {
    x: 0,
    y: 0,
  }
  domSize: {
    width: number;
    height: number;
  }
  recordUserSelect = 'auto'

  constructor (el: HTMLElement, options: ResizerOptions) {
    this.el = el

    this.options = {
      ...defaultOptions,
      ...options,
    }
    this.domSize = {
      width: el.clientWidth,
      height: el.clientHeight,
    }
    this.updateLimit()
    this.createController()
    this.addEvent()

    this.parentEl = el.parentElement || document.body
    this.parentResizeObserver = new ResizeObserver(() => {
      this.updateLimit()
      switch (this.options.direction) {
        case 'top':
        case 'bottom':
          if (el.clientHeight > this.limit[1]) {
            el.style.height = `${this.limit[1]}px`
          } else if (el.clientHeight < this.limit[0]) {
            el.style.height = `${this.limit[0]}px`
          }
          break
        case 'left':
        case 'right':
          if (el.clientWidth > this.limit[1]) {
            el.style.width = `${this.limit[1]}px`
          } else if (el.clientWidth < this.limit[0]) {
            el.style.width = `${this.limit[0]}px`
          }
          break
        default:
          break
      }
    })
    this.parentResizeObserver.observe(this.parentEl)
  }

  updateLimit () {
    if (!this.el) return
    const { direction, limit } = this.options
    this.limit = limit.map((item, index) => {
      if (typeof item === 'number') return item
      const value = parseFloat(item)
      if (Number.isNaN(value)) {
        return index === 0 ? 0 : Infinity
      }
      if (item.endsWith('px')) {
        return value
      }
      if (item.endsWith('rem')) {
        return value * parseFloat(getComputedStyle(document.documentElement).fontSize || '16px')
      }
      if (item.endsWith('em')) {
        return value * parseFloat(getComputedStyle(this.el!).fontSize || '16px')
      }
      if (item.endsWith('vh')) {
        return value * window.innerHeight / 100
      }
      if (item.endsWith('vw')) {
        return value * window.innerWidth / 100
      }
      if (item.endsWith('%')) {
        let parentSize = 0
        if (this.el?.parentElement) {
          if (direction === 'top' || direction === 'bottom') {
            parentSize = this.el.parentElement.clientHeight
          } else {
            parentSize = this.el.parentElement.clientWidth
          }
        }
        return value / 100 * parentSize
      }
      return value
    }) as [number, number]
  }

  setHoverStyles = () => {
    if (!this.resizeLine) return
    this.resizeLine.style.backgroundColor = 'var(--td-brand-color)' // 设置 hover 时的背景颜色
  }
  removeHoverStyles = () => {
    if (!this.resizeLine) return
    this.resizeLine.style.backgroundColor = 'transparent' // 设置 hover 时的背景颜色
  }
  createController () {
    const resizeController = document.createElement('div')
    resizeController.classList.add('resize-controler')
    const resizeLine = document.createElement('div')
    resizeLine.classList.add('resize-line')
    resizeController.appendChild(resizeLine)

    const controlerZIndex = 999
    const controlerSize = 2

    resizeController.addEventListener('mouseenter', this.setHoverStyles)
    resizeController.addEventListener('mouseleave', this.removeHoverStyles)

    switch (this.options.direction) {
      case 'top':
      case 'bottom':
        resizeController.style.cssText = `
                    position: absolute;
                    z-index: ${controlerZIndex};
                    ${this.options.direction}: -${controlerSize * 3 / 2}px;
                    left: 0;
                    width: 100%;
                    padding: ${controlerSize}px 0;
                    cursor: ns-resize;
                    transition: all 0.3s;
                `
        resizeLine.style.cssText = `
                    width: 100%;
                    height: ${controlerSize}px;
                    background-color: transparent;
                `
        break
      case 'left':
      case 'right':
        resizeController.style.cssText = `
                    position: absolute;
                    z-index: ${controlerZIndex};
                    top: 0;
                    ${this.options.direction}: -${controlerSize * 3 / 2}px;
                    padding: 0 ${controlerSize}px;
                    height: 100%;
                    cursor: ew-resize;
                    transition: all 0.3s;
                `
        resizeLine.style.cssText = `
                    width: ${controlerSize}px;
                    height: 100%;
                    background-color: transparent;
                `
        break
      default:
        break
    }
    this.resizeController = resizeController
    this.resizeLine = resizeLine
    this.el?.appendChild(resizeController)
  }

  handleMouseDown = (e: MouseEvent) => {
    if (!this.el) return
    this.isResizing = true
    this.mouse.x = e.clientX
    this.mouse.y = e.clientY
    this.domSize = {
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    }
    this.updateLimit()
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    this.recordUserSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'
  }
  handleMouseMove = (e: MouseEvent) => {
    if (!this.isResizing || !this.el) return
    const [min, max] = this.limit
    const offsetX = e.clientX - this.mouse.x
    const offsetY = e.clientY - this.mouse.y
    let newWidth = this.domSize.width
    let newHeight = this.domSize.height

    switch (this.options.direction) {
      case 'top':
        newHeight = Math.max(min, Math.min(newHeight - offsetY, max))
        this.el.style.height = `${newHeight}px`
        break
      case 'right':
        newWidth = Math.max(min, Math.min(newWidth + offsetX, max))
        this.el.style.width = `${newWidth}px`
        break
      case 'bottom':
        newHeight = Math.max(min, Math.min(newHeight + offsetY, max))
        this.el.style.height = `${newHeight}px`
        break
      case 'left':
        newWidth = Math.max(min, Math.min(newWidth - offsetX, max))
        this.el.style.width = `${newWidth}px`
        break
      default:
        break
    }
    // 更新元素尺寸
    this.options.onResize?.(e)
  }
  handleMouseUp = () => {
    this.isResizing = false
    document.body.style.userSelect = this.recordUserSelect
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
    this.options.onResizeEnd?.()
  }
  addEvent () {
    if (!this.resizeController) return
    this.resizeController.addEventListener('mousedown', this.handleMouseDown)
  }

  dispose () {
    this.parentResizeObserver.disconnect()
    if (this.resizeController) {
      this.resizeController.removeEventListener('mouseenter', this.setHoverStyles)
      this.resizeController.removeEventListener('mouseleave', this.removeHoverStyles)
      this.resizeController.removeEventListener('mousedown', this.handleMouseDown)
      this.resizeController.remove()
      this.resizeController = null
    }
    if (this.resizeLine) {
      this.resizeLine.remove()
      this.resizeLine = null
    }
    this.isResizing = false
  }

}

const resizers = new Map<HTMLElement, Resizer>()

const resizeDirective: Directive<HTMLElement, IOptions> = {
  mounted (el, binding) {
    const options = {
      ...defaultOptions,
      ...binding.value,
    }
    const resizer = new Resizer(el, options) // 创建新的 Resizer 实例
    resizers.set(el, resizer) // 将 Resizer 实例存储到 Map 中
  },
  beforeUnmount (el) {
    const dragger = resizers.get(el)
    dragger?.dispose()
    resizers.delete(el) // 从 Map 中删除对应的 Dragger 实例
  },
}

export default resizeDirective
