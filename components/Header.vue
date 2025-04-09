<script lang="ts" setup>
import { useMenuStory } from '~/composables/stories/menuStory'

const { story } = await useMenuStory()
const { selectedLang, defaultLocale } = useLang()
const { isMenuOpened } = useAppState()

const $el = ref(null)
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

const { appear } = useLogoAnimation()
</script>

<template>
  <header ref="$el" class="header container">
    <div class="header__wrapper container">
      <LanguageSwitcher />
      <NuxtLink
        :to="selectedLang === defaultLocale() ? '/' : '/' + selectedLang"
        class="header__link"
        @click="onClick"
        @mouseenter="appear"
      >
        <Logo class="header__logo" />
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
    transform 0.5s ease,
    opacity 0.5s ease;

  @media (max-width: $br1) {
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
    width: 40px;
  }
}
</style>
