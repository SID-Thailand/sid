# HeadlessDropdownMenu Component

The `HeadlessDropdownMenu` component provides a fully customizable, accessible dropdown menu for Vue 3 applications. It supports various configurations, including hover or click-based triggers, item positioning, and smooth transitions.

## Example Usage

```vue
<template>
  <!-- Dropdown Menu 1 -->
  <HeadlessDropdownMenu class="dropdown-menu" trigger="hover">
    <HeadlessDropdownTrigger class="dropdown-btn">
      Open Menu
    </HeadlessDropdownTrigger>

    <Teleport to="#teleports">
      <Transition name="fade">
        <HeadlessDropdownItems position-x="right" class="dropdown-items">
          <div class="items-wrapper">
            <HeadlessDropdownItem class="dropdown-item"
              >Option 1</HeadlessDropdownItem
            >
            <HeadlessDropdownItem class="dropdown-item"
              >Option 2</HeadlessDropdownItem
            >
            <HeadlessDropdownItem class="dropdown-item"
              >Option 3</HeadlessDropdownItem
            >
          </div>
        </HeadlessDropdownItems>
      </Transition>
    </Teleport>
  </HeadlessDropdownMenu>

  <!-- Dropdown Menu 2 -->
  <HeadlessDropdownMenu class="dropdown-menu dropdown-menu-2">
    <HeadlessDropdownTrigger class="dropdown-btn">
      Open Menu
    </HeadlessDropdownTrigger>

    <Teleport to="#teleports">
      <Transition name="fade">
        <HeadlessDropdownItems position-x="right" class="dropdown-items">
          <HeadlessDropdownItem class="dropdown-item"
            >Option 1</HeadlessDropdownItem
          >
          <HeadlessDropdownItem class="dropdown-item"
            >Option 2</HeadlessDropdownItem
          >
          <HeadlessDropdownItem class="dropdown-item"
            >Option 3</HeadlessDropdownItem
          >
        </HeadlessDropdownItems>
      </Transition>
    </Teleport>
  </HeadlessDropdownMenu>
</template>
```

## Components

### `<HeadlessDropdownMenu>`

The container for the dropdown menu.

**Props**:

| Prop      | Type     | Default | Description                                                        |
| --------- | -------- | ------- | ------------------------------------------------------------------ |
| `trigger` | `string` | `click` | Defines the event that triggers the dropdown (`click` or `hover`). |

---

### `<HeadlessDropdownTrigger>`

The button or element that triggers the dropdown menu.

**Props**: None

---

### `<HeadlessDropdownItems>`

The container for the dropdown items.

**Props**:

| Prop         | Type     | Default | Description                                                          |
| ------------ | -------- | ------- | -------------------------------------------------------------------- |
| `position-x` | `string` | `left`  | Defines the horizontal position of the dropdown (`left` or `right`). |

---

### `<HeadlessDropdownItem>`

An individual item inside the dropdown.

**Props**: None

---

## Styling

The dropdown is highly customizable through CSS. Below is an example of basic styling:

```scss
.dropdown-menu {
  position: fixed;
  right: 20px;
  top: 20px;
  display: inline-block;
}

.dropdown-menu-2 {
  right: 200px;
}

.items-wrapper {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
}

.dropdown-items {
  padding-top: 20px;
  z-index: 1000;
  width: 280px;
}

.dropdown-item {
  padding: 12px 20px;
  font-size: 0.95rem;
  color: #333333;
  transition:
    background-color 0.2s,
    color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    background-color: #f5f5f5;
    color: #1976d2;
  }

  &:active {
    background-color: #e3f2fd;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
}

.dropdown-btn {
  background-color: transparent;
}
```

## Props and Events Summary

| Component                 | Props        | Description                                                 |
| ------------------------- | ------------ | ----------------------------------------------------------- |
| `HeadlessDropdownMenu`    | `trigger`    | Defines how the dropdown is triggered (`click` or `hover`). |
| `HeadlessDropdownTrigger` | None         | Triggers the dropdown menu display.                         |
| `HeadlessDropdownItems`   | `position-x` | Positions the dropdown items (`left` or `right`).           |
| `HeadlessDropdownItem`    | None         | Represents each selectable item in the dropdown.            |

## Accessibility

- Fully keyboard navigable.
- Supports `aria` attributes for assistive technologies.

## Customization

You can customize the dropdown by:

- **Adjusting CSS** classes to match your design system.
- **Adding animations** using Vue's `<Transition>` component.
- **Modifying behavior** through event handling on `trigger` and `items`.
