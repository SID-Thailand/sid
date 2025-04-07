<script lang="ts" setup>
import { useFooterStory } from '~/composables/stories/footerStory'
import { LucideArrowUpRight } from 'lucide-vue-next'

const { story } = await useFooterStory()
</script>

<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <div class="footer__content">
        <ul class="footer__list">
          <li class="footer__item">
            <h3 class="footer__label">
              {{ story?.content?.contacts?.content?.items[0]?.title }}:
            </h3>
            <p class="footer__text">
              {{ story?.content?.contacts?.content?.items[0]?.item[0]?.label }}
            </p>
          </li>
          <li class="footer__item">
            <h3 class="footer__label">
              {{ story?.content?.contacts?.content?.items[1]?.title }}
            </h3>
            <a
              :href="
                story?.content?.contacts?.content?.items[1]?.item[0]?.link?.url
              "
              target="_blank"
              rel="noopener noreferrer"
              class="footer__text underline-reverse"
            >
              {{ story?.content?.contacts?.content?.items[1]?.item[0]?.label }}
            </a>
          </li>
        </ul>
        <ul class="footer__list">
          <li class="footer__item">
            <h3 class="footer__label">
              {{ story?.content?.contacts?.content?.items[2]?.title }}
            </h3>
            <a
              :href="
                'mailto:' +
                story?.content?.contacts?.content?.items[2]?.item[0]?.link?.url
              "
              target="_blank"
              class="footer__text underline-reverse"
            >
              {{ story?.content?.contacts?.content?.items[2]?.item[0]?.label }}
            </a>
          </li>
          <li class="footer__item">
            <h3 class="footer__label">
              {{ story?.content?.contacts?.content?.items[3]?.title }}
            </h3>
            <a
              :href="
                'tel:' +
                story?.content?.contacts?.content?.items[3]?.item[0]?.label
              "
              class="footer__text underline-reverse"
            >
              {{ story?.content?.contacts?.content?.items[3]?.item[0]?.label }}
            </a>
          </li>
          <li class="footer__item">
            <h3 class="footer__label">
              {{ story?.content?.contacts?.content?.items[4]?.title }}:
            </h3>
            <a
              v-for="(item, idx) in story?.content?.contacts?.content?.items[4]
                .item"
              :key="idx"
              target="_blank"
              rel="noopener noreferrer"
              :href="item?.link?.url"
              class="footer__text underline-reverse"
            >
              {{ item?.label }}
            </a>
          </li>
        </ul>
        <form class="footer__form">
          <legend class="footer__title">
            {{ story?.content?.newsletter_title }}
          </legend>
          <FooterField
            class="footer__input"
            :label="story?.content?.email_label"
          />
          <Button type="submit" class="footer__form-btn">
            {{ story?.content?.button }}
            <LucideArrowUpRight />
          </Button>
        </form>
      </div>
      <div class="footer__bottom">
        <p class="footer__small-text">SID COMPANY</p>
        <p class="footer__small-text">ALL RIGHTS RESERVED</p>
        <p class="footer__small-text">MADE BY GROWDIENT</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer__wrapper {
  padding: vw(40) 0;

  @media (max-width: $br1) {
    padding: 24px 0;
  }
}

.footer__content {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}

.footer__list {
  display: flex;
  flex-direction: column;
  row-gap: vw(30);

  &:nth-of-type(1) {
    @media (min-width: $br1) {
      @include col(1, 6);
    }
  }
  &:nth-of-type(2) {
    @media (min-width: $br1) {
      @include col(7, 12);
    }

    @media (max-width: $br1) {
      margin-top: 60px;
    }
  }
}

.footer__item {
  display: flex;
  flex-direction: column;
  row-gap: vw(6);
  text-transform: uppercase;

  @media (max-width: $br1) {
    row-gap: 6px;
  }
}

.footer__label {
  width: fit-content;
  position: relative;
  color: var(--neutral-300);
  @include subheading-h5;
}

.footer__text {
  width: fit-content;
  position: relative;
  color: var(--basic-white);
  @include subheading-h5;
}

.footer__form {
  @media (min-width: $br1) {
    @include col(13, 24);
  }

  @media (max-width: $br1) {
    margin-top: 60px;
    width: 100%;
  }
}

.footer__title {
  text-transform: uppercase;
  max-width: vw(290);
  @include subheading-h1;

  @media (max-width: $br1) {
    max-width: 90%;
  }
}

.footer__input {
  margin-top: vw(70);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.footer__form-btn {
  margin-top: vw(48);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.footer__bottom {
  text-transform: uppercase;
  color: var(--neutral-300);
  margin-top: vw(200);
  @include subheading-h5;

  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 60px;
  }
}

.footer__small-text {
  &:nth-of-type(1) {
    @media (min-width: $br1) {
      @include col(1, 6);
    }
  }
  &:nth-of-type(2) {
    @media (min-width: $br1) {
      @include col(7, 12);
    }

    @media (max-width: $br1) {
      margin-top: 2px;
    }
  }
  &:nth-of-type(3) {
    @media (min-width: $br1) {
      @include col(13, 24);
      justify-self: end;
    }

    @media (max-width: $br1) {
      margin-top: 18px;
    }
  }
}
</style>
