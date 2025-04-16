<script setup lang="ts">
import type { iConsultingYoutube } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingYoutube
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-youtube container">
    <div class="cons-youtube__wrapper">Consulting Youtube</div>
  </section>
</template>

<style scoped lang="scss"></style>
