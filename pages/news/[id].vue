<script setup lang="ts">
import FormSection from '~/components/current-news/FormSection.vue'
import HeroSection from '~/components/current-news/HeroSection.vue'
import { useCurrentNewsStory } from '~/composables/stories/currentNewsStory'
import { useNewsStories } from '~/composables/stories/newsStories'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string)
const { news } = await useNewsStories()

const content = computed(() => story.value?.content)
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
    <FormSection :background="content?.form_bg" :title="content?.title" />
    <NewsList :news="news" class="news-list" title="Other news" />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss">
.news-list {
  background-color: var(--basic-black);
}
</style>
