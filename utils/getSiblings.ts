export const getPreviousSibling = (node: HTMLElement): HTMLElement | null => {
  let previousSibling = node.previousElementSibling
  while (previousSibling && previousSibling.nodeType !== Node.ELEMENT_NODE) {
    previousSibling = previousSibling.previousElementSibling
  }
  return previousSibling as HTMLElement
}

export const getNextSibling = (node: HTMLElement): HTMLElement | null => {
  let nextSibling = node.nextElementSibling
  while (nextSibling && nextSibling.nodeType !== Node.ELEMENT_NODE) {
    nextSibling = nextSibling.nextElementSibling
  }
  return nextSibling as HTMLElement
}
