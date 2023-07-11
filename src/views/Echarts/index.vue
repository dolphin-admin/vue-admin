<script setup lang="ts">
import { barChartData } from './private'
</script>

<template>
  <main class="flex">
    <NCard class="h-[300px] !w-1/2">
      <BarChart
        id="BarChart"
        class="h-full w-full"
        title="热门歌曲排行"
        :data="barChartData"
      />
    </NCard>
  </main>
</template>
