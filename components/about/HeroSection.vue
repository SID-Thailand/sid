<script setup lang="ts">
import type { iAboutHero } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHero
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)
</script>

<template>
  <section ref="$el" class="about-hero container">
    <div class="about-hero__wrapper">
      <h1 data-title class="about-hero__main-title">
        {{ content?.title }}
      </h1>
      <ParallaxImg
        data-full-image
        :src="content?.asset?.filename"
        :alt="content?.asset?.alt"
        class="about-hero__main-img"
      />

      <div class="about-hero__text">
        {{ content?.text }}
      </div>
      <ul class="about-hero__list">
        <li
          v-for="(item, idx) in content?.numbers"
          :key="idx"
          class="about-hero__item"
        >
          <h3 class="about-hero__number-title">{{ item?.number }}</h3>
          <p class="about-hero__number-text">{{ item?.text }}</p>
          <span class="about-hero__plus"><IconsPlus /></span>
        </li>
      </ul>
      <VideoInterview
        :asset="content?.interview?.content?.interview"
        :title="content?.interview?.content?.interview_title"
        :description="content?.interview?.content?.interview_position"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-hero {
  position: relative;
  padding-top: vw(244);
  padding-bottom: vw(200);
  background-color: var(--neutral-100);
  color: var(--basic-black);

  @media (max-width: $br1) {
    padding-bottom: 55px;
    padding-top: 128px;
  }
}

.about-hero__main-title {
  text-transform: uppercase;
  max-width: vw(1360);
  text-align: center;
  @include heading-h1;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.about-hero__main-img {
  margin-top: vw(118);
  height: 100vh;
  width: 100%;
  object-fit: cover;

  @media (max-width: $br1) {
    margin-top: 40px;
    height: 243px;
  }
}

.about-hero__text {
  @include text-t3;

  @media (min-width: $br1) {
    max-width: vw(324);
    margin-top: vw(40);
    margin-left: auto;
    margin-right: vw(271);
  }

  @media (max-width: $br1) {
    margin-top: 48px;
    max-width: 70%;
  }
}

.about-hero__list {
  margin-top: vw(100);

  @media (min-width: $br1) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: vw(78);
    row-gap: vw(100);
  }

  @media (max-width: $br1) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: row;
    width: 100%;
    margin-top: 60px;
    column-gap: 30px;
    row-gap: 60px;
  }

  @media (max-width: $br3) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.about-hero__item {
  position: relative;
  max-width: vw(325);
  width: 100%;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.about-hero__number-title {
  text-transform: uppercase;
  line-height: 1em;
  font-size: vw(60);
  @include med;

  @media (max-width: $br1) {
    font-size: size(60, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.about-hero__number-text {
  margin-top: vw(6);
  text-transform: lowercase;
  @include text-t2;

  @media (max-width: $br1) {
    margin-top: 4px;
  }
}

.about-hero__plus {
  position: absolute;
  top: 0;
  right: 0;
  width: vw(18);
  height: vw(18);

  @media (max-width: $br1) {
    width: 18px;
    height: 18px;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
