// Handles redirects and button displays for user specific conditions

document.addEventListener('DOMContentLoaded', function () {
  const buttonsElement = document.getElementById('buttons')
  const adminLink = document.querySelector('a.admin')
  const motwLink = document.querySelector('a.motw')
  const usernameElement = document.getElementById('username')

  function hideButtons() {
    if (buttonsElement) {
      buttonsElement.style.display = 'none'
    }
  }
  function showButtons() {
    if (buttonsElement) {
      buttonsElement.style.display = 'flex'
    }
  }
  function disableLink(link) {
    if (link) {
      link.style.opacity = '0.38'
      link.removeAttribute('href')
      link.style.cursor = 'not-allowed'
      link.title = 'Access Denied – Insufficient Permissions'
      link.style.transition = 'none'
      link.style.boxShadow = 'none'
      link.style.userSelect = 'none'
    }
  }
  function enableLink(link) {
    if (link) {
      link.style.pointerEvents = 'auto'
      link.style.opacity = '1'
    }
  }
  function setButtonVisibility(roles) {
    enableLink(adminLink)
    enableLink(motwLink)
    if (roles.includes('admin')) {
      if (adminLink) adminLink.style.display = 'inline-block'
      if (motwLink) motwLink.style.display = 'inline-block'
    } else if (roles.includes('motw')) {
      if (motwLink) motwLink.style.display = 'inline-block'
      disableLink(adminLink)
    } else {
      disableLink(adminLink)
      disableLink(motwLink)
      if (adminLink) adminLink.style.display = 'inline-block'
      if (motwLink) motwLink.style.display = 'inline-block'
    }
  }

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('open', () => {})
    window.netlifyIdentity.on('login', async (user) => {
      const token = user.token.access_token
      const expirationTime = jwt_decode(token).exp * 1000
      localStorage.setItem('tokenExpiration', expirationTime)
      const roles = user.app_metadata?.roles || []
      setButtonVisibility(roles)
      handleRedirect(user)
      autoLogout(expirationTime)
      showButtons()

      if (usernameElement) {
        usernameElement.textContent = `Welcome ${user.user_metadata?.full_name || 'User'}!`
      }
    })

    window.netlifyIdentity.on('logout', () => {
      localStorage.removeItem('tokenExpiration')
      hideButtons()
      enableLink(adminLink)
      enableLink(motwLink)
      if (adminLink) adminLink.style.display = 'none'
      if (motwLink) motwLink.style.display = 'none'
    })

    checkTokenExpirationOnLoad()

    const currentUser = window.netlifyIdentity.currentUser()
    if (currentUser) {
      const roles = currentUser.app_metadata?.roles || []
      setButtonVisibility(roles)
      showButtons()

      if (usernameElement) {
        usernameElement.textContent = `Welcome ${currentUser.user_metadata?.full_name || 'User'}!`
      }
    } else {
      disableLink(adminLink)
      disableLink(motwLink)
    }
  } else {
    console.error('Netlify Identity not loaded')
    hideButtons()
  }
})

if (window.netlifyIdentity) {
  netlifyIdentity.on('login', () => netlifyIdentity.close())
  netlifyIdentity.on('logout', () => netlifyIdentity.close())
}

function handleRedirect(user) {
  if (user) {
    const roles = user.app_metadata?.roles || []

    if (roles.includes('admin') || roles.includes('motw')) {
      const overlay = document.getElementById('popup-overlay')
      overlay.style.display = 'block'
      setTimeout(() => {
        overlay.remove()
        if (roles.includes('admin')) {
          window.location.href = '/cms/admin/index.html'
        } else if (roles.includes('motw')) {
          window.location.href = '/cms/motw/index.html'
        }
      }, 2000)
    } else {
      window.location.href = '/cms/index.html'
    }
  }
}

function autoLogout(expirationTime) {
  const timeUntilExpiry = expirationTime - Date.now()
  if (timeUntilExpiry > 0) {
    setTimeout(() => {
      alert('Session expired. You have been logged out.')
      window.netlifyIdentity.logout()
      hideButtons()
    }, timeUntilExpiry)
  }
}

function checkTokenExpirationOnLoad() {
  const expirationTime = localStorage.getItem('tokenExpiration')
  if (expirationTime && Date.now() > expirationTime) {
    alert('Session expired. You have been logged out.')
    window.netlifyIdentity.logout()
    hideButtons()
  }
}

function toggleThemeOptions() {
  const themeOptions = document.getElementById('themeOptions')
  themeOptions.classList.toggle('active')
}

function changeBackground(theme) {
  const backgroundContainer = document.getElementById('backgroundContainer')
  const body = document.body
  backgroundContainer.style.opacity = 0

  setTimeout(() => {
    const themes = {
      theme1: {
        backgroundColor: '#000000',
        backgroundImage: 'linear-gradient(to top left, #61468d, #4e60b9)',
      },
      theme2: {
        backgroundColor: '#333333',
        backgroundImage: 'linear-gradient(to top left, #222222, #444444)',
      },
      theme3: {
        backgroundColor: '#2c3e50',
        backgroundImage: 'linear-gradient(to top left, #2c3e50, #1f305a)',
      },
      theme4: {
        backgroundColor: '#0d1117',
        backgroundImage: 'linear-gradient(to top left, #0d1117, #0d1117)',
      },
      custom: () => {
        const customBackgroundUrl = localStorage.getItem('customBackground')
        if (customBackgroundUrl && /^https?:\/\/[^\s]+$/.test(customBackgroundUrl)) {
          backgroundContainer.style = `
            background-image: url("${sanitizeInput(customBackgroundUrl)}");
            filter: blur(5px);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            height: 100vh;
            width: 100vw;
          `
        } else {
          alert('No valid custom background found.')
          return false
        }
        return true
      },
    }

    if (theme === 'custom') {
      if (!themes.custom()) return
    } else {
      const { backgroundColor, backgroundImage } = themes[theme] || themes.theme1
      body.style.backgroundColor = backgroundColor
      backgroundContainer.style.backgroundImage = backgroundImage
    }

    backgroundContainer.style.opacity = 1
    localStorage.setItem('theme', theme)
  }, 500)
}

document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('themeOptions')
  const toggleButton = document.querySelector('.theme-toggle > button')

  if (!dropdown.contains(event.target) && !toggleButton.contains(event.target)) {
    dropdown.classList.remove('active')
  }
})

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'theme1'
  changeBackground(savedTheme)

  if (savedTheme === 'custom') {
    const customBackground = localStorage.getItem('customBackground')
    if (customBackground) changeBackground('custom')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const userIdInput = document.getElementById('userIdInput')

  userIdInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const inputValue = userIdInput.value.trim()
      if (!inputValue || !/^[a-zA-Z0-9_-]+$/.test(inputValue)) {
        alert('Invalid input. Only letters, numbers, hyphens, and underscores are allowed.')
        return
      }
      fetchBLBackground()
    }
  })
})

async function fetchBLBackground() {
  let userIdOrUsername = document.getElementById('userIdInput').value.trim()

  if (!userIdOrUsername) {
    alert('Please enter a user ID or username.')
    return
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(userIdOrUsername)) {
    alert('Invalid input. Only letters, numbers, hyphens, and underscores are allowed.')
    return
  }

  try {
    let userId
    if (isNumeric(userIdOrUsername)) {
      userId = userIdOrUsername
    } else {
      const searchResponse = await fetch(
        `https://api.beatleader.xyz/players?sortBy=name&page=1&count=1&search=${encodeURIComponent(
          sanitizeInput(userIdOrUsername),
        )}`,
      )
      if (!searchResponse.ok) throw new Error('Failed to fetch user data by username.')

      const searchData = await searchResponse.json()
      if (searchData.data && searchData.data.length > 0) {
        userId = searchData.data[0].id
      } else {
        alert('No user found with that username.')
        return
      }
    }

    const response = await fetch(`https://api.beatleader.xyz/player/${userId}`)
    if (!response.ok) throw new Error('Failed to fetch BeatLeader info.')

    const data = await response.json()
    const profileCover = data.profileSettings?.profileCover || ''

    if (profileCover) {
      localStorage.setItem('customBackground', profileCover)
      localStorage.setItem('lastBackground', 'custom')
      changeBackground('custom')
    } else {
      alert('No profile cover found for this user.')
    }
  } catch (error) {
    console.error('Error fetching BeatLeader profile cover:', error)
    alert('Failed to fetch background from BeatLeader')
  }
}

function sanitizeInput(input) {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(input))
  return div.innerHTML
}

function isNumeric(value) {
  return /^\d+$/.test(value)
}

function removeCustomBackground() {
  localStorage.removeItem('customBackground')
  localStorage.removeItem('lastBackground')
  changeBackground('theme1')
}

function toggleCustomBackgroundSection(event) {
  if (event.target.tagName === 'I') return

  const customBackgroundSection = document.getElementById('customBackgroundSection')
  customBackgroundSection.classList.toggle('active')

  if (customBackgroundSection.classList.contains('active')) {
    const lastBackground = localStorage.getItem('lastBackground')
    if (lastBackground === 'custom') changeBackground('custom')
  }
}
