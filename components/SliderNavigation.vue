<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'navigate', direction: -1 | 1): void
}>()
</script>

<template>
  <div ref="el" class="floating-nav">
    <div class="floating-nav__btns">
      <button
        type="button"
        class="floating-nav__btn"
        aria-label="previous slide"
        @click="emit('navigate', -1)"
      >
        <IconsArrowLeft class="floating-nav__icon" />
      </button>
      <button
        type="button"
        class="floating-nav__btn"
        aria-label="next slide"
        @click="emit('navigate', 1)"
      >
        <IconsArrowRight class="floating-nav__icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-nav {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 2;
}

.floating-nav__btns {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  height: fit-content;
  padding: 0 vw(40);

  @media (max-width: $br1) {
    padding: 0 16px;
  }
}

.floating-nav__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: vw(44);
  height: vw(44);
  background-color: var(--basic-white);
  color: var(--basic-black);
  border-radius: 50%;
  @media (max-width: $br1) {
    width: 44px;
    height: 44px;
  }
}

.floating-nav__icon {
  width: vw(14);
  height: vw(14);
  &:deep(path) {
    fill: var(--basic-black);
  }
  @media (max-width: $br1) {
    width: 14px;
    height: 14px;
  }
}
</style>
