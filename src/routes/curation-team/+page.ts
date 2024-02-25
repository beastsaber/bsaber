import type { Uploader } from '../../types'

export async function load() {
  const curators: Uploader[] = await fetch(
    `https://api.beatsaver.com/users/curators`,
  ).then((res) => res.json())

  return {
    curators,
  }
}
