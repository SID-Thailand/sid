<script lang="ts" setup>
import type { iApartment } from '~/types/currentProjectTypes'

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
    <div class="interior-aparts__dropdown-wrapper">
      <div class="interior-aparts__hidden-block" />
      <ProjectInteriorDropdown
        :apartments-list="apartments"
        :selected-apartment="selectedApartment"
        class="interior-aparts__dropdown"
        @select="onSelectApartment"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <ProjectInteriorApartment
        :key="selectedApartment._uid"
        :apartment="selectedApartment"
      />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.interior-aparts__dropdown-wrapper {
  @media (min-width: $br1) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: vw(76);
  }
}

.interior-aparts__hidden-block {
  @media (min-width: $br1) {
    display: block;
    max-width: vw(900);
    width: 100%;
  }
}

.interior-aparts__dropdown {
  width: vw(382);
  position: relative;
  @media (max-width: $br1) {
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
