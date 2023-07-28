<script setup lang="ts">
definePageMeta({
  layout: 'base-layout'
})

const title = ref('Dolphin Admin Docs')
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
  </Head>
  <main class="w-screen h-screen bg-gray-100 flex items-center justify-center">
    <div class="flex flex-col space-y-8 text-2xl items-center">
      <div class="flex space-x-2 items-center">
        <div>Dolphin Admin Docs</div>
        <img
          width="50"
          height="50"
          src="~/assets/images/favicon.png"
          alt=""
        />
      </div>
      <div class="flex space-x-2 items-center">
        <div class="text-sm">Powered by Bit Ocean</div>
        <img
          width="24"
          height="24"
          src="~/assets/images/bit_ocean.png"
          alt=""
        />
      </div>
    </div>
  </main>
</template>
