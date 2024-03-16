import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import type { Community, CommunityLabel } from '../../types'

export type CommunityHubSSRData = {
  communities: Community[]
  availableLabels: (CommunityLabel & { activated: boolean })[]
}

export const load = async (): Promise<CommunityHubSSRData> => {
  const communityCollections = (await retrieveAllCollectionDataOfType('communities')).sort(
    (a, b) => {
      return a.attributes.name.localeCompare(b.attributes.name)
    },
  )

  communityCollections.forEach((community) =>
    community.attributes.labels.sort((a, b) => a.localeCompare(b)),
  )

  const communityLabelsCollections = (
    await retrieveAllCollectionDataOfType('community-labels')
  ).sort((a, b) => {
    return a.attributes.label.localeCompare(b.attributes.label)
  })

  return {
    communities: communityCollections.map((community) => community.attributes),
    availableLabels: communityLabelsCollections.map((community) => ({
      ...community.attributes,
      activated: false,
    })),
  }
}
