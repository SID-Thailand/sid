<script setup lang="ts">
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

const activeIdx = ref(0)

const next = () => {
  if (activeIdx.value < steps.value.length - 1) {
    activeIdx.value++
  }
}

const prev = () => {
  if (activeIdx.value > 0) {
    activeIdx.value--
  }
}

watch(activeIdx, () => {
  console.log(activeIdx.value)
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
          :idx="idx"
          :active-idx="activeIdx"
          :size="steps?.length"
          class="quiz__item"
        />
      </div>
      <div class="quiz__btn-wrapper">
        <Button type="button" class="quiz__btn" @click="prev">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.469 3.52659L4.67422 3.51869L4.67285 3.51732L4.67147 3.51869L3.49327 3.51791L3.50186 16.4913L5.16963 16.4924L5.16293 6.36442L15.8685 17.07L17.047 15.8915L6.34319 5.18766L16.4701 5.19436L16.469 3.52659Z"
              fill="#46361C"
            />
          </svg>

          {{ content?.quiz?.content?.back_button }}
        </Button>
        <Button type="button" class="quiz__btn" @click="next">
          {{ content?.quiz?.content?.next_button }}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.53102 3.52659L15.3258 3.51869L15.3272 3.51732L15.3285 3.51869L16.5067 3.51791L16.4981 16.4913L14.8304 16.4924L14.8371 6.36442L4.13151 17.07L2.953 15.8915L13.6568 5.18766L3.52992 5.19436L3.53102 3.52659Z"
              fill="#46361C"
            />
          </svg>
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
