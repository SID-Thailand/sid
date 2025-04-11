<script lang="ts" setup>
import type { iProjectExterior } from '~/types/story'

interface IProps {
  content: iProjectExterior
}

defineProps<IProps>()
</script>

<template>
  <section class="project-exterior">
    <div class="project-exterior__wrapper container">Exterior</div>
  </section>
</template>

<style scoped lang="scss"></style>
