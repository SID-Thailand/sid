<script lang="ts" setup>
import type { iProjectAbout } from '~/types/story'

interface IProps {
  content: iProjectAbout
}

defineProps<IProps>()
</script>

<template>
  <section class="project-about">
    <div class="project-about__wrapper container">
      <h2 class="project-about__text">
        {{ content?.text }}
      </h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-about {
  background-color: var(--neutral-100);
  color: var(--basic-black);
  padding: vw(200) 0;

  @media (max-width: $br1) {
    padding: 100px 0;
  }
}

.project-about__text {
  text-transform: uppercase;
  text-align: center;
  max-width: vw(1336);
  @include heading-h3;
}
</style>
