<script setup lang="ts">
interface iProps {
  blok: any
}

defineProps<iProps>()
</script>

<template>
  <div class="text-asset">
    <CustomImage
      :src="blok?.asset?.filename"
      :alt="blok?.asset?.alt"
      class="text-asset__img"
    />
    <p class="text-asset__text">{{ blok?.text }}</p>
  </div>
</template>

<style scoped lang="scss">
.text-asset {
  position: relative;
  margin: vw(100) 0;
  aspect-ratio: 16 / 9;

  @media (max-width: $br1) {
    margin: 48px 0;
  }
}

.text-asset__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-asset__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--basic-white);
  font-size: vw(80);
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  max-width: vw(582);

  @media (max-width: $br1) {
    max-width: 90%;
    font-size: size(80, 32);
  }

  @media (max-width: $br4) {
    font-size: 32px;
  }
}
</style>
