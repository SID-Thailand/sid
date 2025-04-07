<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

type ValidatorFn = (value: string) => string | false

interface iProps {
  id: string
  name: string
  type: string
  value: string
  placeholder: string
  required: boolean
  error: boolean
  validators: ValidatorFn[]
}

defineProps<iProps>()

// const inputValue = ref('')

const onInput = (data: iInputData) => {
  // input.value = data.value
  console.log(data)
}
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInput
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :validators="validators"
      @input="onInput"
    />
    <HeadlessInputValidationMessage
      v-if="field.error"
      class="validation-message"
    >
      {{ field.error }}
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>

<style scoped lang="scss">
.validation-message {
  @include caption-c3;
}
</style>
