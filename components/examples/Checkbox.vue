<script lang="ts" setup>
const checked = ref(false)
</script>

<template>
  <HeadlessInputField v-slot="field" class="checkbox-field">
    <HeadlessInputLabel class="checkbox-label">
      <div class="checkbox-wrapper">
        <HeadlessInputCheckbox
          id="checkbox"
          v-model="checked"
          name="checkbox"
          class="checkbox"
          :required="true"
        />

        <LucideCheck :size="16" class="checkbox-icon" />
      </div>

      Checkbox
    </HeadlessInputLabel>

    <HeadlessInputValidationMessage v-if="field.error">
      this field is required
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>

<style lang="scss" scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

.checkbox {
  appearance: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  border: 1px solid #333;
  &:checked {
    + .checkbox-icon {
      stroke-dashoffset: 0;
    }
  }
}

.checkbox-wrapper {
  position: relative;
  width: 16px;
  height: 16px;
}

.checkbox-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  stroke-dashoffset: 22.627416610717773;
  stroke-dasharray: 22.627416610717773;
  transition: stroke-dashoffset 0.3s ease;
}
</style>
