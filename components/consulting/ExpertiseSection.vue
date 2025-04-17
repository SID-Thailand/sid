<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next'
import type { iConsultingExpertise } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingExpertise
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-expertise container">
    <div class="cons-expertise__wrapper">
      <div class="cons-expertise__top">
        <div class="cons-expertise__expert">
          <h2 class="cons-expertise__title">
            {{ content?.title }}
          </h2>
          <p class="cons-expertise__description">
            {{ content?.text }}
          </p>
          <Button class="cons-expertise__btn" type="button">
            <span>{{ content?.button_text }}</span>
            <LucidePlus />
          </Button>
        </div>
        <CustomImage
          class="cons-expertise__img"
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
        />
      </div>
      <div class="cons-expertise__bottom">
        <div class="cons-expertise__bottom-content">
          <p class="cons-expertise__subtitle">
            {{ content?.numbers_title }}
          </p>
          <ul class="cons-expertise__list">
            <li
              v-for="(item, idx) in content?.numbers"
              :key="idx"
              class="cons-expertise__item"
            >
              <h3 class="cons-expertise__number-title">{{ item?.number }}</h3>
              <p class="cons-expertise__number-text">{{ item?.text }}</p>
              <span class="cons-expertise__plus"><LucidePlus /></span>
            </li>
          </ul>
        </div>
        <div class="cons-expertise__interview">
          <div class="cons-expertise__video-wrapper">
            <CustomImage
              :src="content?.interview?.content?.photo?.filename"
              :alt="content?.interview?.content?.photo?.alt"
              class="cons-expertise__video"
            />
            <button type="button" class="cons-expertise__play-btn">
              <IconsPlay />
            </button>
          </div>
          <h4 class="cons-expertise__interview-title">
            {{ content?.interview?.content?.interview_title }}
          </h4>
          <p class="cons-expertise__interview-description">
            {{ content?.interview?.content?.interview_position }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cons-expertise {
  padding-top: vw(100);
  padding-bottom: vw(200);
  color: var(--basic-black);
  background-color: var(--neutral-100);

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

.cons-expertise__top {
  display: flex;

  @media (min-width: $br1) {
    max-width: vw(1015);
    gap: vw(185);
    justify-content: space-between;
    align-items: flex-end;
    margin-left: auto;
  }

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.cons-expertise__title {
  line-height: 1em;
  text-transform: uppercase;
  font-size: vw(68);
  @include med;

  @media (max-width: $br1) {
    font-size: size(68, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.cons-expertise__description {
  margin-top: vw(32);
  max-width: vw(323);
  @include text-t3;

  @media (max-width: $br1) {
    margin-top: 24px;
    max-width: 70%;
  }
}

.cons-expertise__btn {
  margin-top: vw(60);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}

.cons-expertise__img {
  object-fit: cover;

  @media (min-width: $br1) {
    width: vw(324);
    height: vw(324);
  }

  @media (max-width: $br1) {
    margin-top: 60px;
    max-width: 70%;
    width: 100%;
    height: auto;
  }
}

.cons-expertise__bottom {
  margin-top: vw(200);

  @media (max-width: $br1) {
    margin-top: 60px;
  }
}

.cons-expertise__bottom-content {
  display: flex;

  @media (min-width: $br1) {
    column-gap: vw(187);
  }

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.cons-expertise__subtitle {
  font-size: vw(20);
  text-transform: uppercase;
  line-height: 1.2em;
  @include med;

  @media (min-width: $br1) {
    flex: 1 0 auto;
    max-width: vw(158);
  }

  @media (max-width: $br1) {
    font-size: size(20, 14);
    max-width: 111px;
    line-height: 1.3em;
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.cons-expertise__list {
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

.cons-expertise__item {
  position: relative;
  max-width: vw(325);
  width: 100%;

  @media (min-width: $br1) {
    &:nth-child(2) {
      max-width: vw(439);
      .cons-expertise__number-text {
        max-width: 70%;
      }
    }

    &:nth-child(4) {
      max-width: vw(439);
      .cons-expertise__number-text {
        max-width: 70%;
      }
    }
  }

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.cons-expertise__number-title {
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

.cons-expertise__number-text {
  margin-top: vw(6);
  text-transform: lowercase;
  @include text-t2;

  @media (max-width: $br1) {
    margin-top: 4px;
  }
}

.cons-expertise__plus {
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

.cons-expertise__interview {
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

.cons-expertise__video-wrapper {
  position: relative;
}

.cons-expertise__video {
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

.cons-expertise__play-btn {
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

.cons-expertise__interview-title {
  text-transform: uppercase;
  margin-top: vw(20);
  line-height: 1.25em !important;
  @include subheading-h5;
}

.cons-expertise__interview-description {
  color: var(--neutral-300);
  text-transform: uppercase;
  line-height: 1.25em !important;
  @include subheading-h5;
}
</style>
