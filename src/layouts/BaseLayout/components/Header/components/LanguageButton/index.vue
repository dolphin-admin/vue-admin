<script setup lang="ts">
import { Lang } from '@dolphin-admin/utils'

import LanguageIcon from '~icons/ion/language-outline'

const route = useRoute()
const langStore = useLangStore()

const languages = ref([
  { label: 'English', key: Lang['en-US'], disabled: false },
  { label: '简体中文', key: Lang['zh-CN'], disabled: false }
])

/**
 * 重置语言选项，当前语言不可选
 */
const resetLanguageOptions = (lang: string) =>
  setTimeout(() => {
    languages.value = languages.value.map((language) => ({
      ...language,
      disabled: language.key === lang
    }))
  }, 150)

/**
 * 更新语言
 * @param lang 语言
 * @description
 * - 为了更好的用户体验（因为下拉框选项消失的过渡动画），这里延迟 150ms 执行更新语言的操作
 * - 更新 Document 的标题
 * - 将选择的语言存储到 localStorage 中，以便下次进入应用时加载上次选择的语言
 */
const handleUpdateLang = (lang: string) => {
  resetLanguageOptions(lang)
  langStore.setLang(lang)
  SiteUtils.setDocumentTitle(route.meta.title)
}
</script>
<template>
  <NDropdown
    trigger="hover"
    :options="languages"
    @select="handleUpdateLang"
  >
    <NIcon
      class="cursor-pointer"
      size="20"
      :component="LanguageIcon"
    />
  </NDropdown>
</template>
