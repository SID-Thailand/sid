<script setup lang="ts">
import type { ISbRichtext } from 'storyblok-js-client'

interface iProps {
  blok: {
    content: ISbRichtext
  }
  isPrivacy: boolean
}

defineProps<iProps>()
</script>

<template>
  <div
    class="curr-news-content container"
    :class="{ 'privacy-content': isPrivacy }"
  >
    <RichText :text="blok.content" />
  </div>
</template>

<style lang="scss">
.curr-news-content {
  @media (min-width: $br1) {
    max-width: vw(670);
    margin: 0 auto;
    padding: 0 0;
  }

  @media (max-width: $br1) {
    max-width: 70%;

    &:has(img) {
      max-width: 100%;
    }
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
    margin: 0 auto;
    display: block;
    width: auto;
    max-width: 100%;
    height: vw(448);
    object-fit: cover;

    @media (max-width: $br1) {
      width: 100%;
      height: auto;
      margin: 0 auto;
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

  :is(h1, h2, h3, h4, h5, h6) + :is(h1, h2, h3, h4, h5, h6) {
    margin-top: vw(32);

    @media (max-width: $br1) {
      margin-top: 16px;
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

  p + ul,
  ul + p {
    margin-top: vw(16);

    @media (max-width: $br1) {
      margin-top: 18px;
    }
  }

  .center-text {
    text-align: center;
    display: inline-block;
  }

  ul {
    li {
      position: relative;
      margin-left: vw(4);
      padding-left: vw(14);

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        @include text-t3;
      }

      @media (max-width: $br1) {
        margin-left: 4px;
        padding-left: 14px;
      }
    }

    li + li {
      margin-top: vw(16);

      @media (max-width: $br1) {
        margin-top: 18px;
      }
    }
  }
}

.privacy-content {
  padding: 0;
  p {
    @media (max-width: $br1) {
      color: var(--neutral-200);
    }
  }

  h2 {
    position: relative;
    text-transform: uppercase;
    font-size: vw(40);
    line-height: 1em;
    color: var(--basic-white);
    width: 100% !important;
    transform: none;
    left: auto;
    padding: 0;
    text-align: left;

    @media (max-width: $br1) {
      font-size: size(40, 24);
      line-height: 1.17em;
    }

    @media (max-width: $br4) {
      font-size: 24px;
    }
  }

  @media (max-width: $br1) {
    max-width: 100%;
  }
}
</style>
