import { resize } from '$lib/resizer'

export async function get() {
  const curators = await Promise.all(
    Object.entries(import.meta.glob('/src/collections/curation-team/*.md')).map(
      async ([path, module]) => {
        const { metadata } = await module()
        const image = await resize(metadata.image, 128, 128)
        return { ...metadata, image }
      },
    ),
  )
  return {
    body: {
      curators,
    },
  }
}
