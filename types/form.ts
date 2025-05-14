import type { iInputData } from './headless/input'

export interface IForm {
  [key: string]: Omit<iInputData, 'id'>
  phone: Omit<iInputData, 'id'>
  email: Omit<iInputData, 'id'>
  name: Omit<iInputData, 'id'>
}
