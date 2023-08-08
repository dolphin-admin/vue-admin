<script setup lang="ts">
import type { MenuItem, Props } from './private'
import { useContextMenu } from './private'

withDefaults(defineProps<Props>(), {
  menu: () => []
})

const emit = defineEmits<{
  select: [menuItem: MenuItem]
}>()

const containerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const { x, y, showMenu } = useContextMenu(containerRef, menuRef)

const handleClick = (e: MenuItem) => {
  showMenu.value = false
  emit('select', e)
}
</script>

<template>
  <div
    ref="containerRef"
    class="w-full"
  >
    <slot />
    <!-- 菜单发送到 body，预防使用右击菜单页面中父元素有相对定位影响布局 -->
    <Teleport to="body">
      <div
        v-if="showMenu"
        ref="menuRef"
        class="fixed min-w-[120px] cursor-pointer whitespace-nowrap rounded bg-white p-1 text-center text-sm shadow-md dark:bg-neutral-700"
        :style="{ left: x + 'px', top: y + 'px' }"
      >
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="h-9 rounded leading-9 transition-all hover:bg-[#F3F3F5] active:opacity-75 dark:hover:bg-[#ffffff17]"
          @click="handleClick(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </Teleport>
  </div>
</template>
