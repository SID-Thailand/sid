<script setup lang="ts">
import type { iContactContent } from '~/types/contactTypes'

interface IProps {
  content: iContactContent
}

defineProps<IProps>()
</script>

<template>
  <section class="hero container">
    <div class="hero__title-wrapper">
      <h1 class="hero__title">
        {{ content?.title }}
      </h1>
    </div>
    <div class="hero__wrapper">
      <ul class="hero__contacts">
        <li
          v-for="(contact, idx) in content?.contacts"
          :key="idx"
          class="hero__contact"
        >
          <CustomImage
            class="hero__img"
            :src="contact?.content?.asset?.filename"
            :alt="contact?.content?.asset?.alt"
          />
          <div class="hero__block">
            <div class="hero__line" />
            <div class="hero__content">
              <div class="hero__column">
                <h2 class="hero__contact-title">
                  {{ contact?.content?.title }}
                </h2>
              </div>

              <div class="hero__column">
                <div
                  v-for="(group, index) in contact?.content?.items.slice(0, 3)"
                  :key="'left-' + index"
                  class="hero__contact-group"
                >
                  <p class="hero__group-title">{{ group?.title }}</p>
                  <div v-for="(link, id) in group?.item" :key="id">
                    <a
                      v-if="link?.link?.url"
                      :href="
                        group?.title?.toLowerCase() === 'email'
                          ? `mailto:` + link?.link?.url
                          : link?.link?.url
                      "
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hero__link underline-reverse"
                    >
                      {{ link?.label }}
                    </a>
                    <p v-else class="hero__link">
                      {{ link?.label }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="hero__column">
                <div
                  v-for="(group, index) in contact?.content?.items.slice(3)"
                  :key="'right-' + index"
                  class="hero__contact-group"
                >
                  <p class="hero__group-title">{{ group?.title }}</p>
                  <div
                    v-for="(link, id) in group?.item"
                    :key="id"
                    class="hero__link-wrapper"
                  >
                    <a
                      v-if="link?.link?.url"
                      :href="
                        group?.title?.toLowerCase() === 'email'
                          ? `mailto:` + link?.link?.url
                          : link?.link?.url
                      "
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hero__link underline-reverse"
                    >
                      {{ link?.label }}
                    </a>
                    <p v-else class="hero__link">
                      {{ link?.label }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  background-color: var(--basic-black);
  color: var(--basic-white);
}

.hero__title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: vw(276);
  padding-bottom: vw(200);

  @media (max-width: $br1) {
    padding-top: 160px;
    padding-bottom: 80px;
  }
}

.hero__title {
  text-transform: uppercase;
  text-align: center;
  max-width: vw(1155);
  @include heading-h1;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.hero__contacts {
  display: flex;
  flex-direction: column;
  row-gap: vw(100);

  @media (max-width: $br1) {
    row-gap: 60px;
  }
}

.hero__contact {
  display: flex;
  align-items: flex-start;

  @media (min-width: $br1) {
    justify-content: space-between;
    gap: vw(135);
  }

  @media (max-width: $br1) {
    flex-direction: column;
    gap: 40px;
  }
}

.hero__img {
  display: block;
  max-width: vw(325);
  width: 100%;
  height: 100%;
  flex: 1 0 auto;
  object-fit: cover;

  @media (max-width: $br1) {
    max-width: 100%;
    height: 343px;
  }
}

.hero__block {
  max-width: vw(900);
  width: 100%;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.hero__content {
  @media (min-width: $br1) {
    display: flex;
    gap: vw(70);
  }

  @media (max-width: $br1) {
    display: block;
  }
}

.hero__column {
  display: flex;
  flex-direction: column;

  @media (min-width: $br1) {
    gap: vw(28);
    flex: 1;
  }

  @media (max-width: $br1) {
    &:nth-child(2) {
      margin-top: 24px;

      .hero__contact-group {
        &:not(&:first-child, &:last-child) {
          margin-top: 16px;
        }

        &:last-child {
          margin-top: 32px;
        }
      }
    }

    &:nth-child(3) {
      margin-top: 16px;

      .hero__contact-group {
        &:last-child {
          row-gap: 24px;
          margin-top: 32px;
        }
      }
    }
  }
}

.hero__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
  margin-bottom: vw(24);

  @media (max-width: $br1) {
    margin-bottom: 16px;
  }
}

.hero__contact-title {
  text-transform: uppercase;
  @include subheading-h1;

  @media (min-width: $br1) {
    @include col(1, 1);
  }
}

.hero__contact-group {
  display: flex;
  flex-direction: column;
  height: fit-content;
  row-gap: vw(6);

  @media (min-width: $br1) {
    &:nth-of-type(-n + 3) {
      @include col(2, 2);
    }

    &:nth-of-type(n + 4) {
      @include col(3, 3);
    }
  }

  @media (max-width: $br1) {
    row-gap: 5px;
  }
}

.hero__group-title {
  text-transform: uppercase;
  color: var(--neutral-300);
  width: fit-content;
  @include subheading-h5;
}

.hero__link {
  display: block;
  position: relative;
  text-transform: uppercase;
  width: fit-content;
  @include subheading-h5;
}
</style>
