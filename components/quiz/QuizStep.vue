<script setup lang="ts">
import type { iQuizStep } from '~/types/story'

interface IProps {
  quizStep: iQuizStep
  idx: number
  size: number
  activeIdx: number
  prevIdx: number
}

defineProps<IProps>()

const answer = defineModel<string | null>()
</script>

<template>
  <QuizStepWrapper
    :idx="idx"
    :size="size"
    :active-idx="activeIdx"
    :prev-idx="prevIdx"
  >
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
        v-model="answer"
        :is-active="answer === step?.label"
        :item="step"
      />
    </ul>
  </QuizStepWrapper>
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
