<script lang="ts" setup>
import type { IForm } from '~/types/form'

interface IProps {
  idx: number
  size: number
  activeIdx: number
  prevIdx: number
}

defineProps<IProps>()

const onSubmit = (data: any) => {
  console.log(data)
}

const formData = defineModel<IForm>()
</script>

<template>
  <QuizStepWrapper
    :idx="idx"
    :size="size"
    :active-idx="activeIdx"
    :prev-idx="prevIdx"
    :title="'Fill out the form'"
  >
    <AppForm
      v-model="formData"
      form-id="feedback"
      class="quiz__form"
      :show-button="false"
      @submit="onSubmit"
    />
  </QuizStepWrapper>
</template>

<style scoped lang="scss">
.quiz__form {
  @media (min-width: $br1) {
    max-width: vw(543);
  }
}
</style>
