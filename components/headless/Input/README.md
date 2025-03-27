# HeadlessInput Component

The `HeadlessInput` component is a flexible, customizable input field component designed for various input types such as text, email, password, and more. It supports validation, error messages, and other essential features for building user-friendly forms.

## Example Usage

```vue
<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

const input = reactive({
  id: 'name',
  name: 'name',
  type: 'text',
  value: '',
  placeholder: 'Enter your name',
  required: true,
  error: true,
  validators: [Validation.email('Please enter a valid email address')], // Example validator
})

const onInput = (data: iInputData) => {
  console.log(data)
}
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel>{{ input.name }}</HeadlessInputLabel>
    <HeadlessInput
      :id="input.id"
      v-model="input.value"
      :name="input.name"
      :type="input.type"
      :placeholder="input.placeholder"
      :required="input.required"
      :validators="input.validators"
      class="input"
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
```

## Components

### `<HeadlessInputField>`

A wrapper component that provides context for the input field and its associated elements like label and validation message.

---

### `<HeadlessInputLabel>`

The label associated with the input field.

**Props**: None

---

### `<HeadlessInput>`

The core input component that supports various input types and validation.

**Props**:

| Prop          | Type                 | Description                                         |
| ------------- | -------------------- | --------------------------------------------------- |
| `id`          | `string`             | The unique identifier for the input field.          |
| `v-model`     | `string` or `number` | Two-way binding for the input value.                |
| `name`        | `string`             | The name attribute for the input field.             |
| `type`        | `string`             | The input type (e.g., `text`, `email`, `password`). |
| `placeholder` | `string`             | Placeholder text displayed inside the input.        |
| `required`    | `boolean`            | Indicates whether the input is required.            |
| `validators`  | `Array<Function>`    | Array of validation functions.                      |

**Events**:

| Event   | Description                           |
| ------- | ------------------------------------- |
| `input` | Emitted when the input value changes. |

---

### `<HeadlessInputValidationMessage>`

Displays validation or error messages for the input field.

**Props**: None

---

## Props and Events Summary

| Component                        | Props                                                         | Events  | Description                                     |
| -------------------------------- | ------------------------------------------------------------- | ------- | ----------------------------------------------- |
| `HeadlessInputField`             | None                                                          | None    | Provides context for input-related components.  |
| `HeadlessInputLabel`             | None                                                          | None    | The label for the input field.                  |
| `HeadlessInput`                  | `id`, `name`, `type`, `placeholder`, `required`, `validators` | `input` | The main input component.                       |
| `HeadlessInputValidationMessage` | None                                                          | None    | Displays validation messages when errors occur. |

## Example Validation

In this example, the `validators` array includes a function to validate an email:

```ts
validators: [
  (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(value) || 'Please enter a valid email address'
  },
]
```

## Styling (Optional)

You can add custom styles to the input and validation message to match your design system.

```scss
.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1976d2;
  }
}

.validation-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}
```

## Customization

You can:

- **Add more validators** to handle custom validation logic.
- **Customize the styles** for labels, inputs, and validation messages.
- **Integrate with form libraries** or handle form submission and validation manually.
