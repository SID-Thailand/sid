<script setup lang="ts">
import { gsap } from '~/libs/gsap'

interface IProps {
  idx: number
  size: number
  activeIdx: number
  prevIdx: number
  title?: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['animating'])

const itemRef = ref<HTMLElement | null>(null)

const isAnimating = ref(false)

const distanceFromActive = computed(() => {
  const distance = Math.abs(props.activeIdx - props.idx)
  return distance
})

const background = computed(() => {
  if (props.activeIdx === props.idx) {
    return 'var(--gradient-secondary)'
  }

  return '#57534C'
})

const animate = async () => {
  const el = itemRef.value
  if (!el) return

  isAnimating.value = true

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating.value = false
    },
  })
  const isActive = props.activeIdx === props.idx
  const wasActive = props.prevIdx === props.idx
  const distance = distanceFromActive.value

  const zBase = 20
  const targetScale = 1 - distance * 0.07

  const duration = 1

  if (isActive) {
    el.style.zIndex = `${zBase}`

    tl.fromTo(
      el,
      {
        y: '100%',
        scale: targetScale,
      },
      {
        duration,
        y: 0,
        scale: 1,
        ease: 'power2.out',
      }
    )
  } else if (wasActive) {
    el.style.zIndex = `${zBase - 1}`

    const newDistance = Math.abs(props.activeIdx - props.idx)
    const newScale = 1 - newDistance * 0.07
    const newY = -newDistance * 20

    tl.to(el, {
      duration,
      y: newY,
      scale: newScale,
      ease: 'power2.out',
      onComplete: () => {
        el.style.zIndex = `${zBase - newDistance - 2}`
      },
    })
  } else {
    el.style.zIndex = `${zBase - distance - 2}`

    tl.to(el, {
      duration,
      y: -distance * 20,
      scale: targetScale,
      ease: 'power2.out',
    })
  }
}

watch(
  () => props.activeIdx,
  () => {
    animate()
  }
)

watch(isAnimating, val => {
  emit('animating', val)
})

onMounted(() => {
  animate()
})
</script>

<template>
  <div
    ref="itemRef"
    class="quiz-step"
    :style="{
      background,
      visibility: distanceFromActive <= 2 ? 'visible' : 'hidden',
      boxShadow:
        distanceFromActive >= 1 ? `0 0 20px 0 rgba(0, 0, 0, 0.3)` : 'none',
    }"
  >
    <div class="quiz-step__wrapper">
      <div class="quiz-step__content">
        <p class="quiz-step__count">
          <span>{{ idx + 1 }}</span
          >/<span>{{ size }}</span>
        </p>
        <h3 class="quiz-step__quiz-name">
          {{ title }}
        </h3>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz-step {
  inset: 0;
  height: 100%;
  border-radius: vw(20) vw(20) 0 0;
  padding: vw(60) vw(50);
  position: absolute;
  background: var(--gradient-secondary);
  transform-origin: top;
  will-change: transform, opacity;

  &:first-child {
    position: relative;
    height: fit-content;
  }

  @media (max-width: $br1) {
    border-radius: 20px 20px 0 0;
    padding: 25px;
  }

  @media (max-width: $br3) {
    transform-origin: center 20%;
  }
}

.quiz-step__wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.quiz-step__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz-step__count {
  color: var(--neutral-200);
  text-align: center;
  @include subheading-h3;
  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.quiz-step__quiz-name {
  font-size: vw(40);
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
  margin-top: vw(18);
  max-width: vw(580);
  @include med;

  @media (max-width: $br1) {
    margin-top: 4px;
    max-width: none;
    font-size: size(40, 16);
  }

  @media (max-width: $br4) {
    font-size: 16px;
  }
}
</style>
