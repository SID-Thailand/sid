import type { iInputData } from './headless/input'

export interface IForm {
  phone: Omit<iInputData, 'id'>
  email: Omit<iInputData, 'id'>
  name: Omit<iInputData, 'id'>
}
