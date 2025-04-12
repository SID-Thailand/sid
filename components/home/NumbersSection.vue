<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next'

import type { iHomeNumbers } from '~/types/story'

interface IProps {
  content: iHomeNumbers
}

defineProps<IProps>()

const { isFormModalOpened } = useAppState()
</script>

<template>
  <section class="numbers-stat container">
    <div class="numbers-stat__wrapper">
      <div class="numbers-stat__top">
        <h2 class="numbers-stat__title">{{ content?.title }}</h2>
        <BuildAddress :text="content?.address" />
      </div>
      <ul class="numbers-stat__cards">
        <li
          v-for="(card, idx) in content?.numbers"
          :key="idx"
          class="numbers-stat__card"
        >
          <div class="numbers-stat__info">
            <h3 class="numbers-stat__number">{{ card?.value }}</h3>
            <p class="numbers-stat__desc" v-html="card?.description" />
          </div>
          <ParallaxImg
            :src="card?.asset?.filename"
            :alt="card?.asset?.alt"
            class="numbers-stat__img"
          />
        </li>
      </ul>
      <Button
        type="button"
        class="numbers-stat__btn"
        @click="isFormModalOpened = true"
      >
        <span>{{ content?.button_text }}</span>
        <LucidePlus />
      </Button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.numbers-stat {
  background-color: var(--neutral-500);
  padding-top: vw(100);
  padding-bottom: vw(200);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.numbers-stat__top {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.numbers-stat__title {
  font-size: vw(60);
  line-height: 1em;
  text-transform: uppercase;
  color: var(--neutral-200);
  @include med;

  @media (max-width: $br1) {
    font-size: size(60, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.numbers-stat__cards {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: vw(20);
  grid-auto-flow: row;
  margin-top: vw(100);

  @media (max-width: $br1) {
    grid-template-columns: 1fr;
    margin-top: 60px;
    gap: 32px;
  }
}

.numbers-stat__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: vw(24);
  position: relative;
  padding: vw(16);
  padding-top: vw(20);
  background-color: var(--basic-white);
  width: 100%;
  height: fit-content;
  color: var(--basic-black);

  &:nth-child(2),
  &:nth-child(4) {
    @media (min-width: $br1) {
      margin-top: vw(240);
    }
  }

  @media (max-width: $br1) {
    gap: 20px;
    padding: 16px;
  }
}

.numbers-stat__number {
  @include heading-h2;
}

.numbers-stat__desc {
  text-transform: lowercase;
  margin-top: vw(8);
  @include text-t1;

  @media (max-width: $br1) {
    margin-top: 8px;
  }
}

.numbers-stat__img {
  display: block;
  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
}

.numbers-stat__btn {
  display: block;
  margin: 0 auto;
  margin-top: vw(90);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}
</style>
