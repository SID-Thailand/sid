<script setup lang="ts">
import type { iConsultingHero } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingHero
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-hero container">
    <div class="cons-hero__wrapper">Consulting Hero</div>
  </section>
</template>

<style scoped lang="scss"></style>
