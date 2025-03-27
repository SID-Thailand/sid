<script setup lang="ts">
interface IProps {
  as?: string
}

withDefaults(defineProps<IProps>(), {
  as: 'div',
})

const activeTab: Ref<number> = inject('activeTab')
const tabs: Ref<HTMLElement[]> = inject('tabs')
const panels: Ref<HTMLElement[]> = inject('panels')
const registerPanel: any = inject('registerPanel')

const panelId = registerPanel()

const index = computed(() => panels.value.indexOf(panelId))

const isActive = computed(() => activeTab.value === index.value)
</script>

<template>
  <component
    :is="as"
    v-if="isActive"
    :id="panelId"
    data-tabs-item
    role="tabpanel"
    :class="{ 'is-active': isActive }"
    :aria-labelledby="tabs[index]"
    tabindex="0"
  >
    <slot></slot>
  </component>
</template>
