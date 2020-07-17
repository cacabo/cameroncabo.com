export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (for Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')
    console.log('IntersectionObserver is polyfilled!')
  }
}
