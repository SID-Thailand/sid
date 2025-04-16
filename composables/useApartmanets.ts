import type { iApartment } from '~/types/projectTypes'

export const useApartments = (apartments: iApartment[]) => {
  const selectedApartment = ref<iApartment>(apartments[0])

  const handleSelectApartment = (item: iApartment) => {
    selectedApartment.value = item
  }

  return { selectedApartment, handleSelectApartment }
}
