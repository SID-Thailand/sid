<script lang="ts" setup>
import { LucidePlus } from 'lucide-vue-next'
import type { iApartment } from '~/types/story'

interface IProps {
  apartmentsList: iApartment[]
}

defineProps<IProps>()
</script>

<template>
  <div class="interior-dropdown">
    <button type="button" class="interior-dropdown__btn">
      Choose apartment
    </button>
    <ul class="interior-dropdown__list">
      <li
        v-for="(item, idx) in apartmentsList"
        :key="idx"
        class="interior-dropdown__item"
      >
        <div class="interior-dropdown__line" />
        <div class="interior-dropdown__item-wrapper">
          <LucidePlus class="interior-dropdown__plus" />
          <div class="interior-dropdown__info">
            <h3 class="interior-dropdown__item-title">
              {{ item?.name }}
            </h3>
            <p class="interior-dropdown__item-text">
              {{ item?.price }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.interior-dropdown__item {
  width: 100%;

  &:not(:first-child) {
    margin-top: vw(30);

    @media (max-width: $br1) {
      margin-top: 30px;
    }
  }
}

.interior-dropdown__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--basic-black);
}

.interior-dropdown__item-wrapper {
  display: flex;
  align-items: flex-start;
  gap: vw(12);
  margin-top: vw(24);

  @media (max-width: $br1) {
    gap: 16px;
    margin-top: 20px;
  }
}

.interior-dropdown__plus {
  display: block;
  color: var(--basic-black);
  width: vw(20);
  height: vw(20);
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: $br1) {
    width: 16px;
    height: 16px;
  }
}

.interior-dropdown__info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: vw(8);

  @media (max-width: $br1) {
    gap: 4px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.interior-dropdown__item-title {
  text-transform: uppercase;
  font-size: vw(24);
  line-height: 1em;
  @include med;

  @media (max-width: $br1) {
    font-size: size(24, 18);
  }

  @media (max-width: $br4) {
    font-size: 18px;
  }
}

.interior-dropdown__item-text {
  line-height: 1.25em !important;
  color: var(--neutral-300);
  @include text-t4;
}
</style>
