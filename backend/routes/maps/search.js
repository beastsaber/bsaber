import express from 'express'
const router = express()

router.get('/', async (req, res) => {
  const strict = req.strict
  const query = req.queried
  const page = req.page

  const data = await fetch(
    `https://api.beatsaver.com/search/text/${page}?q=${query}&sortOrder=Latest`,
  ).then((res) => res.json())

  const maps = data.docs

  const mapArray = []

  if (strict == 'true') {
    maps.forEach((map) => {
      if (
        map.name.toLowerCase().includes(query.toLowerCase()) ||
        map.description.toLowerCase().includes(query.toLowerCase())
      ) {
        const diffsArray = []

        map.versions[0].diffs.forEach((data) => {
          diffsArray.push({
            characteristic: data.characteristic,
            difficulty: data.difficulty,
          })
        })

        mapArray.push({
          id: map.id,
          name: map.name,
          uploader: map.uploader.name,
          difficulties: diffsArray,
          upvotes: map.stats.upvotes,
          downvotes: map.stats.downvotes,
          fileDownload: map.versions[0].downloadURL,
          coverURL: map.versions[0].coverURL,
          previewURL: map.versions[0].previewURL,
          tags: map.tags,
        })
      }
    })
  } else {
    maps.forEach((map) => {
      const diffsArray = []

      map.versions[0].diffs.forEach((data) => {
        diffsArray.push({
          characteristic: data.characteristic,
          difficulty: data.difficulty,
        })
      })

      mapArray.push({
        id: map.id,
        name: map.name,
        uploader: map.uploader.name,
        difficulties: diffsArray,
        upvotes: map.stats.upvotes,
        downvotes: map.stats.downvotes,
        fileDownload: map.versions[0].downloadURL,
        coverURL: map.versions[0].coverURL,
        previewURL: map.versions[0].previewURL,
        tags: map.tags,
      })
    })
  }

  res.send(mapArray)
})

export default router
