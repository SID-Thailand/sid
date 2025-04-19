<script setup lang="ts">
import FormSection from '~/components/current-news/FormSection.vue'
import { useCurrentNewsStory } from '~/composables/stories/currentNewsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string)

console.log(story.value)
</script>

<template>
  <div>
    Current News {{ params?.id }}
    <FormSection :content="story?.content" />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>
