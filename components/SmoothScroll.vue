<script setup lang="ts">
import EmotionScroll from '@emotionagency/emotion-scroll'
import { resize } from '@emotionagency/utils'
import { ScrollTrigger } from '~/libs/gsap'

const breakpoint = 1024

const onResize = () => {
  window.escroll?.destroy()

  let friction = 0.05
  let stepSize = 0.5

  if (window.innerWidth <= breakpoint) {
    friction = 0.07
    stepSize = 0.9
  }

  window.escroll = new EmotionScroll({
    el: document.querySelector('#scroll-container'),
    passive: false,
    friction,
    preventTouch: false,
    stepSize,
    scrollbar: true,
    autoRaf: false,
  })

  window.escroll.on(ScrollTrigger.update)
}

onMounted(() => {
  document.querySelector('#scroll-container').scrollTop = 0

  resize.match(`<${breakpoint}px`, onResize)
  resize.match(`>${breakpoint}px`, onResize)
})

onBeforeUnmount(() => {
  resize.off(onResize)
  window.escroll && window.escroll.destroy()
})
</script>

<template>
  <div id="scroll-container">
    <slot />
  </div>
</template>

<style lang="scss">
#scroll-container {
  overflow: hidden;
  height: 100vh;
  height: 100svh;

  will-change: scroll-position;
  position: relative;
  @media (max-width: $br1) {
    overflow-y: hidden;
    overflow-x: hidden;
  }
}

* {
  overflow-anchor: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000000 !important;
  height: 100%;
  width: 12px;
  user-select: none;
  overflow: hidden;
  padding: 2px;
  padding-left: 0px;
  @media (min-width: $br2) {
    &:hover {
      .scrollbar__thumb {
        width: 10px;
        opacity: 0.7;
        border-radius: 10px;
        background: var(--accent-primary);
      }
    }
  }
  &.hidden {
    display: none;
  }
  // @include media('<=1024px') {
  //   display: none;
  // }
}

.scrollbar__thumb {
  width: 6px;
  border-radius: 7px;
  pointer-events: none;
  height: 100px;
  min-height: 40px;
  background: #6b6b6b;
  display: block;
  position: relative;
  user-select: none;
  transition:
    width 0.2s ease,
    opacity 0.3s ease,
    border-radius 0.3s ease,
    background 0.3s ease;
  right: 0;
  opacity: 0;
  float: right;
  &.scrolling {
    opacity: 0.7;
  }
  &.active {
    width: 10px;
    opacity: 0.7;
    border-radius: 10px;
    background: var(--accent-primary);
  }
}
</style>
