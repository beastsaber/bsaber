<script lang="ts">
  import type { MapsOfTheWeekPagePaginatedSSRData } from './+page.server'
  import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
  import PaginationBar from '$lib/PaginationBar.svelte'

  export let data: MapsOfTheWeekPagePaginatedSSRData

  const getPageLink = (page: number) => `/maps-of-the-week/${page}`
</script>

{#each data.mapsOfTheWeek as singleMapOfTheWeek}
  <MapOfTheWeekSection mapOfTheWeek={singleMapOfTheWeek} showHeader={false} />
{/each}

<PaginationBar currentPage={data.currentPage} numberOfPages={data.pageCount} {getPageLink} />

<style>
  :global(.motw-container) {
    margin: 1rem 0 0.5rem 0 !important;
  }

  .loading-text {
    margin-top: 1rem;
    margin-bottom: 3rem;
    text-align: center;
  }
</style>
