<script setup lang="ts">
import type { iConsultingService } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingService
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-service container">
    <div class="cons-service__wrapper">Consulting Service</div>
  </section>
</template>

<style scoped lang="scss"></style>
