<script lang="ts" setup>
import HeroSection from '~/components/projects/HeroSection.vue'
import { useProjectsStories } from '~/composables/stories/projectsStories'
import { useProjectsStory } from '~/composables/stories/projectsStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useProjectsStory()
const { projects } = await useProjectsStories()

const filteredProjects = ref(projects.value)

const categories = computed(() => {
  return projects.value
    .map(project => project?.content?.category?.content?.name)
    .filter((name, idx, arr) => arr.indexOf(name) === idx)
})

const onFilter = (category: string) => {
  filteredProjects.value = projects.value.filter(
    project => project?.content?.category?.content?.name === category
  )
}

const onGetAll = () => {
  filteredProjects.value = projects.value
}

const resolveSectionByName = (name: string) => {
  const sections = {
    project_home: HeroSection,
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
    <ProjectsList
      :projects="filteredProjects"
      :project-btn="story?.content?.view_project_btn"
    />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss"></style>
