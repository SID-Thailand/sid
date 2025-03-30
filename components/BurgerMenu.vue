<script lang="ts" setup>
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

watch(isOpen, () => {
  if (isOpen.value) {
    window.escroll.disabled = true
    return
  } else {
    resetScroll()
  }
})
</script>

<template>
  <div class="burger-menu">
    <button type="button" class="burger-menu__btn" @click="toggleMenu">
      <span>Menu</span>
      <div
        class="burger-menu__lines"
        :class="isOpen && 'burger-menu__lines--opened'"
      >
        <span />
        <span />
      </div>
    </button>
    <Teleport to="#teleports">
      <div
        class="burger-menu__content"
        :class="isOpen && 'burger-menu__content--opened'"
      >
        <Navigation @close="toggleMenu" />
        <Socials />
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.burger-menu__btn {
  position: relative;
  display: block;
  background-color: transparent;
  color: var(--basic-white);
  text-transform: uppercase;

  @media (min-width: $br1) {
    @include caption-c2;
    display: flex;
    align-items: center;
    column-gap: vw(12);
  }

  @media (max-width: $br1) {
    span {
      display: none;
    }
  }
}

.burger-menu__lines {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: vw(38);
  row-gap: 7px;
  transition: all 0.3s ease;

  @media (max-width: $br1) {
    width: 30px;
  }

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 1.5px;
    background-color: var(--basic-white);
    transition: all 0.3s ease;
  }

  &--opened {
    span {
      &:first-child {
        transform: rotate(-45deg) translateY(6px);
      }
      &:last-child {
        transform: rotate(45deg) translateY(-6px);
      }
    }
  }
}

.burger-menu__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 90;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100dvh;
  background: var(--basic-black);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  padding-top: vw(130);
  overflow-y: auto;

  &--opened {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
