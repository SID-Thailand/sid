<script setup lang="ts">
import type { iConsultingFeaturedProjects } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingFeaturedProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-f-pr container">
    <div class="cons-f-pr__wrapper">Consulting Featured Projects</div>
  </section>
</template>

<style scoped lang="scss"></style>
