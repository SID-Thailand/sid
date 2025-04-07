<script setup lang="ts">
import { useFormStory } from '~/composables/stories/formStory'

const { story } = await useFormStory()
const { isModalOpened } = useAppState()

watch(isModalOpened, () => {
  if (isModalOpened.value) {
    setTimeout(() => {
      isModalOpened.value = false
    }, 3000)
  }
})

onMounted(() => {
  setTimeout(() => {
    isModalOpened.value = true
  }, 3000)
})
</script>

<template>
  <SlideModal>
    <div class="approve-modal">
      <h2 class="approve-modal__text" v-html="story?.content?.thankyou_text" />
    </div>
  </SlideModal>
</template>

<style scoped lang="scss">
.approve-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.approve-modal__text {
  color: var(--basic-white);
  text-transform: uppercase;
  text-align: center;
  max-width: vw(660);
  width: 100%;
  @include heading-h4;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}
</style>
