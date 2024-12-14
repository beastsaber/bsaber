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
    window.netlifyIdentity.on('login', (user) => {
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

function handleRedirect(user) {
  if (user) {
    const roles = user.app_metadata?.roles || []
    if (roles.includes('admin')) {
      window.location.href = '/cms/admin/index.html'
    } else if (roles.includes('motw')) {
      window.location.href = '/cms/motw/index.html'
    } else {
      window.location.href = '/cms/index.html'
    }
  }
}

function autoLogout(expirationTime) {
  const timeUntilExpiry = expirationTime - Date.now()
  if (timeUntilExpiry > 0) {
    setTimeout(() => {
      window.netlifyIdentity.logout()
      alert('Session expired. You have been logged out.')
    }, timeUntilExpiry)
  }
}

function checkTokenExpirationOnLoad() {
  const expirationTime = localStorage.getItem('tokenExpiration')
  if (expirationTime && Date.now() > expirationTime) {
    window.netlifyIdentity.logout()
    alert('Session expired. You have been logged out.')
  }
}
