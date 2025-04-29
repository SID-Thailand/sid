<script lang="ts" setup>
import type { iCurrentProjectInterior } from '~/types/currentProjectTypes'
import { ScrollTrigger, gsap } from '~/libs/gsap'
import { delayPromise } from '@emotionagency/utils'

interface IProps {
  content: iCurrentProjectInterior
}

const props = defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)

const scrollerRef = ref<HTMLElement | null>(null)

let st: ScrollTrigger | null = null

const apparts = computed(() => {
  return props.content?.apartments
})

const selectedAppart = reactiveComputed(() => {
  return {
    value: apparts?.value?.[0],
  }
})

const height = computed(() => {
  return (selectedAppart.value?.assets?.length || 0) * 100 + 'vh'
})

const animate = () => {
  const scroller = scrollerRef.value as HTMLElement

  const slides = gsap.utils.toArray('[data-image]') as HTMLElement[]

  const tl = gsap.timeline()

  const duration = 0.5

  slides.forEach((slide, i) => {
    if (i === 0) {
      gsap.set(slide, {
        width: '100%',
        height: 'auto',
      })
      return
    }

    const delayIdx = i - 1

    const aspect = slide.getAttribute('aspect')

    const propertyToAnimate = aspect === 'landscape' ? 'width' : 'height'

    const propertyToAnimateValue =
      propertyToAnimate === 'width' ? '100%' : '90vh'

    tl.to(
      slide,
      {
        [propertyToAnimate]: propertyToAnimateValue,
        duration,
        ease: 'none',
      },
      duration * delayIdx
    )

    const prev = slides[i - 1] as HTMLElement

    if (!prev) {
      return
    }

    const prevAspect = prev?.getAttribute('aspect')
    const prevPropertyToAnimate =
      prevAspect === 'landscape' ? 'width' : 'height'
    const prevPropertyToAnimateValue =
      prevPropertyToAnimate === 'width' ? '33%' : '25vh'

    const height = prev?.getAttribute('original-height')

    tl.to(
      prev,
      {
        [prevPropertyToAnimate]: prevPropertyToAnimateValue,
        duration,
        ease: 'none',
      },
      duration * delayIdx
    )

    tl.to(
      prev.parentElement,
      {
        marginTop: `-${height}`,
        duration,
        ease: 'none',
      },
      duration * delayIdx
    )
  })

  st = ScrollTrigger.create({
    trigger: scroller,
    start: () => 'top+=5% top',
    end: () => 'bottom-=2% bottom',
    scrub: true,
    animation: tl,
  })
}

watch(
  selectedAppart,
  async () => {
    st?.kill()
    await delayPromise(500)

    animate()
  },
  { immediate: true }
)

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
      <div
        ref="scrollerRef"
        class="project-interior__apartments-wrapper"
        :style="{
          '--height': `${height}`,
        }"
      >
        <div class="project-interior__apartments">
          <ProjectInteriorApartments
            v-model="selectedAppart.value"
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
  padding-top: vw(40);

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
  height: 700vh;
  height: var(--height);
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
