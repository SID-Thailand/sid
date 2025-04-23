<script setup lang="ts">
import type { ISbRichtext } from 'storyblok-js-client'

interface iProps {
  text: ISbRichtext
}

const props = defineProps<iProps>()

const richtext = computed(() => {
  try {
    return renderRichText(props.text)
  } catch {
    return ''
  }
})
</script>

<template>
  <div v-html="richtext" />
</template>
