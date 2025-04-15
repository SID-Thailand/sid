<script setup lang="ts">
import type { iAboutMission } from '~/types/aboutTypes'

interface IProps {
  content: iAboutMission
}

defineProps<IProps>()
</script>

<template>
  <section class="ab-mission container">
    <div class="ab-mission__wrapper">
      <p class="ab-mission__subtitle">
        {{ content?.subtitle }}
      </p>

      <div class="ab-mission__title-wrapper">
        <CustomImage
          v-for="(img, idx) in content?.assets"
          :key="idx"
          :src="img?.filename"
          :alt="img?.alt"
          class="app-projects__img"
        />
        <h2 class="ab-mission__title">
          {{ content?.title }}
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ab-mission {
  color: var(--basic-black);
  background-color: var(--neutral-100);
  padding-top: vw(133);
  padding-bottom: vw(296);

  @media (max-width: $br1) {
    padding-top: 100px;
    padding-bottom: 90px;
  }
}

.ab-mission__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.ab-mission__subtitle {
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  text-align: center;
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.ab-mission__title-wrapper {
  position: relative;
}

.app-projects__img {
  position: absolute;
  display: block;
  object-fit: cover;

  &:nth-child(1) {
    top: vw(110);
    left: vw(365);
    width: vw(210);
    height: vw(140);
    z-index: 3;
  }
  &:nth-child(2) {
    right: vw(480);
    bottom: vw(-180);
    width: vw(154);
    height: vw(230);
    z-index: 1;
  }
  &:nth-child(3) {
    top: vw(-30);
    right: vw(140);
    width: vw(153);
    height: vw(153);
    z-index: 1;
  }
  &:nth-child(4) {
    left: 0;
    bottom: vw(-28);
    width: vw(153);
    height: vw(153);
    z-index: 3;
  }

  @media (max-width: $br1) {
    display: none;
  }
}

.ab-mission__title {
  position: relative;
  font-size: vw(88);
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
  max-width: vw(1220);
  z-index: 2;
  margin-top: vw(40);
  @include med;

  @media (max-width: $br1) {
    font-size: size(88, 36);
    margin-top: 16px;
    max-width: 100%;
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}
</style>
