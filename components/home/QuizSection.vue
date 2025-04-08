<script setup lang="ts">
import { LucideArrowUpLeft, LucideArrowUpRight } from 'lucide-vue-next'

import type { iHomeQuiz } from '~/types/story'

interface IProps {
  content: iHomeQuiz
}

const props = defineProps<IProps>()

const steps = computed(() => {
  return [
    ...(props.content?.quiz?.content?.steps || []),
    {
      component: 'final_step',
      title: 'fill out the form',
      btnText: 'Send',
    },
  ]
})
</script>

<template>
  <section class="quiz">
    <div class="quiz__wrapper">
      <h2 class="quiz__title">{{ content?.quiz?.content?.title }}</h2>
      <div class="quiz__step-tab">
        <QuizStep
          v-for="(step, idx) in steps"
          :key="idx"
          :quiz-step="step"
          class="quiz__item"
        />
      </div>
      <div class="quiz__btn-wrapper">
        <Button type="button" class="quiz__btn">
          <LucideArrowUpLeft />
          {{ content?.quiz?.content?.back_button }}
        </Button>
        <Button type="button" class="quiz__btn">
          {{ content?.quiz?.content?.next_button }}
          <LucideArrowUpRight />
        </Button>
      </div>
    </div>
    <!-- <ApproveSlideModal /> -->
  </section>
</template>

<style scoped lang="scss">
.quiz {
  position: relative;
  padding: vw(100);
  background-color: var(--basic-black);

  @media (max-width: $br1) {
    padding: 60px 16px;
  }
}

.quiz__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz__title {
  text-align: center;
  font-size: vw(80);
  line-height: 1em;
  text-transform: uppercase;
  color: var(--neutral-200);
  @include med;

  @media (max-width: $br1) {
    font-size: size(80, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.quiz__step-tab {
  position: relative;
  width: 100%;
  margin-top: vw(100);

  @media (max-width: $br1) {
    margin-top: 64px;
  }
}

.quiz__btn-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: vw(24);

  @media (max-width: $br1) {
    gap: 16px;
  }
}
</style>
