<script setup lang="ts">
import { resize } from '@emotionagency/utils'
import type { IForm } from '~/types/form'
import type { iHomeQuiz } from '~/types/homeTypes'

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
  return {
    value: steps.value?.map(step => {
      return {
        question: step?.title,
        answer: null,
      }
    }),
  }
})

const initialFormValue = {
  name: {
    value: '',
    error: true,
  },
  email: {
    value: '',
    error: true,
  },
  phone: {
    value: '',
    error: true,
  },
}

const formData = reactive<IForm>(deepClone(initialFormValue))

const hasError = computed(() => {
  return (
    formData?.name?.error || formData?.email?.error || formData?.phone?.error
  )
})

const isShowThankYou = ref(false)
const onSubmit = () => {
  console.log(answers.value, formData)

  if (hasError.value) {
    return
  }

  isShowThankYou.value = true

  formData.name = initialFormValue.name
  formData.email = initialFormValue.email
  formData.phone = initialFormValue.phone

  answers.value = steps.value?.map(step => {
    return {
      question: step?.title,
      answer: null,
    }
  })

  setTimeout(() => {
    activeIdx.value = 0
    prevIdx.value = 0
  }, 4000)

  setTimeout(() => {
    isShowThankYou.value = false
  }, 4000)
}

const elRef = ref<HTMLElement | null>(null)
const elHeight = ref('0')

const getHeight = () => {
  const $quizStep = elRef.value?.querySelector('.quiz-step')

  const height = $quizStep?.scrollHeight + 'px'
  elHeight.value = height
}

onMounted(() => {
  resize.on(getHeight)
})

onBeforeUnmount(() => {
  resize.off(getHeight)
})
</script>

<template>
  <section ref="elRef" class="quiz">
    <div class="quiz__wrapper">
      <h2 class="quiz__title">{{ content?.quiz?.content?.title }}</h2>
      <div
        class="quiz__step-tab"
        :style="{
          '--height': `${elHeight}`,
        }"
      >
        <QuizStep
          v-for="(step, idx) in steps"
          :key="idx"
          v-model="answers.value[idx].answer"
          :quiz-step="step"
          :idx="idx"
          :active-idx="activeIdx"
          :prev-idx="prevIdx"
          :size="steps?.length + 1"
          class="quiz__item"
        />
        <QuizForm
          v-model="formData"
          :idx="steps.length"
          :active-idx="activeIdx"
          :prev-idx="prevIdx"
          :size="steps?.length + 1"
          :title="content?.quiz?.content?.form_title"
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
          v-if="activeIdx === steps.length"
          type="button"
          class="quiz__btn"
          :disabled="hasError"
          @click="onSubmit"
        >
          <span>{{ content?.quiz?.content?.send_button }}</span>

          <IconsArrowTopRight />
        </Button>
        <Button
          v-else
          type="button"
          class="quiz__btn"
          :disabled="!answers.value[activeIdx]?.answer"
          @click="next"
        >
          <span>{{ content?.quiz?.content?.next_button }}</span>
          <IconsArrowTopRight />
        </Button>
      </div>
    </div>
    <ModalsApproveSlideModal :is-open="isShowThankYou" />
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
  gap: vw(20);
}

.quiz__title {
  text-align: center;
  font-size: vw(68);
  line-height: 1em;
  text-transform: uppercase;
  color: var(--neutral-200);
  @include med;

  @media (max-width: $br1) {
    font-size: size(68, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.quiz__step-tab {
  position: relative;
  width: 100%;
  margin-top: vw(100);

  height: var(--height);

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
  z-index: 50;

  @media (max-width: $br1) {
    gap: 16px;
  }
}
</style>
