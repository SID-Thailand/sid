<script setup lang="ts">
import type { iContactContent } from '~/types/contactTypes'
import type { IForm } from '~/types/form'

interface IProps {
  content: iContactContent
}

defineProps<IProps>()

const { submitHandler, isFetching } = useFormSend('Contacts')

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
  <section class="contacts-form container">
    <div class="contacts-form__wrapper">
      <div class="contacts-form__bg-wrapper">
        <CustomImage
          class="contacts-form__bg"
          :src="content?.form_bg?.filename"
          :alt="content?.form_bg?.alt"
        />
        <div class="contacts-form__layer" />
      </div>

      <h2 class="contacts-form__title">
        {{ content?.form_title }}
      </h2>
      <p class="contacts-form__description">
        {{ content?.form_text }}
      </p>
      <AppForm
        v-model="formData"
        form-id="global-form"
        class="contacts-form__form"
        title="fill out the form"
        description="We will definitely contact you"
        :show-button="true"
        :is-loading="isFetching"
        btn-text="BOOK THE MEETING"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts-form {
  position: relative;
  padding-top: vw(200);
  padding-bottom: vw(273);

  @media (max-width: $br1) {
    padding-top: 60px;
    padding-bottom: 48px;
  }
}

.contacts-form__wrapper {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.contacts-form__bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.contacts-form__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contacts-form__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(36, 36, 36, 0) 0%, #242424 100%);
  mix-blend-mode: multiply;
}

.contacts-form__title {
  font-size: vw(60);
  line-height: 1em;
  text-transform: uppercase;
  position: relative;
  max-width: vw(800);
  @include med;

  @media (max-width: $br1) {
    max-width: 100%;
    font-size: size(60, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.contacts-form__description {
  position: relative;
  margin-top: vw(24);
  max-width: vw(786);
  @include text-t3;

  @media (max-width: $br1) {
    max-width: 100%;
    margin-top: 16px;
  }
}

.contacts-form__form {
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
