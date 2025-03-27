<script lang="ts" setup>
import { useHeadlessTabs } from '~/composables/headless/headlessTabs'

interface IProps {
  as?: string
  defaultIndex?: number
  selectedIndex?: number
}

const props = withDefaults(defineProps<IProps>(), {
  as: 'div',
  defaultIndex: 0,
  selectedIndex: 0,
})

const emit = defineEmits(['change'])

const { activeTab, init, panels, registerPanel, registerTab, tabs } =
  useHeadlessTabs(props.defaultIndex)

onMounted((): void => {
  init()

  if (props.selectedIndex !== undefined) {
    setActiveTab(props.selectedIndex)
  }
})

function setActiveTab(index: number) {
  activeTab.value = index
  emit('change', index)
}

watch(
  () => props.selectedIndex,
  index => {
    if (index !== undefined) {
      setActiveTab(index)
    }
  }
)

provide('activeTab', activeTab)
provide('setActiveTab', setActiveTab)

provide('tabs', tabs)
provide('panels', panels)

provide('registerTab', registerTab)
provide('registerPanel', registerPanel)
</script>

<template>
  <component :is="as" data-tabs-group>
    <slot :active-tab="activeTab" />
  </component>
</template>
