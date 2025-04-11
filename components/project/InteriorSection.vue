<script lang="ts" setup>
import type { iProjectInterior } from '~/types/story'

interface IProps {
  content: iProjectInterior
}

defineProps<IProps>()
</script>

<template>
  <section class="project-interior">
    <div class="project-interior__wrapper container">Interior</div>
  </section>
</template>

<style scoped lang="scss"></style>
