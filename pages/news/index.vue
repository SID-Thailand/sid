<script lang="ts" setup>
import HeroSection from '~/components/news/HeroSection.vue'
import { useNewsStories } from '~/composables/stories/newsStories'
import { useNewsStory } from '~/composables/stories/newsStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useNewsStory()
const { news } = await useNewsStories()

const filteredNews = ref(news.value)

const categories = computed(() => {
  return news.value
    .map(currNews => currNews?.content?.category?.content?.name)
    .filter((name, idx, arr) => arr.indexOf(name) === idx)
})

const onFilter = (category: string) => {
  filteredNews.value = news.value.filter(
    currNews => currNews?.content?.category?.content?.name === category
  )
}

const onGetAll = () => {
  filteredNews.value = news.value
}

const resolveSectionByName = (name: string) => {
  const sections = {
    news_home: HeroSection,
  }

  return sections[name]
}

const meta = computed(() => {
  const data = story?.value?.content?.meta[0]

  if (!data) {
    return null
  }

  return {
    title: data.title,
    description: data.description,
    ogImage: data?.image?.filename,
  }
})
</script>

<template>
  <div>
    <PageMeta v-if="meta" v-bind="meta" />
    <component
      :is="resolveSectionByName(story?.content?.component)"
      v-if="resolveSectionByName(story?.content?.component)"
      v-editable="story?.content"
      :content="story?.content"
      :categories="categories"
      @filter="onFilter"
      @get-all="onGetAll"
    />
    <div v-else>
      <p>Unknown component: {{ story?.content?.component }}</p>
    </div>
    <NewsList :news="filteredNews" />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss"></style>
