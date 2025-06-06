<script lang="ts" setup>
const { selectedLang, languages, setLang } = useLang()
const isOpen = ref(false)
const langSwitcherRef = ref(null)

onClickOutside(langSwitcherRef, () => {
  isOpen.value = false
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = async (lang: string) => {
  if (lang === selectedLang.value) return

  isOpen.value = false
  await setLang(lang)

  window.location.reload()
}
</script>

<template>
  <div ref="langSwitcherRef" class="lang-switch">
    <button class="lang-switch__btn underline-reverse" @click="toggleDropdown">
      {{ selectedLang.toUpperCase() }}
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
          {{ lang.toUpperCase() }}
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
  color: currentColor;
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
    opacity 0.3s ease,
    visibility 0.3s ease;
  font-size: vw(16);
  background: transparent;
  color: currentColor;
  pointer-events: none;
  visibility: hidden;

  @media (max-width: $br1) {
    font-size: 16px;
    transform: translateY(14px);
  }

  &--opened {
    grid-template-rows: 1fr;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}

.lang-switch__item-btn {
  color: inherit;
  background-color: transparent;
}
</style>
