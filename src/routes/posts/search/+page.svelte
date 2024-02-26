<script lang="ts">
  import type { Post } from '../../../types'
  import PostListCard from '$lib/PostListCard.svelte'
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'
  import Search from '$lib/Search.svelte'

  export let data
  let posts: Post[] = []

  onMount(() => {
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
  })
</script>

<h1>Article Search</h1>
<div class="force-center">
  <Search forceSearchType={'Content'} />
</div>
<div class="cards">
  {#each posts as post}
    <PostListCard {post} />
  {/each}
</div>

<style lang="scss">
  h1 {
    margin-bottom: 1em;
  }

  .force-center {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
  }

  // Very unwiedly component
  // This will it will only take as much width as it needs and
  // so it can be properly centered
  :global(.force-center .row) {
    width: 0;
    margin: 0;
    padding: 0;
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
