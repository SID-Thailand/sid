<script setup lang="ts">
import type { iImage } from '~/types/story'
import { LucidePlus } from 'lucide-vue-next'
import { delayPromise } from '@emotionagency/utils'
import { Slider } from '~/utils/InfiniteSlider'

interface IProps {
  items: iImage[]
  duration?: number
}

const props = withDefaults(defineProps<IProps>(), {
  duration: 20,
})

const el = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
const dragIndicator = ref<HTMLElement | null>(null)
const sliderKey = ref(Date.now())

let sliderInstance: Slider | null = null

const isIndicatorActive = ref(false)
const isIndicatorVisible = ref(false)

const setIndicator = (x: number, y: number) => {
  dragIndicator.value?.style.setProperty('--indicator-x', `${x}px`)
  dragIndicator.value?.style.setProperty('--indicator-y', `${y}px`)
}

onMounted(async () => {
  await delayPromise(500)

  sliderInstance = new Slider(el.value as HTMLElement, props.duration)

  sliderInstance.init()
})

onBeforeUnmount(() => {
  sliderInstance?.destroy()
})
</script>

<template>
  <div class="scrolling-slider">
    <div class="scrolling-slider__plus-wrapper">
      <LucidePlus />
      <LucidePlus />
    </div>
    <div
      ref="el"
      class="scrolling-slider__content"
      data-slider
      @mousemove="setIndicator($event.clientX, $event.clientY)"
      @mouseenter="isIndicatorVisible = true"
      @mouseleave="isIndicatorVisible = false"
      @mousedown="isIndicatorActive = true"
      @mouseup="isIndicatorActive = false"
    >
      <div
        ref="slider"
        :key="sliderKey"
        data-slider-inner
        class="scrolling-slider__wrapper"
        data-slider
      >
        <AutoScrollingSliderItem
          v-for="(item, idx) in items"
          :key="idx"
          :index="idx"
          :item="item as any"
        />
        <AutoScrollingSliderItem
          v-for="(item, idx) in items"
          :key="idx"
          :index="idx + items?.length"
          :item="item as any"
        />
      </div>

      <div
        ref="dragIndicator"
        class="scrolling-slider__drag"
        :class="{ active: isIndicatorActive, visible: isIndicatorVisible }"
      >
        drag
      </div>
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
  width: calc(100% + vw(40));

  @media (max-width: $br1) {
    margin-top: 48px;
    height: size(360, 229);
    width: calc(100% + 32px);
  }

  @media (max-width: $br4) {
    height: 229px;
    width: calc(100% + 16px);
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
  cursor: none;
}

.scrolling-slider__wrapper {
  display: flex;
  width: fit-content;
  height: 100%;
  will-change: transform;
}

.scrolling-slider__drag {
  position: fixed;
  z-index: 1000;
  width: vw(60);
  height: vw(60);
  top: calc(var(--indicator-y, 0px) - vw(30));
  left: calc(var(--indicator-x, 0px) - vw(30));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--basic-black);
  color: var(--basic-white);
  font-size: vw(10);
  text-transform: uppercase;
  pointer-events: none;
  opacity: 0;
  transform: scale(1);
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
  user-select: none;
  @include med;

  @media (max-width: $br1) {
    display: none;
  }

  &.visible {
    opacity: 1;
  }

  &.active {
    transform: scale(0.8);
  }
}
</style>
