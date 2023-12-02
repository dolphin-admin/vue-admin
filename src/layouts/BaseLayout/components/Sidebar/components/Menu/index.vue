<script setup lang="ts">
import { menuOptions } from '@/constants'

const route = useRoute()
const router = useRouter()
const sidebarStore = useSidebarStore()

const menuInstRef = ref<MenuInst | null>(null)
const menuData = ref(menuOptions)
const accordion = ref(false)
const selectedKey = ref()

const handleChangeRouter = () => {
  selectedKey.value = route.name
  menuInstRef.value?.showOption(route.name as string)
}

watch(
  () => route.name,
  () => handleChangeRouter(),
  { immediate: true }
)

const handleChangeMenu = (key: string, item: MenuOption) => {
  if (item.children) {
    return
  }
  router.push({ name: key })
}
</script>

<template>
  <div class="h-[calc(100%-96px)]">
    <NScrollbar :size="10">
      <NMenu
        ref="menuInstRef"
        class="mt-[-4px]"
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
</template>
