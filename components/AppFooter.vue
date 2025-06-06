<script lang="ts" setup>
import { useFooterStory } from '~/composables/stories/footerStory'

import Validation from '~/utils/Validation'

const { story } = await useFooterStory()

const { submitHandler, isFetching } = useFormSend('Footer')

const formData = ref<IData>({
  email: { value: '', error: false },
})

const onSubmit = async () => {
  if (formData.value.email.error || !formData.value.email.value) return

  await submitHandler(formData.value)

  formData.value.email.value = ''
}
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
        <div class="footer__list-wrapper">
          <ul class="footer__list">
            <li class="footer__item">
              <h3 class="footer__label">
                {{ story?.content?.contacts?.content?.items[2]?.title }}
              </h3>
              <a
                :href="
                  'mailto:' +
                  story?.content?.contacts?.content?.items[2]?.item[0]?.link
                    ?.url
                "
                target="_blank"
                class="footer__text underline-reverse"
              >
                {{
                  story?.content?.contacts?.content?.items[2]?.item[0]?.label
                }}
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
                {{
                  story?.content?.contacts?.content?.items[3]?.item[0]?.label
                }}
              </a>
            </li>
          </ul>
          <div class="footer__socials">
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
          </div>
        </div>
        <form class="footer__form" novalidate @submit.prevent="onSubmit">
          <legend class="footer__title">
            {{ story?.content?.newsletter_title }}
          </legend>
          <AppInput
            id="subscribe-email"
            v-model="formData.email.value"
            v-model:errors="formData.email.error"
            :value="formData.email.value"
            class="footer__input"
            name="email"
            type="email"
            placeholder="YOUR EMAIL"
            :required="true"
            :error="true"
            :validators="[
              Validation.email('Please enter a valid email address'),
            ]"
          />
          <Button type="submit" class="footer__form-btn" :disabled="isFetching">
            <Loader v-if="isFetching" />
            <span v-else>{{ story?.content?.button }}</span>
            <IconsArrowTopRight />
          </Button>
        </form>
      </div>
      <div class="footer__bottom">
        <p class="footer__small-text">SID Thailand</p>
        <p class="footer__small-text">ALL RIGHTS RESERVED</p>
        <NuxtLink
          :to="`/${story?.content?.privacy_policy_link[0]?.link?.cached_url}`"
          class="footer__small-text footer__small-text--link underline-reverse"
        >
          {{ story?.content?.privacy_policy_link[0]?.label }}
        </NuxtLink>
        <p class="footer__small-text">
          {{ story?.content?.made_by_text }}
          <a
            :href="story?.content?.designer[0]?.link?.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__small-text-link footer__small-text--link underline-reverse"
          >
            {{ story?.content?.designer[0]?.label }}
          </a>
        </p>
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

  @media (max-width: $br1) {
    row-gap: 20px;
  }

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

.footer__socials {
  display: flex;
  flex-direction: column;
  row-gap: vw(6);
  text-transform: uppercase;
  margin-top: vw(38);

  @media (max-width: $br1) {
    row-gap: 26px;
    margin-top: 60px;
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

.footer__list-wrapper {
  @media (min-width: $br1) {
    @include col(7, 12);
  }

  @media (max-width: $br1) {
    margin-top: 60px;
  }
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
  &:nth-child(1) {
    color: var(--basic-white);

    @media (min-width: $br1) {
      @include col(1, 6);
    }
  }
  &:nth-child(2) {
    @media (min-width: $br1) {
      @include col(7, 12);
    }

    @media (max-width: $br1) {
      margin-top: 2px;
    }
  }
  &:nth-child(3) {
    @media (min-width: $br1) {
      @include col(13, 20);
    }

    @media (max-width: $br1) {
      margin-top: 20px;
    }
  }

  &:nth-child(4) {
    @media (min-width: $br1) {
      @include col(21, 24);
      justify-self: end;
    }

    @media (max-width: $br1) {
      margin-top: 20px;
    }
  }

  &--link {
    color: var(--basic-white);
    position: relative;
    width: fit-content;
  }
}
</style>
