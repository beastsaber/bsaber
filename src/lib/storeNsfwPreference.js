import { writable } from 'svelte/store'

export const filterNsfw = writable(true) // Default setting to true
export const nsfwToggleVisibility = writable(false)

if (typeof window != 'undefined') {
  const storedPreference = localStorage.getItem('filterNsfw')
  if (storedPreference != null) {
    filterNsfw.set(JSON.parse(storedPreference))
  }

  filterNsfw.subscribe((value) => {
    localStorage.setItem('filterNsfw', JSON.stringify(value))
  })
}
