<script setup lang="ts">
import { pageTransition } from '~/transitions/base'
import { ArrowDown } from 'lucide-vue-next'

definePageMeta({
  pageTransition,
})
</script>

<template>
  <section class="home">
    <div class="home__wrapper">
      <div class="home__middle">
        <img src="/images/home/1.png" alt="Home image" class="home__img" />
        <h1 class="home__title">We are building the future of Phuket</h1>
      </div>
      <div class="home__bottom">
        <p class="home__scroll-text">
          <span>scroll down</span>
          <ArrowDown :size="18" />
        </p>
        <p class="home__scroll-text">
          <span />
          2490 sq. m built in Phuket
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home__wrapper {
  height: 100dvh;
}

.home__middle {
  width: 100%;
  height: 100%;

  @media (min-width: $br1) {
    padding: vw(155);
  }
}

.home__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home__title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-transform: uppercase;
  @include heading-h1;

  @media (max-width: $br1) {
    width: 100%;
    padding: 0 $g-sm;
  }

  @media (max-width: $br4) {
    padding: 0 $g-s;
  }
}

.home__bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: vw(64);

  @media (min-width: $br1) {
    padding: 0 vw(40);
  }

  @media (max-width: $br1) {
    bottom: size(64, 36);
    justify-content: center;
  }

  @media (max-width: $br4) {
    bottom: 36px;
  }
}

.home__scroll-text {
  display: flex;
  align-items: center;
  column-gap: vw(12);
  text-transform: uppercase;
  font-size: vw(14);
  line-height: 1em;
  @include med;

  @media (max-width: $br1) {
    font-size: 14px;
  }

  &:first-child {
    span {
      position: relative;

      @media (min-width: $br1) {
        top: vw(2);
      }
    }
  }

  &:last-child {
    span {
      display: block;
      width: vw(8);
      height: vw(8);
      background-color: var(--basic-white);
      border-radius: 100%;
    }

    @media (max-width: $br1) {
      display: none;
    }
  }
}
</style>
