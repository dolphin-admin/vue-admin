<script setup lang="ts">
import type { ECharts, ECOption, LineChartProps } from '..'
import { echarts } from '..'

const ThemeStore = useThemeStore()

const props = withDefaults(defineProps<LineChartProps>(), {
  title: '',
  data: () => []
})

const chartRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<ECharts | null>(null)

/*
 *监听窗口大小变化
 */

const handleResize = () => {
  if (chart.value) {
    chart.value.resize()
  }
}

// 监听窗口大小变化，重新计算图表的大小
useEventListener(window, 'resize', handleResize)

const getChartData = () => {
  const option: ECOption = {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#fff'
        }
      }
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: props.data.map((item) => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: {
      data: props.data.map((item) => item.value),
      type: 'line',
      smooth: true
    }
  }
  chart.value!.setOption(option)
}

// 初始化图表
const initChart = () => {
  chart.value = echarts.init(chartRef.value!, ThemeStore.theme)
  getChartData()
}

// 在组件挂载的时候初始化图表
onMounted(() => initChart())

// 在组件卸载的时候销毁图表
onUnmounted(() => chart.value!.dispose())

watch(
  () => props.data,
  () => getChartData(),
  { deep: true }
)

watch(
  () => ThemeStore.theme,
  () => {
    chart.value!.dispose()
    initChart()
  }
)
</script>

<template>
  <div
    ref="chartRef"
    class="h-full w-full"
  />
</template>
