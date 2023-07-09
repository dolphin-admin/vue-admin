<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const numberData = reactive({
  startValue: 0,
  endValue: 3000,
  duration: 3000
})

const numberAnimationRef = ref()

const handleNumber = () => numberAnimationRef.value.handleNumberValue(numberData)
</script>

<template>
  <main>
    <NCard
      :title="t('数字动画')"
      hoverable
    >
      <div class="flex flex-col items-center space-y-4 sm:space-y-4">
        <NumberAnimation
          ref="numberAnimationRef"
          class="font-semibold text-blue-500"
          :number-data="numberData"
          font-size="60"
        />

        <div>
          <NForm
            label-placement="top"
            :model="numberData"
            class="flex flex-col items-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0"
            :show-feedback="false"
          >
            <NFormItem
              :label="t('请输入开始值')"
              path="startValue"
            >
              <NInputNumber v-model:value="numberData.startValue" />
            </NFormItem>

            <NFormItem
              :label="t('请输入结束值')"
              path="endValue"
            >
              <NInputNumber v-model:value="numberData.endValue" />
            </NFormItem>

            <NFormItem
              :label="t('请输入持续时间')"
              path="duration"
            >
              <NInputNumber v-model:value="numberData.duration" />
            </NFormItem>
          </NForm>
        </div>

        <div class="flex items-center space-x-4">
          <NButton
            type="primary"
            @click="handleNumber"
          >
            {{ t('开始') }}
          </NButton>
          <NButton>{{ t('暂停/继续') }}</NButton>
        </div>
      </div>
    </NCard>
  </main>
</template>
