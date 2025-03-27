<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

const input = reactive({
  id: 'password',
  name: 'password',
  value: '',
  placeholder: 'Enter your password',
  required: true,
  error: true,
  validators: [Validation.min(6, 'At least 6 characters')],
})

const onInput = (data: iInputData) => {
  input.value = data.value
}

const isPasswordVisible = ref(false)
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel>{{ input.name }}</HeadlessInputLabel>
    <div class="input-wrapper">
      <HeadlessInputPassword
        :id="input.id"
        :is-password-visible="isPasswordVisible"
        :name="input.name"
        :value="input.value"
        :placeholder="input.placeholder"
        :required="input.required"
        :validators="input.validators"
        class="input"
        @input="onInput"
      />
      <button @click="isPasswordVisible = !isPasswordVisible">
        <LucideEyeOff v-if="isPasswordVisible" :size="16" />
        <LucideEye v-else :size="16" />
      </button>
    </div>
    <HeadlessInputValidationMessage v-if="field.error">
      {{ field.error }}
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>

<style scoped>
.input-wrapper {
  position: relative;
}
button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}
</style>
