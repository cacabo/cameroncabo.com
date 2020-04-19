export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (for Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')
    console.log('IntersectionObserver is polyfilled!')
  }
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This app has been updated. Reload to display the latest version?`,
  )

  if (answer) {
    // Load the new version of the site
    window.location.reload()
  }
}
