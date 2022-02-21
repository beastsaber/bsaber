import { Client } from '@elastic/elasticsearch'
import yaml from 'js-yaml'
import fs from 'fs'

let client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' })

async function createIndices() {
  await client.indices.delete({ index: '_all' })

  let fileNames = fs.readdirSync('./src/routes/posts')
  for (let fileName of fileNames) {
    let data = fs.readFileSync(`./src/routes/posts/${fileName}`, 'utf8')
    let slug = fileName.replace('.md', '')
    let metadata = yaml.load(data.split('---')[1])
    let body = data.split('---')[2].trim()
    await client.index({
      index: 'posts',
      document: {
        slug: slug,
        title: metadata.title,
        text: body,
      },
    })
  }
}

createIndices().catch(console.log)
