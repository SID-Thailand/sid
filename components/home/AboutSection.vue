<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next'
import type { iHomeAbout } from '~/types/story'

interface IProps {
  content: iHomeAbout
  arrow: string
}

defineProps<IProps>()
</script>

<template>
  <section class="connect container">
    <div class="connect__top">
      <h2 class="connect__title">
        {{ content?.title }}
      </h2>
      <Button type="button" view="dark" class="connect__btn">
        <span>{{ content?.button_text }}</span>
      </Button>
    </div>
    <AutoScrollingSlider :items="content?.gallery" />
    <div class="connect__bottom">
      <div class="connect__bottom-wrapper">
        <p class="connect__scroll-text">
          <span>{{ arrow }}</span>
          <ArrowDown class="connect__arrow" />
        </p>
        <p class="connect__description">
          {{ content?.text }}
        </p>
      </div>
      <BuildAddress color="dark" :text="content?.address" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.connect {
  background-color: var(--neutral-100);
  color: var(--basic-black);
  padding-top: vw(100);
  padding-bottom: vw(60);
  text-transform: uppercase;

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 54px;
  }
}

.connect__top {
  @media (min-width: $br1) {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
}

.connect__title {
  font-size: vw(60);
  line-height: 1em;
  max-width: vw(771);
  @include med;

  @media (max-width: $br1) {
    font-size: size(60, 44);
    max-width: 100%;
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.connect__btn {
  @media (max-width: $br1) {
    display: none;
  }
}

.connect__bottom {
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  margin-top: vw(130);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}

.connect__bottom-wrapper {
  @media (min-width: $br1) {
    display: flex;
    align-items: end;
    column-gap: vw(157);
  }
}

.connect__scroll-text {
  display: flex;
  align-items: center;
  column-gap: vw(12);
  font-size: vw(14);
  line-height: 1em;
  @include med;

  @media (max-width: $br1) {
    display: none;
  }

  .connect__arrow {
    width: vw(18);
    height: vw(18);
  }

  span {
    position: relative;

    @media (min-width: $br1) {
      top: vw(2);
    }
  }
}

.connect__place {
  display: flex;
  align-items: center;
  column-gap: vw(12);
  font-size: vw(14);
  line-height: 1em;
  @include med;

  span {
    display: block;
    width: vw(8);
    height: vw(8);
    background-color: var(--basic-black);
    border-radius: 100%;
  }

  @media (max-width: $br1) {
    display: none;
  }
}

.connect__description {
  font-size: vw(18);
  line-height: 1.2em;
  max-width: vw(320);
  @include med;

  @media (max-width: $br1) {
    font-size: 18px;
    max-width: 70%;
  }

  @media (max-width: $br4) {
    max-width: 90%;
  }
}
</style>
