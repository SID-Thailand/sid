<script lang="ts" setup>
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import type { iProjectGallery } from '~/types/projectTypes'

interface IProps {
  content: iProjectGallery
}

const props = defineProps<IProps>()

const activeImg = ref(0)
const totalImages = computed(() => props.content?.images?.length || 0)
const cursorX = ref(0)
const cursorY = ref(0)
const cursorType = ref<'left' | 'right' | null>(null)

const handlePrev = () => {
  activeImg.value =
    activeImg.value === 0 ? totalImages.value - 1 : activeImg.value - 1
}

const handleNext = () => {
  activeImg.value =
    activeImg.value === totalImages.value - 1 ? 0 : activeImg.value + 1
}

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const setCursor = (type: 'left' | 'right' | null) => {
  cursorType.value = type
}
</script>

<template>
  <section class="project-gallery">
    <div
      class="project-gallery__wrapper"
      @mousemove="handleMouseMove"
      @mouseleave="setCursor(null)"
    >
      <ul
        class="project-gallery__list"
        :style="{ transform: `translateX(-${activeImg * 100}%)` }"
      >
        <li
          v-for="(img, idx) in content?.images"
          :key="idx"
          class="project-gallery__item"
        >
          <CustomImage
            :src="img?.filename"
            :alt="img?.alt"
            class="project-gallery__img"
          />
        </li>
      </ul>
      <div class="project-gallery__btns">
        <button
          type="button"
          class="project-gallery__btn"
          @click="handlePrev"
          @mouseenter="setCursor('left')"
          @mouseleave="setCursor(null)"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          class="project-gallery__btn"
          @click="handleNext"
          @mouseenter="setCursor('right')"
          @mouseleave="setCursor(null)"
        >
          <ArrowRight />
        </button>
      </div>
      <div
        v-if="cursorType"
        class="project-gallery__cursor"
        :class="`project-gallery__cursor--${cursorType}`"
        :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
      >
        <ArrowLeft v-if="cursorType === 'left'" />
        <ArrowRight v-else />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-gallery {
  position: relative;
  height: 100dvh;
  width: 100%;
}

.project-gallery__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.project-gallery__list {
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.project-gallery__item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.project-gallery__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-gallery__btns {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;

  @media (max-width: $br1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    top: 50%;
    transform: translateY(-50%);
    height: fit-content;
  }
}

.project-gallery__btn {
  cursor: none;
  background-color: transparent;

  @media (min-width: $br1) {
    &:first-child {
      height: 100%;
      width: 50%;
    }
    &:last-child {
      height: 100%;
      width: 50%;
    }

    svg {
      display: none;
    }
  }

  @media (max-width: $br1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: var(--basic-black);
    color: var(--basic-white);
    border-radius: 50%;

    svg {
      width: 30px;
      height: 30px;
    }
  }
}

.project-gallery__cursor {
  pointer-events: none;
  position: fixed;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: vw(60);
  height: vw(60);
  border-radius: 50%;
  background: var(--basic-black);
  color: var(--basic-white);
  z-index: 50;

  &--left svg,
  &--right svg {
    width: vw(30);
    height: vw(30);
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
