import debounce from 'debounce'
import SplitType, { type TypesList } from 'split-type'

interface TextSplitterOptions {
  resizeCallback?: () => void
  splitTypeTypes?: TypesList
}

export class TextSplitter {
  textElement: HTMLElement
  splitText: SplitType
  previousContainerWidth: number | null
  onResize: (() => void) | null

  constructor(textElement: HTMLElement, options: TextSplitterOptions = {}) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.')
    }

    const { resizeCallback, splitTypeTypes } = options

    this.textElement = textElement

    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null

    const splitOptions = splitTypeTypes
      ? { types: splitTypeTypes, lineClass: 'e-line' }
      : {}

    this.splitText = new SplitType(this.textElement, splitOptions)

    if (this.onResize) {
      this.initResizeObserver()
    }
  }

  initResizeObserver() {
    this.previousContainerWidth = null

    const resizeObserver = new ResizeObserver(
      debounce(entries => this.handleResize(entries), 100)
    )
    resizeObserver.observe(this.textElement)
  }

  handleResize(entries) {
    const [{ contentRect }] = entries
    const width = Math.floor(contentRect.width)

    if (this.previousContainerWidth && this.previousContainerWidth !== width) {
      this.splitText.split({})
      this.onResize()
    }
    this.previousContainerWidth = width
  }

  revert() {
    return this.splitText.revert()
  }

  getLines() {
    return this.splitText.lines
  }

  getWords() {
    return this.splitText.words
  }

  getChars() {
    return this.splitText.chars
  }
}
