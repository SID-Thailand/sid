<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { TransitionProps } from 'vue'
import type { iMenuContent } from '~/types/menuTypes'

interface iProps {
  content: iMenuContent
}

defineProps<iProps>()

const { isMenuOpened, isFullPage } = useAppState()

const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value
}

const elRef = ref<HTMLElement | null>(null)

const fromClipPath = 'inset(100% 0 0 0)'
const toClipPath = 'inset(0% 0 0 0)'

const { appear } = useLogoAnimation()

const menuTransition: TransitionProps = {
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter(el, done) {
    const $links = el.querySelectorAll('.navigation__link')
    const $socials = el.querySelectorAll('.socials__item')

    const tl = gsap.timeline({
      onComplete: done,
    })

    tl.fromTo(
      el,
      { clipPath: fromClipPath },
      { clipPath: toClipPath, duration: 1 }
    )

    tl.fromTo(
      $links,
      { yPercent: 100, clipPath: fromClipPath },
      {
        yPercent: 0,
        clipPath: toClipPath,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      },
      0.2
    )

    tl.fromTo(
      $socials,
      { yPercent: 100, clipPath: fromClipPath },
      {
        yPercent: 0,
        clipPath: toClipPath,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
      },
      0.3
    )

    appear()
  },
  onLeave(el, done) {
    const $links = el.querySelectorAll('.navigation__link')
    const $socials = el.querySelectorAll('.socials__item')

    const tl = gsap.timeline({
      onComplete: done,
    })

    tl.fromTo(
      $socials,
      { yPercent: 0, clipPath: toClipPath },
      {
        yPercent: 100,
        clipPath: fromClipPath,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.in',
      }
    )

    tl.fromTo(
      $links,
      { yPercent: 0, clipPath: toClipPath },
      {
        yPercent: 100,
        clipPath: fromClipPath,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power2.in',
      },
      0.1
    )

    tl.to(
      el,
      {
        clipPath: fromClipPath,
        duration: 1,
        onComplete: done,
      },
      0.2
    )
    appear()
  },
}

watch(isMenuOpened, () => {
  if (isMenuOpened.value) {
    window.escroll.disabled = true
    return
  } else {
    if (isFullPage.value) return
    window.escroll.disabled = false
  }
})
</script>

<template>
  <div ref="elRef" class="burger-menu">
    <button
      type="button"
      class="burger-menu__btn"
      aria-label="Toggle menu"
      :aria-expanded="isMenuOpened"
      @click="toggleMenu"
    >
      <span>{{ content?.menu_button_text }}</span>
      <div
        class="burger-menu__lines"
        :class="isMenuOpened && 'burger-menu__lines--opened'"
      >
        <span class="burger-menu__line" />
        <span class="burger-menu__line" />
      </div>
    </button>
    <Teleport to="#teleports">
      <Transition v-bind="menuTransition">
        <div
          v-show="isMenuOpened"
          class="burger-menu__content"
          :class="isMenuOpened && 'burger-menu__content--opened'"
        >
          <Navigation :links="content?.links" @close="toggleMenu" />
          <Socials :socials="content?.socials" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.burger-menu__btn {
  position: relative;
  display: block;
  background-color: transparent;
  color: currentColor;
  text-transform: uppercase;
  padding: 10px 0;

  > span {
    text-box: trim-both cap alphabetic;
  }

  @media (min-width: $br1) {
    @include caption-c2;
    display: flex;
    align-items: center;
    column-gap: vw(12);
  }

  @media (max-width: $br1) {
    > span {
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

  &--opened {
    .burger-menu__line {
      &:first-child {
        transform: rotate(-45deg) translateY(6px);
      }
      &:last-child {
        transform: rotate(45deg) translateY(-6px);
      }
    }
  }
}

.burger-menu__line {
  position: relative;
  display: block;
  width: 100%;
  height: 1.5px;
  background-color: currentColor;
  transition: all 0.3s ease;
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

  padding-top: vw(130);
  overflow-y: auto;
}
</style>
