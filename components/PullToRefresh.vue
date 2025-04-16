<script setup lang="ts">
import type { IEventArgs } from '@emotionagency/emotion-scroll/dist/EmotionScroll/types'
import gsap from 'gsap'
import { clamp } from 'gsap/gsap-core'
import { ArrowDown } from 'lucide-vue-next'

interface IProps {
  threshold?: number
  paused?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  threshold: 150,
  paused: false,
})

const isPulling = ref(false)
const pullDistance = ref(0)
let startY = 0
let isTouching = false

const MIN_HEIGHT = 100
const MIN_PULL = 10

const onTouchStart = (event: TouchEvent) => {
  if (props.paused || window.scrollY) return
  isTouching = true
  startY = event.touches[0].screenY
}

const onTouchMove = (event: TouchEvent) => {
  if (!isTouching || props.paused) return

  const currentY = event.touches[0].screenY
  pullDistance.value = currentY - startY

  if (event.cancelable && pullDistance.value > MIN_PULL) {
    event.preventDefault()
  }

  if (pullDistance.value > props.threshold) {
    isPulling.value = true
  } else {
    isPulling.value = false
  }
}

const onTouchEnd = () => {
  if (!isTouching || props.paused) return
  isTouching = false

  if (isPulling.value) {
    gsap.to(pullDistance, {
      value: MIN_HEIGHT,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        location.reload()
      },
    })
  } else {
    pullDistance.value = 0
  }
}

const onScroll = (e: IEventArgs) => {
  console.log(e.position)
  document.body.classList.toggle('should-ptr', e.position < 50)
}

watch(pullDistance, value => {
  if (!import.meta.client) return
  if (pullDistance.value > MIN_PULL) {
    document.body.style.top = clamp(0, value, props.threshold) + 'px'
  } else {
    document.body.style.top = ''
  }
})

onMounted(async () => {
  window.addEventListener('touchstart', onTouchStart)
  window.addEventListener('touchmove', onTouchMove, {
    passive: false,
  })
  window.addEventListener('touchend', onTouchEnd)

  await nextTick()
  window.escroll.on(onScroll)
})

onUnmounted(() => {
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        class="pull-to-refresh"
        :style="{
          height: `${pullDistance > MIN_PULL ? pullDistance : 0}px`,
          maxHeight: `${props.threshold}px`,
        }"
      >
        <div v-if="!paused" class="refresh-indicator">
          <Loader v-if="isPulling" />
          <ArrowDown v-else />
          <span v-if="isPulling">Release to refresh...</span>
          <span v-else>Pull down to refresh</span>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.pull-to-refresh {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  right: 0;
  height: 0;
  pointer-events: none;
  box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.05);
  z-index: -1;
}

.refresh-indicator {
  text-align: center;
  background: var(--bg);
  overflow: hidden;
  height: 100%;
  color: #666;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;
}
</style>
