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

let client = new Client({ node: process.env.OPENSEARCH_URL || 'http://localhost:9200' });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});

app.get("/posts", async (req, res) => {
  if (req.query.search == null) {
    res.send([])
    return
  };

  let results = await client.search({
    index: 'posts',
    body: {
      query: {
        multi_match: {
          query: req.query.search,
          fields: [
            'title^3', // ^ multiples the field's score
            'text',
          ],
        },
      },
    },
  });

  res.send(
    results.body.hits.hits.map((result) => {
      return { ...result._source }
    }),
  );
});

app.get("/top-players", cache("5 minutes"), async (req, res) => {
  const playersResponseSS = await fetch("https://scoresaber.com/api/players").then(res => res.json())
  let playersSS = playersResponseSS.players
  playersSS.length = 10

  playersSS = playersSS.map((player) => {
    return {
      rank: player.rank,
      avatar: player.profilePicture,
      name: player.name,
      score: player.pp,
      change: weeklyChange(player.histories),
    };
  });

  const playersResponseBL = await fetch("https://api.beatleader.xyz/players?sortBy=pp&page=1&count=10&order=desc&mapsType=ranked&friends=false").then(res => res.json())
  let playersBL = playersResponseBL.data

  playersBL = playersBL.map((player) => {
    return {
      rank: player.rank,
      avatar: player.avatar,
      name: player.name,
      score: player.pp,
      change: weeklyChange(player.histories),
    };
  });

  res.send({
    "scoresaber": playersSS,
    "beatleader": playersBL
  });
});

app.get("/latest-curated", cache("5 minutes"), async (req, res) => {
  const curated = await fetch("https://api.beatsaver.com/maps/latest?sort=CURATED").then(res => res.json())
  let maps = curated.docs
  maps.length = 10

  maps = maps.map((map) => {
    const diffsArray = [];

    map.versions[0].diffs.forEach(data => {
      diffsArray.push({
        characteristic: data.characteristic,
        difficulty: data.difficulty,
      });
    });

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
    };
  });

  res.send(maps)
});

app.get("/latest-playlists", cache("5 minutes"), async (req, res) => {
  const playlistRes = await fetch("https://api.beatsaver.com/playlists/search/0?curated=true&sortOrder=Latest").then(res => res.json())
  let playlists = playlistRes.docs
  playlists.length = 4

  playlists = playlists.map((playlist) => {
    return {
      id: playlist.playlistId,
      name: playlist.name,
      image: playlist.playlistImage,
    };
  });

  res.send(playlists)
});

app.listen(port, () => {
  console.log(`listening on port ${port}.`)
});

function weeklyChange(histories) {
  let changes = histories.split(',')
  let current;
  if (changes.length >= 7) {
    let weekAgo = Number(changes[changes.length - 8])
    let today = Number(changes[changes.length - 1])
    current = weekAgo - today
  } else {
    current = Number(changes[0])
  };

  if (current != 999999) {
    return current
  };
};