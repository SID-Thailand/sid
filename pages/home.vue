<script setup lang="ts">
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})
</script>

<template>
  <div>
    <Meta name="robots" content="noindex" />
    <Meta name="googlebot" content="noindex" />
    <HomeContent />
  </div>
</template>
