<script lang="ts" setup>
import { useAboutStory } from '~/composables/stories/aboutStory'
import { pageTransition } from '~/transitions/base'
import CompanyDirectionsSection from '~/components/about/CompanyDirectionsSection.vue'
import FeaturedProjects from '~/components/about/FeaturedProjects.vue'
import HeroSection from '~/components/about/HeroSection.vue'
import MissionSection from '~/components/about/MissionSection.vue'
import HistorySection from '~/components/about/HistorySection.vue'
import TeamSection from '~/components/about/TeamSection.vue'

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
    about_mission: MissionSection,
    about_history: HistorySection,
    about_team: TeamSection,
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
