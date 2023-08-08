<script setup lang="ts">
import type { Menu, Props } from './private'
import useContextMenu from './private/useContextMenu'

withDefaults(defineProps<Props>(), {
  menu: () => []
})
const emit = defineEmits<{
  (e: 'select', menu: Menu): void
}>()
const containerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const { x, y, showMenu } = useContextMenu(containerRef, menuRef)
const handleClick = (e: Menu) => {
  showMenu.value = false
  emit('select', e)
}
</script>

<template>
  <div
    ref="containerRef"
    class="w-full"
  >
    <slot></slot>
    <!-- 菜单发送到body  预防使用右击菜单页面中父元素有相对定位 影响布局 -->
    <Teleport to="body">
      <div
        v-if="showMenu"
        ref="menuRef"
        class="context-menu fixed cursor-pointer whitespace-nowrap rounded bg-white p-1 text-center text-sm text-black dark:truncate dark:bg-neutral-700 dark:text-[#ffffffd1]"
        :style="{ left: x + 'px', top: y + 'px' }"
      >
        <div
          v-for="(item, i) in menu"
          :key="i"
          class="h-9 rounded leading-9 hover:bg-[#F3F3F5] dark:hover:bg-[#ffffff17]"
          @click="handleClick(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  min-width: 120px;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>
