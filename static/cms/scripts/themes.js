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
  if (userIdInput) {
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
  }
})

async function fetchBLBackground() {
  const userIdOrUsername = document.getElementById('userIdInput').value.trim()

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
    let possibleCover = ''

    if (isNumeric(userIdOrUsername)) {
      userId = userIdOrUsername
    } else {
      const searchResponse = await fetch(
        `https://api.beatleader.xyz/players?sortBy=name&page=1&count=2&search=${encodeURIComponent(
          sanitizeInput(userIdOrUsername),
        )}`,
      )
      if (!searchResponse.ok) throw new Error('Failed to fetch user data by username.')

      const searchData = await searchResponse.json()
      if (!Array.isArray(searchData.data) || searchData.data.length === 0) {
        alert('No user found with that username.')
        return
      }

      const foundUser = searchData.data[0]
      userId = foundUser.id
      possibleCover = foundUser.profileCover || ''
    }

    const response = await fetch(`https://api.beatleader.xyz/player/${userId}`)
    if (!response.ok) throw new Error('Failed to fetch BeatLeader info.')

    const data = await response.json()

    const finalCover = data.profileCover || data.profileSettings?.profileCover || possibleCover

    if (finalCover) {
      localStorage.setItem('customBackground', finalCover)
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
  const customBackgroundSection = document.getElementById('customBackgroundSection')
  customBackgroundSection.classList.toggle('active')

  if (customBackgroundSection.classList.contains('active')) {
    const lastBackground = localStorage.getItem('lastBackground')
    if (lastBackground === 'custom') {
      changeBackground('custom')
    }
  }
}
