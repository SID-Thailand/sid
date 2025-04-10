<script lang="ts" setup>
import { LucideChevronDown } from 'lucide-vue-next'

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
  <HeadlessAccordion
    :multiple="true"
    style="margin-top: 100px"
    class="accordion"
  >
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

<style scoped lang="scss">
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

.accordion-panel {
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.5;
}

.accordion-content {
  padding: 16px 20px;
}

.accordion-chevron {
  transition: transform 0.2s ease;
  &--opened {
    transform: rotate(-180deg);
  }
}
</style>
