<script lang="ts" setup>
const input = reactive({
  id: 'name',
  name: 'name',
  type: 'text',
  value: '',
  placeholder: 'Enter your name',
  required: true,
  error: true,
  validators: [Validation.email('Please enter a valid email address')],
})
</script>

<template>
  <HeadlessInputTextarea
    :id="input.id"
    v-model="input.value"
    :name="input.name"
    :value="input.value"
    :placeholder="input.placeholder"
    :required="input.required"
    :validators="input.validators"
    :disable-resize="true"
    type="textarea"
    class="input"
  />
</template>
