<script setup lang="ts">
import type { iAboutHero } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHero
}

defineProps<IProps>()
</script>

<template>
  <section class="about-hero container">
    <div class="about-hero__wrapper">About Hero</div>
  </section>
</template>

<style scoped lang="scss"></style>
