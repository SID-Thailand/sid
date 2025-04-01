<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  title: string
  asset: iImage
}

defineProps<IProps>()
</script>

<template>
  <section class="d-video">
    <div class="d-video__wrapper">
      <h2 class="d-video__title">{{ title }}</h2>
      <div class="d-video__videos">
        <div class="d-video__landscape">
          <CustomVideo :url="asset.filename" />
        </div>
        <div class="d-video__phone">
          <CustomVideo :url="asset.filename" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.d-video {
}
.d-video__wrapper {
}
.d-video__title {
}
.d-video__videos {
}
.d-video__landscape {
}
.d-video__phone {
}
</style>
