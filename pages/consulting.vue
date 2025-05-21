<script lang="ts" setup>
import DifferenceSection from '~/components/consulting/DifferenceSection.vue'
import ExpertiseSection from '~/components/consulting/ExpertiseSection.vue'
import ExpertsSection from '~/components/consulting/ExpertsSection.vue'
import HeroSection from '~/components/consulting/HeroSection.vue'
import ServiceSection from '~/components/consulting/ServiceSection.vue'
import YoutubeSection from '~/components/consulting/YoutubeSection.vue'
import FeaturedProjects from '~/components/FeaturedProjects.vue'
import QuizSection from '~/components/quiz/QuizSection.vue'
import { useConsultingStory } from '~/composables/stories/consultingStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useConsultingStory()

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    consulting_hero: HeroSection,
    consulting_expertise: ExpertiseSection,
    consulting_difference: DifferenceSection,
    consulting_experts: ExpertsSection,
    consulting_service: ServiceSection,
    consulting_youtube: YoutubeSection,
    consultancy_featured_projects: FeaturedProjects,
    quiz_block: QuizSection,
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
