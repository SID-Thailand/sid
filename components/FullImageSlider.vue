<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}

defineProps<IProps>()

const current = ref(0)
const prev = ref(null)
const direction = ref<1 | -1>(1)

const cursorX = ref(0)
const cursorY = ref(0)
const cursorType = ref<'left' | 'right' | null>(null)
const isIndicatorActive = ref(false)

const $items = ref<HTMLElement[]>([])

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const setCursor = (type: 'left' | 'right' | null) => {
  cursorType.value = type
}

const handlePrev = () => {
  prev.value = current.value
  current.value =
    (current.value - 1 + $items.value.length) % $items.value.length
  direction.value = -1
}

const handleNext = () => {
  prev.value = current.value
  current.value = (current.value + 1) % $items.value.length
  direction.value = 1
}

const navigate = (direction: 1 | -1) => {
  direction === 1 ? handleNext() : handlePrev()
}

const throttledNavigate = useThrottleFn(navigate, 700)

const handleChangeSlide = async () => {
  const $active = $items.value[current.value] as HTMLElement
  const $prev = $items.value[prev.value] as HTMLElement

  const $activeImg = $active.querySelector('img') as HTMLImageElement
  const $prevImg = $prev?.querySelector('img') as HTMLImageElement

  const dir = direction.value

  const tl = gsap.timeline({
    overwrite: true,
  })

  const from = 'inset(0 0 0 100%)'
  const to = 'inset(0 100% 0 0)'

  tl.set($active, {
    clipPath: dir === 1 ? from : to,
  })

  tl.set($activeImg, {
    scale: 1.3,
  })

  if ($prev) {
    tl.to(
      $prev,
      {
        clipPath: dir === 1 ? to : from,
        duration: 1.5,
        ease: 'power2.out',
      },
      0
    )

    tl.to(
      $prevImg,
      {
        scale: 1.3,
        duration: 1.5,
        ease: 'power2.out',
      },
      0
    )
  }

  tl.to(
    $active,
    {
      clipPath: 'inset(0 0% 0 0%)',
      duration: 1.5,
      ease: 'power2.out',
    },
    0
  )

  tl.to(
    $activeImg,
    {
      scale: 1,
      duration: 1.5,
      ease: 'power2.out',
    },
    0
  )
}

watch(current, handleChangeSlide)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    throttledNavigate(-1)
  } else if (e.key === 'ArrowRight') {
    throttledNavigate(1)
  }
}

onMounted(() => {
  prev.value = $items.value.length - 1
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="full-slider">
    <div
      class="full-slider__wrapper"
      @mousemove="handleMouseMove"
      @mouseleave="setCursor(null)"
    >
      <ul class="full-slider__list">
        <li
          v-for="(img, idx) in images"
          :key="idx"
          ref="$items"
          class="full-slider__item"
          :class="{ active: idx === current, prev: idx === prev }"
        >
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
          @click="throttledNavigate(-1)"
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
          <IconsArrowLeft />
        </button>
        <button
          type="button"
          class="full-slider__btn"
          :class="{ active: isIndicatorActive && cursorType === 'right' }"
          @click="throttledNavigate(1)"
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
          <IconsArrowRight />
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
        <IconsArrowLeft v-if="cursorType === 'left'" />
        <IconsArrowRight v-else />
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
  height: 100%;
  width: 100%;
  position: relative;
}

.full-slider__item {
  width: 100%;
  height: 100%;
  will-change: transform, clip-path;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  clip-path: inset(0px 0px 0px 100%);

  &.active {
    z-index: 2;
  }
  &.prev {
    z-index: 1;
  }

  &:first-child {
    clip-path: inset(0 0 0 0);
  }
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
  z-index: 3;

  @media (max-width: $br1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
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
  outline: none;

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
    background-color: transparent;
    color: var(--basic-white);
    border-radius: 50%;

    svg {
      width: 14px;
      height: 14px;
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
  background-color: transparent;
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
    width: vw(22);
    height: vw(22);
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
