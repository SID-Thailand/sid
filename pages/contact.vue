<script lang="ts" setup>
import FormSection from '~/components/contacts/FormSection.vue'
import HeroSection from '~/components/contacts/HeroSection.vue'
import { useContactStory } from '~/composables/stories/contactStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useContactStory()

const meta = computed(() => {
  const data = story?.value?.content?.meta[0]

  if (!data) {
    return null
  }

  return {
    title: data.title,
    description: data.description,
    ogImage: data?.image?.filename,
  }
})
</script>

<template>
  <div>
    <PageMeta v-if="meta" v-bind="meta" />
    <HeroSection :content="story?.content" />
    <FormSection :content="story?.content" />
    <BookTheMeetings :cta="story?.content?.cta" page="Contact" />
  </div>
</template>

<style scoped lang="scss"></style>
