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

const direction = computed(() => {
  return props.activeIdx > props.prevIdx ? 'forward' : 'reverse'
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
  const isPrev = props.prevIdx === props.idx

  const distance = distanceFromActive.value

  const zBase = 20
  const targetScale = 0.93

  const duration = 1.5

  const distancePrev = distance - 1
  const isForward = direction.value === 'forward'

  if (isActive) {
    tl.set(el, { zIndex: 30, opacity: 1 })
    tl.fromTo(
      el,
      {
        scale: targetScale,
        yPercent: 100,
      },
      {
        duration,
        scale: 1,
        yPercent: 0,

        ease: 'power2.out',
      }
    )
  } else {
    let zIndex = zBase

    if (isForward && isPrev) {
      zIndex = zBase - distancePrev
    } else {
      zIndex = zBase - distance
    }

    tl.set(el, { zIndex, opacity: 1 })

    tl.fromTo(
      el,
      {
        scale: 1 - distancePrev * 0.07,
        yPercent: -3 * distance - 1,
      },
      {
        duration,
        scale: 1 - distance * 0.07,
        yPercent: -3 * distance,
        ease: 'power2.out',
      }
    )

    if (distance > 2) {
      tl.to(
        el,
        {
          opacity: 0,
          duration: duration / 3,
        },
        0
      )
    }
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
    :class="{
      'quiz-step--active': props.activeIdx === props.idx,
    }"
    :style="{
      boxShadow:
        distanceFromActive >= 1 ? `0 0 20px 0 rgba(0, 0, 0, 0.3)` : 'none',
    }"
  >
    <div class="quiz-step__overlay" />
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
  overflow: hidden;
  will-change: transform, opacity, box-shadow;
  transition: box-shadow 1.5s ease;
  &:not(&--active) {
    .quiz-step__overlay {
      opacity: 1;
      transition: opacity 1.5s ease;
    }
  }

  &:first-child {
    position: relative;
    height: fit-content;
  }

  @media (max-width: $br1) {
    border-radius: 20px 20px 0 0;
    padding: 25px;
  }

  @media (max-width: $br3) {
    transform-origin: center 15%;
  }
}

.quiz-step__overlay {
  position: absolute;
  inset: 0;
  background: #57534c;
  pointer-events: none;
  opacity: 0;
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
