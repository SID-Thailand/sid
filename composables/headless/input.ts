import type { IInput, iInputData, TInputEmits } from '~/types/headless/input'
import { useInputContext } from './inputContext'
import type { ModelRef } from 'vue'

export const useInput = (
  props: IInput,
  emit: TInputEmits,
  model: ModelRef<string>
) => {
  const inputCtx = useInputContext()

  if (inputCtx) {
    inputCtx.value = { ...inputCtx.value, ...props }
  }

  const id = computed(() => props.id || `input-${useId()}`)

  const $input = ref<HTMLInputElement | null>(null)

  const error = ref<boolean | string>(false)
  const isFocused = ref(false)

  const validate = () => {
    if (props.validators) {
      const falsyValidator = props.validators.find(validator =>
        validator(model.value)
      )

      if (falsyValidator) {
        error.value = falsyValidator(model.value)
        emit('error', error.value as string)
      } else {
        error.value = false
      }
    }
  }

  const onChange = async () => {
    await nextTick()
    validate()

    emit('input', {
      id: id.value,
      value: model.value,
      error: !!error.value,
    } as iInputData)

    if (inputCtx) {
      inputCtx.value = {
        ...inputCtx.value,
        value: model.value,
        error: error.value,
      }
    }
  }

  const onFocus = () => {
    isFocused.value = true
    emit('focus')
  }

  const onBlur = () => {
    isFocused.value = false
    emit('blur')
  }

  const reset = () => {
    model.value = ''
    error.value = false
  }

  const updateFields = () => {
    if (model.value.trim() !== '') {
      emit('input', {
        id: id.value,
        value: model.value,
        error: error.value,
      } as iInputData)
    }
  }

  return {
    id,
    $input,
    error,
    isFocused,
    onChange,
    onFocus,
    onBlur,
    reset,
    validate,
    updateFields,
  }
}
