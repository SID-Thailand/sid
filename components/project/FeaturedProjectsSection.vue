<script lang="ts" setup>
import type { iProjectFeaturedProjects } from '~/types/story'

interface IProps {
  content: iProjectFeaturedProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="project-feat-pr">
    <div class="project-feat-pr__wrapper container">FeaturedProjects</div>
  </section>
</template>

<style scoped lang="scss"></style>
