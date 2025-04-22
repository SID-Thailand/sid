<script setup lang="ts">
import GallerySection from './current-news/GallerySection.vue'
import NewsSection from './current-news/NewsSection.vue'
import TextOnAssetSection from './current-news/TextOnAssetSection.vue'

interface iProps {
  blocks: any[]
}

defineProps<iProps>()

const resolveSectionByName = (name: string) => {
  const sections = {
    news_section: NewsSection,
    gallery: GallerySection,
    text_on_asset: TextOnAssetSection,
  }

  return sections[name]
}
</script>

<template>
  <section v-for="blok in blocks" :key="blok._uid">
    <component
      :is="resolveSectionByName(blok?.component)"
      v-if="resolveSectionByName(blok?.component)"
      v-editable="blok?.content"
      :blok="blok"
    />
    <div v-else>
      <p>Unknown component: {{ blok?.component }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
