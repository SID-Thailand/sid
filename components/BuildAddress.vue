<script setup lang="ts">
interface IProps {
  color?: 'light' | 'dark'
  text: string
}

withDefaults(defineProps<IProps>(), {
  color: 'light',
})
</script>

<template>
  <p
    class="build-address"
    :class="color === 'light' ? 'build-address--light' : 'build-address--dark'"
  >
    <span />
    {{ text }}
  </p>
</template>

<style scoped lang="scss">
.build-address {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  column-gap: vw(12);
  font-size: vw(14);
  line-height: 1em;
  @include med;

  &--light {
    color: var(--basic-white);

    span {
      background-color: var(--basic-white);
    }
  }

  &--dark {
    color: var(--basic-black);

    span {
      background-color: var(--basic-black);
    }
  }

  span {
    display: block;
    width: vw(8);
    height: vw(8);
    border-radius: 100%;
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
