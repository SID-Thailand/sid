<script setup lang="ts">
import { useProjectsStories } from '~/composables/stories/projectsStories'

const { projects } = await useProjectsStories()

console.log(projects.value)
</script>

<template>
  <section class="projects">
    <div class="projects__wrapper">
      <ul v-for="(project, idx) in projects" :key="idx" class="projects__list">
        {{
          project?.content?.name
        }}
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
