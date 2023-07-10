<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const numberData = reactive({
  startValue: 0,
  endValue: 3000,
  duration: 3000
})

const numberAnimationRef = ref()

const handleNumber = () => numberAnimationRef.value.handleIsStart()

const handleContinue = () => numberAnimationRef.value.handleIsContinue()

const handlePause = () => numberAnimationRef.value.handleIsPause()
</script>

<template>
  <main>
    <NCard hoverable>
      <div class="flex flex-col items-center space-y-4 sm:space-y-4">
        <NumberAnimation
          ref="numberAnimationRef"
          class="text-4xl font-semibold text-blue-500 sm:text-6xl"
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
              :label="t('DigitalAnimation.StartValuePlaceholder')"
              path="startValue"
            >
              <NInputNumber v-model:value="numberData.startValue" />
            </NFormItem>

            <NFormItem
              :label="t('DigitalAnimation.EndValuePlaceholder')"
              path="endValue"
            >
              <NInputNumber v-model:value="numberData.endValue" />
            </NFormItem>

            <NFormItem
              :label="t('DigitalAnimation.DurationPlaceholder')"
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
            {{ t('Common.Start') }}
          </NButton>
          <NButton @click="handlePause">{{ t('Common.Pause') }}</NButton>
          <NButton @click="handleContinue">{{ t('Common.Continue') }}</NButton>
        </div>
      </div>
    </NCard>
  </main>
</template>
