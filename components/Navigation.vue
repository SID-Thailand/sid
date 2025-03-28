<script lang="ts" setup>
const emit = defineEmits(['close'])
const links = [
  {
    title: 'our projects',
    link: '/projects',
  },
  {
    title: 'about us',
    link: '/about',
  },
  {
    title: 'consulting',
    link: '/consulting',
  },
  {
    title: 'news',
    link: '/news',
  },
  {
    title: 'contact',
    link: '/contact',
  },
]
</script>

<template>
  <nav class="navigation">
    <NuxtLink
      v-for="(item, idx) in links"
      :key="idx"
      :to="item.link"
      class="navigation__link"
      @click="emit('close')"
    >
      {{ item.title }}
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;

  .router-link-active {
    color: var(--basic-white);
  }
}

.navigation__link {
  @include med;
  color: var(--neutral-300);
  transition: color 0.3s ease;
  font-size: vw(88);
  line-height: 1em;
  text-align: center;

  @media (max-width: $br1) {
    font-size: size(88, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }

  &:hover {
    color: var(--basic-white);
  }
}
</style>
