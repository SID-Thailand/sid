import gsap from 'gsap'

export const useLogoAnimation = () => {
  const elRef = useState<SVGElement | null>('elRef', () => null)

  const init = (el: SVGElement | null) => {
    elRef.value = el
  }

  const appear = () => {
    const paths = elRef.value?.querySelectorAll('path')

    const color = getComputedStyle(elRef.value).getPropertyValue('color')

    const tl = gsap.timeline()

    tl.fromTo(
      paths,
      {
        strokeDashoffset: (_: number, target: SVGPathElement) => {
          return target.getTotalLength()
        },
        strokeDasharray: (_: number, target: SVGPathElement) => {
          return target.getTotalLength()
        },
        stroke: color,
        fill: 'transparent',
      },
      {
        duration: 2,
        strokeDashoffset: 0,
        stroke: 'transparent',
        fill: color,
        ease: 'power2.out',
        stagger: {
          amount: 0.5,
          from: 'start',
        },
        onComplete: () => {
          paths?.forEach(path => {
            path.removeAttribute('stroke')
            path.setAttribute('fill', 'currentColor')
          })
        },
      }
    )
  }

  const disappear = () => {
    const paths = elRef.value?.querySelectorAll('path')

    paths?.forEach(path => {
      const length = path.getTotalLength()

      gsap.to(path, {
        duration: 2,
        strokeDashoffset: length,
        stroke: 'white',
        fill: 'transparent',
        ease: 'power2.out',
        stagger: {
          amount: 0.5,
          from: 'end',
        },
      })
    })
  }

  return {
    init,
    appear,
    disappear,
  }
}
