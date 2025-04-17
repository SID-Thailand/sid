<script setup lang="ts">
const emit = defineEmits(['error'])

const { selectedLang, defaultLocale } = useLang()
</script>

<template>
  <section class="n-found container">
    <div class="n-found__wrapper">
      <div class="n-found__bg-wrapper">
        <img
          class="n-found__bg"
          src="/images/error/1.png"
          alt="Error background"
        />
        <div class="n-found__layer" />
      </div>

      <div class="n-found__content">
        <p class="n-found__subtitle">404</p>
        <h1 class="n-found__title">PAGE NOT FOUND</h1>
        <p class="n-found__description">
          something is broken, please refresh the page or return to Homme page
        </p>
      </div>
      <Button
        tag="nuxt-link"
        :href="selectedLang === defaultLocale() ? '/' : '/' + selectedLang"
        type="button"
        class="n-found__btn"
        @click="emit('error')"
      >
        go to home page
      </Button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.n-found {
  height: 100vh;
  width: 100%;
  position: relative;
}

.n-found__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.n-found__bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.n-found__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.n-found__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--neutral-300);
  mix-blend-mode: multiply;
}

.n-found__content {
  position: relative;
  text-align: center;
  text-transform: uppercase;
}

.n-found__subtitle {
  color: var(--neutral-300);
  @include heading-h1;
}

.n-found__title {
  @include heading-h1;
}

.n-found__description {
  font-size: vw(20);
  line-height: 1.2em;
  color: var(--neutral-300);
  margin-top: vw(32);
  @include med;

  @media (max-width: $br1) {
    margin-top: 24px;
    font-size: size(20, 16);
  }

  @media (max-width: $br4) {
    font-size: 16px;
  }
}

.n-found__btn {
  margin-top: vw(44);

  @media (max-width: $br1) {
    margin-top: 32px;
  }
}
</style>
