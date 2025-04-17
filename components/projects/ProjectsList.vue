<script setup lang="ts">
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  projects: iStory<iProjectsContent>[]
}

const props = defineProps<iProps>()
console.log(props.projects)
</script>

<template>
  <section class="projects">
    <div class="projects__wrapper">
      <ul v-for="(project, idx) in projects" :key="idx" class="projects__list">
        {{
          project.content.name
        }}
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
