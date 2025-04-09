<script lang="ts" setup>
import type { iProjectForm } from '~/types/story'

interface IProps {
  content: iProjectForm
}

defineProps<IProps>()
</script>

<template>
  <section class="project-form">
    <div class="project-form__wrapper container">Form</div>
  </section>
</template>

<style scoped lang="scss"></style>
