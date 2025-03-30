<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

interface IProps {
  items: { url: string; alt: string }[]
  duration?: number
}

const props = withDefaults(defineProps<IProps>(), {
  duration: 22,
})

const slider = ref<HTMLElement | null>(null)
const dragIndicator = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline
let totalWidth = 0
let isDragging = false
let startX = 0
let holdTimeout: number | null = null

const createInfiniteScroll = () => {
  if (!slider.value) return

  const items = Array.from(slider.value.children) as HTMLElement[]

  totalWidth = items.reduce((acc, item) => {
    const computed = window.getComputedStyle(item)
    const marginRight = parseFloat(computed.marginRight) || 0

    return acc + item.offsetWidth + marginRight
  }, 0)

  items.forEach(item => {
    const clone = item.cloneNode(true) as HTMLElement
    slider.value?.appendChild(clone)
  })

  tl = gsap.timeline({ repeat: -1, defaults: { ease: 'linear' } })
  tl.to(slider.value, {
    x: -totalWidth,
    duration: props.duration,
    modifiers: {
      x: x => `${parseFloat(x) % -totalWidth}px`,
    },
  })
}

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  if (!slider.value) return

  isDragging = true
  startX = 'touches' in e ? e.touches[0].clientX : e.clientX
  tl.pause()
}

const handleDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging || !slider.value) return

  const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const deltaX = currentX - startX
  const progressDelta = (deltaX * 1.2) / totalWidth

  let newProgress = tl.progress() - progressDelta
  newProgress = ((newProgress % 1) + 1) % 1
  tl.progress(newProgress)
  startX = currentX
}

const handleDragEnd = () => {
  if (!slider.value) return

  isDragging = false
  tl.resume()
  gsap.to(tl, { timeScale: 1, duration: 1, ease: 'power2.out' })
}

const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  if (dragIndicator.value) {
    dragIndicator.value.style.setProperty(
      '--indicator-x',
      e.clientX - rect.left + 'px'
    )
    dragIndicator.value.style.setProperty(
      '--indicator-y',
      e.clientY - rect.top + 'px'
    )
  }
}
const showDragIndicator = () => {
  if (dragIndicator.value) dragIndicator.value.style.opacity = '1'
}
const hideDragIndicator = () => {
  if (dragIndicator.value) dragIndicator.value.style.opacity = '0'
}
const handleHoldStart = () => {
  holdTimeout = window.setTimeout(() => {
    if (dragIndicator.value) dragIndicator.value.classList.add('active')
  }, 100)
}
const handleHoldEnd = () => {
  if (holdTimeout) {
    clearTimeout(holdTimeout)
    holdTimeout = null
  }
  if (dragIndicator.value) dragIndicator.value.classList.remove('active')
}

onMounted(() => {
  createInfiniteScroll()
  slider.value?.addEventListener('mousedown', handleDragStart)
  slider.value?.addEventListener('touchstart', handleDragStart)
  window.addEventListener('mousemove', handleDragMove)
  window.addEventListener('touchmove', handleDragMove)
  window.addEventListener('mouseup', handleDragEnd)
  window.addEventListener('touchend', handleDragEnd)
})

onUnmounted(() => {
  slider.value?.removeEventListener('mousedown', handleDragStart)
  slider.value?.removeEventListener('touchstart', handleDragStart)
  window.removeEventListener('mousemove', handleDragMove)
  window.removeEventListener('touchmove', handleDragMove)
  window.removeEventListener('mouseup', handleDragEnd)
  window.removeEventListener('touchend', handleDragEnd)
})
</script>

<template>
  <div class="scrolling-slider">
    <div class="scrolling-slider__plus-wrapper">
      <LucidePlus />
      <LucidePlus />
    </div>
    <div
      class="scrolling-slider__content"
      @mousemove="handleMouseMove"
      @mouseenter="showDragIndicator"
      @mouseleave="
        () => {
          hideDragIndicator()
          handleHoldEnd()
        }
      "
      @mousedown="handleHoldStart"
      @mouseup="handleHoldEnd"
      @touchstart="handleHoldStart"
      @touchend="handleHoldEnd"
    >
      <div ref="slider" class="scrolling-slider__wrapper">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="scrolling-slider__item"
        >
          <img :src="item.url" :alt="item.alt" />
        </div>
      </div>
      <div ref="dragIndicator" class="scrolling-slider__drag">drag</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scrolling-slider {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: vw(100);
  height: vw(360);

  @media (max-width: $br1) {
    margin-top: 48px;
    height: size(360, 229);
  }

  @media (max-width: $br4) {
    height: 229px;
  }
}

.scrolling-slider__plus-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-right: vw(20);

  @media (max-width: $br1) {
    margin-right: 16px;
  }

  svg {
    display: block;
    color: var(--basic-black);
    width: vw(22);
    height: vw(22);
    @media (max-width: $br1) {
      width: 20px;
      height: 20px;
    }
  }
}

.scrolling-slider__content {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.scrolling-slider__wrapper {
  display: flex;
  width: fit-content;
  will-change: transform;
  height: 100%;
}

.scrolling-slider__item {
  width: vw(497);
  height: 100%;
  flex-shrink: 0;
  margin-right: vw(20);
  pointer-events: none;
  user-select: none;

  @media (max-width: $br1) {
    width: size(497, 343);
    margin-right: 16px;
  }

  @media (max-width: $br4) {
    width: 343px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.scrolling-slider__drag {
  position: absolute;
  pointer-events: none;
  width: vw(48);
  height: vw(48);
  border-radius: 50%;
  background-color: var(--basic-black);
  color: var(--basic-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: vw(14);
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
  opacity: 0;
  transform: scale(1);
  z-index: 1000;
  left: calc(var(--indicator-x, 0px) + vw(4));
  top: calc(var(--indicator-y, 0px) - vw(35));

  @media (max-width: $br1) {
    display: none;
  }
}

.scrolling-slider__drag {
  &.active {
    transform: scale(0.8);
  }
}
</style>
