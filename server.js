import express from 'express'
import { Client } from '@elastic/elasticsearch'

let app = express()
let port = process.env.PORT || 5000

let client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' })

app.get('/posts', async function (request, response) {
  if (request.query.search == null) {
    response.send([])
    return
  }

  let results = await client.search({
    index: 'posts',
    query: {
      match: { text: request.query.search },
    },
  })

  response.send(
    results.hits.hits.map(function (result) {
      return { ...result._source }
    }),
  )
})

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
