<script setup lang="ts">
const { isModalOpened } = useAppState()

watch(isModalOpened, () => {
  if (isModalOpened.value) {
    window.escroll.disabled = true
    return
  } else {
    resetScroll()
  }
})
</script>

<template>
  <Teleport to="#teleports">
    <div class="slide-modal" :class="{ 'slide-modal--open': isModalOpened }">
      <div class="slide-modal__wrapper">
        <div class="slide-modal__content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.slide-modal {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
  height: 95vh;
  width: 100%;
  z-index: 100;
  transition: transform 0.3s ease-in-out;

  &--open {
    transform: translate(-50%, 0);
  }
}

.slide-modal__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: vw(20) vw(20) 0 0;
  padding: vw(20);
  background-image: var(--gradient-secondary);

  @media (max-width: $br1) {
    border-radius: 20px 20px 0 0;
    padding: 16px;
  }
}

.slide-modal__content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
