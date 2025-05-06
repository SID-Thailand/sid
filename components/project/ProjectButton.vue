<script setup lang="ts">
import type { IEventArgs } from '@emotionagency/emotion-scroll'
import { delayPromise } from '@emotionagency/utils'

const isVisible = ref(false)
const swipeDownCount = ref(0)
const startY = ref(0)

const isDesktop = () => window.innerWidth > 860

const onTouchStart = (e: TouchEvent) => {
  startY.value = e.touches[0].clientY
}

const onTouchEnd = (e: TouchEvent) => {
  const deltaY = e.changedTouches[0].clientY - startY.value

  if (deltaY > 50) {
    isVisible.value = swipeDownCount.value++ >= 2
  } else if (deltaY < -50) {
    swipeDownCount.value = 0
    isVisible.value = false
  }
}

const setupDesktopScroll = () => {
  window.escroll?.on?.(async (e: IEventArgs) => {
    !isVisible.value && (await delayPromise(1000))

    isVisible.value = e.direction === -1
  })
}

onMounted(() => {
  if (isDesktop()) setupDesktopScroll()

  window.addEventListener('touchstart', onTouchStart)
  window.addEventListener('touchend', onTouchEnd)
})

onBeforeUnmount(() => {
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <Button
    type="button"
    class="project-w-btn"
    :class="{
      'project-w-btn--visible': isVisible,
    }"
  >
    <span>WHATSAPP</span>
    <IconsPlus />
  </Button>
</template>

<style scoped lang="scss">
.project-w-btn {
  position: fixed !important;
  bottom: vw(45);
  left: 50%;
  transform: translate(-50%, calc(100% + vw(48)));
  z-index: 10;
  transition: 1s cubic-bezier(0.15, 0.9, 0.34, 0.95);
  transition-property: transform;

  @media (max-width: $br1) {
    transform: translate(-50%, calc(100% + 30px));
    bottom: 28px;
  }

  &--visible {
    transform: translate(-50%, 0);
  }

  svg {
    display: block;
    width: vw(18);
    height: vw(18);

    @media (max-width: $br1) {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
