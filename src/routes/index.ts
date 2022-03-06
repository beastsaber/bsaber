export async function get() {
  let cards = await Promise.all(
    Object.entries(import.meta.glob('/src/routes/**/*.md')).map(async ([path, module]) => {
      const { metadata } = await module()
      const slug = path.split('/').reverse()[0].split('.')[0]
      const { image } = metadata
      return { slug, ...metadata, image: image.replace('/static', '') }
    }),
  )
  cards.length = Math.min(4, cards.length)
  cards = cards.sort(function (a, b) {
    return b.publish.localeCompare(a.publish)
  })
  return {
    body: {
      cards,
    },
  }
}
