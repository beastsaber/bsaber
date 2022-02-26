export async function get() {
  let curators = await Promise.all(
    Object.entries(import.meta.glob('/src/collections/curation-team/*.md')).map(
      async ([path, module]) => {
        const { metadata } = await module()
        return { ...metadata }
      },
    ),
  )
  return {
    body: {
      curators,
    },
  }
}
