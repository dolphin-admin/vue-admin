<script setup lang="ts">
const showModal = ref<boolean>(false)

const openModal = () => {
  showModal.value = true
}

const toggleShowModal = (e: boolean) => {
  showModal.value = e
}
</script>

<template>
  <div>
    <span @click="() => openModal()"> 打开弹窗 </span>
    <DolphinModalDialog
      v-model:show-modal="showModal"
      @update:show-modal="toggleShowModal"
    >
      弹窗内容
    </DolphinModalDialog>
  </div>
</template>
