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
        class="context-menu fixed cursor-pointer truncate whitespace-nowrap rounded bg-zinc-50 text-center text-base text-black shadow-2xl"
        :style="{ left: x + 'px', top: y + 'px' }"
      >
        <div
          v-for="(item, i) in menu"
          :key="i"
          class="p-1 hover:bg-sky-700 hover:text-white"
          @click="handleClick(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.context-menu {
  min-width: 100px;
}
</style>
