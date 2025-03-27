export enum ToastColor {
  info = 'info',
  danger = 'danger',
  success = 'success',
  warning = 'warning',
}

export interface iToast {
  text: string
  color: ToastColor
  id?: string
}

export const useToasts = () => {
  const toasts = useState<iToast[]>('toasts', () => [])

  const addToast = (value: iToast) => {
    const updatedValue: iToast = { ...value, id: Date.now().toString() }
    toasts.value = [updatedValue, ...toasts.value]
  }

  const toast = {
    success: (text: string) => addToast({ text, color: ToastColor.success }),
    error: (text: string) => addToast({ text, color: ToastColor.danger }),
    info: (text: string) => addToast({ text, color: ToastColor.info }),
    warning: (text: string) => addToast({ text, color: ToastColor.warning }),
  }

  const updateToasts = (value: iToast[]) => {
    toasts.value = value
  }

  return { toasts, addToast, updateToasts, toast }
}
