<script setup lang="ts">
import type { iAboutTeam } from '~/types/aboutTypes'

interface IProps {
  content: iAboutTeam
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-team container">
    <div class="ab-team__wrapper">About Team</div>
  </section>
</template>

<style scoped lang="scss"></style>
