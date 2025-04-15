<script setup lang="ts">
import type { iConsultingDifference } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingDifference
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-diff container">
    <div class="cons-diff__wrapper">Consulting Difference</div>
  </section>
</template>

<style scoped lang="scss"></style>
