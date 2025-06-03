<script setup lang="ts">
import FormSection from '~/components/current-news/FormSection.vue'
import HeroSection from '~/components/current-news/HeroSection.vue'
import { useCurrentNewsStory } from '~/composables/stories/currentNewsStory'
import { useNewsStories } from '~/composables/stories/newsStories'
import { useNewsStory } from '~/composables/stories/newsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string)
const { news } = await useNewsStories()
const { story: newsIndex } = await useNewsStory()

if (!story.value) {
  showError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const content = computed(() => story.value?.content)
</script>

<template>
  <div v-if="story">
    <HeroSection
      :title="content?.title"
      :date="story?.first_published_at"
      :category="content?.category?.content?.name"
      :asset="content?.asset"
    />
    <DynamicBlockRenderer :blocks="content?.body" />
    <FormSection
      :background="content?.form_bg"
      :title="content?.form_title"
      :news-title="content?.title"
    />
    <CurrentNewsOtherNews
      :news="news"
      class="current-news-list"
      :title="newsIndex?.content?.other_news_title || 'Other News'"
    />
    <BookTheMeetings
      :cta="story?.content?.cta"
      :page="'Article' + content?.title"
    />
  </div>
</template>

<style scoped lang="scss">
.current-news-list {
  background-color: var(--basic-black);
}
</style>
