<script lang="ts" setup>
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

const formData = defineModel<{
  name: string
  email: string
  phone: string
}>()
</script>

<template>
  <QuizStepWrapper
    :idx="idx"
    :size="size"
    :active-idx="activeIdx"
    :prev-idx="prevIdx"
  >
    <AppForm
      v-model="formData"
      class="quiz__form"
      btn-text="SEND"
      title="fill out the form"
      @submit="onSubmit"
    />
  </QuizStepWrapper>
</template>
