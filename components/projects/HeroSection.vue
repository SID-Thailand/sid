<script setup lang="ts">
import type { iProjectsHeroContent } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsHeroContent
}

defineProps<IProps>()
</script>

<template>
  <section class="projects-hero">
    <div class="projects-hero__wrapper">Projects Hero</div>
  </section>
</template>

<style scoped lang="scss"></style>
