<script lang="ts" setup>
import type HeadlessInput from '../index.vue'
import type { IOption, ISelectOption } from '~/types/headless/input'

interface IProps {
  placeholder?: string
}

const props = defineProps<IProps>()

const selectedOption = inject('selectedOption') as Ref<IOption>

const options = inject('options') as Ref<ISelectOption[]>

const isOpen = inject('isOpen') as Ref<boolean>

const search = ref(selectedOption.value?.label || '')
const emit = defineEmits(['search'])

const $el = ref<typeof HeadlessInput>(null)

watch(selectedOption, () => {
  if (selectedOption.value) {
    search.value = selectedOption.value.label

    $el.value?.$input.blur()
    return
  }
  search.value = ''
})

const filteredOptions = ref(options.value)

watch(search, () => {
  if (!search.value) {
    filteredOptions.value = options.value
    return
  }

  filteredOptions.value = options.value.filter(option =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  )
})

watch(isOpen, () => {
  filteredOptions.value = options.value
  search.value = selectedOption.value?.label || ''
})

const toggleDropdown = inject('toggleDropdown') as (arg0?: boolean) => void

watch(filteredOptions, () => {
  emit('search', filteredOptions.value)
})

const onInput = () => {
  if (!isOpen.value) {
    toggleDropdown(true)
  }

  if (!search.value) {
    selectedOption.value = null
  }
}
</script>

<template>
  <HeadlessInput
    ref="$el"
    v-model="search"
    type="search"
    autocomplete="off"
    :placeholder="props.placeholder || 'Select an Option'"
    @focus="toggleDropdown(true)"
    @input="onInput"
  />
</template>
