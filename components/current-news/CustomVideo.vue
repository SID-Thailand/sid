<script lang="ts" setup>
import type { CustomVideo as CustomVideoType } from '~/types/story'
import CustomVideo from '../CustomVideo.vue'

interface iProps {
  blok: CustomVideoType
}

const props = defineProps<iProps>()

onMounted(() => {
  console.log(props.blok)
})

const asset = computed(() => props.blok)
</script>

<template>
  <div v-if="asset" class="news-custom-video">
    <div class="curr-news-content">
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
        :is-playing="true"
        class="interview__video"
      />
    </div>
  </div>
</template>
