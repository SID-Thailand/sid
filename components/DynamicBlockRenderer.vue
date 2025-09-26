<script setup lang="ts">
import CustomVideo from './current-news/CustomVideo.vue'
import GallerySection from './current-news/GallerySection.vue'
import NewsSection from './current-news/NewsSection.vue'
import TextOnAssetSection from './current-news/TextOnAssetSection.vue'

interface iProps {
  blocks: any[]
  isPrivacy?: boolean
}

const props = defineProps<iProps>()

const resolveSectionByName = (name: string) => {
  const sections = {
    news_section: NewsSection,
    gallery: GallerySection,
    text_on_asset: TextOnAssetSection,
    'Custom video': CustomVideo,
  }

  return sections[name]
}

onMounted(() => {
  console.log(props.blocks)
})
</script>

<template>
  <section v-for="blok in blocks" :key="blok._uid" class="news-section">
    <component
      :is="resolveSectionByName(blok?.component)"
      v-if="resolveSectionByName(blok?.component)"
      v-editable="blok?.content"
      :blok="blok"
      :is-privacy="isPrivacy"
    />
    <div v-else>
      <p>Unknown component: {{ blok?.component }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-section {
  margin-top: vw(100);
  margin-bottom: vw(100);

  @media (max-width: $br1) {
    margin-top: 48px;
    margin-bottom: 48px;
  }
}
</style>
