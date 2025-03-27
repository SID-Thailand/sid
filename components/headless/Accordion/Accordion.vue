<script lang="ts" setup>
import type { MaybeElement } from '@vueuse/core'

interface IProps {
  as?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  as: 'div',
})

const $buttons: MaybeRef<MaybeElement[]> = ref([])
const $panels: MaybeRef<MaybeElement[]> = ref([])
const $items: MaybeRef<MaybeElement[]> = ref([])

const registerButton = (button: HTMLButtonElement) => {
  $buttons.value.push(button)

  return $buttons.value.indexOf(button)
}

const registerPanel = (panel: HTMLElement) => {
  $panels.value.push(panel)
  return $panels.value.indexOf(panel)
}

const registerItem = (item: HTMLElement) => {
  $items.value.push(item)
  return $items.value.indexOf(item)
}

const openedItems = ref([])

const togglePanel = (index: number) => {
  if (props.multiple) {
    const i = openedItems.value.find(item => item === index)

    if (i === undefined) {
      openedItems.value.push(index)
    } else {
      openedItems.value = openedItems.value.filter(item => item !== index)
    }
  } else {
    openedItems.value = openedItems.value[0] === index ? [] : [index]
  }
}

const isOpened = (index: number) => openedItems.value.includes(index)

const addOpenedItem = (index: number) => {
  if (!openedItems.value.includes(index)) {
    openedItems.value.push(index)
  }
}

provide('registerButton', registerButton)
provide('registerPanel', registerPanel)
provide('registerItem', registerItem)

provide('buttons', $buttons)
provide('panels', $panels)

provide('togglePanel', togglePanel)

provide('isOpened', isOpened)
provide('addOpenedItem', addOpenedItem)
</script>

<template>
  <component :is="as" role="region">
    <slot :opened="openedItems" />
  </component>
</template>
