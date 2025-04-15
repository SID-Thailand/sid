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
    :title="quizStep?.title"
  >
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
.quiz-step__list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: vw(56);
  grid-auto-flow: row;
  justify-items: center;
  margin-top: vw(60);

  @media (max-width: $br1) {
    margin-top: 40px;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    row-gap: 40px;
  }
}
</style>
