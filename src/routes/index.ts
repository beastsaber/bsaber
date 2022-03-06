import { resize } from '$lib/resizer'

export async function get() {
  let cards = await Promise.all(
    Object.entries(import.meta.glob('/src/routes/**/*.md')).map(async ([path, module]) => {
      const { metadata } = await module()
      const slug = path.split('/').reverse()[0].split('.')[0]
      const image = await resize(metadata.image, 420, 420)
      return { slug, ...metadata, image }
    }),
  )
  cards = cards.sort(function (a, b) {
    return b.publish.localeCompare(a.publish)
  })
  cards.length = Math.min(4, cards.length)
  return {
    body: {
      cards,
    },
  }
}
