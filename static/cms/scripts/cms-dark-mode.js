// Using a script here to apply dark mode due to browser and OS issues

function applyDarkMode(isDarkMode) {
  const darkCssLink = document.querySelector('link[href="/cms/dark.css"]')

  if (isDarkMode) {
    if (!darkCssLink) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = '/cms/css/dark-mode.css'
      document.head.appendChild(link)
    }
  } else {
    if (darkCssLink) {
      darkCssLink.remove()
    }
  }
}

function initializeDarkMode() {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  setTimeout(() => {
    applyDarkMode(darkModeMediaQuery.matches)
  }, 100)

  darkModeMediaQuery.addEventListener('change', (e) => {
    applyDarkMode(e.matches)
  })
}

document.addEventListener('DOMContentLoaded', initializeDarkMode)
