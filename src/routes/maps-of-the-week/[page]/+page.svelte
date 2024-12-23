<script lang="ts">
  import type { MapsOfTheWeekPagePaginatedSSRData } from './+page.server'
  import MapOfTheWeekSection from '$lib/MapOfTheWeekSection.svelte'
  import PaginationBar from '$lib/PaginationBar.svelte'
  import MetaHead from '$lib/MetaHead.svelte'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'
  import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

  export let data: MapsOfTheWeekPagePaginatedSSRData

  const getPageLink = (page: number) => `/maps-of-the-week/${page}`
</script>

<MetaHead
  title="Maps of the Week"
  description="A listing of all Maps of the Week. These maps are recommended by Curators, selected by Senior Curators, and have a level of quality and craftsmanship that demonstrates clear attention to detail in capturing the music."
/>

<div class="header">
  <div class="title">
    <h1>Maps of the Week</h1>
  </div>
  <div class="download-container">
    <div class="text">Download the entire collection from BeatSaver:</div>
    <div class="buttons">
      <a href="https://beatsaver.com/playlists/7483">
        <img src="/beatsaverlogo.svg" alt="BeatSaver" style="height: 16px; width: 16px" />
      </a>
      <a class="zip" href="https://api.beatsaver.com/playlists/id/7483/download">
        <Fa icon={faDownload} />
      </a>
      <a
        class="one"
        href="bsplaylist://playlist/https://api.beatsaver.com/playlists/id/7483/download"
      >
        <Fa icon={faCloudDownloadAlt} />
      </a>
    </div>
  </div>
</div>

<div class="motw-list">
  {#each data.mapsOfTheWeek as singleMapOfTheWeek (singleMapOfTheWeek.startDate)}
    <MapOfTheWeekSection mapOfTheWeek={singleMapOfTheWeek} showHeader={false} />
  {/each}
</div>

<div class="pagination-bar-container">
  <PaginationBar currentPage={data.currentPage} numberOfPages={data.pageCount} {getPageLink} />
</div>

<style lang="scss">
  :global(.motw-list > .motw-container) {
    margin: 1rem 0 0.5rem 0 !important;
  }

  .pagination-bar-container {
    margin-top: 1.3rem;
  }

  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
  }
  @media (max-width: 794px) {
    .header {
      flex-direction: column;
      align-items: start;
    }
  }
  .text {
    display: flex;
  }
  .download-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    & a {
      color: white;
      transition: transform 0.3s ease;
    }

    & a:hover {
      transform: scale(1.2);
    }
  }

  .zip,
  .one {
    display: flex;
    justify-content: center;
  }
</style>
