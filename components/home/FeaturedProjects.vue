<script setup lang="ts">
import { resize } from '@emotionagency/utils'
import { gsap, ScrollTrigger } from '~/libs/gsap'

import type { iHomeFeaturedProjects } from '~/types/story'

interface IProps {
  content: iHomeFeaturedProjects
}

const { content } = defineProps<IProps>()

const activeProject = ref(0)

const projects = computed(() => {
  return content?.featured_projects || []
})
const projectCount = computed(() => {
  return content?.featured_projects.length || 0
})

const duration = 1 / projectCount.value

const contentRef = ref<HTMLElement | null>(null)

const st = ref<ScrollTrigger | null>(null)
const dir = ref(1)

let titleSplitter: typeof TextSplitter.prototype | null = null

let specsSplitters = []

let masterTl

let $bgs: NodeListOf<HTMLElement> = null
let $items: NodeListOf<HTMLElement> = null
let $specs: NodeListOf<HTMLElement> = null

const prepareItems = async () => {
  $bgs = contentRef.value?.querySelectorAll('.featured-projects__bg')
  $items = contentRef.value?.querySelectorAll('.fpc__image-item')
  $specs = contentRef.value?.querySelectorAll('.fpc__specs')

  if (!$bgs || !$items || !$specs) {
    return
  }

  $bgs.forEach((bg, index) => {
    if (index > 0) {
      gsap.set(bg, {
        scale: 1.3,
        y: '100%',
      })

      gsap.set($items[index], {
        scale: 1.3,
        y: '100%',
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

const imageRevealAnimation = (
  tl: GSAPTimeline,
  index: number,
  item: HTMLElement
) => {
  const dur = index === 0 ? 0 : duration

  const idx = Math.max(0, index - 1)

  const delay = dur * idx

  tl.to(
    item,

    {
      duration: dur,
      y: '0%',
    },
    delay
  )

  tl.to(
    item,
    {
      duration: dur,
      scale: 1,
    },
    delay + 0.05
  )
}

const specAnimation = (tl: GSAPTimeline, index: number, item: HTMLElement) => {
  const dur = index === 0 ? 0 : duration

  const idx = Math.max(0, index - 1)

  const delay = dur * idx

  const $prevItem = getPreviousSibling(item) as HTMLElement | null

  const $curTitle = item.querySelector('.fpc__title') as HTMLElement
  const $curSpecs = item.querySelectorAll('.fpc__spec')

  const $prevTitle = $prevItem?.querySelector('.fpc__title') as HTMLElement
  const $prevSpecs = $prevItem?.querySelectorAll('.fpc__spec')

  $prevItem && tl.to($prevItem, { duration: dur, pointerEvents: 'none' }, delay)
  tl.to(item, { duration: dur, pointerEvents: 'auto' }, delay)

  const tl2 = gsap.timeline()

  $prevTitle &&
    tl2.to($prevTitle?.querySelectorAll('.word'), {
      duration: dur / 2,
      y: '-100%',
    })

  tl2.to($curTitle.querySelectorAll('.word'), {
    duration: dur / 2,
    y: '0%',
  })

  tl.add(tl2, delay)

  $curSpecs?.forEach((spec, idx) => {
    const tl3 = gsap.timeline()

    $prevSpecs &&
      tl3.to($prevSpecs?.[idx]?.querySelectorAll('.word'), {
        duration: dur / 2,
        y: '-100%',
      })

    tl3.to(spec.querySelectorAll('.word'), {
      duration: dur / 2,
      y: '0%',
    })

    tl.add(tl3, delay)
  })
}

const makeAnimation = async () => {
  if (!contentRef.value) return

  masterTl = gsap.timeline({
    paused: true,
  })

  await prepareItems()

  $bgs.forEach((bg, index) => {
    imageRevealAnimation(masterTl, index, bg as HTMLElement)
    imageRevealAnimation(masterTl, index, $items[index] as HTMLElement)

    specAnimation(masterTl, index, $specs[index] as HTMLElement)
  })

  st.value = ScrollTrigger.create({
    trigger: contentRef.value as HTMLElement,
    start: () => 'top top',
    end: () => 'bottom-=5% bottom',
    scrub: true,
    animation: masterTl,
    invalidateOnRefresh: true,

    onUpdate: ({ direction }) => {
      dir.value = direction
    },
  })
}

const onResize = () => {
  st.value?.kill(true)
  masterTl?.kill()

  makeAnimation()
}

onMounted(() => {
  resize.on(onResize)
})

onBeforeUnmount(() => {
  resize.off(onResize)

  st.value?.kill(true)
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
              :class="{ active: activeProject >= idx }"
              :style="{ zIndex: idx + 1 }"
            >
              <div class="fpc__img-wrapper">
                <CustomImage
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="fpc__img"
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
              <NuxtLink :to="`/${item.full_slug}`" class="fpc__link">
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
  transform-origin: center top;
  will-change: transform;

  filter: brightness(0.7) contrast(1.2) saturate(0);

  /*&:first-child {
    transform: translateY(0) scale(1);
  }*/
}

.featured-projects__scroll-wrapper {
  position: relative;
  height: 600vh;
}

.featured-projects__content {
  height: 100vh;
  position: sticky;
  top: 0;
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
    height: 61%;
    padding: 16px;
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

  transform-origin: center top;
  transform: translateY(100%) scale(1.3);
  will-change: transform;

  &:first-child {
    position: relative;
  }

  &.active {
    transform: translateY(0) scale(1);
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
  @include subheading-h2;
  @media (max-width: $br1) {
    margin-top: 8px;
  }
}

.fpc__spec {
  color: var(--neutral-200);
  @include text-t4;
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
