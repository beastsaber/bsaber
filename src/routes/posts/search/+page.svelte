<script lang="ts">
  import type { Post } from '../../../types'
  import PostListCard from '$lib/PostListCard.svelte'
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'

  export let data
  let posts: Post[] = []

  const updatePostsAccordingToSearchQuery = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get('q')
    const fuse = new Fuse(data.posts, {
      keys: ['title', 'homepageText'],
      includeScore: true,
      threshold: 0.3,
    })

    if (searchQuery) {
      posts = fuse.search(searchQuery).map(({ item }) => {
        return {
          ...item,
        }
      })
    } else {
      posts = data.posts
    }
  }

  onMount(() => {
    updatePostsAccordingToSearchQuery()
  })
</script>

<h1>Article Search</h1>
<div class="cards">
  {#each posts as post}
    <PostListCard {post} />
  {/each}
</div>

<style lang="scss">
  h1 {
    margin-bottom: 1em;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
