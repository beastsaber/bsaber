<script lang="ts">
  import MetaHead from '$lib/MetaHead.svelte'
  import PostListCard from '$lib/PostListCard.svelte'
  import PaginationBar from '$lib/PaginationBar.svelte'
  import type { PostPagePaginatedSSRData } from './+page'

  const getPageLink = (page: number) => `/posts/page/${page}`
  export let data: PostPagePaginatedSSRData
</script>

<MetaHead />

<h1>Recent Articles</h1>
<div class="cards">
  {#each data.posts as post (post.slug)}
    <PostListCard {post} />
  {/each}
</div>
<div class="pagination-bar-container">
  <PaginationBar currentPage={data.currentPage} numberOfPages={data.pageCount} {getPageLink} />
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

  .pagination-bar-container {
    margin-top: 2rem;
  }
</style>
