<script setup lang="ts">
import type { MessageSchema } from '@/types'
import { GeoJSON, geoPath, geoMercator } from 'd3-geo'
import { Feature } from 'geojson'
import * as d3 from 'd3'
import countries from './private/countries.json'
import countrymesh from './private/countrymesh.json'
import { records } from './private'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const svgContainer = ref(null)

const initChart = () => {
  // Specify the chart’s dimensions.
  const width = 928
  const height = width / 2

  // Fit the projection.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [2, 2],
      [width, height]
    ],
    { type: 'Sphere' }
  )
  const path = d3.geoPath(projection)

  // Create the SVG container.
  const svg = d3
    .select(svgContainer.value)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  // // Add a white sphere with a black border.
  svg.append('path').datum(countries).attr('fill', 'white').attr('d', path)

  // Add a path for each country and color it according te this data.
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

  // Add a white mesh.
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
    .attr('r', 6)
    .attr('fill', 'red')
}

onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div>{{ t('TrafficStatistics.TrafficStatistics') }}</div>
    <div><svg ref="svgContainer"></svg></div>
  </div>
</template>
