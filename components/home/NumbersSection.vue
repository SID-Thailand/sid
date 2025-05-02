<script setup lang="ts">
import type { iHomeNumbers } from '~/types/homeTypes'

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
        <HomeNumberItem
          v-for="(card, idx) in content?.numbers"
          :key="idx"
          :card="card"
        />
      </ul>
      <Button
        type="button"
        class="numbers-stat__btn"
        @click="isFormModalOpened = true"
      >
        <span>{{ content?.button_text }}</span>
        <IconsPlus />
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
    grid-template-columns: repeat(2, 1fr);
    margin-top: 60px;
    gap: 32px;
  }

  @media (max-width: $br3) {
    grid-template-columns: 1fr;
  }
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
