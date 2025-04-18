<script setup lang="ts">
import { useCurrentNewsStory } from '~/composables/stories/currentNewsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string)

console.log(story.value)

const resolveSectionByName = (name: string) => {
  const sections = {}

  return sections[name]
}
</script>

<template>
  <div>
    Current News {{ params?.id }}
    <!-- <template v-for="item in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        v-editable="item"
        :content="item"
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>

    <BookTheMeetings :cta="story?.content?.cta" /> -->
  </div>
</template>
