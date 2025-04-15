<script setup lang="ts">
import AboutSection from '~/components/home/AboutSection.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import NumbersSection from '~/components/home/NumbersSection.vue'
import VideoSection from '~/components/home/VideoSection.vue'
import QuizSection from '~/components/quiz/QuizSection.vue'
import { useHomeStory } from '~/composables/stories/homeStory'
import PageMeta from '../PageMeta.vue'
import CompanyDirections from '../CompanyDirections.vue'
import FeaturedProjects from '../FeaturedProjects.vue'

const { story } = await useHomeStory()

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    home_hero: HeroSection,
    home_about: AboutSection,
    company_directions: CompanyDirections,
    home_numbers: NumbersSection,
    home_video: VideoSection,
    featured_projects: FeaturedProjects,
    quiz_block: QuizSection,
  }

  return sections[name]
}

const arrowDown = computed(() => story?.value?.content?.scroll_down_text)

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
    <template v-for="item in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        v-editable="item"
        :content="item"
        :arrow="arrowDown"
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>

    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>
