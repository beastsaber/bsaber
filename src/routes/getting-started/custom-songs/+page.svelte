<script lang="ts">
  import type { Post } from '../../../types'
  import PostPage from '$lib/PostPage.svelte'
  import type { CollectionDataTypeMap } from '$lib/retrieveCollectionData'

  export let data: CollectionDataTypeMap['posts']
  if (data.body === undefined) throw new Error('No body found in post data')
  const post: Post = { ...data.attributes, body: data.body }
</script>

<PostPage {post} />
