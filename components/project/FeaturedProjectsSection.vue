<script lang="ts" setup>
import type { iCurrentProjectFeaturedProjects } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectFeaturedProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="project-feat-pr">
    <AppFeaturedProjects
      :projects="content?.featured_projects"
      :title="content?.title"
      :text="content?.text"
    />
  </section>
</template>

<style scoped lang="scss"></style>
