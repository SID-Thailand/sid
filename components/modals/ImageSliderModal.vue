<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
  isOpen: boolean
  selectedImage: iImage | null
}

const props = defineProps<IProps>()

const emit = defineEmits(['close'])

const current = ref(0)
const prev = ref<number | null>(null)
const direction = ref<1 | -1>(1)
const isIndicatorActive = ref(false)
const $items = ref<HTMLElement[]>([])

const touchStartX = ref(0)

const navigate = (dir: 1 | -1) => {
  prev.value = current.value
  const total = $items.value.length
  current.value = (current.value + dir + total) % total
  direction.value = dir
}

const throttledNavigate = useThrottleFn(navigate, 700)

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  const delta = touchStartX.value - e.changedTouches[0].clientX

  if (Math.abs(delta) > 50) throttledNavigate(delta > 0 ? 1 : -1)
}

const handleChangeSlide = () => {
  const $active = $items.value[current.value]
  const $prev = prev.value != null ? $items.value[prev.value] : null
  const $activeImg = $active?.querySelector('img')
  // const $prevImg = $prev?.querySelector('img')

  gsap.set($active, { opacity: 0, zIndex: 2 })

  const tl = gsap.timeline({ overwrite: true })

  if ($prev) {
    tl.to($prev, { opacity: 0, zIndex: 1, duration: 1, ease: 'power2.out' }, 0)
  }

  tl.to($active, { opacity: 1, duration: 1, ease: 'power2.out' }, 0)

  tl.fromTo(
    $activeImg,
    { scale: 1.1 },
    { scale: 1, duration: 1, ease: 'power2.out' },
    0
  )
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') throttledNavigate(-1)
  else if (e.key === 'ArrowRight') throttledNavigate(1)
}

watch(current, handleChangeSlide)

watch(
  () => props.isOpen,
  isOpen => {
    if (!isOpen || !props.selectedImage) return
    const idx = props.images.findIndex(
      img => img.filename === props.selectedImage!.filename
    )
    if (idx !== -1) {
      current.value = idx
      prev.value = (idx - 1 + props.images.length) % props.images.length
    }
  },
  { immediate: true }
)

onMounted(() => {
  prev.value = $items.value.length - 1
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Modal
    :is-open="isOpen"
    modal-window-class="slider-modal-window"
    @close="emit('close')"
  >
    <div class="slider-modal">
      <div
        class="slider-modal__wrapper"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <ul class="slider-modal__list">
          <li
            v-for="(img, idx) in images"
            :key="idx"
            ref="$items"
            class="slider-modal__item"
            :class="{ active: idx === current, prev: idx === prev }"
          >
            <CustomImage
              :src="img?.filename"
              :alt="img?.alt"
              class="slider-modal__img"
            />
          </li>
        </ul>

        <div class="slider-modal__btns">
          <button
            type="button"
            class="slider-modal__btn"
            :class="{ active: isIndicatorActive }"
            @click="() => throttledNavigate(-1)"
            @mousedown="isIndicatorActive = true"
            @mouseup="isIndicatorActive = false"
            @touchstart="
              () => {
                isIndicatorActive = true
              }
            "
            @touchend="isIndicatorActive = false"
          >
            <IconsArrowLeft />
          </button>
          <button
            type="button"
            class="slider-modal__btn"
            :class="{ active: isIndicatorActive }"
            @click="() => throttledNavigate(1)"
            @mousedown="isIndicatorActive = true"
            @mouseup="isIndicatorActive = false"
            @touchstart="
              () => {
                isIndicatorActive = true
              }
            "
            @touchend="isIndicatorActive = false"
          >
            <IconsArrowRight />
          </button>
        </div>
        <div class="slider-modal__pagination">
          <span
            v-for="(_, i) in images?.length"
            :key="i"
            class="slider-modal__pag-item"
            :class="{ 'slider-modal__pag-item--active': current === i }"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss">
.slider-modal-window {
  width: 100%;
  height: 100dvh;
  max-width: 100% !important;
  padding: 0 !important;
}

.slider-modal {
  position: relative;
  height: 100%;
  width: 100%;
}

.slider-modal__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.slider-modal__list {
  height: 100%;
  width: 100%;
  position: relative;
}

.slider-modal__item {
  width: 100%;
  height: 100%;
  will-change: transform, clip-path;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0;
  user-select: none;
  transition: opacity 0.2s ease;

  &.active {
    opacity: 1;
    z-index: 2;
  }
  &.prev {
    z-index: 1;
  }
}

.slider-modal__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.slider-modal__btns {
  position: absolute;
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  top: 50%;
  transform: translateY(-50%);
  height: fit-content;
}

.slider-modal__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.2s ease;
  outline: none;
  width: vw(60);
  height: vw(60);
  background-color: transparent;
  color: var(--basic-white);
  border-radius: 50%;

  @media (max-width: $br1) {
    display: none;
  }

  svg {
    width: vw(22);
    height: vw(22);
  }

  &.active {
    transform: scale(0.8);
  }
}

.slider-modal__pagination {
  position: absolute;
  left: 50%;
  bottom: vw(60);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: fit-content;
  z-index: 10;

  column-gap: 8px;
}

.slider-modal__pag-item {
  display: block;
  width: vw(4);
  height: vw(4);
  border-radius: 9999px;
  background-color: var(--neutral-300);
  transition:
    height 1s ease,
    width 1s ease,
    background-color 1s ease;

  @media (max-width: $br1) {
    width: 4px;
    height: 4px;
  }

  &--active {
    background-color: var(--basic-white);

    @media (min-width: $br1) {
      width: vw(16);
    }

    @media (max-width: $br1) {
      width: 16px;
    }
  }
}
</style>
