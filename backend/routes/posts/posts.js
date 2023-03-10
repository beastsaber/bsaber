import express from 'express'
const router = express.Router()

import { Client } from '@opensearch-project/opensearch'
let client = new Client({ node: process.env.OPENSEARCH_URL || 'http://localhost:9200' })

router.get('/', async (req, res) => {
  if (req.search == null) {
    return res.send([])
  }

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
  })

  res.send(
    results.body.hits.hits.map((result) => {
      return { ...result._source }
    }),
  )
})

export default router
