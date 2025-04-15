<script setup lang="ts">
import type { iConsultingExperts } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingExperts
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-experts container">
    <div class="cons-experts__wrapper">Consulting Experts</div>
  </section>
</template>

<style scoped lang="scss"></style>
