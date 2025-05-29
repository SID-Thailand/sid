<script lang="ts" setup>
import type { IForm } from '~/types/form'
import type { iCurrentProjectForm } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectForm
  projectName: string
}

const props = defineProps<IProps>()

const { submitHandler, isFetching } = useFormSend(
  'Project: ' + props.projectName
)

const onSubmit = async (data: IForm) => {
  await submitHandler(data)

  formData.value.name.value = ''
  formData.value.phone.value = ''
  formData.value.email.value = ''
}
const formData = ref<IForm>({
  name: { value: '', error: false },
  phone: { value: '', error: false },
  email: { value: '', error: false },
})
</script>

<template>
  <section class="project-form">
    <div class="project-form__wrapper container">
      <div class="project-form__img-wrapper">
        <div class="project-form__text-wrapper project-form__text-wrapper--mob">
          <h2 class="project-form__title">
            {{ content?.title }}
          </h2>
          <p class="project-form__text">
            {{ content?.text }}
          </p>
        </div>

        <CustomImage
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
          class="project-form__img"
        />
      </div>
      <div class="project-form__content">
        <div class="project-form__text-wrapper">
          <h2 class="project-form__title">
            {{ content?.title }}
          </h2>
          <p class="project-form__text">
            {{ content?.text }}
          </p>
        </div>
        <AppForm
          v-model="formData"
          form-id="project-form"
          class="project__form"
          :show-button="true"
          :is-loading="isFetching"
          :btn-text="content.button_text"
          btn-position="left"
          @submit="onSubmit"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.project-form {
  color: var(--basic-white);
  background-color: var(--neutral-500);
  padding-top: vw(40);
  padding-bottom: vw(200);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 88px;
  }
}

.project-form__wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row-reverse;
  column-gap: vw(138);
  height: 100%;

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.project-form__text-wrapper {
  display: block;

  @media (max-width: $br1) {
    display: none;
  }

  &--mob {
    display: none;

    @media (max-width: $br1) {
      display: block;
    }
  }
}

.project-form__content {
  max-width: vw(540);

  @media (max-width: $br1) {
    max-width: 100%;
    width: 100%;
  }
}

.project-form__title {
  font-size: vw(60);
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: size(60, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.project-form__text {
  color: var(--neutral-200);
  margin-top: vw(16);
  @include text-t3;

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.project-form__img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-form__img {
  object-fit: cover;
  width: 100%;
  height: 100%;

  @media (max-width: $br1) {
    height: 480px;
    margin-top: 48px;
  }
}

.project__form {
  margin-top: vw(133);
  width: 100%;

  @media (max-width: $br1) {
    margin-top: 48px;
  }

  .form__fields {
    margin-top: 0;
  }
}
</style>
