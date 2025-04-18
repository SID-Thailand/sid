<script setup lang="ts">
import type { iNewsContent } from '~/types/newsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  news: iStory<iNewsContent>[]
}

defineProps<iProps>()
</script>

<template>
  <section class="news">
    <div class="news__wrapper">News List</div>
  </section>
</template>

<style scoped lang="scss"></style>
