<script lang="ts" setup>
import type { iApartment } from '~/types/currentProjectTypes'

interface IProps {
  apartment: iApartment
}

defineProps<IProps>()
</script>

<template>
  <div class="interior-apart__content">
    <h3 class="interior-apart__name">
      {{ apartment?.name }}
    </h3>
    <p class="interior-apart__desc">
      {{ apartment?.price }}
    </p>
    <div class="interior-apart__about">
      <div class="interior-apart__about-wrapper">
        <div class="interior-apart__line" />
        <div class="interior-apart__about-content">
          <p class="interior-apart__title">Area</p>
          <p class="interior-apart__text">{{ apartment?.area }}</p>
        </div>
      </div>
      <div class="interior-apart__about-wrapper">
        <div class="interior-apart__line" />
        <div class="interior-apart__about-content">
          <p class="interior-apart__title">Info</p>
          <p class="interior-apart__text">{{ apartment?.info }}</p>
        </div>
      </div>
      <div class="interior-apart__about-wrapper">
        <div class="interior-apart__line" />
        <div class="interior-apart__about-content">
          <p class="interior-apart__title">Plan</p>
          <a
            v-if="apartment?.plan?.[0]"
            :href="apartment.plan[0]?.link?.url"
            target="_blank"
            rel="noopener noreferrer"
            class="interior-apart__text underline-reverse"
          >
            {{ apartment.plan[0]?.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
