<script setup lang="ts">
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

const { current, prev, throttledNavigate, onInit } = useSliderAnimation(
  contentRef,
  projectCount
)

const activeProject = computed(() => {
  return props.projects[current.value]
})

const route = useRoute()

const onClick = () => {
  route.meta.isProjectTransition = true
}

const replaceLineBreaks = (content: string) => {
  return content.replace(/\n/g, '<br>')
}

const longestTextLinesIdx = ref(0)

const findLongestTextLinesIdx = () => {
  if (!contentRef.value) return 0

  const items = [...contentRef.value.querySelectorAll('.projects__text')]

  let maxLines = 0
  let maxIndex = 0

  items.forEach((item, index) => {
    const textLines = item.querySelectorAll('.e-line').length

    if (textLines > maxLines) {
      maxLines = textLines
      maxIndex = index
    }
  })

  return maxIndex
}

onMounted(() => {
  onInit(() => {
    longestTextLinesIdx.value = findLongestTextLinesIdx()
  })
})
</script>

<template>
  <section data-o class="projects">
    <div ref="contentRef" class="projects__wrapper">
      <div class="projects__slider container">
        <div class="projects__bgs">
          <div
            v-for="(img, idx) in projects"
            :key="idx"
            data-f-bg
            class="projects__bg-wrapper"
            :class="{ active: idx === current, prev: idx === prev }"
          >
            <CustomImage
              data-f-bg-i
              :src="img?.content?.cover?.filename"
              :alt="img?.content?.cover?.alt"
              :width="1920"
              class="projects__bg"
            />
          </div>
        </div>
        <DarkLayer />
        <div
          class="projects__card"
          data-t-card
          :data-slug="activeProject?.slug"
        >
          <div data-t-assets class="projects__assets">
            <div
              v-for="(item, idx) in projects"
              :key="idx"
              data-f-img
              class="projects__image-item"
              :class="{ active: idx === current, prev: idx === prev }"
              :style="{
                // zIndex: idx + 1,
                position: longestTextLinesIdx === idx ? 'relative' : 'absolute',
              }"
            >
              <div class="projects__img-wrapper" data-f-img-i>
                <CustomImage
                  data-t-img
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="projects__img"
                  :data-slug="item?.slug"
                  :width="1920"
                />
              </div>
            </div>
          </div>

          <div class="projects__text-wrapper">
            <div
              v-for="(project, index) in projects"
              :key="index"
              class="projects__text"
              :style="{
                position:
                  longestTextLinesIdx === index ? 'relative' : 'absolute',
              }"
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
            <IconsArrowTopRight />
          </Button>
        </div>
      </div>
      <SliderFloatingNavigation @navigate="throttledNavigate" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/ui/card-hover' as *;

$clip-path: inset(0 0 0 100%);

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
    clip-path: $clip-path;
  }

  &.active {
    z-index: 2;
  }
  &.prev {
    z-index: 1;
  }
}

.projects__bg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects__card {
  flex: 0 1 auto;
  height: clamp(50%, vh(768), vw(768));

  aspect-ratio: 0.64;
  max-width: 100%;
  background-color: var(--neutral-600);
  position: relative;
  z-index: 3;
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

  &.active {
    z-index: 2;
  }
  &.prev {
    z-index: 1;
  }

  &:not(:first-child) {
    clip-path: $clip-path;
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
</style>
