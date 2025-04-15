<script setup lang="ts">
import type { iConsultingExpertise } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingExpertise
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-expertise container">
    <div class="cons-expertise__wrapper">Consulting Expertise</div>
  </section>
</template>

<style scoped lang="scss"></style>
