import type { ICheckbox, TCheckboxEmits } from '~/types/headless/input'
import { useInputContext } from './inputContext'

export const useCheckbox = (
  props: ICheckbox,
  emit: TCheckboxEmits,
  model: Ref<boolean>
) => {
  const isFocused = ref(false)

  const inputCtx = useInputContext()

  if (inputCtx) {
    inputCtx.value = { ...inputCtx.value, ...props }
  }

  const onFocus = () => {
    isFocused.value = true
  }

  const onBlur = () => {
    isFocused.value = false
  }

  const $input = ref<HTMLInputElement | null>(null)

  const onChange = () => {
    emit('change', {
      id: props.id,
      checked: model.value,
      error: error.value,
    })

    if (inputCtx) {
      inputCtx.value = {
        ...inputCtx.value,
        value: model.value,
        error: error.value,
      }
    }
  }

  const error = computed(() => {
    return props.required && !model.value
  })

  return { $input, error, onFocus, onBlur, onChange, isFocused }
}
