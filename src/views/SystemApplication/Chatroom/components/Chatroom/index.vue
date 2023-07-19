<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div class="flex w-full flex-col space-y-2 p-2">
    <div class="mb-4 flex w-full">
      <div class="h-14 w-14 shrink-0">
        <img
          class="cursor-pointer select-none rounded-full border"
          width="50"
          height="50"
          src="@/assets/images/favicon.png"
          alt=""
          loading="eager"
        />
      </div>
      <div class="w-[calc(100%-56px)]">
        <span class="mr-1 inline-block text-sm">Upwards</span><small>今天14:23</small>
        <p class="break-words">
          237338237238237338237338237338237338237338237338237338237338237482978234732847328423748234032473284732847328rwe
        </p>
      </div>
    </div>
    <div class="mb-4 flex w-full">
      <div class="h-14 w-14 shrink-0">
        <img
          class="cursor-pointer select-none rounded-full border"
          width="50"
          height="50"
          src="@/assets/images/favicon.png"
          alt=""
          loading="eager"
        />
      </div>
      <div class="w-[calc(100%-56px)]">
        <span class="mr-1 inline-block text-sm">Upwards</span><small>今天14:23</small>
        <p class="break-words">
          237338237238237338237338237338237338237338237338237338237338237482978234732847328423748234032473284732847328rwe
        </p>
      </div>
    </div>
    <div class="mb-4 flex w-full">
      <div class="h-14 w-14 shrink-0">
        <img
          class="cursor-pointer select-none rounded-full border"
          width="50"
          height="50"
          src="@/assets/images/favicon.png"
          alt=""
          loading="eager"
        />
      </div>
      <div class="w-[calc(100%-56px)]">
        <span class="mr-1 inline-block text-sm">Upwards</span><small>今天14:23</small>
        <p class="break-words">
          237338237238237338237338237338237338237338237338237338237338237482978234732847328423748234032473284732847328rwe
        </p>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 mt-2 w-[100%] p-2 dark:bg-black">
    <NInput
      v-model:value="value"
      size="large"
    ></NInput>
  </div>
</template>
