<script setup lang="ts">
import { LucideArrowUpRight } from 'lucide-vue-next'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  projects: iStory<iProjectsContent>[]
  projectBtn: string
}

const props = defineProps<iProps>()

const contentRef = ref<HTMLElement | null>(null)

const projectCount = computed(() => {
  return props?.projects?.length || 0
})

const { activePage } = useFullPageCardSlider(
  contentRef as Ref<HTMLElement>,
  projectCount
)

const activeProject = computed(() => {
  return props.projects[activePage.value - 1]
})

const route = useRoute()

const onClick = () => {
  route.meta.isProjectTransition = true
}

const replaceLineBreaks = (content: string) => {
  return content.replace(/\n/g, '<br>')
}
</script>

<template>
  <section class="projects">
    <div ref="contentRef" class="projects__wrapper">
      <div class="projects__slider container">
        <div class="projects__bgs">
          <div
            v-for="(img, idx) in projects"
            :key="idx"
            class="projects__bg-wrapper"
          >
            <CustomImage
              data-f-bg
              :src="img?.content?.cover?.filename"
              :alt="img?.content?.cover?.alt"
              class="projects__bg"
            />
          </div>
        </div>

        <div class="projects__layer" />
        <div class="projects__card" data-t-card>
          <div data-t-assets class="projects__assets">
            <div
              v-for="(item, idx) in projects"
              :key="idx"
              class="projects__image-item"
              :style="{ zIndex: idx + 1 }"
            >
              <div class="projects__img-wrapper">
                <CustomImage
                  data-f-img
                  data-t-img
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="projects__img"
                  :data-slug="item?.slug"
                />
              </div>
            </div>
          </div>

          <div class="projects__text-wrapper">
            <div
              v-for="(project, index) in projects"
              :key="index"
              class="projects__text"
            >
              <h2
                data-f-title
                class="projects__title"
                v-html="replaceLineBreaks(project?.content?.name)"
              />

              <p data-f-text class="projects__desc">
                {{ project?.content?.description }}
              </p>
            </div>
          </div>
          <Button
            tag="nuxt-link"
            :href="`/${activeProject?.full_slug}`"
            class="projects__link"
            @click="onClick"
          >
            <span>
              {{ projectBtn }}
            </span>
            <LucideArrowUpRight />
          </Button>
        </div>
        <div class="projects__counter container">
          <p class="projects__count">{{ activePage }}/{{ projectCount }}</p>
          <div class="projects__pagination">
            <span
              v-for="(_, i) in projects?.length"
              :key="i"
              class="projects__pag-item"
              :class="{ 'projects__pag-item--active': activePage - 1 === i }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/ui/card-hover' as *;

.projects__slider {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.projects__bgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.projects__bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:not(:first-child) {
    .projects__bg {
      clip-path: inset(100% 0 0 0);
    }
  }
}

.projects__bg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, #3a3838 0%, #202020 100%);
  mix-blend-mode: hard-light;
  z-index: 1;
}

.projects__card {
  flex: 0 1 auto;
  height: clamp(50%, vh(768), vw(768));

  aspect-ratio: 0.64;
  max-width: 100%;
  background-color: var(--neutral-600);
  position: relative;
  z-index: 2;
  padding: vw(16);
  padding-bottom: vw(32);
  display: flex;
  flex-direction: column;
  @include card-hover('.projects__assets');

  @media (max-width: $br1) {
    width: auto;
    height: 65%;
    padding: 16px;
    padding-bottom: 24px;
  }

  @media (max-width: $br4) {
    width: 100%;
    height: 80%;
    aspect-ratio: unset;
    flex: 1;
    max-height: 600px;
  }
}

.projects__assets {
  flex: 0 1 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.projects__image-item {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  will-change: transform;

  &:first-child {
    position: relative;
  }

  &:not(:first-child) {
    img {
      clip-path: inset(100% 0 0 0);
    }
  }
}

.projects__img-wrapper {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.projects__text-wrapper {
  position: relative;
  flex: 1 0 auto;
  margin-top: vw(32);
  text-align: center;

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.projects__text {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &:first-child {
    position: relative;
  }
}

.projects__title {
  font-kerning: none;
  text-transform: uppercase;
  margin: 0 auto;
  width: 100%;
  @include subheading-h1;
}
.projects__desc {
  font-size: vw(16);
  line-height: 1.25em;
  margin-top: vw(12);
  @include med;

  @media (max-width: $br1) {
    font-size: 16px;
    margin-top: 8px;
  }
}

.projects__link {
  display: block;
  width: fit-content;
  margin: 0 auto;
  margin-top: vw(32);
  padding-top: vw(16);
  padding-bottom: vw(16);
  font-size: vw(14);

  flex-shrink: 0;
  @media (max-width: $br1) {
    font-size: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-top: 24px;
  }
}

.projects__counter {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: $br1) {
    flex-direction: column;
    height: 100%;
    padding-top: 32px;
    padding-bottom: 32px;
  }
}

.projects__count {
  text-transform: uppercase;
  line-height: 1.2em;
  font-size: vw(20);
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 16);
  }

  @media (max-width: $br4) {
    font-size: 16px;
  }
}

.projects__pagination {
  display: flex;
  align-items: center;
  width: fit-content;

  @media (min-width: $br1) {
    flex-direction: column;
    row-gap: vw(8);
  }

  @media (max-width: $br1) {
    column-gap: 8px;
  }
}

.projects__pag-item {
  display: block;
  width: vw(4);
  height: vw(4);
  border-radius: 9999px;
  background-color: var(--neutral-300);
  transition:
    height 1s ease,
    width 1s ease,
    background-color 1s ease;

  @media (max-width: $br1) {
    width: 4px;
    height: 4px;
  }

  &--active {
    background-color: var(--basic-white);

    @media (min-width: $br1) {
      height: vw(16);
    }

    @media (max-width: $br1) {
      width: 16px;
    }
  }
}
</style>
