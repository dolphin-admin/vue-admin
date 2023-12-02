<script setup lang="ts">
import { BuiltInFont } from '@/constants/fonts'
import type { MessageSchema } from '@/types'
import SettingsIcon from '~icons/line-md/cog'

const { t } = useI18n<{ message: MessageSchema }>()
const isMobile = useMobile()
const themeStore = useThemeStore()
const NMessage = useMessage()

const fontOptions = [
  { label: 'Nunito', value: BuiltInFont.NUNITO },
  { label: 'Jetbrains Mono', value: BuiltInFont.JET_BRAINS_MONO }
]

const themeConfig = reactive({
  fontFamily: themeStore.fontFamily
})

const [showDrawer, toggleShowDrawer] = useToggle(false)

const handleConfirm = () => {
  if (!themeConfig.fontFamily) {
    NMessage.error(t('VALIDATION.FONT'))
    return
  }
  themeStore.changeFontFamily(themeConfig.fontFamily)
  toggleShowDrawer()
}

watch(
  () => showDrawer.value,
  () => {
    themeConfig.fontFamily = themeStore.fontFamily
  }
)
</script>

<template>
  <NTooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <NIcon
        class="cursor-pointer"
        size="20"
        :component="SettingsIcon"
        @click="toggleShowDrawer()"
      />
    </template>
    {{ t('COMMON.SETTINGS') }}
  </NTooltip>

  <NDrawer
    v-model:show="showDrawer"
    :width="isMobile ? '100%' : 400"
  >
    <NDrawerContent
      :title="t('COMMON.PREFERENCE')"
      :header-style="{ height: '56px', width: '100%' }"
      :native-scrollbar="false"
      closable
    >
      <NForm>
        <NFormItem :label="t('COMMON.FONT')">
          <NSelect
            v-model:value="themeConfig.fontFamily"
            :options="fontOptions"
            :placeholder="t('VALIDATION.FONT')"
            clearable
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <n-button @click="handleConfirm">{{ t('COMMON.CONFIRM') }}</n-button>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
