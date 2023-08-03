<script setup lang="ts">
import type { TrafficData, UserTrafficsPageType } from '@/types'

import { countries, countrymesh } from './mock'

const userTrafficsParam = reactive<UserTrafficsPageType>({
  page: 1,
  pageSize: 1000
})

const userTrafficsData = ref<TrafficData[]>()

const svgContainer = ref(null)

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

const initChart = () => {
  const path = d3.geoPath(projection)

  // 创建 SVG Container
  const svg = d3
    .select(svgContainer.value)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  svg.append('path').datum(countries).attr('fill', 'white').attr('d', path)

  // TODO: 匿名函数的 this 参数，可否换成 Arrow Function？ ------ Bruce Song
  svg
    .append('g')
    .selectAll('path')
    .data(countries.features)
    .join('path')
    .attr('fill', 'skyblue')
    .attr('d', path)
    .on('mouseover', function (this: SVGCircleElement, _: any) {
      d3.select(this)
        .attr('opacity', 0.8)
        .attr('fill', 'green')
        .attr('stroke-width', 2)
    })
    .on('mouseout', function (this: SVGCircleElement, _: any) {
      d3.select(this)
        .attr('opacity', 1)
        .attr('fill', 'skyblue')
        .attr('stroke-width', 1)
    })
    .append('title')
    .text((d: any) => `${d.properties.name}`)

  svg
    .append('path')
    .datum(countrymesh)
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('d', path)
}

// 添加用户信息的位置
const addPosition = (svg: any, records: TrafficData[]) => {
  // 添加用户信息的位置
  svg
    .append('g')
    .selectAll('circle')
    .data(records)
    .join('circle')
    .attr('cx', (d: any) => projection([d.longitude, d.latitude])[0])
    .attr('cy', (d: any) => projection([d.longitude, d.latitude])[1])
    .on('mouseover', function (this: SVGCircleElement, _: any) {
      d3.select(this as any)
        .append('title')
        .text((d: any) => `${d.area}`)
    })
    .on('mouseout', function (this: SVGCircleElement, _: any) {
      d3.select(this).select('title').remove()
    })
    .attr('r', 2.8)
    .attr('fill', '#FF6666')
}

const getUserTraffic = (svg: any) => {
  TrafficAPI.getUserTraffics(userTrafficsParam)
    .then((res) => {
      userTrafficsData.value = res.data as TrafficData[]
      addPosition(svg, res.data)
    })
    .catch((error) => {
      userTrafficsData.value = []
    })
}

onMounted(() => {
  const svg = initChart()
  getUserTraffic(svg)
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
