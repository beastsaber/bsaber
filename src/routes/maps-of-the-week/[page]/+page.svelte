<script lang="ts">
  import type { MapsOfTheWeekPagePaginatedSSRData } from './+page.server'
  import type { MapOfTheWeek } from '../../../types.ts'
  import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
  import { onMount } from 'svelte'
  import PaginationBar from '$lib/PaginationBar.svelte'

  export let data: MapsOfTheWeekPagePaginatedSSRData
  let mapsOfTheWeek: MapOfTheWeek[] = []

  const getPageLink = (page: number) => `/maps-of-the-week/${page}`
  let loading = true

  onMount(async () => {
    loading = true;
    mapsOfTheWeek = await Promise.all(
      data.mapsOfTheWeek.map(async (singleMapOfTheWeek) => {
        const beatSaverMapData = await fetch(
          `https://api.beatsaver.com/maps/id/${singleMapOfTheWeek.map.id}`,
        ).then((res) => res.json())
        const beatSaverMapUploaderData = await fetch(
          `https://api.beatsaver.com/users/id/${beatSaverMapData.uploader.id}`,
        ).then((res) => res.json())

        return {
          map: {
            id: singleMapOfTheWeek.map.id,
            name: beatSaverMapData.name,
            coverUrl: singleMapOfTheWeek.map.coverUrl,
            uploader: {
              id: beatSaverMapData.uploader.id,
              name: beatSaverMapData.uploader.name,
              avatar: beatSaverMapData.uploader.avatar,
              admin: beatSaverMapUploaderData.admin,
              curator: beatSaverMapUploaderData.curator,
              verifiedMapper: beatSaverMapUploaderData.verifiedMapper,
            },
          },
          review: singleMapOfTheWeek.review,
          startDate: singleMapOfTheWeek.startDate,
        }
      }),
    )

    loading = false;
  });
</script>

{#if loading}
  <div class="loading-text">Loading...</div>
{:else}
  {#each mapsOfTheWeek as singleMapOfTheWeek}
    <MapOfTheWeekSection mapOfTheWeek={singleMapOfTheWeek} showHeader={false} />
  {/each}
{/if}

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
