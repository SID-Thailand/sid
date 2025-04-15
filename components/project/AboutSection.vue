<script lang="ts" setup>
import type { iProjectAbout } from '~/types/story'

interface IProps {
  content: iProjectAbout
}

const props = defineProps<IProps>()

const blocks = computed(() => {
  return props.content?.content?.content?.flatMap(block => block.content)
})
</script>

<template>
  <section class="project-about">
    <div class="project-about__wrapper container">
      <p class="project-about__text-flow">
        <template v-for="(block, idx) in blocks" :key="idx">
          <template v-if="block?.type === 'text'">
            {{ block.text }}
          </template>
          <template v-else-if="block?.type === 'image'">
            <span class="inline-img">
              <CustomImage
                :src="block?.attrs?.src"
                :alt="block?.attrs?.alt || ''"
              />
            </span>
          </template>
        </template>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-about {
  background-color: var(--neutral-100);
  color: var(--basic-black);
  padding: vw(200) 0;

  @media (max-width: $br1) {
    padding: 100px 0;
  }
}

.project-about__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: $br1) {
    column-gap: vw(12);
  }
}

.project-about__text-flow {
  text-align: center;
  text-transform: uppercase;
  @include heading-h3;

  .inline-img {
    display: inline-block;

    &:first-child {
      vertical-align: text-bottom;
      margin-right: vw(12);
    }

    &:last-child {
      vertical-align: text-top;
      margin-top: vw(12);
    }

    img {
      height: vw(160);
      width: auto;
      display: inline-block;
    }

    @media (max-width: $br1) {
      display: none;
    }
  }
}
</style>
