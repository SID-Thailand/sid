<script lang="ts" setup>
import type { iNewsContent } from '~/types/newsTypes'
import type { iStory } from '~/types/story'
import formatDate from '~/utils/formatDate'

interface iProps {
  news: iStory<iNewsContent>[]
  title?: string
}

const props = defineProps<iProps>()

const allNews = computed(() => props.news ?? [])

const slicedNews = computed(() => {
  return allNews.value.slice(0, 4)
})
</script>

<template>
  <div class="other-news">
    <div class="other-news__wrapper container">
      <h2 v-if="title" class="other-news__main-title">
        {{ title }}
      </h2>
      <div class="other-news__list-wrapper">
        <ul class="other-news__list">
          <li
            v-for="(currNews, idx) in slicedNews"
            :key="idx"
            class="other-news__card"
          >
            <NuxtLink :to="`/${currNews?.full_slug}`" class="other-news__link">
              <div class="other-news__link-wrapper">
                <CustomImage
                  :src="currNews?.content?.asset?.filename"
                  :alt="currNews?.content?.asset?.alt"
                  class="other-news__img"
                />
                <div class="other-news__info">
                  <p class="other-news__category">
                    {{ currNews?.content?.category?.content?.name }}
                  </p>
                  <h3 class="other-news__title">
                    {{ currNews?.content?.title }}
                  </h3>
                  <p class="other-news__date">
                    {{ formatDate(currNews?.first_published_at) }}
                  </p>
                </div>
              </div>
              <div class="other-news__plus">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 13V23H13V13H23V11H13V1H11V11H1V13H11Z"
                    fill="url(#paint0_linear_1_2446)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_2446"
                      x1="12"
                      y1="1"
                      x2="12"
                      y2="23"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFCE7E" />
                      <stop offset="1" stop-color="#997C4B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <Button tag="nuxt-link" href="/news" class="other-news__btn">
          <span>ALL NEWS</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/ui/card-hover' as *;

.other-news {
  background: var(--neutral-600);
  color: var(--basic-white);
  padding-top: vw(100);
  padding-bottom: vw(112);

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

.other-news__wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: vw(100);

  @media (max-width: $br1) {
    row-gap: 40px;
  }
}

.other-news__main-title {
  font-size: vw(68);
  line-height: 1em;
  text-transform: uppercase;
  width: 100%;
  @include med;

  @media (min-width: $br1) {
    text-align: center;
  }

  @media (max-width: $br1) {
    font-size: size(68, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.other-news__list-wrapper {
  @media (min-width: $br1) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (max-width: $br1) {
    width: 100vw;
    overflow-x: auto;
    padding-right: 32px;
    padding-left: 32px;
    margin-left: -32px;
  }

  @media (max-width: $br3) {
    padding-right: 16px;
    padding-left: 16px;
    margin-left: -16px;
  }
}

.other-news__list {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    align-items: stretch;
    min-width: max-content;
    column-gap: 16px;
  }
}

.other-news__card {
  @media (max-width: $br1) {
    width: 300px;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
  }
}

.other-news__link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: var(--neutral-400);
  padding: vw(16);
  height: 100%;
  flex-grow: 1;
  @include card-hover('.other-news__img');

  @media (max-width: $br1) {
    padding: 16px;
  }
}

.other-news__img {
  width: 100%;
  height: vw(292);
  object-fit: cover;

  @media (max-width: $br1) {
    width: 100%;
    height: 268px;
  }
}

.other-news__info {
  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.other-news__category {
  color: var(--neutral-300);
  text-transform: lowercase;
  @include text-t4;
}

.other-news__title {
  font-size: vw(24);
  text-transform: uppercase;
  line-height: 1em;
  margin-top: vw(4);
  @include med;
  max-width: 100%;
  display: -webkit-box;
  max-width: 400px;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: $br1) {
    margin-top: 8px;
    font-size: 24px;
    line-height: 1.17em;
  }
}

.other-news__date {
  font-size: vw(16);
  line-height: 1.25em;
  text-transform: uppercase;
  margin-top: vw(20);
  @include med;

  @media (max-width: $br1) {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.29em;
  }
}

.other-news__plus {
  display: block;
  width: vw(22);
  height: vw(22);
  margin-top: vw(20);

  @media (max-width: $br1) {
    margin-top: 12px;
    width: 20px;
    height: 20px;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.other-news__btn {
  display: block;
  margin-top: vw(100);

  @media (max-width: $br1) {
    margin: 0 auto;
    margin-top: 40px;
    width: fit-content;
    padding: 25px 20px !important;
  }
}
</style>
