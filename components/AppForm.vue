<script setup lang="ts">
import { LucideArrowUpRight } from 'lucide-vue-next'
import { useFormStory } from '~/composables/stories/formStory'
import type { IForm } from '~/types/form'

interface IProps {
  formId: string
  title?: string
  description?: string
  btnText?: string
  showButton?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  showButton: true,
})

const { story } = await useFormStory()

const model = defineModel<IForm>()

const inputs = reactiveComputed(() => [
  {
    id: `${props.formId}-name`,
    name: 'name',
    type: 'text',
    placeholder: story?.value?.content?.full_name_label || 'Name',
    required: true,
    value: model.value?.name.value,
    error: model.value?.name?.error,
    validators: [Validation.min(2, 'Please enter at least 2 characters')],
  },
  {
    id: `${props.formId}-number`,
    name: 'phone',
    type: 'text',

    placeholder: story?.value?.content?.phone_label || 'Number',
    required: true,
    value: model.value?.phone.value,
    error: model.value?.phone?.error,
    validators: [Validation.phone('Please enter a valid phone number')],
  },
  {
    id: `${props.formId}-email`,
    name: 'email',
    type: 'email',
    placeholder: story?.value?.content?.email_label || 'Email',
    required: true,
    value: model.value?.email.value,
    error: model.value?.email?.error,
    validators: [Validation.email('Please enter a valid email address')],
  },
])

const isFormValid = computed(() => {
  if (!model.value) return false

  return Object.values(model.value).every(field => {
    return !!field.value?.trim() && !field.error
  })
})
</script>

<template>
  <form class="form" novalidate @submit.prevent>
    <div class="form__wrapper">
      <legend v-if="title" class="form__title">{{ title }}</legend>
      <p v-if="description" class="form__description">
        {{ description }}
      </p>
      <fieldset class="form__fields">
        <AppInput
          v-for="(input, idx) in inputs"
          :id="input.id"
          :key="idx"
          v-model="model[input.name].value"
          v-model:errors="model[input.name].error"
          class="form__input"
          :name="input.name"
          :type="input.type"
          :value="input.value"
          :placeholder="input.placeholder"
          :required="input.required"
          :error="input.error"
          :validators="input.validators"
        />
      </fieldset>
      <Button
        v-if="showButton"
        type="submit"
        class="form__btn"
        :disabled="!isFormValid"
      >
        <span>{{ btnText }}</span>
        <LucideArrowUpRight />
      </Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  position: relative;
  width: 100%;
}

.form__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form__top {
  text-align: center;
}

.form__title {
  text-transform: uppercase;
  text-align: center;
  color: var(--basic-white);
  @include subheading-h1;
}

.form__description {
  font-size: vw(16);
  line-height: 1.25em;
  margin-top: vw(10);
  color: var(--neutral-200);
  text-align: center;
  @include med;

  @media (max-width: $br1) {
    font-size: size(16, 14);
    margin-top: 8px;
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.form__fields {
  display: flex;
  flex-direction: column;
  row-gap: vw(40);
  width: 100%;
  margin-top: vw(60);

  @media (max-width: $br1) {
    row-gap: 40px;
    margin-top: 43px;
  }
}

.form__btn {
  margin-top: vw(60);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}
</style>
