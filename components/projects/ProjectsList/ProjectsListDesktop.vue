<script setup lang="ts">
import { delayPromise } from '@emotionagency/utils'
import { gsap } from '~/libs/gsap'
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

const { current, prev, direction, throttledNavigate } = useSlider(
  projectCount.value,
  1300
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

const $bgs = ref<NodeListOf<HTMLElement> | null>(null)
const $bgsImages = ref<NodeListOf<HTMLElement> | null>(null)
const $images = ref<NodeListOf<HTMLElement> | null>(null)
const $imagesImg = ref<NodeListOf<HTMLElement> | null>(null)
const $titles = ref<NodeListOf<HTMLElement> | null>(null)
const $texts = ref<NodeListOf<HTMLElement> | null>(null)

let titlesSplitter: (typeof TextSplitter.prototype)[] = []
let textsSplitter: (typeof TextSplitter.prototype)[] = []

const setupInitialStates = async () => {
  $bgs.value?.forEach((bg, index) => {
    if (index > 0) {
      gsap.set(bg, {
        clipPath: 'inset(0 0 0 100%)',
      })

      gsap.set($bgsImages[index], {
        scale: 1.3,
      })

      gsap.set($images.value[index], {
        clipPath: 'inset(0 0 0 100%)',
      })

      gsap.set($imagesImg.value[index], {
        scale: 1.3,
      })
    }
  })

  resetSplitters(titlesSplitter)
  resetSplitters(textsSplitter)

  await nextTick()

  titlesSplitter = splitTexts($titles.value as NodeListOf<HTMLElement>)
  textsSplitter = splitTexts($texts.value as NodeListOf<HTMLElement>)
}

onMounted(async () => {
  await delayPromise(500)
  const target = contentRef.value
  $bgs.value = target?.querySelectorAll(
    '[data-f-bg]'
  ) as NodeListOf<HTMLElement>

  $bgsImages.value = target?.querySelectorAll(
    '[data-f-bg-i]'
  ) as NodeListOf<HTMLElement>

  $images.value = target?.querySelectorAll(
    '[data-f-img]'
  ) as NodeListOf<HTMLElement>

  $imagesImg.value = target?.querySelectorAll(
    '[data-f-img-i]'
  ) as NodeListOf<HTMLElement>

  $titles.value = target?.querySelectorAll(
    '[data-f-title]'
  ) as NodeListOf<HTMLElement>

  $texts.value = target?.querySelectorAll(
    '[data-f-text]'
  ) as NodeListOf<HTMLElement>

  await setupInitialStates()
  longestTextLinesIdx.value = findLongestTextLinesIdx()

  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    throttledNavigate(-1)
  } else if (e.key === 'ArrowRight') {
    throttledNavigate(1)
  }
}

const animate = () => {
  const currentIndex = current.value
  const prevIndex = prev.value

  const els = {
    current: {
      bg: $bgs.value[currentIndex],
      bgImg: $bgsImages.value[currentIndex],
      item: $images.value[currentIndex],
      itemImg: $imagesImg.value[currentIndex],
      title: $titles.value[currentIndex],
      text: $texts.value[currentIndex],
    },
    prev: {
      bg: $bgs.value[prevIndex],
      bgImg: $bgsImages.value[prevIndex],
      item: $images.value[prevIndex],
      itemImg: $imagesImg.value[prevIndex],
      title: $titles.value[prevIndex],
      text: $texts.value[prevIndex],
    },
  }

  const duration = 1.5
  const textDuration = 1

  const tl = gsap.timeline({
    defaults: {
      duration,
      ease: 'power2.out',
    },
  })

  const isForward = direction.value === 1

  const from = 'inset(0 0 0 100%)'
  const to = 'inset(0 100% 0 0)'

  tl.set(els.current.bg, { clipPath: isForward ? from : to })
  tl.set(els.current.item, { clipPath: isForward ? from : to })

  tl.set(els.current.bgImg, { scale: 1.3 })
  tl.set(els.current.itemImg, { scale: 1.3 })

  els.prev.bg &&
    tl.to(
      els.prev.bg,
      {
        clipPath: isForward ? to : from,
      },
      0
    )

  els.prev.bgImg &&
    tl.to(
      els.prev.bgImg,
      {
        scale: 1.3,
      },
      0
    )

  els.prev.item && tl.to(els.prev.item, { clipPath: isForward ? to : from }, 0)

  els.prev.itemImg && tl.to(els.prev.itemImg, { scale: 1.3 }, 0)

  tl.to(els.current.bg, { clipPath: 'inset(0 0% 0 0%)' }, 0)
  tl.to(els.current.item, { clipPath: 'inset(0 0% 0 0%)' }, 0)

  tl.to(els.current.bgImg, { scale: 1 }, 0)
  tl.to(els.current.itemImg, { scale: 1 }, 0)

  const curTitleWords = getWords(els.current.title as HTMLElement)
  const prevTitleWords = getWords(els.prev.title as HTMLElement)

  const curTextWords = getWords(els.current.text as HTMLElement)
  const prevTextWords = getWords(els.prev.text as HTMLElement)

  animateWordExit(prevTitleWords, isForward, textDuration, 0)
  animateWords(curTitleWords, isForward, textDuration, 0)

  animateWordExit(prevTextWords, isForward, textDuration, 0)
  animateWords(curTextWords, isForward, textDuration, 0)
}

watch(current, animate)

const cursorX = ref(0)
const cursorY = ref(0)
const cursorType = ref<'left' | 'right' | null>(null)
const isIndicatorVisible = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY

  isIndicatorVisible.value = true
}

const setCursor = (type: 'left' | 'right' | null) => {
  if (type === null) {
    isIndicatorVisible.value = false
  }
  cursorType.value = type
}

useIntersectionObserver(contentRef, ([entry]) => {
  const isIntersecting = entry?.isIntersecting || false

  if (!isIntersecting) {
    setCursor(null)
  }
})
</script>

<template>
  <section data-o class="projects">
    <div ref="contentRef" class="projects__wrapper">
      <div
        class="projects__slider container"
        @mousemove="handleMouseMove"
        @mouseleave="setCursor(null)"
      >
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

        <div class="projects__btns">
          <button
            type="button"
            class="projects__btn"
            aria-label="previous slide"
            :class="{ visible: cursorType === 'left' }"
            @click="throttledNavigate(-1)"
            @mouseenter="setCursor('left')"
          >
            <IconsArrowLeft />
          </button>
          <button
            type="button"
            class="projects__btn"
            aria-label="next slide"
            :class="{ visible: cursorType === 'right' }"
            @click="throttledNavigate(1)"
            @mouseenter="setCursor('right')"
          >
            <IconsArrowRight />
          </button>
        </div>

        <div
          class="projects__cursor"
          :class="[
            `projects__cursor--${cursorType}`,
            isIndicatorVisible && 'visible',
          ]"
          :style="{
            '--indicator-x': cursorX + 'px',
            '--indicator-y': cursorY + 'px',
          }"
        >
          <IconsArrowLeft v-if="cursorType === 'left'" />
          <IconsArrowRight v-else />
        </div>
      </div>
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

.projects__btns {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 2;

  cursor: none;
  * {
    cursor: none;
  }

  @media (max-width: $br1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    top: 50%;
    transform: translateY(-50%);
    height: fit-content;
  }
}

.projects__btn {
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.2s ease;
  outline: none;

  @media (min-width: $br1) {
    &:first-child {
      height: 100%;
      width: 50%;
    }
    &:last-child {
      height: 100%;
      width: 50%;
    }

    svg {
      display: none;
    }
  }

  @media (max-width: $br1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: transparent;
    color: var(--basic-black);
    border-radius: 50%;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &.active {
    transform: scale(0.8);
  }
}

.projects__cursor {
  pointer-events: none;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: vw(44);
  height: vw(44);
  top: calc(var(--indicator-y, 0px) - vw(22));
  left: calc(var(--indicator-x, 0px) - vw(22));
  background-color: transparent;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    transform 0.5s ease,
    visibility 0.3s ease;
  transform: scale(0);

  &:deep(svg path) {
    fill: var(--basic-black);
  }

  &::before {
    content: '';
    border-radius: 50%;
    background-color: var(--basic-white);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &--left svg,
  &--right svg {
    width: vw(20);
    height: vw(20);
    opacity: 1;
    fill: var(--basic-black);
  }

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
