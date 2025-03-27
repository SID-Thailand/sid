# Headless Tabs Component

This component is a headless implementation of tabs, allowing the user to manage tab selection and display content dynamically. It provides a flexible approach to organizing content into tabbed sections while maintaining full control over the layout and styles.

## Features

- `HeadlessTabGroup` for wrapping the entire tab interface.
- `HeadlessTabButtonList` for managing tab buttons.
- `HeadlessTabButton` for individual clickable tabs, which can be disabled.
- `HeadlessTabItems` to group the content panels for each tab.
- `HeadlessTabItem` to display the content corresponding to each tab.
- Supports active tab management and dynamic content display.

## Usage

### Script Setup

```vue
<script lang="ts" setup>
const tabs = [
  { id: 1, title: 'Tab 1', content: 'Content for Tab 1' },
  { id: 2, title: 'Tab 2', content: 'Content for Tab 2', disabled: true },
  { id: 3, title: 'Tab 3', content: 'Content for Tab 3' },
  { id: 4, title: 'Tab 4', content: 'Content for Tab 4' },
]
</script>
```

### Template

```vue
<template>
  <HeadlessTabGroup :default-index="1" :selected-index="3" class="tab-group">
    <!-- TabList -->
    <HeadlessTabButtonList class="tab-button-list">
      <HeadlessTabButton
        v-for="tab in tabs"
        :key="tab.id"
        :disabled="tab.disabled"
        class="tab-button"
        >{{ tab.title }}</HeadlessTabButton
      >
    </HeadlessTabButtonList>

    <!-- TabPanels -->
    <HeadlessTabItems>
      <HeadlessTabItem v-for="item in tabs" :key="item.id" class="tab-item">{{
        item.content
      }}</HeadlessTabItem>
    </HeadlessTabItems>
  </HeadlessTabGroup>
</template>
```

## Props

| Prop             | Type     | Description                                             |
| ---------------- | -------- | ------------------------------------------------------- |
| `default-index`  | `number` | The index of the tab that should be selected initially. |
| `selected-index` | `number` | The index of the currently selected tab.                |

## Styles

```vue
<style scoped lang="scss">
.tab-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 20px;
  width: 500px;
}

.tab-button-list {
  display: flex;
  gap: 1rem;
}

.tab-button {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &.is-active {
    background-color: #2196f3;
  }
}

.tab-item {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f5f5f5;
  width: 100%;
}
</style>
```

## Customization

- **Active Tab Styling**: The active tab can be styled using the `.is-active` class. By default, the active tab has a blue background color (`#2196f3`), but you can customize this to match your design.
- **Disabled Tabs**: Tabs can be disabled by setting the `disabled` property on the tab object. Disabled tabs won't be clickable and will have reduced opacity by default.
- **Tab Content**: Each tab has its corresponding content displayed inside the `HeadlessTabItem`. This content can be any element you want, such as forms, images, or text.

## Example of Dynamic Tabs

You can dynamically add or remove tabs by modifying the `tabs` array in the script, and the component will automatically update the tab list and panels accordingly.
