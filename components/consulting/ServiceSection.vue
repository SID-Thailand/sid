<script lang="ts" setup>
import { gsap, ScrollTrigger } from '~/libs/gsap'
import { resize } from '@emotionagency/utils'
import { LucidePlus } from 'lucide-vue-next'
import type { iConsultingService } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingService
}

defineProps<IProps>()

const contentRef = ref<HTMLElement | null>(null)
const projectContentRef = ref<HTMLElement | null>(null)
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

  height.value = projectContentRef.value?.scrollHeight - lastItemHeight
}

const makeAnimation = () => {
  if (!contentRef.value) return

  if (!$wrappers.value?.length) return

  const tl = gsap.timeline({
    paused: true,
  })

  const lastItemHeight = $wrappers.value[itemsCount.value - 1].scrollHeight
  const height = projectContentRef.value?.scrollHeight - lastItemHeight

  tl.to(projectContentRef.value, {
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
        const assetsBounds = assetsRef.value?.getBoundingClientRect()

        if (bounds?.top < 150 && window.innerWidth > 1060) {
          activeIdx.value = index
        }

        if (
          bounds?.top - 100 < assetsBounds?.bottom &&
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
    '.cons-service__content-wrapper'
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
  <section class="cons-service">
    <div class="cons-service__wrapper container">
      <div class="cons-service__top">
        <p class="cons-service__subtitle">
          {{ content?.subtitle }}
        </p>
        <h2 class="cons-service__title">
          {{ content?.title }}
        </h2>
      </div>
      <div ref="contentRef" class="cons-service__block">
        <div class="cons-service__block-wrapper">
          <div ref="assetsRef" class="cons-service__assets">
            <div
              v-for="(item, idx) in content?.service"
              :key="idx"
              class="cons-service__image-item"
              :class="idx === activeIdx && 'cons-service__image-item--active'"
            >
              <div
                class="cons-service__img-wrapper"
                :class="idx <= activeIdx && 'cons-service__img-wrapper--active'"
              >
                <CustomImage
                  :src="item?.asset?.filename"
                  :alt="item?.asset?.alt"
                  class="cons-service__img"
                />
              </div>
            </div>
          </div>
          <div ref="projectContentRef" class="cons-service__content">
            <div
              v-for="(item, idx) in content?.service"
              :key="idx"
              class="cons-service__content-wrapper"
              :class="
                idx === activeIdx && 'cons-service__content-wrapper--active'
              "
              :style="{ zIndex: idx + 1 }"
            >
              <div class="cons-service__item">
                <div class="cons-service__line" />
                <div class="cons-service__item-wrapper">
                  <LucidePlus class="cons-service__plus" />
                  <div class="cons-service__info">
                    <h3 class="cons-service__item-title">
                      {{ item?.text }}
                    </h3>
                  </div>
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
.cons-service {
  position: relative;
  padding: vw(40) 0;
  background-color: var(--neutral-600);
  color: var(--basic-white);

  @media (max-width: $br1) {
    padding: 24px 0;
  }
}

.cons-service__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: vw(20);
  width: 100%;

  @media (max-width: $br1) {
    flex-direction: column;
    column-gap: 16px;
  }
}

.cons-service__subtitle {
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.cons-service__title {
  font-size: vw(50);
  line-height: 1em;
  text-transform: uppercase;
  max-width: vw(630);
  @include med;

  @media (max-width: $br1) {
    max-width: 100%;
    margin-top: 40px;
    font-size: size(50, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.cons-service__block {
  position: relative;
  height: 300vh;
  color: var(--basic-white);
}

.cons-service__block-wrapper {
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

.cons-service__assets {
  position: relative;
  width: vw(440);
  height: vw(440);

  @media (max-width: $br1) {
    margin-top: 16px;
    width: 100%;
    aspect-ratio: 440 / 440;
    height: auto;
    z-index: 10;
    background-color: var(--neutral-100);
  }
}

.cons-service__content {
  position: relative;
}

.cons-service__content-wrapper {
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  @media (max-width: $br1) {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  &--active {
    .cons-service__plus {
      opacity: 1;
    }

    .cons-service__item-title {
      color: var(--basic-white);
    }
  }
}

.cons-service__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  @include subheading-h5;

  @media (min-width: $br1) {
    width: 100%;
    height: 100%;
    max-width: vw(600);
  }

  @media (max-width: $br1) {
    width: 100%;
    height: auto;
  }
}

.cons-service__img-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &--active {
    .cons-service__img {
      transform: translateY(0) scale(1);
    }
  }
}

.cons-service__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  transition: transform 3s $easing;
  transform-origin: center top;
  transform: translateY(100%) scale(1.3);
  will-change: transform;
}

.cons-service__item {
  @media (min-width: $br1) {
    width: vw(630);
    padding-bottom: vw(24);
  }
}

.cons-service__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
}

.cons-service__item-wrapper {
  display: flex;
  align-items: flex-start;
  gap: vw(12);
  margin-top: vw(24);

  @media (max-width: $br1) {
    gap: 16px;
    margin-top: 20px;
  }
}

.cons-service__plus {
  display: block;
  color: var(--basic-white);
  width: vw(20);
  height: vw(20);
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: $br1) {
    width: 16px;
    height: 16px;
  }
}

.cons-service__info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: vw(8);

  @media (max-width: $br1) {
    gap: 4px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.cons-service__item-title {
  text-transform: uppercase;
  font-size: vw(24);
  line-height: 1em;
  color: var(--neutral-300);
  transition: color 0.3s ease;
  @include med;

  @media (max-width: $br1) {
    font-size: size(24, 18);
  }

  @media (max-width: $br4) {
    font-size: 18px;
  }
}
</style>
