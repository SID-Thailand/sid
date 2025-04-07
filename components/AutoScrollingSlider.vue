<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import type { iImage } from '~/types/story'
import { LucidePlus } from 'lucide-vue-next'

interface IProps {
  items: iImage[]
  duration?: number
}

const props = withDefaults(defineProps<IProps>(), {
  duration: 20,
})

const slider = ref<HTMLElement | null>(null)
const dragIndicator = ref<HTMLElement | null>(null)
const sliderKey = ref(Date.now())

let tl: gsap.core.Timeline
let totalWidth = 0
let isDragging = false
let startX = 0
let holdTimeout: number | null = null

const cloneItems = (items: HTMLElement[]) =>
  items.forEach(i => slider.value?.appendChild(i.cloneNode(true)))

const initTimeline = () => {
  if (!slider.value) return
  const items = [...slider.value.children] as HTMLElement[]
  totalWidth = items.reduce((sum, i) => {
    const style = getComputedStyle(i)
    return sum + i.offsetWidth + parseFloat(style.marginRight || '0')
  }, 0)
  cloneItems(items)
  cloneItems(items)
  tl = gsap.timeline({ repeat: -1, defaults: { ease: 'linear' } })
  tl.to(slider.value, {
    x: -totalWidth,
    duration: props.duration,
    modifiers: { x: x => `${parseFloat(x) % -totalWidth}px` },
  })
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging = true
  startX = 'touches' in e ? e.touches[0].clientX : e.clientX
  tl.pause()
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging || !slider.value) return
  const x = 'touches' in e ? e.touches[0].clientX : e.clientX
  const delta = x - startX
  const progress = (((tl.progress() - (delta * 1.2) / totalWidth) % 1) + 1) % 1
  tl.progress(progress)
  startX = x
}

const endDrag = () => {
  isDragging = false
  tl.resume()
  gsap.to(tl, { timeScale: 1, duration: 1, ease: 'power2.out' })
}

const setIndicator = (x: number, y: number, el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  dragIndicator.value?.style.setProperty('--indicator-x', `${x - rect.left}px`)
  dragIndicator.value?.style.setProperty('--indicator-y', `${y - rect.top}px`)
}

const showIndicator = () =>
  dragIndicator.value && (dragIndicator.value.style.opacity = '1')
const hideIndicator = () =>
  dragIndicator.value && (dragIndicator.value.style.opacity = '0')

const holdStart = () => {
  holdTimeout = window.setTimeout(
    () => dragIndicator.value?.classList.add('active'),
    100
  )
}
const holdEnd = () => {
  holdTimeout && clearTimeout(holdTimeout)
  dragIndicator.value?.classList.remove('active')
  holdTimeout = null
}

const onResize = () => {
  tl && tl.kill()
  sliderKey.value = Date.now()
  nextTick(() => initTimeline())
}

const debouncedResize = debounce(onResize, 300)

onMounted(() => {
  initTimeline()
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchend', endDrag)
  window.addEventListener('resize', debouncedResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('touchend', endDrag)
  window.removeEventListener('resize', debouncedResize)
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
      @mousemove="
        e => setIndicator(e.clientX, e.clientY, e.currentTarget as HTMLElement)
      "
      @mouseenter="showIndicator"
      @mouseleave="
        () => {
          hideIndicator()
          holdEnd()
        }
      "
      @mousedown="
        e => {
          startDrag(e)
          holdStart()
        }
      "
      @mouseup="holdEnd"
      @touchstart="
        e => {
          startDrag(e)
          holdStart()
        }
      "
      @touchend="holdEnd"
    >
      <div ref="slider" :key="sliderKey" class="scrolling-slider__wrapper">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="scrolling-slider__item"
        >
          <CustomImage :src="item?.filename" :alt="item?.alt" />
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
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-right: vw(20);

  @media (max-width: $br1) {
    margin-right: 16px;
  }

  svg {
    display: block;
    width: vw(22);
    height: vw(22);
    color: var(--basic-black);

    @media (max-width: $br1) {
      width: 20px;
      height: 20px;
    }
  }
}

.scrolling-slider__content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrolling-slider__wrapper {
  display: flex;
  width: fit-content;
  height: 100%;
  will-change: transform;
}

.scrolling-slider__item {
  flex-shrink: 0;
  width: vw(497);
  height: 100%;
  margin-right: vw(20);
  user-select: none;
  pointer-events: none;

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
  z-index: 1000;
  width: vw(48);
  height: vw(48);
  top: calc(var(--indicator-y, 0px) - vw(35));
  left: calc(var(--indicator-x, 0px) + vw(4));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--basic-black);
  color: var(--basic-white);
  font-size: vw(14);
  pointer-events: none;
  opacity: 0;
  transform: scale(1);
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  @media (max-width: $br1) {
    display: none;
  }

  &.active {
    transform: scale(0.8);
  }
}
</style>
