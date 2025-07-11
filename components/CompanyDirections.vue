<script setup lang="ts">
import type { iCompanyDirections } from '~/types/story'

interface IProps {
  content: iCompanyDirections
}

defineProps<IProps>()
</script>

<template>
  <section class="cd container">
    <div class="cd__wrapper">
      <div class="cd__title-wrapper">
        <h2 class="cd__title">{{ content?.title }}</h2>
      </div>
      <div class="cd__block">
        <ul v-if="content?.directions?.length" class="cd__list">
          <li
            v-for="item in content?.directions"
            :key="item?._uid"
            class="cd__item cd-item"
          >
            <h3 class="cd-item__title">{{ item?.title }}</h3>
            <CustomImage
              v-if="item?.asset?.filename"
              class="cd-item__asset"
              :src="item?.asset?.filename"
              :alt="item?.asset?.alt"
            />
            <p class="cd-item__text">
              {{ item?.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cd {
  position: relative;
  height: 100%;
  padding-top: vw(40);
  padding-bottom: vw(200);

  background-color: var(--neutral-600);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 48px;
  }
}

.cd__title-wrapper {
  margin-bottom: 60px;
  @media (min-width: $br2) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: vw(200);
  }
}

.cd__title {
  line-height: 1em;
  text-transform: uppercase;
  @include heading-h1;

  @media (min-width: $br1) {
    width: vw(936);
  }
}

.cd__block {
  position: relative;
}

.cd__list {
  display: flex;
  flex-direction: column;
  gap: vw(78);
  @media (max-width: $br2) {
    gap: 60px;
  }
}

.cd-item {
  border-top: 1px solid var(--neutral-300);
  padding-top: vw(48);
  display: flex;
  @media (max-width: $br2) {
    flex-direction: column;
    padding-top: 16px;
  }
}
.cd-item__title {
  text-transform: uppercase;
  @include heading-h6;
  @media (min-width: $br2) {
    width: vw(383);
    margin-right: vw(20);
  }
}
.cd-item__asset {
  width: vw(324);
  aspect-ratio: 324/246;
  object-fit: cover;

  @media (max-width: $br2) {
    margin-top: 20px;
    width: 100%;
  }
}
.cd-item__text {
  @include text-t3;
  @media (min-width: $br2) {
    width: vw(555);
    margin-left: vw(80);
  }

  @media (max-width: $br2) {
    margin-top: 24px;
  }
}
</style>
