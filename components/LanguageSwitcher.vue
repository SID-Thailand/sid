<script lang="ts" setup>
import { ref } from 'vue'
const isOpen = ref(false)
const languages = ['EN', 'UA']
const { selectedLang } = useLang()

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = (lang: string) => {
  selectedLang.value = lang
  isOpen.value = false
}
</script>

<template>
  <div class="lang-switch">
    <button class="lang-switch__btn underline-reverse" @click="toggleDropdown">
      {{ selectedLang }}
    </button>

    <ul
      class="lang-switch__list"
      :class="isOpen && 'lang-switch__list--opened'"
    >
      <li
        v-for="(lang, idx) in languages.filter(l => l !== selectedLang)"
        :key="idx"
        class="lang-switch__item"
        @click="changeLanguage(lang)"
      >
        <button type="button" class="lang-switch__item-btn">
          {{ lang }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.lang-switch {
  position: relative;
}

.lang-switch__btn {
  position: relative;
  background-color: transparent;
  color: var(--basic-white);
  font-size: vw(16);

  @media (max-width: $br1) {
    font-size: 16px;
  }
}

.lang-switch__list {
  position: absolute;
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  overflow: hidden;
  transform: translateY(vw(18));
  transition:
    grid-template-rows 0.3s ease,
    opacity 0.3s ease;
  font-size: vw(16);
  background: transparent;
  color: var(--basic-white);

  @media (max-width: $br1) {
    font-size: 16px;
    transform: translateY(14px);
  }

  &--opened {
    grid-template-rows: 1fr;
    opacity: 1;
  }
}

.lang-switch__item-btn {
  color: inherit;
  background-color: transparent;
}
</style>
