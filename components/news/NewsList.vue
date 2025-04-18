<script lang="ts" setup>
import type { iNewsContent } from '~/types/newsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  news: iStory<iNewsContent>[]
}

const props = defineProps<iProps>()

const isMobile = useMediaQuery('(max-width: 860px)')
const showAll = ref(false)

const allNews = computed(() => props.news ?? [])

const visibleNews = computed(() => {
  if (isMobile.value) return allNews.value
  return showAll.value ? allNews.value : allNews.value.slice(0, 8)
})
</script>

<template>
  <div class="news-list">
    <div class="news-list__wrapper container">
      <div class="news-list__list-wrapper">
        <ul class="news-list__list">
          <li
            v-for="(currNews, idx) in visibleNews"
            :key="idx"
            class="news-list__card"
          >
            <NuxtLink :to="`/${currNews?.full_slug}`" class="news-list__link">
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
              </div>
            </NuxtLink>
          </li>
        </ul>

        <Button
          v-if="allNews.length > 8"
          class="news-list__btn"
          type="button"
          @click="showAll = !showAll"
        >
          <span>{{ showAll ? 'LESS' : 'MORE' }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-list {
  background: var(--neutral-600);
  color: var(--basic-white);
  padding-top: vw(40);
  padding-bottom: vw(112);

  @media (max-width: $br1) {
    padding-top: 24px;
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

.news-list__list-wrapper {
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

.news-list__list {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    align-items: center;
    min-width: max-content;
    column-gap: 16px;
  }
}

.news-list__link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--neutral-400);
  padding: vw(16);
  row-gap: vw(16);

  @media (max-width: $br1) {
    padding: 16px;
    row-gap: 24px;
  }
}

.news-list__img {
  height: 100%;
  width: 100%;
  aspect-ratio: 292 / 292;
  object-fit: cover;

  @media (max-width: $br1) {
    aspect-ratio: 268 / 268;
    height: 268px;
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

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
