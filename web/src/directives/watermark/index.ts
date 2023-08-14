import type { DirectiveBinding } from 'vue'

const addWatermark = (
  str: string,
  parentNode: HTMLElement,
  font: any,
  textColor: string
) => {
  const canvas = document.createElement('canvas')
  canvas.width = 120
  canvas.height = 80
  parentNode.appendChild(canvas)
  canvas.style.display = 'inline-block'
  const mark = canvas.getContext('2d') as CanvasRenderingContext2D
  mark.rotate((-20 * Math.PI) / 180)
  mark.font = font || '16px'
  mark.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  mark.textAlign = 'left'
  mark.textBaseline = 'middle' as CanvasTextBaseline
  mark.fillText(str, canvas.width / 10, canvas.height / 2)
}

export const watermark = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    addWatermark(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    )
  }
}
