<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const router = useRouter()

const props = defineProps<{
  item: MenuOption
}>()

const handleJump = (key: any) => {
  router.push({ name: key })
}
</script>

<template>
  <div
    class="flex w-[1/4] flex-col items-center justify-center space-y-2 rounded-md hover:bg-gray-200 sm:h-[112px] sm:w-[112px]"
    @click="handleJump(props.item.key)"
  >
    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
      <NIcon
        class="cursor-pointer"
        :component="props.item.icon"
        :size="24"
      />
    </div>
    <div>
      <component :is="props.item.label" />
    </div>
  </div>
</template>
