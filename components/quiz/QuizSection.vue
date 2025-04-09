<script setup lang="ts">
import type { iHomeQuiz } from '~/types/story'

interface IProps {
  content: iHomeQuiz
}

const props = defineProps<IProps>()

const steps = computed(() => {
  return [...(props.content?.quiz?.content?.steps || [])]
})

const activeIdx = ref(0)
const prevIdx = ref(0)

const next = () => {
  if (activeIdx.value < steps.value.length) {
    prevIdx.value = activeIdx.value
    activeIdx.value++
  }
}

const prev = () => {
  if (activeIdx.value > 0) {
    prevIdx.value = activeIdx.value
    activeIdx.value--
  }
}

const answers = reactiveComputed(() => {
  return steps.value?.map(step => {
    return {
      question: step?.title,
      answer: null,
    }
  })
})

const formData = reactive({
  name: '',
  email: '',
  phone: '',
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
          v-model="answers[idx].answer"
          :quiz-step="step"
          :idx="idx"
          :active-idx="activeIdx"
          :prev-idx="prevIdx"
          :size="steps?.length + 1"
          class="quiz__item"
        />
        <QuizForm
          v-model="formData"
          :idx="steps?.length"
          :active-idx="activeIdx"
          :prev-idx="prevIdx"
          :size="steps?.length + 1"
          class="quiz__item"
        />
      </div>
      <div class="quiz__btn-wrapper">
        <Button
          v-if="activeIdx > 0"
          type="button"
          class="quiz__btn"
          @click="prev"
        >
          <IconsArrowTopLeft />

          <span>{{ content?.quiz?.content?.back_button }}</span>
        </Button>
        <Button
          type="button"
          class="quiz__btn"
          :disabled="!answers[activeIdx]?.answer"
          @click="next"
        >
          <span>{{ content?.quiz?.content?.next_button }}</span>
          <IconsArrowTopRight />
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
