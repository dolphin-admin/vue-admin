<script setup lang="ts">
import { NumberAnimation } from './components'

const numberData = reactive({
  duration: 3000,
  startValue: 0,
  endValue: 3000
})
const isStart = ref(false)

const numberAnimationRef = ref()

const handleNumber = () => {
  numberAnimationRef.value.handleNumberValue(numberData)
  isStart.value = true
}
</script>
<template>
  <main>
    <NCard
      title="数字动画"
      hoverable
    >
      <div class="flex flex-col items-center space-y-6">
        <div>
          <NumberAnimation
            ref="numberAnimationRef"
            :number-data="numberData"
            :is-start="isStart"
          />
        </div>
        <div>
          <NForm
            class="!inline-flex items-center justify-between"
            label-placement="top"
            :model="numberData"
            inline
          >
            <NFormItem
              :span="12"
              label="请输入开始值"
              path="inputNumberValue"
            >
              <NInputNumber v-model:value="numberData.startValue" />
            </NFormItem>
            <NFormItem
              :span="12"
              label="请输入结束值"
              path="inputNumberValue"
            >
              <NInputNumber v-model:value="numberData.endValue" />
            </NFormItem>
            <NFormItem
              :span="12"
              label="请输入持续时间"
              path="duration"
            >
              <NInputNumber v-model:value="numberData.duration" />
            </NFormItem>
          </NForm>
        </div>
        <div>
          <NButton
            type="primary"
            class="!mr-4"
            @click="handleNumber"
            >开始</NButton
          >
          <NButton>暂停/继续</NButton>
        </div>
      </div>
    </NCard>
  </main>
</template>
