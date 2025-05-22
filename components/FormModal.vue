<script setup lang="ts">
import type { IForm } from '~/types/form'

const { isFormModalOpened, formModalFrom } = useAppState()

const onCloseModal = () => {
  isFormModalOpened.value = false
}

const { submitHandler, isFetching } = useFormSend(formModalFrom)

const formData = ref<IForm>({
  name: { value: '', error: false },
  phone: { value: '', error: false },
  email: { value: '', error: false },
})

const onSubmit = async (data: IForm) => {
  await submitHandler(data)

  formData.value.name.value = ''
  formData.value.phone.value = ''
  formData.value.email.value = ''
  isFormModalOpened.value = false
}
</script>

<template>
  <Modal :is-open="isFormModalOpened" @close="onCloseModal">
    <AppForm
      v-model="formData"
      form-id="global-form"
      class="global-form__form"
      title="fill out the form"
      description="We will definitely contact you"
      :show-button="true"
      :is-loading="isFetching"
      btn-text="BOOK THE MEETING"
      @submit="onSubmit"
    />
  </Modal>
</template>
