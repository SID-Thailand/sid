<script lang="ts" setup>
import HeroSection from '~/components/projects/HeroSection.vue'
import { useProjectsStory } from '~/composables/stories/projectsStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useProjectsStory()

console.log(story.value)

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
    />
    <div v-else>
      <p>Unknown component: {{ story?.content?.component }}</p>
    </div>
    <ProjectsList />
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss"></style>
