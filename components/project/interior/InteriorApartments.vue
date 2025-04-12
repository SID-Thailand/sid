<script lang="ts" setup>
import type { iApartment } from '~/types/story'

interface IProps {
  apartments: iApartment[]
}

defineProps<IProps>()
</script>

<template>
  <div class="interior-aparts">
    <ul class="interior-aparts__list">
      <li
        v-for="(apartment, idx) in apartments"
        :key="idx"
        class="interior-aparts__item"
      >
        <ProjectInteriorApartment :apartment="apartment">
          <ProjectInteriorDropdown :apartments-list="apartments" />
        </ProjectInteriorApartment>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
