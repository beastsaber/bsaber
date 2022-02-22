import 'dotenv/config'
import { Client } from '@opensearch-project/opensearch'
import yaml from 'js-yaml'
import fs from 'fs'

let client = new Client({
  node: process.env.OPENSEARCH_URL || 'http://localhost:9200',
})

async function createIndices() {
  try {
    await client.indices.delete({ index: 'posts' })
  } catch (error) {
    console.log(error)
  }
  await client.indices.create({
    index: 'posts',
  })

  let fileNames = fs.readdirSync('./src/routes/posts')
  for (let fileName of fileNames) {
    let data = fs.readFileSync(`./src/routes/posts/${fileName}`, 'utf8')
    let slug = fileName.replace('.md', '')
    let metadata = yaml.load(data.split('---')[1])
    let body = data.split('---')[2].trim()
    await client.index({
      index: 'posts',
      body: {
        slug: slug,
        title: metadata.title,
        text: body,
      },
      refresh: true,
    })
  }
}

createIndices().catch(console.log)
