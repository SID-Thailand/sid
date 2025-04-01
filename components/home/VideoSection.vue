<script setup lang="ts">
import type { iHomeVideo } from '~/types/story'

interface IProps {
  content: iHomeVideo
}

defineProps<IProps>()
</script>

<template>
  <section class="video container">
    <div class="video__wrapper">
      <DoubleVideo
        :title="content?.title"
        :asset="content?.asset"
        :address-text="content?.address"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.video {
  background-color: var(--neutral-500);
}
</style>
