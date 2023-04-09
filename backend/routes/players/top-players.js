import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

function weeklyChange(histories) {
  let changes = histories.split(',')
  let current
  if (changes.length >= 7) {
    let weekAgo = Number(changes[changes.length - 8])
    let today = Number(changes[changes.length - 1])
    current = weekAgo - today
  } else {
    current = Number(changes[0])
  }

  if (current != 999999) {
    return current
  }
}

router.get('/', async (req, res) => {
  const playersResponseSS = await fetch('https://scoresaber.com/api/players').then((res) =>
    res.json(),
  )
  let playersSS = playersResponseSS.players
  playersSS.length = 10

  playersSS = playersSS.map((player) => {
    return {
      rank: player.rank,
      avatar: player.profilePicture,
      name: player.name,
      score: player.pp,
      change: weeklyChange(player.histories),
    }
  })

  const playersResponseBL = await fetch(
    'https://api.beatleader.xyz/players?sortBy=pp&page=1&count=10&order=desc&mapsType=ranked&friends=false',
  ).then((res) => res.json())
  let playersBL = playersResponseBL.data

  playersBL = playersBL.map((player) => {
    return {
      rank: player.rank,
      avatar: player.avatar,
      name: player.name,
      score: player.pp,
      change: player.rank - player.lastWeekRank,
    }
  })

  let playersResponseAS = await fetch('https://api.accsaber.com/categories/overall/standings').then(
    (res) => res.json(),
  )
  playersResponseAS.length = 10

  let playersAS = playersResponseAS.map((player) => {
    return {
      rank: player.rank,
      avatar: player.avatarUrl,
      name: player.playerName,
      score: Number(player.ap.toFixed(2)),
      change: player.rank - player.rankLastWeek,
    }
  })

  res.send({
    scoresaber: playersSS,
    beatleader: playersBL,
    accsaber: playersAS,
  })
})

export default router
