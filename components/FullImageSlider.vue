<script lang="ts" setup>
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}

const props = defineProps<IProps>()

const activeImg = ref(0)
const cursorX = ref(0)
const cursorY = ref(0)
const cursorType = ref<'left' | 'right' | null>(null)
const isIndicatorActive = ref(false)

const handlePrev = () => {
  activeImg.value =
    activeImg.value === 0 ? props.images.length - 1 : activeImg.value - 1
}

const handleNext = () => {
  activeImg.value =
    activeImg.value === props.images.length - 1 ? 0 : activeImg.value + 1
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
  <div class="full-slider">
    <div
      class="full-slider__wrapper"
      @mousemove="handleMouseMove"
      @mouseleave="setCursor(null)"
    >
      <ul
        class="full-slider__list"
        :style="{ transform: `translateX(-${activeImg * 100}%)` }"
      >
        <li v-for="(img, idx) in images" :key="idx" class="full-slider__item">
          <CustomImage
            :src="img?.filename"
            :alt="img?.alt"
            class="full-slider__img"
          />
        </li>
      </ul>

      <div class="full-slider__btns">
        <button
          type="button"
          class="full-slider__btn"
          :class="{ active: isIndicatorActive && cursorType === 'left' }"
          @click="handlePrev"
          @mouseenter="setCursor('left')"
          @mouseleave="setCursor(null)"
          @mousedown="isIndicatorActive = true"
          @mouseup="isIndicatorActive = false"
          @touchstart="
            () => {
              isIndicatorActive = true
              setCursor('left')
            }
          "
          @touchend="isIndicatorActive = false"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          class="full-slider__btn"
          :class="{ active: isIndicatorActive && cursorType === 'right' }"
          @click="handleNext"
          @mouseenter="setCursor('right')"
          @mouseleave="setCursor(null)"
          @mousedown="isIndicatorActive = true"
          @mouseup="isIndicatorActive = false"
          @touchstart="
            () => {
              isIndicatorActive = true
              setCursor('right')
            }
          "
          @touchend="isIndicatorActive = false"
        >
          <ArrowRight />
        </button>
      </div>

      <div
        class="full-slider__cursor"
        :class="[
          `full-slider__cursor--${cursorType}`,
          { visible: cursorType !== null, active: isIndicatorActive },
        ]"
        :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
      >
        <ArrowLeft v-if="cursorType === 'left'" />
        <ArrowRight v-else />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.full-slider {
  position: relative;
  height: 100dvh;
  width: 100%;
}

.full-slider__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.full-slider__list {
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.full-slider__item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.full-slider__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.full-slider__btns {
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

.full-slider__btn {
  cursor: none;
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.2s ease;

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

  &.active {
    transform: scale(0.8);
  }
}

.full-slider__cursor {
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
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    transform 0.2s ease,
    visibility 0.3s ease;
  transform: scale(1);

  &--left svg,
  &--right svg {
    width: vw(30);
    height: vw(30);
    opacity: 1;
  }

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  &.active {
    transform: scale(0.8);
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
