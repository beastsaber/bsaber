import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  const curated = await fetch('https://api.beatsaver.com/maps/latest?sort=CURATED').then((res) =>
    res.json(),
  )
  let maps = curated.docs
  maps.length = 10

  maps = maps.map((map) => {
    const diffsArray = []

    map.versions[0].diffs.forEach((data) => {
      diffsArray.push({
        characteristic: data.characteristic,
        difficulty: data.difficulty,
      })
    })

    return {
      id: map.id,
      name: map.name,
      description: map.description,
      uploader: map.uploader.name,
      difficulties: diffsArray,
      upvotes: map.stats.upvotes,
      downvotes: map.stats.downvotes,
      fileDownload: map.versions[0].downloadURL,
      coverURL: map.versions[0].coverURL,
      previewURL: map.versions[0].previewURL,
      tags: map.tags,
    }
  })

  res.send(maps)
})

export default router
