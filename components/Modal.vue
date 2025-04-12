<script setup lang="ts">
interface IProps {
  isOpen: boolean
}
const props = defineProps<IProps>()
const emit = defineEmits(['close'])

watch(
  () => props.isOpen,
  open => {
    window.escroll.disabled = open
  }
)
</script>

<template>
  <ClientOnly>
    <div class="modal" :class="{ 'modal--open': isOpen }">
      <div class="modal__backdrop" @click="emit('close')" />
      <div class="modal__wrapper container">
        <div class="modal__content">
          <button
            type="button"
            class="modal__close-btn"
            @click="emit('close')"
          />
          <slot />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &--open {
    pointer-events: auto;
    opacity: 1;
  }
}

.modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(60px);
  background-image: linear-gradient(
    180deg,
    rgba(36, 36, 36, 0) 0%,
    #242424 100%
  );
}

.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.modal__content {
  position: relative;
  width: 100%;
  height: fit-content;
  padding: vw(60) vw(64);
  background-color: var(--basic-black);
  max-width: vw(555);
  z-index: 2;

  @media (max-width: $br1) {
    padding: 48px 64px;
    max-width: 343px;
  }
}

.modal__close-btn {
  position: absolute;
  top: vw(20);
  right: vw(20);
  width: vw(22);
  height: vw(22);
  background: transparent;
  border: none;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    background-color: var(--basic-white);
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  @media (max-width: $br1) {
    top: 16px;
    right: 16px;
    width: 15px;
    height: 15px;
  }
}
</style>
