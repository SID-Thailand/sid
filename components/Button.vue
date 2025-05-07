<script lang="ts" setup>
interface IProps {
  tag?: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
  view?: 'dark' | 'primary'
  disabled?: boolean
}

withDefaults(defineProps<IProps>(), {
  view: 'primary',
})
</script>

<template>
  <HeadlessButton
    class="btn"
    :class="[`btn--${view}`]"
    :tag="tag"
    :type="type"
    :href="href"
    :disabled="disabled"
  >
    <div class="btn__content-wrapper">
      <div class="btn__content">
        <slot />
      </div>
      <div aria-hidden="true" class="btn__content btn__content--duplicate">
        <slot />
      </div>
    </div>
  </HeadlessButton>
</template>

<style scoped lang="scss">
.btn {
  appearance: none;
  position: relative;
  color: var(--accent-secondary);
  overflow: hidden;
  border-radius: vw(20);
  height: fit-content;
  padding: vw(20);
  text-transform: uppercase;
  transition: all 0.3s $easing;
  transition-property: background-color, filter;
  text-align: start;
  @include caption-c2;

  &:hover:not(:disabled) {
    .btn__content {
      transform: translateY(-120%);
    }
    .btn__content--duplicate {
      transform: translateY(0);
    }
  }

  &--primary {
    color: var(--accent-secondary);
    background-image: var(--accent-primary);
  }

  &--dark {
    color: var(--basic-white);
    background-color: var(--basic-black);

    &:hover:not(:disabled) {
      background-color: #303030;
    }
  }

  &:disabled {
    filter: brightness(0.6);
    cursor: not-allowed;
  }

  @media (max-width: $br1) {
    padding: 16px;
    border-radius: 16px;
  }
}

.btn__content-wrapper {
  position: relative;
  overflow: hidden;
}

.btn__content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-block-start: 1px;
  margin-block-end: 1px;
  z-index: 1;
  gap: vw(7);
  transition: transform 1s $easing;

  text-box: trim-both cap alphabetic;
  > * {
    text-box: trim-both cap alphabetic;
  }

  :global(svg) {
    flex-shrink: 0;
    display: block;
    width: vw(20);
    height: vw(20);

    @media (max-width: $br1) {
      width: size(20, 16);
      height: size(20, 16);
    }

    @media (max-width: $br4) {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: $br1) {
    gap: 9px;
  }
}

.btn__content--duplicate {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(120%);
}
</style>
