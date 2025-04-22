<script setup lang="ts">
interface iProps {
  blok: any
}

defineProps<iProps>()
</script>

<template>
  <div v-if="blok?.images" class="gallery">
    <FullImageSlider :images="blok?.images || []" />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  margin: vw(100) 0;

  @media (max-width: $br1) {
    margin: 48px 0;
  }
}
</style>
