<script lang="ts" setup>
import type { iProjectFacilities } from '~/types/story'

interface IProps {
  content: iProjectFacilities
}

const props = defineProps<IProps>()

console.log(props.content)
</script>

<template>
  <section class="project-facilities">
    <div class="project-facilities__wrapper container">
      <div class="project-facilities__top">
        <p class="project-facilities__subtitle">
          {{ content?.subtitle }}
        </p>
        <h2 class="project-facilities__title">
          {{ content?.title }}
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-facilities {
  position: relative;
  padding: vw(40) 0;
  background-color: var(--neutral-100);
  color: var(--basic-black);

  @media (max-width: $br1) {
    padding: 24px 0;
  }
}

.project-facilities__top {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  column-gap: vw(20);
  grid-auto-flow: row;
  width: 100%;

  @media (max-width: $br1) {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
  }
}

.project-facilities__subtitle {
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  @include med;

  @media (min-width: $br1) {
    @include col(1, 8);
  }

  @media (max-width: $br1) {
    font-size: size(20, 14);
    @include col(1, 4);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.project-facilities__title {
  font-size: vw(50);
  line-height: 1em;
  text-transform: uppercase;
  max-width: vw(630);
  @include med;

  @media (min-width: $br1) {
    @include col(13, 24);
  }

  @media (max-width: $br1) {
    @include col(1, 4);
    max-width: 100%;
    margin-top: 40px;
    font-size: size(50, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}
</style>
