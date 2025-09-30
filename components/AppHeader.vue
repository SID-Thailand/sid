<script lang="ts" setup>
import type { IEventArgs } from '@emotionagency/emotion-scroll'
import { useMenuStory } from '~/composables/stories/menuStory'

const { story } = await useMenuStory()
const { selectedLang, defaultLocale } = useLang()
const { isMenuOpened } = useAppState()

// const $el = ref(null)

const onClick = () => {
  isMenuOpened.value = false
}

const isVisible = ref(true)
const isHovered = ref(false)
const mousePaused = ref(true)

watch(isVisible, value => {
  if (value) {
    document.body.classList.remove('nav-hidden')
  } else {
    document.body.classList.add('nav-hidden')
  }
})

const isFixed = () => {
  if (getScrollEl().classList.contains('full-page')) {
    return false
  }
  return window.escroll ? window.escroll.disabled : false
}

const toggleVisible = (value: boolean) => {
  if (isVisible.value !== value) {
    isVisible.value = value
  }
}

const toggleMousePaused = (value: boolean) => {
  if (mousePaused.value !== value) {
    mousePaused.value = value
  }
}

const onScroll = (e: IEventArgs) => {
  if (isHovered.value) {
    return
  }

  const isDisabledClass =
    document.documentElement.classList.contains('header-disabled')
  if ((e.direction === 1 && !isFixed() && e.position > 0) || isDisabledClass) {
    toggleVisible(false)
    toggleMousePaused(false)
  } else {
    toggleMousePaused(true)
    toggleVisible(true)
  }
}

const onMouseMove = (e: MouseEvent) => {
  if (isFixed()) {
    return
  }

  if (mousePaused.value) {
    return
  }
  if (window.innerWidth < 560) {
    return
  }

  if (document.documentElement.classList.contains('header-disabled')) {
    toggleVisible(false)
    isHovered.value = false
    return
  }

  if (e.screenY <= 200) {
    toggleVisible(true)
    isHovered.value = true
  } else {
    toggleVisible(false)
    isHovered.value = false
  }
}

onMounted(async () => {
  window.escroll.on(onScroll)

  document.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
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
