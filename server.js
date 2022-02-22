import 'dotenv/config'
import express from 'express'
import { Client } from '@opensearch-project/opensearch'

let app = express()
let port = process.env.PORT || 5000

let client = new Client({ node: process.env.OPENSEARCH_URL || 'http://localhost:9200' })

app.get('/posts', async function (request, response) {
  if (request.query.search == null) {
    response.send([])
    return
  }

  let results = await client.search({
    index: 'posts',
    body: {
      query: {
        match: {
          text: {
            query: request.query.search,
          },
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

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
