<script lang="ts" setup>
import { ChevronDown, LucidePlus } from 'lucide-vue-next'
import type { iApartment } from '~/types/projectTypes'

interface IProps {
  apartmentsList: iApartment[]
  selectedApartment: iApartment
}

defineProps<IProps>()

const emit = defineEmits(['select'])

const isOpen = ref(false)

const onSelect = (item: iApartment) => {
  emit('select', item)
  handleToggleMenu()
}

const handleToggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="interior-dropdown">
    <button
      class="interior-dropdown__btn"
      :class="{ 'interior-dropdown__btn--opened': isOpen }"
      @click="handleToggleMenu"
    >
      Choose apartment
      <ChevronDown />
    </button>

    <div
      class="interior-dropdown__menu"
      :class="{ 'interior-dropdown__menu--opened': isOpen }"
    >
      <ul class="interior-dropdown__list">
        <li
          v-for="(item, idx) in apartmentsList"
          :key="idx"
          class="interior-dropdown__item"
          :class="{
            'interior-dropdown__item--active':
              selectedApartment?._uid === item?._uid,
          }"
          @click="onSelect(item)"
        >
          <div class="interior-dropdown__line" />
          <div class="interior-dropdown__info-wrapper">
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
  </div>
</template>

<style scoped lang="scss">
.interior-dropdown {
  position: relative;
}

.interior-dropdown__btn {
  display: flex;
  align-items: center;
  column-gap: vw(12);
  font-size: vw(16);
  line-height: 1.25em;
  color: var(--basic-black);
  text-transform: uppercase;
  background-color: transparent;
  @include med;

  svg {
    width: vw(24);
    height: vw(24);
    transition: transform 0.3s $easing;

    @media (max-width: $br1) {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: $br1) {
    column-gap: 12px;
    font-size: 16px;
  }

  &--opened {
    svg {
      transform: rotate(180deg);
    }
  }
}

.interior-dropdown__menu {
  position: absolute;
  z-index: 10;
  top: vw(22);
  left: 0;
  max-height: 0;
  max-width: vw(375);
  width: 100%;
  overflow-y: auto;
  background-color: var(--neutral-100);
  transition: max-height 0.3s ease;

  @media (max-width: $br1) {
    max-width: 385px;
    top: 20px;
  }

  &--opened {
    max-height: vw(350);

    @media (max-width: $br1) {
      max-height: 300px;
    }
  }
}

.interior-dropdown__list {
  padding: vw(16);
  width: 100%;

  @media (max-width: $br1) {
    padding: 24px 0;
    top: 22px;
  }
}

.interior-dropdown__line {
  width: 100%;
  height: 1px;
  position: relative;
  background-color: var(--basic-black);
}

.interior-dropdown__info-wrapper {
  display: flex;
  align-items: flex-start;
  column-gap: vw(16);
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 30px;
    column-gap: 16px;
  }
}

.interior-dropdown__item {
  cursor: pointer;
  width: 100%;

  &:not(:first-child) {
    margin-top: vw(30);

    @media (max-width: $br1) {
      margin-top: 30px;
    }
  }

  &--active {
    .interior-dropdown__plus {
      opacity: 1;
    }
  }

  &:hover {
    .interior-dropdown__plus {
      opacity: 1;
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
  font-size: vw(20);
  line-height: 1em;
  color: var(--basic-black);
  @include med;

  @media (max-width: $br1) {
    font-size: 20px;
  }
}

.interior-dropdown__item-text {
  line-height: 1.25em !important;
  color: var(--neutral-300);
  font-size: vw(14);
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: 14px;
  }
}
</style>
