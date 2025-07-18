<script setup lang="ts">
import { useFormStory } from '~/composables/stories/formStory'
import type { IForm } from '~/types/form'
import type { iImage } from '~/types/story'

interface IProps {
  background: iImage
  title: string
  newsTitle: string
}

const props = defineProps<IProps>()

const { submitHandler, isFetching } = useFormSend('Article: ' + props.newsTitle)

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

const { story } = await useFormStory()
</script>

<template>
  <section class="curr-news-form container">
    <div class="curr-news-form__wrapper">
      <div class="curr-news-form__bg-wrapper">
        <CustomImage
          class="curr-news-form__bg"
          :src="background?.filename"
          :alt="background?.alt"
          :width="1920"
        />
        <div class="curr-news-form__layer" />
      </div>

      <h2 class="curr-news-form__title">
        {{ title }}
      </h2>
      <AppForm
        v-model="formData"
        form-id="global-form"
        class="curr-news-form__form"
        :title="story?.content?.form_popup_title"
        :description="story?.content?.form_popup_text"
        :btn-text="story?.content?.form_popup_button"
        :show-button="true"
        :is-loading="isFetching"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-news-form {
  position: relative;
  padding-top: vw(200);
  padding-bottom: vw(273);
  margin-top: vw(200);

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 48px;
    margin-top: 60px;
  }
}

.curr-news-form__wrapper {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.curr-news-form__bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.curr-news-form__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.curr-news-form__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(36, 36, 36, 0) 0%, #242424 100%);
  mix-blend-mode: multiply;
}

.curr-news-form__title {
  font-size: vw(60);
  line-height: 1em;
  text-transform: uppercase;
  position: relative;
  max-width: vw(1017);
  @include med;

  @media (max-width: $br1) {
    max-width: 100%;
    font-size: size(60, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.curr-news-form__description {
  position: relative;
  margin-top: vw(24);
  max-width: vw(786);
  @include text-t3;

  @media (max-width: $br1) {
    max-width: 100%;
    margin-top: 16px;
  }
}

.curr-news-form__form {
  max-width: vw(555);
  margin-top: vw(80);
  background-color: var(--basic-black);
  padding: vw(60);

  @media (max-width: $br1) {
    max-width: 80%;
    margin-top: 48px;
    padding: 64px 50px;
  }

  @media (max-width: $br3) {
    max-width: 100%;
  }
}
</style>
