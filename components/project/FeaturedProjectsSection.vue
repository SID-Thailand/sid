<script lang="ts" setup>
import type { iProjectFeaturedProjects } from '~/types/projectTypes'

interface IProps {
  content: iProjectFeaturedProjects
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
