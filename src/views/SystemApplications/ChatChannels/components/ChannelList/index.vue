<script setup lang="ts">
import IcOutlineSettingsIcon from '~icons/ic/outline-settings'
import IcSharpKeyboardVoiceIcon from '~icons/ic/sharp-keyboard-voice'

import { chatroomMenuOptions } from '../../private'

const activeKey = ref<string | null>(null)
</script>

<template>
  <div class="relative h-full border-red-300">
    <div>
      <NMenu
        v-model:value="activeKey"
        :root-indent="20"
        :indent="12"
        :options="chatroomMenuOptions"
      />
    </div>
    <div
      class="bg-grey-300 absolute bottom-0 flex h-14 w-full items-center justify-between border p-2"
    >
      <div class="flex h-full items-center justify-start space-x-2">
        <div class="h-8 w-8 shrink-0">
          <img
            class="cursor-pointer select-none rounded-full border"
            width="32"
            height="32"
            src="@/assets/images/favicon.png"
            alt=""
            loading="eager"
          />
        </div>
        <div>
          <div class="mr-1 inline-block text-sm font-bold">Upwards</div>
          <div class="text-xs font-thin">在线</div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <component :is="IcSharpKeyboardVoiceIcon"></component>
        <component :is="IcOutlineSettingsIcon"></component>
      </div>
    </div>
  </div>
</template>
