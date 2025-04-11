<script setup lang="ts">
import type { IForm } from '~/types/form'

const { isFormModalOpened } = useAppState()

const onCloseModal = () => {
  isFormModalOpened.value = false
}

const onSubmit = (data: any) => {
  console.log(data)
}

const formData = ref<IForm>({
  name: { value: '', error: false },
  phone: { value: '', error: false },
  email: { value: '', error: false },
})
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
      btn-text="BOOK THE MEETING"
      @submit="onSubmit"
    />
  </Modal>
</template>
