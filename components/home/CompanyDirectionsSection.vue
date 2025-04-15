<script setup lang="ts">
import { useFullPage } from '~/composables/fullPage'
import { gsap } from '~/libs/gsap'
import type { iHomeCompanyDirections } from '~/types/homeTypes'

interface IProps {
  content: iHomeCompanyDirections
}

defineProps<IProps>()

// DOM Refs
const contentRef = ref<HTMLElement | null>(null)
const interviewContentRef = ref<HTMLElement | null>(null)
const assetsRef = ref<HTMLElement | null>(null)

const $texts = ref<NodeListOf<HTMLElement> | null>(null)
const $assets = ref<NodeListOf<HTMLElement> | null>(null)

const itemsCount = computed(() => $texts.value?.length || 0)

const { activePage, prevPage, direction } = useFullPage(
  contentRef as Ref<HTMLElement>,
  itemsCount
)

//Sets up initial states for image and text animations
const setupInitialStates = (): void => {
  if (!$assets.value) return

  $assets.value.forEach((item, index) => {
    const $image = item.querySelector('.interview__img') as HTMLElement
    if (index > 0) {
      gsap.set($image, {
        scale: 1.3,
        clipPath: 'inset(100% 0 0 0)',
      })
    }
  })
}

const animateSections = (): void => {
  const $images = document.querySelectorAll(
    '.interview__img'
  ) as NodeListOf<HTMLElement>
  const $textsList = $texts.value

  if (!$images?.length || !$textsList?.length) return

  const current = activePage.value - 1
  const prev = prevPage.value - 1

  const $currentImage = $images[current]
  const $prevImage = $images[prev]
  const $currentWrapper = $textsList[current]
  const $prevWrapper = $textsList[current - 1]

  const currentWrapperTop = $currentWrapper?.offsetTop

  if (!$currentWrapper || !$currentImage) return

  const duration = 2

  const tl = gsap.timeline({
    defaults: {
      duration,
      ease: 'power2.out',
    },
  })

  tl.to(interviewContentRef.value, { y: -currentWrapperTop }, 0)

  // Animate text sections
  if ($prevWrapper) {
    tl.to($prevWrapper, { opacity: 0 }, 0)
  }
  tl.to($currentWrapper, { opacity: 1 }, 0)

  if (current > prev) {
    if ($prevImage) {
      tl.to($prevImage, { scale: 1.3 }, 0)
    }
    tl.to(
      $currentImage,
      {
        scale: 1,
        clipPath: 'inset(0% 0 0 0)',
      },
      0
    )
  } else {
    tl.to(
      $currentImage,
      {
        scale: 1,
        clipPath: 'inset(0% 0 0 0)',
      },
      0
    )

    if ($prevImage) {
      tl.to(
        $prevImage,
        {
          scale: 1.3,
          clipPath: 'inset(100% 0 0 0)',
        },
        0
      )
    }
  }
}

watch(activePage, () => {
  animateSections()
})

onMounted(() => {
  if (!contentRef.value || !assetsRef.value) return

  $texts.value = contentRef.value.querySelectorAll(
    '.interview__content-wrapper'
  ) as NodeListOf<HTMLElement>
  $assets.value = assetsRef.value.querySelectorAll(
    '.interview__image-item'
  ) as NodeListOf<HTMLElement>

  setupInitialStates()
})
</script>

<template>
  <section class="interview container">
    <div class="interview__wrapper">
      <div class="interview__title-wrapper">
        <h2 class="interview__title">{{ content?.title }}</h2>
      </div>
      <div
        ref="contentRef"
        class="interview__block"
        :style="{ '--direction': direction === 1 ? 'normal' : 'reverse' }"
      >
        <div class="interview__block-wrapper">
          <div ref="assetsRef" class="interview__assets">
            <div
              v-for="(item, idx) in content?.directions"
              :key="idx"
              class="interview__image-item"
            >
              <div class="interview__img-wrapper">
                <CustomImage
                  :src="item?.asset?.filename"
                  :alt="item?.asset?.alt"
                  class="interview__img"
                />
              </div>
            </div>
          </div>
          <div ref="interviewContentRef" class="interview__content">
            <div
              v-for="(item, idx) in content?.directions"
              :key="idx"
              class="interview__content-wrapper"
              :class="
                idx === activePage - 1 && 'interview__content-wrapper--active'
              "
              :style="{ zIndex: idx + 1 }"
            >
              <div class="interview__item">
                <div class="interview__line" />
                <div class="interview__info">
                  <h3 class="interview__item-title">{{ item?.title }}</h3>
                  <p class="interview__item-text">{{ item?.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.interview {
  position: relative;
  height: 100%;
  padding-top: vw(40);

  background-color: var(--neutral-600);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.interview__title-wrapper {
  @media (min-width: $br4) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: vw(140);
  }
}

.interview__title {
  font-size: vw(88);
  text-transform: uppercase;
  line-height: 1em;
  @include med;

  @media (min-width: $br1) {
    width: vw(785);
  }

  @media (max-width: $br1) {
    font-size: size(88, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.interview__block {
  position: relative;
}

.interview__block-wrapper {
  top: 0;
  height: 100svh;

  padding-top: vw(60);

  @media (min-width: $br4) {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: $br4) {
    padding-top: 16px;
  }
}

.interview__assets {
  position: relative;
  width: vw(440);
  height: vw(496);
  max-height: 90%;

  @media (max-width: $br4) {
    margin: 0 auto;
    margin-top: 16px;
    aspect-ratio: 1;
    height: auto;
    width: 100%;
    max-height: none;
    z-index: 10;
    background-color: var(--neutral-600);
  }
}

.interview__content {
  position: relative;

  @media (min-width: $br1) {
    width: vw(785);
  }
}

.interview__content-wrapper {
  color: var(--neutral-300);

  @media (min-width: $br4) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  &--active {
    color: var(--basic-white);

    .interview__item-text {
      color: var(--neutral-200);
    }
  }
}

.interview__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  height: 100%;
  @include subheading-h5;

  @media (min-width: $br4) {
    width: fit-content;
    max-width: vw(600);
  }
}

.interview__img-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.interview__img {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

.interview__name {
  margin-top: vw(16);
  overflow: hidden;

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.interview__description {
  color: var(--neutral-300);
  overflow: hidden;
}

.interview__item {
  @media (min-width: $br4) {
    width: vw(785);
    padding-bottom: vw(124);
  }

  @media (max-width: $br4) {
    margin-top: 40px;
  }
}

.interview__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
  transition: background-color 2s $easing;
}

.interview__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: vw(16);
  gap: vw(20);

  @media (max-width: $br1) {
    flex-direction: column;
    margin-top: 16px;
    gap: 12px;
    max-width: 80%;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.interview__item-title {
  text-transform: uppercase;
  transition: color 2s $easing;
  width: 100%;
  flex: 1 0 auto;
  @include subheading-h1;

  @media (min-width: $br1) {
    max-width: vw(268);
  }
}

.interview__item-text {
  transition: color 2s $easing;
  line-height: 1.25em !important;
  font-size: vw(16);
  color: var(--neutral-300);
  @include med;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}
</style>
