<script setup lang="ts">
import type { iConsultingExpertise } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingExpertise
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)

const { openFormModal } = useAppState()
</script>

<template>
  <section ref="$el" class="cons-expertise container">
    <div class="cons-expertise__wrapper">
      <div class="cons-expertise__top">
        <div class="cons-expertise__expert">
          <h2 class="cons-expertise__title">
            {{ content?.title }}
          </h2>
          <p class="cons-expertise__description">
            {{ content?.text }}
          </p>
          <Button
            class="cons-expertise__btn"
            type="button"
            @click="openFormModal('Consulting Page')"
          >
            <span>{{ content?.button_text }}</span>
            <IconsPlus />
          </Button>
        </div>
        <CustomImage
          class="cons-expertise__img"
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
          :width="700"
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
              <span class="cons-expertise__plus"><IconsPlus /></span>
            </li>
          </ul>
        </div>
        <VideoInterview
          :asset="content?.interview?.content?.interview?.[0]"
          :title="content?.interview?.content?.interview_title"
          :description="content?.interview?.content?.interview_position"
        />
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
    column-gap: vw(135);
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

  @include heading-h4;

  @media (max-width: $br1) {
    @include heading-h3;
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
</style>
