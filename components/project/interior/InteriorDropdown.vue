<script lang="ts" setup>
import { ChevronDown } from 'lucide-vue-next'
import type { iApartment } from '~/types/currentProjectTypes'
import { scrollTo } from '~/utils/scrollTo'

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

const el = ref<HTMLElement | null>(null)

const handleToggleMenu = () => {
  isOpen.value = !isOpen.value
}

watch(isOpen, val => {
  if (val) {
    const top = el.value?.getBoundingClientRect().top

    scrollTo(top - 20, false, () => {
      // window.escroll.disabled = true
      getScrollEl().classList.add('full-page')
    })
  } else {
    // window.escroll.disabled = false
    getScrollEl().classList.remove('full-page')
  }
})
</script>

<template>
  <div ref="el" class="interior-dropdown">
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
      data-scroll-ignore="true"
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
            <IconsPlus class="interior-dropdown__plus" />

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

<style lang="scss">
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
  z-index: 15;
  top: vw(22);
  left: vw(-3);
  max-height: 0;
  width: 100%;
  overflow-y: auto;
  background-color: var(--neutral-100);
  transition: max-height 0.8s ease;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  @media (max-width: $br1) {
    max-width: 385px;
    top: 20px;
    left: 0;
  }

  @media (max-width: $br3) {
    max-width: none;
    width: 100vw;
    margin-left: -16px;
  }

  &--opened {
    max-height: clamp(vw(500), vw(500), 50vh);

    @media (max-width: $br1) {
      height: 100vh;
      max-height: 100vh;
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
  padding: vw(30) 0;
  transition: background-color 0.3s ease;

  @media (max-width: $br1) {
    padding: 30px 16px;
    column-gap: 16px;
  }

  &:hover {
    background-color: var(--neutral-500);

    .interior-dropdown__item-title {
      color: var(--basic-white);
    }

    .interior-dropdown__plus {
      path {
        fill: var(--basic-white);
      }
    }
  }
}

.interior-dropdown__item {
  cursor: pointer;
  width: 100%;

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
  width: vw(16);
  height: vw(16);
  opacity: 0;
  transition:
    opacity 0.3s ease,
    fill 0.3s ease;
  flex: 1 0 auto;

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
  flex: 0 1 auto;
  width: 100%;

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
  transition: color 0.3s ease;
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
