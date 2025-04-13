<script lang="ts" setup>
import type { iApartment } from '~/types/story'

interface IProps {
  apartments: iApartment[]
}

const props = defineProps<IProps>()

const { selectedApartment, handleSelectApartment } = useApartments(
  props.apartments
)

const onSelectApartment = (apartment: iApartment) => {
  handleSelectApartment(apartment)
}
</script>

<template>
  <div class="interior-aparts">
    <ProjectInteriorDropdown
      :apartments-list="apartments"
      :selected-apartment="selectedApartment"
      @select="onSelectApartment"
    />

    <Transition name="fade" mode="out-in">
      <ProjectInteriorApartment
        :key="selectedApartment._uid"
        :apartment="selectedApartment"
      />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
