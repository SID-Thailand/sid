<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next'
import type { iHomeHero } from '~/types/story'

interface IProps {
  content: iHomeHero
  arrow: string
}

defineProps<IProps>()
</script>

<template>
  <section class="hero">
    <div class="hero__wrapper">
      <div class="hero__middle">
        <ParallaxImg
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
          class="hero__img"
        />
        <h1 class="hero__title">{{ content?.title }}</h1>
      </div>
      <div class="hero__bottom">
        <p class="hero__scroll-text">
          <span>{{ arrow }}</span>
          <ArrowDown class="hero__arrow" />
        </p>
        <BuildAddress :text="content?.address" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero__wrapper {
  position: relative;
  height: 100dvh;
}

.hero__middle {
  width: 100%;
  height: 100%;
}

.hero__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;

  @media (min-width: $br1) {
    width: 85vw;
    height: 70vh;
  }
}

.hero__title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  @include heading-h1;

  @media (min-width: $br1) {
    max-width: vw(954);
  }

  @media (max-width: $br1) {
    padding: 0 $g-sm;
  }

  @media (max-width: $br4) {
    padding: 0 $g-s;
  }
}

.hero__bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: vh(60);

  @media (min-width: $br1) {
    padding: 0 vw(40);
  }

  @media (max-width: $br1) {
    bottom: 36px;
    justify-content: center;
  }
}

.hero__scroll-text {
  display: flex;
  align-items: center;
  column-gap: vw(12);
  text-transform: uppercase;
  font-size: vw(14);
  line-height: 1em;
  @include med;

  @media (max-width: $br1) {
    font-size: 14px;
    column-gap: 12px;
  }

  .hero__arrow {
    width: vw(18);
    height: vw(18);

    @media (max-width: $br1) {
      width: 16px;
      height: 16px;
    }
  }

  &:first-child {
    span {
      position: relative;

      @media (min-width: $br1) {
        top: vw(2);
      }
    }
  }
}
</style>
