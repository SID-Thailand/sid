<script lang="ts" setup>
import type { iApartment } from '~/types/story'

interface IProps {
  apartment: iApartment
}

defineProps<IProps>()
</script>

<template>
  <div class="interior-apart">
    <ul class="interior-apart__img-list">
      <li
        v-for="(img, idx) in apartment?.assets"
        :key="idx"
        class="interior-apart__img-item"
      >
        <CustomImage
          :src="img?.filename"
          :alt="img?.alt"
          class="iterior-apart__img"
        />
      </li>
    </ul>
    <div class="interior-apart__content">
      <h3 class="interior-apart__name">
        {{ apartment?.name }}
      </h3>
      <p class="interior-apart__desc">
        {{ apartment?.price }}
      </p>
      <div class="interior-apart__about">
        <div class="interior-apart__about-item">
          <div class="interior-apart__line" />
          <p class="interior-apart__title">Area</p>
          <p class="interior-apart__text">{{ apartment?.area }}</p>
        </div>
        <div class="interior-apart__about-item">
          <div class="interior-apart__line" />
          <p class="interior-apart__title">Info</p>
          <p class="interior-apart__text">{{ apartment?.info }}</p>
        </div>
        <div class="interior-apart__about-item">
          <div class="interior-apart__line" />
          <p class="interior-apart__title">Plan</p>
          <a
            :href="apartment?.plan[0]?.link?.url"
            target="_blank"
            rel="noopener noreferrer"
            class="interior-apart__text"
          >
            {{ apartment?.area }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
