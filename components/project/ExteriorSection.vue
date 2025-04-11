<script lang="ts" setup>
import type { iProjectExterior } from '~/types/story'

interface IProps {
  content: iProjectExterior
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
.project-exterior__wrapper {
}
.container {
}
.project-exterior__title {
  text-transform: uppercase;
  text-align: center;
  @include heading-h1;
}
.project-exterior__content {
  margin-top: vw(200);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}
.project-exterior__text {
  @include text-t3;
}
.project-exterior__slider {
}
.project-exterior__list {
  display: flex;
  align-items: flex-end;
}
.project-exterior__item {
}
.project-exterior__img {
}
</style>
