<script lang="ts" setup>
import type { iMenuSocial } from '~/types/menuTypes'

interface iProps {
  socials: iMenuSocial[]
}

defineProps<iProps>()
</script>

<template>
  <ul class="socials">
    <li v-for="(item, idx) in socials" :key="idx" class="socials__item">
      <a
        :href="item?.link?.url"
        target="_blank"
        rel="noopener noreferrer"
        class="socials__link underline-reverse"
      >
        {{ item?.label }}
      </a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.socials {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  margin-top: vw(80);

  @media (min-width: $br1) {
    column-gap: vw(80);
  }

  @media (max-width: $br1) {
    flex-direction: column;
    row-gap: 16px;
    margin-top: 80px;
  }
}

.socials__link {
  position: relative;
  @include subheading-h6;
}
</style>
