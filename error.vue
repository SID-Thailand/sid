<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main>
    <NotFound v-if="error.statusCode === 404" @error="handleError" />
    <p v-else>{{ error.statusCode }}</p>
  </main>
</template>
