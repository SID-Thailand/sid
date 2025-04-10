<script setup lang="ts">
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})
</script>

<template>
  <div>
    <meta robots="noindex" />
    <meta name="googlebot" content="noindex" />
    <HomeContent />
  </div>
</template>
