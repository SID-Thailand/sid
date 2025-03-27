# HeadlessDialogModal Component

The `HeadlessDialogModal` component provides a customizable, accessible, and headless dialog (modal) for Vue 3 applications. It includes a backdrop, window, and lifecycle events for opening and closing the dialog, allowing full control over the appearance and behavior.

## Example Usage

```vue
<script lang="ts" setup>
const isModalOpen = ref(false)

const openModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>

<template>
  <div>
    <HeadlessButton @click="openModal(true)">Open</HeadlessButton>
    <Teleport to="#teleports">
      <HeadlessDialogModal
        class="dialog"
        :is-open="isModalOpen"
        :duration="0.3"
        @close="openModal(false)"
      >
        <HeadlessDialogBackdrop
          class="dialog-backdrop"
          @click="openModal(false)"
        ></HeadlessDialogBackdrop>

        <HeadlessDialogWindow class="dialog-window">
          <h3>Dialog Title</h3>
          <p>Dialog content goes here.</p>
          <HeadlessButton @click="openModal(false)">Close</HeadlessButton>
        </HeadlessDialogWindow>
      </HeadlessDialogModal>
    </Teleport>
  </div>
</template>
```

## Components

### `<HeadlessDialogModal>`

The main container for the dialog.

**Props**:

| Prop       | Type      | Default | Description                                                          |
| ---------- | --------- | ------- | -------------------------------------------------------------------- |
| `is-open`  | `boolean` | `false` | Controls the visibility of the dialog.                               |
| `duration` | `number`  | `0.3`   | Transition duration (in seconds) for opening and closing the dialog. |

**Events**:

| Event   | Description                        |
| ------- | ---------------------------------- |
| `close` | Emitted when the dialog is closed. |

---

### `<HeadlessDialogBackdrop>`

The backdrop (overlay) behind the dialog window.

**Props**: None

**Events**:

| Event   | Description                                                               |
| ------- | ------------------------------------------------------------------------- |
| `click` | Emitted when the backdrop is clicked, typically used to close the dialog. |

---

### `<HeadlessDialogWindow>`

The container for the dialog content.

**Props**: None

---

## Styling

The dialog is designed to be fully customizable through classes and scoped CSS. Below is an example of basic styling:

```scss
.dialog {
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 50;
}

.dialog-backdrop {
  inset: 0;
  background-color: rgba(
    33,
    33,
    33,
    0.6
  ); // Darker backdrop for a Material look
  position: fixed;
  z-index: 1;
  backdrop-filter: blur(3px); // Adds subtle blur effect for a modern touch
}

.dialog-window {
  position: relative;
  width: 90%;
  max-width: 600px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow:
    0px 4px 12px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 80vh;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
  z-index: 2;

  &.is-open {
    opacity: 1;
    transform: translateY(0);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 0 0 16px 0;
  }
}
```

## Props and Events Summary

| Component                | Props                 | Description                                             |
| ------------------------ | --------------------- | ------------------------------------------------------- |
| `HeadlessDialogModal`    | `is-open`, `duration` | Controls the dialog visibility and transition duration. |
| `HeadlessDialogBackdrop` | None                  | Provides the backdrop for the modal.                    |
| `HeadlessDialogWindow`   | None                  | Contains the dialog content.                            |

## Accessibility

- The `HeadlessDialogModal` and its associated components follow WAI-ARIA guidelines to ensure proper behavior for assistive technologies like screen readers.

## Customization

This component can be easily customized by:

- **Modifying CSS classes** to match your design system.
- **Adding transitions** to create custom open/close animations.
- **Using additional slots** for complex content like forms, images, or interactive elements.

## Usage Notes

- **Teleport** is used to render the modal outside the current DOM hierarchy, which is useful for managing z-index and positioning.
- Use the `@close` event to handle modal close behavior.
