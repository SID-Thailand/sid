<script setup lang="ts">
import type { iConsultingYoutube } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingYoutube
}

defineProps<IProps>()
</script>

<template>
  <section class="cons-youtube container">
    <div class="cons-youtube__wrapper">
      <DoubleVideo
        :title="content?.title"
        :asset="content?.asset"
        :is-youtube="true"
        :button="content?.subscribe_button[0]"
        class="cons-youtube__videos"
      />
    </div>
  </section>
</template>

<style lang="scss">
.cons-youtube {
  background-color: var(--neutral-500);
  padding-top: vw(100);
  padding-bottom: vw(100);

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}
</style>
