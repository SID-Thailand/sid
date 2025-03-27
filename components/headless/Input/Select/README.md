# HeadlessInputSelect Component

The `HeadlessInputSelect` component is a customizable, searchable dropdown select component that supports validation and dynamic options filtering.

## Example Usage

```vue
<script lang="ts" setup>
import type { IOption } from '~/types/headless/input'

const selectedOption = ref<IOption | null>(null)

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

const validators = [
  (value: string) => value.includes('a') || 'Value must include the letter "a"',
]

const search = ref('')

const filteredOptions = computed(() =>
  options.filter(option =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  )
)

watch(selectedOption, () => {
  search.value = selectedOption.value ? selectedOption.value.label : ''
})
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel for="select">Label</HeadlessInputLabel>
    <HeadlessInputSelect
      id="select"
      v-model="selectedOption"
      :validators="validators"
      class="select"
    >
      <HeadlessInputSelectButton class="select__button">
        <HeadlessInput
          id="select-search"
          v-model="search"
          class="select__input"
          type="text"
          placeholder="Select an option"
          autocomplete="off"
        />
        <span class="select__actions">
          <button class="select__close" @click.stop="selectedOption = null">
            <LucideX :size="16" />
          </button>
          <span>
            <LucideChevronsUpDown :size="16" />
          </span>
        </span>
      </HeadlessInputSelectButton>

      <Transition name="fade">
        <HeadlessInputSelectOptions class="select__options">
          <HeadlessInputSelectOption
            v-for="option in filteredOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            class="select__option"
          >
            {{ option.label }}
          </HeadlessInputSelectOption>
        </HeadlessInputSelectOptions>
      </Transition>
    </HeadlessInputSelect>

    <HeadlessInputValidationMessage v-if="field.error">
      {{ field.error }}
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: #bdbdbd;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    width: 100%;
    font-size: 1rem;
    color: #333;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &:focus {
      border-color: #1976d2;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }
  }

  &__options {
    position: absolute;
    z-index: 10;
    width: 100%;
    margin-top: 4px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    padding: 4px 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #bdbdbd;
      border-radius: 4px;
    }
  }

  &__option {
    padding: 8px 12px;
    font-size: 1rem;
    color: #333;
    display: block;
    width: 100%;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &[data-selected='true'] {
      background-color: #e3f2fd;
      color: #1976d2;
      font-weight: 500;
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-color: transparent;
  }

  &__actions {
    display: flex;
    margin-left: auto;
    position: relative;
    z-index: 2;
  }
}
</style>
```

## Components

### `<HeadlessInputSelect>`

The root component for the dropdown select.

---

### Props

| Prop         | Type              | Description                              |
| ------------ | ----------------- | ---------------------------------------- |
| `v-model`    | `IOption`         | Two-way binding for the selected option. |
| `validators` | `Array<Function>` | Array of validation functions.           |
| `id`         | `string`          | Unique identifier for the input field.   |

---

### `<HeadlessInputSelectButton>`

The button that triggers the dropdown.

---

### `<HeadlessInputSelectOptions>`

Wrapper for the list of options.

---

### `<HeadlessInputSelectOption>`

Represents a single option in the dropdown.

---

### `<HeadlessInputValidationMessage>`

Displays validation messages for the select input.

## Features

- **Searchable**: Users can type to filter the options in the dropdown.
- **Validation**: Supports custom validation logic.
- **Customizable**: Fully customizable styles and actions.
- **Keyboard Accessibility**: Supports navigation using the keyboard for enhanced accessibility.
