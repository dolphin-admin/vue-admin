<script setup lang="ts">
import { barChartData } from './private'
</script>

<template>
  <div class="h-full">
    <NCard class="h-1/3 !w-1/3">
      <BarChart
        id="BarChart"
        class="h-full w-full"
        title="热门歌曲排行"
        :data="barChartData"
      />
    </NCard>
  </div>
</template>
