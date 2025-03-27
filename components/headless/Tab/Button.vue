<script setup lang="ts">
interface IProps {
  as?: string
  disabled?: boolean
}

withDefaults(defineProps<IProps>(), {
  as: 'button',
})
const activeTab: Ref<number> = inject('activeTab')
const setActiveTab: any = inject('setActiveTab')
const tabs: Ref<HTMLElement[]> = inject('tabs')
const panels: Ref<HTMLElement[]> = inject('panels')
const registerTab: any = inject('registerTab')

const tabId = registerTab()

const index = computed(() => tabs.value.indexOf(tabId))

const isSelected = computed(() => activeTab.value === index.value)

function selectTab() {
  setActiveTab(index.value)
}

function handleKeydown(event: KeyboardEvent) {
  const keys = { ArrowRight: 1, ArrowLeft: -1 }
  if (keys[event.key] !== undefined) {
    event.preventDefault()
    const nextIndex =
      (activeTab.value + keys[event.key] + tabs.value.length) %
      tabs.value.length
    setActiveTab(nextIndex)
  }
}
</script>

<template>
  <component
    :is="as"
    :id="tabId"
    :key="tabId"
    :role="'tab'"
    :aria-disabled="disabled"
    :disabled="disabled"
    :class="{ 'is-active': isSelected }"
    data-tabs-button
    :aria-selected="isSelected"
    :aria-controls="panels[index]"
    :tabindex="isSelected ? 0 : -1"
    @click="selectTab"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </component>
</template>
