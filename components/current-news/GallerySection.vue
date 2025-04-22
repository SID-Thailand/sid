<script setup lang="ts">
interface iProps {
  blok: any
}

defineProps<iProps>()
</script>

<template>
  <div class="gallery">
    <CustomImage
      v-for="img in blok.images"
      :key="img.id"
      :src="img.filename"
      :alt="img.alt"
      class="gallery__img"
    />
  </div>
</template>

<style scoped lang="scss">
.gallery {
}
.gallery__img {
  display: block;
  width: 700px;
  height: 700px;
}
</style>
