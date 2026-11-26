import { retrievePostDataWithAuthorAndContributors } from '#lib/retrieveCollectionData.ts'
export const load = () =>
  retrievePostDataWithAuthorAndContributors(
    'installing-the-mod-guide-necessary-for-any-custom-songs',
  )
