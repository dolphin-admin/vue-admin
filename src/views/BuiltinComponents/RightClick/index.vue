<script setup lang="ts">
import type { MenuItem } from '@/components/DRightClick/private'
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const message = useMessage()

const menu = ref<MenuItem[]>([
  { label: '菜单1', key: 'handle' },
  { label: '菜单2', key: 'handle' },
  { label: '菜单3', key: 'handle' },
  { label: '菜单4', key: 'handle' }
])

const handleClick = (e: MenuItem) => message.success(t('RightClick.Clicked', { label: e.label }))
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
            {{ t('RightClick.Tip') }}
          </div>
        </DRightClick>
        <DRightClick
          :menu="menu"
          @select="handleClick"
        >
          <div class="flex h-96 w-full items-center justify-center bg-yellow-500">
            {{ t('RightClick.Tip') }}
          </div>
        </DRightClick>
      </div>
    </NCard>
  </main>
</template>
