import { beatSaverClientFactory } from './beatsaver-client'

let featuredPlaylistCount: number | null = null

const searchStartPage = 10
const searchEndPage = 20

export const getFeaturedPlaylistCount = async (): Promise<number> => {
  if (featuredPlaylistCount !== null) {
    return featuredPlaylistCount
  }

  let currentTestPage = searchStartPage
  const beatSaverClient = beatSaverClientFactory.create()
  while (currentTestPage <= searchEndPage) {
    const response = await beatSaverClient.fetch(
      `/playlists/search/${currentTestPage}?sortOrder=Curated&curated=true`,
    )

    if (response.status === 200) {
      const data = await response.json()
      if (data.docs.length === 0) {
        featuredPlaylistCount = currentTestPage
        break
      } else if (data.docs.length < 20) {
        featuredPlaylistCount = currentTestPage + 1
        break
      } else {
        currentTestPage += 1
        continue
      }
    } else {
      throw new Error('Failed to fetch playlists')
    }
  }

  return featuredPlaylistCount ?? currentTestPage
}
