import type {
  IOption,
  ISelect,
  ISelectOption,
  TSelectEmits,
} from '~/types/headless/input'
import { useInputContext } from './inputContext'
import type { ModelRef } from 'vue'

export const useSelect = (
  props: ISelect,
  emit: TSelectEmits,
  model: ModelRef<IOption>
) => {
  const inputCtx = useInputContext()

  if (inputCtx) {
    inputCtx.value = { ...inputCtx.value, ...props }
  }

  const isOpen = ref(false)

  const options = ref<ISelectOption[]>([])

  const error = ref<boolean | string>(false)

  const $selectContainer = ref(null)

  const validate = () => {
    if (props.validators) {
      const value = model.value?.value

      const falsyValidator = props.validators.find(validator =>
        validator(value || '')
      )

      if (falsyValidator) {
        error.value = falsyValidator(value)
        emit('error', error.value as string)
      } else {
        error.value = false
      }
      console.log(error.value)
    }
  }

  function toggleDropdown(value?: boolean) {
    if (props.disabled) return

    isOpen.value = value ?? !isOpen.value
  }

  watch(model, () => {
    validate()

    emit('change', {
      value: model.value?.value,
      label: model.value?.label,
      id: props.id,
      error: !!error.value,
    })

    if (inputCtx) {
      inputCtx.value = {
        ...inputCtx.value,
        value: model.value,
        error: error.value,
      }
    }
  })

  function selectOption(option: IOption) {
    model.value = option

    if (inputCtx) {
      inputCtx.value = {
        ...inputCtx.value,
        value: option,
        error: error.value,
      }
    }
  }

  onClickOutside($selectContainer, () => (isOpen.value = false))

  return {
    isOpen,
    options,
    error,
    $selectContainer,
    toggleDropdown,
    selectOption,
  }
}
