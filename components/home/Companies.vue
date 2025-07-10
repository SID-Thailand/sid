<script lang="ts" setup>
import type { IHomeCompanies } from '~/types/homeTypes'

interface IProps {
  content: IHomeCompanies
}

defineProps<IProps>()
</script>

<template>
  <section class="home-companies">
    <div class="container">
      <h2 class="home-companies__title">
        {{ content?.title }}
      </h2>

      <div class="home-companies__content">
        <CustomImage
          v-if="content?.asset?.filename"
          class="home-compaines__asset"
          :src="content?.asset?.filename"
        />
        <div class="home-companies__text-content">
          <p class="home-companies__text">
            {{ content?.text }}
          </p>
          <Button class="home-compaines__btn">
            <span>{{ content?.button_text }}</span>
            <IconsPlus />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-companies {
  padding-top: vw(40);
  padding-bottom: vw(160);
  @media (max-width: $br2) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.home-companies__title {
  width: 100%;

  @include heading-h2;

  @media (min-width: $br2) {
    width: vw(900);
    margin-left: auto;
  }
}

.home-companies__content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: vw(160);

  @media (max-width: $br2) {
    flex-direction: column;
    gap: 60px;
    margin-top: 60px;
  }
}
.home-compaines__asset {
  max-width: 100%;
  flex-grow: 0;
  width: vw(900);

  @media (max-width: $br2) {
    width: 100%;
  }
}

.home-companies__text-content {
  width: vw(325);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: vw(32);

  @media (max-width: $br2) {
    width: 100%;
    gap: 24px;
  }
}
.home-companies__text {
  @include text-t3;
}

.home-compaines__btn {
  width: fit-content;
}
</style>
