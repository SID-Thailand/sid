<script lang="ts" setup>
interface IProps {
  tag?: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
  view?: 'dark' | 'primary'
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
  >
    <div class="btn__content">
      <slot />
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
  padding: vw(24) vw(20);
  text-transform: uppercase;
  transition: all 0.3s $easing;
  @include caption-c2;

  &--primary {
    color: var(--accent-secondary);
    background-image: var(--accent-primary);

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }

  &--dark {
    color: var(--basic-white);
    background-color: var(--basic-black);

    &:hover:not(:disabled) {
      background-color: #303030;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: $br1) {
    padding: size(24, 19) size(20, 16);
    border-radius: size(20, 16);
  }

  @media (max-width: $br4) {
    padding: 19px 16px;
    border-radius: 16px;
  }
}

.btn__content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  gap: vw(7);

  @media (max-width: $br1) {
    gap: size(7, 9);
  }

  @media (max-width: $br4) {
    gap: 9px;
  }
}
</style>
