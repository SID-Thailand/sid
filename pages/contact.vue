<script lang="ts" setup>
import { useContactStory } from '~/composables/stories/contactStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useContactStory()

console.log(story.value)
</script>

<template>
  <section>{{ story?.content?.title }}</section>
</template>

<style scoped lang="scss"></style>
