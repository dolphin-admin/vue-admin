<script setup lang="ts">
import ClearIcon from '~icons/ic/baseline-clear'
const router = useRouter()

const props = defineProps<{
  data: MenuOption
}>()

const emit = defineEmits<{
  close: [status: string]
}>()

const handleClose = () => emit('close', props.data.key as string)
</script>

<template>
  <div
    class="group relative flex w-[1/4] flex-col items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-slate-500 sm:h-[112px] sm:w-[112px]"
    @click="router.push({ name: props.data.key as string })"
  >
    <div
      class="bg-gary-100 invisible absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 group-hover:visible dark:bg-black"
      @click.stop="handleClose"
    >
      <NIcon
        :component="ClearIcon"
        :size="12"
      />
    </div>
    <div class="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-black">
      <component :is="props.data.icon as any" />
    </div>
    <component :is="props.data.label" />
  </div>
</template>
