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
    <div class="modal" :class="{ 'modal--opened': isOpen }">
      <div class="modal__backdrop" @click="emit('close')" />

      <div class="modal__wrapper">
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
  top: 0;
  z-index: 90;
  pointer-events: none;

  &--opened {
    pointer-events: auto;

    .modal__wrapper {
      opacity: 1;
    }

    .modal__backdrop {
      opacity: 1;
    }
  }
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
  opacity: 0;
  transition: opacity 0.6s ease;
}

.modal__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: fit-content;
  max-width: vw(555);
  padding: vw(60) vw(64);
  opacity: 0;
  transition: opacity 0.3s ease;
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

.modal__content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
