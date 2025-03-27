# HeadlessInputPassword Component

The `HeadlessInputPassword` component is a customizable password input field that includes built-in validation and a toggle button to show or hide the password. It's designed to provide a secure and user-friendly experience.

## Example Usage

```vue
<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

const input = reactive({
  id: 'password',
  name: 'password',
  value: '',
  placeholder: 'Enter your password',
  required: true,
  error: true,
  validators: [Validation.min(6, 'At least 6 characters')], // Example validator
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
        v-model="input.value"
        :placeholder="input.placeholder"
        :required="input.required"
        :validators="input.validators"
        class="input"
        @input="onInput"
      />
      <button
        @click="isPasswordVisible = !isPasswordVisible"
        aria-label="Toggle password visibility"
      >
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
  display: flex;
  align-items: center;
}

button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## Components

### `<HeadlessInputPassword>`

A password input component with built-in visibility toggle functionality.

---

### Props

| Prop                  | Type              | Description                                             |
| --------------------- | ----------------- | ------------------------------------------------------- |
| `id`                  | `string`          | The unique identifier for the input field.              |
| `v-model`             | `string`          | Two-way binding for the password input value.           |
| `name`                | `string`          | The name attribute for the input field.                 |
| `placeholder`         | `string`          | Placeholder text displayed inside the input.            |
| `required`            | `boolean`         | Indicates if the input is required.                     |
| `validators`          | `Array<Function>` | Array of validation functions.                          |
| `is-password-visible` | `boolean`         | Determines if the password should be visible or hidden. |

---

### Events

| Event   | Description                              |
| ------- | ---------------------------------------- |
| `input` | Emitted when the password value changes. |

---

### `<HeadlessInputField>`

A wrapper component that provides the context for the input field, label, and validation message.

---

### `<HeadlessInputLabel>`

The label associated with the input field.

---

### `<HeadlessInputValidationMessage>`

Displays validation or error messages for the input field.

---

## Features

- **Password Visibility Toggle**: Users can toggle password visibility using a button.
- **Validation**: Supports custom validators for password strength or other rules.
- **Customizable**: Easy to style and integrate into different forms and layouts.

---

## Example Validator

In this example, the `validators` array includes a function to validate the minimum length:

```ts
validators: [(value: string) => value.length >= 6 || 'At least 6 characters']
```

---

## Accessibility

- The toggle button has an `aria-label` to ensure accessibility for screen readers.
