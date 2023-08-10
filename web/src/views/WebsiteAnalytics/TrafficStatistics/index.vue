<script setup lang="ts">
import * as d3 from 'd3'

const loaded = ref(false)

const initChart = (data: { features: any }) => {
  const { width } = d3.select('#map').node().getBoundingClientRect()
  const height = 580
  const sensitivity = 75

  const projection = d3
    .geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([0, -30])
    .translate([width / 2, height / 2])

  const initialScale = projection.scale()

  let path = d3.geoPath().projection(projection)

  const svg = d3
    .select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const globe = svg
    .append('circle')
    .attr('fill', '#EEE')
    .attr('stroke', '#000')
    .attr('stroke-width', '0.2')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', initialScale)

  svg
    .call(
      d3.drag().on('drag', () => {
        const rotate = projection.rotate()
        const k = sensitivity / projection.scale()
        projection.rotate([
          rotate[0] + d3.event.dx * k,
          rotate[1] - d3.event.dy * k
        ])
        path = d3.geoPath().projection(projection)
        svg.selectAll('path').attr('d', path)
      })
    )
    .call(
      d3.zoom().on('zoom', () => {
        if (d3.event.transform.k > 0.3) {
          projection.scale(initialScale * d3.event.transform.k)
          path = d3.geoPath().projection(projection)
          svg.selectAll('path').attr('d', path)
          globe.attr('r', projection.scale())
        } else {
          d3.event.transform.k = 0.3
        }
      })
    )

  const map = svg.append('g')

  // TODO: 匿名函数的 this 参数，可否换成 Arrow Function？ ------ Bruce Song
  map
    .append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('class', (d: any) => `country_${d.properties.name.replace(' ', '_')}`)
    .attr('d', path)
    .attr('fill', 'white')
    .style('stroke', 'black')
    .style('stroke-width', 0.3)
    .style('opacity', 0.8)
    .on('mouseover', function (this: SVGCircleElement) {
      d3.select(this)
        .attr('opacity', 0.8)
        .attr('fill', 'green')
        .attr('stroke-width', 2)
    })
    .on('mouseout', function (this: SVGCircleElement) {
      d3.select(this)
        .attr('opacity', 1)
        .attr('fill', 'skyblue')
        .attr('stroke-width', 1)
    })
    .append('title')
    .text((d: any) => `${d.properties.name}`)

  d3.timer(() => {
    const rotate = projection.rotate()
    const k = sensitivity / projection.scale()
    projection.rotate([rotate[0] - 1 * k, rotate[1]])
    path = d3.geoPath().projection(projection)
    svg.selectAll('path').attr('d', path)
  }, 200)

  loaded.value = true

  // svg
  //   .append('g')
  //   .selectAll('circle')
  //   .data([{ longitude: 31.299379, latitude: 120.619585 }])
  //   .join('circle')
  //   .attr('cx', (d: any) => projection([d.longitude, d.latitude])[0])
  //   .attr('cy', (d: any) => projection([d.longitude, d.latitude])[1])
  //   .on('mouseover', function (this: SVGCircleElement) {
  //     d3.select(this as any)
  //       .append('title')
  //       .text((d: any) => `${d.area}`)
  //   })
  //   .on('mouseout', function (this: SVGCircleElement) {
  //     d3.select(this).select('title').remove()
  //   })
  //   .attr('r', 2.8)
  //   .attr('fill', '#FF6666')
}

onMounted(() =>
  fetch(
    'https://raw.githubusercontent.com/recallwei/geojson/main/world/worldMap-zh.json'
  )
    .then((res) => res.json())
    .then((data) => initChart(data as { features: any }))
)
</script>

<template>
  <main
    class="transition-all"
    :class="loaded ? 'opacity-100' : 'opacity-0'"
  >
    <NCard
      hoverable
      :content-style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }"
    >
      <div
        id="map"
        class="w-full"
      ></div>
    </NCard>
  </main>
</template>
