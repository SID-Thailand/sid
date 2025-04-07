<script setup lang="ts">
interface IProps {
  url: string
  videoAttributes?: Record<string, string>
}

defineProps<IProps>()
</script>

<template>
  <div class="video">
    <video
      lazy
      loop
      muted
      playsinline="true"
      preload="metadata"
      v-bind="videoAttributes"
    >
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped lang="scss">
.video {
  video {
    display: block;
    max-width: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;

    @media (max-width: $br3) {
      aspect-ratio: 1;
    }
  }
}
</style>
