<script lang="ts" setup>
import type { iCurrentProjectInterior } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectInterior
  projectName: string
}

const props = defineProps<IProps>()

const $el = useTemplateRef<HTMLElement | null>('el')
const $appartments = useTemplateRef<HTMLElement | null>('appartments')

useDetectHeaderColor($el as Ref<HTMLElement>)

const apparts = computed(() => {
  return props.content?.apartments
})

const selectedAppart = reactiveComputed(() => {
  return {
    value: apparts?.value?.[0],
  }
})

useIntersectionObserver($appartments, ([entry]) => {
  const isIntersecting = entry?.isIntersecting || false

  if (isIntersecting) {
    document.documentElement.classList.add('header-disabled')
  } else {
    document.documentElement.classList.remove('header-disabled')
  }
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('header-disabled')
})
</script>

<template>
  <section ref="el" class="project-interior">
    <div class="project-interior__wrapper container">
      <div class="project-interior__content">
        <h2 class="project-interior__title">
          {{ content?.title }}
        </h2>
        <p class="project-interior__text">
          {{ content?.text }}
        </p>
        <div class="project-interior__img-wrapper">
          <CustomImage
            class="project-interior__img"
            :src="content?.asset?.filename"
            :alt="content?.asset?.alt"
            :width="1920"
          />
        </div>
      </div>
      <div ref="appartments" class="project-interior__apartments-wrapper">
        <div class="project-interior__apartments">
          <ProjectInteriorApartments
            v-model="selectedAppart.value"
            :project-name="projectName"
            :apartments="apparts"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-interior {
  position: relative;
  background-color: var(--neutral-100);
  color: var(--basic-black);
  padding: vw(40) 0;
  padding-bottom: vw(80);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.project-interior__content {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 70%;
  }
}

.project-interior__title {
  text-transform: uppercase;
  @include heading-h1;

  @media (min-width: $br1) {
    @include col(1, 10);
  }
}

.project-interior__text {
  @include text-t3;

  @media (min-width: $br1) {
    @include col(11, 16);
  }

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}

.project-interior__img-wrapper {
  @media (min-width: $br1) {
    @include col(19, 24);
    align-self: end;
  }
}

.project-interior__img {
  display: block;
  width: 100%;

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.project-interior__apartments-wrapper {
  position: relative;
}

.project-interior__apartments {
  margin-top: vw(180);

  @media (max-width: $br1) {
    margin-top: 60px;
  }
}
</style>
