<script setup lang="ts">
import type { MessageSchema } from '@/types'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'

const { t } = useI18n<{ message: MessageSchema }>()
const themeStore = useThemeStore()

const isAppearanceTransition = () =>
  // @ts-expect-error Transition API
  typeof document.startViewTransition !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const handleToggleTheme = async (event: MouseEvent) => {
  if (!isAppearanceTransition()) {
    themeStore.toggleTheme()
    return
  }
  const { clientX: x, clientY: y } = event
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )
  // @ts-expect-error Transition API
  const transition = document.startViewTransition(() => themeStore.toggleTheme())
  await transition.ready
  const { isDarkTheme } = themeStore
  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
  document.documentElement.animate(
    {
      clipPath: isDarkTheme ? clipPath : [...clipPath].reverse()
    },
    {
      duration: 500,
      easing: 'ease-in-out',
      pseudoElement: isDarkTheme ? '::view-transition-new(root)' : '::view-transition-old(root)'
    }
  )
}
</script>

<template>
  <NTooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <NIcon
        class="cursor-pointer"
        size="20"
        :color="themeStore.isLightTheme ? '#FDC022' : '#FED736'"
        :component="themeStore.isDarkTheme ? SunIcon : MoonIcon"
        @click="handleToggleTheme"
      />
    </template>
    {{ t('TEMP.Header.SwitchTheme') }}
  </NTooltip>
</template>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 9999;
}

::view-transition-new(root) {
  z-index: 1;
}

[data-theme='dark']::view-transition-old(root) {
  z-index: 1;
}

[data-theme='dark']::view-transition-new(root) {
  z-index: 9999;
}
</style>
