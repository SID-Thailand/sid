<script setup lang="ts">
import { LucideArrowUpRight } from 'lucide-vue-next'
import { useFormStory } from '~/composables/stories/formStory'
import type { IForm } from '~/types/form'

interface IProps {
  title?: string
  description?: string
  btnText?: string
  showButton?: boolean
}

withDefaults(defineProps<IProps>(), {
  showButton: true,
})

const { story } = await useFormStory()

const model = defineModel<IForm>()

const inputs = reactiveComputed(() => [
  {
    id: 'feedback-name',
    name: 'name',
    type: 'text',
    placeholder: story?.value?.content?.full_name_label || 'Name',
    required: true,
    value: model.value?.name.value,
    error: model.value?.name?.error,
    validators: [Validation.min(2, 'Please enter at least 2 characters')],
  },
  {
    id: 'feedback-number',
    name: 'phone',
    type: 'text',

    placeholder: story?.value?.content?.phone_label || 'Number',
    required: true,
    value: model.value?.phone.value,
    error: model.value?.phone?.error,
    validators: [Validation.phone('Please enter a valid phone number')],
  },
  {
    id: 'feedback-email',
    name: 'email',
    type: 'email',
    placeholder: story?.value?.content?.email_label || 'Email',
    required: true,
    value: model.value?.email.value,
    error: model.value?.email?.error,
    validators: [Validation.email('Please enter a valid email address')],
  },
])
</script>

<template>
  <form class="form" novalidate @submit.prevent>
    <div class="form__wrapper">
      <ul class="form__fields">
        <li v-for="(input, idx) in inputs" :key="idx" class="form__field">
          <AppInput
            :id="input.id"
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
        </li>
      </ul>
      <Button v-if="showButton" type="submit" class="form__btn">
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
  color: var(--basic-white);
  @include subheading-h1;
}

.form__description {
  font-size: vw(16);
  line-height: 1.25em;
  margin-top: vw(4);
  color: var(--neutral-200);
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
