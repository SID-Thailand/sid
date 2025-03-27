# Headless Radio Component

This component provides a headless radio input. It's based on the same logic as the checkbox component, but it's designed for single-option selection within a group. It supports reactive data binding and emits events for changes in state.

## Features

- Binds to a `v-model` for two-way data binding.
- Supports focus, blur, and change events for better UX handling.
- Emits validation states and custom error messages.
- Accessible, with proper `aria` attributes for screen readers.

## Usage

### Script Setup

```vue
<script lang="ts" setup>
import { useCheckbox } from '~/composables/headless/checkbox'
import type { ICheckbox, TCheckboxEmits } from '~/types/headless/input'

const props = defineProps<ICheckbox>() // Define props for the radio button

const emit = defineEmits<TCheckboxEmits>() // Define emits for change events

const model = defineModel<boolean>() // Define the model for two-way binding

const { $input, error, onBlur, onChange, onFocus, isFocused } = useCheckbox(
  props,
  emit,
  model
)
</script>
```

### Template

```vue
<template>
  <input
    :id="id" // Bind the id for the radio button
    ref="$input" // Reference to the input element
    v-model="model" // Bind the model for two-way data binding
    type="radio" // Define the input type as radio
    data-radio
    :name="name" // The name attribute for the radio group
    :required="required" // Mark field as required
    :data-focused="isFocused" // Track whether the input is focused
    :value="name" // The value to be submitted when selected
    :disabled="disabled" // Disable the radio button if needed
    :autofocus="autoFocus" // Automatically focus the radio button when rendered
    :aria-invalid="error" // ARIA attribute for invalid state
    @focus="onFocus" // Handle focus event
    @blur="onBlur" // Handle blur event
    @change="onChange" // Handle change event
  />
</template>
```

## Props

| Prop        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| `id`        | `string`  | The `id` of the radio button.                     |
| `name`      | `string`  | The `name` of the radio button group.             |
| `required`  | `boolean` | Marks the field as required.                      |
| `disabled`  | `boolean` | Disables the radio button.                        |
| `autoFocus` | `boolean` | Focus the radio button on mount.                  |
| `value`     | `string`  | The value sent when the radio button is selected. |
| `error`     | `boolean` | Indicates if there's a validation error.          |

## Events

| Event               | Description                                  |
| ------------------- | -------------------------------------------- |
| `update:modelValue` | Emits when the radio button's value changes. |

## Styles

```vue
<style lang="scss" scoped>
input[type='radio'] {
  appearance: none;
  border-radius: 50%;
  border: 2px solid #ced4da;
  width: 16px;
  height: 16px;
  cursor: pointer;
  outline: none;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background-color: #1976d2;
    border-color: #1976d2;
  }

  &:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    transition: all 0.2s ease;
  }

  &:checked::before {
    background-color: white;
  }
}
</style>
```

## Customization

- You can modify the styles to match the design requirements, such as changing the size of the radio button or adding custom hover/focus states.
- To customize the appearance of the checked state, use the `&:checked` pseudo-class to alter the styles when the radio button is selected.
