<template>
  <HeadlessDropdownMenu class="dropdown-menu" trigger="hover">
    <HeadlessDropdownTrigger class="dropdown-btn"
      >Open Menu</HeadlessDropdownTrigger
    >

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
  <HeadlessDropdownMenu class="dropdown-menu dropdown-menu-2">
    <HeadlessDropdownTrigger class="dropdown-btn"
      >Open Menu</HeadlessDropdownTrigger
    >

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

<style scoped lang="scss">
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
</style>
