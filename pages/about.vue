<script lang="ts" setup>
import AboutHistory from '~/components/about/AboutHistory.vue'
import AboutMission from '~/components/about/AboutMission.vue'
import AboutTeam from '~/components/about/AboutTeam.vue'
import CompanyDirectionsSection from '~/components/about/CompanyDirectionsSection.vue'
import FeaturedProjects from '~/components/about/FeaturedProjects.vue'
import HeroSection from '~/components/about/HeroSection.vue'
import { useAboutStory } from '~/composables/stories/aboutStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useAboutStory()

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    about_hero: HeroSection,
    company_directions: CompanyDirectionsSection,
    featured_projects: FeaturedProjects,
    about_mission: AboutMission,
    about_history: AboutHistory,
    about_team: AboutTeam,
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
    <template v-for="item in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        v-editable="item"
        :content="item"
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>

    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss"></style>
