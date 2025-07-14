export const useSlider = (
  _count: MaybeRefOrGetter<number>,
  threshold = 700
) => {
  const current = ref(0)
  const prev = ref(null)
  const direction = ref<1 | -1>(1)

  const count = computed(() => toValue(_count))

  const handlePrev = () => {
    prev.value = current.value
    current.value = (current.value - 1 + count.value) % count.value
    direction.value = -1
  }

  const handleNext = () => {
    prev.value = current.value
    current.value = (current.value + 1) % count.value
    direction.value = 1
  }

  const navigate = (direction: 1 | -1) => {
    direction === 1 ? handleNext() : handlePrev()
  }

  const throttledNavigate = useThrottleFn(navigate, threshold)

  return {
    current,
    prev,
    direction,
    handlePrev,
    handleNext,
    navigate,
    throttledNavigate,
  }
}
