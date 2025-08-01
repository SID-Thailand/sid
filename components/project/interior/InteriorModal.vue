<script lang="ts" setup>
import type { iApartment } from '~/types/currentProjectTypes'

interface IProps {
  apartmentsList: iApartment[]
  selectedApartment: iApartment
  buttonText?: string
}

defineProps<IProps>()

const emit = defineEmits(['select'])

const isOpen = defineModel<boolean>('open')

const onSelect = (item: iApartment) => {
  emit('select', item)
  isOpen.value = false
}
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleports">
      <Transition name="dialog" :duration="600">
        <HeadlessDialogModal
          :is-open="isOpen"
          class="i-modal"
          @close="isOpen = false"
        >
          <HeadlessDialogBackdrop
            class="i-modal__backdrop"
            @click="isOpen = false"
          />
          <HeadlessDialogWindow class="i-modal__wrapper">
            <div class="i-modal__content">
              <ul class="i-modal__list">
                <li
                  v-for="(item, idx) in apartmentsList"
                  :key="idx"
                  class="i-modal__item i-modal-item"
                  :class="{
                    'i-modal-item--active':
                      selectedApartment?._uid === item?._uid,
                  }"
                  @click="onSelect(item)"
                >
                  <div class="i-modal-item__info-wrapper">
                    <IconsPlus class="i-modal-item__plus" />

                    <div class="i-modal-item__info">
                      <h3 class="i-modal-item__title">
                        {{ item?.name }}
                      </h3>
                      <p class="i-modal-item__text">
                        {{ item?.price }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </HeadlessDialogWindow>
        </HeadlessDialogModal>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.i-modal {
  position: fixed;
  top: 0;
  z-index: 101;
}

.i-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.8;
  mix-blend-mode: multiply;

  transition: opacity 0.6s ease;
}

.i-modal__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-height: 80svh;
  aspect-ratio: 480/440;
  overflow: auto;
  max-width: vw(555);
  padding: vw(12) vw(50);
  padding-bottom: vw(30);

  transition: all 0.3s ease;
  transition-property: transform, opacity;
  z-index: 95;
  background-color: var(--basic-white);
  color: var(--basic-black);
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: transparent;
    border-right: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.35);
    transition: background 120ms ease;
  }

  @media (max-width: $br1) {
    max-width: size(555, 343);
    padding: 12px 48px;
    aspect-ratio: 343/383;
  }

  @media (max-width: $br3) {
    max-width: 90%;
    max-height: 60svh;
  }
}

.dialog-enter-from {
  .i-modal__backdrop {
    opacity: 0;
  }
  .i-modal__wrapper {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
}

.dialog-enter,
.dialog-leave-to {
  .i-modal__backdrop {
    opacity: 0;
  }
  .i-modal__wrapper {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
}

.i-modal__content {
  position: relative;
  width: 100%;
  height: 100%;
}

.i-modal__list {
  padding-bottom: vw(20);

  @media (max-width: $br1) {
    padding-bottom: 20px;
  }
}

.i-modal-item {
  border-bottom: 1px solid var(--neutral-200);
  position: relative;
  padding: vw(32) 0;

  @media (max-width: $br1) {
    padding: 30px 0;
  }
}

.i-modal-item__plus {
  position: absolute;
  left: vw(-34);
  opacity: 0;

  @media (max-width: $br1) {
    left: -31px;
  }
}

.i-modal-item {
  cursor: pointer;
  width: 100%;
  position: relative;
  // transition: padding-left 0.3s ease;
  padding-left: vw(10);

  &--active {
    .i-modal-item__plus {
      opacity: 1;
    }
  }

  @media (min-width: $br1) {
    &:hover {
      * {
        color: var(--basic-white);
      }
      &::before {
        transform: scaleX(1);
      }
    }
  }

  @media (max-width: $br1) {
    padding-left: 0;
  }
}

.i-modal-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100%;
  background-color: var(--neutral-500);
  // opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s ease;

  @media (max-width: $br1) {
    display: none;
  }
}

.i-modal-item__title {
  text-transform: uppercase;
  font-size: vw(20);
  line-height: 1.2em;
  color: var(--basic-black);
  transition: color 0.8s ease;
  @include med;

  @media (max-width: $br1) {
    font-size: 20px;
  }
}

.i-modal-item__text {
  font-size: vw(14);
  line-height: 1.25em !important;
  color: var(--neutral-300);
  text-transform: uppercase;
  transition: color 0.8s ease;

  @include med;

  @media (max-width: $br1) {
    font-size: 14px;
  }
}
</style>
