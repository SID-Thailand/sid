<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iCurrentProjectExterior } from '~/types/currentProjectTypes'
import type { iImage } from '~/types/story'

interface IProps {
  content: iCurrentProjectExterior
}

defineProps<IProps>()

const activeIdx = ref(0)

const sliderRef = ref<HTMLUListElement | null>(null)
const sliderContainerRef = ref<HTMLDivElement | null>(null)

const isFullImageModalOpened = ref(false)
const selectedImage = ref<iImage | null>(null)

const slideTo = (idx: number) => {
  if (!sliderRef.value) return

  const tl = gsap.timeline()

  const target = sliderRef.value.children[idx] as HTMLElement
  if (!target) return

  const gap = parseFloat(getComputedStyle(sliderRef.value).gap) || 0
  const itemWidth = target.getBoundingClientRect().width + gap

  tl.to(
    sliderRef.value,
    {
      duration: 1,
      x: -itemWidth * idx,
      ease: 'power2.out',
    },
    0.01
  )

  activeIdx.value = idx
}

const onClick = (_e: MouseEvent, img: iImage, idx: number) => {
  selectedImage.value = img
  if (idx === activeIdx.value) {
    isFullImageModalOpened.value = true
    return
  }
  slideTo(idx)
}

const handleCloseFullImageModal = () => {
  isFullImageModalOpened.value = false
  selectedImage.value = null
}
</script>

<template>
  <section class="project-exterior">
    <div class="project-exterior__wrapper container">
      <h2 class="project-exterior__title">
        {{ content?.title }}
      </h2>
      <div class="project-exterior__content">
        <p class="project-exterior__text">
          {{ content?.text }}
        </p>
        <div ref="sliderContainerRef" class="project-exterior__slider">
          <ul ref="sliderRef" class="project-exterior__list">
            <li
              v-for="(item, idx) in content?.assets"
              :key="idx"
              class="project-exterior__item"
              :class="{ 'project-exterior__item--active': idx === activeIdx }"
              @click="onClick($event, item, idx)"
            >
              <CustomImage
                :src="item?.filename"
                :alt="item?.alt"
                :width="1920"
                class="project-exterior__img"
              />
            </li>
          </ul>
          <ProjectMobileCarousel :assets="content?.assets" @choose="onClick" />
        </div>
      </div>
    </div>
    <ModalsImageSliderModal
      :is-open="isFullImageModalOpened"
      :images="content?.assets"
      :selected-image="selectedImage"
      @close="handleCloseFullImageModal"
    />
  </section>
</template>

<style lang="scss">
.project-exterior {
  position: relative;
  padding-top: vw(40);
  padding-bottom: vw(200);
  background-color: var(--neutral-600);
  color: var(--basic-white);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.project-exterior__title {
  text-transform: uppercase;
  text-align: center;
  @include heading-h1;

  @media (max-width: $br1) {
    text-align: start;
  }
}

.project-exterior__content {
  margin-top: vw(200);
  display: flex;
  gap: vw(136);
  height: vw(600);

  @media (max-width: $br1) {
    margin-top: 48px;
    flex-direction: column;
    height: auto;
  }
}

.project-exterior__text {
  line-height: 1.2em;
  max-width: vw(325);
  width: 100%;
  flex-shrink: 0;
  @include text-t3;

  @media (max-width: $br1) {
    max-width: 70%;
  }
}

.project-exterior__slider {
  align-self: flex-end;
  padding-right: vw(40);
  padding-left: vw(40);
  margin-left: vw(-40);

  @media (max-width: $br1) {
    margin-top: 24px;
    align-self: flex-start;
    padding-right: 0;
    padding-left: 32px;
    margin-left: -32px;
    width: 100vw;
  }

  @media (max-width: $br3) {
    margin-left: -16px;
    padding-left: 16px;
  }
}

.project-exterior__list {
  display: flex;
  align-items: flex-end;
  gap: vw(40);
  min-width: max-content;

  @media (max-width: $br1) {
    display: none;
    align-items: flex-start;
    gap: 16px;
  }
}

.project-exterior__item {
  user-select: none;
  height: vw(224);
  width: vw(336);
  cursor: pointer;
  transition-property: width, height;
  transition: 1.5s $easing;

  @media (max-width: $br1) {
    height: 332px;
    width: 332px;
  }

  &--active {
    height: vw(600);
    width: vw(600);

    @media (max-width: $br1) {
      height: 332px;
      width: 332px;
    }
  }
}

.project-exterior__img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
