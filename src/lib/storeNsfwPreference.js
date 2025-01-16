import { writable } from 'svelte/store'

export const showNSFW = writable(true) // Default setting to true
export const toggleVisibility = writable(false)

if (typeof window !== 'undefined') {
  const storedPreference = localStorage.getItem('showNSFW')
  if (storedPreference !== null) {
    showNSFW.set(JSON.parse(storedPreference))
  }

  showNSFW.subscribe((value) => {
    localStorage.setItem('showNSFW', JSON.stringify(value))
  })
}
