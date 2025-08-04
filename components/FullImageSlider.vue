<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}

const props = defineProps<IProps>()

const $items = ref<HTMLElement[]>([])

const { prev, current, direction, throttledNavigate } = useSlider(
  props.images.length
)

const handleChangeSlide = async () => {
  const $active = $items.value[current.value] as HTMLElement
  const $prev = $items.value[prev.value] as HTMLElement

  const $activeImg = $active.querySelector('img') as HTMLImageElement
  const $prevImg = $prev?.querySelector('img') as HTMLImageElement

  const dir = direction.value

  const tl = gsap.timeline({ overwrite: true })

  const from = 'inset(0 0 0 100%)'
  const to = 'inset(0 100% 0 0)'

  tl.set($active, { clipPath: dir === 1 ? from : to })

  tl.set($activeImg, { scale: 1.3 })

  if ($prev) {
    tl.to(
      $prev,
      { clipPath: dir === 1 ? to : from, duration: 1.5, ease: 'power2.out' },
      0
    )

    tl.to($prevImg, { scale: 1.3, duration: 1.5, ease: 'power2.out' }, 0)
  }

  tl.to(
    $active,
    { clipPath: 'inset(0 0% 0 0%)', duration: 1.5, ease: 'power2.out' },
    0
  )

  tl.to($activeImg, { scale: 1, duration: 1.5, ease: 'power2.out' }, 0)
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
  <div ref="el" class="full-slider">
    <div class="full-slider__wrapper">
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
            :width="1920"
          />
        </li>
      </ul>
      <SliderNavigation @navigate="throttledNavigate" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.full-slider {
  position: relative;
  height: 100vh;
  height: 100svh;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: vw(44);
  height: vw(44);
  top: calc(var(--indicator-y, 0px) - vw(22));
  left: calc(var(--indicator-x, 0px) - vw(22));
  background-color: transparent;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    transform 0.5s ease,
    visibility 0.3s ease;
  transform: scale(0);

  &::before {
    content: '';
    border-radius: 50%;
    background-color: var(--neutral-600);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &--left svg,
  &--right svg {
    width: vw(20);
    height: vw(20);
    opacity: 1;
  }

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
