<script lang="ts">
  import type { Beatmap } from '../types'
  import { onMount } from 'svelte'
  import Uploader from '$lib/Uploader.svelte'
  import Tags from '$lib/Tags.svelte'
  import Difficulties from '$lib/Difficulties.svelte'
  import OneClickDownloadButton from './OneClickDownloadButton.svelte'
  import ZipDownloadButton from './ZipDownloadButton.svelte'

  export let sortOrder: 'FIRST_PUBLISHED' | 'UPDATED' | 'LAST_PUBLISHED' | 'CREATED' | 'CURATED' =
    'FIRST_PUBLISHED'
  export let verified: boolean | undefined = undefined
  export let maxCards: number | undefined = undefined // max amount of cards to show

  let maps: Beatmap[] = []

  onMount(async () => {
    await getMaps()
  })

  let baseUrl = import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com'
  let url = `${baseUrl}/maps/latest?sort=${sortOrder}${
    verified !== undefined ? `&verified=${verified}` : ''
  }&pageSize=${maxCards ?? 8}`

  async function getMaps() {
    let response = await fetch(url)
    maps = await response.json().then((json) => json['docs'] as Beatmap[])
  }
  let hoveredIndex = -1
</script>

<div class="cards max-cols-3">
  {#if maps.length !== 0}
    {#each maps as map, mapCardIndex}
      <div
        class="card"
        on:mouseenter={() => (hoveredIndex = mapCardIndex)}
        on:mouseleave={() => (hoveredIndex = -1)}
      >
        <a
          href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/maps/${map.id}`}
          class="image-link"
        >
          <img
            src={`${import.meta.env.VITE_BEATSAVER_CDN_BASE || 'https://cdn.beatsaver.com'}/${
              map.versions[0].hash
            }.jpg`}
            alt={map.name}
          />
        </a>
        <div class="content">
          <div>
            <a
              href={`${import.meta.env.VITE_BEATSAVER_BASE || 'https://beatsaver.com'}/maps/${
                map.id
              }`}
              class="title"
              title={map.name}
            >
              {map.name}
            </a>
            <Uploader uploader={map.uploader} curator={map.curator} />
          </div>
          <div class="tag-row-container">
            <Tags tags={map.tags} />
            <div class="zip-download-button-container show-on-hover">
              <ZipDownloadButton downloadURL={map.versions[0].downloadURL} />
            </div>
          </div>
          <div class="last-row-container">
            <Difficulties diffs={map.versions[0].diffs} hovered={hoveredIndex === mapCardIndex} />
            <div class="show-on-hover"><OneClickDownloadButton mapId={map.id} /></div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    {#each Array(maxCards ?? 8) as _}
      <div class="card loading" />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/variables';

  $image-size: 8.5rem;

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;
    width: 100%;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card {
    position: relative;
    display: flex;
    overflow: hidden;
    background: #333333;
    border-radius: 10px;
    padding: 2px 8px 2px 2px;

    &.loading {
      background-color: $color-background-secondary;
      height: $image-size;
      border-radius: $rounding-large;
    }

    .image-link {
      height: $image-size;
      flex: $image-size 0 0;

      img {
        border-radius: $rounding-large;
        height: 100%;
      }
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 7px 2px 7px 12px;

      .title {
        display: block;
        font-weight: bold;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.25rem;
      }

      .last-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .tag-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 2px;
      }

      .zip-download-button-container {
        margin-left: auto;
      }
    }
  }
  .card {
    transition: box-shadow 0.2s ease-in;
  }
  .card:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .card:hover .show-on-hover {
    opacity: 1;
  }
  .show-on-hover {
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }
</style>
