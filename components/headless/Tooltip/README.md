# Headless Tooltip Component

This is a flexible and accessible tooltip component designed to show helpful information when users hover over or focus on a trigger element. The tooltip content can be positioned in various ways based on the `position` prop.

## Features

- Position the tooltip in various directions: `top`, `right`, `bottom`, or `left`.
- Supports showing the tooltip on hover or focus of the trigger element.
- Easy to integrate with custom trigger elements, such as buttons or links.

## Usage

### Script Setup

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const position = ref('right') // Position of the tooltip (can be 'top', 'right', 'bottom', 'left')
</script>
```

### Template

```vue
<template>
  <Tooltip :position="position">
    <template #trigger>
      <button>Hover or focus me</button>
    </template>
    Tooltip content
  </Tooltip>
</template>
```

## Props

| Prop       | Type   | Default | Description |
| ---------- | ------ | ------- | ----------- | ------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `position` | `'top' | 'right' | 'bottom'    | 'left'` | `'top'` | The position of the tooltip relative to the trigger element. Can be `top`, `right`, `bottom`, or `left`. |

## Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `trigger` | The element that triggers the tooltip when hovered or focused. |
| `default` | The content that will be displayed inside the tooltip.         |

## Example Usage

### Tooltip on Hover or Focus

```vue
<Tooltip position="right">
  <template #trigger>
    <button>Hover or focus me</button>
  </template>
  Tooltip content
</Tooltip>
```

In this example, the tooltip will appear on the right side of the button when the user hovers over or focuses on the button.

### Tooltip with Top Position

```vue
<Tooltip position="top">
  <template #trigger>
    <button>Hover or focus me</button>
  </template>
  Tooltip content
</Tooltip>
```

### Tooltip with Bottom Position

```vue
<Tooltip position="bottom">
  <template #trigger>
    <button>Hover or focus me</button>
  </template>
  Tooltip content
</Tooltip>
```

## Customization

- **Positioning**: The `position` prop controls the position of the tooltip relative to the trigger element. You can set it to `top`, `right`, `bottom`, or `left` depending on where you want the tooltip to appear.
- **Trigger**: The `trigger` slot allows you to specify the element that triggers the tooltip (e.g., a button, link, or icon).
- **Content**: The tooltip content is placed in the default slot. This can be any content such as text, images, or other components.
