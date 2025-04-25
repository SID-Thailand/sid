<script lang="ts" setup>
import type { iCurrentProjectInterior } from '~/types/currentProjectTypes'
import { ScrollTrigger, gsap } from '~/libs/gsap'
import { delayPromise } from '@emotionagency/utils'

interface IProps {
  content: iCurrentProjectInterior
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)

const scrollerRef = ref<HTMLElement | null>(null)

let st: ScrollTrigger | null = null

const activeIdx = ref(0)

const animate = () => {
  const scroller = scrollerRef.value as HTMLElement

  const slidesWrapper = scroller.querySelector('.interior-apart__img-list')

  const slides = slidesWrapper?.querySelectorAll('.iterior-apart__img')

  const slidesHeight = slidesWrapper?.clientHeight

  const firstSlide = slides?.[0] as HTMLElement

  const firstSlideHeight = firstSlide.clientHeight

  const tl = gsap.timeline()

  const duration = slides?.length * 0.4

  tl.to(
    slidesWrapper,
    {
      y: -slidesHeight + firstSlideHeight,
      duration,
      ease: 'none',
    },
    0
  )

  slides?.forEach((slide, idx) => {
    const current = slide as HTMLElement
    const prev = slides?.[idx - 1] as HTMLElement

    const delayIndex = idx - 1

    const slideWidth = current.clientWidth

    if (idx === 0) {
      return
    }

    tl.to(
      current,
      {
        width: slideWidth * 3,
        duration: idx === 0 ? 0 : 0.5,
        ease: 'none',
      },
      delayIndex * 0.6
    )

    if (prev) {
      tl.to(
        prev,
        {
          duration: 0.5,
          width: slideWidth,
          ease: 'none',
        },
        delayIndex * 0.6
      )
    }
  })

  st = ScrollTrigger.create({
    trigger: scroller,
    start: () => 'top+=5% top',
    end: () => 'bottom-=2% bottom',
    scrub: true,
    animation: tl,
  })
}

onMounted(async () => {
  await delayPromise(100)
  animate()
})

onUnmounted(() => {
  st?.kill()
})
</script>

<template>
  <section ref="$el" class="project-interior">
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
          />
        </div>
      </div>
      <div ref="scrollerRef" class="project-interior__apartments-wrapper">
        <div class="project-interior__apartments">
          <ProjectInteriorApartments :apartments="content?.apartments" />
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
  padding-top: vw(40);
  padding-bottom: vw(200);

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
  height: 500vh;
  position: relative;
}

.project-interior__apartments {
  margin-top: vw(180);
  padding-top: vw(20);
  height: 100vh;
  position: sticky;
  top: 0;
  @media (max-width: $br1) {
    margin-top: 60px;
    padding-top: 0;
  }
}
</style>
