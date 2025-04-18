<script setup lang="ts">
import type { iConsultingDifference } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingDifference
}

defineProps<IProps>()

const activeDiff = ref(0)
</script>

<template>
  <section class="cons-diff">
    <div class="cons-diff__wrapper">
      <div class="cons-diff__title-wrapper container">
        <h2 class="cons-diff__title">
          {{ content?.title }}
        </h2>
      </div>
      <div class="cons-diff__slider container">
        <div
          v-for="(img, idx) in content?.difference_gallery"
          :key="idx"
          class="cons-diff__bg-wrapper"
          :class="{ 'cons-diff__bg-wrapper--active': activeDiff === idx }"
        >
          <CustomImage
            :src="img?.background_asset?.filename"
            :aly="img?.background_asset?.alt"
            class="cons-diff__bg"
          />
          <div class="cons-diff__layer" />
        </div>
        <ul class="cons-diff__list">
          <li
            v-for="(item, index) in content?.difference_gallery"
            :key="index"
            class="cons-diff__item"
            :class="{ 'cons-diff__item--active': activeDiff === index }"
          >
            <div class="cons-diff__content">
              <h3 class="cons-diff__item-title">
                {{ item?.title }}
              </h3>
              <p class="cons-diff__item-text">
                {{ item?.text }}
              </p>
            </div>
            <div class="cons-diff__img-wrapper">
              <CustomImage
                :src="item?.asset?.filename"
                :aly="item?.asset?.alt"
                class="cons-diff__img"
              />
            </div>
          </li>
        </ul>
        <div class="cons-diff__counter container">
          <p class="cons-diff__count">
            {{ activeDiff + 1 }}/{{ content?.difference_gallery?.length }}
          </p>
          <div class="cons-diff__pagination">
            <span
              v-for="(_, i) in content?.difference_gallery?.length"
              :key="i"
              class="cons-diff__pag-item"
              :class="{ 'cons-diff__pag-item--active': activeDiff === i }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cons-diff__title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: vw(110);
  padding-bottom: vw(110);
  background-color: var(--neutral-600);
  color: var(--neutral-200);

  @media (max-width: $br1) {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}
.cons-diff__title {
  text-align: center;
  text-transform: uppercase;
  @include heading-h3;

  @media (min-width: $br1) {
    max-width: vw(880);
  }
}

.cons-diff__slider {
  position: relative;
  width: 100%;
  height: 100vh;
}

.cons-diff__bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;

  &--active {
    opacity: 1;
  }
}

.cons-diff__bg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cons-diff__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, #3a3838 0%, #202020 100%);
  mix-blend-mode: hard-light;
}

.cons-diff__list {
  position: relative;
  width: 100%;
  height: 100%;
}

.cons-diff__item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: vw(134);
  max-width: vw(784);
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: $br1) {
    text-align: center;
    flex-direction: column-reverse;
    max-width: 70%;
    gap: 32px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }

  &--active {
    opacity: 1;
  }
}

.cons-diff__item-title {
  text-transform: uppercase;
  line-height: 1em;
  font-size: vw(40);
  @include med;

  @media (max-width: $br1) {
    font-size: size(40, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.cons-diff__item-text {
  margin-top: vw(32);
  @include text-t3;

  @media (max-width: $br1) {
    margin-top: 20px;
  }
}

.cons-diff__img-wrapper {
  flex: 1 0 auto;
}

.cons-diff__img {
  display: block;
  width: vw(326);
  height: vw(326);
  object-fit: cover;

  @media (max-width: $br1) {
    height: 326px;
    width: 100%;
  }
}

.cons-diff__counter {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: $br1) {
    flex-direction: column;
    height: 100%;
    padding: 88px 0;
  }
}

.cons-diff__count {
  text-transform: uppercase;
  line-height: 1.2em;
  font-size: vw(20);
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 16);
  }

  @media (max-width: $br4) {
    font-size: 16px;
  }
}

.cons-diff__pagination {
  display: flex;
  align-items: center;
  width: fit-content;

  @media (min-width: $br1) {
    flex-direction: column;
    row-gap: vw(8);
  }

  @media (max-width: $br1) {
    column-gap: 8px;
  }
}

.cons-diff__pag-item {
  display: block;
  width: vw(4);
  height: vw(4);
  border-radius: 100%;
  background-color: var(--neutral-300);
  transition:
    height 0.3s ease,
    width 0.3s ease,
    border-radius 0.3s ease;

  @media (max-width: $br1) {
    width: 4px;
    height: 4px;
  }

  &--active {
    background-color: var(--basic-white);

    @media (min-width: $br1) {
      height: vw(16);
      border-radius: vw(12);
    }

    @media (max-width: $br1) {
      width: 16px;
      border-radius: 12px;
    }
  }
}
</style>
