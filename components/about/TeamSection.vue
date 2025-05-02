<script setup lang="ts">
import type { iAboutTeam } from '~/types/aboutTypes'

interface IProps {
  content: iAboutTeam
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)
</script>

<template>
  <section ref="$el" class="ab-team container">
    <div class="ab-team__wrapper">
      <h2 class="ab-team__title">
        {{ content?.title }}
      </h2>
      <ul class="ab-team__group-list">
        <li
          v-for="(group, idx) in content?.team_groups"
          :key="idx"
          class="ab-team__group"
        >
          <p class="ab-team__group-name">
            {{ group?.group_name }}
          </p>
          <div class="ab-team__members">
            <div
              v-for="(member, index) in group?.members"
              :key="index"
              class="ab-team__member"
            >
              <CustomImage
                :src="member?.content?.photo?.filename"
                :alt="member?.content?.photo?.alt"
                class="ab-team__img"
              />
              <div class="ab-team__info">
                <h4 class="ab-team__name">
                  {{ member?.content?.name }}
                </h4>
                <p class="ab-team__pos">
                  {{ member?.content?.position }}
                </p>
              </div>
              <div
                v-if="member?.content?.links.length > 0"
                class="ab-team__links"
              >
                <a
                  v-for="(item, id) in member?.content?.links"
                  :key="id"
                  class="ab-team__link underline-reverse"
                  :href="item?.link?.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ item?.label }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <Button type="button" class="ab-team__btn"> MORE </Button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ab-team {
  padding-top: vw(40);
  padding-bottom: vw(200);
  background-color: var(--neutral-100);
  color: var(--basic-black);
}

.ab-team__title {
  font-size: vw(80);
  line-height: 1em;
  text-transform: uppercase;
  @include med;

  @media (min-width: $br1) {
    margin-left: auto;
    max-width: vw(1015);
  }

  @media (max-width: $br1) {
    font-size: size(80, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.ab-team__group-list {
  display: flex;
  flex-direction: column;
  row-gap: vw(200);
  margin-top: vw(224);

  @media (max-width: $br1) {
    row-gap: 100px;
    margin-top: 88px;
  }
}

.ab-team__group {
  display: flex;

  @media (min-width: $br1) {
    column-gap: vw(180);
    justify-content: space-between;

    &:nth-child(3n) {
      flex-direction: row-reverse;

      .ab-team__members {
        direction: rtl;
      }
    }
  }

  @media (max-width: $br1) {
    flex-direction: column;
    row-gap: 24px;
  }
}

.ab-team__group-name {
  position: relative;
  max-width: vw(163);
  width: 100%;
  flex: 1 0 auto;
  font-size: vw(20);
  text-transform: uppercase;
  line-height: 1.2em;
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.ab-team__members {
  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    column-gap: vw(20);
    row-gap: vw(100);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    row-gap: 48px;
  }
}

.ab-team__img {
  display: block;
  width: 100%;
  object-fit: cover;

  @media (min-width: $br1) {
    height: vw(325);
  }

  @media (max-width: $br1) {
    height: 344px;
  }
}

.ab-team__info {
  margin-top: vw(24);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.ab-team__name {
  font-size: vw(24);
  line-height: 1em;
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: 24px;
    line-height: 1.17em;
  }
}

.ab-team__pos {
  color: var(--neutral-300);
  margin-top: vw(4);
  text-transform: uppercase;
  @include subheading-h5;

  @media (max-width: $br1) {
    margin-top: 4px;
  }
}

.ab-team__links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: vw(20);
  margin-top: vw(24);

  @media (max-width: $br1) {
    margin-top: 16px;
    column-gap: 20px;
  }
}

.ab-team__link {
  position: relative;
  text-transform: uppercase;
  @include subheading-h6;
}

.ab-team__btn {
  display: block;
  margin: 0 auto;
  margin-top: vw(100);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}
</style>
