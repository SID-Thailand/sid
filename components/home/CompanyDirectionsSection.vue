<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { iHomeCompanyDirections } from '~/types/story'
import { resize } from '@emotionagency/utils'

interface IProps {
  content: iHomeCompanyDirections
}

defineProps<IProps>()

gsap.registerPlugin(ScrollTrigger)

const contentRef = ref<HTMLElement | null>(null)
const interviewContentRef = ref<HTMLElement | null>(null)
const assetsRef = ref<HTMLElement | null>(null)
const $wrappers = ref<NodeListOf<HTMLElement>>(null)

const activeIdx = ref(0)
const dir = ref(1)
const height = ref(0)
const st = ref<ScrollTrigger | null>(null)

const itemsCount = computed(() => {
  if (!$wrappers.value) return 0
  return $wrappers.value.length
})

const calcHeight = () => {
  const lastItemHeight = $wrappers.value[itemsCount.value - 1]?.scrollHeight

  height.value = interviewContentRef.value?.scrollHeight - lastItemHeight
}

const makeAnimation = () => {
  if (!contentRef.value) return

  if (!$wrappers.value?.length) return

  const tl = gsap.timeline({
    paused: true,
  })

  const lastItemHeight = $wrappers.value[itemsCount.value - 1].scrollHeight
  const height = interviewContentRef.value?.scrollHeight - lastItemHeight

  tl.to(interviewContentRef.value, {
    duration: 1,
    ease: 'none',
    y: -height,
  })

  ScrollTrigger.create({
    trigger: contentRef.value as HTMLElement,
    start: () => 'top top',
    end: () => 'bottom-=5% bottom',
    scrub: true,

    animation: tl,

    onUpdate: ({ direction }) => {
      dir.value = direction
      $wrappers.value.forEach((wrapper, index) => {
        const bounds = wrapper.getBoundingClientRect()
        const assetsBounds = assetsRef.value.getBoundingClientRect()

        if (bounds.top < 150 && window.innerWidth > 1060) {
          activeIdx.value = index
        }

        if (
          bounds.top - 100 < assetsBounds.bottom &&
          window.innerWidth < 1060
        ) {
          activeIdx.value = index
        }
      })
    },
  })
}

onMounted(() => {
  $wrappers.value = contentRef.value.querySelectorAll(
    '.interview__content-wrapper'
  ) as NodeListOf<HTMLElement>

  resize.on(calcHeight)

  makeAnimation()
})

onBeforeUnmount(() => {
  st.value?.kill(true)
  resize.off(calcHeight)
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
        :style="{ '--direction': dir === 1 ? 'normal' : 'reverse' }"
      >
        <div class="interview__block-wrapper">
          <div ref="assetsRef" class="interview__assets">
            <div
              v-for="(item, idx) in content?.directions"
              :key="idx"
              class="interview__image-item"
              :class="idx === activeIdx && 'interview__image-item--active'"
            >
              <div
                class="interview__img-wrapper"
                :class="idx <= activeIdx && 'interview__img-wrapper--active'"
              >
                <CustomImage
                  :src="item?.person?.content?.photo?.filename"
                  :alt="item?.person?.content?.photo?.alt"
                  class="interview__img"
                />
              </div>

              <div class="interview__desc-wrapper">
                <p class="interview__name">
                  <span class="interview__text-line">
                    {{
                      item?.person?.content?.interview_title ||
                      item?.person?.content?.name
                    }}
                  </span>
                </p>
                <p class="interview__description">
                  <span class="interview__text-line">
                    {{
                      item?.person?.content?.interview_position ||
                      item?.person?.content?.position
                    }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div ref="interviewContentRef" class="interview__content">
            <div
              v-for="(item, idx) in content?.directions"
              :key="idx"
              class="interview__content-wrapper"
              :class="idx === activeIdx && 'interview__content-wrapper--active'"
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
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: vw(200);
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
  height: 300vh;
}

.interview__block-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  padding-top: vw(60);

  @media (min-width: $br1) {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    margin-top: 40px;
    padding-top: 0px;
  }
}

.interview__assets {
  position: relative;
  width: vw(440);
  height: vw(496);
  @media (max-width: $br1) {
    margin-top: 16px;

    width: 100%;
    aspect-ratio: 440 / 496;
    height: auto;
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
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  &--active {
    .interview__item {
      color: var(--basic-white);

      .interview__line {
        background-color: var(--basic-white);
      }
    }

    // @media (max-width: $br1) {
    //   .interview__item {
    //     opacity: 1;
    //   }
    // }
  }
}

.interview__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  @include subheading-h5;
  &--active {
    .interview__text-line {
      transform: translateY(0%);
    }
  }

  @media (min-width: $br1) {
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

  &--active {
    .interview__img {
      transform: translateY(0) scale(1);
    }
  }
}

.interview__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  transition: transform 3s $easing;
  transform-origin: center top;
  transform: translateY(100%) scale(1.3);
  will-change: transform;
}

.interview__text-line {
  display: inline-block;
  transform: translateY(100%);
  transition: transform 0.5s $easing;
}

.reverse {
  .interview__text-line {
    transform: translateY(-100%);
  }
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
  color: var(--neutral-300);

  @media (min-width: $br1) {
    width: vw(785);
    padding-bottom: vw(124);
  }

  @media (max-width: $br1) {
    // opacity: 0;
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
  @include text-t4;
}
</style>
