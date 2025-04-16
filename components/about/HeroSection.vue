<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next'
import type { iAboutHero } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHero
}

defineProps<IProps>()
</script>

<template>
  <section class="about-hero container">
    <div class="about-hero__wrapper">
      <h1 class="about-hero__main-title">
        {{ content?.title }}
      </h1>
      <CustomImage
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
          <span class="about-hero__plus"><LucidePlus /></span>
        </li>
      </ul>
      <div class="about-hero__interview">
        <div class="about-hero__video-wrapper">
          <CustomImage
            :src="content?.interview?.content?.photo?.filename"
            :alt="content?.interview?.content?.photo?.alt"
            class="about-hero__video"
          />
          <button type="button" class="about-hero__play-btn">
            <IconsPlay />
          </button>
        </div>
        <h4 class="about-hero__interview-title">
          {{ content?.interview?.content?.interview_title }}
        </h4>
        <p class="about-hero__interview-description">
          {{ content?.interview?.content?.interview_position }}
        </p>
      </div>
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

// NEW CODEEEEEEEEEEE

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

.about-hero__interview {
  display: flex;
  flex-direction: column;
  width: fit-content;

  @media (min-width: $br1) {
    margin-left: auto;
    margin-right: 0;
  }

  @media (max-width: $br1) {
    width: 100%;
    margin-top: 60px;
  }
}

.about-hero__video-wrapper {
  position: relative;
}

.about-hero__video {
  display: block;
  object-fit: cover;
  height: vw(370);
  width: vw(555);

  @media (max-width: $br1) {
    width: 100%;
    height: size(370, 229);
  }

  @media (max-width: $br4) {
    height: 229px;
  }
}

.about-hero__play-btn {
  position: absolute;
  bottom: vw(20);
  right: vw(20);
  background-color: var(--basic-black);
  width: vw(48);
  height: vw(48);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s $easing;

  &:hover {
    background-color: var(--neutral-600);
  }

  svg {
    width: vw(15);
    height: vw(15);

    @media (max-width: $br1) {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: $br1) {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }
}

.about-hero__interview-title {
  text-transform: uppercase;
  margin-top: vw(20);
  line-height: 1.25em !important;
  @include subheading-h5;
}

.about-hero__interview-description {
  color: var(--neutral-300);
  text-transform: uppercase;
  line-height: 1.25em !important;
  @include subheading-h5;
}
</style>
