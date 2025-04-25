<script setup lang="ts">
import type { iAboutHistory } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHistory
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-history container">
    <div class="ab-history__wrapper">
      <h2 class="ab-history__title">
        {{ content?.title }}
      </h2>

      <div class="ab-history__content">
        <p class="ab-history__text">
          {{ content?.text }}
        </p>
        <ul class="ab-history__list">
          <li
            v-for="(item, idx) in content?.items"
            :key="idx"
            class="ab-history__item"
            :class="{ 'ab-history__item--active': idx == 0 }"
          >
            <div class="ab-history__img-wrapper">
              <CustomImage
                :src="item?.asset?.filename"
                :alt="item?.asset?.alt"
                class="ab-history__img"
              />
            </div>
            <div class="ab-history__about-wrapper">
              <div class="ab-history__line" />
              <div class="ab-history__about">
                <h3 class="ab-history__year">{{ item?.year }}</h3>
                <p class="ab-history__description">
                  {{ item?.description }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ab-history {
  background-color: var(--neutral-600);
  color: var(--basic-white);
  padding-top: vw(40);
  padding-bottom: vw(200);

  @media (max-width: $br1) {
    padding-top: 48px;
    padding-bottom: 64px;
  }
}

.ab-history__title {
  font-size: vw(50);
  text-transform: uppercase;
  line-height: 1em;
  width: 100%;
  margin-left: auto;
  margin-right: vw(115);
  max-width: vw(785);
  @include med;

  @media (max-width: $br1) {
    display: none;
  }
}

.ab-history__content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: vw(215);

  @media (max-width: $br1) {
    flex-direction: column;
    margin-top: 35px;
  }
}

.ab-history__text {
  font-size: vw(18);
  line-height: 1.22em;
  text-transform: uppercase;
  @include med;

  @media (min-width: $br1) {
    max-width: vw(210);
    position: sticky;
    top: vw(20);
  }

  @media (max-width: $br1) {
    font-size: 24px;
    line-height: 1.17em;
  }
}

.ab-history__list {
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: $br1) {
    max-width: vw(900);
    gap: vw(100);
  }

  @media (max-width: $br1) {
    margin-top: 40px;
    width: 100%;
    gap: 40px;
  }
}

.ab-history__item {
  display: flex;
  align-items: flex-start;
  width: 100%;

  @media (min-width: $br1) {
    flex-direction: row-reverse;
    justify-content: space-between;
    column-gap: vw(135);
  }

  @media (max-width: $br1) {
    width: 100%;
    flex-direction: column;
    gap: 24px;
  }
}

.ab-history__img-wrapper {
  max-width: vw(440);

  @media (max-width: $br1) {
    height: 343px;
    max-width: 100%;
    width: 100%;
  }
}

.ab-history__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ab-history__about-wrapper {
  max-width: vw(325);

  @media (max-width: $br1) {
    margin-top: 40px;
    max-width: 100%;
    width: 100%;
  }
}

.ab-history__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
}

.ab-history__about {
  margin-top: vw(24);

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.ab-history__year {
  font-size: vw(50);
  line-height: 1em;
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: size(50, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.ab-history__description {
  margin-top: vw(16);
  @include text-t3;

  @media (max-width: $br1) {
    margin-top: 12px;
  }
}
</style>
