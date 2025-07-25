<script lang="ts" setup>
import type { iApartment } from '~/types/currentProjectTypes'
import InteriorAppartmentSpecs from './InteriorAppartmentSpecs.vue'

import { scrollTo } from '~/utils/scrollTo'
import { useProjectsStory } from '~/composables/stories/projects/projectsStory'

interface IProps {
  apartments: iApartment[]
  projectName: string
}

defineProps<IProps>()

const $el = useTemplateRef<HTMLElement | null>('el')

const selectedApartment = defineModel<iApartment>()

const onSelectApartment = (apartment: iApartment) => {
  selectedApartment.value = apartment

  const top = $el.value?.getBoundingClientRect().top

  scrollTo(top - 20)
}

const { story } = await useProjectsStory('projects')

const isModalOpen = ref(false)
</script>

<template>
  <div ref="el" class="interior-aparts" data-interior-apparts>
    <Transition name="fade" mode="out-in">
      <ProjectInteriorApartment
        :key="selectedApartment?._uid"
        :apartment="selectedApartment"
      />
    </Transition>

    <div class="interior-aparts__text-wrapper">
      <ProjectInteriorModal
        v-model:open="isModalOpen"
        :apartments-list="apartments"
        :selected-apartment="selectedApartment"
        :button-text="story?.content?.project_interior_menu_text"
        @select="onSelectApartment"
      />
      <Transition name="fade" mode="out-in">
        <InteriorAppartmentSpecs
          :key="selectedApartment?._uid"
          :apartment="selectedApartment"
          :spec1-name="story?.content?.project_template_spec_1"
          :spec2-name="story?.content?.project_template_spec_2"
          :spec3-name="story?.content?.project_template_spec_3"
          :form-button="story?.content?.project_interior_form_button"
          :project-name="projectName"
        />
      </Transition>
    </div>
  </div>
  <div class="interior-aparts__choose-button-wrapper">
    <Button class="interior-aparts__choose-button" @click="isModalOpen = true">
      <span> choose APARTMENT </span>
      <IconsPlus class="interior-aparts__choose-button-icon" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.interior-aparts {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: vw(76);
  position: relative;
  min-height: 100vh;
  @media (max-width: $br1) {
    flex-direction: column;
    gap: 0;
    justify-content: flex-start;
  }
}

.interior-aparts__text-wrapper {
  width: 100%;
  @media (min-width: $br1) {
    position: sticky;
    height: 92.2vh;
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

.interior-aparts__choose-button-wrapper {
  position: sticky;
  bottom: vw(45);
  // left: 50%;
  // transform: translate(-50%, 0);
  z-index: 50;
  padding-top: vw(40);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: $br1) {
    padding-top: 48px;
    bottom: 48px;
  }
}

.interior-aparts__choose-button-icon {
  flex-shrink: 0;
}
</style>
