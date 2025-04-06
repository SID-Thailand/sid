<script setup lang="ts">
import { useHomeStory } from '~/composables/stories/homeStory'
import { pageTransition } from '~/transitions/base'
import type { iHomeBody } from '~/types/story'

definePageMeta({
  pageTransition,
})

const { story } = await useHomeStory()

const homeSections = computed((): iHomeBody => {
  const body = story?.value?.content?.body as any[]

  return {
    about: body.find(item => item?.component === 'home_about'),
    hero: body.find(item => item?.component === 'home_hero'),
    company_directions: body.find(
      item => item?.component === 'company_directions'
    ),
    numbers: body.find(item => item?.component === 'home_numbers'),
    video: body.find(item => item?.component === 'home_video'),
    featured_projects: body.find(
      item => item?.component === 'featured_projects'
    ),
    quiz_block: body.find(item => item?.component === 'quiz_block'),
  }
})
</script>

<template>
  <div>
    <HomeHeroSection :content="homeSections?.hero" />
    <HomeAboutSection :content="homeSections?.about" />
    <HomeCompanyDirectionsSection :content="homeSections?.company_directions" />
    <HomeNumbersSection :content="homeSections?.numbers" />
    <HomeVideoSection :content="homeSections?.video" />
    <HomeFeaturedProjects :content="homeSections?.featured_projects" />
    <HomeQuizSection :content="homeSections?.quiz_block" />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss"></style>
