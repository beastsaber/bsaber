import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  const rankedSS = await fetch(
    'https://api.beatsaver.com/search/text/0?ranked=true&sortOrder=Latest',
  ).then((res) => res.json())
  let mapsSS = rankedSS.docs
  mapsSS.length = 10

  mapsSS = mapsSS.map((map) => {
    const diffsArray = []

    map.versions[0].diffs.forEach((data) => {
      diffsArray.push({
        characteristic: data.characteristic,
        difficulty: data.difficulty,
        stars: data.stars,
      })
    })

    return {
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
    }
  })

  const rankedBL = await fetch(
    'https://api.beatleader.xyz/leaderboards?page=1&count=10&allTypes=0&stars_from=0.01',
  ).then((res) => res.json())
  let mapsBL = rankedBL.data
  const mapsBLArray = []

  for (const map of mapsBL) {
    const diffsArray = []

    map.song.difficulties.forEach((data) => {
      diffsArray.push({
        characteristic: data.modeName,
        difficulty: data.difficultyName,
        stars: data.stars,
      })
    })

    const bsMap = await fetch(`https://api.beatsaver.com/maps/id/${map.song.id}`).then((res) =>
      res.json(),
    )

    mapsBLArray.push({
      id: bsMap.id,
      name: bsMap.name,
      uploader: bsMap.uploader.name,
      difficulties: diffsArray,
      upvotes: bsMap.stats.upvotes,
      downvotes: bsMap.stats.downvotes,
      fileDownload: bsMap.versions[0].downloadURL,
      coverURL: bsMap.versions[0].coverURL,
      previewURL: bsMap.versions[0].previewURL,
      tags: bsMap.tags,
    })
  }

  res.send({
    scoresaber: mapsSS,
    beatleader: mapsBLArray,
  })
})

export default router
