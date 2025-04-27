<script lang="ts" setup>
import type { iNewsContent } from '~/types/newsTypes'
import type { iStory } from '~/types/story'
import formatDate from '~/utils/formatDate'

interface iProps {
  news: iStory<iNewsContent>[]
  title?: string
}

const props = defineProps<iProps>()

const isMobile = useMediaQuery('(max-width: 860px)')

const maxCards = computed(() => {
  return isMobile.value ? 4 : 8
})

const offset = ref(0)

const allNews = computed(() => props.news ?? [])

const slicedNews = computed(() => {
  return allNews.value.slice(0, maxCards.value + offset.value)
})

const viewMoreHandler = () => {
  offset.value += maxCards.value
}
</script>

<template>
  <div class="news-list">
    <div class="news-list__wrapper container">
      <h2 v-if="title" class="news-list__main-title">
        {{ title }}
      </h2>
      <div class="news-list__list-wrapper">
        <ul class="news-list__list">
          <li
            v-for="(currNews, idx) in allNews"
            v-show="slicedNews.includes(currNews)"
            :key="idx"
            class="news-list__card"
          >
            <NuxtLink :to="`/${currNews?.full_slug}`" class="news-list__link">
              <div class="news-list__link-wrapper">
                <CustomImage
                  :src="currNews?.content?.asset?.filename"
                  :alt="currNews?.content?.asset?.alt"
                  class="news-list__img"
                />
                <div class="news-list__info">
                  <p class="news-list__category">
                    {{ currNews?.content?.category?.content?.name }}
                  </p>
                  <h3 class="news-list__title">
                    {{ currNews?.content?.title }}
                  </h3>
                  <p class="news-list__date">
                    {{ formatDate(currNews?.first_published_at) }}
                  </p>
                </div>
              </div>
              <div class="news-list__plus">
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

        <Button
          v-if="allNews.length > maxCards && allNews.length > slicedNews.length"
          class="news-list__btn"
          type="button"
          @click="viewMoreHandler"
        >
          <span>{{ 'MORE' }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.news-list {
  background: var(--neutral-600);
  color: var(--basic-white);
  padding-top: vw(100);
  padding-bottom: vw(112);

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

.news-list__wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: vw(100);

  @media (max-width: $br1) {
    row-gap: 40px;
  }
}

.news-list__main-title {
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

.news-list__list-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: $br3) {
    padding-right: 16px;
    padding-left: 16px;
    margin-left: -16px;
  }
}

.news-list__list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: vw(20);
  grid-auto-flow: row;

  @media (max-width: $br1) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
  }
  @media (max-width: $br3) {
    grid-template-columns: 1fr;
  }
}

.news-list__card {
  width: 100%;
  grid-column: span 1;
  min-width: 0;
  min-height: 0;
}

.news-list__link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: var(--neutral-400);
  padding: vw(16);
  height: 100%;
  flex-grow: 1;
  width: 100%;

  @media (max-width: $br1) {
    padding: 16px;
  }
}

.news-list__link-wrapper {
  width: 100%;
}

.news-list__img {
  width: 100%;
  height: vw(292);
  object-fit: cover;

  @media (max-width: $br1) {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
  }
}

.news-list__info {
  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.news-list__category {
  color: var(--neutral-300);
  text-transform: lowercase;
  @include text-t4;
}

.news-list__title {
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

.news-list__date {
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

.news-list__plus {
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

.news-list__btn {
  margin-top: vw(100);
}
</style>
