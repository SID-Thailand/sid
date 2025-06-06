<script setup lang="ts">
import type { CustomVideo } from '~/types/story'

interface IProps {
  asset: CustomVideo
  title?: string
  description?: string
}

defineProps<IProps>()

const isPlaying = ref(true)

const isFullscreen = ref(false)

const toggleFullScreen = () => {
  isFullscreen.value = true
}
</script>

<template>
  <div class="interview">
    <div class="interview__video-wrapper">
      <EmbedVideo
        v-if="asset?.embed_link"
        :url="asset?.embed_link"
        :width="asset?.embed_width"
        :height="asset?.embed_height"
      />
      <CustomVideo
        v-else
        :video-attributes="{
          preload: 'auto',
        }"
        :url="asset?.asset?.filename"
        :is-playing="isPlaying"
        :is-fullscreen="isFullscreen"
        class="interview__video"
        @fullscreen="isFullscreen = $event"
      />
      <button
        v-if="!asset?.embed_link"
        type="button"
        class="interview__play-btn"
        aria-label="Open video in fullscreen"
        @click="toggleFullScreen"
      >
        <IconsPlay />
      </button>
    </div>
    <h4 v-if="title" class="interview__title">
      {{ title }}
    </h4>
    <p v-if="description" class="interview__description">
      {{ description }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.interview {
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: $br1) {
    margin-left: auto;
    margin-right: 0;
    max-width: vw(555);
  }

  @media (max-width: $br1) {
    width: 100%;
    margin-top: 60px;
  }
}

.interview__video-wrapper {
  position: relative;
}

.interview__video {
  display: block;
  width: 100%;

  @media (max-width: $br1) {
    width: 100%;
  }
}

.interview__play-btn {
  position: absolute;
  bottom: vw(20);
  right: vw(20);
  background-color: var(--basic-black);
  width: vw(48);
  height: vw(48);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: var(--neutral-600);
    transform: scale(0.9);
  }

  svg {
    position: relative;
    left: vw(2);
    width: vw(15);
    height: vw(15);

    @media (max-width: $br1) {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: $br1) {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }
}

.interview__title {
  text-transform: uppercase;
  margin-top: vw(20);
  line-height: 1.25em !important;
  @include subheading-h5;
}

.interview__description {
  color: var(--neutral-300);
  text-transform: uppercase;
  line-height: 1.25em !important;
  @include subheading-h5;
}
</style>
