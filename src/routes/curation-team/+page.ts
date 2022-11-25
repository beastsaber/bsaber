export async function load() {
  const curators = await Promise.all(
    Object.entries(import.meta.glob('/src/collections/curation-team/*.md')).map(
      async ([path, module]) => {
        const { metadata } = await module()
        const { image } = metadata
        return { ...metadata, image: image.replace('/static', '') }
      },
    ),
  )
  return {
    curators,
  }
}
