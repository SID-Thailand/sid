<script setup lang="ts">
import type { iProjectsHeroContent } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsHeroContent
  categories: string[]
}

defineProps<IProps>()

const emit = defineEmits(['filter', 'getAll'])

const activeCategory = ref<string | null>(null)

const handleFilter = (category: string) => {
  activeCategory.value = category
  emit('filter', activeCategory.value)
}

const handleGetAll = () => {
  activeCategory.value = null
  emit('getAll')
}
</script>

<template>
  <section class="projects-hero container">
    <div class="projects-hero__wrapper">
      <div class="projects-hero__bg-wrapper">
        <CustomImage
          :src="content?.background?.filename"
          :alt="content?.background?.alt"
          class="projects-hero__bg"
        />
        <div class="projects-hero__layer" />
      </div>

      <div class="projects-hero__content">
        <h1 class="projects-hero__title">
          {{ content?.title }}
        </h1>
        <p class="projects-hero__description">
          {{ content?.description }}
        </p>
        <ul class="projects-hero__filter">
          <li
            class="projects-hero__filter-item"
            :class="{
              'projects-hero__filter-item--active': activeCategory === null,
            }"
          >
            <button
              type="button"
              class="projects-hero__filter-btn underline"
              :class="{ 'underline--active': activeCategory === null }"
              @click="handleGetAll"
            >
              {{ content?.categories_all }}
            </button>
            <span>|</span>
          </li>
          <li
            v-for="(category, idx) in categories"
            :key="idx"
            class="projects-hero__filter-item"
            :class="{
              'projects-hero__filter-item--active': activeCategory === category,
            }"
          >
            <button
              type="button"
              class="projects-hero__filter-btn underline"
              :class="{ 'underline--active': activeCategory === category }"
              @click="handleFilter(category)"
            >
              {{ category }}
            </button>
            <span v-if="categories?.length - 1 !== idx">|</span>
          </li>
        </ul>
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
  background: linear-gradient(180deg, rgba(36, 36, 36, 0) 0%, #242424 100%);
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

.projects-hero__filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: vw(60);
  max-width: vw(900);
  row-gap: vw(12);
  justify-content: center;

  @media (max-width: $br1) {
    flex-direction: column;
    margin-top: 48px;
    row-gap: 32px;
  }
}

.projects-hero__filter-item {
  span {
    color: var(--neutral-300);
    margin: 0 vw(20);

    @media (max-width: $br1) {
      display: none;
    }
  }

  &--active {
    .projects-hero__filter-btn {
      color: var(--basic-white);

      &:before {
        background-color: var(--basic-white);
      }
    }
  }
}

.projects-hero__filter-btn {
  position: relative;
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  background-color: transparent;
  color: var(--neutral-300);
  transition: color 0.3s ease;
  @include med;

  &:before {
    background-color: var(--neutral-300);
  }

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }
}
</style>
