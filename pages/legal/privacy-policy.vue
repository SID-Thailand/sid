<script lang="ts" setup>
import { usePolicyStory } from '~/composables/stories/policyStory'

const { story } = await usePolicyStory()
</script>

<template>
  <div>
    <pre>{{ story }}</pre>
  </div>
</template>
