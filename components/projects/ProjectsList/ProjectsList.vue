<script setup lang="ts">
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  projects: iStory<iProjectsContent>[]
  projectBtn: string
}

defineProps<iProps>()

const isMobile = useSSRMediaQuery('(max-width: 860px)')
</script>

<template>
  <div>
    <ProjectsProjectsListMobile v-if="isMobile" :projects :project-btn />
    <ProjectsProjectsListDesktop v-else :projects :project-btn />
  </div>
</template>
