<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  title: string
  date: string
  category: string
  asset: iImage
}

defineProps<IProps>()
</script>

<template>
  <section class="curr-news-hero container">
    <div class="curr-news-hero__wrapper">
      <h1 v-if="title" class="curr-news-hero__title">
        {{ title }}
      </h1>
      <div class="curr-news-hero__date-wrapper">
        <p class="curr-news-hero__category">
          {{ category }}
        </p>
        <span>|</span>
        <p class="curr-news-hero__date">
          {{ formatDate(date) }}
        </p>
      </div>
      <CustomImage
        v-if="asset.filename"
        :src="asset?.filename"
        :alt="asset?.alt"
        class="curr-news-hero__img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-news-hero {
  padding-top: vw(226);
  background-color: var(--basic-black);
  color: var(--basic-white);

  @media (max-width: $br1) {
    padding-top: 128px;
  }
}

.curr-news-hero__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
}

.curr-news-hero__title {
  text-transform: uppercase;
  max-width: vw(1050);
  @include heading-h1;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.curr-news-hero__date-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: vw(24);
  gap: vw(20);
  text-transform: uppercase;
  color: var(--neutral-300);
  font-size: vw(20);
  line-height: 1em;
  @include med;

  @media (max-width: $br1) {
    line-height: 1em;
    font-size: size(20, 14);
    margin-top: 24px;
    gap: 8px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }

  span {
    @media (max-width: $br1) {
      transform: rotate(90deg);
    }
  }
}

.curr-news-hero__img {
  display: block;
  height: vw(752);
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  margin-top: vw(100);

  @media (max-width: $br1) {
    height: size(752, 229);
    margin-top: 48px;
  }

  @media (max-width: $br4) {
    height: 229px;
  }
}
</style>
