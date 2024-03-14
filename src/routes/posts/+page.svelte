<script lang="ts">
  import type { Post } from '../../types'
  import PostListCard from '$lib/PostListCard.svelte'
  import MetaHead from '$lib/MetaHead.svelte'

  export let data
  let posts: Post[] = data.posts
</script>

<MetaHead />

<h1>Recent Articles</h1>
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
