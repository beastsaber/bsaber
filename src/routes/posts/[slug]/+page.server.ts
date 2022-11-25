import { readFileSync } from 'fs'
import frontmatter from 'front-matter'

import { resolve } from 'path'

export async function load({ params }) {
  const markdown = await readFileSync(resolve(`./src/collections/posts/${params.slug}.md`), {
    encoding: 'utf8',
  })

  const { attributes, body } = frontmatter(markdown)
  return {
    attributes,
    body,
  }
}
