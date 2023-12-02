<script setup lang="ts">
import GithubIcon from '~icons/line-md/github-loop'

const { REPO_GITHUB_URL } = AppMetadata
</script>

<template>
  <NTooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <NIcon
        class="cursor-pointer"
        size="20"
        :component="GithubIcon"
        @click="() => BrowserUtils.openNewWindow(REPO_GITHUB_URL)"
      />
    </template>
    GitHub
  </NTooltip>
</template>
