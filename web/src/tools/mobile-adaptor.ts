/**
 * @description 手机端适配，禁止手势放缩
 */
export const mobileAdaptor = () => {
  document.documentElement.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    },
    false
  )

  let lastTouchEnd = 0
  document.documentElement.addEventListener(
    'touchend',
    (event) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )

  document.addEventListener('gesturestart', (event) => {
    event.preventDefault()
  })
}
