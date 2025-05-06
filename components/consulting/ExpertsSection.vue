<script setup lang="ts">
import type { iConsultingExperts } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingExperts
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)
</script>

<template>
  <section ref="$el" class="cons-experts container">
    <div class="cons-experts__wrapper">
      <h2 class="cons-experts__title">
        {{ content?.title }}
      </h2>
      <div class="cons-experts__content">
        <p class="cons-experts__subtitle">
          {{ content?.subtitle }}
        </p>
        <ul class="cons-experts__list">
          <li
            v-for="(expert, idx) in content?.experts"
            :key="idx"
            class="cons-experts__item"
          >
            <CustomImage
              class="cons-experts__img"
              :src="expert?.content?.photo?.filename"
              :alt="expert?.content?.photo?.alt"
            />
            <div class="cons-experts__info">
              <p class="cons-experts__name">
                {{ expert?.content?.name }}
              </p>
              <p class="cons-experts__position">
                {{ expert?.content?.position }}
              </p>
            </div>
            <div
              v-if="expert?.content?.links.length > 0"
              class="cons-experts__links"
            >
              <a
                v-for="(item, id) in expert?.content?.links"
                :key="id"
                class="ab-team__link underline-reverse"
                :href="item?.link?.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item?.label }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cons-experts {
  padding-top: vw(40);
  padding-bottom: vw(200);
  background-color: var(--neutral-100);
  color: var(--basic-black);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.cons-experts__title {
  font-size: vw(60);
  line-height: 1em;
  text-transform: uppercase;
  @include med;

  @media (min-width: $br1) {
    margin-left: auto;
    margin-right: vw(345);
    max-width: vw(680);
  }

  @media (max-width: $br1) {
    font-size: size(60, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.cons-experts__content {
  margin-top: vw(200);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: $br1) {
    flex-direction: column;
    margin-top: 88px;
  }
}

.cons-experts__subtitle {
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  @include med;

  @media (min-width: $br1) {
    max-width: vw(90);
    flex: 1 0 auto;
  }

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.cons-experts__list {
  width: 100%;

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    column-gap: vw(20);
    max-width: vw(1015);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    row-gap: 48px;
    margin-top: 24px;
  }
}

.cons-experts__img {
  display: block;
  width: 100%;
  object-fit: cover;

  @media (min-width: $br1) {
    height: vw(325);
  }

  @media (max-width: $br1) {
    height: auto;
    aspect-ratio: 1;
  }
}

.cons-experts__info {
  margin-top: vw(24);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.cons-experts__name {
  font-size: vw(24);
  line-height: 1em;
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: 24px;
    line-height: 1.17em;
  }
}

.cons-experts__position {
  color: var(--neutral-300);
  margin-top: vw(4);
  text-transform: uppercase;
  line-height: 1.25em !important;
  @include subheading-h5;

  @media (max-width: $br1) {
    margin-top: 4px;
  }
}

.cons-experts__links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: vw(20);
  margin-top: vw(24);

  @media (max-width: $br1) {
    margin-top: 16px;
    column-gap: 20px;
  }
}

.ab-team__link {
  position: relative;
  text-transform: uppercase;
  @include subheading-h6;
}
</style>
