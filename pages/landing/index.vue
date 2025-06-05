<script lang="ts" setup>
import type { TransitionProps } from 'vue'
import HeroSection from '~/components/projects/HeroSection.vue'
import { useProjectsStories } from '~/composables/stories/projects/projectsStories'
import { useProjectsStory } from '~/composables/stories/projects/projectsStory'

import { gsap } from '~/libs/gsap'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useProjectsStory('landing')
const { projects } = await useProjectsStories('landing')

const filteredProjects = ref(projects.value)

const categories = computed(() => {
  return projects.value
    .map(project => project?.content?.category?.content?.name)
    .filter((name, idx, arr) => arr.indexOf(name) === idx)
    .filter(name => !!name)
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

const key = ref(0)

watch(filteredProjects, () => {
  key.value++
})

const projectFilterTransition: TransitionProps = {
  mode: 'out-in',
  onEnter(el: HTMLElement, done) {
    el.style.opacity = '0'

    gsap.to(el, {
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        document.documentElement.style.cursor = 'auto'
        done()
      },
    })
  },
  onLeave(el: HTMLElement, done) {
    document.documentElement.style.cursor = 'wait'
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: done,
    })
  },
}
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
    <Transition v-bind="projectFilterTransition">
      <ProjectsList
        :key="key"
        :projects="filteredProjects"
        :project-btn="story?.content?.view_project_btn"
      />
    </Transition>
    <BookTheMeetings :cta="story?.content?.cta" page="Consultancy Projects" />
  </div>
</template>

<style scoped lang="scss"></style>
