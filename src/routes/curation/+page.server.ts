import { retrieveCollectionData } from '$lib/retrieveCollectionData'
export const load = async () => {
  const output = await retrieveCollectionData('posts', 'curation')
  output.test = import.meta.env.DEPLOY_PRIME_URL
  return output
}
