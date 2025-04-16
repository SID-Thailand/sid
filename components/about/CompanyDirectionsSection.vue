<script setup lang="ts">
import type { iAboutCompanyDrirections } from '~/types/aboutTypes'

interface IProps {
  content: iAboutCompanyDrirections
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-company container">
    <div class="ab-company__wrapper">About Company Directions</div>
  </section>
</template>

<style scoped lang="scss"></style>
