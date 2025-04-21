<script setup lang="ts">
import FormSection from '~/components/current-news/FormSection.vue'
import HeroSection from '~/components/current-news/HeroSection.vue'
import { useCurrentNewsStory } from '~/composables/stories/currentNewsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string)

console.log(story.value)
</script>

<template>
  <div>
    <HeroSection
      :title="story?.content?.title"
      :date="story?.first_published_at"
      :category="story?.content?.category?.content?.name"
    />
    <FormSection
      :background="story?.content?.asset"
      :title="story?.content?.title"
    />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>
