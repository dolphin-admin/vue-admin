<script setup lang="ts">
import { menuOptions } from '@/constants'
import router from '@/router'

const route = useRoute()

// 一级菜单选项
const firstLevelOptions = ref(menuOptions)
// 一级菜单路径渲染元素
const firstLevelPath = ref()

// 二级菜单选项
const secondLevelOptions = ref<MenuOption[]>([])
// 二级菜单路径渲染元素
const secondLevelPath = ref()

const handleSelect = (key: string) => router.push({ name: key })

watch(
  () => route.fullPath,
  () => {
    // 如果路由路径为 / ，清空面包屑
    if (route.fullPath === '/') {
      firstLevelPath.value = ''
      secondLevelPath.value = ''
      secondLevelOptions.value = []
      return
    }

    // 获取按照 / 分割的路由路径
    const routePath = route.fullPath.split('/').filter((path) => path !== '')

    // 获取一级菜单
    const firstLevelOption = firstLevelOptions.value.find((option) => option.key === routePath[0])
    // 如果一级菜单不存在，则直接返回
    if (!firstLevelOption) {
      return
    }
    // 设置一级菜单的路径
    firstLevelPath.value = firstLevelOption.label
    // 如果一级菜单没有二级菜单，则直接返回
    if (!firstLevelOption.children) {
      secondLevelOptions.value = []
      return
    }

    // 设置二级菜单的选项
    secondLevelOptions.value = firstLevelOption.children
    // 获取二级菜单
    const secondLevelOption = firstLevelOption.children.find((option) => option.key === routePath[1])
    // 如果二级菜单不存在，则直接返回
    if (!secondLevelOption) {
      secondLevelPath.value = ''
      return
    }
    // 设置二级菜单的路径
    secondLevelPath.value = secondLevelOption.label
  },
  { immediate: true }
)
</script>

<template>
  <div class="hidden sm:block">
    <NBreadcrumb>
      <NBreadcrumbItem>
        <NDropdown
          :options="firstLevelOptions"
          @select="handleSelect"
        >
          <div class="-mb-2 pb-2">
            <component
              :is="firstLevelPath"
              v-if="firstLevelPath"
            />
          </div>
        </NDropdown>
      </NBreadcrumbItem>
      <NBreadcrumbItem v-if="secondLevelOptions.length > 0">
        <NDropdown
          :options="secondLevelOptions"
          @select="handleSelect"
        >
          <div class="-mb-2 cursor-pointer pb-2">
            <component
              :is="secondLevelPath"
              v-if="secondLevelPath"
            />
          </div>
        </NDropdown>
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>
