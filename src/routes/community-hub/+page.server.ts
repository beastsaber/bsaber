import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import type { Community, CommunityLabel } from '../../types'

export type CommunityHubSSRData = {
  communities: Community[]
  availableLabels: (CommunityLabel & { activated: boolean })[]
}

export const load = async (): Promise<CommunityHubSSRData> => {
  const communityCollections = await retrieveAllCollectionDataOfType('communities')
  const communityLabelsCollections = await retrieveAllCollectionDataOfType('community-labels')

  return {
    communities: communityCollections.map((community) => community.attributes),
    availableLabels: communityLabelsCollections.map((community) => ({
      ...community.attributes,
      activated: false,
    })),
  }
}
