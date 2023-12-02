<script setup lang="ts">
import type { ECharts, ECOption, PieChartProps } from '..'
import { echarts } from '..'

const ThemeStore = useThemeStore()

const props = withDefaults(defineProps<PieChartProps>(), {
  title: '',
  subtext: '',
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
      subtext: props.subtext,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: props.data.map((item) => item.name)
    },
    series: {
      type: 'pie',
      radius: '50%',
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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
