<script lang="ts" setup>
import type { iProjectInterior } from '~/types/story'

interface IProps {
  content: iProjectInterior
}

const props = defineProps<IProps>()

console.log(props.content)
</script>

<template>
  <section class="project-interior">
    <div class="project-interior__wrapper container">
      <div class="project-interior__content">
        <h2 class="project-interior__title">
          {{ content?.title }}
        </h2>
        <p class="project-interior__text">
          {{ content?.text }}
        </p>
        <div class="project-interior__img-wrapper">
          <CustomImage
            class="project-interior__img"
            :src="content?.apartments[0]?.assets[0]?.filename"
            :alt="content?.apartments[0]?.assets[0]?.alt"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-interior {
  position: relative;
  background-color: var(--basic-white);
  color: var(--basic-black);
  padding-top: vw(40);
  padding-bottom: vw(200);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.project-interior__content {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 70%;
  }
}

.project-interior__title {
  text-transform: uppercase;
  @include heading-h1;

  @media (min-width: $br1) {
    @include col(1, 10);
  }
}

.project-interior__text {
  @include text-t3;

  @media (min-width: $br1) {
    @include col(11, 16);
  }

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}

.project-interior__img-wrapper {
  @media (min-width: $br1) {
    @include col(19, 24);
    align-self: end;
  }
}

.project-interior__img {
  display: block;
  width: 100%;

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}
</style>
