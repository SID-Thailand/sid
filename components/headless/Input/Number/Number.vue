<script lang="ts" setup>
import { useInput } from '~/composables/headless/input'
import type { IInput, TInputEmits } from '~/types/headless/input'

interface IProps extends Omit<IInput, 'type'> {
  min: number
  max: number
  step?: number
}

const props = defineProps<IProps>()

const emit = defineEmits<TInputEmits>()

const model = defineModel<string>()

const { $input, error, isFocused, onBlur, onFocus, onChange } = useInput(
  props,
  emit,
  model
)

const onNumberChange = () => {
  const value = parseFloat(model.value)

  if (isNaN(value)) {
    model.value = ''
    onChange()
  }

  if (value < props.min) {
    model.value = props.min?.toString()
    onChange()

    return
  }

  if (value > props.max) {
    model.value = props.max?.toString()
    onChange()

    return
  }

  onChange()
}
</script>

<template>
  <input
    :id="id"
    ref="$input"
    v-model="model"
    type="number"
    data-input
    :data-focused="isFocused"
    :required="required"
    :name="name"
    :disabled="disabled"
    :placeholder="placeholder"
    :autofocus="autoFocus"
    :aria-invalid="!!error"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    @input="onNumberChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
