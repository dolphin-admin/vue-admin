<script setup lang="ts">
import type { Status } from '@/components/DCountdown/private'
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
const countdownRef = ref()
const numberData = reactive({
  target: 120
})
const currentStatus = ref<Status>('pending')

const handleStart = () => countdownRef.value.start()
const handlePause = () => countdownRef.value.pause()
const handleRestart = () => countdownRef.value.restart()
const changeCountdown = (time: number, status: Status) => {
  currentStatus.value = status
}
</script>

<template>
  <main>
    <NCard hoverable>
      <div class="flex flex-col items-center space-y-4 sm:space-y-4">
        <DCountdown
          ref="countdownRef"
          :target="numberData.target"
          @change="changeCountdown"
        ></DCountdown>
        <div>
          <NForm
            label-placement="top"
            :model="numberData"
            class="flex flex-col items-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0"
            :show-feedback="false"
          >
            <NFormItem
              :label="t('Countdown.StartValueTime')"
              path="target"
            >
              <NInputNumber v-model:value="numberData.target" />
            </NFormItem>
          </NForm>
        </div>
        <div class="flex items-center space-x-4">
          <NButton
            :disabled="
              currentStatus !== 'pending' && currentStatus !== 'stopped'
            "
            type="primary"
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
          <NButton @click="handleRestart">
            {{ t('Common.Refresh') }}
          </NButton>
        </div>
      </div>
    </NCard>
  </main>
</template>

