<script setup lang="ts">
import type { Lang, MessageSchema } from '@/types'

import type { Props } from './private'

const { t } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const props = withDefaults(defineProps<Props>(), {
  show: false,
  transformOrigin: 'center',
  maskClosable: true,
  positiveText: t('Common.Confirm'),
  negativeText: t('Common.Cancel')
})

const emit = defineEmits(['update:showModal'])

const show = ref(props.show)

const submitCallback = () => {}

const cancelCallback = () => {}

const closeCallback = () => {
  emit('update:showModal', show.value)
}

watch(
  () => props.show,
  (newVal) => {
    show.value = newVal
  },
  { immediate: true }
)
</script>

<template>
  <NModal
    v-model:show="show"
    preset="dialog"
    :mask-closable="props.maskClosable"
    :transform-origin="props.transformOrigin"
    :z-index="props.zIndex"
    :title="props.title"
    :content="props.content"
    :positive-text="props.positiveText"
    :negative-text="props.negativeText"
    @after-enter="() => {}"
    @after-leave="() => {}"
    @close="closeCallback"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
    @update:show="show = $event"
  >
    <template #icon>
      <NIcon
        size="24"
        :component="icon"
      />
    </template>
    <slot />
  </NModal>
</template>
