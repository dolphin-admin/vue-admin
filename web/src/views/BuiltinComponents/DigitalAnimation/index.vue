<script setup lang="ts">
// TODO: 考虑统一导出 Component 中的类型
import type { Status } from '@/components/NumberAnimation/private'
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const numberData = reactive({
  startValue: 0,
  endValue: 3000,
  duration: 3000
})

// TODO: 考虑为 Ref 标注类型
const numberAnimationRef = ref()

const currentStatus = ref<Status>('pending')

const handleStart = () => numberAnimationRef.value.start()

const handlePause = () => numberAnimationRef.value.pause()

const handleStatusChange = (status: Status) => {
  currentStatus.value = status
}
</script>

<template>
  <main>
    <NCard hoverable>
      <div class="flex flex-col items-center space-y-4 sm:space-y-4">
        <NumberAnimation
          ref="numberAnimationRef"
          class="text-4xl font-semibold text-blue-500 sm:text-6xl"
          v-bind="numberData"
          @status:change="handleStatusChange"
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
            :disabled="
              currentStatus !== 'pending' && currentStatus !== 'stopped'
            "
            @click="handleStart"
          >
            {{ t('Common.Start') }}
          </NButton>
          <NButton
            :disabled="currentStatus !== 'running'"
            @click="handlePause"
          >
            {{ t('Common.Pause') }}
          </NButton>
          <NButton
            :disabled="currentStatus !== 'paused'"
            @click="handleStart"
          >
            {{ t('Common.Continue') }}
          </NButton>
        </div>
      </div>
    </NCard>
  </main>
</template>
