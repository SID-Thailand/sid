<script lang="ts" setup>
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const textList = [
  {
    text: '295 units',
  },
  {
    text: '500м till Bang Tao beach',
  },
  {
    text: 'Status: Done 2021 ',
  },
]
</script>

<template>
  <section class="project-hero">
    <div class="project-hero__wrapper container">
      <img
        src="/images/project/1.png"
        alt="Project Main Image"
        class="project-hero__img"
      />
      <div class="project-hero__content">
        <h1 class="project-hero__title">Terra Grove Layan</h1>
        <ul class="project-hero__list">
          <li
            v-for="(item, idx) in textList"
            :key="idx"
            class="project-hero__item"
          >
            <p class="project-hero__text">
              {{ item?.text }}
            </p>
            <span v-if="textList.length - 1 !== idx">|</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-hero {
  position: relative;
  height: 100dvh;
}

.project-hero__wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.project-hero__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.project-hero__content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  row-gap: vw(16);

  @media (max-width: $br1) {
    row-gap: 50px;
  }
}

.project-hero__title {
  text-transform: uppercase;
  text-align: center;
  @include heading-h1;
}

.project-hero__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;

  @media (max-width: $br1) {
    gap: 20px;
  }
}

.project-hero__item {
  display: flex;
  align-items: center;
  span {
    margin: 0 vw(20);

    @media (max-width: $br1) {
      display: none;
    }
  }
}

.project-hero__text {
  font-size: vw(20);
  text-transform: uppercase;
  line-height: 1.2em;
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}
</style>
