import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

import express from 'express'
import apicache from 'apicache'
import { Client } from '@opensearch-project/opensearch'
import fetch from 'node-fetch'

let app = express()
let port = process.env.PORT || 5000
let cache = apicache.middleware

let client = new Client({ node: process.env.OPENSEARCH_URL || 'http://localhost:9200' })

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/posts', async function (request, response) {
  if (request.query.search == null) {
    response.send([])
    return
  }

  let results = await client.search({
    index: 'posts',
    body: {
      query: {
        multi_match: {
          query: request.query.search,
          fields: [
            'title^3', // ^ multiples the field's score
            'text',
          ],
        },
      },
    },
  })

  response.send(
    results.body.hits.hits.map(function (result) {
      return { ...result._source }
    }),
  )
})

app.get('/top-players', cache('5 minutes'), async function (request, response) {
  let playersResponse = await fetch('https://scoresaber.com/api/players')
  let json = await playersResponse.json()
  let players = json.players
  players.length = 10
  players = players.map(function (player) {
    return {
      rank: player.rank,
      avatar: player.profilePicture,
      name: player.name,
      score: player.pp.toPrecision(7).toLocaleString(),
      change: weeklyChange(player.histories),
    }
  })
  response.send(players)
})

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})

function weeklyChange(histories) {
  let changes = histories.split(',')
  let lastWeek
  if (changes.length >= 7) {
    lastWeek = Number(changes[changes.length - 7])
  } else {
    lastWeek = Number(changes[0])
  }

  if (lastWeek != 999999) {
    return lastWeek - Number(changes[changes.length - 1])
  }
}
