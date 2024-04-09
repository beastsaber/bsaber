<script lang="ts">
  import type { MapsOfTheWeekPagePaginatedSSRData } from './+page.server'
  import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
  import PaginationBar from '$lib/PaginationBar.svelte'
  import MetaHead from '$lib/MetaHead.svelte'

  export let data: MapsOfTheWeekPagePaginatedSSRData

  const getPageLink = (page: number) => `/maps-of-the-week/${page}`
</script>

<MetaHead />

<div class="motw-list">
  {#each data.mapsOfTheWeek as singleMapOfTheWeek (singleMapOfTheWeek.startDate)}
    <MapOfTheWeekSection mapOfTheWeek={singleMapOfTheWeek} showHeader={false} />
  {/each}
</div>

<div class="pagination-bar-container">
  <PaginationBar currentPage={data.currentPage} numberOfPages={data.pageCount} {getPageLink} />
</div>

<style>
  :global(.motw-list > .motw-container) {
    margin: 1rem 0 0.5rem 0 !important;
  }

  .pagination-bar-container {
    margin-top: 1.3rem;
  }
</style>
