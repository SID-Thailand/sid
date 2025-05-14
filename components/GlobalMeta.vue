<script lang="ts" setup>
import { useGlobalMetaStory } from '~/composables/stories/globalMetaStory'

const { story } = await useGlobalMetaStory()

const title = computed(() => {
  return story.value?.content.title || ''
})

const description = computed(() => {
  return story.value?.content?.description || ''
})

const ogImage = computed(() => {
  return story.value?.content?.social_image.filename || ''
})
</script>

<template>
  <PageMeta
    :title="title"
    :description="description"
    :og-image="ogImage"
    :twitter-image="ogImage"
  />
</template>
