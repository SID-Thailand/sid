<script lang="ts" setup>
import { useInput } from '~/composables/headless/input'
import type { IInput, TInputEmits } from '~/types/headless/input'

const props = withDefaults(defineProps<IInput>(), {
  type: 'text',
  placeholder: '',
})

const emit = defineEmits<TInputEmits>()

const model = defineModel<string>()

const { id, $input, error, isFocused, onBlur, onChange, onFocus, reset } =
  useInput(props, emit, model)

defineExpose({
  reset,
  $input,
})
</script>

<template>
  <input
    :id="id"
    ref="$input"
    v-model="model"
    data-input
    :data-focused="isFocused"
    :required="required"
    :name="name"
    :type="type"
    :disabled="disabled"
    :placeholder="placeholder"
    :autofocus="autoFocus"
    :aria-invalid="!!error"
    @input="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
