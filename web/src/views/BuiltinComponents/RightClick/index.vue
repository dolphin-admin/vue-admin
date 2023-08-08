<script setup lang="ts">
import type { Menu } from '@/components/DRightClick/private'

const menu: Menu[] = reactive([
  { label: '菜单1', key: 'handle' },
  { label: '菜单2', key: 'handle' },
  { label: '菜单3', key: 'handle' },
  { label: '菜单4', key: 'handle' }
])

const handleClick = (e: Menu) => {}
</script>

<template>
  <main>
    <NCard hoverable>
      <div class="flex justify-between">
        <DRightClick
          :menu="menu"
          @select="handleClick"
        >
          <div class="flex h-96 w-full items-center justify-center bg-blue-500">
            触发右击
          </div>
        </DRightClick>
        <DRightClick
          :menu="menu"
          @select="handleClick"
        >
          <div
            class="flex h-96 w-full items-center justify-center bg-yellow-500"
          >
            触发右击
          </div>
        </DRightClick>
      </div>
    </NCard>
  </main>
</template>
