<script lang="ts" setup>
import { useCheckbox } from '~/composables/headless/checkbox'
import type { ICheckbox, TCheckboxEmits } from '~/types/headless/input'

const props = defineProps<ICheckbox>()

const emit = defineEmits<TCheckboxEmits>()

const model = defineModel<boolean>()

const { $input, error, onBlur, onChange, onFocus, isFocused } = useCheckbox(
  props,
  emit,
  model
)
</script>

<template>
  <input
    :id="id"
    ref="$input"
    v-model="model"
    type="checkbox"
    data-checkbox
    :name="name"
    :required="required"
    :data-focused="isFocused"
    :value="name"
    :disabled="disabled"
    :autofocus="autoFocus"
    :aria-invalid="error"
    @focus="onFocus"
    @blur="onBlur"
    @change="onChange"
  />
</template>
