<script setup lang="ts">
import { menuOptions } from '@/constants'
import CollapseIcon from '~icons/line-md/chevron-triple-left'

const { APP_NAME } = AppMetadata

const route = useRoute()
const router = useRouter()
const sidebarStore = useSidebarStore()

const menuInstRef = ref<MenuInst | null>(null)
const menuData = ref(menuOptions)
const selectedKey = ref()
const accordion = ref(false)

const handleChangeRouter = () => {
  selectedKey.value = route.name
  menuInstRef.value?.showOption(route.name as string)
}

const handleChangeMenu = (key: string, item: MenuOption) => {
  if (item.children) {
    return
  }
  router.push({ name: key })
}

watch(
  () => route.name,
  () => handleChangeRouter(),
  { immediate: true }
)
</script>

<template>
  <div
    class="absolute inset-y-0 left-0 z-[100] h-full border-y border-r border-gray-300 bg-default-light shadow-sm transition-[width] dark:border-gray-950 dark:bg-default-dark sm:static"
    :class="[
      sidebarStore.isDisplay
        ? sidebarStore.isCollapse
          ? 'w-16'
          : 'w-56'
        : 'w-0'
    ]"
  >
    <!-- Header -->
    <div
      class="flex h-14 w-full select-none items-center justify-center"
      @click="router.push('/')"
    >
      <img
        class="animate-pulse cursor-pointer select-none"
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

    <!-- 菜单 -->
    <div class="h-[calc(100%-96px)]">
      <NScrollbar :size="10">
        <NMenu
          ref="menuInstRef"
          :collapsed-icon-size="20"
          :collapsed="sidebarStore.isCollapse"
          :options="menuData"
          :collapsed-width="64"
          :root-indent="18"
          :indent="26"
          :value="selectedKey"
          :accordion="accordion"
          @update:value="handleChangeMenu"
        />
      </NScrollbar>
    </div>

    <!-- 底部折叠按钮 -->
    <div
      v-if="sidebarStore.isDisplay"
      class="h-10 w-full p-1"
    >
      <div
        class="hover-container flex h-full w-full cursor-pointer items-center justify-center rounded-sm transition-all hover:bg-gray-200 active:opacity-75 dark:hover:bg-gray-600"
        @click="() => sidebarStore.toggleSidebarCollapse()"
      >
        <NIcon
          size="18"
          class="icon-animation transition-all"
          :class="[sidebarStore.isCollapse ? '!rotate-180' : '!rotate-0']"
          :component="CollapseIcon"
        />
      </div>
    </div>
  </div>

  <!-- 遮罩 -->
  <div
    class="absolute inset-0 z-[75] bg-black opacity-40 sm:hidden"
    :class="sidebarStore.isDisplay ? 'block' : 'hidden'"
    @click="sidebarStore.toggleSidebarDisplay()"
  />
</template>

<style scoped lang="scss">
.icon-animation {
  transition: all 0.3s ease-in-out;
}

.hover-container:hover .icon-animation {
  transform: scale(1.2);
  opacity: 0.9;
}

.hover-container:active .icon-animation {
  transform: scale(1);
  opacity: 0.75;
}
</style>
