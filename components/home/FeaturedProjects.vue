<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next'
import type { iHomeFeaturedProjects } from '~/types/story'

interface IProps {
  content: iHomeFeaturedProjects
}

defineProps<IProps>()

const activeProject = ref(0)
</script>

<template>
  <section class="featured-projects">
    <div class="featured-projects__scroll-wrapper">
      <div class="featured-projects__content">
        <CustomImage
          :src="
            content?.featured_projects[activeProject]?.content?.cover?.filename
          "
          :alt="content?.featured_projects[activeProject]?.content?.cover?.alt"
          class="featured-projects__bg"
        />
        <div class="featured-projects__card fpc">
          <div class="fpc__assets">
            <div
              v-for="(item, idx) in content?.featured_projects"
              :key="idx"
              class="fpc__image-item"
            >
              <div class="fpc__img-wrapper">
                <CustomImage
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="fpc__img"
                />
              </div>
            </div>
          </div>
          <div class="fpc__specs-wrapper">
            <div
              v-for="(item, idx) in content?.featured_projects"
              :key="idx"
              class="fpc__specs"
            >
              <h2 class="fpc__title">
                {{ item?.content?.name }}
              </h2>
              <div class="fpc__spec">{{ item?.content?.spec_1 }}</div>
              <div class="fpc__spec">{{ item?.content?.spec_2 }}</div>
              <div class="fpc__spec">{{ item?.content?.spec_3 }}</div>
              <NuxtLink :to="`/${item.full_slug}`" class="fpc__link"
                ><LucidePlus
              /></NuxtLink>
            </div>
          </div>
        </div>
        <div class="featured-projects__text">
          <h2 class="featured-projects__title">{{ content?.title }}</h2>
          <div class="featured-projects__desc">{{ content?.text }}</div>
          <NuxtLink
            class="featured-projects__link underline-reverse"
            to="/projects/"
            >{{ content?.button_text }}</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.featured-projects {
  position: relative;
}

.featured-projects__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.featured-projects__scroll-wrapper {
  position: relative;
  height: 300vh;
}

.featured-projects__content {
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: vh(100) 0;
  padding-left: vw(155);
  padding-right: vw(97);
}

.fpc {
  width: vh(496);
  height: vh(684);
  background-color: var(--neutral-400);
  position: relative;
  z-index: 2;
  padding: vw(16);
  display: flex;
  flex-direction: column;
}

.fpc__assets {
  flex: 0 1 auto;

  position: relative;
  height: 100%;
}

.fpc__image-item {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  &:first-child {
    position: relative;
    opacity: 1;
  }
}

.fpc__img-wrapper {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.fpc__specs-wrapper {
  position: relative;
  flex: 1 0 auto;
}

.fpc__specs {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  margin-top: vw(24);

  &:first-child {
    position: relative;
    opacity: 1;
  }
}

.fpc__title {
  text-transform: uppercase;
  margin-bottom: vw(16);
  @include subheading-h2;
}

.fpc__spec {
  color: var(--neutral-200);
  @include text-t4;
}

.fpc__link {
  display: block;
  color: var(--accent-primary);
  margin-top: vw(16);
}

.featured-projects__text {
  width: vw(440);
  position: relative;
  z-index: 2;
}

.featured-projects__title {
  text-transform: uppercase;
  @include heading-h3;
  @media (max-width: $br1) {
    display: none;
  }
}
.featured-projects__desc {
  margin-top: vw(16);
  @include text-t3;
}

.featured-projects__link {
  position: relative;
  width: fit-content;
  display: block;
  text-transform: uppercase;
  margin-top: vw(48);
  @include caption-c1;

  @media (max-width: $br1) {
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
