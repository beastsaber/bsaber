<script lang="ts">
  import type { FeaturedPlaylistOverviewPageData } from './+page.server'
  import PlaylistCards from '$lib/PlaylistCards.svelte'
  import PaginationBar from '$lib/PaginationBar.svelte'
  import MetaHead from '$lib/MetaHead.svelte'

  export let data: FeaturedPlaylistOverviewPageData

  let { playlists, currentPage, pageCount, pageSize, featuredPlaylistOverwriteMap } = data

  const getPageLink = (page: number) => {
    return `/playlists/page/${page}`
  }
</script>

<MetaHead title="Featured Playlists" />

<h1 class="page-title">Featured Packs</h1>
<br />

<PlaylistCards {playlists} overwriteMap={featuredPlaylistOverwriteMap} />

<div class="pagination-bar">
  <PaginationBar {currentPage} numberOfPages={pageCount} {getPageLink} forceExternal={true} />
</div>

<style lang="scss">
  @import 'src/scss/variables';
  .pagination-bar {
    margin-top: 1.5rem;
  }

  .page-title {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid $color-muted-text;
    text-align: left;
  }
</style>
