<script setup lang="ts">
import type { iProjectsHeroContent } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsHeroContent
  categories: string[]
}

defineProps<IProps>()

const emit = defineEmits(['filter', 'getAll'])
</script>

<template>
  <section class="projects-hero container">
    <div class="projects-hero__wrapper">
      <div data-full-image class="projects-hero__bg-wrapper">
        <CustomImage
          :src="content?.background?.filename"
          :alt="content?.background?.alt"
          class="projects-hero__bg"
        />

        <div class="projects-hero__layer" />
      </div>

      <div class="projects-hero__content">
        <h1 data-title class="projects-hero__title">
          {{ content?.title }}
        </h1>
        <p data-t class="projects-hero__description">
          {{ content?.description }}
        </p>
        <CategoryFilter
          data-t
          :categories="categories"
          :label-all="content?.categories_all"
          @filter="emit('filter', $event)"
          @get-all="emit('getAll')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-hero {
  position: relative;
  height: 100%;
  width: 100%;
  color: var(--basic-white);
  padding-top: vw(250);
  padding-bottom: vw(186);

  @media (max-width: $br1) {
    padding-top: 160px;
    padding-bottom: 92px;
  }
}

.projects-hero__wrapper {
  width: 100%;
  height: 100%;
}

.projects-hero__bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.projects-hero__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects-hero__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(36, 36, 36, 0) 0%,
    rgba(36, 36, 36, 0.6) 100%
  );
  mix-blend-mode: multiply;
}

.projects-hero__content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.projects-hero__title {
  text-transform: uppercase;
  @include heading-h1;
}

.projects-hero__description {
  font-size: vw(16);
  line-height: 1.25em;
  max-width: vw(900);
  margin-top: vw(32);
  @include med;

  @media (max-width: $br1) {
    margin-top: 24px;
    font-size: 16px;
    max-width: 100%;
  }
}
</style>
