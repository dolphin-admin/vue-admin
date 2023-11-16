<template>
  <RouterView v-slot="{ Component }">
    <Transition
      name="slide-fade"
      mode="out-in"
    >
      <component
        :is="Component"
        class="relative min-h-[calc(100%-144px)] w-full p-2 sm:p-4"
      />
    </Transition>
  </RouterView>
</template>
