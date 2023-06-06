<script setup lang="ts">
import { useCounterStore } from '@/store'
import PlusIcon from '~icons/ic/baseline-plus'
import RemoveIcon from '~icons/ic/baseline-remove'
const counterStore = useCounterStore()
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 pb-20 text-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="160"
        height="160"
        src="@/assets/images/favicon.png"
        alt=""
      />
      <div class="flex select-none flex-col space-y-2">
        <span class="text-2xl font-semibold">Store</span>
        <span class="text-base tracking-wider">{{ counterStore.count }}</span>
        <div class="flex items-center space-x-3 pt-2 text-white">
          <div
            class="cursor-pointer rounded-sm bg-blue-400 p-1"
            @click="() => counterStore.increment()"
          >
            <PlusIcon />
          </div>
          <div
            class="cursor-pointer rounded-sm bg-blue-400 p-1"
            @click="() => counterStore.decrement()"
          >
            <RemoveIcon />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
