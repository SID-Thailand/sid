<script lang="ts" setup>
const $el = useTemplateRef('el')

const cursorX = ref(0)
const cursorY = ref(0)
const cursorType = ref<'left' | 'right' | null>(null)
const isIndicatorVisible = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY

  isIndicatorVisible.value = true
}

const setCursor = (type: 'left' | 'right' | null) => {
  if (type === null) {
    isIndicatorVisible.value = false
  }
  cursorType.value = type
}

const emit = defineEmits<{
  (e: 'navigate', direction: -1 | 1): void
}>()

useIntersectionObserver($el, ([entry]) => {
  const isIntersecting = entry?.isIntersecting || false

  if (!isIntersecting) {
    setCursor(null)
  }
})
</script>

<template>
  <div
    ref="el"
    class="floating-nav"
    @mousemove="handleMouseMove"
    @mouseleave="setCursor(null)"
  >
    <div class="floating-nav__btns">
      <button
        type="button"
        class="floating-nav__btn"
        aria-label="previous slide"
        :class="{ visible: cursorType === 'left' }"
        @click="emit('navigate', -1)"
        @mouseenter="setCursor('left')"
      >
        <IconsArrowLeft class="floating-nav__icon" />
      </button>
      <button
        type="button"
        class="floating-nav__btn"
        aria-label="next slide"
        :class="{ visible: cursorType === 'right' }"
        @click="emit('navigate', 1)"
        @mouseenter="setCursor('right')"
      >
        <IconsArrowRight class="floating-nav__icon" />
      </button>
    </div>

    <div
      class="floating-nav__cursor"
      :class="[
        `floating-nav__cursor--${cursorType}`,
        isIndicatorVisible && 'visible',
      ]"
      :style="{
        '--indicator-x': cursorX + 'px',
        '--indicator-y': cursorY + 'px',
      }"
    >
      <IconsArrowLeft v-if="cursorType === 'left'" />
      <IconsArrowRight v-else />
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
  height: 100%;
  width: 100%;

  @media (min-width: $br1) {
    cursor: none;
    * {
      cursor: none;
    }
  }

  @media (max-width: $br1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    top: 50%;
    transform: translateY(-50%);
    height: fit-content;
  }
}

.floating-nav__btn {
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.2s ease;
  outline: none;
  height: 100%;
  width: 50%;

  @media (max-width: $br1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    background-color: var(--basic-white);
    color: var(--basic-black);
    border-radius: 50%;
  }

  &.active {
    transform: scale(0.8);
  }
}

.floating-nav__icon {
  width: 14px;
  height: 14px;
  &:deep(path) {
    fill: var(--basic-black);
  }
  @media (min-width: $br1) {
    display: none;
  }
}

.floating-nav__cursor {
  pointer-events: none;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: vw(44);
  height: vw(44);
  top: calc(var(--indicator-y, 0px) - vw(22));
  left: calc(var(--indicator-x, 0px) - vw(22));
  background-color: transparent;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    transform 0.5s ease,
    visibility 0.3s ease;
  transform: scale(0);

  &:deep(svg path) {
    fill: var(--basic-black);
  }

  &::before {
    content: '';
    border-radius: 50%;
    background-color: var(--basic-white);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &--left svg,
  &--right svg {
    width: vw(20);
    height: vw(20);
    opacity: 1;
    fill: var(--basic-black);
  }

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
