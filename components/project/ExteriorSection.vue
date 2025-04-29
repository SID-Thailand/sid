<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iCurrentProjectExterior } from '~/types/currentProjectTypes'
import type { iImage } from '~/types/story'

interface IProps {
  content: iCurrentProjectExterior
}

const props = defineProps<IProps>()

const activeIdx = ref(0)

const sliderRef = ref<HTMLUListElement | null>(null)
const sliderContainerRef = ref<HTMLDivElement | null>(null)
const isDesktop = ref(true)
const isFullImageModalOpened = ref(false)
const activeImage = ref<iImage | null>(null)

const touchStartX = ref(0)
const touchEndX = ref(0)

const slideTo = (idx: number) => {
  if (!sliderRef.value) return

  const target = sliderRef.value.children[idx] as HTMLElement
  if (!target) return

  const gap = parseFloat(getComputedStyle(sliderRef.value).gap) || 0
  const itemWidth = target.getBoundingClientRect().width + gap

  gsap.to(sliderRef.value, {
    duration: 1,
    x: -itemWidth * idx,
    ease: 'power2.out',
  })

  activeIdx.value = idx
}

const onClick = (_e: MouseEvent, img: iImage, idx: number) => {
  if (!isDesktop.value) {
    isFullImageModalOpened.value = true
    activeImage.value = img
  } else {
    if (idx === activeIdx.value) return
    slideTo(idx)
  }
}

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const onTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].clientX
  handleSwipe()
}

const handleSwipe = () => {
  const distance = touchEndX.value - touchStartX.value
  if (Math.abs(distance) < 50) return

  if (distance < 0 && activeIdx.value < props.content?.assets?.length - 1) {
    slideTo(activeIdx.value + 1)
  } else if (distance > 0 && activeIdx.value > 0) {
    slideTo(activeIdx.value - 1)
  }
}

const handleCloseFullImageModal = () => {
  isFullImageModalOpened.value = false
  activeImage.value = null
}

onMounted(() => {
  isDesktop.value = window.innerWidth > 860

  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth > 860
  })
})
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
        <div
          ref="sliderContainerRef"
          class="project-exterior__slider"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
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
                class="project-exterior__img"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Modal
      :is-open="isFullImageModalOpened"
      modal-window-class="project-exterior__modal-wrapper"
      @close="handleCloseFullImageModal"
    >
      <CustomImage
        :src="activeImage?.filename"
        :alt="activeImage?.alt"
        class="project-exterior__modal-img"
      />
    </Modal>
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
    padding-right: 32px;
    padding-left: 32px;
    margin-left: -32px;
  }

  @media (max-width: $br3) {
    padding-right: 16px;
    padding-left: 16px;
    margin-left: -16px;
  }
}

.project-exterior__list {
  display: flex;
  align-items: flex-end;
  gap: vw(40);
  min-width: max-content;

  @media (max-width: $br1) {
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
    height: 109px;
    width: 164px;
  }

  &--active {
    height: vw(600);
    width: vw(600);

    @media (max-width: $br1) {
      height: 285px;
      width: 285px;
    }
  }
}

.project-exterior__img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.project-exterior__modal-wrapper {
  max-height: 100svh;
  height: 100%;
  width: 100%;
  max-width: 100vw !important;
}

.project-exterior__modal-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
