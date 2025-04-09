<script lang="ts" setup>
import type { iProjectAbout } from '~/types/story'

interface IProps {
  content: iProjectAbout
}

defineProps<IProps>()
</script>

<template>
  <section class="project-about">
    <div class="project-about__wrapper container">About</div>
  </section>
</template>

<style scoped lang="scss"></style>
