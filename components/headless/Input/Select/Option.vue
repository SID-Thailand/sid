<script setup lang="ts">
import type { IOption, ISelectOption } from '~/types/headless/input'

const props = defineProps<IOption>()

const selectOption = inject('selectOption') as any
const selectedOption = inject('selectedOption') as Ref<IOption | IOption[]>
const registerOption = inject('registerOption') as (arg0: ISelectOption) => void
const toggleDropdown = inject('toggleDropdown') as (arg0?: boolean) => void
const focused = inject('focused') as Ref<IOption>

const isSelected = computed(() => {
  if (Array.isArray(selectedOption.value)) {
    return !!selectedOption.value?.find(opt => opt.value === props.value)
  }

  return selectedOption.value?.value === props.value
})

const optionRef = ref<HTMLElement>(null)

onMounted(() => {
  registerOption({
    value: props.value,
    label: props.label,
    el: optionRef as Ref<HTMLElement>,
  })
})

function select() {
  toggleDropdown(false)
  selectOption({ value: props.value, label: props.label })
}

const isActive = ref(false)

function setActive() {
  isActive.value = true
}

function setInactive() {
  isActive.value = false
}

watch(focused, () => {
  if (focused.value?.value === props.value) {
    isActive.value = true
  } else {
    isActive.value = false
  }
})
</script>

<template>
  <button
    ref="optionRef"
    data-option
    :data-selected="isSelected"
    role="option"
    :aria-selected="isSelected"
    :value="props.value"
    :class="{ focus: isActive }"
    @click="select"
    @mouseenter="setActive"
    @mouseleave="setInactive"
  >
    <slot :is-selected="isSelected"></slot>
  </button>
</template>
