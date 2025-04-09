<script setup lang="ts">
import gsap from 'gsap'
import type { iQuizStep } from '~/types/story'

interface IProps {
  quizStep: iQuizStep
  idx: number
  size: number
  activeIdx: number
  prevIdx: number
}

const props = defineProps<IProps>()

const itemRef = ref<HTMLElement | null>(null)

const onSubmit = data => {
  console.log(data)
}

const distanceFromActive = computed(() => {
  const distance = Math.abs(props.activeIdx - props.idx)
  return distance
})

const background = computed(() => {
  if (props.activeIdx === props.idx) {
    return 'var(--gradient-secondary)'
  }

  if (distanceFromActive.value === 2) {
    return 'var(--accent-quaternary)'
  }

  return 'var(--accent-tertiary)'
})

const animate = async () => {
  const el = itemRef.value
  if (!el) return

  const tl = gsap.timeline()
  const isActive = props.activeIdx === props.idx
  const wasActive = props.prevIdx === props.idx
  const distance = distanceFromActive.value

  const zBase = 20
  const targetScale = 1 - distance * 0.07

  if (isActive) {
    el.style.zIndex = `${zBase}`

    tl.fromTo(
      el,
      {
        y: props.activeIdx > props.prevIdx ? '100%' : '-100%',
        scale: targetScale,
      },
      {
        duration: 0.5,
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
      duration: 0.5,
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
      duration: 0.5,
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

onMounted(() => {
  animate()
})

const activeRadio = ref(null)
</script>

<template>
  <div
    v-show="distanceFromActive <= 2"
    ref="itemRef"
    class="quiz-step"
    :style="{
      position: activeIdx === idx ? 'relative' : 'absolute',
      background,
    }"
  >
    <div class="quiz-step__wrapper">
      <div
        v-if="quizStep.component === 'final_step'"
        class="quiz-step__content"
      >
        <AppForm
          class="quiz__form"
          btn-text="SEND"
          title="fill out the form"
          @submit="onSubmit"
        />
      </div>

      <div v-else class="quiz-step__content">
        <p class="quiz-step__count">
          <span>{{ idx + 1 }}</span
          >/<span>{{ size }}</span>
        </p>
        <h3 class="quiz-step__quiz-name">
          {{ quizStep?.title }}
        </h3>
        <ul class="quiz-step__list">
          <QuizRadio
            v-for="(step, index) in quizStep?.items"
            :key="index"
            v-model="activeRadio"
            :is-active="activeRadio === step?.label"
            :item="step"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz-step {
  position: relative;
  inset: 0;
  height: 100%;
  border-radius: vw(20) vw(20) 0 0;
  padding: vw(60) vw(50);

  position: absolute;

  background: var(--gradient-secondary);
  transform-origin: top;

  @media (max-width: $br1) {
    border-radius: 20px 20px 0 0;
    padding: 50px 25px;
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
}

.quiz-step__quiz-name {
  font-size: vw(40);
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
  margin-top: vw(12);
  max-width: vw(580);
  @include med;

  @media (max-width: $br1) {
    margin-top: 12px;
    font-size: size(40, 24);
  }

  @media (max-width: $br4) {
    font-size: 24px;
  }
}

.quiz-step__list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: vw(56);
  grid-auto-flow: row;
  justify-items: center;
  margin-top: vw(20);

  @media (max-width: $br1) {
    margin-top: 40px;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>
