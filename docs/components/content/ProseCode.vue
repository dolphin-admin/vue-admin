<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="bg-black/80 rounded-md shadow-sm my-4 pb-4">
    <div class="pt-2 pb-2 px-4 border-b border-dashed text-white font-mono text-xs/3 flex justify-between items-center">
      <span>{{ filename }}</span>
      <span>{{ language }}</span>
    </div>
    <div class="px-4 pt-2">
      <slot />
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
