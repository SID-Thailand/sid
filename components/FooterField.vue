<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

const input = reactive({
  id: 'subscribe-email',
  name: 'email',
  type: 'email',
  value: '',
  placeholder: 'Your email',
  required: true,
  error: true,
  validators: [Validation.email('Please enter a valid email address')],
})

// const inputValue = ref('')

const onInput = (data: iInputData) => {
  // input.value = data.value
  console.log(data)
}
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInput
      :id="input.id"
      v-model="input.value"
      :name="input.name"
      :type="input.type"
      :placeholder="input.placeholder"
      :required="input.required"
      :validators="input.validators"
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
