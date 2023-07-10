<script setup lang="ts">
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

interface BarChartProps {
  value: number[]
  label: string[]
}

interface Props {
  id: string
  title: string
  data: BarChartProps
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  title: '',
  data: () => ({
    value: [],
    label: []
  })
})

const chart = ref<any>(null)

const getChartData = () => {
  const option: EChartsOption = {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: props.data.label,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: props.data.value
      }
    ]
  }
  chart.value.setOption(option)
}

const initChart = () => {
  chart.value = echarts.init(document.getElementById(props.id))
  getChartData()
}

onMounted(() => initChart())

onUnmounted(() => chart.value.dispose())

watch(
  () => props.data,
  () => getChartData(),
  { deep: true }
)
</script>

<template>
  <div
    :id="props.id"
    class="w-80 h-80"
  ></div>
</template>
