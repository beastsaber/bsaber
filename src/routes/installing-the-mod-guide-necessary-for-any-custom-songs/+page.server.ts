import { retrievePostDataWithAuthorAndContributors } from '$lib/retrieveCollectionData'
export const load = () =>
  retrievePostDataWithAuthorAndContributors(
    'installing-the-mod-guide-necessary-for-any-custom-songs',
  )
