<script setup lang="ts">
interface Props {
  showModal?: boolean
  title?: string
  content?: string
  positiveText?: string
  negativeText?: string
  transformOrigin?: 'center' | 'mouse'
}

const props = withDefaults(defineProps<Props>(), {
  title: '确认',
  content: '你确认?',
  positiveText: '确认',
  negativeText: '算了',
  transformOrigin: 'mouse'
})

const emit = defineEmits(['update:showModal'])

// const message = useMessage()

const show = ref<boolean>(false)

const submitCallback = () => {}

const cancelCallback = () => {}

const closeCallback = () => {
  emit('update:showModal', show.value)
}

watch(
  () => props.showModal,
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
    :title="props.title"
    :content="props.content"
    :positive-text="props.positiveText"
    :negative-text="props.negativeText"
    :transform-origin="props.transformOrigin"
    @update:show="show = $event"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
    @close="closeCallback"
  >
    <slot />
  </NModal>
</template>
