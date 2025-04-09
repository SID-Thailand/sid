<script lang="ts" setup>
import type { iQuizStepItem } from '~/types/story'

interface IProps {
  item: iQuizStepItem
  isActive: boolean
}

const props = defineProps<IProps>()

const active = defineModel<string>()

const radioHandler = () => {
  active.value = props.item?.label
}
</script>

<template>
  <li class="quiz-radio" :class="{ 'quiz-radio--active': isActive }">
    <div class="quiz-radio__image-container">
      <CustomImage
        :src="item?.asset?.filename"
        :alt="item?.asset?.alt"
        class="quiz-radio__img"
      />
      <button
        type="button"
        aria-role="radio"
        :aria-checked="isActive"
        :aria-label="item?.label"
        class="quiz-radio__circled-btn"
        :class="{ 'quiz-radio__circled-btn--active': isActive }"
        @click="radioHandler"
      >
        <span />
        <span />
      </button>
    </div>
    <p class="quiz-radio__desc">{{ item?.label }}</p>
  </li>
</template>

<style lang="scss" scoped>
.quiz-radio {
  position: relative;
  width: 100%;
  height: 100%;
  @media (min-width: $br1) {
    max-width: vh(244);
  }
}

.quiz-radio__image-container {
  position: relative;
  width: 100%;
}

.quiz-radio__img {
  display: block;
  height: 100%;
  width: 100%;
  border: 1px solid var(--basic-black);
  object-fit: cover;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: $br1) {
    border-radius: 12px;
  }
}

.quiz-radio__desc {
  font-size: vw(20);
  text-transform: uppercase;
  line-height: 1.2em;
  text-align: center;
  margin-top: vw(50);
  @include med;

  @media (max-width: $br1) {
    line-height: 1em;
    margin-top: 30px;
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.quiz-radio__circled-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: vw(50);
  height: vw(50);
  border-radius: 100%;
  position: absolute;
  bottom: vw(-24);
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;

  span {
    position: absolute;
    display: block;
    background-color: var(--accent-secondary);
    z-index: 2;
    width: vw(22);
    height: vw(1.5);

    &:last-child {
      display: block;
      transform: rotate(90deg);
    }

    @media (max-width: $br1) {
      width: 14px;
      height: 1.5px;
    }
  }

  &--active {
    span {
      &:last-child {
        display: none;
      }
    }
  }

  @media (max-width: $br1) {
    width: 32px;
    height: 32px;
    bottom: -14px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-image: var(--accent-primary);
    z-index: 1;
    transition: opacity 0.3s $easing;
  }

  &:hover {
    &::before {
      opacity: 0.9;
    }
  }
}
</style>
