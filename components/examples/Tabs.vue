<script lang="ts" setup>
const tabs = [
  { id: 1, title: 'Tab 1', content: 'Content for Tab 1' },
  { id: 2, title: 'Tab 2', content: 'Content for Tab 2', disabled: true },
  { id: 3, title: 'Tab 3', content: 'Content for Tab 3' },
  { id: 4, title: 'Tab 4', content: 'Content for Tab 4' },
]
</script>

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
