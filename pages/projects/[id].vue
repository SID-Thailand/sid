<script lang="ts" setup>
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { params } = useRoute()
</script>

<template>
  <div>
    <ProjectHeroSection />
    Current Project {{ params.id }}
  </div>
</template>

<style scoped lang="scss"></style>
