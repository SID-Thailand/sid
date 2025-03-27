<script lang="ts" setup>
interface IProps {
  as?: string
  disabled?: boolean
  open?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  as: 'div',
})

const addOpenedItem = inject('addOpenedItem') as (index: number) => void

const registerItem = inject('registerItem') as (item: HTMLElement) => number

const $el = ref<HTMLElement | null>(null)
const idx = ref<number | null>(null)

onMounted(() => {
  idx.value = registerItem($el.value as HTMLElement)

  props.open && addOpenedItem(idx.value)
})

const isOpened = inject('isOpened') as (index: number) => boolean
</script>

<template>
  <component :is="as" ref="$el" role="region" :disabled="disabled">
    <slot :is-opened="isOpened(idx)" />
  </component>
</template>
