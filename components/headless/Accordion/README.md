# HeadlessAccordion Component

The `HeadlessAccordion` component provides a flexible, customizable accordion UI for Vue 3 applications. It is built with accessibility and composability in mind, allowing you to create dynamic, interactive accordions with ease.

## Example Usage

```vue
<script lang="ts" setup>
const items = [
  {
    title: 'Title 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, vitae?',
  },
  {
    title: 'Title 2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, vitae?',
  },
  {
    title: 'Title 3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, vitae?',
  },
]
</script>

<template>
  <HeadlessAccordion :multiple="true" class="accordion">
    <HeadlessAccordionItem
      v-for="item in items"
      :key="item.title"
      v-slot="{ isOpened }"
      :open="false"
      class="accordion-item"
    >
      <HeadlessAccordionButton class="accordion-button">
        {{ item.title }}
        <LucideChevronDown
          class="accordion-chevron"
          :class="{ 'accordion-chevron--opened': isOpened }"
        />
      </HeadlessAccordionButton>
      <HeadlessAccordionPanel class="accordion-panel">
        <div class="accordion-content">
          {{ item.text }}
        </div>
      </HeadlessAccordionPanel>
    </HeadlessAccordionItem>
  </HeadlessAccordion>
</template>
```

## Components

### `<HeadlessAccordion>`

The container component for the accordion.

**Props**:

| Prop       | Type      | Default | Description                                                          |
| ---------- | --------- | ------- | -------------------------------------------------------------------- |
| `multiple` | `boolean` | `false` | Allows multiple accordion items to be open simultaneously if `true`. |

**Slots**:

- Default slot for `HeadlessAccordionItem` components.

---

### `<HeadlessAccordionItem>`

A single collapsible item within the accordion.

**Props**:

| Prop   | Type      | Default | Description                                |
| ------ | --------- | ------- | ------------------------------------------ |
| `open` | `boolean` | `false` | Determines if the item is open by default. |

**Slots**:

- `default` (with `{ isOpened: boolean }`): Provides the open state of the item.

---

### `<HeadlessAccordionButton>`

The trigger button for expanding or collapsing the accordion item.

**Slots**:

- Default slot for the button's content.

---

### `<HeadlessAccordionPanel>`

The collapsible content panel of an accordion item.

**Slots**:

- Default slot for the content inside the panel.

---

## Styling

The accordion can be styled using custom classes and scoped CSS. Below is an example of basic styling:

```scss
.accordion {
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
}

.accordion-button {
  display: block;
  background-color: #ffffff;
  padding: 16px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    background-color: #e3f2fd;
    color: #1976d2;
  }
}

.accordion-chevron {
  transition: transform 0.2s ease;

  &--opened {
    transform: rotate(-180deg);
  }
}
```

## Accessibility

- The accordion components follow WAI-ARIA best practices for accessibility, ensuring a great experience for all users, including those using screen readers and keyboard navigation.

## Props and Slots Summary

| Component                 | Props      | Description                          |
| ------------------------- | ---------- | ------------------------------------ |
| `HeadlessAccordion`       | `multiple` | Allow multiple open items            |
| `HeadlessAccordionItem`   | `open`     | Open item by default                 |
| `HeadlessAccordionButton` | -          | Trigger for opening/collapsing items |
| `HeadlessAccordionPanel`  | -          | Content panel                        |

## Customization

The accordion is designed to be fully customizable through:

- **Class names**: Easily apply custom styles.
- **Scoped styles**: Use CSS or SCSS to define component-specific styles.
- **Icons**: Customize the chevron icon based on the `isOpened` state.
