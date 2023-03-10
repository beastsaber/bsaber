import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  const playlistRes = await fetch(
    'https://api.beatsaver.com/playlists/search/0?curated=true&sortOrder=Latest',
  ).then((res) => res.json())
  let playlists = playlistRes.docs
  playlists.length = 4

  playlists = playlists.map((playlist) => {
    return {
      id: playlist.playlistId,
      name: playlist.name,
      image: playlist.playlistImage,
    }
  })

  res.send(playlists)
})

export default router
