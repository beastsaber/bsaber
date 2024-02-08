<script lang="ts">
  import type { MapsOfTheWeekPagePaginatedSSRData } from './+page.server'
  import type { MapOfTheWeek } from '../../../types.ts'
    import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
    import { onMount } from 'svelte'

  export let data: MapsOfTheWeekPagePaginatedSSRData;
  let mapsOfTheWeek: MapOfTheWeek[] = [];
  
  
  onMount(async () => {
    for (const singleMapOfTheWeek of data.mapsOfTheWeek) {
      const beatSaverMapData = await fetch(
        `https://api.beatsaver.com/maps/id/${singleMapOfTheWeek.map.id}`,
      ).then((res) => res.json())
      const beatSaverMapUploaderData = await fetch(
        `https://api.beatsaver.com/users/id/${beatSaverMapData.uploader.id}`,
      ).then((res) => res.json())

      mapsOfTheWeek = [...mapsOfTheWeek,{
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
      }];
    }
  });
</script>

{#each mapsOfTheWeek as singleMapOfTheWeek}
  <MapOfTheWeekSection mapOfTheWeek={singleMapOfTheWeek} showHeader={false} />
{/each}

<style>
    :global(.motw-container) {
        margin: 1rem 0 0.5rem 0 !important;
    }
</style>