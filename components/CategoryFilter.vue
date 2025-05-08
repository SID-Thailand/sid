<script setup lang="ts">
interface IProps {
  categories: string[]
  labelAll: string
}

defineProps<IProps>()

const emit = defineEmits(['filter', 'getAll'])

const activeCategory = ref<string | null>(null)

const handleFilter = (category: string) => {
  activeCategory.value = category
  emit('filter', category)
}

const handleGetAll = () => {
  activeCategory.value = null
  emit('getAll')
}
</script>

<template>
  <ul class="category-filter">
    <li
      class="category-filter__item"
      :class="{ 'category-filter__item--active': activeCategory === null }"
    >
      <button
        type="button"
        class="category-filter__btn underline"
        :class="{ 'underline--active': activeCategory === null }"
        @click="handleGetAll"
      >
        {{ labelAll }}
      </button>
      <span>|</span>
    </li>

    <li
      v-for="(category, idx) in categories"
      :key="idx"
      class="category-filter__item"
      :class="{ 'category-filter__item--active': activeCategory === category }"
    >
      <button
        type="button"
        class="category-filter__btn underline"
        :class="{ 'underline--active': activeCategory === category }"
        @click="handleFilter(category)"
      >
        {{ category }}
      </button>
      <span v-if="categories.length - 1 !== idx">|</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.category-filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: vw(60);
  max-width: vw(900);
  row-gap: vw(12);

  @media (max-width: $br1) {
    flex-direction: column;
    margin-top: 48px;
    row-gap: 32px;
  }
}

.category-filter__item {
  span {
    color: var(--neutral-300);
    margin: 0 vw(20);

    @media (max-width: $br1) {
      display: none;
    }
  }
}

.category-filter__btn {
  position: relative;
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  background: transparent;
  color: var(--basic-white);

  transition: color 0.3s ease;
  @include med;

  &:before {
    background-color: currentColor;
  }

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }
}
</style>
