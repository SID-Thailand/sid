<script lang="ts" setup>
import type { iApartment } from '~/types/currentProjectTypes'
import InteriorAppartmentSpecs from './InteriorAppartmentSpecs.vue'
import { delayPromise } from '@emotionagency/utils'
import { scrollTo } from '~/utils/scrollTo'
import { useProjectsStory } from '~/composables/stories/projectsStory'

interface IProps {
  apartments: iApartment[]
}

defineProps<IProps>()

const $el = useTemplateRef<HTMLElement | null>('el')

const selectedApartment = defineModel<iApartment>()

const onSelectApartment = async (apartment: iApartment) => {
  selectedApartment.value = apartment

  const top = $el.value?.getBoundingClientRect().top
  await delayPromise(800)
  scrollTo(top - 20)
}

const { story } = await useProjectsStory()

onMounted(() => {
  console.log(story.value)
})
</script>

<template>
  <div ref="el" class="interior-aparts">
    <ProjectInteriorDropdown
      :apartments-list="apartments"
      :selected-apartment="selectedApartment"
      :button-text="story?.content?.project_interior_menu_text"
      class="interior-aparts__dropdown interior-aparts__dropdown--mob"
      @select="onSelectApartment"
    />
    <Transition name="fade" mode="out-in">
      <ProjectInteriorApartment
        :key="selectedApartment?._uid"
        :apartment="selectedApartment"
      />
    </Transition>

    <div class="interior-aparts__text-wrapper">
      <ProjectInteriorDropdown
        :apartments-list="apartments"
        :selected-apartment="selectedApartment"
        :button-text="story?.content?.project_interior_menu_text"
        class="interior-aparts__dropdown"
        @select="onSelectApartment"
      />
      <Transition name="fade" mode="out-in">
        <InteriorAppartmentSpecs
          :key="selectedApartment?._uid"
          :apartment="selectedApartment"
          :spec1-name="story?.content?.project_template_spec_1"
          :spec2-name="story?.content?.project_template_spec_2"
          :spec3-name="story?.content?.project_template_spec_3"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.interior-aparts {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: vw(76);
  position: relative;
  @media (max-width: $br1) {
    flex-direction: column;
    gap: 0;
    justify-content: flex-start;
  }
}

.interior-aparts__dropdown {
  width: vw(382);
  position: relative;
  &--mob {
    @media (min-width: $br1) {
      display: none;
    }
  }

  @media (max-width: $br1) {
    width: 100%;
    &:not(&--mob) {
      display: none;
    }
  }
}

.interior-aparts__text-wrapper {
  width: 100%;
  @media (min-width: $br1) {
    position: sticky;
    top: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
