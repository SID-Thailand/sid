<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iFeaturedProjects } from '~/types/story'

interface IProps {
  content: iFeaturedProjects
}

const { content } = defineProps<IProps>()

const activeProject = ref(0)

const projects = computed(() => {
  return content?.featured_projects || []
})
const projectCount = computed(() => {
  return content?.featured_projects.length || 0
})

const contentRef = ref<HTMLElement | null>(null)

let titleSplitter: typeof TextSplitter.prototype | null = null

let specsSplitters = []

let $bgs: NodeListOf<HTMLElement> = null
let $items: NodeListOf<HTMLElement> = null
let $specs: NodeListOf<HTMLElement> = null

const { activePage, prevPage, direction } = useFullPage(
  contentRef as Ref<HTMLElement>,
  projectCount
)

const setupInitialStates = async () => {
  $bgs.forEach((bg, index) => {
    if (index > 0) {
      gsap.set(bg, {
        scale: 1.3,
        clipPath: 'inset(100% 0 0 0)',
      })

      gsap.set($items[index], {
        scale: 1.3,
        clipPath: 'inset(100% 0 0 0)',
      })
    }
  })

  if (titleSplitter) {
    titleSplitter.revert()
    titleSplitter = null
  }

  if (specsSplitters.length) {
    specsSplitters.forEach(spec => {
      spec.revert()
    })
    specsSplitters = []
  }

  await nextTick()

  $specs.forEach((item: HTMLElement, idx: number) => {
    const $curTitle = item.querySelector('.fpc__title') as HTMLElement
    const $curSpecs = item.querySelectorAll('.fpc__spec')

    titleSplitter = new TextSplitter($curTitle, {
      splitTypeTypes: 'lines,words',
    })

    $curSpecs?.forEach(spec => {
      const specSplitter = new TextSplitter(spec as HTMLElement, {
        splitTypeTypes: 'lines,words',
      })

      specsSplitters.push(specSplitter)

      if (idx === 0) {
        return
      }
      gsap.set(spec.querySelectorAll('.word'), { y: '100%' })
    })

    if (idx === 0) {
      return
    }

    gsap.set(item, { pointerEvents: 'none' })
    gsap.set($curTitle.querySelectorAll('.word'), { y: '100%' })
  })
}

const animateSections = () => {
  const currentIndex = activePage.value - 1
  const prevIndex = prevPage.value - 1

  const elements = {
    current: {
      bg: $bgs[currentIndex],
      item: $items[currentIndex],
      texts: $specs[currentIndex],
    },
    prev: {
      bg: $bgs[prevIndex],
      item: $items[prevIndex],
      texts: $specs[prevIndex],
    },
  }

  const getWords = (selector: HTMLElement | null, className: string) =>
    selector?.querySelectorAll(`.${className}`) ?? []

  const animateWords = (
    words: NodeListOf<Element> | any[],
    fromY: string,
    toY: string,
    time: number,
    offset = 0
  ) => {
    if (!words.length) return
    tl.fromTo(words, { y: fromY }, { y: toY, duration: time }, offset)
  }

  const animateWordExit = (
    words: NodeListOf<Element> | any[],
    toY: string,
    time: number,
    offset = 0
  ) => {
    if (!words.length) return
    tl.to(words, { y: toY, duration: time }, offset)
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

  const { current, prev } = elements

  const $curTitle = current.texts?.querySelector('.fpc__title') as HTMLElement
  const $prevTitle = prev.texts?.querySelector('.fpc__title') as HTMLElement

  const $curSpecs = current.texts?.querySelectorAll('.fpc__spec') || []
  const $prevSpecs = prev.texts?.querySelectorAll('.fpc__spec') || []

  const transitionSpecs = (
    specs: NodeListOf<Element> | any[],
    fromY: string,
    toY: string
  ) => {
    specs.forEach(spec => {
      const words = spec.querySelectorAll('.word')
      animateWords(words, fromY, toY, textDuration, 0.3)
    })
  }

  const exitSpecs = (specs: NodeListOf<Element> | any[], toY: string) => {
    specs.forEach(spec => {
      const words = spec.querySelectorAll('.word')
      animateWordExit(words, toY, textDuration, 0)
    })
  }

  if (isForward) {
    prev.bg && tl.to(prev.bg, { scale: 1.3 }, 0)
    prev.item && tl.to(prev.item, { scale: 1.3 }, 0)
  }

  tl.to(current.bg, { scale: 1, clipPath: 'inset(0% 0 0 0)' }, 0)
  tl.to(current.item, { scale: 1, clipPath: 'inset(0% 0 0 0)' }, 0)

  if (!isForward) {
    prev.bg && tl.to(prev.bg, { scale: 1.3, clipPath: 'inset(100% 0 0 0)' }, 0)
    prev.item &&
      tl.to(prev.item, { scale: 1.3, clipPath: 'inset(100% 0 0 0)' }, 0)
  }

  const curTitleWords = getWords($curTitle, 'word')
  const prevTitleWords = getWords($prevTitle, 'word')

  animateWordExit(prevTitleWords, isForward ? '-100%' : '100%', textDuration, 0)
  animateWords(
    curTitleWords,
    isForward ? '100%' : '-100%',
    '0%',
    textDuration,
    0
  )

  transitionSpecs($curSpecs, isForward ? '100%' : '-100%', '0%')
  exitSpecs($prevSpecs, isForward ? '-100%' : '100%')
}

watch(activePage, () => {
  animateSections()
})

onMounted(() => {
  $bgs = contentRef.value?.querySelectorAll('.featured-projects__bg')
  $items = contentRef.value?.querySelectorAll('.fpc__image-item')
  $specs = contentRef.value?.querySelectorAll('.fpc__specs')

  if (!$bgs || !$items || !$specs) {
    return
  }

  setupInitialStates()
})
</script>

<template>
  <section class="featured-projects">
    <div ref="contentRef" class="featured-projects__scroll-wrapper">
      <div class="featured-projects__content">
        <div class="featured-projects__bg-wrapper">
          <CustomImage
            v-for="(item, idx) in projects"
            :key="idx"
            :src="item?.content?.cover?.filename"
            :alt="item?.content?.cover?.alt"
            class="featured-projects__bg"
            :style="{ zIndex: idx + 1 }"
          />
        </div>
        <NuxtLink
          class="featured-projects__link featured-projects__link--mob underline-reverse"
          to="/projects/"
          >{{ content?.button_text }}</NuxtLink
        >
        <div class="featured-projects__card fpc">
          <div class="fpc__assets">
            <div
              v-for="(item, idx) in projects"
              :key="idx"
              class="fpc__image-item"
              :class="{ active: activeProject === idx }"
              :style="{ zIndex: idx + 1 }"
            >
              <div class="fpc__img-wrapper">
                <CustomImage
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="fpc__img"
                  :data-slug="item?.slug"
                />
              </div>
            </div>
          </div>
          <div class="fpc__specs-wrapper">
            <div v-for="(item, idx) in projects" :key="idx" class="fpc__specs">
              <h2 class="fpc__title">
                {{ item?.content?.name }}
              </h2>
              <div class="fpc__spec">{{ item?.content?.spec_1 }}</div>
              <div class="fpc__spec">{{ item?.content?.spec_2 }}</div>
              <div class="fpc__spec">{{ item?.content?.spec_3 }}</div>
              <NuxtLink
                :to="`/${item.full_slug}`"
                class="fpc__link"
                aria-label="View project"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 13V23H13V13H23V11H13V1H11V11H1V13H11Z"
                    fill="url(#paint0_linear_1_2446)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_2446"
                      x1="12"
                      y1="1"
                      x2="12"
                      y2="23"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFCE7E" />
                      <stop offset="1" stop-color="#997C4B" />
                    </linearGradient>
                  </defs>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
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

  filter: brightness(0.7) contrast(1.2) saturate(0);
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

.fpc__specs {
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

.fpc__spec {
  color: var(--neutral-200);
  line-height: 1.25em;
  font-size: vw(16);
  @include med;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}

.fpc__link {
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
