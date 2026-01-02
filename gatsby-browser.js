export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (for Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')

    // eslint-disable-next-line no-console
    console.log('IntersectionObserver is polyfilled')
  }
}
