<script lang="ts">
  import type { PostWithAuthorAndContributor } from '../../types'
  import PostPage from '$lib/PostPage.svelte'
  import type { ConvertToAttributeKeyedObject } from '$lib/retrieveCollectionData'

  export let data: ConvertToAttributeKeyedObject<PostWithAuthorAndContributor>
  if (data.body === undefined) throw new Error('No body found in post data')
  const post: PostWithAuthorAndContributor = { ...data.attributes, body: data.body }
</script>

<PostPage {post} />
