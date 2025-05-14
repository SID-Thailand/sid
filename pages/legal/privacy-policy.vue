<script lang="ts" setup>
import { usePolicyStory } from '~/composables/stories/policyStory'

const { story } = await usePolicyStory()
</script>

<template>
  <div>
    <section class="privacy-policy">
      <div class="privacy-policy__wrapper">
        <h1 class="privacy-policy__title">
          {{ story?.content?.title }}
        </h1>
        <p class="privacy-policy__description">
          {{ story?.content?.description }}
        </p>
      </div>
      <div class="privacy-policy__wrapper privacy-policy__wrapper--content">
        <div class="privacy-policy__content">
          <DynamicBlockRenderer :blocks="story?.content?.body" is-privacy />
        </div>
      </div>
    </section>
    <BookTheMeetings :cta="story?.content?.cta" />
  </div>
</template>

<style scoped lang="scss">
.privacy-policy {
  padding-top: vw(226);

  @media (max-width: $br1) {
    padding-top: 128px;
  }
}

.privacy-policy__wrapper {
  width: 100%;
  position: relative;
  max-width: vw(720);
  margin: 0 auto;

  @media (max-width: $br1) {
    max-width: 100%;
    padding-left: $g-sm;
    padding-right: $g-sm;
  }

  @media (max-width: $br3) {
    padding-left: $g-s;
    padding-right: $g-s;
  }

  &--content {
    padding-left: 60px;
    padding-right: 60px;
  }
}

.privacy-policy__title {
  color: var(--basic-white);
  text-align: center;
  text-transform: uppercase;
  @include heading-h1;
}

.privacy-policy__description {
  margin-top: vw(32);
  text-align: center;
  color: var(--neutral-300);
  font-size: vw(16);
  line-height: 1.25em;
  @include med;

  @media (max-width: $br1) {
    margin-top: 24px;
    font-size: 16px;
  }
}

.privacy-policy__content {
  margin-top: vw(100);

  @media (max-width: $br1) {
    margin-top: 80px;
  }
}
</style>
