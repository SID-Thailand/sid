<script setup lang="ts">
import AboutSection from '~/components/home/AboutSection.vue'
import CompanyDirectionsSection from '~/components/home/CompanyDirectionsSection.vue'
import FeaturedProjects from '~/components/home/FeaturedProjects.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import NumbersSection from '~/components/home/NumbersSection.vue'
import VideoSection from '~/components/home/VideoSection.vue'
import QuizSection from '~/components/quiz/QuizSection.vue'
import { useHomeStory } from '~/composables/stories/homeStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useHomeStory()

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    home_hero: HeroSection,
    home_about: AboutSection,
    company_directions: CompanyDirectionsSection,
    home_numbers: NumbersSection,
    home_video: VideoSection,
    featured_projects: FeaturedProjects,
    quiz_block: QuizSection,
  }

  return sections[name]
}

const arrowDown = story?.value?.content?.scroll_down_text
</script>

<template>
  <div>
    <template v-for="item in body" :key="item.component">
      <component
        :is="resolveSectionByName(item.component)"
        :content="item"
        :arrow="arrowDown"
      />
    </template>

    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss"></style>
