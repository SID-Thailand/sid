<script lang="ts" setup>
import { useMenuStory } from '~/composables/stories/menuStory'

const { story } = await useMenuStory()
const { selectedLang, defaultLocale } = useLang()
const { isMenuOpened } = useAppState()

// const $el = ref(null)
let navbarPos

const onClick = () => {
  isMenuOpened.value = false
}

onMounted(async () => {
  const { default: NavbarPos } = await import('~/utils/navbarPos')
  navbarPos = new NavbarPos()
  navbarPos.init()
})

onBeforeUnmount(() => {
  navbarPos && navbarPos.destroy()
})

const { headerColor, $headerRef } = useHeaderColor()
</script>

<template>
  <header class="header container" :class="`header--${headerColor}`">
    <div ref="$headerRef" class="header__wrapper container">
      <LanguageSwitcher />
      <NuxtLink
        :to="selectedLang === defaultLocale() ? '/' : '/' + selectedLang"
        class="header__link"
        aria-label="Site logo"
        @click="onClick"
      >
        <HeaderLogo />
      </NuxtLink>
      <BurgerMenu :content="story?.content" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: vw(40) 0;
  position: fixed;
  background-color: transparent;

  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  transition:
    transform 1s ease,
    opacity 1s ease;

  will-change: transform, opacity, color;

  @media (max-width: $br1) {
    padding: 32px 0;
  }

  &--black {
    color: var(--basic-black);
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
</style>
