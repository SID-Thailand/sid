# HeadlessInputCheckbox Component

The `HeadlessInputCheckbox` component is a customizable, accessible, and headless checkbox input for Vue 3 applications. It is designed to provide a flexible foundation for creating fully styled checkboxes with validation and labels.

## Example Usage

```vue
<script lang="ts" setup>
const checked = ref(false)
</script>

<template>
  <HeadlessInputField v-slot="field" class="checkbox-field">
    <HeadlessInputLabel class="checkbox-label">
      <div class="checkbox-wrapper">
        <HeadlessInputCheckbox
          id="checkbox"
          v-model="checked"
          name="checkbox"
          class="checkbox"
          :required="true"
        />

        <LucideCheck :size="16" class="checkbox-icon" />
      </div>

      Checkbox
    </HeadlessInputLabel>

    <HeadlessInputValidationMessage v-if="field.error">
      This field is required
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>
```

## Components

### `<HeadlessInputField>`

A wrapper component that provides the context for the input field, label, and validation message.

**Slots**:

- `field`: An object containing field state, such as `error`.

---

### `<HeadlessInputLabel>`

A label component that associates with the checkbox input.

**Props**:

| Prop  | Type     | Default     | Description                                                  |
| ----- | -------- | ----------- | ------------------------------------------------------------ |
| `for` | `string` | `undefined` | Associates the label with the checkbox input using its `id`. |

**Slots**:

- Default slot for the label content.

---

### `<HeadlessInputCheckbox>`

The main checkbox input component.

**Props**:

| Prop       | Type      | Default | Description                                         |
| ---------- | --------- | ------- | --------------------------------------------------- |
| `v-model`  | `boolean` | `false` | Binds the checkbox state.                           |
| `id`       | `string`  | `null`  | Unique identifier for the checkbox.                 |
| `name`     | `string`  | `null`  | Name attribute for the checkbox input.              |
| `required` | `boolean` | `false` | Marks the checkbox as required for form validation. |

---

### `<HeadlessInputValidationMessage>`

A component that displays validation messages for the input field.

**Slots**:

- Default slot for the validation message content.

---

## Styling

The checkbox is designed to be fully customizable through classes and scoped CSS. Below is an example of basic styling:

```scss
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

.checkbox {
  appearance: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 1px solid #333;

  &:checked {
    + .checkbox-icon {
      stroke-dashoffset: 0;
    }
  }
}

.checkbox-wrapper {
  position: relative;
  width: 16px;
  height: 16px;
}

.checkbox-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  stroke-dashoffset: 22.63;
  stroke-dasharray: 22.63;
  transition: stroke-dashoffset 0.3s ease;
}
```

## Props and Slots Summary

| Component                        | Props                               | Description                                       |
| -------------------------------- | ----------------------------------- | ------------------------------------------------- |
| `HeadlessInputField`             | -                                   | Provides the context for the input field.         |
| `HeadlessInputLabel`             | `for`                               | Associates the label with a specific input field. |
| `HeadlessInputCheckbox`          | `v-model`, `id`, `name`, `required` | Configures the checkbox input.                    |
| `HeadlessInputValidationMessage` | -                                   | Displays validation messages for the input.       |

## Accessibility

- The `HeadlessInputCheckbox` and associated components follow WAI-ARIA best practices, ensuring a great user experience for screen readers and keyboard users.

## Customization

This component can be easily customized to match your design system by:

- **Changing the CSS classes** to fit your styles.
- **Using different icons** inside the `checkbox-icon` slot.
- **Modifying the validation message** to meet your form validation requirements.

## Usage Notes

- The `v-model` prop is used to bind the state of the checkbox.
- The `required` prop ensures the checkbox is validated when used in forms.
