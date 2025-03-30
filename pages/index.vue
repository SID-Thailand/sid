<script setup lang="ts">
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeConnectSection />
  </div>
</template>

<style scoped lang="scss"></style>
