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
  <div class="my-4 rounded-md bg-black/80 pb-4 shadow-sm">
    <div
      class="flex items-center justify-between border-b border-dashed px-4 py-2 font-mono text-xs/3 text-white"
    >
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
