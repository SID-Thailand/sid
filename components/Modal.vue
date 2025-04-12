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
    <Teleport to="#teleports">
      <Transition name="dialog">
        <HeadlessDialogModal
          :is-open="isOpen"
          class="modal"
          @close="emit('close')"
        >
          <HeadlessDialogBackdrop
            class="modal__backdrop"
            @click="emit('close')"
          />

          <HeadlessDialogWindow class="modal__wrapper">
            <button
              type="button"
              class="modal__close-btn"
              @click="emit('close')"
            />
            <div class="modal__content">
              <slot />
            </div>
          </HeadlessDialogWindow>
        </HeadlessDialogModal>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  z-index: 101;
}

.modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  backdrop-filter: blur(12px);
  background-image: linear-gradient(
    180deg,
    rgba(36, 36, 36, 0) 0%,
    #242424 100%
  );

  transition: opacity 0.6s ease;
}

.modal__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: fit-content;
  max-height: 100svh;
  overflow: auto;
  max-width: vw(555);
  padding: vw(60) vw(64);

  transition: all 0.3s ease;
  transition-property: transform, opacity;
  z-index: 95;
  background-color: var(--basic-black);

  @media (max-width: $br1) {
    max-width: size(555, 343);
    padding: 64px 48px;
  }

  @media (max-width: $br4) {
    max-width: 90%;
  }
}

.dialog-enter-from {
  .modal__backdrop {
    opacity: 0;
  }
  .modal__wrapper {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.6s;
}

.dialog-enter,
.dialog-leave-to {
  .modal__backdrop {
    opacity: 0;
  }
  .modal__wrapper {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
}

.modal__content {
  position: relative;
  width: 100%;
  height: 100%;
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
