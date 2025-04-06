<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { iHomeCompanyDirections } from '~/types/story'

interface IProps {
  content: iHomeCompanyDirections
}

defineProps<IProps>()

gsap.registerPlugin(ScrollTrigger)

const contentRef = ref<HTMLElement | null>(null)
const interviewContentRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!contentRef.value) return
  const wrappers = contentRef.value.querySelectorAll(
    '.interview__content-wrapper'
  )
  const itemsCount = wrappers.length
  const interval = 1 / itemsCount
  const tl = gsap.timeline({
    paused: true,
  })
  // const contentInterviewHeight = interviewContentRef.value?.scrollHeight || 0

  // tl.to(interviewContentRef.value, {
  //   y: -contentInterviewHeight,
  //   duration: 1,
  // })

  ScrollTrigger.create({
    trigger: contentRef.value,
    start: () => 'top top',
    end: () => 'bottom bottom',
    scrub: true,
    // markers: true,
    animation: tl,

    onUpdate: ({ progress }) => {
      const activeIndex =
        progress < interval
          ? 0
          : progress >= 1 - interval
            ? itemsCount - 1
            : Math.floor(progress / interval)

      wrappers.forEach((wrapper, index) => {
        wrapper.classList.toggle(
          'interview__img-wrapper--active',
          progress >= index * interval
        )
        wrapper.classList.toggle(
          'interview__content-wrapper--active',
          index === activeIndex
        )
      })
    },
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <section class="interview container">
    <div class="interview__wrapper">
      <div class="interview__title-wrapper">
        <h2 class="interview__title">{{ content?.title }}</h2>
      </div>
      <div ref="contentRef" class="interview__block">
        <div class="interview__block-wrapper">
          <div ref="interviewContentRef" class="interview__content">
            <div
              v-for="(item, idx) in content?.directions"
              :key="idx"
              class="interview__content-wrapper"
              :class="idx === 0 && 'interview__content-wrapper--active'"
              :style="{ zIndex: idx + 1 }"
            >
              <div class="interview__image-item">
                <div
                  class="interview__img-wrapper"
                  :class="idx === 0 && 'interview__img-wrapper--active'"
                >
                  <CustomImage
                    :src="item?.person?.content?.photo?.filename"
                    :alt="item?.person?.content?.photo?.alt"
                    class="interview__img"
                  />
                </div>

                <div class="interview__desc-wrapper">
                  <p class="interview__name">
                    {{ item?.person?.content?.name }}
                  </p>
                  <p class="interview__description">
                    {{ item?.person?.content?.position }}
                  </p>
                </div>
              </div>

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
  padding-bottom: vw(100);
  background-color: var(--neutral-600);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.interview__wrapper {
  height: 100%;
}

.interview__title-wrapper {
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
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
  height: fit-content;
  padding-top: vw(60);

  @media (max-width: $br1) {
    margin-top: 40px;
    padding-top: 16px;
    height: var(--active-height);
  }
}

.interview__content {
  position: relative;
}

.interview__content-wrapper {
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  @media (max-width: $br1) {
    position: absolute;
  }

  &--active {
    .interview__desc-wrapper {
      opacity: 1;
    }

    .interview__item {
      color: var(--basic-white);

      .interview__line {
        background-color: var(--basic-white);
      }
    }

    @media (max-width: $br1) {
      .interview__item {
        opacity: 1;
      }
    }
  }
}

.interview__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  @include subheading-h5;

  @media (min-width: $br1) {
    @include col(1, 8);
    width: fit-content;
    max-width: vw(600);
  }

  @media (max-width: $br1) {
    position: relative;
    max-height: auto;
    height: 100%;
    line-height: 1.5em;
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
      transform: translateY(0);
    }
  }
}

.interview__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  transition: transform 3s $easing;
  transform: translateY(100%);
}

.interview__desc-wrapper {
  opacity: 0;
  transition: opacity 2s $easing;
}

.interview__name {
  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.interview__description {
  color: var(--neutral-300);
}

.interview__item {
  color: var(--neutral-300);

  @media (min-width: $br1) {
    width: vw(785);
    padding-bottom: vw(124);
  }

  @media (max-width: $br1) {
    opacity: 0;
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
