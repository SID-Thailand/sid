# Headless Textarea Component

This component provides a customizable and accessible textarea input for collecting multi-line user input. It supports validation, placeholder text, and error messages.

## Features

- Binds to a `v-model` for two-way data binding.
- Placeholder support for guidance.
- Validation with custom error messages.
- Optional resizing control to disable the textarea's resize functionality.

## Usage

### Script Setup

```vue
<script lang="ts" setup>
const input = reactive({
  id: 'name', // Textarea id
  name: 'name', // Textarea name
  type: 'text', // Type of input (for clarity, but not directly affecting textarea)
  value: '', // Bound input value
  placeholder: 'Enter your name', // Placeholder text
  required: true, // Mark field as required
  error: true, // Error state
  validators: [Validation.email('Please enter a valid email address')], // Validators to use
})
</script>
```

### Template

```vue
<template>
  <HeadlessInputTextarea
    :id="input.id" // Bind id to textarea
    v-model="input.value" // Bind value for two-way data binding
    :name="input.name" // Bind name to textarea
    :value="input.value" // Bound value for the textarea
    :placeholder="input.placeholder" // Placeholder text
    :required="input.required" // Required field
    :validators="input.validators" // Validators for input
    :disable-resize="true" // Disable resize functionality for the textarea
    type="textarea" // Explicitly define textarea type
    class="input" // CSS class for styling
  />
</template>
```

## Props

| Prop             | Type      | Description                                 |
| ---------------- | --------- | ------------------------------------------- |
| `id`             | `string`  | The `id` of the textarea.                   |
| `name`           | `string`  | The `name` of the textarea.                 |
| `value`          | `string`  | The bound value of the textarea.            |
| `placeholder`    | `string`  | Placeholder text for the textarea.          |
| `required`       | `boolean` | Marks the field as required.                |
| `validators`     | `array`   | An array of validators for the input field. |
| `disable-resize` | `boolean` | Disables resizing of the textarea.          |
| `type`           | `string`  | Type of the input (should be `textarea`).   |

## Events

| Event               | Description                         |
| ------------------- | ----------------------------------- |
| `update:modelValue` | Emits when the input value changes. |

## Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| `default` | Default slot for custom content. |

## Styles

```vue
<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
  font-size: 1rem;
  line-height: 1.5;
  resize: none; // Prevent resizing

  &:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }

  &.error {
    border-color: #f44336;
  }

  &::placeholder {
    color: #bdbdbd;
  }
}
</style>
```

## Customization

You can customize this component by adjusting the CSS for the `input` class or by modifying the `HeadlessInputTextarea` component. For example, you can set `resize: none` in your styles to prevent the textarea from being resized by the user.
