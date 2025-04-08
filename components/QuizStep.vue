<script setup lang="ts">
import type { iQuizStep } from '~/types/story'

interface IProps {
  quizStep: iQuizStep
  idx: number
  size: number
}

defineProps<IProps>()

const onSubmit = data => {
  console.log(data)
}
</script>

<template>
  <div
    class="quiz-step"
    :style="{
      zIndex: size - idx,
      transform: `translateY(${-idx * 14}px) scale(${1 - idx * 0.07})`,
    }"
  >
    <div class="quiz-step__wrapper">
      <div
        v-if="quizStep.component === 'final_step'"
        class="quiz-step__content"
      >
        <Form
          class="quiz__form"
          btn-text="SEND"
          title="fill out the form"
          @submit="onSubmit"
        />
      </div>

      <div v-else class="quiz-step__content">
        <p class="quiz-step__count">
          <span>{{ idx + 1 }}</span
          >/<span>{{ size }}</span>
        </p>
        <h3 class="quiz-step__quiz-name">
          {{ quizStep?.title }}
        </h3>
        <ul class="quiz-step__list">
          <li
            v-for="(step, idx) in quizStep?.items"
            :key="idx"
            class="quiz-step__item"
          >
            <div class="quiz-step__image-container">
              <CustomImage
                :src="step?.asset?.filename"
                :alt="step?.asset?.alt"
                class="quiz-step__img"
              />
              <button type="button" class="quiz-step__circled-btn">
                <span />
                <span />
              </button>
            </div>
            <p class="quiz-step__desc">{{ step?.label }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz-step {
  position: relative;
  inset: 0;
  height: 100%;
  border-radius: vw(20) vw(20) 0 0;
  padding: vw(60) vw(50);

  position: absolute;
  background-color: var(--accent-quaternary);
  transform-origin: top;

  &:first-child {
    position: relative;
    background-image: var(--gradient-secondary);
  }

  &:nth-child(3) {
    background-color: var(--accent-tertiary);
  }

  &:nth-child(4) {
    display: none;
  }

  @media (max-width: $br1) {
    border-radius: 20px 20px 0 0;
    padding: 50px 25px;
  }
}

.quiz-step__wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.quiz-step__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz-step__count {
  color: var(--neutral-200);
  text-align: center;
  @include subheading-h3;
}

.quiz-step__quiz-name {
  font-size: vw(40);
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
  margin-top: vw(12);
  max-width: vw(580);
  @include med;

  @media (max-width: $br1) {
    margin-top: 12px;
    font-size: size(40, 24);
  }

  @media (max-width: $br4) {
    font-size: 24px;
  }
}

.quiz-step__list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: vw(56);
  grid-auto-flow: row;
  justify-items: center;
  margin-top: vw(20);

  @media (max-width: $br1) {
    margin-top: 40px;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

.quiz-step__item {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: vh(244);
}

.quiz-step__image-container {
  position: relative;
  width: 100%;
}

.quiz-step__img {
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

.quiz-step__desc {
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

.quiz-step__circled-btn {
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
      transform: rotate(90deg);
    }

    @media (max-width: $br1) {
      width: 14px;
      height: 1.5px;
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
