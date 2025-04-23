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

<style scoped lang="scss"></style>
