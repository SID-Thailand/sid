<script setup lang="ts">
import type { iFeaturedProjects } from '~/types/story'

interface IProps {
  content: iFeaturedProjects
}

const { content } = defineProps<IProps>()

const projects = computed(() => {
  return content?.featured_projects?.filter(project => project.content) || []
})
const projectCount = computed(() => {
  return projects.value.length || 0
})

const contentRef = ref<HTMLElement | null>(null)

const { activePage } = useFullPageCardSlider(
  contentRef as Ref<HTMLElement>,
  projectCount
)

const activeProject = computed(() => {
  return projects.value?.[activePage.value - 1 || 0]
})

const route = useRoute()

const onClick = () => {
  route.meta.isProjectTransition = true
}

console.log(projects.value, activeProject.value)
</script>

<template>
  <section class="featured-projects">
    <div ref="contentRef" class="featured-projects__scroll-wrapper">
      <div class="featured-projects__content">
        <div v-if="projects?.length" class="featured-projects__bg-wrapper">
          <CustomImage
            v-for="(item, idx) in projects"
            :key="idx"
            data-f-bg
            :src="item?.content?.cover?.filename"
            :alt="item?.content?.cover?.alt"
            class="featured-projects__bg"
            :style="{ zIndex: idx + 1 }"
          />
        </div>
        <DarkLayer />

        <NuxtLink
          class="featured-projects__link featured-projects__link--mob underline-reverse"
          to="/projects/"
          >{{ content?.button_text }}</NuxtLink
        >
        <NuxtLink
          :to="`/${activeProject?.full_slug}`"
          data-t-card
          :data-slug="activeProject?.slug"
          class="featured-projects__card fpc"
          @click="onClick"
        >
          <div data-t-assets class="fpc__assets">
            <div
              v-for="(item, idx) in projects"
              :key="idx"
              class="fpc__image-item"
              :style="{ zIndex: idx + 1 }"
            >
              <div class="fpc__img-wrapper">
                <CustomImage
                  data-t-img
                  data-f-img
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="fpc__img"
                  :data-slug="item?.slug"
                />
              </div>
            </div>
          </div>
          <div class="fpc__specs-wrapper">
            <div v-for="(item, idx) in projects" :key="idx" class="fpc__text">
              <h2 class="fpc__title" data-f-title>
                {{ item?.content?.name }}
              </h2>
              <div data-f-text class="fpc__specs">
                <div class="fpc__spec">{{ item?.content?.spec_1 }}</div>
                <div class="fpc__spec">{{ item?.content?.spec_2 }}</div>
                <div class="fpc__spec">{{ item?.content?.spec_3 }}</div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" class="fpc__icon" aria-label="View project">
            <IconsGradientPlus />
          </div>
        </NuxtLink>
        <div class="featured-projects__text">
          <h2 class="featured-projects__title">{{ content?.title }}</h2>
          <div class="featured-projects__desc">{{ content?.text }}</div>
          <NuxtLink
            class="featured-projects__link underline-reverse"
            to="/projects/"
            >{{ content?.button_text }}</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/ui/card-hover' as *;

.featured-projects {
  position: relative;
}

.featured-projects__bg-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
}

.featured-projects__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;

  will-change: transform;

  // filter: brightness(0.9) contrast(1.2) saturate(0);
}

.featured-projects__scroll-wrapper {
  position: relative;
}

.featured-projects__content {
  height: 100svh;

  display: flex;
  justify-content: space-between;
  padding: vh(100) 0;
  gap: vw(100);
  padding-left: vw(155);
  padding-right: vw(97);

  @media (max-width: $br1) {
    flex-direction: column-reverse;
    gap: 32px;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.fpc {
  flex: 0 1 auto;
  height: clamp(50%, vh(684), vw(684));
  aspect-ratio: 0.72;
  max-width: 100%;
  background-color: var(--neutral-400);
  position: relative;
  z-index: 2;
  padding: vw(16);
  display: flex;
  flex-direction: column;

  @include card-hover('.fpc__assets');

  @media (max-width: $br1) {
    width: auto;
    height: 65%;
    padding: 16px;
  }

  @media (max-width: $br4) {
    width: 100%;
    height: fit-content;
    aspect-ratio: unset;
    flex: 1;
    max-height: 518px;
  }
}

.fpc__assets {
  flex: 0 1 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.fpc__image-item {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  will-change: transform;

  &:first-child {
    position: relative;
  }
}

.fpc__img-wrapper {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.fpc__specs-wrapper {
  position: relative;
  flex: 1 0 auto;
  margin-top: vw(24);
  @media (max-width: $br1) {
    margin-top: 20px;
  }
}

.fpc__text {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &:first-child {
    position: relative;
  }
}

.fpc__title {
  text-transform: uppercase;
  margin-bottom: vw(16);
  font-size: vw(24);
  @include med;

  @media (max-width: $br1) {
    margin-top: 8px;
    font-size: 24px;
  }
}

.fpc__specs {
  max-width: vw(177);

  @media (max-width: $br1) {
    max-width: 190px;
  }
}

:global(.fpc__specs .e-line) {
  line-height: 0.8em;
}

.fpc__spec {
  color: var(--neutral-200);
  line-height: 1em;
  font-size: vw(16);
  @include med;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}

.fpc__icon {
  display: block;
  color: var(--accent-primary);

  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 12px;
  }
}

.featured-projects__text {
  width: vw(440);
  position: relative;
  z-index: 2;
  @media (max-width: $br1) {
    text-align: center;
    width: 100%;
  }
}

.featured-projects__title {
  text-transform: uppercase;
  @include heading-h3;
}
.featured-projects__desc {
  margin-top: vw(16);
  color: var(--neutral-200);

  @include text-t3;
  @media (max-width: $br1) {
    display: none;
  }
}

.featured-projects__link {
  position: relative;
  width: fit-content;
  z-index: 3;
  display: block;
  text-transform: uppercase;
  margin-top: vw(48);
  @include caption-c1;

  @media (min-width: $br1) {
    &--mob {
      display: none;
    }
  }

  @media (max-width: $br1) {
    margin: 0 auto;
    margin-top: 8px;
    &:not(&--mob) {
      display: none;
    }
  }
}
</style>
