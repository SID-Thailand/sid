<script setup lang="ts">
import type { iConsultingDifference } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingDifference
}

defineProps<IProps>()

const isMobile = useSSRMediaQuery('(max-width: 860px)')
</script>

<template>
  <section class="cons-diff">
    <div class="cons-diff__wrapper">
      <div class="cons-diff__title-wrapper container">
        <h2 class="cons-diff__title">
          {{ content?.title }}
        </h2>
      </div>
    </div>
    <ConsultingDifferenceSectionMobile v-if="isMobile" :content="content" />
    <ConsultingDifferenceSectionDesktop v-else :content="content" />
  </section>
</template>

<style scoped lang="scss">
.cons-diff__title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: vw(110);
  padding-bottom: vw(110);
  background-color: var(--neutral-600);
  color: var(--neutral-200);

  @media (max-width: $br1) {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}
.cons-diff__title {
  text-align: center;
  text-transform: uppercase;
  @include heading-h3;

  @media (min-width: $br1) {
    max-width: vw(880);
  }
}
</style>
