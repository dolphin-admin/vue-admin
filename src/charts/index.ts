import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import type {
  AxisPointerComponentOption,
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'
import {
  AxisPointerComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | AxisPointerComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册组件，按需引入
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  AxisPointerComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
])

type ECharts = echarts.ECharts

export { echarts }
export type { ECharts, ECOption }

export interface BarChartItem {
  label: string
  value: number
}

export interface BarChartProps {
  title: string
  data: BarChartItem[]
  color?: string
}

export interface PieChartItem {
  name: string
  value: number
}

export interface PieChartProps {
  title: string
  subtext: string
  data: PieChartItem[]
}

export interface LineChartProps {
  title: string
  xAxisData: string[]
  data: number[]
}
