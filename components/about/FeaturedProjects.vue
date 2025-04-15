<script setup lang="ts">
import type { iAboutFeaturedProjects } from '~/types/aboutTypes'

interface IProps {
  content: iAboutFeaturedProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-feat-pr container">
    <div class="ab-feat-pr__wrapper">About Featured Projects</div>
  </section>
</template>

<style scoped lang="scss"></style>
