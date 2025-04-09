<script lang="ts" setup>
import { useProjectStory } from '~/composables/stories/projectStory'
import { pageTransition } from '~/transitions/base'
import type { iProjectBody } from '~/types/story'

definePageMeta({
  pageTransition,
})

const { params } = useRoute()
const { story } = await useProjectStory(params?.id as string)

const projectSections = computed((): iProjectBody => {
  const body = story?.value?.content?.body as any[]

  return {
    concept: body.find(item => item?.component === 'project_concept'),
  }
})
</script>

<template>
  <div>
    <ProjectHeroSection :content="story?.content" />
    <ProjectConceptSection :content="projectSections?.concept" />
    Current Project {{ params?.id }}
  </div>
</template>

<style scoped lang="scss"></style>
