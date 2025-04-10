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
    class="input"
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

<style scoped lang="scss">
.input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--neutral-300);
  border-radius: 0;
  outline: none;
  color: var(--basic-white);
  padding: vw(8) 0;
  @include caption-c3;

  @media (max-width: $br1) {
    padding: 8px 0;
  }

  &::placeholder {
    text-transform: uppercase;
    color: var(--neutral-300);
    transition: color 0.3s ease;
  }

  &:focus,
  &:hover {
    box-shadow: none;
    border-color: var(--basic-white);
    &::placeholder {
      color: var(--basic-white);
    }
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: var(--basic-white) !important;
    transition: background-color 5000s ease-in-out 0s;
    @include caption-c3;
  }
}
</style>
