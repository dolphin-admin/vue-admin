<script setup lang="ts"></script>

<template>
  <main class="h-screen w-full">
    <BaseHeader />
    <div class="flex h-[calc(100%-64px)]">
      <BaseSidebar />
      <div class="relative h-full w-[calc(100%-160px)] overflow-y-scroll">
        <div class="min-h-full w-full">
          <RouterView v-slot="{ Component }">
            <component :is="Component" />
          </RouterView>
        </div>
        <BaseFooter />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 10px;
  border: 4px solid #f5f5f5;
}

/* 鼠标悬停在滚动条上方时显示的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #999;
  border-color: #f5f5f5;
}

/* 滚动条角落 */
::-webkit-scrollbar-corner {
  background-color: #f5f5f5;
}
</style>
