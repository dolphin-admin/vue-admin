<script setup lang="ts">
import { barChartData, lineChartData, lineChartXAxisData, pieChartData } from './private'
</script>

<template>
  <main class="flex-col space-y-4">
    <div class="flex space-x-4">
      <NCard class="h-[300px] !w-1/2">
        <BarChart
          id="BarChart"
          class="h-full w-full"
          title="热门歌曲排行"
          :data="barChartData"
        />
      </NCard>
      <NCard class="h-[300px] !w-1/2">
        <PieChart
          class="h-full w-full"
          title="热门歌曲排行分布"
          subtext="热门歌曲分布表"
          :data="pieChartData"
        />
      </NCard>
    </div>
    <div class="flex space-x-4">
      <NCard class="h-[300px] !w-1/2">
        <LineChart
          :x-axis-data="lineChartXAxisData"
          class="h-full w-full"
          title="热门歌曲分布"
          :data="lineChartData"
        />
      </NCard>
      <NCard
        :bordered="false"
        class="h-[300px] !w-1/2"
      ></NCard>
    </div>
  </main>
</template>
