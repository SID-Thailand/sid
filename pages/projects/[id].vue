<script setup lang="ts">
import AboutSection from '~/components/project/AboutSection.vue'
import ConceptSection from '~/components/project/ConceptSection.vue'
import ExteriorSection from '~/components/project/ExteriorSection.vue'
import FacilitiesSection from '~/components/project/FacilitiesSection.vue'
import FeaturedProjectsSection from '~/components/project/FeaturedProjectsSection.vue'
import FormSection from '~/components/project/FormSection.vue'
import GallerySection from '~/components/project/GallerySection.vue'
import InteriorSection from '~/components/project/InteriorSection.vue'
import { useProjectStory } from '~/composables/stories/projectStory'

const { params } = useRoute()
const { story } = await useProjectStory(params?.id as string)

const hero = computed(() => {
  return story?.value?.content
})

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    project_concept: ConceptSection,
    project_about: AboutSection,
    gallery: GallerySection,
    project_facilities: FacilitiesSection,
    project_exterior: ExteriorSection,
    project_interior: InteriorSection,
    form: FormSection,
    featured_projects: FeaturedProjectsSection,
  }

  return sections[name]
}
</script>

<template>
  <div>
    <ProjectHeroSection :content="hero" />

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
