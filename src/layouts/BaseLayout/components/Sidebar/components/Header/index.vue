<script setup lang="ts">
const { APP_NAME } = AppMetadata

const router = useRouter()
const sidebarStore = useSidebarStore()
</script>
<template>
  <div
    class="flex h-14 w-full items-center justify-center"
    @click="router.push('/')"
  >
    <img
      class="animate-pulse cursor-pointer"
      width="36"
      height="36"
      src="@/assets/images/favicon.png"
      alt=""
      loading="eager"
    />
    <span
      class="cursor-pointer whitespace-nowrap text-sm tracking-wide transition-all"
      :class="[
        sidebarStore.isDisplay
          ? sidebarStore.isCollapse
            ? 'ml-0 hidden'
            : 'ml-3 w-auto'
          : 'hidden'
      ]"
    >
      {{ APP_NAME }}
    </span>
  </div>
</template>
