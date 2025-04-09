<script lang="ts" setup>
import { pageTransition } from '~/transitions/base'
import type { iProjectConcept } from '~/types/story'

interface IProps {
  content: iProjectConcept
}

const props = defineProps<IProps>()

definePageMeta({
  pageTransition,
})
console.log(props.content)
</script>

<template>
  <section class="project-concept">
    <div class="project-concept__wrapper container">Concept</div>
  </section>
</template>

<style scoped lang="scss"></style>
