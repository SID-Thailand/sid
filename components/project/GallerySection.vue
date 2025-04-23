<script lang="ts" setup>
import type { iCurrentProjectGallery } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectGallery
}

defineProps<IProps>()
</script>

<template>
  <section class="project-gallery">
    <FullImageSlider :images="content?.images || []" />
  </section>
</template>

<style scoped lang="scss"></style>
