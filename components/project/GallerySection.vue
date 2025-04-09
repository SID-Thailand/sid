<script lang="ts" setup>
import type { iProjectGallery } from '~/types/story'

interface IProps {
  content: iProjectGallery
}

defineProps<IProps>()
</script>

<template>
  <section class="project-gallery">
    <div class="project-gallery__wrapper container">Gallery</div>
  </section>
</template>

<style scoped lang="scss"></style>
