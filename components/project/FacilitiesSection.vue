<script lang="ts" setup>
import type { iProjectFacilities } from '~/types/story'

interface IProps {
  content: iProjectFacilities
}

defineProps<IProps>()
</script>

<template>
  <section class="project-facilities">
    <div class="project-facilities__wrapper container">Facilities</div>
  </section>
</template>

<style scoped lang="scss"></style>
