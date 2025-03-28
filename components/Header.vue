<script lang="ts" setup>
const $el = ref(null)

let navbarPos

onMounted(async () => {
  const { default: NavbarPos } = await import('~/utils/navbarPos')
  navbarPos = new NavbarPos()
  navbarPos.init()
})

onBeforeUnmount(() => {
  navbarPos && navbarPos.destroy()
})
</script>

<template>
  <header ref="$el" class="header container">
    <div class="header__wrapper container">
      <LanguageSwitcher />
      <NuxtLink to="/" class="header__link">
        <img src="/logo.png" alt="Logotype" class="header__logo" />
      </NuxtLink>
      <BurgerMenu />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: vw(55) 0;
  position: fixed;
  background-color: transparent;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;

  @media (max-width: $br1) {
    padding: size(55, 32) 0;
  }

  @media (max-width: $br4) {
    padding: 32px 0;
  }
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__link {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header__logo {
  display: block;
  width: vw(64);
  height: auto;

  @media (max-width: $br1) {
    width: size(64, 40);
  }

  @media (max-width: $br4) {
    width: 40px;
  }
}
</style>
