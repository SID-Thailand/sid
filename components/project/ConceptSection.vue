<script lang="ts" setup>
import type { iCurrentProjectConcept } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectConcept
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)
</script>

<template>
  <section ref="$el" class="project-concept">
    <div class="project-concept__wrapper container">
      <div class="project-concept__top">
        <p class="project-concept__subtitle">
          {{ content?.subtitle }}
        </p>
        <div class="project-concept__text-content">
          <h2 class="project-concept__title">
            {{ content?.title }}
          </h2>
          <p class="project-concept__text">
            {{ content?.text }}
          </p>
        </div>
      </div>
      <div class="project-concept__bottom">
        <div class="project-concept__small-block">
          <CustomImage
            class="project-concept__img project-concept__img--small"
            :src="content?.small_asset?.filename"
            :alt="content?.small_asset?.alt"
          />
          <p
            class="project-concept__description project-concept__description--small"
          >
            {{ content?.small_asset_description }}
          </p>
        </div>
        <div class="project-concept__big-block">
          <CustomImage
            class="project-concept__img project-concept__img--big"
            :src="content?.big_asset?.filename"
            :alt="content?.big_asset?.alt"
          />
          <p
            class="project-concept__description project-concept__description--big"
          >
            {{ content?.big_asset_description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-concept {
  background-color: var(--neutral-100);
  color: var(--basic-black);
  padding-top: vw(100);
  padding-bottom: vw(140);

  @media (max-width: $br1) {
    padding: 24px 0;
  }
}

.project-concept__top {
  @media (min-width: $br1) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

.project-concept__subtitle {
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  @include med;

  @media (min-width: $br1) {
    @include col(1, 6);
  }

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.project-concept__text-content {
  @media (min-width: $br1) {
    @include col(9, 24);
  }

  @media (max-width: $br1) {
    margin-top: 48px;
    max-width: 70%;
  }
}

.project-concept__title {
  font-size: vw(68);
  line-height: 1em;
  text-transform: uppercase;
  width: 100%;
  max-width: vw(899);
  @include med;

  @media (max-width: $br1) {
    max-width: 100%;
    font-size: size(68, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.project-concept__text {
  max-width: vw(324);
  margin-top: vw(32);
  @include text-t3;

  @media (max-width: $br1) {
    margin-top: 16px;
    width: 100%;
    max-width: 100%;
  }
}

.project-concept__bottom {
  width: 100%;
  margin-top: vw(200);
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  column-gap: vw(20);
  grid-auto-flow: row;

  @media (max-width: $br1) {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
    row-gap: 48px;
    margin-top: 48px;
  }
}

.project-concept__small-block {
  @media (min-width: $br1) {
    @include col(1, 6);
  }

  @media (max-width: $br1) {
    @include col(1, 2);
  }
}

.project-concept__img {
  display: block;
  width: 100%;
  height: auto;
}

.project-concept__description {
  margin-top: vw(17);
  @include text-t4;

  @media (max-width: $br1) {
    margin-top: 12px;
  }

  &--big {
    max-width: vw(618);

    @media (max-width: $br1) {
      max-width: 100%;
    }
  }
}

.project-concept__big-block {
  @media (min-width: $br1) {
    @include col(9, 24);
  }

  @media (max-width: $br1) {
    @include col(1, 4);
  }
}
</style>
