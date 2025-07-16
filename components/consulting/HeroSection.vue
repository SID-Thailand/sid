<script setup lang="ts">
import type { iConsultingHero } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingHero
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-hero container">
    <div class="cons-hero__wrapper">
      <h1 data-title class="cons-hero__title">
        {{ content?.title }}
      </h1>

      <ParallaxImg
        data-full-image
        class="cons-hero__bg"
        :alt="content?.asset?.alt"
        :src="content?.asset?.filename"
        :width="1920"
        preload
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.cons-hero {
  position: relative;
  width: 100%;
  height: 100vh;
}

.cons-hero__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.cons-hero__title {
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  text-align: center;
  @include heading-h1;

  @media (min-width: $br1) {
    max-width: vw(1200);
  }
}

.cons-hero__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
