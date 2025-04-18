<script lang="ts" setup>
import type { iCurrentProjectExterior } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectExterior
}

defineProps<IProps>()
</script>

<template>
  <section class="project-exterior">
    <div class="project-exterior__wrapper container">
      <h2 class="project-exterior__title">
        {{ content?.title }}
      </h2>
      <div class="project-exterior__content">
        <p class="project-exterior__text">
          {{ content?.text }}
        </p>
        <div class="project-exterior__slider">
          <ul class="project-exterior__list">
            <li
              v-for="(item, idx) in content?.assets"
              :key="idx"
              class="project-exterior__item"
            >
              <CustomImage
                :src="item?.filename"
                :alt="item?.alt"
                class="project-exterior__img"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-exterior {
  position: relative;
  padding-top: vw(40);
  padding-bottom: vw(200);
  background-color: var(--neutral-600);
  color: var(--basic-white);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.project-exterior__title {
  text-transform: uppercase;
  text-align: center;
  @include heading-h1;

  @media (max-width: $br1) {
    text-align: start;
  }
}

.project-exterior__content {
  margin-top: vw(200);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}

.project-exterior__text {
  line-height: 1.2em;
  max-width: vw(325);
  width: 100%;
  @include text-t3;

  @media (max-width: $br1) {
    max-width: 70%;
  }
}

.project-exterior__slider {
  margin-top: vw(90);
  width: 100vw;
  overflow-x: auto;
  padding-right: vw(40);
  padding-left: vw(40);
  margin-left: vw(-40);

  @media (max-width: $br1) {
    margin-top: 24px;
    padding-right: 32px;
    padding-left: 32px;
    margin-left: -32px;
  }

  @media (max-width: $br3) {
    padding-right: 16px;
    padding-left: 16px;
    margin-left: -16px;
  }
}

.project-exterior__list {
  display: flex;
  align-items: flex-end;
  gap: vw(40);
  min-width: max-content;

  @media (max-width: $br1) {
    align-items: flex-start;
    gap: 16px;
  }
}

.project-exterior__item {
  pointer-events: none;
  user-select: none;
  height: vw(224);
  width: vw(336);

  @media (max-width: $br1) {
    height: 109px;
    width: 164px;
  }

  &--active {
    height: vw(600);
    width: vw(600);

    @media (max-width: $br1) {
      height: 285px;
      width: 285px;
    }
  }
}

.project-exterior__img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
