<script setup lang="ts">
import FormSection from '~/components/current-news/FormSection.vue'
import HeroSection from '~/components/current-news/HeroSection.vue'
import { useCurrentNewsStory } from '~/composables/stories/currentNewsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string)

const content = computed(() => story.value?.content)

console.log(content.value)
</script>

<template>
  <div>
    <HeroSection
      :title="content?.title"
      :date="story?.first_published_at"
      :category="content?.category?.content?.name"
      :asset="content?.asset"
    />
    <DynamicBlockRenderer :blocks="content?.body" />

    <FormSection :background="content?.asset" :title="content?.title" />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>
