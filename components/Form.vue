<script setup lang="ts">
import { useFormStory } from '~/composables/stories/formStory'

interface IProps {
  title?: string
  description?: string
  btnText?: string
}

defineProps<IProps>()
const { story } = await useFormStory()
</script>

<template>
  <form class="form">
    <div class="form__wrapper">
      <legend class="form__title">{{ title }}</legend>
      <p class="form__description">{{ description }}</p>
    </div>
  </form>
</template>

<style scoped lang="scss"></style>
