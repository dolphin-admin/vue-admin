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
  <main class="flex h-screen w-screen items-center justify-center bg-gray-100">
    <div class="flex flex-col items-center space-y-8 text-2xl">
      <div class="flex items-center space-x-2">
        <div>Dolphin Admin Docs</div>
        <img
          width="50"
          height="50"
          src="~/assets/images/favicon.png"
          alt=""
        />
      </div>
      <div class="flex items-center space-x-2">
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
