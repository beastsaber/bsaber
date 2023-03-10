// Import ENV file

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

// Import Express and cache middleware

import express from 'express'
import apicache from 'apicache'

// Import routes

import search from './routes/maps/search.js'
import topPlayers from './routes/players/top-players.js'
import latestCurated from './routes/maps/latest-curated.js'
import latestPlaylists from './routes/maps/latest-playlists.js'
import latestRanked from './routes/maps/latest-ranked.js'
import posts from './routes/posts/posts.js'

// Create Express app

let app = express()
let port = process.env.PORT || 5000
let cache = apicache.middleware

// Set headers

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Set routes

app.use(
  '/posts',
  async (req, res, next) => {
    req.search = req.query.search
    next()
  },
  posts,
)

app.use('/top-players', cache('15 minutes'), topPlayers)

app.use('/latest-curated', cache('5 minutes'), latestCurated)

app.use('/latest-playlists', cache('5 minutes'), latestPlaylists)

app.use('/latest-ranked', cache('1 hour'), latestRanked)

app.use(
  '/search/:query/:page',
  async (req, res, next) => {
    req.queried = req.params.query
    req.page = req.params.page
    req.strict = req.query.strict
    next()
  },
  search,
)

app.listen(port, () => {
  console.log(`listening on port ${port}.`)
})
