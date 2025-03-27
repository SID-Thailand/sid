<script setup lang="ts">
import { useSelect } from '~/composables/headless/select'
import type {
  IOption,
  ISelect,
  ISelectOption,
  TSelectEmits,
} from '~/types/headless/input'

const props = withDefaults(defineProps<ISelect>(), {
  as: 'div',
})

const emit = defineEmits<TSelectEmits>()

const model = defineModel<IOption>()
const focusedIdx = ref(-1)

provide(
  'focused',
  computed(() => {
    return options.value[focusedIdx.value]
  })
)

const { $selectContainer, isOpen, options, selectOption, toggleDropdown } =
  useSelect(props, emit, model)

provide('registerOption', (option: ISelectOption) => {
  const duplicate = options.value.find(opt => opt.value === option.value)
  if (duplicate) {
    !props.skipDuplicateWarn &&
      console.warn(duplicate.value, 'Option already registered')
    return
  }

  // @ts-ignore
  options.value = [...options.value, option]
})

provide('unregisterOption', (option: HTMLElement) => {
  options.value = options.value.filter(opt => opt.el !== option)
})

provide('options', options)

provide('selectOption', selectOption)
provide('selectedOption', model)
provide('isOpen', isOpen)

function handleKeydown(event: KeyboardEvent) {
  event.stopPropagation()

  if (event.key === 'Escape') {
    isOpen.value = false
    focusedIdx.value = -1
  }
  if (event.key === 'ArrowDown') {
    focusedIdx.value = focusedIdx.value + 1

    const nextOption = options.value[focusedIdx.value]

    if (!nextOption) {
      focusedIdx.value = 0
    }
  }

  if (event.key === 'ArrowUp') {
    focusedIdx.value = focusedIdx.value - 1

    const prevOption = options.value[focusedIdx.value]

    if (!prevOption) {
      focusedIdx.value = options.value.length - 1
    }
  }

  if (event.key === 'Enter') {
    isOpen.value = !isOpen.value

    const focusedOption = options.value[focusedIdx.value]
    if (!focusedOption) return

    selectOption(focusedOption)
    focusedIdx.value = -1
  }

  if (event.key === 'Tab') {
    isOpen.value = false
  }

  if (event.key === ' ') {
    event.preventDefault()

    focusedIdx.value = -1
    isOpen.value = !isOpen.value
  }
}

provide('toggleDropdown', toggleDropdown)
defineExpose({
  toggleDropdown,
})
</script>

<template>
  <component
    :is="as"
    :id="id"
    ref="$selectContainer"
    data-select
    tabindex="0"
    role="combobox"
    :aria-expanded="isOpen"
    :aria-activedescendant="model?.value"
    :disabled="disabled"
    @keydown="handleKeydown"
  >
    <slot />
  </component>
</template>
