import { retrieveCollectionData } from '$lib/retrieveCollectionData'
export const load = () => retrieveCollectionData('posts', 'curation')
