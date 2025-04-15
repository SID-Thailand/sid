<script setup lang="ts">
import type { iAboutMission } from '~/types/aboutTypes'

interface IProps {
  content: iAboutMission
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-mission container">
    <div class="ab-mission__wrapper">About Mission</div>
  </section>
</template>

<style scoped lang="scss"></style>
