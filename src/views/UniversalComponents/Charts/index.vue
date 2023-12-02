<script setup lang="ts">
import { barChartData, lineChartData, pieChartData } from './private'
</script>

<template>
  <main class="space-y-4">
    <div
      class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
      hoverable
    >
      <NCard
        class="h-[300px] !w-full sm:!w-1/2"
        hoverable
      >
        <DpBarChart
          id="BarChart"
          class="h-full w-full"
          title="热门歌曲排行"
          :data="barChartData"
        />
      </NCard>
      <NCard
        class="h-[300px] !w-full sm:!w-1/2"
        hoverable
      >
        <DpPieChart
          class="h-full w-full"
          title="热门歌曲排行分布"
          subtext="热门歌曲分布表"
          :data="pieChartData"
        />
      </NCard>
    </div>
    <div class="flex w-full space-x-0 sm:space-x-4">
      <NCard
        class="h-[300px] !w-full sm:!w-[calc(50%-8px)]"
        hoverable
      >
        <DpLineChart
          class="h-full w-full"
          title="热门歌曲分布"
          :data="lineChartData"
        />
      </NCard>
    </div>
  </main>
</template>
