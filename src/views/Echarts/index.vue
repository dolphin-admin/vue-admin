<script setup lang="ts">
const BarChartData = {
  value: [10, 52, 200, 334, 390, 330, 220],
  label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}
</script>

<template>
  <div>
    <BarChart
      title="柱状图"
      :data="BarChartData"
      id="BarChart"
    />
  </div>
</template>
