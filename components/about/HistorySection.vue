<script setup lang="ts">
import type { iAboutHistory } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHistory
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-history container">
    <div class="ab-history__wrapper">About History</div>
  </section>
</template>

<style scoped lang="scss"></style>
