<script setup lang="ts">
import type { ISbRichtext } from 'storyblok-js-client'

interface iProps {
  blok: {
    content: ISbRichtext
  }
}

defineProps<iProps>()
</script>

<template>
  <div class="news-section container">
    <RichText :text="blok.content as ISbRichtext" />
  </div>
</template>

<style lang="scss">
.news-section {
  @media (min-width: $br1) {
    max-width: vw(670);
    margin: 0 auto;
    padding: 0 0;
  }

  @media (max-width: $br1) {
    max-width: 70%;
  }

  h1,
  h3,
  h4,
  h5,
  h6 {
    font-size: vw(40);
    line-height: 1.17em;
    text-transform: uppercase;
    @include med;

    @media (max-width: $br1) {
      font-size: size(40, 24);
    }

    @media (max-width: $br4) {
      font-size: 24px;
    }
  }

  h2 {
    position: relative;
    text-transform: uppercase;
    margin: vw(100) 0;
    box-sizing: border-box;
    @include heading-h3;

    @media (min-width: $br1) {
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      padding: 0 vw(40);
    }

    @media (max-width: $br1) {
      width: calc(100vw - 64px);
      margin: 48px 0;
    }

    @media (max-width: $br3) {
      width: calc(100vw - 32px);
    }
  }

  p {
    color: var(--neutral-200);
    @include text-t3;

    @media (max-width: $br1) {
      color: var(--basic-white);
    }
  }

  img {
    margin: vw(100) auto;
    display: block;
    width: auto;
    max-width: 100%;
    height: vw(448);
    object-fit: cover;

    @media (max-width: $br1) {
      height: size(448, 229);
      margin: 48px auto;
    }

    @media (max-width: $br4) {
      height: 229px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    & + p {
      margin-top: vw(32);

      @media (max-width: $br1) {
        margin-top: 16px;
      }
    }
  }

  p + h1,
  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-top: vw(32);

    @media (max-width: $br1) {
      margin-top: 16px;
    }
  }

  p + p {
    margin-top: vw(16);

    @media (max-width: $br1) {
      margin-top: 18px;
    }
  }
}
</style>
