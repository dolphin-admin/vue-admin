<script setup lang="ts">
import type { MessageSchema, UserTrafficsPageType, TrafficData } from '@/types'
import * as d3 from 'd3'

import { records, countrymesh, countries } from './mock'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const userTrafficsParam = reactive<UserTrafficsPageType>({
  page: 1,
  pageSize: 1000
})

const userTrafficsData = ref<TrafficData[]>()

const svgContainer = ref(null)

const initChart = (records: TrafficData[]) => {
  // 指定宽高
  const width = 1024
  const height = width / 2

  // 调整投影
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [2, 2],
      [width, height]
    ],
    { type: 'Sphere' }
  )
  const path = d3.geoPath(projection)

  // 创建 SVG Container
  const svg = d3
    .select(svgContainer.value)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  svg.append('path').datum(countries).attr('fill', 'white').attr('d', path)

  svg
    .append('g')
    .selectAll('path')
    .data(countries.features)
    .join('path')
    .attr('fill', 'skyblue')
    .attr('d', path)
    .on('mouseover', function (this: SVGCircleElement, d: any) {
      d3.select(this).attr('opacity', 0.8).attr('fill', 'green').attr('stroke-width', 2)
    })
    .on('mouseout', function (this: SVGCircleElement, d: any) {
      d3.select(this).attr('opacity', 1).attr('fill', 'skyblue').attr('stroke-width', 1)
    })
    .append('title')
    .text((d: any) => `${d.properties.name}`)

  svg.append('path').datum(countrymesh).attr('fill', 'none').attr('stroke', 'white').attr('d', path)

  //添加用户信息的位置
  svg
    .append('g')
    .selectAll('circle')
    .data(records)
    .join('circle')
    .attr('cx', (d: any) => projection([d.longitude, d.latitude])[0])
    .attr('cy', (d: any) => projection([d.longitude, d.latitude])[1])
    .on('mouseover', function (this: SVGCircleElement, d: any) {
      d3.select(this as any)
        .append('title')
        .text((d: any) => `${d.area}`)
    })
    .on('mouseout', function (this: SVGCircleElement, d: any) {
      d3.select(this).select('title').remove()
    })
    .attr('r', 2.8)
    .attr('fill', '#FF6666')
}

const getUserTraffic = () => {
  TrafficAPI.getUserTraffics(userTrafficsParam)
    .then((res) => {
      userTrafficsData.value = res.data as TrafficData[]
      console.log(res.data)
      initChart(userTrafficsData.value)
    })
    .catch((error) => {
      userTrafficsData.value = []
    })
}

onMounted(() => {
  getUserTraffic()
})
</script>

<template>
  <main>
    <NCard
      hoverable
      content-style="display: flex;justify-content: center;align-items: center;"
    >
      <svg ref="svgContainer"></svg>
    </NCard>
  </main>
</template>
